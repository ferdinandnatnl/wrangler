const { createElement: h, useState } = React;

const eventData = [
  {
    title: "Kahf Brotherhood Run Training Camp: EVOLVE",
    time: "Today, 6:00 PM",
    location: "GBK Madya Stadium",
    href: "/9xjotpp8",
    image:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=80,height=80/uploads/1s/ae126d30-5e28-41df-8f16-44c0f1e3846e.png",
  },
  {
    title: "CapCut AI Content Fest 2026 (Screening Film)",
    time: "Tomorrow, 3:00 PM",
    location: "CGV Grand Indonesia",
    href: "/CapCutAIContentFest2026-Screening",
    image:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=80,height=80/uploads/zt/292f09d7-46fe-4995-8975-f7ba7caef3fd.jpg",
  },
  {
    title: "Founders & VCs' Padel & Networking Vol 5",
    time: "Tomorrow, 6:00 PM",
    href: "/lut123ci",
    image:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=80,height=80/uploads/ut/a3aee6a8-a250-4757-84ee-b548178005f2.jpg",
  },
  {
    title: "Grok Bot Workshop | Tangerang",
    time: "Tomorrow, 6:00 PM",
    location: "Garuda Spark Innovation Hub - BSD",
    href: "/grok-bot-tgr",
    image:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=80,height=80/uploads/ku/316a0c2f-e638-441a-8dac-49d9a7015650.png",
  },
  {
    title: "Astra Commons: Jakarta",
    time: "Sat, Sep 12, 10:00 AM",
    location: "ReVerse | Coffee & Tea",
    href: "/a7x5kjwz",
    status: "Going",
    image:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=80,height=80/uploads/hh/ab878cb5-51a5-4fef-b336-475c79c9d2fc.png",
  },
  {
    title: "RBF Local loop",
    time: "Sun, Sep 13, 6:00 AM",
    location: "Berkawan Hub - Panglima Polim",
    href: "/z1hgwsh8",
    image:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=80,height=80/uploads/ws/292d8bf8-017b-4720-a3d9-1875bc92d8d3.jpg",
  },
];

const categories = [
  { name: "Family", count: "658", href: "/family?k=t", image: "https://images.lumacdn.com/uploads/aq/f5fbdde4-46a9-4d9e-b730-7144b3c0e335.png" },
  { name: "Books", count: "705", href: "/books?k=t", image: "https://images.lumacdn.com/uploads/3g/f33c0b3c-9090-40bb-b99c-875b534bcee4.png" },
  { name: "Games", count: "507", href: "/games?k=t", image: "https://images.lumacdn.com/uploads/mp/c65f64de-a537-4867-b7e6-7eedd3470c82.png" },
  { name: "Tech", count: "5K", href: "/tech?k=t", image: "https://images.lumacdn.com/uploads/v7/3f6baafa-d90d-4013-9853-0fa10331f796.png" },
  { name: "Food & Drink", count: "629", href: "/food?k=t", image: "https://images.lumacdn.com/uploads/36/a77db635-cb3b-4720-9758-2bc9dae948e4.png" },
  { name: "AI", count: "4K", href: "/ai?k=t", image: "https://images.lumacdn.com/uploads/0z/c1143c0e-a2ab-4434-b82b-80b0ba3ec2f0.png" },
  { name: "Running", count: "920", href: "/running?k=t", image: "https://images.lumacdn.com/uploads/9f/9a31599b-38be-49c8-9c46-dfa19becb9ad.png" },
  { name: "Arts & Culture", count: "4K", href: "/arts?k=t", image: "https://images.lumacdn.com/uploads/u8/5eeba5a4-d305-4bc1-9017-329937813f30.png" },
  { name: "Climate", count: "2K", href: "/climate?k=t", image: "https://images.lumacdn.com/uploads/on/19946552-9254-41de-b105-d086a2e4ac68.png" },
  { name: "Fitness", count: "2K", href: "/fitness?k=t", image: "https://images.lumacdn.com/uploads/7b/f3930d36-b2f2-4df3-8db6-798df9b0897f.png" },
  { name: "Wellness", count: "1K", href: "/wellness?k=t", image: "https://images.lumacdn.com/uploads/y5/4f225f49-0c10-4bba-b1cb-77ae216268ac.png" },
  { name: "Crypto", count: "743", href: "/crypto?k=t", image: "https://images.lumacdn.com/uploads/yl/096bc517-f9fc-49fe-befd-401e29cc4662.png" },
];

