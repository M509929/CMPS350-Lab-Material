import React from 'react'
import Link from 'next/link'
// for link nav for instantantous loading
// VIP FOR rfc tags it should be class name 

export default function NavBar() {
  return (
    <nav>
      <ul className="navbar-nav">
        <li>Alpha Bank</li>
        <li>
            <Link href="/">Home</Link>
        </li>
        <li>
            <Link href="/accounts/upsert">Add Account</Link>
            {/* upser add or update */}
        </li>
        <li>
            <Link href="/accounts/trans/add">Add Transaction</Link>
        </li>
      </ul>
   
  </nav>
  )
}
