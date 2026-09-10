import React from 'react';

const BottomCTA = () => {
  return (
    <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 pt-8 pb-10 md:pt-10">
      <div className="relative">
        <div className="mx-auto">
          <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
             <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-normal leading-tight mb-8">
               Build in a weekend, scale to millions
             </h2>
             <div className="flex items-center gap-2">
                <a className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 bg-[#006239] hover:bg-[#007b46] text-foreground border border-[rgba(62,207,142,0.3)] py-2 px-6 rounded-md text-sm" href="/dashboard">
                  <span className="truncate">Start your project</span>
                </a>
                <a className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 bg-[#242424] hover:bg-[#2e2e2e] text-foreground border border-[#363636] py-2 px-6 rounded-md text-sm" href="/contact/sales">
                  <span className="truncate">Request a demo</span>
                </a>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomCTA;
