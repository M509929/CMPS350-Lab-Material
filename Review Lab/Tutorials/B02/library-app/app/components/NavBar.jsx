import Link from 'next/link'
import React from 'react'

export default function NavBar() {
    return (
        <ul>
            <li><Link href="">Home</Link></li>
            <li><Link href="">Books</Link></li>
            <li><Link href="">Summary</Link></li>
        </ul>
    )
}
