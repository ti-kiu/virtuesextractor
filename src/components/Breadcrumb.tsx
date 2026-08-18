interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://virtuesextractor.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span style={{ color: "var(--text-muted)" }}>/</span>
              )}
              {index === items.length - 1 ? (
                <span style={{ color: "var(--text-secondary)" }}>{item.name}</span>
              ) : (
                <a
                  href={item.href}
                  className="hover:underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
