import React, { useState, useEffect, useCallback } from 'react';
// import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import ButtonBg from '../button';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
}

interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showIndicators?: boolean;
  showNavigation?: boolean;
  className?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = true,
  autoPlayInterval = 5000,
  showIndicators = true,
  // showNavigation = true,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(autoPlay);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  }, [items.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  }, [items.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlay, autoPlayInterval, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === ' ') {
        event.preventDefault();
        // togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [nextSlide, prevSlide]);

  if (!items || items.length === 0) {
    return <div className="text-center py-8">No items to display</div>;
  }

  return (
    <div className={`relative w-full max-w-6xl mx-auto mt-[28px] ${className}`}>
      <div className="relative max-w-[620px] h-[26.125rem] max-sm:h-[500px] overflow-hidden mt-10 rounded-lg border border-[#00E0FF33] shadow-[0_0_15px_2px_rgba(0,224,255,0.3)] mx-auto">
        <div className='w-[500px] h-[24px] flex justify-between mx-auto mt-14'>
          <Image src="/connect.png" alt='connect' width={24} height={24}/>
            <div className="text-center mt-2 text-base text-[#73838B] font-[DM Sans] font-normal leading-[100%] tracking-[0%]">
              {currentIndex + 1} / {items.length}
            </div>
        </div>

        {/* Slides */}
        <div
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className={`min-w-full h-full flex items-center justify-center relative `}>
              <div className="relative w-[31.25rem] h-[14.625rem] pt-6 z-10 text-start text-white">
                <h2 className="text-[28px] font-orbitron font-extrabold leading-[100%] pt-[24px] align-middle mb-4 drop-shadow-lg uppercase">
                  {item.title}
                  </h2>
                  <p className="text-xl font-[DM Sans] pt-1 font-normal mx-auto drop-shadow leading-[30px] align-middle">
                    {item.description}
                    </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Indicators */}
      <div className='w-[38.75rem] h-[3.1875rem] mt-20 flex justify-between flex-row'>
         {showIndicators && items.length > 1 && (
        <div className="flex justify-center space-x-3 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-sm transition-all duration-200 ${
                index === currentIndex
                  ? 'bg-[#0FF0FC] scale-125'
                  : 'bg-gray-500 hover:bg-[#0FF0FC]'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      <ButtonBg />
      </div>
    </div>
  );
};

const ConnectPlay: React.FC = () => {
  const carouselItems: CarouselItem[] = [
    {
      id: 1,
      title: "Connect & Play",
      description: "Connect your Web3 wallet to start playing Corepoly. It helps you join games, save progress, and keep your rewards safe.",
   
    },
    {
      id: 2,
      title: "Let the Games Begin",
      description: "Once you're in, join a game and play with people from around the world. Roll the dice, buy virtual properties, make deals, and try to win!",
    },
    {
      id: 3,
      title: "Think Smart, Play Hard",
      description: "Corepoly isn’t just about luck—it’s about smart moves. Buy wisely, make good deals, and try to beat your opponents. Every choice you make counts.",
    },
    {
      id: 4,
      title: "Rise to the Top",
      description: "The more you play, the higher you go! Win games, finish challenges, and earn rewards to move up the leaderboard.",
    }
  ];

  return (
      <div className="w-[41.75rem] h-[37.4375rem] gap-20 mx-auto mt-5">
        <Carousel
          items={carouselItems}
          autoPlay={true}
          autoPlayInterval={6000}
          showIndicators={true}
          showNavigation={true}
          className="mb-8"
        />
      </div>
  );
};
export default ConnectPlay;