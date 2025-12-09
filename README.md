# EJA Globaltrans - Plataforma de Logística Digital

Aquesta és una aplicació web moderna construïda amb Next.js, dissenyada per a l'empresa de logística EJA Globaltrans. Inclou un lloc web corporatiu, un portal de clients per a la gestió de serveis i un assistent d'Intel·ligència Artificial.

## 🚀 Començar

Per executar el projecte en el teu entorn local, segueix aquests passos.

### Prerequisits

Necessitaràs tenir instalat [Node.js](https://nodejs.org/) (versió 20 o superior) i [npm](https://www.npmjs.com/) al teu ordinador.

### 1. Instal·lació

Clona el repositori i instal·la les dependències del projecte.

```bash
git clone https://github.com/el-teu-usuari/el-teu-repositori.git
cd el-teu-repositori
npm install
```

### 2. Configuració de les Variables d'Entorn

Aquest projecte utilitza una API de Mistral per al seu assistent d'IA. Perquè funcioni, has de proporcionar la teva clau d'API.

Crea un fitxer anomenat `.env.local` a l'arrel del projecte i afegeix la teva clau:

```env
MISTRAL_API_KEY=LA_TEVA_API_KEY_DE_MISTRAL
```

**Nota:** El fitxer `.env.local` està inclòs al `.gitignore`, de manera que la teva clau d'API no es pujarà a GitHub.

### 3. Executar el Servidor de Desenvolupament

Un cop instal·lat i configurat, pots iniciar el servidor de desenvolupament local.

```bash
npm run dev
```

Obre [http://localhost:9002](http://localhost:9002) al teu navegador per veure l'aplicació en funcionament.

## ✨ Característiques Principals

- **Pàgines Corporatives:** Sobre nosaltres, serveis, preus, blog i contacte.
- **Assistent d'IA:** Una interfície de xat per respondre preguntes dels usuaris utilitzant l'API de Mistral.
- **Seguiment d'Enviaments:** Una pàgina per localitzar l'estat d'un enviament a través d'una API externa (SheetDB).
- **Configuració per a Desplegament:** Preparat per desplegar a plataformes com Netlify o Vercel.

## 🛠️ Tecnologies Utilitzades

- **Framework:** [Next.js](https://nextjs.org/)
- **Estils:** [Tailwind CSS](https://tailwindcss.com/)
- **Components UI:** [shadcn/ui](https://ui.shadcn.com/)
- **Intel·ligència Artificial:** [Mistral AI](https://mistral.ai/)
- **Hosting:** Preparat per a [Netlify](https://www.netlify.com/)
