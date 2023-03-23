import '@/styles/globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat(
  {
    subsets: ['latin'],
    variable: '--font-montserrat'
  }
)

export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={`${montserrat.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </>
  )
}
