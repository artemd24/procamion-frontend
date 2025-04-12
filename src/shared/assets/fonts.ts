import { Inter, Noto_Sans, Roboto } from 'next/font/google'

export const inter = Inter({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

export const notoSans = Noto_Sans({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap'
})

export const roboto = Roboto({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap'
})
