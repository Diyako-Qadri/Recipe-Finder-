'use client';

import { motion } from 'framer-motion';
const HeroMessage = () => {
  return (
    <div className="md:w-full w-screen flex justify-center bg-homeHero-image mt-20 h-[80vh] bg-cover bg-no-repeat  ">
      <motion.div
        initial={{
          y: 50,
          opacity: 0,
          transition: {
            delay: 2,
          },
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          transition: {
            duration: 1,
          },
        }}
        viewport={{ once: true }}
        className="flex flex-col w-3/4 max-w-[500px] justify-start   self-center bg-[#e99921ea]  h-[160px] md:h-[30%] items-center"
      >
        <h2 className="text-[#f3f9f2] py-2  text-[34px]  md:text-[54px] text-center font-semibold">
          Gourmet Guide
        </h2>
        <p className="text-[#ffffff] py-2 text-[20px] md:text-[34px] text-center font-semibold">
          Hungry? Find your next favorite recipe here!
        </p>
      </motion.div>
    </div>
  );
};

export default HeroMessage;
