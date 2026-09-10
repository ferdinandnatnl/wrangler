import React from 'react';

const Hero = () => {
  return (
    <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 pt-32 pb-10 md:pt-40">
      <div className="relative">
        <div className="mx-auto">
          <div className="mx-auto max-w-2xl lg:col-span-6 lg:flex lg:items-center justify-center text-center">
            
            <div className="relative z-10 lg:h-auto pt-[90px] lg:pt-[90px] lg:min-h-[300px] flex flex-col items-center justify-center">
              <div className="flex flex-col items-center">
                <h1 className="text-foreground text-4xl sm:text-5xl sm:leading-none lg:text-[72px] lg:leading-[72px]">
                  <span className="block text-foreground">
                    Build in a weekend
                  </span>
                  <span className="text-brand block md:ml-0">
                    Scale to millions
                  </span>
                </h1>
                
                <p className="pt-2 text-foreground my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg max-w-3xl">
                  Supabase is the Postgres development platform.
                  <br className="hidden md:block" />
                  Start your project with a Postgres database, Authentication, instant APIs, Edge Functions, Realtime subscriptions, Storage, and Vector embeddings.
                </p>
              </div>

              <div className="flex items-center gap-2 mt-8">
                <a className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 bg-[#006239] hover:bg-[#007b46] text-foreground border border-[rgba(62,207,142,0.3)] py-2 px-4 rounded-md text-sm" href="/dashboard">
                  <span className="truncate">Start your project</span>
                </a>
                <a className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 bg-[#242424] hover:bg-[#2e2e2e] text-foreground border border-[#363636] py-2 px-4 rounded-md text-sm" href="/contact/sales">
                  <span className="truncate">Request a demo</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
