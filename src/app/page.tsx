
import RandomMeals from '@/components/RandomMeals';
import HeroMessage from '@/components/HeroMessage';

export default function Home() {

  return (
    <div className="w-full max-w-[1280px] m-auto">
    <HeroMessage/>
      <RandomMeals />
    </div>
  );
}
