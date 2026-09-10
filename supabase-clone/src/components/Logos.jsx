import React from 'react';

const Logos = () => {
  return (
    <div className="pb-14 md:pb-24">
      <div className="max-w-md md:max-w-lg lg:max-w-2xl mx-auto">
        <div className="relative w-full mx-auto max-w-4xl opacity-90 dark:opacity-70 overflow-hidden before:content-[''] before:absolute before:inset-y-0 before:left-0 before:w-32 before:bg-gradient-to-r before:from-background before:to-transparent before:z-10 after:content-[''] after:absolute after:inset-y-0 after:right-0 after:w-32 after:bg-gradient-to-l after:from-background after:to-transparent after:z-10">
          <div className="gap-4 lg:gap-8 flex flex-nowrap w-fit animate-[marquee_20s_linear_infinite] will-change-transform">
            
            {/* Logos */}
            <div className="h-12 lg:h-12 w-max !inline-block opacity-60 hover:opacity-100 transition duration-300 mx-4">
              <img alt="mozilla" width="114" height="60" src="https://supabase.com/images/logos/publicity/mozilla.svg" />
            </div>
            <div className="h-12 lg:h-12 w-max !inline-block opacity-60 hover:opacity-100 transition duration-300 mx-4">
              <img alt="github" width="139" height="62" src="https://supabase.com/images/logos/publicity/github.svg" />
            </div>
            <div className="h-12 lg:h-12 w-max !inline-block opacity-60 hover:opacity-100 transition duration-300 mx-4">
              <img alt="1password" width="143" height="60" src="https://supabase.com/images/logos/publicity/1password.svg" />
            </div>
            <div className="h-12 lg:h-12 w-max !inline-block opacity-60 hover:opacity-100 transition duration-300 mx-4">
              <img alt="pwc" width="113" height="60" src="https://supabase.com/images/logos/publicity/pwc.svg" />
            </div>
            
            {/* Duplicate for infinite loop effect */}
            <div className="h-12 lg:h-12 w-max !inline-block opacity-60 hover:opacity-100 transition duration-300 mx-4">
              <img alt="mozilla" width="114" height="60" src="https://supabase.com/images/logos/publicity/mozilla.svg" />
            </div>
            <div className="h-12 lg:h-12 w-max !inline-block opacity-60 hover:opacity-100 transition duration-300 mx-4">
              <img alt="github" width="139" height="62" src="https://supabase.com/images/logos/publicity/github.svg" />
            </div>
            <div className="h-12 lg:h-12 w-max !inline-block opacity-60 hover:opacity-100 transition duration-300 mx-4">
              <img alt="1password" width="143" height="60" src="https://supabase.com/images/logos/publicity/1password.svg" />
            </div>
            <div className="h-12 lg:h-12 w-max !inline-block opacity-60 hover:opacity-100 transition duration-300 mx-4">
              <img alt="pwc" width="113" height="60" src="https://supabase.com/images/logos/publicity/pwc.svg" />
            </div>

          </div>
        </div>
        <p className="text-center text-sm text-foreground-lighter mt-8">
          Trusted by fast-growing companies worldwide
        </p>
      </div>
    </div>
  );
};

export default Logos;
