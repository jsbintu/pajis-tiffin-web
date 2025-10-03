import Script from 'next/script';

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
  };
}

export function OrganizationStructuredData() {
  const structuredData: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'Pajis Kitchen',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://pajiskitchen.com',
    logo: `${process.env.NEXT_PUBLIC_APP_URL}/logo.png`,
    description: 'Authentic home-style Indian meal delivery subscription service',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Brigade Road',
      addressLocality: 'Bangalore',
      addressRegion: 'Karnataka',
      postalCode: '560001',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-80-1234-5678',
      contactType: 'customer service',
    },
  };

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface ProductSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  offers: {
    '@type': string;
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

export function ProductStructuredData({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: number;
}) {
  const structuredData: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <Script
      id="product-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