const calendars = [
  {
    name: "Reading Rhythms Global",
    description: "Not a book club. A reading party.\nRead with friends to live music & curated playlists!",
    href: "/readingrhythms-global?k=c",
    image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=48,height=48/calendars/ni/4f930fb4-2ff5-4e98-8f46-7107a8c6b7cb",
    alt: "Avatar for Reading Rhythms Global",
  },
  {
    name: "Build Club",
    description: "The most collaborative AI community in the world (50+ Cities, 30K+ community)",
    href: "/buildercommunityanz?k=c",
    image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=48,height=48/calendars/xv/cd043d3e-0ce7-490f-9970-f27a79399858",
    alt: "Avatar for Build Club",
  },
  {
    name: "South Park Commons",
    description: "South Park Commons helps you get from -1 to 0. To learn more or apply, visit southparkcommons.com.",
    href: "/southparkcommons-events?k=c",
    image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=48,height=48/calendars/zd/801eab25-f945-44b2-8d32-29a455bd485d",
    alt: "Avatar for South Park Commons",
  },
  {
    name: "Design Buddies",
    description: "Events for all creatives across SF/LA, online, and the world! Hosted by Design Buddies, the world's largest design community (https://designbuddies.community). Founded by Grace Ling",
    href: "/design?k=c",
    image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=48,height=48/calendars/pt/e584cc5b-7a57-4f13-ab7a-2abcb3a4c1a9",
    alt: "Avatar for Design Buddies",
  },
  {
    name: "SpaceXAI Community",
    description: "SpaceXAI community events in 250+ cities",
    href: "/spacexai-community?k=c",
    image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=48,height=48/api-uploads/wb/b802a149-296e-4901-a0d0-0db524ea1fb8.png",
    alt: "Avatar for SpaceXAI Community",
  },
  {
    name: "Google DeepMind",
    description: "Connect with the Google DeepMind Developer Experience Team",
    href: "/deepmind?k=c",
    image: "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=48,height=48/calendars/ph/5ee73ff7-6554-47d8-8505-4306f1091baa.jpg",
    alt: "Avatar for Google DeepMind",
  },
];

const regions = ["Asia & Pacific", "Africa", "Europe", "North America", "South America"];

