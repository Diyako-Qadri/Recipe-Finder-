import Link from 'next/link';
import { useUserContext } from '@/utils/contexts';
import { type userContextType } from '@/utils/types';

const Footer = () => {
  const { user } = useUserContext() as userContextType;

  return (
    <footer className="bg-[#4e9a5d] text-white p-10 text-center  items-center">
      <div className="flex flex-col md:flex-row justify-around border-b-2 border-white">
        <div className="flex flex-col text-start">
          <h3 className="text-xl pb-2">contact us:</h3>
          <a href="tel:0702222222" className="text-xl" target="_blank">
            070- 222 22 22
          </a>
          <a className="text-xl" href="mailto:info@recipe.com" target="_blank">
            info@recipe.com
          </a>
        </div>

        <div className="flex flex-col text-start text-xl  pb-4">
          {user && (
            <>
              <Link href="/">Home</Link>
              <Link href="/category">Category</Link>
              <Link href="/profile">Profile</Link>
            </>
          )}
          <p className="hover:underline">Privecy & Policy</p>
        </div>
      </div>
      <div className="p-3">&copy; All rights reserved by Diyako Qadri</div>
    </footer>
  );
};

export default Footer;
