import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="relative pt-10 pb-16 sm:pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative pt-10 bg-cover bg-center" style={{backgroundImage: "url('/images/hero-background.png')"}}>
            <div className="absolute inset-0 rounded-lg bg-white mix-blend-multiply" aria-hidden="true" />
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-green-100 to-white mix-blend-screen" aria-hidden="true" />
            <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="relative rounded-2xl shadow-lg">
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-green-50 blur-3xl" aria-hidden="true" />
                <img
                  className="h-full w-full object-cover rounded-2xl"
                  src="/images/birds.png"
                  alt="Birds"
                />
                <div className="absolute inset-0 text-center flex flex-col justify-center items-center">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                    <span className="block xl:inline text-gray-700">Assured Quality & Reliable Products</span>{' '}
                  </h2>
                  <p className="mt-3 max-w-md text-base text-gray-600 sm:mx-auto sm:max-w-lg sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                    <span className="block xl:inline text-gray-900 font-extrabold">Our Pet Shop</span>
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-center">
                    <div className="rounded-md shadow">
                      <a
                        href="#"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-green-500 px-8 py-3 text-base font-medium text-white hover:bg-green-700 md:py-4 md:px-10 md:text-lg"
                      >
                        Enquire Now
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;