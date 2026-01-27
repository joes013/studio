'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, Printer, AlertCircle, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

// --- Tipus de Dades ---
interface Documento {
  num_factura: string;
  data: string;
  usuari: string;
  fpagament: string;
  concepte: string;
  preu_unitari: string;
  unitats: string;
  iva: string;
  dte: string;
  albara: string;
}

interface Usuario {
  usuari: string;
  rol: 'admin' | 'administrador' | 'treballador' | 'client';
  empresa: string;
  fiscalid: string;
  adreca: string;
  telefon: string;
}

interface FacturaAgrupada {
  numero: string;
  fecha: string;
  formaPago: string;
  cliente: Usuario;
  lineas: {
    concepto: string;
    precioUnitario: number;
    unidades: number;
    iva: number;
    descuento: number;
    neto: number;
    total: number;
  }[];
  baseImponible: number;
  desgloseIva: { tipo: number; base: number; cuota: number }[];
  totalFactura: number;
}

// --- Component ---
export default function DocumentsPage() {
  const router = useRouter();
  const [usuarioActual, setUsuarioActual] = useState<{ nom: string; empresa: string; rol: string } | null>(null);
  const [facturas, setFacturas] = useState<FacturaAgrupada[]>([]);
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<FacturaAgrupada | null>(null);
  const [indiceFactura, setIndiceFactura] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const procesarYAgruparDatos = useCallback((documentos: Documento[], usuarios: Usuario[], usuarioLogueado: { nom: string; empresa: string }) => {
    const usuarioCompleto = usuarios.find(u => u.usuari === usuarioLogueado.nom);
    if (!usuarioCompleto) {
      setError('No s\'han pogut verificar les teves dades d\'usuari.');
      return [];
    }
    
    setUsuarioActual({ ...usuarioLogueado, rol: usuarioCompleto.rol });

    const esAdmin = ['admin', 'administrador', 'treballador'].includes(usuarioCompleto.rol);
    const documentosFiltrados = esAdmin
      ? documentos
      : documentos.filter(d => d.usuari === usuarioLogueado.nom);

    const facturasMap = new Map<string, { lineasCrudas: Documento[]; cliente?: Usuario }>();

    documentosFiltrados.forEach(doc => {
      if (!doc.num_factura) return;
      if (!facturasMap.has(doc.num_factura)) {
        facturasMap.set(doc.num_factura, {
          lineasCrudas: [],
          cliente: usuarios.find(u => u.usuari === doc.usuari)
        });
      }
      facturasMap.get(doc.num_factura)!.lineasCrudas.push(doc);
    });

    const facturasProcesadas: FacturaAgrupada[] = [];
    facturasMap.forEach((value, key) => {
      if (!value.cliente) return;

      const lineas = value.lineasCrudas.map(l => {
        const precioUnitario = parseFloat(l.preu_unitari) || 0;
        const unidades = parseInt(l.unitats, 10) || 0;
        const iva = parseInt(l.iva, 10) || 0;
        const descuento = parseFloat(l.dte) || 0;
        const subtotal = precioUnitario * unidades;
        const neto = subtotal * (1 - descuento / 100);
        const total = neto * (1 + iva / 100);
        return { concepto: l.concepte, precioUnitario, unidades, iva, descuento, neto, total };
      });
      
      const desgloseIvaMap = new Map<number, { base: number; cuota: number }>();
      lineas.forEach(l => {
        if (!desgloseIvaMap.has(l.iva)) {
          desgloseIvaMap.set(l.iva, { base: 0, cuota: 0 });
        }
        const item = desgloseIvaMap.get(l.iva)!;
        item.base += l.neto;
        item.cuota += l.neto * (l.iva / 100);
      });

      const desgloseIva = Array.from(desgloseIvaMap.entries()).map(([tipo, { base, cuota }]) => ({ tipo, base, cuota }));
      const baseImponible = lineas.reduce((sum, l) => sum + l.neto, 0);
      const totalFactura = desgloseIva.reduce((sum, item) => sum + item.base + item.cuota, 0);

      facturasProcesadas.push({
        numero: key,
        fecha: value.lineasCrudas[0].data,
        formaPago: value.lineasCrudas[0].fpagament,
        cliente: value.cliente,
        lineas,
        baseImponible,
        desgloseIva,
        totalFactura,
      });
    });

    return facturasProcesadas.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }

    const usuarioLogueado = JSON.parse(storedUser);

    const fetchData = async () => {
      try {
        const [resDocs, resUsers] = await Promise.all([
          fetch('https://sheetdb.io/api/v1/yla6vr6ie4rsn?sheet=documents'),
          fetch('https://sheetdb.io/api/v1/yla6vr6ie4rsn?sheet=usuaris'),
        ]);

        if (!resDocs.ok || !resUsers.ok) {
          throw new Error('Error en la connexió amb la base de dades.');
        }

        const documentos: Documento[] = await resDocs.json();
        const usuarios: Usuario[] = await resUsers.json();

        const procesadas = procesarYAgruparDatos(documentos, usuarios, usuarioLogueado);
        setFacturas(procesadas);
        if (procesadas.length > 0) {
          setFacturaSeleccionada(procesadas[0]);
          setIndiceFactura(0);
        }
      } catch (e: any) {
        setError(e.message || 'Ha ocorregut un error inesperat.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [router, procesarYAgruparDatos]);
  
  const handlePrint = () => {
    window.print();
  };

  const cambiarFactura = (direccion: 'prev' | 'next') => {
    let nuevoIndice = indiceFactura;
    if (direccion === 'next') {
        nuevoIndice = (indiceFactura + 1) % facturas.length;
    } else {
        nuevoIndice = (indiceFactura - 1 + facturas.length) % facturas.length;
    }
    setIndiceFactura(nuevoIndice);
    setFacturaSeleccionada(facturas[nuevoIndice]);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (facturas.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-16 text-center">
         <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-headline font-bold">Sense Documents</h1>
        <p className="mt-2 font-body text-muted-foreground">No s'han trobat factures per al teu usuari.</p>
      </div>
    );
  }

  return (
    <div className="bg-background font-body">
        <div className="container mx-auto max-w-5xl p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 print:hidden">
                <div>
                    <h1 className="text-3xl font-headline font-bold text-foreground">Els Teus Documents</h1>
                    <p className="text-muted-foreground">Aquí pots veure i imprimir les teves factures.</p>
                </div>
                <Button onClick={handlePrint} size="lg">
                    <Printer className="mr-2" /> Imprimir PDF
                </Button>
            </div>

            <div className="flex justify-between items-center mb-4 print:hidden">
                <Button variant="outline" onClick={() => cambiarFactura('prev')} disabled={facturas.length <= 1}>
                    <ChevronLeft /> Anterior
                </Button>
                <div className="text-center">
                    <p className="font-bold font-headline">{facturaSeleccionada?.numero}</p>
                    <p className="text-sm text-muted-foreground">{new Date(facturaSeleccionada?.fecha || '').toLocaleDateString('ca-ES')}</p>
                </div>
                <Button variant="outline" onClick={() => cambiarFactura('next')} disabled={facturas.length <= 1}>
                    Següent <ChevronRight />
                </Button>
            </div>

            <Card id="zona-factura" className="w-full max-w-[210mm] mx-auto p-8 shadow-lg border-none print:shadow-none print:border-none print:p-0">
                <header className="flex justify-between items-start pb-8 border-b-2 border-primary">
                    <div>
                        <h2 className="font-headline text-3xl font-bold text-primary">EJA Globaltrans</h2>
                        <p className="font-body text-sm">Polígon Industrial Constantí, Tarragona</p>
                        <p className="font-body text-sm">contacte@ejaglobaltrans.com</p>
                        <p className="font-body text-sm">+34 977 000 000</p>
                    </div>
                    <div className="text-right">
                        <h1 className="font-headline text-4xl font-bold">FACTURA</h1>
                        <p className="font-body mt-2">
                            <span className="font-bold">Nº:</span> {facturaSeleccionada?.numero}
                        </p>
                        <p className="font-body">
                            <span className="font-bold">Data:</span> {new Date(facturaSeleccionada?.fecha || '').toLocaleDateString('ca-ES')}
                        </p>
                    </div>
                </header>

                <section className="grid grid-cols-2 gap-8 my-8">
                    <div>
                        <h3 className="font-headline font-bold text-muted-foreground mb-2">FACTURAR A:</h3>
                        <p className="font-bold text-lg">{facturaSeleccionada?.cliente.empresa}</p>
                        <p>{facturaSeleccionada?.cliente.adreca}</p>
                        <p>NIF: {facturaSeleccionada?.cliente.fiscalid}</p>
                        <p>Tel: {facturaSeleccionada?.cliente.telefon}</p>
                    </div>
                </section>

                <section>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted-foreground/10">
                                <TableHead className="font-bold text-foreground">Concepte</TableHead>
                                <TableHead className="text-right font-bold text-foreground">Preu/U</TableHead>
                                <TableHead className="text-right font-bold text-foreground">Uds.</TableHead>
                                <TableHead className="text-right font-bold text-foreground">Net</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {facturaSeleccionada?.lineas.map((linea, i) => (
                                <TableRow key={i} className="border-muted-foreground/20">
                                    <TableCell className="font-medium">{linea.concepto}</TableCell>
                                    <TableCell className="text-right">{linea.precioUnitario.toFixed(2)}€</TableCell>
                                    <TableCell className="text-right">{linea.unidades}</TableCell>
                                    <TableCell className="text-right">{linea.neto.toFixed(2)}€</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </section>

                <section className="flex justify-end mt-8">
                    <div className="w-full max-w-xs space-y-4">
                        <div className="flex justify-between border-b pb-2">
                            <span className="font-bold">Base Imposable:</span>
                            <span>{facturaSeleccionada?.baseImponible.toFixed(2)}€</span>
                        </div>
                        {facturaSeleccionada?.desgloseIva.map((item, i) => (
                            <div key={i} className="flex justify-between">
                                <span>Quota IVA ({item.tipo}% sobre {item.base.toFixed(2)}€):</span>
                                <span>{item.cuota.toFixed(2)}€</span>
                            </div>
                        ))}
                        <div className="flex justify-between border-t-2 border-primary pt-2 mt-4">
                            <span className="font-headline text-xl font-bold">TOTAL FACTURA:</span>
                            <span className="font-headline text-xl font-bold">{facturaSeleccionada?.totalFactura.toFixed(2)}€</span>
                        </div>
                    </div>
                </section>
                
                <section className="border-t mt-8 pt-4">
                     <p className="font-bold">Forma de Pagament: <span className="font-normal">{facturaSeleccionada?.formaPago}</span></p>
                </section>

                <footer className="text-xs text-muted-foreground mt-12 pt-4 border-t">
                    <p>EJA Globaltrans, S.L. - Inscrita al Registre Mercantil de Tarragona, Tom XXX, Foli XXX, Full T-XXXXX, Inscripció 1ª.</p>
                    <p className="mt-2">
                        En compliment del RGPD, l'informem que les seves dades seran tractades per a la gestió administrativa i comptable derivada de la nostra relació comercial.
                        Pot exercir els seus drets d'accés, rectificació, supressió i altres drets contactant amb nosaltres a contacte@ejaglobaltrans.com.
                    </p>
                </footer>
            </Card>
        </div>
    </div>
  );
}
