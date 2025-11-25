import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image: ImagePlaceholder;
}

const blogAutomationImage = PlaceHolderImages.find(p => p.id === 'blog-automation')!;
const blogSustainabilityImage = PlaceHolderImages.find(p => p.id === 'blog-sustainability')!;
const blogCustomsImage = PlaceHolderImages.find(p => p.id === 'blog-customs')!;

export const blogPosts: BlogPost[] = [
  {
    slug: 'el-futur-de-la-logistica-automatitzacio-i-ia',
    title: 'El Futur de la Logística: Automatització i Intel·ligència Artificial',
    date: '2024-07-15',
    author: 'Equip d\'EJA Globaltrans',
    excerpt: 'L\'automatització i la IA estan revolucionant el sector del transport. Descobreix com aquestes tecnologies estan optimitzant les cadenes de subministrament, millorant l\'eficiència i reduint costos.',
    image: blogAutomationImage,
    content: `
      <p class="lead">L'automatització i la intel·ligència artificial (IA) ja no són conceptes de ciència-ficció, sinó realitats tangibles que estan transformant radicalment el sector de la logística i el transport. Des de magatzems intel·ligents fins a la planificació de rutes optimitzades per IA, la tecnologia està creant una cadena de subministrament més ràpida, eficient i resilient.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Magatzems Intel·ligents</h3>
      <p>Els robots autònoms (AMR) són capaços de moure's per magatzems, recollir productes i preparar comandes amb una precisió i velocitat inabastables per als humans. Això no només accelera el procés de picking, sinó que també redueix els errors i millora la seguretat laboral.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Optimització de Rutes amb IA</h3>
      <p>Els algoritmes d'intel·ligència artificial poden analitzar milers de variables en temps real —trànsit, condicions meteorològiques, finestres de lliurament i costos de combustible— per determinar les rutes més eficients. Això no només estalvia temps i diners, sinó que també redueix la petjada de carboni de cada enviament.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">El Repte de la Implementació</h3>
      <p>Tot i els enormes beneficis, la transició cap a una logística automatitzada presenta reptes. La inversió inicial en tecnologia pot ser significativa, i requereix una requalificació de la força laboral. No obstant això, a llarg termini, les empreses que abracin aquesta transformació digital estaran millor posicionades per competir en un mercat global cada cop més exigent.</p>
    `,
  },
  {
    slug: 'sostenibilitat-en-el-transport-la-revolucio-verda',
    title: 'Sostenibilitat en el Transport: La Revolució Verda sobre Rodes',
    date: '2024-06-28',
    author: 'Equip d\'EJA Globaltrans',
    excerpt: 'El transport és un dels sectors clau en la lluita contra el canvi climàtic. Explorem les últimes innovacions en vehicles elèctrics, combustibles alternatius i logística verda.',
    image: blogSustainabilityImage,
    content: `
      <p class="lead">La sostenibilitat ha deixat de ser una opció per convertir-se en una necessitat imperant en el sector del transport. La pressió reguladora, la demanda dels consumidors i la pròpia consciència ecològica estan impulsant una autèntica "revolució verda" sobre rodes.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Vehicles Elèctrics i Combustibles Alternatius</h3>
      <p>Els camions elèctrics estan guanyant terreny, especialment per a la distribució d'última milla. Tot i que l'autonomia i la infraestructura de recàrrega encara són reptes per a les llargues distàncies, la tecnologia avança a un ritme vertiginós. Paral·lelament, s'investiguen combustibles alternatius com l'hidrogen verd i els biocombustibles avançats com a solucions viables per descarbonitzar el transport pesat.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Logística Verda</h3>
      <p>La sostenibilitat no es tracta només del tipus de vehicle. La "logística verda" implica optimitzar les rutes per minimitzar els quilòmetres recorreguts, consolidar càrregues per evitar viatges a mig gas i utilitzar embalatges reciclables i reutilitzables. Cada petita acció compta per reduir l'impacte mediambiental de la cadena de subministrament.</p>
      
      <p class="mt-4">A EJA Globaltrans, estem compromesos amb la implementació de pràctiques més sostenibles i l'adopció de noves tecnologies per contribuir a un futur més net per a tothom.</p>
    `,
  },
  {
    slug: 'consells-per-a-enviaments-internacionals',
    title: 'Navegant Duanes: Consells per a Enviaments Internacionals',
    date: '2024-06-10',
    author: 'Equip d\'EJA Globaltrans',
    excerpt: 'Els enviaments internacionals poden ser complexos. Una correcta gestió duanera és clau per evitar retards i sobrecostos. Aquí tens alguns consells pràctics.',
    image: blogCustomsImage,
    content: `
      <p class="lead">Exportar o importar mercaderies pot obrir nous mercats per al teu negoci, però la burocràcia duanera pot semblar un laberint. Una planificació acurada i el coneixement dels requisits són essencials per garantir que els teus enviaments flueixin sense problemes a través de les fronteres.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">1. Documentació Correcta i Completa</h3>
      <p>És el punt més crític. Assegura't que la factura comercial, el packing list (llista de contingut), i el document de transport (com el CMR per carretera) siguin precisos i complets. Qualsevol discrepància pot causar inspeccions i retencions.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">2. Classificació Aranzelària (Codi HS)</h3>
      <p>Cada producte té un codi del Sistema Harmonitzat (HS code) que determina els aranzels i impostos aplicables. Una classificació incorrecta pot portar a pagaments erronis i possibles sancions. Si no estàs segur, consulta amb un expert.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">3. Coneix els Incoterms</h3>
      <p>Els Incoterms defineixen les responsabilitats del venedor i del comprador en un enviament internacional (qui paga el transport, l'assegurança, qui s'encarrega dels tràmits duaners). Escollir l'Incoterm adequat és crucial per evitar malentesos i costos inesperats.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">4. Confia en un Soci Logístic</h3>
      <p>La manera més senzilla d'assegurar una gestió duanera sense problemes és treballar amb un operador logístic experimentat. A EJA Globaltrans, el nostre equip d'experts s'encarrega de tots els tràmits perquè tu et puguis centrar en el teu negoci.</p>
    `,
  },
];
