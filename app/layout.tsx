import Header from '@/components/Header'
import './globals.css'
import type { Metadata } from 'next'
import { ContextProvider } from '@/components/context';
import Footer from '@/components/Footer';


export const metadata: Metadata = {
  title: ' Next Blog',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider >
          <Header />
          {children}
          <Footer/>
        </ContextProvider>
      </body>
    </html>
  )
}
