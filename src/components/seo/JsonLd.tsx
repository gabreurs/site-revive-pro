import { COMPANY_INFO, WHATSAPP_NUMBER } from "@/lib/constants";

interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": COMPANY_INFO.name,
    "description": "Empresa de terraplanagem em São Paulo. Limpeza de terreno, demolição, escavação, movimentação de terra, perfuração e locação de máquinas.",
    "telephone": `+${WHATSAPP_NUMBER}`,
    "email": COMPANY_INFO.email,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "São Paulo",
      "addressRegion": "SP",
      "addressCountry": "BR",
    },
    "areaServed": [
      { "@type": "City", "name": "São Paulo" },
      { "@type": "City", "name": "Guarulhos" },
      { "@type": "City", "name": "Osasco" },
      { "@type": "City", "name": "Santo André" },
      { "@type": "City", "name": "São Bernardo do Campo" },
    ],
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "07:00",
        "closes": "12:00",
      },
    ],
    "priceRange": "$$",
    "@id": "https://smsterraplenagem.com.br",
    "url": "https://smsterraplenagem.com.br",
  };

  return <JsonLd data={data} />;
}

export function ServiceJsonLd({ name, description }: { name: string; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "name": COMPANY_INFO.name,
    },
    "areaServed": {
      "@type": "City",
      "name": "São Paulo",
    },
  };

  return <JsonLd data={data} />;
}

export function ArticleJsonLd({ title, date, description }: { title: string; date: string; description: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "datePublished": date,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": COMPANY_INFO.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": COMPANY_INFO.name,
    },
  };

  return <JsonLd data={data} />;
}