const cities = [
  { name: "Auckland", events: 9, href: "/auckland?k=p", icon: "https://images.lumacdn.com/discovery/auckland-icon.png", color: "#af74c4" },
  { name: "Bangkok", events: 18, href: "/bangkok?k=p", icon: "https://images.lumacdn.com/discovery/bangkok-icon.png", color: "#e39936" },
  { name: "Bengaluru", events: 23, href: "/bengaluru?k=p", icon: "https://images.lumacdn.com/discovery/bangalore-icon.png", color: "#a89925" },
  { name: "Brisbane", events: 8, href: "/brisbane?k=p", icon: "https://images.lumacdn.com/discovery/brisbane-icon.png", color: "#2d82e3" },
  { name: "Dubai", events: 12, href: "/dubai?k=p", icon: "https://images.lumacdn.com/discovery/dubai-icon.png", color: "#ab52ab" },
  { name: "Ho Chi Minh City", events: 3, href: "/ho-chi-minh-city?k=p", icon: "https://images.lumacdn.com/discovery/hcm-icon.png", color: "#de674e" },
  { name: "Hong Kong", events: 10, href: "/hongkong?k=p", icon: "https://images.lumacdn.com/discovery/hk-icon.png", color: "#4eaaba" },
  { name: "Honolulu", events: 5, href: "/honolulu?k=p", icon: "https://images.lumacdn.com/discovery/hnl-icon.png", color: "#327cdb" },
  { name: "Jakarta", events: 10, href: "/jakarta?k=p", icon: "https://images.lumacdn.com/discovery/jakarta-icon.png", color: "#c7a369" },
  { name: "Kuala Lumpur", events: 14, href: "/kuala-lumpur?k=p", icon: "https://images.lumacdn.com/discovery/kl-icon.png", color: "#9936a3" },
  { name: "Manila", events: 10, href: "/manila?k=p", icon: "https://images.lumacdn.com/discovery/manila-icon.png", color: "#7daca4" },
  { name: "Melbourne", events: 15, href: "/melbourne?k=p", icon: "https://images.lumacdn.com/discovery/mel-icon.png", color: "#afc263" },
  { name: "Mumbai", events: 12, href: "/mumbai?k=p", icon: "https://images.lumacdn.com/discovery/mumbai-icon.png", color: "#dc6e18" },
  { name: "New Delhi", events: 14, href: "/new-delhi?k=p", icon: "https://images.lumacdn.com/discovery/newdelhi-icon.png", color: "#d6826b" },
  { name: "Osaka", events: 5, href: "/osaka?k=p", icon: "https://images.lumacdn.com/discovery/osaka-icon.png", color: "#d072d4" },
  { name: "Seoul", events: 23, href: "/seoul?k=p", icon: "https://images.lumacdn.com/discovery/seoul-icon.png", color: "#7faceb" },
  { name: "Singapore", events: 45, href: "/singapore?k=p", icon: "https://images.lumacdn.com/discovery/sg-icon.png", color: "#6f802b" },
  { name: "Sydney", events: 24, href: "/sydney?k=p", icon: "https://images.lumacdn.com/discovery/sydney-icon.png", color: "#da9634" },
  { name: "Taipei", events: 8, href: "/taipei?k=p", icon: "https://images.lumacdn.com/discovery/taipei-icon.png", color: "#7173d1" },
  { name: "Tel Aviv-Yafo", events: 11, href: "/tel-aviv?k=p", icon: "https://images.lumacdn.com/discovery/telaviv-icon.png", color: "#f39050" },
  { name: "Tokyo", events: 38, href: "/tokyo?k=p", icon: "https://images.lumacdn.com/discovery/tokyo-icon.png", color: "#e69f93" },
];

