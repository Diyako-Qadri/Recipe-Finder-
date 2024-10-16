import Link from 'next/link';
import MobileNav from './MobileNav';

const Menu = () => {
  return (
    <>
      <div className="flex md:hidden">
        <MobileNav />
      </div>
      <nav className="hidden  md:flex flex-row text-lg uppercase justify-around w-full max-w-[980px]">
        <Link href="/">Home</Link>
        <Link href="/category">Category</Link>
        <Link href="/profile">Profile</Link>
      </nav>
    </>
  );
};

export default Menu;
