const publicityLogos = [
  ["mozilla", "https://supabase.com/images/logos/publicity/mozilla.svg"],
  ["github", "https://supabase.com/images/logos/publicity/github.svg"],
  ["1password", "https://supabase.com/images/logos/publicity/1password.svg"],
  ["pwc", "https://supabase.com/images/logos/publicity/pwc.svg"],
  ["pika", "https://supabase.com/images/logos/publicity/pika.svg"],
  ["humata", "https://supabase.com/images/logos/publicity/humata.svg"],
  ["udio", "https://supabase.com/images/logos/publicity/udio.svg"],
  ["langchain", "https://supabase.com/images/logos/publicity/langchain.svg"],
  ["resend", "https://supabase.com/images/logos/publicity/resend.svg"],
  ["loops", "https://supabase.com/images/logos/publicity/loops.svg"],
  ["mobbin", "https://supabase.com/images/logos/publicity/mobbin.svg"],
  ["gopuff", "https://supabase.com/images/logos/publicity/gopuff.svg"],
  ["chatbase", "https://supabase.com/images/logos/publicity/chatbase.svg"],
  ["betashares", "https://supabase.com/images/logos/publicity/betashares.svg"],
  ["submagic", "https://supabase.com/images/logos/publicity/submagic.svg"],
];

const iconPath = {
  database:
    "M4 6.5C4 4.6 7.6 3 12 3s8 1.6 8 3.5S16.4 10 12 10 4 8.4 4 6.5Zm0 0v5c0 1.9 3.6 3.5 8 3.5s8-1.6 8-3.5v-5M4 11.5v5C4 18.4 7.6 20 12 20s8-1.6 8-3.5v-5",
  auth:
    "M12 3 5 6v5c0 4.4 2.9 8.4 7 10 4.1-1.6 7-5.6 7-10V6l-7-3Zm0 5v5l4 2",
  edge:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-7-9h14M12 3c2.2 2.5 3.3 5.5 3.3 9s-1.1 6.5-3.3 9c-2.2-2.5-3.3-5.5-3.3-9S9.8 5.5 12 3Z",
  storage:
    "M4 7.5 12 4l8 3.5-8 3.5-8-3.5Zm0 4 8 3.5 8-3.5M4 15.5 12 19l8-3.5",
  realtime:
    "M5 12a7 7 0 0 1 7-7m7 7a7 7 0 0 1-7 7m-4-7a4 4 0 0 1 4-4m4 4a4 4 0 0 1-4 4m0-4h.01",
  vector:
    "M12 3 4 19h16L12 3Zm0 6 3 6H9l3-6Z",
  apis:
    "M8 8 4 12l4 4M16 8l4 4-4 4M14 5l-4 14",
};

const svgIcon = (name) => `
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="${iconPath[name]}"></path>
  </svg>
`;

const products = [
  {
    wide: true,
    icon: "database",
    title: "Postgres Database",
    description: `Every project is <strong>a full Postgres database</strong>, the world's most trusted relational database.`,
    bullets: ["100% portable", "Built-in Auth with RLS", "Easy to extend"],
    image: "https://supabase.com/_next/image?url=%2Fimages%2Findex%2Fproducts%2Fdatabase-light.png&w=3840&q=100",
  },
  {
    icon: "auth",
    title: "Authentication",
    description: `Add user sign ups and logins, securing your data with Row Level Security.`,
    image: "https://supabase.com/images/index/products/auth-light.svg",
  },
  {
    icon: "edge",
    title: "Edge Functions",
    description: `Easily write custom code without deploying or scaling servers.`,
    image: "https://supabase.com/images/index/products/edge-functions-light.svg",
  },
  {
    icon: "storage",
    title: "Storage",
    description: `Store, organize, and serve large files from any media workflow.`,
    abstract: true,
  },
  {
    icon: "realtime",
    title: "Realtime",
    description: `Build multiplayer experiences with Postgres changes, broadcast, and presence.`,
    image: "https://supabase.com/images/index/products/realtime-light.svg",
  },
  {
    icon: "vector",
    title: "Vector",
    description: `Store, index, and search vector embeddings at scale with Postgres.`,
    image: "https://supabase.com/images/index/products/vector-light.svg",
  },
  {
    icon: "apis",
    title: "Data APIs",
    description: `Instant ready-to-use <strong>Restful APIs</strong>.`,
    image: "https://supabase.com/images/index/products/data-apis-light.svg",
  },
];