function NavigationIcon({ name }) {
  const iconProps = { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", width: 16, height: 16, "aria-hidden": "true" };

  if (name === "events") {
    return h("svg", iconProps, h("path", {
      fill: "currentColor",
      fillRule: "evenodd",
      d: "M3.204 1.25C1.44 1.25.251 2.938.251 4.692v1.454c-.001.068-.001.163.007.247a.96.96 0 0 0 .162.466c.142.205.348.298.411.327l.005.002c.083.038.185.076.277.11l.016.007c.177.066.394.309.394.696s-.217.63-.394.696l-.017.007c-.091.034-.193.072-.276.11l-.005.002c-.063.029-.269.122-.411.327a.96.96 0 0 0-.162.465c-.008.084-.008.18-.008.247v1.453c0 1.755 1.188 3.443 2.954 3.443h9.592c1.766 0 2.954-1.688 2.954-3.443V9.854c0-.068 0-.163-.008-.247a.96.96 0 0 0-.162-.465c-.142-.205-.348-.298-.411-.327l-.005-.003a5 5 0 0 0-.276-.11l-.017-.006c-.177-.066-.394-.309-.394-.696s.217-.63.394-.696l.017-.007c.091-.034.193-.072.276-.11l.005-.002a1 1 0 0 0 .411-.327.96.96 0 0 0 .162-.466c.008-.084-.008-.179-.008-.247V4.693c0-1.755-1.19-3.443-2.954-3.443zM1.751 4.693c0-1.221.784-1.943 1.453-1.943H9.25v3.008a.75.75 0 0 0 1.5 0V2.75h2.046c.669 0 1.453.722 1.453 1.943v1.244c-.788.344-1.272 1.178-1.272 2.063s.484 1.72 1.273 2.063v1.244c0 1.221-.784 1.943-1.454 1.943H10.75v-2.492a.75.75 0 0 0-1.5 0v2.492H3.204c-.67 0-1.454-.722-1.454-1.943v-1.244C2.54 9.719 3.023 8.885 3.023 8S2.539 6.28 1.75 5.937z",
    }));
  }

  if (name === "calendars") {
    return h("svg", { ...iconProps, fill: "none" }, [
      h("path", { key: "calendar-frame", stroke: "currentColor", strokeWidth: 1.5, d: "M1.625 8.75c0-2.682 0-4.023.82-4.868l.062-.063C3.352 3 4.693 3 7.375 3h1.25c2.682 0 4.023 0 4.868.82l.063.062c.819.845.819 2.186.819 4.868s0 4.023-.82 4.868l-.062.063c-.845.819-2.186.819-4.868.819h-1.25c-2.682 0-4.023 0-4.868-.82l-.063-.062c-.819-.845-.819-2.186-.819-4.868Z" }),
      h("path", { key: "calendar-posts", stroke: "currentColor", strokeLinecap: "round", strokeWidth: 1.5, d: "M5 4.5v-3m6 3v-3" }),
      h("path", { key: "calendar-dates", fill: "currentColor", d: "M4.5 10.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m3.5 0A.75.75 0 1 1 8 12a.75.75 0 0 1-1.5 0M11.5 10.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5M4.5 7a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5M8 7a.75.75 0 1 1 0 1.5A.75.75 0 0 1 8 7m3.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5" }),
    ]);
  }

  if (name === "discover") {
    return h("svg", iconProps, h("path", { fill: "currentColor", fillRule: "evenodd", d: "M2 7.997a5.997 5.997 0 1 1 11.995 0A5.997 5.997 0 0 1 2 7.997M7.997.5a7.497 7.497 0 1 0 0 14.995A7.497 7.497 0 0 0 7.997.5m3.323 5.084a.75.75 0 0 0-.91-.91l-3.548.888c-.64.16-1.14.66-1.3 1.3l-.888 3.549a.75.75 0 0 0 .91.91l3.548-.888c.64-.16 1.14-.66 1.3-1.3zM7.226 7.017l2.335-.584-.583 2.335a.29.29 0 0 1-.21.21l-2.335.584.584-2.336a.29.29 0 0 1-.21-.21" }));
  }

  return h("svg", iconProps, h("path", { fill: "currentColor", d: "M8 .25c1.783 0 3.115.902 3.977 2.05.847 1.131 1.275 2.54 1.275 3.702 0 1.31.367 1.9.717 2.35.335.432 1.033 1.07 1.033 2.15 0 .478-.1.971-.447 1.388-.336.403-.82.632-1.362.776-.44.118-.99.194-1.662.245-.213 1.661-1.721 2.877-3.45 2.877-1.727 0-3.235-1.21-3.453-2.865-.744-.051-1.346-.13-1.821-.257-.542-.144-1.025-.373-1.362-.776-.347-.417-.447-.91-.447-1.388 0-1.08.698-1.718 1.033-2.15.35-.45.717-1.04.717-2.35 0-1.163.428-2.571 1.275-3.701C4.885 1.152 6.217.25 8 .25m1.984 12.732A83 83 0 0 1 8 13.004q-.997 0-1.825-.018c.227.724.959 1.302 1.905 1.302.948 0 1.678-.58 1.904-1.306M8 1.754c-1.217 0-2.135.598-2.773 1.45-.653.869-.975 1.96-.975 2.798 0 1.69-.508 2.6-.975 2.799-.638-.851-1.556-1.45-2.773-1.45Z" }));
}

function ArrowIcon() {
  return h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", stroke: "currentColor", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, viewBox: "0 0 24 24", "aria-hidden": "true" }, h("path", { d: "M5 12h14M12 5l7 7-7 7" }));
}

function InstagramIcon() {
  return h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", "aria-hidden": "true" }, h("g", { fill: "currentColor", fillRule: "evenodd" }, [
    h("path", { key: "dot", d: "M12.9 4.225a1.125 1.125 0 1 1-2.25 0 1.125 1.125 0 0 1 2.25 0M8 11.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m0-1.4a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2" }),
    h("path", { key: "frame", d: "M.5 7.7c0-2.52 0-3.78.49-4.744A4.5 4.5 0 0 1 2.957.991C3.92.5 5.178.5 7.7.5h.6c2.52 0 3.78 0 4.744.49a4.5 4.5 0 0 1 1.966 1.967c.49.963.49 2.221.49 4.743v.6c0 2.52 0 3.78-.49 4.744a4.5 4.5 0 0 1-1.967 1.966c-.963.49-2.221.49-4.743.49h-.6c-2.52 0-3.78 0-4.744-.49A4.5 4.5 0 0 1 .99 13.043C.5 12.08.5 10.822.5 8.3zM7.7 2h.6c1.284 0 2.158 0 2.833.056.658.054.994.151 1.228.271a3 3 0 0 1 1.313 1.31c.119.235.215.573.27 1.229.055.675.056 1.549.056 2.834v.6c0 1.284 0 2.158-.056 2.833-.054.658-.151.994-.271 1.228a3 3 0 0 1-1.31 1.313c-.235.119-.573.215-1.229.27-.675.055-1.549.056-2.834.056h-.6c-1.284 0-2.158 0-2.833-.056-.658-.054-.994-.151-1.228-.271a3 3 0 0 1-1.313-1.31c-.119-.235-.215-.573-.27-1.229C2.001 10.46 2 9.585 2 8.3v-.6c0-1.284 0-2.158.056-2.833.054-.658.151-.994.271-1.228a3 3 0 0 1 1.31-1.313c.235-.119.573-.215 1.229-.27C5.54 2.001 6.415 2 7.7 2" }),
  ]));
}

