import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  image?: ImagePlaceholder;
}


const blogPostsData: Omit<BlogPost, 'image'>[] = [
  {
    slug: 'transport-productes-quimics-carretera',
    title: 'Transport de Químics: La Responsabilitat de Moure el Risc amb Seguretat Màxima',
    date: '2024-07-29',
    author: 'Equip d\'EJA Globaltrans',
    excerpt: 'Cada viatge de productes químics és una operació d\'alta responsabilitat. Descobreix com garantim la seguretat i l\'eficiència en cada pas.',
    content: `
      <p class="lead">El transport de productes químics per carretera no es una tasca que pugui dur a terme qualsevol i de qualsevol manera. Amb clients importants dins el sector, cada viatge porta amb ell una alta responsabilitat la qual exigeix seguretat, rapidesa i el compliment d’un seguit de normes. A EJA Globaltrans, com a empresa especialitzada en el sector de l’ADR, hem desenvolupat un seguit de protocols i processos que asseguren que en cada enviament es compleixi amb tots els estàndards necessaris.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Compliment Estricte de la Normativa ADR</h3>
      <p>El pilar fonamental en el qual basem els nostres valors és el compliment de la normativa ADR. Cada vehicle de la nostra flota està adequadament equipat amb la senyalització, els equips de seguretat i materials d’emergència necessaris per a fer front a qualsevol imprevist. Mentrestant, tots els nostres conductors reben una formació contínua per poder actuar davant de qualsevol incident amb la màxima rapidesa i eficàcia possible. Aquesta preparació minimitza els riscos per a les persones, els materials i el medi ambient.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Planificació de Rutes i Coordinació</h3>
      <p>Un altre punt fonamental és la planificació de rutes. El transport de productes químics demana evitar zones de risc, respectar estrictament els temps de conducció i assegurar que la càrrega es mantingui en condicions òptimes durant tot el trajecte. A més, coordinem cada lliurament amb els nostres clients, adaptant horaris i dates segons les seves necessitats, per garantir que el producte arribi puntual i segur.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Formació dels Conductors: La Clau de l'Èxit</h3>
      <p>La formació dels conductors és un punt clau perquè tot surti bé. Cada xofer coneix perfectament les mercaderies transportades, com reaccionar en situacions adverses, com manipular la càrrega de manera segura i quins passos seguir en una situació d’emergència. Tot això, en conjunt, ajuda a evitar problemes majors.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4 font-headline">Comunicació Constant amb el Client</h3>
      <p>Creiem que és indispensable mantenir el client al corrent de tot el que passa durant el transport. Per aquest motiu, mantenim una comunicació proactiva, informant sobre qualsevol detall sol·licitat. Aquesta transparència no només aporta confiança, sinó que també permet anticipar i resoldre qualsevol imprevist abans que afecti el lliurament.</p>

      <p class="mt-4">En resum, transportar productes químics per carretera amb rapidesa i seguretat requereix molt més que vehicles i permisos. És un compromís constant amb la professionalitat, la seguretat i la coordinació. A EJA Globaltrans, combinem tecnologia, experiència i protocols estrictes per assegurar que cada enviament es compleixi amb la màxima seguretat i eficiència.</p>
    `,
  },
  {
    slug: 'el-futur-de-la-logistica-automatitzacio-i-ia',
    title: 'El Futur de la Logística: Automatització i Intel·ligència Artificial',
    date: '2024-07-16',
    author: 'Equip d\'EJA Globaltrans',
    excerpt: 'L\'automatització i la IA estan revolucionant el sector del transport. Descobreix com aquestes tecnologies estan optimitzant les cadenes de subministrament, millorant l\'eficiència i reduint costos.',
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

const imageMap: { [slug: string]: string } = {
  'transport-productes-quimics-carretera': 'blog-chemicals',
  'el-futur-de-la-logistica-automatitzacio-i-ia': 'blog-automation',
  'sostenibilitat-en-el-transport-la-revolucio-verda': 'blog-sustainability',
  'consells-per-a-enviaments-internacionals': 'blog-customs',
};

export const blogPosts: BlogPost[] = blogPostsData.map(post => ({
  ...post,
  image: PlaceHolderImages.find(p => p.id === imageMap[post.slug]),
}));
