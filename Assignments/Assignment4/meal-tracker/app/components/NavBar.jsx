import Link from 'next/link';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          {/* Add Meal Link - This links to the Addmeal page */}
          <Link href="/pages/add">Add Meal</Link> 
        </li>
        <li>
          <Link href="/pages/summary">Summary</Link>
        </li>
      </ul>
    </nav>
  );
}
