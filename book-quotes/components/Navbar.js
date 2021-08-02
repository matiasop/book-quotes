import Link from 'next/link'

const Navbar = () => {
  return (
    <nav>
      <div>
        <h1>Book Quotes</h1>
        <Link href="/"><a>Home</a></Link>
        <Link href="/quotes"><a>All Quotes</a></Link>
        <Link href="/books"><a>Books</a></Link>
      </div>
    </nav>
  )
}

export default Navbar;