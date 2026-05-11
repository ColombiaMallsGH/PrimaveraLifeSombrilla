import { Montserrat } from 'next/font/google';
import "./globals.css";
import SocialSidebar from './components/SocialSidebar';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export const metadata = {
  title: "Primavera Life | Mall · Apartamentos · Office · Helipuerto — Armenia, Quindío",
  description:
    "Primavera Life es el único ecosistema de vida, trabajo y entretenimiento con helipuerto en Armenia, Quindío. Mall gastronómico, apartamentos en alquiler (Garden, Natura, Oasis, Serenity, Urban), office y parqueadero. Sector El Nogal, La Castellana.",
  keywords: [
    "Primavera Life Armenia",
    "apartamentos en alquiler Armenia Quindío",
    "mall Armenia",
    "oficinas Armenia Quindío",
    "helipuerto Armenia",
    "apartaestudios alquiler Armenia",
    "La Castellana Armenia",
    "sector El Nogal Armenia",
    "parqueadero Armenia",
  ],
  openGraph: {
    title: "Primavera Life | Mall · Apartamentos · Office · Helipuerto",
    description:
      "El único ecosistema de vida, trabajo y entretenimiento con helipuerto en Armenia, Quindío. Vive, trabaja y disfruta en un solo lugar.",
    url: "https://primaveralife.com.co",
    siteName: "Primavera Life",
    locale: "es_CO",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={montserrat.variable}>
      <head>
        {/* Schema.org JSON-LD for AEO/AIO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ShoppingCenter",
                  name: "Primavera Life Mall",
                  description:
                    "Mall gastronómico con marcas de café, coctelería, comida asiática, comida de autor y comidas rápidas en Armenia, Quindío.",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Cra. 13 #16N - 79",
                    addressLocality: "Armenia",
                    addressRegion: "Quindío",
                    addressCountry: "CO",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 4.5426,
                    longitude: -75.6706,
                  },
                  url: "https://primaveralife.com.co",
                  telephone: "+57-XXX-XXXXXXX",
                  image: "/og-image.jpg",
                },
                {
                  "@type": "RealEstateAgent",
                  name: "Primavera Life House",
                  description:
                    "Apartamentos y apartaestudios en alquiler con 5 tipologías: Garden, Natura, Oasis, Serenity, Urban. Amenidades: Jacuzzi, Turco, Sauna, Gimnasio, zona de mascotas y niños.",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Cra. 13 #16N - 79",
                    addressLocality: "Armenia",
                    addressRegion: "Quindío",
                    addressCountry: "CO",
                  },
                },
                {
                  "@type": "LocalBusiness",
                  name: "Primavera Life",
                  description:
                    "Ecosistema de vida, trabajo y entretenimiento con helipuerto único en la región. Incluye mall, apartamentos, oficinas y parqueadero.",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "Cra. 13 #16N - 79",
                    addressLocality: "Armenia",
                    addressRegion: "Quindío",
                    addressCountry: "CO",
                  },
                  hasMap:
                    "https://maps.google.com/?q=Primavera+Life+Armenia+Quindio",
                  amenityFeature: [
                    { "@type": "LocationFeatureSpecification", name: "Helipuerto" },
                    { "@type": "LocationFeatureSpecification", name: "Jacuzzi" },
                    { "@type": "LocationFeatureSpecification", name: "Turco" },
                    { "@type": "LocationFeatureSpecification", name: "Sauna" },
                    { "@type": "LocationFeatureSpecification", name: "Gimnasio" },
                    {
                      "@type": "LocationFeatureSpecification",
                      name: "Zona de mascotas",
                    },
                    {
                      "@type": "LocationFeatureSpecification",
                      name: "Zona de niños",
                    },
                    {
                      "@type": "LocationFeatureSpecification",
                      name: "Parqueadero 4 pisos",
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        <SocialSidebar />
        {children}
      </body>
    </html>
  );
}