const frameworks = ["R", "N", "RW", "FL", "K", "SV", "SW", "V", "NU", "RF"];

const customerGroups = [
  [
    ["Quivr", "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Fquivr.png&w=640&q=75"],
    ["Tinloof", "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Ftinloof.png&w=640&q=75"],
  ],
  [
    ["1Password", "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2F1password.png&w=640&q=75"],
    ["Next Door Lending", "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Fnext-door-lending.png&w=640&q=75"],
  ],
  {
    alt: "Maergo",
    image: "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Fmaergo.png&w=3840&q=75",
    text: "Maergo's Express Delivery: How Supabase Helped Achieve Scalability, Speed, and Cost Saving",
  },
  [
    ["Shotgun", "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Fshotgun.png&w=640&q=75"],
    ["Mozilla", "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Fmozilla.png&w=640&q=75"],
  ],
  {
    alt: "Chatbase",
    image: "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Fchatbase.png&w=3840&q=75",
    text: "Chatbase goes upmarket on Supabase",
  },
  [
    ["Mobbin", "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Fmobbin.png&w=640&q=75"],
    ["HappyTeams", "https://supabase.com/_next/image?url=%2Fimages%2Fcustomers%2Flogos%2Fhappyteams.png&w=640&q=75"],
  ],
];

const templates = [
  {
    marks: ["S", "⚡", "V"],
    title: "Stripe Subscriptions Starter",
    text: "The all-in-one subscription starter kit for high-performance SaaS applications, powered by Stripe, Supabase, and Vercel.",
  },
  {
    marks: ["N"],
    title: "Next.js Starter",
    text: "A Next.js App Router template configured with cookie-based auth using Supabase, TypeScript and Tailwind CSS.",
  },
  {
    marks: ["AI"],
    title: "AI Chatbot",
    text: "An open-source AI chatbot app template built with Next.js, the Vercel AI SDK, OpenAI, and Supabase.",
  },
  {
    marks: ["LC", "OO", "N"],
    title: "LangChain + Next.js Starter",
    text: "Starter template and example use-cases for LangChain projects in Next.js, including chat, agents, and retrieval.",
  },
  {
    marks: ["F"],
    title: "Flutter User Management",
    text: "Get started with Supabase and Flutter by building a user management app with auth, file storage, and database.",
  },
  {
    marks: ["E"],
    title: "Expo React Native Starter",
    text: "An extended version of create-t3-turbo implementing authentication on both the web and mobile applications.",
  },
];

const tweets = [
  {
    handle: "@nerdburn",
    avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2F66VSV9Mm_400x400.png&w=128&q=75",
    text: "It's fun, feels lightweight, and really quick to spin up user auth and a few tables. Almost too easy! Highly recommend.",
  },
  {
    handle: "@adeelibr",
    avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2Fk0aPYRHF_400x400.jpg&w=128&q=75",
    text: "@supabase shout out, their MCP is awesome. It's helping me create better row securities and telling me best practises for setting up a supabase app",
    offset: true,
  },
  {
    handle: "@orlandopedro_",
    avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2FJwLEqyeo_400x400.jpg&w=128&q=75",
    text: "Love @supabase custom domains makes the auth so much better",
  },
  {
    handle: "@adm_lawson",
    avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2FI5pY1PAA_400x400.jpg&w=128&q=75",
    text: "Love supabse edge functions. Cursor+Supabase+MCP+Docker desktop is all I need",
  },
  {
    handle: "@TyronBache",
    avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2F89h9ROOs_400x400.jpg&w=128&q=75",
    text: "Really impressed with @supabase's Assistant. It has helped me troubleshoot and solve complex CORS configuration on Pinger.",
    offset: true,
  },
  {
    handle: "@sdusteric",
    avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2FFQsUZJMC_400x400.jpg&w=128&q=75",
    text: "Loving #Supabase MCP. Claude Code would not only plan what data we should save but also figure out a migration script by checking what the schema looks like on Supabase via MCP.",
    offset: true,
  },
  {
    handle: "@gokul_i",
    avatar: "https://supabase.com/_next/image?url=%2Fimages%2Ftwitter-profiles%2FEtC0mhne_400x400.jpg&w=128&q=75",
    text: "First time running @supabase in local. It just works. Very good imo.",
    offset: true,
  },
];