function XIcon() {
  return h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 120 120", "aria-hidden": "true" }, h("path", { fill: "currentColor", d: "m108.783 107.652-38.24-55.748.066.053L105.087 12H93.565L65.478 44.522 43.174 12H12.957l35.7 52.048-.005-.005L11 107.653h11.522L53.748 71.47l24.817 36.182zM38.609 20.696l53.652 78.26h-9.13l-53.696-78.26z" }));
}

function MailIcon() {
  return h("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 16 16", "aria-hidden": "true" }, h("path", { fill: "currentColor", fillRule: "evenodd", d: "M7 2.5h2c1.436 0 2.4.002 3.134.077.71.072 1.038.2 1.255.344a2.5 2.5 0 0 1 .69.69c.145.217.272.545.344 1.255.075.734.077 1.698.077 3.134s-.002 2.4-.077 3.134c-.072.71-.2 1.038-.344 1.255a2.5 2.5 0 0 1-.69.69c-.217.145-.545.272-1.255.344-.735.075-1.698.077-3.134.077H7c-1.436 0-2.4-.002-3.134-.077-.71-.072-1.038-.2-1.255-.344a2.5 2.5 0 0 1-.69-.69c-.145-.217-.272-.545-.344-1.255C1.502 10.4 1.5 9.436 1.5 8s.002-2.4.077-3.134c.072-.71.2-1.038.344-1.255a2.5 2.5 0 0 1 .69-.69c.217-.145.545-.272 1.255-.344C4.6 2.502 5.564 2.5 7 2.5M0 8c0-2.809 0-4.213.674-5.222a4 4 0 0 1 1.104-1.104C2.787 1 4.19 1 7 1h2c2.809 0 4.213 0 5.222.674a4 4 0 0 1 1.104 1.104C16 3.787 16 5.19 16 8s0 4.213-.674 5.222a4 4 0 0 1-1.104 1.104C13.213 15 11.81 15 9 15H7c-2.809 0-4.213 0-5.222-.674a4 4 0 0 1-1.104-1.104C0 12.213 0 10.81 0 8m5.458-2.594a.75.75 0 0 0-.916 1.188l2.282 1.757.004.004a1.96 1.96 0 0 0 2.363 0l.007-.006 2.262-1.757a.75.75 0 1 0-.92-1.184L8.282 7.16a.46.46 0 0 1-.546 0z" }));
}

