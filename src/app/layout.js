import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Comprehensive SEO Metadata Configuration
export const metadata = {
  // Primary Title Configuration
  title: {
    default: "FWB Plus | Event Organizer & Penyelenggara Acara Profesional di Jogja, Semarang",
    template: "%s | FWB Plus Event Organizer",
  },
  
  // Enhanced Meta Description
  description: "FWB Plus adalah penyelenggara acara (event organizer) profesional terpercaya di Yogyakarta dan Semarang. Kami menyediakan jasa lengkap untuk corporate gathering, pameran (exhibition), konser musik, wedding organizer, dan penyewaan alat event dengan harga terjangkau.",
  
  // Comprehensive Keywords
  keywords: [
  // Brand & Variasi Nama
  "FWB Plus",
  "FWB Plus EO",
  "FWB Plus Event Organizer",
  "FWB Plus Jogja",
  "FWB Plus Semarang",
  "fwbplus.com",
  
  // Umum: Event Organizer
  "event organizer",
  "jasa event organizer",
  "penyelenggara acara",
  "jasa EO",
  "EO terpercaya",
  "EO profesional",
  "event planner",
  "event management",
  "organizer acara",
  "jasa penyelenggara acara",
  "vendor event organizer",
  "crew event organizer",
  "jenis event organizer",
  "contoh event organizer",
  
  // Berdasarkan Lokasi: Jogja / Yogyakarta
  "event organizer jogja",
  "EO jogja",
  "penyelenggara acara jogja",
  "jasa EO jogja",
  "wedding organizer jogja",
  "event organizer yogyakarta",
  "EO yogyakarta",
  "penyelenggara acara yogyakarta",
  "EO terpercaya jogja",
  "jasa event organizer jogja",
  "EO di jogja",
  
  // Berdasarkan Lokasi: Semarang
  "event organizer semarang",
  "EO semarang",
  "penyelenggara acara semarang",
  "jasa EO semarang",
  "wedding organizer semarang",
  "EO terpercaya semarang",
  "event organizer terbaik semarang",
  
  // Berdasarkan Layanan
  "corporate gathering",
  "corporate event",
  "meeting perusahaan",
  "pameran",
  "exhibition",
  "wedding organizer",
  "konser musik",
  "festival musik",
  "launching produk",
  "grand opening",
  "seminar",
  "workshop",
  "family gathering",
  "ulang tahun",
  "anniversary",
  "event komunitas",
  "pernikahan outdoor",
  
  // Jasa Penunjang Event
  "sewa alat event",
  "sewa sound system",
  "sewa lighting",
  "sewa panggung",
  "sewa tenda acara",
  "sewa kursi dan meja event",
  "rental alat event jogja",
  "jasa dekorasi event",
  "jasa catering event",
  "jasa dokumentasi event",
  "MC event jogja",
  "host event semarang",
  "talent event organizer",
  "manpower event",
  "booth event custom",
  
  // Keyword Pencarian Populer Google
  "event organizer adalah",
  "event organizer artinya",
  "event organizer jakarta",
  "event organizer terbaik di indonesia",
  "event organizer logo",
  "jasa event organizer terbaik",
  "jasa event organizer surabaya",
  "jasa event organizer inaproc",
  "jasa event organizer katalog",
  "jasa dokumentasi acara",
  "jasa dekorasi acara",
  "jasa MC acara",
  "jasa foto acara",
  "jasa penyelenggara acara jakarta",
  
  // Kepercayaan dan Kualitas
  "event organizer terpercaya",
  "event organizer profesional",
  "event organizer murah",
  "EO terbaik jogja",
  "EO terbaik semarang",
  "jasa event berkualitas",
  "EO berpengalaman",
  "jasa event organizer full service"
],
  
  // Author Information
  authors: [
    { name: "FWB Plus Event Organizer", url: "https://links.fwbplus.id" },
    { name: "FWB Plus Team" }
  ],
  creator: "FWB Plus Event Organizer",
  publisher: "FWB Plus",
  
  // Language and Region
  language: "id",
  locale: "id_ID",
  
  // Open Graph Tags
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://links.fwbplus.id",
    siteName: "FWB Plus Event Organizer",
    title: "FWB Plus | Event Organizer Profesional di Jogja & Semarang",
    description: "Penyelenggara acara profesional untuk corporate gathering, wedding, konser, pameran, dan berbagai event di Yogyakarta dan Semarang. Konsultasi gratis!",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FWB Plus Event Organizer - Jasa Penyelenggara Acara Profesional",
        type: "image/jpeg",
      },
      {
        url: "/images/og-image-square.jpg",
        width: 1080,
        height: 1080,
        alt: "FWB Plus - Event Organizer Terpercaya",
        type: "image/jpeg",
      }
    ],
  },
  
  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@fwbplus",
    creator: "@fwbplus",
    title: "FWB Plus | Event Organizer Profesional di Jogja & Semarang",
    description: "Penyelenggara acara profesional untuk semua jenis event. Corporate gathering, wedding, konser, pameran. Konsultasi gratis!",
    images: ["/images/twitter-card.jpg"],
  },
  
  // Additional Meta Tags
  category: "Event Services",
  classification: "Business",
  
  // Robots Configuration
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification Tags
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
    other: {
      "facebook-domain-verification": "your-facebook-verification-code",
    },
  },
  
  // Additional Metadata
  applicationName: "FWB Plus Event Organizer",
  referrer: "origin-when-cross-origin",
  colorScheme: "light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1a7be6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a7be6" },
  ],
  
  // Apple-specific
  appleWebApp: {
    title: "FWB Plus EO",
    statusBarStyle: "default",
    capable: true,
  },
  
  // Microsoft-specific
  msApplication: {
    TileColor: "#1a7be6",
    config: "/browserconfig.xml",
  },
  
  // Manifest
  manifest: "/manifest.json",
  
  // Icons Configuration
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
    ],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  
  // Alternate Languages
  alternates: {
    canonical: "https://links.fwbplus.id",
    languages: {
      "id-ID": "https://links.fwbplus.id",
      "en-US": "https://links.fwbplus.id/en",
    },
  },
  
  // Bookmarks
  bookmarks: ["https://links.fwbplus.id"],
  
  // Archives
  archives: ["https://links.fwbplus.id/blog"],
  
  // Assets
  assets: ["https://links.fwbplus.id/assets"],
  
  // Generator
  generator: "Next.js 15",
  
  // Format Detection
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  
  // Abstract and Classification
  abstract: "FWB+ adalah penyedia jasa event organizer profesional yang melayani berbagai jenis acara di wilayah Yogyakarta dan Semarang dengan pengalaman bertahun-tahun.",
  
  // Rating
  rating: "general",
  
  // Copyright
  copyright: "© 2025 FWB+ Organizer. All rights reserved.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" dir="ltr">
      <head>
        {/* Additional meta tags for better SEO */}
        <meta name="geo.region" content="ID-JI" />
        <meta name="geo.placename" content="Yogyakarta, Indonesia" />
        <meta name="geo.position" content="-7.797068;110.370529" />
        <meta name="ICBM" content="-7.797068, 110.370529" />
        
        {/* Business-specific meta tags */}
        <meta name="business:contact_data:street_address" content="Yogyakarta" />
        <meta name="business:contact_data:locality" content="Yogyakarta" />
        <meta name="business:contact_data:region" content="Special Region of Yogyakarta" />
        <meta name="business:contact_data:postal_code" content="55000" />
        <meta name="business:contact_data:country_name" content="Indonesia" />
        
        {/* Content meta tags */}
        <meta name="coverage" content="Indonesia" />
        <meta name="distribution" content="global" />
        <meta name="target" content="all" />
        <meta name="audience" content="all" />
        <meta name="resource-type" content="document" />
        <meta name="doc-type" content="Web Page" />
        <meta name="doc-class" content="Living Document" />
        
        {/* Cache control */}
        <meta httpEquiv="cache-control" content="public, max-age=31536000" />
        <meta httpEquiv="expires" content="31536000" />
        
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        
        {/* Preconnect for critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FWB+ Event Organizer",
              "alternateName": ["FWB+", "FWB+ Event Organizer"],
              "url": "https://links.fwbplus.id",
              "logo": "https://links.fwbplus.id/images/assets/logo/Logo FWB PNG Transparan.png",
              "description": "Penyelenggara acara profesional untuk corporate gathering, wedding, konser, pameran, dan berbagai event di Yogyakarta dan Semarang.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Yogyakarta",
                "addressRegion": "Special Region of Yogyakarta",
                "postalCode": "55000",
                "addressCountry": "ID"
              },
              "areaServed": [
                {
                  "@type": "City",
                  "name": "Yogyakarta"
                },
                {
                  "@type": "City", 
                  "name": "Semarang"
                }
              ],
              "serviceType": [
                "Event Organizer",
                "Wedding Organizer", 
                "Corporate Event Planning",
                "Exhibition Organizer",
                "Concert Organizer"
              ],
              "foundingDate": "2020",
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": ["Indonesian", "English"]
              },
              "sameAs": [
                "https://www.instagram.com/fwbplus",
                "https://www.facebook.com/fwbplus",
                "https://wa.me/6281234567890"
              ]
            })
          }}
        />
        
        {/* Structured Data - LocalBusiness */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "FWB+ Event Organizer",
              "image": "https://links.fwbplus.id/images/assets/logo/Logo FWB PNG Transparan.png",
              "telephone": "+62-812-3456-7890",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Yogyakarta",
                "addressLocality": "Yogyakarta",
                "addressRegion": "Special Region of Yogyakarta",
                "postalCode": "55000",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -7.797068,
                "longitude": 110.370529
              },
              "url": "https://links.fwbplus.id",
              "openingHours": "Mo-Su 08:00-20:00",
              "priceRange": "$$",
              "servesCuisine": "Event Services",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "bestRating": "5",
                "ratingCount": "150"
              }
            })
          }}
        />
        
        {/* Structured Data - Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "name": "Event Organizer Services",
              "description": "Jasa penyelenggaraan acara profesional untuk corporate gathering, wedding, konser, pameran, dan berbagai event lainnya.",
              "provider": {
                "@type": "Organization",
                "name": "FWB+ Event Organizer"
              },
              "areaServed": ["Yogyakarta", "Semarang"],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Event Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Corporate Event"
                    }
                  },
                  {
                    "@type": "Offer", 
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Wedding Organizer"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service", 
                      "name": "Concert Organizer"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        itemScope
        itemType="https://schema.org/WebPage"
      >
        {children}
      </body>
    </html>
  );
}