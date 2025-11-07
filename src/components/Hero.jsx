import React from 'react';
import Spline from '@splinetool/react-spline';

const Hero = ({ children }) => {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] overflow-hidden rounded-2xl">
      <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="max-w-xl w-full">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Hero;