function LumaMark() {
  return h("svg", { xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 133 134", "aria-hidden": "true" }, h("path", { fill: "currentColor", d: "M133 67C96.282 67 66.5 36.994 66.5 0c0 36.994-29.782 67-66.5 67 36.718 0 66.5 30.006 66.5 67 0-36.994 29.782-67 66.5-67" }));
}

function Navbar() {
  const links = [
    { label: "Events", href: "/home", icon: "events" },
    { label: "Calendars", href: "/home/calendars", icon: "calendars" },
    { label: "Discover", href: "/discover", icon: "discover", selected: true },
  ];

  return h(
    "div",
    { className: "nav-wrapper animated sticky" },
    h(
      "nav",
      { className: "navbar flex-center spread gap-2", "aria-label": "Primary navigation" },
      h(
        "a",
        { className: "lux-menu-trigger-wrapper cursor-pointer logo-wrapper", "aria-label": "Luma Home", href: "/" },
        h("div", { className: "logo flex-center animated" }, h(LumaMark)),
      ),
      h(
        "div",
        { className: "center-and-right" },
        h(
          "div",
          { className: "center-wrapper" },
          h(
            "div",
            { className: "center-links-wrapper fs-sm flex-baseline zm-container" },
            links.map((link) =>
              h(
                "a",
                { key: link.label, className: `nav-link-a${link.selected ? " selected" : ""}`, href: link.href, "aria-current": link.selected ? "page" : undefined },
                h(
                  "div",
                  { className: "nav-link flex-center gap-2" },
                  h("div", { className: "nav-icon icon" }, h(NavigationIcon, { name: link.icon })),
                  h("div", { className: "nav-label label" }, link.label),
                ),
              ),
            ),
          ),
        ),
        h(
          "div",
          { className: "right-wrapper min-width-0" },
          h("div", { className: "nav-time time fs-sm mono-number relative" }, "5:29 PM GMT+7"),
          h(
            "a",
            { className: "create-button top-nav-button flex-center-center", href: "/create" },
            h("div", { className: "create-label label text-ellipses" }, "Create Event"),
          ),
          h(
            "button",
            { className: "notifications-button notifications-bell-button top-nav-button button-reset", type: "button", "aria-label": "Notifications" },
            h(
              "span",
              { className: "lux-menu-trigger-wrapper cursor-pointer bell-icon relative", "aria-hidden": "true" },
              h("span", { className: "bell-icon-mark icon animated" }, h(NavigationIcon, { name: "notifications" })),
              h("span", { className: "unread-dot" }),
            ),
          ),
          h(
            "button",
            { className: "account-trigger avatar-wrapper-trigger lux-menu-trigger-wrapper cursor-pointer flex-center animated", type: "button", "aria-label": "Account menu" },
            h(
              "span",
              { className: "avatar-wrapper small" },
              h("span", { className: "avatar", "aria-hidden": "true", style: { backgroundImage: 'url("https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=24,height=24/avatars-default/avatar_29.png")' } }),
              h("span", { className: "online-indicator animated", "aria-hidden": "true" }),
            ),
          ),
        ),
      ),
    ),
  );
}

function SectionHeading({ children, subtitle, action }) {
  return h("div", { className: "section-title-wrapper medium" }, h("div", { className: "section-title-row flex-center spread gap-2" },
    h("h2", { className: `section-title${subtitle ? " section-title-with-subtitle" : ""}` }, subtitle ? [h("div", { key: "title" }, children), h("div", { key: "subtitle", className: "section-subtitle text-tertiary-alpha fw-regular" }, subtitle)] : children),
    h("div", { className: "right-element" }, action || null),
  ));
}

function EventRow({ event, index }) {
  return h("div", { className: `event-row animated min-width-0 small effect-cover flex-center ${index < 2 ? "event-row-tall" : "event-row-standard"}` },
    h("a", { className: "event-link content-link", "aria-label": event.title, href: event.href }, "\u00a0"),
    h("div", { className: "cover-image animated flex-shrink-0" }, h("div", { className: "event-cover-image" }, h("img", { className: "rectangle", width: 80, height: 80, alt: `Cover Image for ${event.title}`, title: `Cover Image for ${event.title}`, loading: "lazy", src: event.image }), event.status ? h("div", { className: "status-wrapper approved" }, h("div", { className: "status" }, event.status)) : null)),
    h("div", { className: "event-info flex-1" },
      h("div", { className: "fs-sm reduced-line-height time-wrapper" }, h("div", { className: "event-time flex-center gap-2" }, h("div", { className: "min-with-0 text-ellipses text-tertiary-alpha" }, h("span", null, event.time)))),
      h("div", { className: "event-title" }, h("h3", null, h("div", { className: "lux-line-clamp" }, event.title))),
      h("div", { className: "text-tertiary-alpha info fs-sm flex-column gap-1 min-width-0" }, event.location ? h("div", { className: "meta-row min-width-0 text-ellipses" }, event.location) : null),
    ),
  );
}

function PopularEvents() {
  return h("section", { className: "discover-section popular-section can-divide medium with-divider", "aria-labelledby": "popular-events-title" },
    h(SectionHeading, { subtitle: "Jakarta", action: h("a", { className: "btn lux-button flex-center small light solid variant-color-light icon-right view-all-button", href: "/jakarta?k=p" }, h("div", { className: "label" }, "View All"), h(ArrowIcon)), children: h("span", { id: "popular-events-title" }, "Popular Events") }),
    h("div", { className: "event-grid-wrapper" }, h("div", { className: "event-grid" }, eventData.map((event, index) => h(EventRow, { key: event.title, event, index })))),
  );
}

function CategoryCard({ category }) {
  return h("a", { className: "content-card rounded-card hoverable actionable discover-category", href: category.href }, h("div", { className: "category-inner flex-center gap-1" }, h("img", { src: category.image, alt: "", width: 48, height: 48, loading: "lazy" }), h("div", { className: "category-copy" }, h("div", { className: "category-title fw-medium" }, category.name), h("div", { className: "category-count text-tertiary-alpha reduced-line-height" }, h("span", null, category.count), " Events"))));
}

function BrowseCategories() {
  return h("section", { className: "discover-section category-section can-divide medium with-divider", "aria-labelledby": "category-title" },
    h(SectionHeading, { children: h("span", { id: "category-title" }, "Browse by Category") }),
    h("div", { className: "category-grid-wrapper" }, h("div", { className: "category-grid" }, categories.map((category) => h(CategoryCard, { key: category.name, category })),), h("div", { className: "category-rows", "aria-hidden": "true" })),
  );
}

function CalendarCard({ calendar, following, onToggleFollow }) {
  return h("a", { className: "content-card rounded-card hoverable actionable calendar-card flex-column", href: calendar.href },
    h("div", { className: "calendar-top flex-start spread" }, h("img", { className: "calendar-avatar square rounded", src: calendar.image, alt: calendar.alt, title: calendar.alt, width: 48, height: 48, loading: "lazy" }), h("button", { className: "btn lux-button flex-center small light solid variant-color-light round no-icon follow-button", type: "button", onClick: (event) => { event.preventDefault(); event.stopPropagation(); onToggleFollow(); } }, following ? "Following" : "Follow")),
    h("div", { className: "calendar-info" }, h("div", { className: "calendar-title fw-medium text-primary reduced-line-height" }, calendar.name), h("div", { className: "calendar-desc text-tertiary-alpha fs-sm" }, calendar.description)),
    h("div", { className: "flex-1" }),
  );
}

function FeaturedCalendars() {
  const [following, setFollowing] = useState({});

  return h("section", { className: "discover-section calendar-section can-divide medium with-divider", "aria-labelledby": "featured-calendars-title" },
    h(SectionHeading, { children: h("span", { id: "featured-calendars-title" }, "Featured Calendars") }),
    h("div", { className: "calendar-grid-wrapper" }, h("div", { className: "calendar-grid" }, calendars.map((calendar) => h(CalendarCard, { key: calendar.name, calendar, following: Boolean(following[calendar.name]), onToggleFollow: () => setFollowing((current) => ({ ...current, [calendar.name]: !current[calendar.name] })) })))),
  );
}

function CityCard({ city }) {
  return h("a", { className: "place-item", href: city.href }, h("div", { className: "city-inner flex-center animated" }, h("div", { className: "city-icon flex-shrink-0", style: { backgroundColor: city.color } }, h("img", { src: city.icon, alt: `Icon for ${city.name}`, width: 40, height: 40, loading: "lazy" })), h("div", { className: "city-copy min-width-0" }, h("div", { className: "city-title fw-medium nowrap text-ellipses" }, city.name), h("div", { className: "city-desc flex-center gap-1 fs-sm text-tertiary-alpha nowrap" }, `${city.events} Events`))));
}

function ExploreLocalEvents() {
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  return h("section", { className: "discover-section explore-section can-divide medium with-divider", "aria-labelledby": "explore-local-events-title" },
    h(SectionHeading, { children: h("span", { id: "explore-local-events-title" }, "Explore Local Events") }),
    h("div", { className: "tabs flex-baseline", role: "tablist", "aria-label": "Event regions" }, regions.map((region) => h("button", { key: region, type: "button", role: "tab", "aria-selected": activeRegion === region, className: `tab animated fs-sm fw-medium nowrap${activeRegion === region ? " selected" : ""}`, onClick: () => setActiveRegion(region) }, region))),
    h("div", { className: "city-grid-wrapper" }, h("div", { className: "city-grid" }, cities.map((city) => h(CityCard, { key: city.name, city })))),
  );
}

function FooterSocialLink({ href, label, children }) {
  return h("a", { href, className: "flex-center", "aria-label": label, target: "_blank", rel: "nofollow noopener" }, children);
}

function GlobalFooter() {
  return h("footer", { className: "global-footer" }, h("div", { className: "footer-container zm-container" }, h("div", { className: "global-footer-content flex-start" },
    h("div", { className: "footer-left left-wrapper flex-center flex-1" }, h("a", { className: "footer-logo logo flex-center", "aria-label": "Luma Home", href: "/" }, h("span", { className: "footer-mark flex-center-center" }, h(LumaMark))), h("div", { className: "footer-links links" }, h("a", { href: "/discover" }, "Discover"), h("a", { href: "/pricing" }, "Pricing"), h("a", { href: "https://help.luma.com", target: "_blank", rel: "nofollow noopener" }, "Help"))),
    h("div", { className: "footer-icons icons flex-center" }, h(FooterSocialLink, { href: "https://www.instagram.com/luma_hq/", label: "Luma on Instagram" }, h(InstagramIcon)), h(FooterSocialLink, { href: "https://x.com/LumaHQ", label: "Luma on X" }, h(XIcon)), h(FooterSocialLink, { href: "mailto:support@luma.com", label: "Contact Us" }, h(MailIcon)), h("a", { href: "/app", target: "_blank", className: "app-button fs-xs" }, "Get the App")),
  )));
}

function DiscoverPage() {
  return h("div", { className: "page-shell" }, h(Navbar), h("main", { className: "page-content sticky-topnav", "data-component": "div.jsx-4084343657" },
    h("div", { className: "page-header zm-container px-3" }, h("div", { className: "header-row flex-center mb-2 gap-2" }, h("h1", { className: "tab-title flex-1" }, "Discover Events")), h("div", null)),
    h("div", { className: "discover-description zm-container px-3 text-secondary-alpha pt-2 pb-4 mb-2" }, "Explore popular events near you, browse by category, or check out some of the great community calendars."),
    h("div", { className: "content zm-container" }, h(PopularEvents), h(BrowseCategories), h(FeaturedCalendars), h(ExploreLocalEvents)),
    h(GlobalFooter),
  ));
}

ReactDOM.createRoot(document.getElementById("app")).render(h(DiscoverPage));
