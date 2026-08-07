// Shared slugify helper — turns an industry title into a URL-safe anchor id,
// e.g. "Software, IT & SaaS" -> "software-it-saas". Used by both the
// /industries page (to set the anchor) and the mobile nav accordion (to
// link straight to it).
export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Left navigation capsule — primary destinations
export const navLeft = [
  // No href — Services no longer has its own overview page, this is
  // purely the mega menu trigger. Individual /services/[slug] pages
  // (linked from within the mega menu / mobile accordion) still exist.
  { label: "Services", href: null },
  { label: "Industries", href: "/industries" },
  // No dedicated case-studies page yet — placeholder destination until one exists
  { label: "Case Studies", href: "/case-studies" },
];

// Right navigation capsule — About (quiet, with a small hover dropdown for
// the two About-style pages) + Start a Project (primary CTA)
export const navRight = [
  {
    label: "About",
    href: "/game-changers",
    children: [
      { label: "Game Changers", href: "/game-changers" },
      { label: "Who We Are", href: "/who-we-are" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
];

export const navCta = { label: "Contact Us", href: "/contact" };

// Kept for mobile full-screen menu — same destinations plus Team,
// per the spec's note that Team/Insights/Careers stay out of primary desktop nav for now
export const navMobile = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Game Changers", href: "/game-changers" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "FAQs", href: "/faqs" },
  { label: "Our Team", href: "#team" },
];

export const stats = [
  { value: "3", suffix: " Weeks", label: "Average MVP launch timeline" },
  { value: "100", suffix: "+", label: "Projects delivered for our clients" },
  { value: "800", suffix: "K+", prefix: "$", label: "Client sales opportunities generated" },
  { value: "100", suffix: "%", label: "Milestones delivered on schedule" },
  { value: "80", suffix: "%", label: "Clients retained or renewed" },
];

export const missionVision = [
  {
    label: "Mission",
    icon: "target",
    copy: "To build practical, AI-powered digital solutions that help businesses grow with clarity, speed, and impact.",
  },
  {
    label: "Vision",
    icon: "eye",
    copy: "To become a trusted partner for businesses seeking smarter technology, stronger execution, and sustainable growth.",
  },
];

export const momentum = [
  { period: "Q2 2025", value: 6 },
  { period: "Q3 2025", value: 13 },
  { period: "Q4 2025", value: 17 },
  { period: "Q1 2026", value: 22 },
  { period: "Q2 2026", value: 28 },
];

export const regions = [
  { id: 1, name: "North America", detail: "USA, Canada", x: 21, y: 36 },
  { id: 2, name: "Europe", detail: "UK, Germany, Netherlands, Ireland", x: 47, y: 30 },
  { id: 3, name: "GCC", detail: "KSA, Qatar, UAE", x: 58, y: 45 },
  { id: 4, name: "Pakistan", detail: "Pakistan", x: 66, y: 42 },
  { id: 5, name: "India", detail: "India", x: 70, y: 47 },
  { id: 6, name: "Australia", detail: "Australia", x: 82, y: 74 },
  { id: 7, name: "New Zealand", detail: "New Zealand", x: 90, y: 78 },
  { id: 8, name: "South Africa", detail: "South Africa", x: 51, y: 68 },
  { id: 9, name: "Argentina", detail: "Argentina", x: 30, y: 76 },
];

export const geoStats = [
  { value: "9", label: "Regions" },
  { value: "14+", label: "Countries" },
  { value: "Global", label: "Presence" },
];

export const services = [
  {
    number: "01",
    slug: "ai-mvp",
    title: "AI-Powered MVP Development",
    short:
      "Turning ideas into launch-ready SaaS products, AI assistants, automation tools, and scalable MVPs built for real-world validation and growth.",
    long: "We transform concepts into scalable digital products with practical AI built in. From SaaS tools and dashboards to AI assistants and automation platforms, we build launch-ready MVPs focused on essential functionality, speed to market, and measurable business value.",
    heroImage: "/images/services/ai-mvp-about.webp",
    highlightImage: "/images/services/ai-mvp-highlight.webp",
    pillars: [
      {
        title: "Product Discovery & MVP Strategy",
        copy: "Defining the problem, target users, core features, and roadmap before development begins.",
        image: "/images/services/pillar-product-discovery-mvp-strategy.webp",
      },
      {
        title: "SaaS & Custom MVP Development",
        copy: "Building responsive platforms, portals, dashboards, and web products with the right features first.",
        image: "/images/services/pillar-saas-custom-mvp-development.webp",
      },
      {
        title: "AI Assistants & Intelligent Features",
        copy: "Integrating chatbots, knowledge assistants, document intelligence, content generation, and smart workflows.",
        image: "/images/services/pillar-ai-assistants-intelligent-features.webp",
      },
      {
        title: "Automation & Third-Party Integrations",
        copy: "Connecting APIs, CRMs, payment systems, communication tools, and business platforms.",
        image: "/images/services/pillar-automation-third-party-integrations.webp",
      },
    ],
    engagements: ["Rapid prototype / proof of concept", "End-to-End MVP Build", "MVP Enhancement & AI Integration", "Post-Launch Support & Iteration"],
    stack: ["Claude", "Gemini", "Firebase", "Next.js", "Stripe", "Supabase", "LangChain", "Vercel", "Azure", "AWS", "Docker", "Zapier"],
  },
  {
    number: "02",
    slug: "digital-transformation",
    title: "Digital Transformation",
    short:
      "Helping businesses improve how they operate and grow through business analysis, process optimization, workflow automation, social media marketing, and a stronger digital presence.",
    long: "From business analysis and digital strategy to workflow automation and social media marketing, we help businesses improve efficiency, strengthen their digital presence, and build a more scalable foundation for growth.",
    heroImage: "/images/services/digital-transformation-about.webp",
    highlightImage: "/images/services/digital-transformation-highlight.webp",
    pillars: [
      {
        title: "Business Analysis & Process Optimization",
        copy: "Assessing current workflows, identifying inefficiencies, and recommending practical improvements that support better decision-making and smoother operations.",
        image: "/images/services/pillar-business-analysis-process.webp",
      },
      {
        title: "Digital Strategy & Transformation Roadmap",
        copy: "Creating clear digital strategies and step-by-step transformation plans aligned with business goals, market needs, and long-term growth priorities.",
        image: "/images/services/pillar-digital-strategy-roadmap.webp",
      },
      {
        title: "Social Media Marketing & Digital Presence",
        copy: "Strengthening online visibility through strategic social media management, content planning, audience engagement, and a more consistent digital brand presence.",
        image: "/images/services/pillar-social-media-digital-presence.webp",
      },
    ],
    engagements: ["Business Audit & Discovery", "Digital Strategy & Transformation Roadmap", "Social Media Strategy & Management", "Workflow Automation & Systems Integration"],
    stack: ["Meta", "TikTok", "LinkedIn", "HubSpot", "Jira", "Monday.com", "Google Workspace", "Miro", "Power BI"],
  },
  {
    number: "03",
    slug: "sales-growth",
    title: "Fractional Sales & Growth",
    short:
      "Providing dedicated sales and growth support to identify prospects, generate qualified leads, build pipelines, and convert opportunities into revenue.",
    long: "We work as an extension of your sales team to identify ideal prospects, start qualified conversations, build a consistent pipeline, and support opportunities through the sales process. Clients engage us on a monthly retainer, with an additional commission linked to the sales opportunities we help generate and close.",
    heroImage: "/images/services/sales-growth-about.webp",
    highlightImage: "/images/services/sales-growth-highlight.webp",
    pillars: [
      {
        title: "Business Development-as-a-Service",
        copy: "We operate as an extension of your commercial team, handling targeted prospecting, outreach, lead qualification, follow-ups, and meeting generation to build a consistent pipeline of relevant opportunities.",
        image: "/images/services/pillar-business-development-as-a-service.webp",
      },
    ],
    engagements: ["Dedicated Monthly BD Partnership", "Focused Outreach Campaign", "Upwork Sales Management"],
    stack: ["Upwork", "Apollo.io", "HubSpot", "Salesforce", "Indeed", "Mailchimp", "Pipedrive", "ZoomInfo", "Instantly"],
  },
  {
    number: "04",
    slug: "web-crm-software",
    title: "Web, CRM & Software Solutions",
    short:
      "Designing websites, custom CRMs, business portals, dashboards, and integrated software tailored to your workflows and business goals.",
    long: "We design and develop digital systems tailored to how your business actually works. From high-performing websites and custom CRMs to portals, dashboards, and internal platforms, we build solutions that improve and simplify operations, and support long-term growth.",
    heroImage: "/images/services/web-crm-software-about.webp",
    highlightImage: "/images/services/web-crm-software-highlight.webp",
    pillars: [
      {
        title: "Website & E-Commerce Development",
        copy: "Building responsive business websites, e-commerce stores, landing pages, and digital experiences designed for usability, performance, and conversion.",
        image: "/images/services/pillar-website-ecommerce-development.webp",
      },
      {
        title: "Custom CRM & Business Portals",
        copy: "Developing tailored CRM systems, customer portals, admin panels, and internal tools that centralize information and improve day-to-day management.",
        image: "/images/services/pillar-custom-crm-business-portals.webp",
      },
      {
        title: "Custom Software & Integrated Systems",
        copy: "Creating dashboards, workflow platforms, reporting systems, and custom applications connected with the tools and services your business relies on.",
        image: "/images/services/pillar-custom-software-integrated-systems.webp",
      },
    ],
    engagements: ["Fixed-Price Project", "Time & Materials", "Dedicated Development Team", "Maintenance & Support Retainer"],
    stack: ["Next.js", "React", "Node", "NestJS", "Django", "FastAPI", "Flutter", "Kotlin", "Swift", "Kubernetes", ".NET"],
  },
];

export const industries = [
  { title: "Software, IT & SaaS", copy: "Custom software, SaaS platforms and IT solutions for enterprises and startups." },
  { title: "Education & EdTech", copy: "E-learning platforms, student portals, and digital learning solutions." },
  { title: "Automotive & Auto Care", copy: "Platforms for dealerships, auto care, repair shops, and fleet management." },
  { title: "Home Services & Maintenance", copy: "Platforms for on-demand home services, bookings, and field management." },
  { title: "Logistics & Transportation", copy: "Solutions for fleet tracking, freight management, and transport companies." },
  { title: "Consulting, Staffing & Immigration", copy: "Solutions for consulting firms, staffing agencies, and immigration services." },
  { title: "E-Commerce & Retail", copy: "Scalable platforms for online stores, marketplaces, and omnichannel retail." },
  { title: "Sports & Fitness", copy: "Apps and platforms for gyms, fitness, training, and sports communities." },
  { title: "Food Delivery & Grocery", copy: "Apps and platforms for food delivery, grocery and quick commerce." },
  { title: "Real Estate & Property", copy: "Digital solutions for property marketplaces, brokers, and property management." },
  { title: "Fintech & Financial Services", copy: "Secure solutions for banking, payments, lending, and wealth management." },
  { title: "Healthcare & Wellness", copy: "Clinics, practices, gyms, wellness centers, and healthcare service providers." },
  { title: "Pet Care & Veterinary", copy: "Digital tools for veterinary clinics and pet care businesses." },
];

export const whyUs = [
  { title: "Results-Driven Approach", copy: "We focus on outcomes that matter: leads, sales, and measurable growth.", icon: "target" },
  { title: "End-to-End Solutions", copy: "From strategy & development to marketing and support, we have got you covered.", icon: "rocket" },
  { title: "Proven Expertise", copy: "Years of experience across industries with a track record of successful projects.", icon: "badge" },
  { title: "Technology Agnostic", copy: "We choose the right tools, platforms, and stacks based on your business needs.", icon: "layers" },
  { title: "AI & Automation Driven", copy: "We actively use AI, automation and modern workflows to improve efficiency, and speed.", icon: "cpu" },
  { title: "Responsive Collaboration", copy: "Clear communication, fast feedback, & hands-on support throughout the engagement.", icon: "chat" },
];

export const whyUsMetrics = [
  { value: "12+", label: "Industries served with insight-led execution", tag: "Data-Backed Strategies" },
  { value: "4", label: "Strategy. Design. Technology. Growth.", tag: "Core Verticals" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "10+", label: "Markets Navigated" },
  { value: "24/7", label: "Future-Ready Execution" },
];

export const team = [
  { name: "Adeel Aslam", role: "CEO & Founder", image: "/images/team/adeel-aslam.webp", bio: "Leads vision and strategy for everything we build." },
  { name: "Shahzad Ali", role: "Co-Founder & COO", image: "/images/team/shahzad-ali.webp", bio: "Keeps operations running smoothly and the business on solid ground." },
  { name: "Fizza Shahzad", role: "Creative & Brand Lead", image: "/images/team/fizza-shahzad.webp", bio: "Creates content that gets people talking." },
  { name: "Hamza Durrani", role: "Business Development Manager", image: "/images/team/hamza-durrani.webp", bio: "Drives new business and keeps the pipeline moving." },
  { name: "Laiba Zafar", role: "Social Media Coordinator", image: "/images/team/laiba-zafar.webp", bio: "Shapes our voice and presence across every platform." },
  { name: "Mutahar Murtaza", role: "Senior Salesforce Developer" },
  { name: "Zaid Bin Arif", role: "Business Analyst", image: "/images/team/zaid-bin-arif.webp", bio: "Connects with prospects and turns conversations into deals." },
  { name: "Sitara Tahir", role: "Project Manager" },
  { name: "Abdullah Sadiq", role: "Outbound Growth Specialist", image: "/images/team/abdullah-sadiq.webp", bio: "Opens doors and builds relationships that turn into partnerships." },
  { name: "Maleeha Farooq", role: "Marketing Associate", image: "/images/team/maleeha-farooq.webp", bio: "Keeps our social channels active, engaging, and on-brand." },
  { name: "Adnan Farooq", role: "Business Operations & Accounts Executive" },
  { name: "Maham Aziz", role: "HR Manager" },
  { name: "Saad Sultan", role: "Lead CRM & Automation Engineer", image: "/images/team/saad-sultan.webp", bio: "Builds the CRM and automation systems that keep everything connected." },
  { name: "Farwa Saleem", role: "HR Associate", image: "/images/team/farwa-saleem.webp", bio: "Supports the team through every stage of the hiring journey." },
  { name: "Hamza Khan", role: "Motion Graphics Designer", image: "/images/team/hamza-khan.webp", bio: "Turns ideas into clean, thoughtful visuals." },
  { name: "Ali Raza", role: "Sales Development Representative", image: "/images/team/ali-raza.webp", bio: "Builds relationships that grow into long-term partnerships." },
  { name: "Musahb Ali", role: "Data Strategy Specialist", image: "/images/team/musahb-ali.webp", bio: "Turns raw data into clear, actionable strategy." },
  { name: "Asad Saleem Farooq", role: "Regional Growth Partner — North America" },
  { name: "Fraz Bin Arif", role: "Regional Growth Partner — Western Europe" },
  { name: "Ahmad Raza", role: "Regional Growth Partner — GCC" },
  { name: "Hamza Shabbir", role: "Business Development Representative" },
  { name: "Muhammad Yousaf", role: "Project Manager" },
  { name: "Muhammad Saad Salman", role: "CMS Developer" },
  { name: "Raza Hamid", role: "Business Development Executive" },
  { name: "Khubaib Malik", role: "Client Success Manager" },
];

export const contact = {
  phone: "+92-317-4731492",
  email: "info@penaxis.com",
  linkedin: "/company/penaxis",
  website: "www.penaxis.com",
  address: "2nd floor, 3-P, DHA Rahbar, Lahore, Pakistan, 54000",
};

// Real case studies (client identities kept confidential per the source
// brief's own explicit instructions where given — e.g. "keep completely
// white-labelled", "do not mention the client" — so several titles use
// the brief's own recommended, benefit-led phrasing instead of an internal
// project codename). Two of these (the AI receptionist kiosk and the
// tender-intelligence platform) are proposed/concept work, not yet built —
// flagged via `status: "concept"` and worded as designed/proposed rather
// than delivered, per the source brief's instruction not to present
// unbuilt work as an achieved result. The first 5 (Drivelo, AI receptionist
// kiosk, BidLogics, SEKA Gravel, hotel booking platform) now have real
// product screenshots via `image` (homepage accordion hover thumb) and
// `gridImage` (case studies grid card) — the remaining entries have no
// `image`/`gridImage` field, so the grid falls back to its brand-gradient
// thumbnails and the homepage accordion skips the hover thumbnail for them.
export const caseStudies = [
  {
    slug: "drivelo-logistics-platform",
    image: "/images/case-studies/drivelo-logistics-platform-thumb.webp",
    gridImage: "/images/case-studies/grid/drivelo-logistics-platform-grid.webp",
    bannerImages: [
      "/images/case-studies/banner/drivelo-banner-1.webp",
      "/images/case-studies/banner/drivelo-banner-2.webp",
      "/images/case-studies/banner/drivelo-banner-3.webp",
    ],
    title: "Drivelo — Integrated Digital Logistics & Fleet Management Ecosystem",
    tags: ["Logistics & Transportation"],
    blurb:
      "Four connected apps — customer, driver, dispatch, and corporate site — replacing fragmented workflows with one on-demand logistics experience.",
    status: "delivered",
    region: "Gulf Region",
    overview:
      "A Gulf-based logistics company needed a unified digital ecosystem to replace fragmented workflows, manual driver coordination, and limited delivery visibility.",
    challenge:
      "The goal was an on-demand logistics experience — similar to ride-hailing platforms, but purpose-built for commercial freight operations.",
    solutionIntro: "Penaxis developed four connected digital products covering the complete delivery lifecycle:",
    solutionPoints: [
      "Customer app for booking deliveries, tracking drivers, and accessing documents",
      "Driver app for assignments, navigation, status updates, and proof of delivery",
      "Web-based dispatch platform for job allocation, live fleet monitoring, and document management",
      "Responsive corporate website for services, credentials, and customer enquiries",
    ],
    solutionNote:
      "The ecosystem incorporated real-time GPS tracking, route navigation, in-app communication, automated notifications, role-based access, and centralized delivery documentation.",
    techStack: [
      { label: "Core Stack", items: "React Native, React, TypeScript, Node.js, Express.js, PostgreSQL, Redis, AWS, Docker, NGINX" },
      { label: "Integrations", items: "Google Maps Platform, Directions API, Geolocation APIs, Firebase Cloud Messaging, Apple Push Notification Service, Twilio, WebSockets, Cloud Object Storage" },
    ],
    impactIntro:
      "The solution created a single operational environment connecting customers, drivers, and dispatch teams throughout the delivery lifecycle.",
    impactPoints: [
      "Centralized fleet visibility across the whole operation",
      "Faster job coordination between dispatch and drivers",
      "Direct customer tracking for every delivery",
      "Traceable proof-of-delivery records",
      "Reduced dependence on calls, spreadsheets, and messaging apps",
    ],
    metrics: [
      { value: "4", label: "Digital Products" },
      { value: "1,000", label: "Concurrent Users" },
      { value: "≤15-Second", label: "Live Tracking" },
      { value: "99.5%", label: "Platform Availability" },
    ],
  },
  {
    slug: "ai-receptionist-visitor-kiosk",
    image: "/images/case-studies/ai-receptionist-visitor-kiosk-thumb.webp",
    gridImage: "/images/case-studies/grid/ai-receptionist-visitor-kiosk-grid.webp",
    bannerImages: [
      "/images/case-studies/banner/ai-receptionist-banner-1.webp",
      "/images/case-studies/banner/ai-receptionist-banner-2.webp",
      "/images/case-studies/banner/ai-receptionist-banner-3.webp",
    ],
    title: "AI-Powered Multilingual Receptionist & Visitor Kiosk",
    tags: ["Education & EdTech"],
    blurb:
      "A proposed, school-safe AI reception kiosk — multilingual visitor sign-in, translation, and a controlled FAQ assistant, designed to scale beyond schools.",
    status: "concept",
    region: "Multi-Market",
    overview:
      "An education technology entrepreneur needed a scalable self-service reception platform for schools, with future applications across hospitals, hotels, malls, and other visitor-heavy environments.",
    challenge:
      "The goal was to reduce repetitive front-desk work, overcome language barriers, and centralize visitor activity — without exposing users to unrestricted AI responses or unpredictable token-based costs.",
    solutionIntro: "Penaxis designed a controlled, school-safe reception ecosystem comprising:",
    solutionPoints: [
      "Locked Android kiosk with voice, text, and touch interaction",
      "Multilingual assistance across six manually selectable languages",
      "School-approved knowledge base supporting up to 100 FAQs",
      "Semantic question matching with confidence-based answer retrieval",
      "Digital visitor sign-in, sign-out, and real-time on-site register",
      "Two-way translation between reception staff and visitors",
      "Customisable receptionist avatar, name, and school branding",
      "Admin portal for FAQs, users, languages, visitors, and unanswered questions",
      "Analytics for kiosk sessions, popular questions, language usage, and visitor activity",
    ],
    solutionNote:
      "The configuration-driven architecture would let the same platform be adapted for additional schools and industries without rebuilding the core product. Phase 1 retrieves only school-approved answers — no GPT or other generative LLM sits in the live response path.",
    techStack: [
      { label: "Applications", items: "Kotlin, Jetpack Compose, React, Next.js, TypeScript, Tailwind CSS" },
      { label: "Backend & Data", items: "Java, Spring Boot, PostgreSQL, pgvector, Redis, REST APIs" },
      { label: "AI & Language", items: "OpenAI Whisper, Multilingual Sentence Embeddings, Semantic Similarity Search, Confidence-Based Retrieval, Android Native TTS" },
      { label: "Integrations & Infrastructure", items: "Google/Azure Speech, Translation Provider, AWS EC2, NGINX, Docker, GitHub Actions, OpenAPI" },
    ],
    impactIntro:
      "The platform was designed to consolidate reception assistance, multilingual communication, and visitor registration into one controlled environment.",
    impactPoints: [
      "Reduced repetitive staff involvement at reception",
      "An exportable visitor history",
      "Real-time visibility into who's currently on-site",
      "Approved-information updates without ongoing developer support",
    ],
    metrics: [
      { value: "5", label: "Core Modules" },
      { value: "6", label: "Languages Supported" },
      { value: "100", label: "Approved FAQs" },
      { value: "2–4 Week", label: "Replication Time" },
    ],
  },
  {
    slug: "bidlogics-tender-intelligence",
    image: "/images/case-studies/bidlogics-tender-intelligence-thumb.webp",
    gridImage: "/images/case-studies/grid/bidlogics-tender-intelligence-grid.webp",
    bannerImages: [
      "/images/case-studies/banner/bidlogics-banner-1.webp",
      "/images/case-studies/banner/bidlogics-banner-2.webp",
      "/images/case-studies/banner/bidlogics-banner-3.webp",
    ],
    title: "BidLogics — AI-Powered Bidding & Tender Intelligence Platform",
    tags: ["Software, IT & SaaS"],
    blurb:
      "A proposed AI-first workspace for the full pre-award bidding lifecycle — tender discovery, explainable fit-scoring, and RAG-powered proposal drafting.",
    status: "concept",
    region: "Multi-Market",
    overview:
      "A growing enterprise operating across competitive B2B and public-sector markets needed an AI-first platform to modernise its pre-award bidding lifecycle.",
    challenge:
      "The goal was to replace fragmented procurement portals, spreadsheets, documents, and deadline trackers with one secure environment for discovering opportunities, evaluating suitability, preparing proposals, and monitoring bid performance.",
    solutionIntro: "Penaxis designed an integrated tender intelligence platform featuring:",
    solutionPoints: [
      "Automated monitoring of configured tender portals and procurement sources",
      "AI-generated Fit Scores with explainable recommendations and confidence indicators",
      "Intelligent extraction of deadlines, requirements, evaluation criteria, and commercial risks",
      "Structured Bid, Do Not Bid, and Manual Review recommendations",
      "Historical award, competition, and indicative pricing intelligence",
      "RAG-powered proposal drafting using approved organisational documents",
      "Centralised bid pipeline, ownership, deadlines, and approval management",
      "Public-market and prospective-client signal monitoring",
      "Leadership dashboards covering pipeline value, submissions, and win/loss trends",
      "Role-based permissions, tenant-isolated data, and complete decision audit trails",
    ],
    solutionNote:
      "AI supports discovery, analysis, and drafting, while authorised users retain control over qualification, pricing, approvals, and final submissions.",
    techStack: [
      { label: "Applications", items: "React, Next.js, TypeScript, Tailwind CSS" },
      { label: "Backend & Data", items: "Python, FastAPI, PostgreSQL, OpenSearch/Elasticsearch" },
      { label: "AI & Document Intelligence", items: "OpenAI, Claude, Gemini, LangChain/LlamaIndex, RAG, pgvector/Pinecone/Azure AI Search, OCR, PDF Parsing, Table Extraction" },
      { label: "Infrastructure & Security", items: "AWS/Azure, S3/Blob Storage, Docker, OAuth 2.0, SSO, MFA, Role-Based Access, Encryption" },
    ],
    impactIntro: "The platform was designed to help bidding teams:",
    impactPoints: [
      "Discover relevant opportunities across multiple sources",
      "Prioritise high-fit tenders earlier",
      "Reduce time spent reviewing unsuitable opportunities",
      "Accelerate first-draft proposal preparation",
      "Reuse approved organisational knowledge securely",
      "Strengthen deadline, compliance, and approval governance",
      "Preserve a searchable institutional history of past bids",
      "Give leadership consolidated visibility into the tender pipeline",
      "Make every AI-assisted recommendation explainable and auditable",
    ],
    metrics: [
      { value: "6", label: "Intelligence Layers" },
      { value: "3", label: "Decision Outcomes" },
      { value: "1", label: "Unified Workspace" },
      { value: "100%", label: "Human-Controlled" },
    ],
  },
  {
    slug: "seka-gravel-cycling-platform",
    image: "/images/case-studies/seka-gravel-cycling-platform-thumb.webp",
    gridImage: "/images/case-studies/grid/seka-gravel-cycling-platform-grid.webp",
    title: "SEKA Gravel — Membership-Driven Cycling Community & Race Management Platform",
    tags: ["Sports & Fitness"],
    blurb:
      "A CMS-powered community hub for a gravel cycling organisation — rider profiles, race archives, paid memberships, and a gear marketplace in one place.",
    status: "delivered",
    region: "Greater Groningen, Netherlands",
    overview:
      "A community-led gravel cycling organisation needed more than a promotional website. Rider profiles, race records, membership access, exclusive content, and second-hand cycling listings needed to operate within one connected digital ecosystem.",
    challenge:
      "The goal was a distinctive, community-first platform that could support recurring memberships while letting the organisation independently manage its growing cycling community.",
    solutionIntro: "Penaxis designed and developed a responsive, CMS-powered platform featuring:",
    solutionPoints: [
      "Individual rider profiles connected with racing histories",
      "Upcoming race publishing and completed race archives",
      "Dedicated race pages with reports, results, riders, and imagery",
      "Paid registration and member authentication through Memberstack",
      "Recurring annual membership payments through Stripe",
      "Public and members-only races, pages, and community content",
      "Cycling marketplace with seller details, pricing, and enquiries",
      "Relational CMS architecture connecting riders, races, and reports",
      "Dynamic filtering for riders, races, and marketplace listings",
      "Custom administration for sponsors, members, and community content",
    ],
    solutionNote:
      "The platform was structured so the client could publish races, maintain records, moderate listings, and expand its content without routine developer support.",
    techStack: [
      { label: "Design & Frontend", items: "Figma, Webflow, HTML5, CSS3, JavaScript ES6+" },
      { label: "CMS Architecture", items: "Webflow CMS, Relational Collections, Reference Fields, Multi-Reference Fields, Dynamic Collection Templates" },
      { label: "Membership & Payments", items: "Memberstack 2.0, Stripe Checkout, Recurring Subscriptions, Membership-Status Webhooks, Permission-Based Content Gating" },
      { label: "Delivery & Optimisation", items: "Webflow Hosting, Global CDN, Responsive Images, WebP, Lazy Loading, Technical SEO" },
    ],
    impactIntro:
      "The solution transformed a conventional cycling website into a functional digital home for the entire community.",
    impactPoints: [
      "Riders, races, memberships, and listings consolidated into one platform",
      "Recurring revenue introduced through annual paid memberships",
      "Payment status automatically tied to content permissions",
      "Long-term rider profiles and performance histories preserved",
      "Exclusive races and content offered to active members",
      "Reduced manual membership and access verification",
      "A dedicated equipment marketplace for cyclists",
      "New races and community content published through reusable templates",
    ],
    metrics: [
      { value: "4", label: "Connected Experiences" },
      { value: "€250", label: "Annual Membership" },
      { value: "3", label: "Core Integrations" },
      { value: "6+", label: "CMS Structures" },
    ],
  },
  {
    slug: "hotel-booking-revenue-platform",
    image: "/images/case-studies/hotel-booking-revenue-platform-thumb.webp",
    gridImage: "/images/case-studies/grid/hotel-booking-revenue-platform-grid.webp",
    bannerImages: [
      "/images/case-studies/banner/hotel-booking-banner-1.webp",
      "/images/case-studies/banner/hotel-booking-banner-2.webp",
      "/images/case-studies/banner/hotel-booking-banner-3.webp",
    ],
    title: "One Intelligent Dashboard for Hotel Bookings, Revenue and Occupancy",
    tags: ["Software, IT & SaaS"],
    blurb:
      "A unified hotel-management platform consolidating six booking channels, revenue tracking, and AI-powered occupancy forecasting into one dashboard.",
    status: "delivered",
    region: "Dubai, UAE",
    overview:
      "A Dubai-based hospitality operator needed one central platform to manage reservations received through direct and third-party booking channels.",
    challenge:
      "Separate calendars, payment records, commissions, and guest information made it difficult to maintain accurate availability, prevent overlapping reservations, and identify low-occupancy periods early.",
    solutionIntro: "Penaxis developed a unified hotel-management platform featuring:",
    solutionPoints: [
      "Consolidated reservations from six direct and third-party channels",
      "Central room-availability calendar",
      "Booking, cancellation, refund, and guest-record management",
      "Payment, payout, commission, and service-fee tracking",
      "Revenue reporting by room type and booking source",
      "AI-powered occupancy forecasting",
      "Smart rate and promotion recommendations",
      "Personalised guest-message drafting",
      "Guest-review analysis and recurring feedback detection",
      "Cancellation-risk indicators",
      "Email, WhatsApp, and in-platform notifications",
    ],
    solutionNote: "Management retained approval over all pricing and promotional recommendations before publication.",
    techStack: [
      { label: "Frontend", items: "React, Next.js, TypeScript" },
      { label: "Backend & Data", items: "Node.js, NestJS, Python, FastAPI, PostgreSQL" },
      { label: "AI Models & Intelligence", items: "OpenAI, Claude, Gemini, Occupancy Forecasting, Pricing Recommendations, Review Intelligence, Cancellation-Risk Analysis" },
      { label: "Booking Integrations", items: "Booking.com, Airbnb, Expedia, Agoda, Trip.com, Direct-Booking APIs" },
      { label: "Payments & Communication", items: "Stripe, Checkout.com, UAE Payment Gateway, WhatsApp, Email, In-Platform Alerts" },
    ],
    impactIntro: "The platform created one operational environment for reservations, availability, payments, and revenue intelligence.",
    impactPoints: [
      "Bookings from multiple channels managed centrally",
      "Reduced risk of overlapping reservations",
      "Revenue monitored after commissions, fees, and refunds",
      "Underbooked dates identified before they affected occupancy",
      "Data-informed pricing and promotion decisions",
      "More consistent guest communication",
      "Recurring service issues recognised through review analysis",
      "Reduced dependence on separate portals and spreadsheets",
    ],
    metrics: [
      { value: "6", label: "Booking Channels" },
      { value: "1", label: "Unified Calendar" },
      { value: "360°", label: "Revenue Visibility" },
      { value: "5", label: "AI Capabilities" },
    ],
  },
  {
    slug: "the-plate-agent-marketplace",
    gridImage: "/images/case-studies/grid/the-plate-agent-marketplace-grid.webp",
    bannerImages: [
      "/images/case-studies/banner/plate-agent-banner-1.webp",
      "/images/case-studies/banner/plate-agent-banner-2.webp",
      "/images/case-studies/banner/plate-agent-banner-3.webp",
    ],
    title: "The Plate Agent — AI-Powered Private Registration Marketplace & Valuation Engine",
    tags: ["Automotive & Auto Care"],
    blurb:
      "A premium UK plate marketplace pairing searchable inventory with an AI-assisted valuation engine that turns vague buyer requests into qualified leads.",
    status: "delivered",
    region: "United Kingdom",
    overview:
      "A UK private registration dealer needed more than a conventional inventory website. The business needed to showcase plates already available for resale while capturing demand from buyers searching for registrations not currently held in stock.",
    challenge:
      "The goal was to turn open-ended buyer preferences into structured, commercially qualified enquiries — while giving customers immediate, indicative pricing guidance.",
    solutionIntro:
      "Penaxis developed a premium private registration marketplace with an AI-assisted classification and valuation workflow featuring:",
    solutionPoints: [
      "Searchable inventory of available private registrations",
      "Category, pricing, and availability management",
      "Advanced search, filtering, and fuzzy keyword matching",
      "Preference-based sourcing for unavailable registrations",
      "Collection of desired names, initials, words, dates, and numbers",
      "Budget, format, and alternative-spelling capture",
      "AI-assisted pattern recognition and plate classification",
      "Indicative valuation ranges based on controlled pricing logic",
      "Confidence thresholds, valuation boundaries, and fallback rules",
      "Central dashboard for inventory, pricing, and enquiries",
      "Transactional notifications with optional SMS and WhatsApp follow-ups",
    ],
    solutionNote:
      "The architecture was prepared for reservations, deposits, and online purchases. The AI supports classification and indicative valuation, while the dealer retains complete authority over final sourcing decisions and quotations.",
    techStack: [
      { label: "Frontend", items: "Next.js 14, React 18, TypeScript, Tailwind CSS" },
      { label: "Backend & Data", items: "Node.js, NestJS, PostgreSQL, Prisma ORM, REST APIs" },
      { label: "AI & Valuation", items: "OpenAI GPT-4o mini, Structured Outputs, Hybrid Rules Engine, Pattern Recognition, Confidence Thresholds, JSON Schema Validation" },
      { label: "Search", items: "PostgreSQL Full-Text Search, Indexed Filtering, Fuzzy Keyword Matching" },
      { label: "Integrations", items: "AWS S3, Transactional Email API, Twilio SMS/WhatsApp, Google Analytics 4, Stripe/PayPal Readiness" },
    ],
    impactIntro:
      "The platform established two connected commercial journeys: customers could either browse registrations already available or request an ideal plate and receive an indicative valuation.",
    impactPoints: [
      "Registrations, availability, and enquiries managed centrally",
      "Buyers captured even without an exact inventory match",
      "Reduced manual interpretation of early-stage requests",
      "Indicative pricing available outside normal working hours",
      "Vague preferences converted into structured sales opportunities",
      "Demand intelligence collected around popular names and combinations",
      "A scalable foundation for inventory and recommendation growth",
    ],
    metrics: [
      { value: "2", label: "Purchase Journeys" },
      { value: "24/7", label: "Price Estimates" },
      { value: "6+", label: "Valuation Signals" },
      { value: "100%", label: "Structured Enquiries" },
    ],
  },
  {
    slug: "dry-cleaning-delivery-platform",
    gridImage: "/images/case-studies/grid/dry-cleaning-delivery-platform-grid.webp",
    bannerImages: [
      "/images/case-studies/banner/dry-cleaning-banner-1.webp",
      "/images/case-studies/banner/dry-cleaning-banner-2.webp",
      "/images/case-studies/banner/dry-cleaning-banner-3.webp",
    ],
    title: "Dry Cleaning, Delivered: A Serverless Pickup-to-Return Ecosystem",
    tags: ["Home Services & Maintenance"],
    blurb:
      "A serverless, multi-platform fulfilment ecosystem connecting customers, drivers, and cleaning partners across the full pickup-to-return lifecycle.",
    status: "delivered",
    region: "United States",
    overview:
      "A US-based, technology-enabled dry-cleaning service needed a unified platform connecting customers, delivery drivers, and local cleaning partners.",
    challenge:
      "The goal was to digitise the complete service lifecycle — from requesting a pickup and processing payment to cleaning-facility handover and final doorstep return.",
    solutionIntro: "Penaxis developed a serverless, multi-platform fulfilment ecosystem featuring:",
    solutionPoints: [
      "Customer applications for iOS and Android",
      "One-time and recurring pickup scheduling",
      "Driver job acceptance and fulfilment workflows",
      "Eight-stage order tracking from booking to final return",
      "Central administration panel for customers, drivers, and orders",
      "Cleaning-partner handover and status management",
      "Secure online payments and transaction records",
      "Active and historical order visibility",
      "Status-based push notifications",
      "Address and account management",
      "Referral codes and customer credit balances",
      "WhatsApp customer-support integration",
      "Shared real-time data across web and mobile platforms",
    ],
    solutionNote:
      "A unified GraphQL architecture connected every product surface to the same operational data model, creating a traceable chain of custody throughout the outward and return journeys.",
    techStack: [
      { label: "Web & Mobile", items: "React, React Native, TypeScript, JavaScript, iOS, Android" },
      { label: "Backend & Data", items: "Hasura GraphQL Engine, PostgreSQL, GraphQL Queries/Mutations/Subscriptions, Serverless Functions, WebSockets" },
      { label: "Payments", items: "Stripe Payments, Payment Intents, Customer Records, Transaction Webhooks" },
      { label: "Integrations", items: "Firebase Cloud Messaging, Apple Push Notification Service, WhatsApp Deep Links, Mobile Geolocation, Cloud Object Storage" },
      { label: "Security & Infrastructure", items: "JWT Authentication, Role-Based GraphQL Permissions, HTTPS/TLS, Managed PostgreSQL, Serverless Cloud Hosting, CDN Distribution" },
    ],
    impactIntro: "The platform transformed a traditionally offline service into a coordinated digital fulfilment marketplace.",
    impactPoints: [
      "Pickup requests accepted around the clock",
      "Customers, drivers, and cleaning partners coordinated centrally",
      "Both immediate and recurring collections supported",
      "Every order tracked through the complete pickup-to-return lifecycle",
      "Reduced dependence on calls and messaging for routine coordination",
      "Unified customer, driver, payment, and order records",
      "Clearer visibility into service progress for customers",
      "Shared functionality deployed across web, iOS, and Android",
    ],
    metrics: [
      { value: "4", label: "Product Surfaces" },
      { value: "3-Sided", label: "Workflow" },
      { value: "8", label: "Lifecycle Stages" },
      { value: "1", label: "Unified GraphQL Layer" },
    ],
  },
  {
    slug: "cybersecurity-hr-platform",
    gridImage: "/images/case-studies/grid/cybersecurity-hr-platform-grid.webp",
    bannerImages: [
      "/images/case-studies/banner/qsecure-banner-1.webp",
      "/images/case-studies/banner/qsecure-banner-2.webp",
      "/images/case-studies/banner/qsecure-banner-3.webp",
    ],
    title: "Digitising a Qatar-Based Cybersecurity Company — Inside and Out",
    tags: ["Software, IT & SaaS"],
    blurb:
      "A premium corporate website plus a custom HR operations ERP, replacing fragmented workforce tools with one centralized system.",
    status: "delivered",
    region: "Qatar",
    overview:
      "A Qatar-based cybersecurity and enterprise technology company needed modernisation across both its external digital presence and internal workforce operations.",
    challenge:
      "Its existing website didn't adequately communicate the depth or enterprise value of its services, while employee records, attendance, leave, payroll, and approvals were managed through fragmented tools and manual processes.",
    solutionIntro: "Penaxis delivered two connected digital platforms addressing the company's commercial positioning and internal operations.",
    solutionPoints: [
      "Enterprise Cybersecurity Website — cybersecurity and IT security solutions, risk management and security consulting, network and infrastructure security, cloud security, digital transformation services, enterprise technology consulting, managed IT services, and conversion-focused enquiry journeys",
      "Custom HR Operations ERP — employee profiles and centralised records, departments/roles/reporting structures, attendance and working-hour tracking, check-in/check-out management, leave balances/applications/approvals, payroll records and salary slips, employee documents and contracts, performance and increment history, birthdays and work anniversaries, internal announcements, employee self-service, HR reporting dashboards, and role-based access",
    ],
    solutionNote:
      "The information architecture translated technically complex services into a clearer value proposition for executives, IT leaders, and enterprise decision-makers.",
    techStack: [
      { label: "Public Experience", items: "Responsive Corporate Website, Structured Service Architecture, Corporate Enquiry Journeys" },
      { label: "HR Operations", items: "Employee Records, Attendance, Leave Management, Payroll, Documents, Performance History" },
      { label: "Access & Security", items: "Secure Authentication, Role-Based Access Control, Protected Employee Data, Administrative Permissions" },
      { label: "Management", items: "Employee Self-Service, HR Dashboards, Reporting, Centralised Document Management" },
    ],
    impactIntro: "The engagement modernised how the company presented itself to enterprise prospects and managed its growing workforce.",
    impactPoints: [
      "A more credible presence within Qatar's cybersecurity market",
      "Complex technical services communicated through a clearer structure",
      "A professional enquiry journey for enterprise prospects",
      "Employee information and HR administration centralised",
      "Standardised attendance, leave, payroll, and approval workflows",
      "Reduced dependence on spreadsheets and manual records",
      "Structured self-service access for employees",
      "A scalable operational foundation for workforce growth",
    ],
    metrics: [
      { value: "2", label: "Digital Platforms" },
      { value: "10+", label: "HR Workflows" },
      { value: "3", label: "Access Levels" },
      { value: "1", label: "Unified Employee Record" },
    ],
  },
  {
    slug: "ai-automotive-search-oktabytes",
    gridImage: "/images/case-studies/grid/ai-automotive-search-oktabytes-grid.webp",
    bannerImages: [
      "/images/case-studies/banner/oktabytes-banner-1.webp",
      "/images/case-studies/banner/oktabytes-banner-2.webp",
      "/images/case-studies/banner/oktabytes-banner-3.webp",
    ],
    title: "From Complex Filters to Conversations: Reimagining Automotive Search with AI",
    tags: ["Automotive & Auto Care"],
    blurb:
      "A Generative AI automotive assistant for OktaBytes, letting buyers describe what they need in plain language instead of configuring technical filters.",
    status: "delivered",
    region: "United States",
    overview:
      "A leading US automotive marketplace wanted to modernise how customers discovered vehicles and how internal teams accessed inventory information.",
    challenge:
      "Traditional filters required buyers to already understand makes, models, and technical specifications. The goal was to let users describe what they needed naturally and receive accurate recommendations from thousands of live vehicle listings.",
    solutionIntro:
      "Penaxis developed a Generative AI-powered automotive assistant capable of understanding conversational requirements and translating them into controlled inventory searches. The platform featured:",
    solutionPoints: [
      "Natural-language vehicle discovery",
      "Live integration with structured marketplace inventory",
      "Dynamic generation of controlled database queries",
      "Search across budget, location, mileage, year, and vehicle type",
      "Filtering by make, model, transmission, powertrain, and features",
      "Recommendations based on lifestyle and buying priorities",
      "Side-by-side vehicle comparisons",
      "Personalisation using preferences, location, and previous searches",
      "Persistent conversation and search history",
      "Separate access experiences for customers and internal teams",
      "Administrative controls for prompts, models, and AI behaviour",
      "A/B testing across different prompts and language models",
    ],
    solutionNote:
      "A buyer could ask something like \"Find a fuel-efficient seven-seat SUV under $35,000 near Austin,\" and the assistant would convert that into relevant inventory criteria and return matching vehicles — no need to configure numerous technical filters. Once a suitable vehicle was identified, the assistant guided the user toward the right next step: requesting more information, contacting the dealership, booking a viewing, scheduling a test drive, or submitting a financing enquiry.",
    techStack: [
      { label: "AI Models", items: "Claude 3.5 Sonnet, Llama 3, Large Language Models, Prompt Experimentation" },
      { label: "Application & Intelligence", items: "Python, Natural-Language Processing, Dynamic Query Generation, Recommendation Logic, Conversation History" },
      { label: "Data & Infrastructure", items: "Amazon RDS, Amazon S3, Amazon SageMaker, AWS Lambda, Amazon API Gateway" },
      { label: "Cloud Workflows", items: "Amazon EventBridge, Amazon SNS, Amazon SQS, Terraform" },
    ],
    impactIntro: "The solution transformed conventional vehicle search into a more intuitive, conversational buying experience.",
    impactPoints: [
      "Discovery simplified across thousands of vehicle listings",
      "Buyers could search without knowing specific makes or models",
      "Recommendations grounded in practical customer priorities",
      "Inventory data made conversationally accessible to internal teams",
      "Reduced repetitive availability and specification enquiries",
      "Informed comparisons supported between shortlisted vehicles",
      "Customer preferences captured before dealership handoff",
      "More structured, commercially relevant enquiries generated",
      "AI workloads scaled through a modular AWS architecture",
    ],
    metrics: [
      { value: "2", label: "AI Models" },
      { value: "9+", label: "Search Dimensions" },
      { value: "5", label: "Conversion Actions" },
      { value: "1", label: "Conversational Interface" },
    ],
  },
  {
    slug: "patient-care-management-platform",
    gridImage: "/images/case-studies/grid/patient-care-management-platform-grid.webp",
    bannerImages: [
      "/images/case-studies/banner/patientcare-banner-1.webp",
      "/images/case-studies/banner/patientcare-banner-2.webp",
      "/images/case-studies/banner/patientcare-banner-3.webp",
    ],
    title: "Integrated Patient Care & Clinical Management Platform",
    tags: ["Healthcare & Wellness"],
    blurb:
      "One secure platform connecting patients, practitioners, appointments, and clinical records across a multi-clinic healthcare provider.",
    status: "delivered",
    region: "Johannesburg, South Africa",
    overview:
      "A multi-clinic healthcare provider needed one secure platform to connect patients, practitioners, appointments, and clinical records — replacing fragmented administrative processes.",
    challenge:
      "Scattered systems made it hard to give practitioners a complete view of a patient's history at the point of care, or to give patients a clear way to book, prepare for, and follow up on appointments.",
    solutionIntro: "Penaxis built:",
    solutionPoints: [
      "Dedicated patient and practitioner portals",
      "Multi-clinic appointment scheduling",
      "Pre-consultation health assessments",
      "Unified medical history, medication, and document records",
      "Structured consultation reports and After Visit Summaries",
      "Role-based access and privacy-conscious data management",
    ],
    techStack: [
      { label: "Security", items: "Secure Authentication, Role-Based Access, Encrypted Records, Protected Document Storage" },
    ],
    impactIntro:
      "The platform created a connected patient journey from appointment booking and pre-visit assessment through consultation, medication guidance, and follow-up care — while helping practitioners access the right clinical information from one system.",
    impactPoints: [],
    metrics: [],
  },
  {
    slug: "recruitment-talent-platform",
    bannerImages: [
      "/images/case-studies/banner/recruitment-banner-1.webp",
      "/images/case-studies/banner/recruitment-banner-2.webp",
      "/images/case-studies/banner/recruitment-banner-3.webp",
    ],
    title: "From Resume Overload to an Intelligent, Searchable Talent Pipeline",
    tags: ["Consulting, Staffing & Immigration"],
    blurb:
      "A combined ATS and Recruitment CRM with explainable AI candidate matching, turning scattered resumes into a searchable, reusable talent pipeline.",
    status: "delivered",
    overview:
      "A high-volume recruitment company needed to replace scattered resumes, spreadsheets, and screening notes with one intelligent system for managing candidates across multiple clients and vacancies.",
    challenge:
      "The goal was to help recruiters prioritise suitable candidates, rediscover previous applicants, and manage high-volume hiring — without removing human control from selection decisions.",
    solutionIntro: "Penaxis built:",
    solutionPoints: [
      "Combined Applicant Tracking System and Recruitment CRM",
      "Automated resume parsing and structured candidate profiles",
      "Advanced filtering across skills, experience, salary, and availability",
      "Explainable AI-assisted candidate matching",
      "Screening notes and complete interaction histories",
      "A reusable talent database for future and urgent vacancies",
      "Custom recruitment pipelines and management dashboards",
      "Human-reviewed AI summaries and communication drafts",
    ],
    techStack: [
      { label: "Stack", items: "React, Next.js, PostgreSQL, OpenSearch, AI Matching, Vector Search, AWS/Azure" },
    ],
    impactIntro:
      "The platform transformed disconnected applications into a searchable talent pipeline — helping recruiters prioritise suitable candidates, rediscover previous applicants, and manage high-volume hiring without removing human control from selection decisions.",
    impactPoints: [],
    metrics: [],
  },
  {
    slug: "luxury-furniture-ecommerce",
    bannerImages: [
      "/images/case-studies/banner/furniture-banner-1.webp",
      "/images/case-studies/banner/furniture-banner-2.webp",
      "/images/case-studies/banner/furniture-banner-3.webp",
    ],
    title: "From Product Page to Personal Interior: An Immersive Shopify Experience",
    tags: ["E-Commerce & Retail"],
    blurb:
      "An AI-powered \"View in Your Room\" experience for a luxury furniture retailer, letting buyers visualise pieces in their own space before checkout.",
    status: "delivered",
    region: "Canada",
    overview:
      "A luxury furniture retailer needed to give online buyers greater confidence when purchasing high-value pieces — helping them understand craftsmanship, explore every detail, and visualise products within their own interiors.",
    challenge:
      "High-value furniture is a considered purchase; static product photos alone weren't enough to give buyers confidence before checkout.",
    solutionIntro: "Penaxis built:",
    solutionPoints: [
      "A premium, mobile-responsive Shopify storefront",
      "Curated collections with detailed materials, dimensions, and finishes",
      "Interactive 360° product exploration",
      "An AI-powered \"View in Your Room\" experience",
      "Customer room-image uploads with realistic product placement",
      "Saved visualisations connected directly with checkout",
      "Bespoke-product and white-glove delivery enquiries",
    ],
    techStack: [
      { label: "Stack", items: "Shopify, Liquid, JavaScript, WebGL, Three.js, Computer Vision, AI Image Processing" },
    ],
    impactIntro:
      "The platform transformed conventional product browsing into a personalised interior-design journey — allowing customers to inspect, visualise, and purchase luxury furniture through one immersive experience.",
    impactPoints: [],
    metrics: [],
  },
];

// Dubai and Jordan addresses are placeholders (confirmed with the client
// as OK to ship for now) — swap for the real registered addresses when
// available. Pakistan uses the real, confirmed office address above.

export const caseStudyGradients = [
  "linear-gradient(150deg, #734FA0, #2a1d43)",
  "linear-gradient(150deg, #FC6607, #a83e00)",
  "linear-gradient(150deg, #FC6607, #7c8f1c)",
  "linear-gradient(150deg, #8a6fc4, #212121)",
];

export const offices = [
  {
    country: "Pakistan",
    city: "Lahore",
    address: "2nd floor, 3-P, DHA Rahbar, Lahore, Pakistan, 54000",
    blurb: "Our head office — strategy, delivery, and engineering all under one roof.",
    theme: "violet",
  },
  {
    country: "UAE",
    city: "Dubai",
    address: "Business Bay, Dubai, United Arab Emirates",
    blurb: "Our regional hub for client partnerships across the Gulf.",
    theme: "ember",
  },
  {
    country: "Jordan",
    city: "Amman",
    address: "Abdali Boulevard, Amman, Jordan",
    blurb: "Our newest base, extending delivery across the Levant.",
    theme: "ink",
  },
];
