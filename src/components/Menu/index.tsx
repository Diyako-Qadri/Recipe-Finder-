
import Link from 'next/link';

const Menu = () => {
    return (
       <nav className='flex flex-row text-lg uppercase justify-around w-full max-w-[1280px]'>
        <Link href="/">Home</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/category">Category</Link>
       </nav>
    )
};

export default Menu
