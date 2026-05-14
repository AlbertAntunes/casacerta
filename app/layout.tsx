import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  variable: '--font-playfair',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://casacerta.com.br'
  ),
  title: {
    default: 'Casa Certa Imóveis | Quixadá CE',
    template: '%s | Casa Certa Imóveis',
  },
  description:
    'Imóveis em Quixadá CE. Casas, apartamentos e terrenos com entrada facilitada. Diogo Sousa CRECI 28948-F & Salomão Teodoseo CRECI 15784-F.',
  keywords: [
    'imóveis Quixadá',
    'casas Quixadá CE',
    'apartamentos Quixadá',
    'terrenos Quixadá',
    'corretor Quixadá',
    'Casa Certa Imóveis',
  ],
  authors: [
    { name: 'Diogo Sousa' },
    { name: 'Salomão Teodoseo' },
  ],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Casa Certa Imóveis',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${dmSans.variable}`}
    >
      <body className="font-sans">{children}</body>
    </html>
  )
}
