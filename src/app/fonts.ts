import { Barlow_Condensed, Josefin_Sans, Open_Sans } from 'next/font/google'

export const barlowCondensed = Barlow_Condensed({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['vietnamese'],
})

export const opentSans = Open_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese'],
})

export const josenfinSans = Josefin_Sans({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['vietnamese'],
})
