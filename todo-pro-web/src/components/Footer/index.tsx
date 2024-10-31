import * as React from 'react'
import Link from 'next/link'

export const Footer = () => (
  <div className="flex flex-col justify-center items-center w-full p-6">
    <Link href={'/about'} className="py-4 text-blue-500 underline">
      About
    </Link>
  </div>
)
