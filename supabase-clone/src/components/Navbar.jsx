import React from 'react';
import { ChevronDown, Github } from 'lucide-react';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-40 transform">
      <div className="absolute inset-0 h-full w-full bg-background/90 !opacity-100 transition-opacity"></div>
      
      <nav className="relative z-40 border-border border-b backdrop-blur-sm transition-opacity">
        <div className="relative flex justify-between h-16 mx-auto lg:container lg:px-16 xl:px-20">
          
          <div className="flex items-center px-6 lg:px-0 flex-1 sm:items-stretch justify-between">
            {/* Left side: Logo & Nav Links */}
            <div className="flex items-center">
              
              {/* Logo */}
              <div className="flex items-center flex-shrink-0">
                <a className="block w-auto h-6 focus-visible:ring-2 focus-visible:outline-none focus-visible:ring-foreground-light" href="/">
                  <img 
                    alt="Supabase Logo" 
                    width="124" 
                    height="24" 
                    src="https://supabase.com/_next/image?url=https%3A%2F%2Ffrontend-assets.supabase.com%2Fwww%2F614b2071e9fa%2F_next%2Fstatic%2Fmedia%2Fsupabase-logo-wordmark--dark.b36ebb5f.png&w=256&q=75" 
                  />
                </a>
              </div>
              
              {/* Desktop Nav Links */}
              <nav className="relative z-10 flex-1 items-center justify-center hidden pl-8 sm:space-x-4 lg:flex h-16">
                <div>
                  <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
                    <li className="text-sm font-medium">
                      <button className="group relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular hover:text-foreground text-foreground-light transition duration-200">
                        <span>Product</span>
                        <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-hover:rotate-180" />
                      </button>
                    </li>
                    <li className="text-sm font-medium">
                      <button className="group relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular hover:text-foreground text-foreground-light transition duration-200 ml-1">
                        <span>Developers</span>
                        <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-hover:rotate-180" />
                      </button>
                    </li>
                    <li className="text-sm font-medium">
                      <button className="group relative justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular hover:text-foreground text-foreground-light transition duration-200 ml-1">
                        <span>Solutions</span>
                        <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-hover:rotate-180" />
                      </button>
                    </li>
                    <li className="text-sm font-medium">
                      <a className="group/menu-item flex items-center text-sm text-foreground-light hover:text-foreground select-none gap-3 rounded-md p-2 leading-snug ml-1 transition duration-200" href="/pricing">
                        Pricing
                      </a>
                    </li>
                    <li className="text-sm font-medium">
                      <a className="group/menu-item flex items-center text-sm text-foreground-light hover:text-foreground select-none gap-3 rounded-md p-2 leading-snug ml-1 transition duration-200" href="/docs">
                        Docs
                      </a>
                    </li>
                    <li className="text-sm font-medium">
                      <a className="group/menu-item flex items-center text-sm text-foreground-light hover:text-foreground select-none gap-3 rounded-md p-2 leading-snug ml-1 transition duration-200" href="/blog">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            {/* Right side: GitHub, Sign In, Start Project */}
            <div className="flex items-center gap-2 opacity-100 animate-fade-in !scale-100 delay-300">
              <div className="flex items-center gap-2 transition-opacity opacity-100">
                <a className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 hover:text-foreground text-[#b4b4b4] flex py-1 px-2.5 text-xs rounded-md" href="https://github.com/supabase/supabase">
                  <span className="truncate flex items-center gap-1">
                    <Github className="w-4 h-4" />
                    98.9K
                  </span>
                </a>
                <a className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 bg-[#242424] hover:bg-[#2e2e2e] text-foreground border border-[#363636] py-1 px-2.5 rounded-md text-xs inline-flex" href="/dashboard">
                  <span className="truncate">Sign in</span>
                </a>
                <a className="relative justify-center cursor-pointer items-center space-x-2 text-center font-regular ease-out duration-200 bg-[#006239] hover:bg-[#007b46] text-foreground border border-[rgba(62,207,142,0.3)] py-1 px-2.5 rounded-md text-xs inline-flex" href="/dashboard/sign-up">
                  <span className="truncate">Start your project</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
