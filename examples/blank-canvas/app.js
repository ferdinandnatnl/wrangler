const { createElement: h, useState } = React;

const regions = [
  "Asia & Pacific",
  "Africa",
  "Europe",
  "North America",
  "South America",
];

const cities = [
  {
    name: "Auckland",
    events: 9,
    href: "/auckland?k=p",
    icon: "https://images.lumacdn.com/discovery/auckland-icon.png",
    color: "#af74c4",
  },
  {
    name: "Bangkok",
    events: 18,
    href: "/bangkok?k=p",
    icon: "https://images.lumacdn.com/discovery/bangkok-icon.png",
    color: "#e39936",
  },
  {
    name: "Bengaluru",
    events: 23,
    href: "/bengaluru?k=p",
    icon: "https://images.lumacdn.com/discovery/bangalore-icon.png",
    color: "#a89925",
  },
  {
    name: "Brisbane",
    events: 8,
    href: "/brisbane?k=p",
    icon: "https://images.lumacdn.com/discovery/brisbane-icon.png",
    color: "#2d82e3",
  },
  {
    name: "Dubai",
    events: 12,
    href: "/dubai?k=p",
    icon: "https://images.lumacdn.com/discovery/dubai-icon.png",
    color: "#ab52ab",
  },
  {
    name: "Ho Chi Minh City",
    events: 3,
    href: "/ho-chi-minh-city?k=p",
    icon: "https://images.lumacdn.com/discovery/hcm-icon.png",
    color: "#de674e",
  },
  {
    name: "Hong Kong",
    events: 10,
    href: "/hongkong?k=p",
    icon: "https://images.lumacdn.com/discovery/hk-icon.png",
    color: "#4eaaba",
  },
  {
    name: "Honolulu",
    events: 5,
    href: "/honolulu?k=p",
    icon: "https://images.lumacdn.com/discovery/hnl-icon.png",
    color: "#327cdb",
  },
  {
    name: "Jakarta",
    events: 10,
    href: "/jakarta?k=p",
    icon: "https://images.lumacdn.com/discovery/jakarta-icon.png",
    color: "#c7a369",
  },
  {
    name: "Kuala Lumpur",
    events: 14,
    href: "/kuala-lumpur?k=p",
    icon: "https://images.lumacdn.com/discovery/kl-icon.png",
    color: "#9936a3",
  },
  {
    name: "Manila",
    events: 10,
    href: "/manila?k=p",
    icon: "https://images.lumacdn.com/discovery/manila-icon.png",
    color: "#7daca4",
  },
  {
    name: "Melbourne",
    events: 15,
    href: "/melbourne?k=p",
    icon: "https://images.lumacdn.com/discovery/mel-icon.png",
    color: "#afc263",
  },
  {
    name: "Mumbai",
    events: 12,
    href: "/mumbai?k=p",
    icon: "https://images.lumacdn.com/discovery/mumbai-icon.png",
    color: "#dc6e18",
  },
  {
    name: "New Delhi",
    events: 14,
    href: "/new-delhi?k=p",
    icon: "https://images.lumacdn.com/discovery/newdelhi-icon.png",
    color: "#d6826b",
  },
  {
    name: "Osaka",
    events: 5,
    href: "/osaka?k=p",
    icon: "https://images.lumacdn.com/discovery/osaka-icon.png",
    color: "#d072d4",
  },
  {
    name: "Seoul",
    events: 23,
    href: "/seoul?k=p",
    icon: "https://images.lumacdn.com/discovery/seoul-icon.png",
    color: "#7faceb",
  },
  {
    name: "Singapore",
    events: 45,
    href: "/singapore?k=p",
    icon: "https://images.lumacdn.com/discovery/sg-icon.png",
    color: "#6f802b",
  },
  {
    name: "Sydney",
    events: 24,
    href: "/sydney?k=p",
    icon: "https://images.lumacdn.com/discovery/sydney-icon.png",
    color: "#da9634",
  },
  {
    name: "Taipei",
    events: 8,
    href: "/taipei?k=p",
    icon: "https://images.lumacdn.com/discovery/taipei-icon.png",
    color: "#7173d1",
  },
  {
    name: "Tel Aviv-Yafo",
    events: 11,
    href: "/tel-aviv?k=p",
    icon: "https://images.lumacdn.com/discovery/telaviv-icon.png",
    color: "#f39050",
  },
  {
    name: "Tokyo",
    events: 38,
    href: "/tokyo?k=p",
    icon: "https://images.lumacdn.com/discovery/tokyo-icon.png",
    color: "#e69f93",
  },
];

function CityCard({ city }) {
  return h(
    "a",
    {
      className: "place-item",
      href: city.href,
      style: { "--icon-color": city.color },
    },
    h(
      "div",
      { className: "place-inner flex items-center gap-3" },
      h(
        "div",
        { className: "city-icon flex shrink-0 items-center justify-center" },
        h("img", {
          src: city.icon,
          alt: `Icon for ${city.name}`,
          width: 40,
          height: 40,
        }),
      ),
      h(
        "div",
        { className: "city-info min-w-0" },
        h("div", { className: "city-title" }, city.name),
        h("div", { className: "city-events flex items-center gap-1" }, `${city.events} Events`),
      ),
    ),
  );
}

function ExploreLocalEvents() {
  const [activeRegion, setActiveRegion] = useState(regions[0]);

  return h(
    "section",
    {
      className: "luma-component can-divide medium with-divider",
      "aria-labelledby": "explore-local-events-title",
    },
    h(
      "div",
      { className: "section-title-wrapper medium" },
      h(
        "div",
        { className: "section-title-row flex items-center justify-between gap-2" },
        h("h2", { id: "explore-local-events-title", className: "section-title" }, "Explore Local Events"),
        h("div", { className: "right-element" }),
      ),
    ),
    h(
      "div",
      { className: "tabs flex items-baseline", role: "tablist", "aria-label": "Event regions" },
      regions.map((region) =>
        h(
          "button",
          {
            key: region,
            type: "button",
            role: "tab",
            "aria-selected": activeRegion === region,
            className: `tab ${activeRegion === region ? "selected" : ""}`,
            onClick: () => setActiveRegion(region),
          },
          region,
        ),
      ),
    ),
    h(
      "div",
      { className: "city-grid-wrapper" },
      h("div", { className: "city-grid" }, cities.map((city) => h(CityCard, { key: city.name, city }))),
    ),
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(h(ExploreLocalEvents));
