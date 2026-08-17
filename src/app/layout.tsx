import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soul Virtues Extractor — Free 66-Question Personality Test",
  description:
    "Discover your seven soul virtues with AI-powered deep analysis. No sign-up required. Takes 8 minutes.",
  keywords:
    "soul virtues extractor, soul trait extractor, virtue personality test, undertale soul quiz, seven virtues",
  openGraph: {
    title: "Soul Virtues Extractor — Free 66-Question Personality Test",
    description:
      "Discover your seven soul virtues with AI-powered deep analysis. No sign-up required. Takes 8 minutes.",
    url: "https://virtuesextractor.com",
    siteName: "VirtuesExtractor.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Soul Virtues Extractor — Free 66-Question Personality Test",
    description:
      "Discover your seven soul virtues with AI-powered deep analysis. No sign-up required. Takes 8 minutes.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "l7k0vh1dC0nd_94bIyARf8B9y-tmQ2gIxVNclOwIRfc",
    other: {
      "msvalidate.01": "8D5AE51845CFE08F58F54A68CFF76D57",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "y3vpoqj80r");`,
          }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        {children}
      </body>
    </html>
  );
}
