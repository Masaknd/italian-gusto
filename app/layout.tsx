import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const notoSansJp = localFont({
  src: "./fonts/NotoSansJP-Variable.ttf",
  variable: "--font-noto-sans-jp",
  display: "swap",
  weight: "100 900",
});

const kirigirisu = localFont({
  src: "./fonts/AB-kirigirisu-Regular.otf",
  variable: "--font-kirigirisu",
  display: "swap",
  weight: "400",
});

const kalam = localFont({
  src: "./fonts/Kalam-Bold.ttf",
  variable: "--font-kalam",
  display: "swap",
  weight: "700",
});

const yamafont = localFont({
  src: "./fonts/yamafont.ttf",
  variable: "--font-yamafont",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: { default: "Gusto Italian Bar", template: "%s | Gusto Italian Bar" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${kirigirisu.variable} ${kalam.variable} ${yamafont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
