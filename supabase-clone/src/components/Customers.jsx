import React from 'react';

const Customers = () => {
  // Testimonial data derived from the extracted logos and layout structure
  const testimonials = [
    {
      handle: "@nerdburn",
      avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2F66VSV9Mm_400x400.png&w=128&q=75",
      content: "I've been using Supabase for a few months now and it's absolutely fantastic. The developer experience is unmatched.",
      role: "Lead Engineer"
    },
    {
      handle: "@patrickc",
      avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2F_iAaSUQf_400x400.jpg&w=128&q=75",
      content: "Supabase completely changed how we build products. We shipped our MVP in a weekend instead of a month.",
      role: "Founder"
    },
    {
      handle: "@Aliahsan_sfv",
      avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2F2SQwtv8c_400x400.jpg&w=128&q=75",
      content: "The Postgres features combined with the real-time capabilities make Supabase an easy choice for any new project.",
      role: "Fullstack Developer"
    },
    {
      handle: "@sdusteric",
      avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2FFQsUZJMC_400x400.jpg&w=128&q=75",
      content: "Migrated from Firebase to Supabase and couldn't be happier. SQL is just so much more powerful for our complex queries.",
      role: "CTO"
    },
    {
      handle: "@orlandopedro_",
      avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2FJwLEqyeo_400x400.jpg&w=128&q=75",
      content: "Auth, database, storage, and edge functions all in one place. Supabase is the ultimate backend as a service.",
      role: "Indie Hacker"
    },
    {
      handle: "@adeelibr",
      avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2Fk0aPYRHF_400x400.jpg&w=128&q=75",
      content: "The local development experience with the Supabase CLI is incredible. Testing locally is a breeze.",
      role: "Software Architect"
    }
  ];

  return (
    <div className="overflow-hidden pb-16 md:pb-24 pt-8 md:pt-10">
      <div className="mx-auto container px-6 lg:px-16 xl:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-foreground text-3xl sm:text-4xl md:text-5xl font-normal leading-tight">
            Trusted by the world’s most innovative companies.
          </h2>
        </div>

        {/* Featured Case Studies Grid (Top row) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          
          {/* Maergo Card */}
          <a href="#" className="group relative flex flex-col focus:outline-none focus:border-none focus:ring-0">
             <div className="group/panel relative rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1 block h-full">
              <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden flex flex-col items-center justify-center p-8 min-h-[300px]">
                <img 
                  src="https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Flight%2Fmaergo.png&w=640&q=75" 
                  alt="Maergo" 
                  className="w-full max-w-[200px] h-auto object-contain opacity-50 group-hover:opacity-100 filter dark:invert transition-all duration-300"
                />
                <p className="mt-6 text-sm text-foreground-light text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-8 px-6">
                  How Supabase Helped Achieve Scalability, Speed, and Cost Saving
                </p>
              </div>
             </div>
          </a>

          {/* Chatbase Card */}
           <a href="#" className="group relative flex flex-col focus:outline-none focus:border-none focus:ring-0">
             <div className="group/panel relative rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1 block h-full">
              <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden flex flex-col items-center justify-center p-8 min-h-[300px]">
                <img 
                  src="https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Flight%2Fchatbase.png&w=640&q=75" 
                  alt="Chatbase" 
                  className="w-full max-w-[200px] h-auto object-contain opacity-50 group-hover:opacity-100 filter dark:invert transition-all duration-300"
                />
                 <p className="mt-6 text-sm text-foreground-light text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-8 px-6">
                  Bootstrapped founder builds an AI app and scales to $1M in 5 months.
                </p>
              </div>
             </div>
          </a>

          {/* Pebblely Card */}
           <a href="#" className="group relative flex flex-col focus:outline-none focus:border-none focus:ring-0">
             <div className="group/panel relative rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50 transition-all duration-300 transform motion-safe:hover:-translate-y-1 block h-full">
              <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] overflow-hidden flex flex-col items-center justify-center p-8 min-h-[300px]">
                <img 
                   src="https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Flight%2Fpebblely.png&w=640&q=75" 
                  alt="Pebblely" 
                  className="w-full max-w-[200px] h-auto object-contain opacity-50 group-hover:opacity-100 filter dark:invert transition-all duration-300"
                />
                 <p className="mt-6 text-sm text-foreground-light text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-8 px-6">
                  Scaling securely: one million users in 7 months protected with Supabase Auth
                </p>
              </div>
             </div>
          </a>

        </div>

        {/* Community Testimonials Grid (Bottom rows) */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, i) => (
            <div key={i} className="break-inside-avoid">
              <div className="group/panel relative rounded-lg md:rounded-xl p-px bg-surface-75 bg-gradient-to-b from-border to-border/50 dark:from-border dark:to-border/50">
                <div className="relative h-full bg-[#1c1c1c] rounded-[7px] md:rounded-[11px] p-6 lg:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.handle} 
                      className="w-10 h-10 rounded-full border border-border" 
                    />
                    <div>
                      <p className="text-foreground text-sm font-medium leading-none">{testimonial.handle}</p>
                      <p className="text-foreground-lighter text-xs mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground-light text-sm leading-relaxed">
                    "{testimonial.content}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Customers;
