import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border pt-16 pb-12 mt-20">
      <div className="mx-auto container px-6 lg:px-16 xl:px-20">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-16">
          {/* Logo Column */}
          <div className="col-span-2 lg:col-span-2">
            <a href="/" className="mb-6 block">
               <img 
                  alt="Supabase Logo" 
                  width="124" 
                  height="24" 
                  src="https://supabase.com/_next/image?url=https%3A%2F%2Ffrontend-assets.supabase.com%2Fwww%2F614b2071e9fa%2F_next%2Fstatic%2Fmedia%2Fsupabase-logo-wordmark--dark.b36ebb5f.png&w=256&q=75" 
                />
            </a>
            <div className="flex gap-4 mb-6">
                {/* Social icons placeholders */}
                <a href="#" className="text-foreground-lighter hover:text-foreground transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
                <a href="#" className="text-foreground-lighter hover:text-foreground transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                </a>
                 <a href="#" className="text-foreground-lighter hover:text-foreground transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8h-4v8"/><path d="M12 12h4"/></svg>
                </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-foreground font-medium mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-foreground-lighter">
              <li><a href="#" className="hover:text-foreground transition-colors">Database</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Auth</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Functions</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Realtime</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Storage</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Vector</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-foreground font-medium mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-foreground-lighter">
              <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">System Status</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Become a Partner</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Integrations</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Experts</a></li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-foreground font-medium mb-4">Developers</h4>
            <ul className="space-y-3 text-sm text-foreground-lighter">
              <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Changelog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contributing</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Open Source</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">SupaSquad</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-foreground font-medium mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-foreground-lighter">
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Customer Stories</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Company</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between pt-8 border-t border-border items-center gap-4">
            <div className="flex items-center gap-4 text-sm text-foreground-lighter">
                 <button className="hover:text-foreground transition-colors flex items-center gap-2">
                     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                     <span>System theme</span>
                 </button>
            </div>
            <p className="text-sm text-foreground-lighter">
              © {new Date().getFullYear()} Supabase Inc.
            </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
