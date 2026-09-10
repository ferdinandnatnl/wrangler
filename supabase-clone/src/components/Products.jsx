import React from 'react';

const Products = () => {
  return (
    <div className="sm:py-18 container relative mx-auto px-6 py-16 md:py-24 lg:px-16 lg:py-24 xl:px-20 pt-8 pb-10 md:pt-10">
      <div className="relative">
        <div className="mx-auto">
          {/* Section Header */}
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
              Build in a weekend,<br className="hidden md:block" /> scale to millions
            </h2>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-100 animate-fade-in">
            
            {/* Database Card */}
            <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
              <div className="group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden">
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="m-1 bg-[#121212] h-10 w-10 flex items-center justify-center rounded-md border border-border">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-light group-hover:text-foreground transition-colors">
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor"/>
                           <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="currentColor"/>
                         </svg>
                      </div>
                      <h3 className="text-xl font-medium text-foreground">Database</h3>
                    </div>
                    <p className="text-sm text-foreground-light mb-8 flex-grow">
                      Every project is a full Postgres database, the world's most trusted relational database.
                    </p>
                    
                    <div className="relative w-full h-48 mt-auto rounded-lg overflow-hidden border border-border bg-[#121212]">
                      <img 
                        src="https://supabase.com/_next/image?url=%2Fimages%2Findex%2Fproducts%2Fdatabase-dark.png&w=3840&q=100" 
                        alt="Supabase Postgres database" 
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Authentication Card */}
            <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
              <div className="group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden">
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="m-1 bg-[#121212] h-10 w-10 flex items-center justify-center rounded-md border border-border">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-light group-hover:text-foreground transition-colors">
                           <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" fill="currentColor"/>
                         </svg>
                      </div>
                      <h3 className="text-xl font-medium text-foreground">Authentication</h3>
                    </div>
                    <p className="text-sm text-foreground-light mb-8 flex-grow">
                      Add user sign ups and logins, securing your data with Row Level Security.
                    </p>
                    
                    <div className="relative w-full h-48 mt-auto rounded-lg overflow-hidden border border-border bg-[#121212] flex items-center justify-center p-4">
                      <img 
                        src="https://supabase.com/images/index/products/auth.svg" 
                        alt="Supabase Authentication" 
                        className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-0 transition-opacity"
                      />
                      <img 
                        src="https://supabase.com/images/index/products/auth-active.svg" 
                        alt="Supabase Authentication Active" 
                        className="absolute inset-0 w-full h-full object-contain opacity-0 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edge Functions Card */}
            <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
              <div className="group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden">
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="m-1 bg-[#121212] h-10 w-10 flex items-center justify-center rounded-md border border-border">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-light group-hover:text-foreground transition-colors">
                           <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95a15.65 15.65 0 00-1.38-3.56A8.03 8.03 0 0118.92 8zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2s.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56A7.987 7.987 0 015.08 16zm2.95-8H5.08a7.987 7.987 0 014.33-3.56A15.65 15.65 0 008.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2s.07-1.35.16-2h4.68c.09.65.16 1.32.16 2s-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95a8.03 8.03 0 01-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2s-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z" fill="currentColor"/>
                         </svg>
                      </div>
                      <h3 className="text-xl font-medium text-foreground">Edge Functions</h3>
                    </div>
                    <p className="text-sm text-foreground-light mb-8 flex-grow">
                      Easily write custom code without deploying or scaling servers. Fast globally.
                    </p>
                    
                    <div className="relative w-full h-48 mt-auto rounded-lg overflow-hidden border border-border bg-[#121212] flex items-center justify-center p-4">
                      <img 
                        src="https://supabase.com/images/index/products/edge-functions-dark.svg" 
                        alt="Supabase Edge Functions" 
                        className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Storage Card */}
            <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
              <div className="group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden">
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="m-1 bg-[#121212] h-10 w-10 flex items-center justify-center rounded-md border border-border">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-light group-hover:text-foreground transition-colors">
                           <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z" fill="currentColor"/>
                         </svg>
                      </div>
                      <h3 className="text-xl font-medium text-foreground">Storage</h3>
                    </div>
                    <p className="text-sm text-foreground-light mb-8 flex-grow">
                      Store, organize, and serve large files. Any media, including video and audio.
                    </p>
                    
                    <div className="relative w-full h-48 mt-auto rounded-lg overflow-hidden border border-border bg-[#121212] flex items-center justify-center p-4 group-hover:border-brand/50 transition-colors">
                      {/* Placeholder for Storage visual if explicit image not readily identified in set, using abstract shapes */}
                      <div className="flex gap-2 h-full w-full items-end justify-center pb-4">
                        <div className="w-8 bg-[#2a2a2a] h-20 rounded-t-md group-hover:bg-[#3ecf8e] transition-colors duration-500 delay-75"></div>
                        <div className="w-8 bg-[#2a2a2a] h-32 rounded-t-md group-hover:bg-[#3ecf8e] transition-colors duration-500 delay-150"></div>
                        <div className="w-8 bg-[#2a2a2a] h-24 rounded-t-md group-hover:bg-[#3ecf8e] transition-colors duration-500 delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Realtime Card */}
            <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
              <div className="group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden">
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="m-1 bg-[#121212] h-10 w-10 flex items-center justify-center rounded-md border border-border">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-light group-hover:text-foreground transition-colors">
                           <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
                         </svg>
                      </div>
                      <h3 className="text-xl font-medium text-foreground">Realtime</h3>
                    </div>
                    <p className="text-sm text-foreground-light mb-8 flex-grow">
                      Build multiplayer experiences with broadcast, presence, and Postgres changes.
                    </p>
                    
                    <div className="relative w-full h-48 mt-auto rounded-lg overflow-hidden border border-border bg-[#121212] flex items-center justify-center p-4">
                      <img 
                        src="https://supabase.com/images/index/products/realtime-dark.svg" 
                        alt="Supabase Realtime" 
                        className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Vector Card */}
            <div className="group relative flex flex-col gap-5 focus:outline-none focus:border-none focus:ring-0">
              <div className="group/panel rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden">
                  <div className="p-6 md:p-8 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="m-1 bg-[#121212] h-10 w-10 flex items-center justify-center rounded-md border border-border">
                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-foreground-light group-hover:text-foreground transition-colors">
                           <path d="M12 2l-5.5 9h11L12 2zm0 3.84L13.93 9h-3.87L12 5.84zM17.5 13c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5 4.5-2.01 4.5-4.5-2.01-4.5-4.5-4.5zm0 7c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5zM3 21.5h8v-8H3v8zm2-6h4v4H5v-4z" fill="currentColor"/>
                         </svg>
                      </div>
                      <h3 className="text-xl font-medium text-foreground">Vector</h3>
                    </div>
                    <p className="text-sm text-foreground-light mb-8 flex-grow">
                      Integrate your favorite ML-models to store, index and search vector embeddings.
                    </p>
                    
                    <div className="relative w-full h-48 mt-auto rounded-lg overflow-hidden border border-border bg-[#121212] flex items-center justify-center p-4">
                      <img 
                        src="https://supabase.com/images/index/products/vector-dark.svg" 
                        alt="Supabase Vector Graph" 
                        className="absolute inset-0 w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity mix-blend-screen"
                      />
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

export default Products;
