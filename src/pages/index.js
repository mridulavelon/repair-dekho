import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import Homepage from './Homepage'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <Homepage/>
  )
}
//middleware.js