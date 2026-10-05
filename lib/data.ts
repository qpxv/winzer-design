import type {
  ComparisonRow,
  FaqGroup,
  ImageAsset,
  Link,
  MessageShot,
  PricingTier,
  ProcessStep,
  Project,
  Stat,
} from "@/types";

export const BOOKING_URL = "https://calendly.com/benwinzer/website-call?hide_gdpr_banner=1";
export const X_PROFILE: Link = { label: "@b_winzer", href: "https://x.com/b_winzer" };

export const SITE = {
  name: "Winzer Design",
  url: "https://winzerdesign.vercel.app",
  title: "Winzer Design: websites designed and coded to sell",
  description:
    "Ben Winzer designs and hand-codes conversion-focused websites for ecommerce brands, coaches and small businesses. Book a call and get a real first draft, free.",
};

export const NAV = {
  links: [
    { label: "Work", href: "#work" },
    { label: "Results", href: "#results" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ] satisfies Link[],
  cta: "Book a free call",
  homeLabel: "Winzer Design, back to top",
  openMenu: "Open menu",
  closeMenu: "Close menu",
};

export const HERO = {
  headline: "I design and code websites that",
  headlineAccent: "sell",
  subheadline:
    "Custom-designed, hand-coded sites for ecommerce brands, coaches and small businesses. No templates and no page builders. Live in days, not months.",
  cta: "Book a free call",
  ctaSecondary: "See the work",
  guarantee: "Book a call and I'll build you a real first draft, free. No commitment.",
  proof: [
    { value: "3x", label: "monthly sales for Refined Berlin" },
    { value: "$2.2K", label: "in Tyler Van Acker's launch weekend" },
  ] satisfies Stat[],
};

// Every work screenshot is the live site's first screen at 1440x800, captured at 2x for sharp text on Retina screens.
function shot(id: string, alt: string): ImageAsset {
  return { src: `/images/work/${id}-work.png`, alt, width: 2880, height: 1600 };
}

// `url` is the live deployment. `domain` is the display-only host in the
// browser-chrome pill (what the site's real domain would look like).
export const PROJECTS: Project[] = [
  { id: "volta", name: "VOLTA", tagline: "SaaS design studio platform", url: "https://winzer-volta.vercel.app", domain: "volta.design", image: shot("volta", "VOLTA homepage hero") },
  { id: "synmedia", name: "SynMedia", tagline: "Done-for-you YouTube growth agency", url: "https://synmedia-preview.vercel.app", domain: "synmedia.agency", image: shot("synmedia", "SynMedia homepage hero") },
  { id: "ascenxion", name: "Ascenxion", tagline: "Client acquisition for B2B SaaS", url: "https://ascenxion-preview.vercel.app", domain: "ascenxion.io", image: shot("ascenxion", "Ascenxion homepage hero") },
  { id: "lean-after-40", name: "Lean After 40", tagline: "Fat-loss coaching for executives over 40", url: "https://lean-after-40-preview.vercel.app", domain: "leanafter40.com", image: shot("lean-after-40", "Lean After 40 homepage hero") },
  { id: "pixelframe", name: "Pixel Frame", tagline: "Launch video studio for AI and SaaS", url: "https://pixelframe-preview.vercel.app", domain: "pixelframe.co", image: shot("pixelframe", "Pixel Frame homepage hero") },
  { id: "batincaylak", name: "Batın Çaylak", tagline: "Daily writing system for people with a 9-5", url: "https://batincaylak-preview.vercel.app", domain: "batincaylak.com", image: shot("batincaylak", "Batın Çaylak homepage hero") },
  { id: "phantomfunnelz", name: "Phantom Funnelz", tagline: "Ghostwritten X Articles for tech founders", url: "https://phantomfunnelz-preview.vercel.app", domain: "phantomfunnelz.com", image: shot("phantomfunnelz", "Phantom Funnelz homepage hero") },
  { id: "shelfproof", name: "Shelfproof", tagline: "Amazon self-publishing coaching", url: "https://shelfproof-preview.vercel.app", domain: "shelfproof.com", image: shot("shelfproof", "Shelfproof homepage hero") },
  { id: "jot", name: "Jot", tagline: "iOS app landing page", url: "https://winzer-jot.vercel.app", domain: "getjot.app", image: shot("jot", "Jot app landing page hero") },
  { id: "anil-seth", name: "Anil Seth", tagline: "Neuroscientist and author", url: "https://winzer-tedx.vercel.app", domain: "anilseth.com", image: shot("anil-seth", "Anil Seth personal site hero") },
  { id: "kai-nakamura", name: "Kai Nakamura", tagline: "Photographer and filmmaker portfolio", url: "https://winzer-photography.vercel.app", domain: "kainakamura.com", image: shot("kai-nakamura", "Kai Nakamura portfolio hero") },
  { id: "snipvault", name: "SnipVault", tagline: "Code snippet manager for developers", url: "https://winzer-snip-vault.vercel.app", domain: "snipvault.dev", image: shot("snipvault", "SnipVault homepage hero") },
  { id: "ironside", name: "IRONSIDE", tagline: "Performance coaching programme", url: "https://winzer-ironside.vercel.app", domain: "ironside.coach", image: shot("ironside", "IRONSIDE homepage hero") },
];

/** Large tiles at the top of the work section, strongest first. Everything else is a thumbnail. */
export const FEATURED_IDS = ["volta", "pixelframe", "synmedia"] as const;

const featuredIdList: readonly string[] = FEATURED_IDS;
export const FEATURED_PROJECTS: Project[] = featuredIdList
  .map((id) => PROJECTS.find((project) => project.id === id))
  .filter((project): project is Project => project !== undefined);
export const OTHER_PROJECTS: Project[] = PROJECTS.filter((project) => !featuredIdList.includes(project.id));

export const WORK = {
  heading: "Recent builds",
  intro:
    "Every one designed and hand-coded from a blank file, with no templates and no page builders. They are all live, so open one and click around.",
  visit: "Visit the live site",
  moreHeading: "More of the work",
};

export const RESULTS = {
  heading: "Two launches with numbers behind them",
  intro: "Real clients, real revenue, the figures they shared with me.",
  challengeLabel: "Before",
  outcomeLabel: "After",
  builtLabel: "What I built",
  resultLabel: "The result",
};

export const TYLER_CASE = {
  heading: "Nine days to launch and $2.2K in the first weekend",
  client: "Tyler Van Acker",
  role: "Physical coach",
  stats: [
    { value: "$2.2K", label: "first launch weekend" },
    { value: "9 days", label: "start to launch" },
  ] satisfies Stat[],
  challenge:
    "Tyler was nine days out from launching a new coaching offer and still selling it from a carrd page. It buried the offer and only ever closed people who already knew him. The launch date could not move.",
  outcome:
    "I designed, wrote and built the full sales page in nine days, absorbing round after round of last-minute changes without moving the deadline. In the first three days it brought in $2,200, including buyers the old page would never have closed. It is still his sales page today.",
  quote:
    "Before we started working together I was using a carrd website that looked unprofessional. After working with you I now have a sales page that has already converted but will also continue to be a valuable asset in my business.",
  before: { src: "/images/case-studies/tyler-before.jpg", alt: "Tyler's original carrd page, a question headline over three testimonials", width: 1280, height: 800 } satisfies ImageAsset,
  after: { src: "/images/case-studies/tyler-after.png", alt: "Tyler's new sales page leading with the 60-day promise and one button", width: 1019, height: 554 } satisfies ImageAsset,
};

export const BERLIN_CASE = {
  heading: "Refined Berlin's monthly sales tripled in six weeks",
  client: "Refined Berlin",
  role: "Fashion ecommerce",
  headlineStat: { value: "25x", label: "conversion rate, from barely registering to over 1%" } satisfies Stat,
  stats: [
    { value: "3x", label: "monthly sales" },
    { value: "2 weeks", label: "strategy to launch" },
  ] satisfies Stat[],
  challenge:
    "The products and the brand were there, but people landed, looked around and left. Navigation was unclear and the path to checkout was cluttered.",
  outcome:
    "I rebuilt the store around one goal: making the buying decision easy. A stock gap around Chinese New Year held the revenue increase to 3x over the first six weeks, and the trend kept climbing after that.",
  // Kept in this case study, unattributed, exactly as the current site places it.
  quote:
    "Hey Ben, needed to reach out personally. Your speed and initiative are next level. Your work ethic is seriously impressive, you're crushing it way beyond your years, and I'm genuinely excited to see where we can take this together.",
  quoteSource: "Darrell Kawooya, Refined Berlin",
  domain: "Refined Berlin store",
  image: { src: "/images/case-studies/refined-berlin-after.png", alt: "A Refined Berlin product page after the rebuild", width: 2910, height: 1628 } satisfies ImageAsset,
  cta: "Get a free first draft",
  ctaNote: "Thirty minutes on a call, then a real draft of your site within days.",
};

export const MESSAGES = {
  heading: "What clients said when they saw their site",
  intro: "Screenshots straight from the chats, unedited.",
};

function message(id: number, alt: string, width: number, height: number): MessageShot {
  return { id, src: `/images/messages/message-${id}.png`, alt, width, height };
}

// Deliberately not in file order, so the columns read as a varied mix.
export const MESSAGE_SHOTS: MessageShot[] = [
  message(2, "Message from Tyler Van Acker about delivery speed, last-minute edits and his new sales page", 526, 224),
  message(11, "Client message: DUDE YOU ARE SO GOOD AT WEBSITES", 343, 96),
  message(4, "Client message: you've been a star player man, I couldn't have asked for anything more", 299, 255),
  message(9, "Message from Daniel W. about reply speed and turnaround", 519, 131),
  message(7, "Client message: bro thats awesome man, you're a professional, this is clean", 390, 215),
  message(10, "Client message: WOWOWWOW, it looks so professional, it's like an Apple website", 341, 202),
  message(1, "Message from Darrell Kawooya about speed and work ethic", 478, 138),
  message(5, "Client message: this is nice, im calling you maestro from now, not Ben", 294, 295),
  message(3, "Client message: but this website is beautiful on mobile", 271, 192),
  message(8, "Client message: damn looks clean man", 347, 216),
  message(6, "Client message: It looks amazing bro, this is sensational work", 239, 147),
];

export const COMPARISON = {
  heading: "Working with me directly versus an agency",
  intro:
    "An agency can build you a good site too. Line by line, here is what you get by working with the person who actually builds it.",
  columnUs: "Winzer Design",
  columnThem: "A typical agency",
  rows: [
    { id: "brand", feature: "Designed around your brand", them: "A strong look, shaped by the agency's portfolio" },
    { id: "code", feature: "Hand-coded, nothing bloated", them: "Often a heavy CMS build you do not control" },
    { id: "convert", feature: "Laid out to convert, not to decorate", them: "Beautiful decks, results left to you" },
    { id: "copy", feature: "Copy direction handled with you", them: "Quoted as a separate workstream" },
    { id: "direct", feature: "A direct line to the person who built your site", them: "Sold by a lead, built by whoever is free" },
    { id: "speed", feature: "A draft in days, live shortly after", them: "A discovery phase, then weeks of rounds" },
    { id: "changes", feature: "Small changes handled whenever you need them", them: "Every change is a new statement of work" },
  ] satisfies ComparisonRow[],
};

export const PRICING = {
  heading: "Fixed prices agreed before anything starts",
  intro: "No hourly rates and no scope creep. You know the cost before I write a line of code.",
  currency: "$",
  cta: "Book a call",
  recommendedLabel: "Recommended",
  tiers: [
    {
      id: "landing",
      name: "Landing page",
      price: "500",
      description: "One page, done right. For launches, personal brands, or anyone who needs a clean, credible presence fast.",
      features: ["Custom design and code", "Mobile responsive", "Contact form or booking integration", "Basic SEO setup", "Delivered within 7 days"],
      isHighlighted: false,
      preview: { projectId: "pixelframe", subpages: [] },
    },
    {
      id: "full",
      name: "Full website",
      price: "1,000",
      description: "Room to tell your story properly. Home, about and contact, or whatever actually makes sense for your business.",
      features: ["Everything in the landing page", "Unlimited pages", "CMS integration if needed", "Performance optimised", "Delivered within 14 days"],
      isHighlighted: true,
      // Front to back: the windows stacked behind the homepage.
      preview: { projectId: "volta", subpages: ["pricing", "login"] },
    },
  ] satisfies PricingTier[],
  retainer: {
    name: "Maintenance",
    prefix: "From",
    price: "150",
    cadence: "/mo",
    description: "Hosting, domain management, updates and small changes whenever you need them. A separate monthly plan on top of the build.",
  },
  note: "Not sure which fits? We can work it out on the call.",
};

// The booking link as an address bar shows it: host and path, no query string.
const BOOKING_DOMAIN = (() => {
  const url = new URL(BOOKING_URL);
  return `${url.host}${url.pathname}`;
})();

export const PROCESS = {
  heading: "What happens after you book",
  steps: [
    { id: "call", when: "Day one", title: "A 30-minute call", description: "We figure out what you actually need. If I can't help, I'll tell you straight. No pitch.", domain: BOOKING_DOMAIN },
    { id: "draft", when: "A few days later", title: "Your first draft, free", description: "A real, working draft of your site, not a mood board. You only commit once you've seen it.", domain: "draft.yourdomain.com" },
    { id: "launch", when: "One to two weeks", title: "Live on your domain", description: "I connect your domain, set up hosting and run the final checks. Then it stays looked after.", domain: "yourdomain.com" },
  ] satisfies ProcessStep[],
  // What the illustrated windows show: a booking slot, a sketched draft, then a finished build.
  stage: {
    callTitle: "Website call",
    callLength: "30 min",
    slots: ["9:30", "11:00", "14:30", "16:00"],
    draftTag: "Draft 1",
    liveProjectId: "pixelframe",
  },
};

export const ABOUT = {
  heading: "It started on my dad's computer",
  paragraphs: [
    "I'm Ben. My dad sat me down at his computer when I was nine and showed me how a web page was made. I changed a line, the page changed with it, and that was pretty much what got me hooked.",
    "I kept building websites through school, small things for myself at first, then sites for people who asked. That turned into Winzer Design, the studio I founded and run today. We make websites and landing pages for ecommerce brands, personal brands and small businesses, and I still design and build every one myself.",
  ],
  signoff: "Ben Winzer",
  role: `Founder of ${SITE.name}`,
  location: "Based in Germany",
  // Placeholder: back-view beach shot from the current site. Swap for a
  // front-facing portrait when available (portrait orientation, ~800x1000).
  photo: { src: "/images/ben-winzer.jpg", alt: "Ben Winzer walking on a beach by the sea", width: 800, height: 1000 } satisfies ImageAsset,
};

export const FAQ = {
  heading: "Questions people ask before booking",
  groups: [
    {
      name: "Cost and ownership",
      items: [
        { question: "What does the monthly fee cover?", answer: "Hosting, your domain setup and renewal, security and framework updates, uptime monitoring, and small content or design changes whenever you need them." },
        { question: "Do I own the website?", answer: "Your domain, content, copy and brand are yours. The site runs on my hosting so I can keep it fast, monitored and up to date as part of the monthly. If you ever want to move hosting in-house, I'll hand everything over and help you migrate it." },
        { question: "What happens if I want to stop working together?", answer: "It's month to month. Give 30 days notice and I'll hand your domain back and point it wherever you like. At the end of that month the site comes off my hosting, and hosting it from there is up to you." },
        { question: "What if I don't take the monthly plan?", answer: "The site stays live for a few days after launch so you can move your domain to it, then it comes off my hosting. It's a proper Next.js build, not a static HTML page, so it needs a host that supports that and someone comfortable with the framework." },
      ],
    },
    {
      name: "Timing and process",
      items: [
        { question: "How soon will my website be live?", answer: "You'll see a real first draft within a few days of our call. Most sites go live one to two weeks after that." },
        { question: "What do you need from me to get started?", answer: "Half an hour on a call, your logo and brand assets if you have them, and any copy you've already written. I handle the rest, including copy direction if you need it." },
        { question: "What if the design isn't what I pictured?", answer: "I keep refining it until it matches what you had in mind. Revisions are part of the process, not an extra." },
      ],
    },
    {
      name: "What I build",
      items: [
        { question: "Do you build online stores or web apps?", answer: "Yes. Alongside marketing sites I've built online stores for ecommerce brands and web apps backed by databases, with security handled properly. If that's what you need, bring it to the call." },
        { question: "Can you redo my existing site instead of starting fresh?", answer: "Yes. Depending on how your current site was built it can get complicated to untangle, especially with page builders. Starting fresh usually gets you a cleaner, faster result, so we'll weigh it up on the call." },
      ],
    },
  ] satisfies FaqGroup[],
};

export const CONTACT = {
  heading: "Your site starts with a",
  headingAccent: "conversation",
  body: "Book a slot. We'll talk through what you need, what's realistic, and whether it's a fit. Thirty minutes, no pressure, and a free first draft if it is.",
  cta: "Book a free call",
};

export const FOOTER = {
  description: "Websites designed and hand-coded by Ben Winzer.",
  copyright: "2026 Winzer Design",
};

export const NOT_FOUND = {
  heading: "This page does not exist",
  body: "The link may be old, or the page was deleted. Half the work on a rebuild is deleting, after all.",
  cta: "Back to the homepage",
};

export const ERROR_STATE = {
  heading: "Something on this page failed to load",
  body: "Try again, and if it keeps happening, message me on X and I'll fix it:",
  retry: "Try again",
};
