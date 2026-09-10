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

function NavigationIcon({ name }) {
  const iconProps = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 16,
    height: 16,
    viewBox: "0 0 16 16",
    "aria-hidden": "true",
  };

  if (name === "events") {
    return h(
      "svg",
      { ...iconProps, fill: "none" },
      h("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M3.204 1.25C1.44 1.25.251 2.938.251 4.692v1.454c-.001.068-.001.163.007.247a.96.96 0 0 0 .162.466c.142.205.348.298.411.327l.005.002c.083.038.185.076.277.11l.016.007c.177.066.394.309.394.696s-.217.63-.394.696l-.017.007c-.091.034-.193.072-.276.11l-.005.002c-.063.029-.269.122-.411.327a.96.96 0 0 0-.162.465c-.008.084-.008.18-.008.247v1.453c0 1.755 1.188 3.443 2.954 3.443h9.592c1.766 0 2.954-1.688 2.954-3.443V9.854c0-.068 0-.163-.008-.247a.96.96 0 0 0-.162-.465c-.142-.205-.348-.298-.411-.327l-.005-.003a5 5 0 0 0-.276-.11l-.017-.006c-.177-.066-.394-.309-.394-.696s.217-.63.394-.696l.017-.007c.091-.034.193-.072.276-.11l.005-.002a1 1 0 0 0 .411-.327.96.96 0 0 0 .162-.466c.008-.084.008-.179.008-.247V4.693c0-1.755-1.19-3.443-2.954-3.443zM1.751 4.693c0-1.221.784-1.943 1.453-1.943H9.25v3.008a.75.75 0 0 0 1.5 0V2.75h2.046c.669 0 1.453.722 1.453 1.943v1.244c-.788.344-1.272 1.178-1.272 2.063s.484 1.72 1.273 2.063v1.244c0 1.221-.784 1.943-1.454 1.943H10.75v-2.492a.75.75 0 0 0-1.5 0v2.492H3.204c-.67 0-1.454-.722-1.454-1.943v-1.244C2.54 9.719 3.023 8.885 3.023 8S2.539 6.28 1.75 5.937z",
      }),
    );
  }

  if (name === "calendars") {
    return h(
      "svg",
      { ...iconProps, fill: "none" },
      [
        h("path", {
          key: "calendar-frame",
          stroke: "currentColor",
          strokeWidth: 1.5,
          d: "M1.625 8.75c0-2.682 0-4.023.82-4.868l.062-.063C3.352 3 4.693 3 7.375 3h1.25c2.682 0 4.023 0 4.868.82l.063.062c.819.845.819 2.186.819 4.868s0 4.023-.82 4.868l-.062.063c-.845.819-2.186.819-4.868.819h-1.25c-2.682 0-4.023 0-4.868-.82l-.063-.062c-.819-.845-.819-2.186-.819-4.868Z",
        }),
        h("path", {
          key: "calendar-posts",
          stroke: "currentColor",
          strokeLinecap: "round",
          strokeWidth: 1.5,
          d: "M5 4.5v-3m6 3v-3",
        }),
        h("path", {
          key: "calendar-dates",
          fill: "currentColor",
          d: "M4.5 10.5a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5m3.5 0A.75.75 0 1 1 8 12a.75.75 0 0 1 0-1.5m3.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5M4.5 7a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5M8 7a.75.75 0 1 1 0 1.5A.75.75 0 0 1 8 7m3.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5",
        }),
      ],
    );
  }

  if (name === "discover") {
    return h(
      "svg",
      iconProps,
      h("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M2 7.997a5.997 5.997 0 1 1 11.995 0A5.997 5.997 0 0 1 2 7.997M7.997.5a7.497 7.497 0 1 0 0 14.995A7.497 7.497 0 0 0 7.997.5m3.323 5.084a.75.75 0 0 0-.91-.91l-3.548.888c-.64.16-1.14.66-1.3 1.3l-.888 3.549a.75.75 0 0 0 .91.91l3.548-.888c.64-.16 1.14-.66 1.3-1.3zM7.226 7.017l2.335-.584-.583 2.335a.29.29 0 0 1-.21.21l-2.335.584.584-2.336a.29.29 0 0 1 .21-.21",
      }),
    );
  }

  return h(
    "svg",
    iconProps,
    h("path", {
      fill: "currentColor",
      d: "M8 .25c1.783 0 3.115.902 3.977 2.05.847 1.131 1.275 2.54 1.275 3.702 0 1.31.367 1.9.717 2.35.335.432 1.033 1.07 1.033 2.15 0 .478-.1.971-.447 1.388-.336.403-.82.632-1.362.776-.44.118-.99.194-1.662.245-.213 1.661-1.721 2.877-3.45 2.877-1.727 0-3.235-1.21-3.453-2.865-.744-.051-1.346-.13-1.821-.257-.542-.144-1.025-.373-1.362-.776-.347-.417-.447-.91-.447-1.388 0-1.08.698-1.718 1.033-2.15.35-.45.717-1.04.717-2.35 0-1.163.428-2.571 1.275-3.701C4.885 1.152 6.217.25 8 .25m1.984 12.732A83 83 0 0 1 8 13.004q-.997 0-1.825-.018c.227.724.959 1.302 1.905 1.302.948 0 1.678-.58 1.904-1.306M8 1.754c-1.217 0-2.135.598-2.773 1.45-.653.869-.975 1.96-.975 2.798 0 1.69-.508 2.6-1.033 3.274-.54.694-.717.805-.717 1.226 0 .272.056.373.1.425.054.065.196.18.591.286.823.22 2.278.287 4.807.287s3.984-.068 4.807-.287c.395-.106.537-.221.591-.286.044-.052.1-.153.1-.425 0-.42-.177-.532-.717-1.226-.525-.675-1.033-1.584-1.033-3.274 0-.837-.322-1.93-.975-2.799-.638-.851-1.556-1.45-2.773-1.45Z",
    }),
  );
}

