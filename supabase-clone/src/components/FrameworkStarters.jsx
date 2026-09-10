import React from 'react';

const FrameworkStarters = () => {
  return (
    <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 pt-8 pb-10 md:pt-10">
      <div className="relative">
        <div className="mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              Start building in seconds
            </h2>
            <p className="pt-2 text-foreground-light my-3 text-sm sm:mt-5 lg:mb-0 sm:text-base lg:text-lg">
              Kickstart your next project with templates built by us and our community.
            </p>
          </div>

          {/* Framework Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-100 animate-fade-in">
            
            {/* Next.js Starter */}
            <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
              <a href="#" className="flex-1 group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1 block">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden flex flex-col">
                  <div className="p-6 md:p-8 flex flex-col h-full z-10">
                    <div className="flex items-center justify-between mb-4">
                      
                      {/* Using abstract shapes to represent framework logos if specific svgs aren't isolated */}
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-background">
                             <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                             <path d="M12 2v20 M2 12h20" stroke="currentColor" strokeWidth="2" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium text-foreground">Next.js Starter</h4>
                      </div>

                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-lighter group-hover:text-foreground transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <path d="M5 19L19 5M19 5v10M19 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-foreground-light">A Next.js App Router template configured with cookie-based Auth and Tailwind CSS.</p>
                  </div>
                  
                  {/* Decorative faint background shape */}
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-border/10 to-transparent pointer-events-none"></div>
                </div>
              </a>
            </div>

            {/* AI Chatbot */}
            <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
               <a href="#" className="flex-1 group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1 block">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden flex flex-col">
                  <div className="p-6 md:p-8 flex flex-col h-full z-10">
                    <div className="flex items-center justify-between mb-4">
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-foreground flex items-center justify-center">
                          <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-background">
                             <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
                             <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                             <circle cx="15.5" cy="8.5" r="1.5" fill="currentColor" />
                             <path d="M9 15c1.5 2 4.5 2 6 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium text-foreground">AI Chatbot</h4>
                      </div>

                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-lighter group-hover:text-foreground transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <path d="M5 19L19 5M19 5v10M19 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-foreground-light">An open-source AI chatbot app template built with Next.js, the Vercel AI SDK, and Supabase Vector.</p>
                  </div>
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-border/10 to-transparent pointer-events-none"></div>
                </div>
              </a>
            </div>

            {/* Stripe Subscriptions */}
             <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
               <a href="#" className="flex-1 group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1 block">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden flex flex-col">
                  <div className="p-6 md:p-8 flex flex-col h-full z-10">
                    <div className="flex items-center justify-between mb-4">
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-[#635BFF] flex items-center justify-center">
                            <span className="text-white font-bold text-xs tracking-wider">st</span>
                        </div>
                        <h4 className="text-lg font-medium text-foreground">Stripe Subscriptions</h4>
                      </div>

                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-lighter group-hover:text-foreground transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <path d="M5 19L19 5M19 5v10M19 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-foreground-light">The all-in-one starter kit for high-performance SaaS applications with Stripe billing.</p>
                  </div>
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#635BFF]/5 to-transparent pointer-events-none"></div>
                </div>
              </a>
            </div>

            {/* Flutter User Management */}
             <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
               <a href="#" className="flex-1 group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1 block">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden flex flex-col">
                  <div className="p-6 md:p-8 flex flex-col h-full z-10">
                    <div className="flex items-center justify-between mb-4">
                      
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded bg-[#45D1FD] flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                <path d="M14.314 0L2.3 12 6 15.7 21.684.01 14.314 0zm.016 11.372L10.5 15.2l3.818 3.824L24 9.172l-9.67 2.2zM14.314 24l-3.812-3.816L14.316 16.37l5.44 5.432z" />
                            </svg>
                        </div>
                        <h4 className="text-lg font-medium text-foreground">Flutter User Management</h4>
                      </div>

                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-lighter group-hover:text-foreground transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1">
                        <path d="M5 19L19 5M19 5v10M19 5H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p className="text-sm text-foreground-light">Get started with Supabase and Flutter by building a simple user management app.</p>
                  </div>
                  <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#45D1FD]/5 to-transparent pointer-events-none"></div>
                </div>
              </a>
            </div>

            {/* View All Templates Card */}
            <div className="group relative flex flex-col justify-center items-center gap-5 focus:outline-none focus:border-none focus:ring-0">
               <div className="flex flex-col items-center">
                 <p className="text-foreground-light mb-4">Explore our library of examples and starters.</p>
                 <a href="/templates" className="relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 bg-[#242424] hover:bg-[#2e2e2e] text-foreground border border-[#363636] py-2 px-6 rounded-md text-sm">
                    View Template
                 </a>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameworkStarters;
