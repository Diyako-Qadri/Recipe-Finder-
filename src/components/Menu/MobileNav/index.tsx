'use client';

import { useState, useEffect } from 'react';
import { motion, MotionConfig, Variants } from 'framer-motion';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type MenuItem = {
  name: string;
  link: string;
};

const menuItem: MenuItem[] = [
  {
    name: 'Home',
    link: '/',
  },
  {
    name: 'Category',
    link: '/category',
  },
  {
    name: 'Profile',
    link: '/profile',
  },
];

const MobileNav = () => {
  const [active, setActive] = useState<boolean>(false);

  const handleClick = () => {
    setActive(prevActive => !prevActive);
  };

  const path = usePathname();

  const handleMenuItemClick = () => {
    setActive(false);
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [active]);

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -80 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
      },
    }),
  };

  return (
    <>
      <MotionConfig
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <motion.button
          initial={false}
          onClick={handleClick}
          className="relative h-12 w-12 z-40"
          animate={active ? 'open' : 'closed'}
        >
          <motion.span
            style={{ left: '50%', top: '25%', x: '-50%', y: '-50%' }}
            className="absolute h-1 w-10 bg-white rounded-md"
            variants={{
              open: {
                rotate: ['0deg', '0deg', '45deg'],
                top: ['25%', '50%', '50%'],
              },
              closed: {
                rotate: ['45deg', '0deg', '0deg'],
                top: ['50%', '50%', '25%'],
              },
            }}
          />
          <motion.span
            style={{ left: '50%', top: '50%', x: '-50%', y: '-50%' }}
            className="absolute h-1 w-10 bg-white rounded-md"
            variants={{
              open: {
                rotate: ['0deg', '0deg', '-45deg'],
              },
              closed: {
                rotate: ['-45deg', '0deg', '0deg'],
              },
            }}
          />
          <motion.span
            style={{
              left: 'calc(50% + 10px)',
              bottom: '25%',
              x: '-50%',
              y: '50%',
            }}
            className="absolute h-1 w-5 bg-white rounded-md"
            variants={{
              open: {
                rotate: ['0deg', '0deg', '-45deg'],
                bottom: ['25%', '50%', '50%'],
                left: '50%',
              },
              closed: {
                rotate: ['-45deg', '0deg', '0deg'],
                bottom: ['50%', '50%', '25%'],
                left: 'calc(50% + 10px)',
              },
            }}
          />
        </motion.button>
      </MotionConfig>
      {active && (
        <div className="absolute top-0 left-0 w-full h-screen bg-[#4e9a5d] text-white overflow-y-auto">
          <div className="relative h-full overflow-auto">
            <div className="mx-10 flex flex-col mt-14 z-0 pt-[75px] sm:pt-[35px]">
              {menuItem.map((item, index) => (
                <Link
                  className={path === item.link ? 'active' : ''}
                  key={index}
                  href={item.link}
                  onClick={handleMenuItemClick}
                >
                  <motion.p
                    className="my-6 text-3xl font-medium"
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={itemVariants}
                  >
                    {item.name}
                  </motion.p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileNav;