function Navbar() {
  const links = [
    { label: "Events", href: "/home", icon: "events", selected: true },
    { label: "Calendars", href: "/home/calendars", icon: "calendars" },
    { label: "Discover", href: "/discover", icon: "discover" },
  ];

  return h(
    "div",
    { className: "nav-wrapper animated sticky" },
    h(
      "nav",
      { className: "navbar flex-center spread gap-2", "aria-label": "Primary navigation" },
      h(
        "a",
        {
          className: "logo-link lux-menu-trigger-wrapper cursor-pointer",
          "aria-label": "Luma Home",
          href: "/home",
        },
        h(
          "div",
          { className: "logo-mark flex-center animated" },
          h(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 133 134",
              "aria-hidden": "true",
            },
            h("path", {
              fill: "currentColor",
              d: "M133 67C96.282 67 66.5 36.994 66.5 0c0 36.994-29.782 67-66.5 67 36.718 0 66.5 30.006 66.5 67 0-36.994 29.782-67 66.5-67",
            }),
          ),
        ),
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
                {
                  key: link.label,
                  className: `nav-link-a${link.selected ? " selected" : ""}`,
                  href: link.href,
                },
                h(
                  "div",
                  { className: "nav-link flex-center gap-2" },
                  h("div", { className: "nav-icon" }, h(NavigationIcon, { name: link.icon })),
                  h("div", { className: "nav-label" }, link.label),
                ),
              ),
            ),
          ),
        ),
        h(
          "div",
          { className: "right-wrapper min-width-0" },
          h("div", { className: "nav-time fs-sm mono-number relative" }, "4:17 PM GMT+7"),
          h(
            "a",
            { className: "create-button top-nav-button flex-center-center", href: "/create" },
            h("div", { className: "create-label text-ellipses" }, "Create Event"),
          ),
          h(
            "button",
            {
              className: "notifications-button top-nav-button button-reset",
              type: "button",
              "aria-label": "Notifications",
            },
            h(
              "span",
              { className: "bell-icon relative", "aria-hidden": "true" },
              h("span", { className: "bell-icon-mark animated" }, h(NavigationIcon, { name: "notifications" })),
              h("span", { className: "unread-dot" }),
            ),
          ),
          h(
            "button",
            { className: "avatar-trigger cursor-pointer animated", type: "button", "aria-label": "Account menu" },
            h(
              "span",
              { className: "avatar-wrapper small" },
              h("span", {
                className: "avatar",
                "aria-hidden": "true",
                style: {
                  backgroundImage:
                    'url("https://cdn.lu.ma/cdn-cgi/image/format=auto,fit=cover,dpr=2,anim=false,background=white,quality=75,width=24,height=24/avatars-default/avatar_29.png")',
                },
              }),
              h("span", { className: "online-indicator animated", "aria-hidden": "true" }),
            ),
          ),
        ),
      ),
    ),
  );
}

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

function BlankCanvas() {
  return h(
    "div",
    { className: "page-shell" },
    h(Navbar),
    h("div", { className: "content-shell" }, h(ExploreLocalEvents)),
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(h(BlankCanvas));
