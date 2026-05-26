import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinguaAI — Говори без страху",
  description:
    "Персональний AI-репетитор, який ніколи не засуджує за помилки. Пройди квіз і отримай індивідуальний план за 2 хвилини.",
  openGraph: {
    title: "LinguaAI — Говори без страху",
    description: "Персональний AI-репетитор. Персональний план за 2 хвилини.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('lingua-theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {/* Decorative background blobs */}
        <div className="bg-blobs" aria-hidden="true">
          <div className="bg-blob bg-blob-1" />
          <div className="bg-blob bg-blob-2" />
          <div className="bg-blob bg-blob-3" />
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </body>
    </html>
  );
}