const footerColumns = [
  ["Product", ["Pricing", "Database", "Auth", "Functions", "Realtime", "Storage", "Vector", "Cron", "Feature Catalog", "Launch Week"]],
  ["Solutions", ["Hosted Postgres", "AI Builders", "No Code", "Beginners", "Developers", "Postgres Devs", "Vibe Coders", "Hackathon Contestants", "Startups", "Agencies", "Enterprise", "Innovation Teams"]],
  ["Resources", ["Blog", "Support", "System Status", "Become a Partner", "Integrations", "Brand Assets", "Security & Compliance", "DPA", "SOC2", "HIPAA"]],
  ["Developers", ["Documentation", "Supabase UI", "Changelog", "RSS"]],
  ["Community", ["Events & Webinars", "SupaSquad", "Contributing", "Open Source", "DevTo"]],
  ["Company", ["Company", "Careers", "General Availability", "Terms of Service", "Privacy Policy", "Privacy Settings", "Acceptable Use Policy", "Support Policy", "Service Level Agreement", "Humans.txt", "Lawyers.txt", "Security.txt", "Contact Us"]],
];

const renderPublicityLogos = () => {
  const track = document.querySelector("#publicityLogos");
  const items = [...publicityLogos, ...publicityLogos, ...publicityLogos];
  track.innerHTML = items.map(([alt, src]) => `<img src="${src}" alt="${alt}" />`).join("");
};

const renderProducts = () => {
  document.querySelector("#productsGrid").innerHTML = products
    .map(
      (product) => `
      <a class="product-card ${product.wide ? "wide" : ""}" href="#">
        <div class="product-card-inner">
          <div class="product-copy">
            <div class="product-title">${svgIcon(product.icon)}<h2>${product.title}</h2></div>
            <p>${product.description}</p>
            ${
              product.bullets
                ? `<ul>${product.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}</ul>`
                : ""
            }
          </div>
          <div class="product-visual">
            ${
              product.abstract
                ? `<div class="product-abstract"></div>`
                : `<img src="${product.image}" alt="${product.title}" />`
            }
          </div>
        </div>
      </a>`
    )
    .join("");
};

const renderFrameworks = () => {
  document.querySelector("#frameworkGrid").innerHTML = frameworks
    .map((label) => `<a class="framework-tile" href="#" aria-label="Framework">${label}</a>`)
    .join("");
};

const logoCard = ([alt, image]) => `
  <a class="customer-card" href="#">
    <div class="customer-card-inner"><img src="${image}" alt="${alt}" /></div>
  </a>
`;

const renderCustomers = () => {
  document.querySelector("#customerRail").innerHTML = customerGroups
    .map((group) => {
      if (Array.isArray(group)) {
        return `<div class="customer-stack">${group.map(logoCard).join("")}</div>`;
      }
      return `
        <a class="customer-card featured" href="#">
          <div class="customer-card-inner">
            <img src="${group.image}" alt="${group.alt}" />
            <p>${group.text}</p>
          </div>
        </a>`;
    })
    .join("");
};

const renderTemplates = () => {
  document.querySelector("#templatesGrid").innerHTML = templates
    .map(
      (template) => `
      <article class="template-card">
        <div class="template-visual">
          <div class="template-marks">${template.marks.map((mark) => `<span>${mark}</span>`).join("")}</div>
        </div>
        <div class="template-body">
          <h3>${template.title}</h3>
          <p>${template.text}</p>
        </div>
        <button class="template-link" type="button">View Template ↗</button>
      </article>`
    )
    .join("");
};

const renderTweets = () => {
  document.querySelector("#tweetsGrid").innerHTML = tweets
    .map(
      (tweet) => `
      <a class="tweet-card ${tweet.offset ? "offset" : ""}" href="#">
        <div class="tweet-head">
          <img src="${tweet.avatar}" alt="${tweet.handle} twitter image" />
          <strong>${tweet.handle}</strong>
          <span class="x-badge">X</span>
        </div>
        <p>${tweet.text}</p>
      </a>`
    )
    .join("");
};

const renderFooter = () => {
  document.querySelector("#footerColumns").innerHTML = footerColumns
    .map(
      ([title, links]) => `
      <section class="footer-column">
        <h3>${title}</h3>
        <ul>${links.map((link) => `<li><a href="#">${link}</a></li>`).join("")}</ul>
      </section>`
    )
    .join("");
};

document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dimmed");
});

renderPublicityLogos();
renderProducts();
renderFrameworks();
renderCustomers();
renderTemplates();
renderTweets();
renderFooter();
