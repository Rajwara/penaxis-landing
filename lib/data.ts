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
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
];

// Right navigation capsule — About (quiet, with a small hover dropdown for
// the two About-style pages) + Start a Project (primary CTA)
export const navRight = [
  {
    label: "About",
    href: "/who-we-are",
    children: [
      { label: "Who We Are", href: "/who-we-are" },
      { label: "Game Changers", href: "/game-changers" },
      { label: "FAQs", href: "/faqs" },
      { label: "Careers", href: "/careers" },
    ],
  },
];

export const navCta = { label: "Contact Us", href: "/contact-us" };

// Kept for mobile full-screen menu — same destinations plus Team,
// per the spec's note that Team/Insights stay out of primary desktop nav for now
export const navMobile = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Game Changers", href: "/game-changers" },
  { label: "Who We Are", href: "/who-we-are" },
  { label: "FAQs", href: "/faqs" },
  { label: "Careers", href: "/careers" },
  { label: "Our Team", href: "#team" },
];

export const stats = [
  { value: "5", suffix: " Days", prefix: "", label: "Average MVP launch timeline" },
  { value: "4", suffix: " Core Verticals", prefix: "", label: "Strategy, Design, Technology, Growth" },
  { value: "12", suffix: "+", prefix: "", label: "Industries Served" },
  { value: "100", suffix: "%", prefix: "", label: "Milestones delivered on time" },
  { value: "50", suffix: "+", prefix: "", label: "Websites, platforms, or CRMs launched" },
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
  { period: "Q2 2025", value: 6, image: "/images/who-we-are/momentum-q2-2025.webp" },
  { period: "Q3 2025", value: 13, image: "/images/who-we-are/momentum-q3-2025.webp" },
  { period: "Q4 2025", value: 17 },
  { period: "Q1 2026", value: 22, image: "/images/who-we-are/momentum-q1-2026.webp" },
  { period: "Q2 2026", value: 28, image: "/images/who-we-are/momentum-q2-2026.webp" },
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
  {
    title: "Software, IT & SaaS",
    copy: "Custom software, SaaS platforms and IT solutions for enterprises and startups.",
    challenge:
      "Most SaaS products live or die on how fast they can ship without breaking what already works. Early-stage teams often carry technical debt from a rushed MVP, while growing platforms struggle to add enterprise features - SSO, audit logs, granular permissions - without a rewrite. Integrating with the dozen other tools a B2B buyer already uses adds another layer of complexity most roadmaps underestimate.",
    outcomes: [
      "A product architecture that can absorb new features without a rewrite",
      "Integrations that connect cleanly with the tools your buyers already use",
      "AI features scoped to solve a real workflow problem, not bolted on for a pitch deck",
    ],
    image: "/images/industries/software-it-and-saas.webp",
    solutions: [
      "Custom SaaS platforms built around how your product actually works, not a generic template",
      "API integrations and internal tools that connect the systems your team already relies on",
      "AI-assisted features - search, matching, summarization - built into your existing product",
    ],
  },
  {
    title: "Education & EdTech",
    copy: "E-learning platforms, student portals, and digital learning solutions.",
    challenge:
      "EdTech has to work for very different users at once - students who expect something as simple as a consumer app, instructors who need real control over content and grading, and administrators who need enrollment and compliance data to be accurate. Tools built for one of these groups usually frustrate the other two.",
    outcomes: [
      "Interfaces simple enough for every grade level and tech comfort level",
      "Instructor tools that don't require a training session to use",
      "Enrollment and attendance data admins can actually trust",
    ],
    image: "/images/industries/education-and-edtech.webp",
    solutions: [
      "Student and learning management portals that stay simple enough for every grade level to use",
      "Virtual classroom and course delivery tools built around how your instructors actually teach",
      "Enrollment, attendance, and admin systems that cut manual paperwork for staff",
    ],
  },
  {
    title: "Automotive & Auto Care",
    copy: "Platforms for dealerships, auto care, repair shops, and fleet management.",
    challenge:
      "Buyers expect to search and compare vehicles the way they shop for anything else online, while the businesses behind them are often still running bookings, inventory, and service bays on a mix of spreadsheets and disconnected software. The gap between a modern buying experience and the operations behind it is where most automotive platforms fall short.",
    outcomes: [
      "Search and discovery that matches how buyers actually decide",
      "Booking and workshop systems that cut down double-entry between tools",
      "Inventory visibility that keeps service bays and showrooms in sync",
    ],
    image: "/images/industries/automotive-and-auto-care.webp",
    solutions: [
      "AI-powered vehicle search and listing platforms that help buyers find the right match faster",
      "Booking and workshop management systems for repair shops, dealerships, and fleet operators",
      "Inventory and parts-tracking tools that keep service bays and showrooms running on time",
    ],
  },
  {
    title: "Home Services & Maintenance",
    copy: "Platforms for on-demand home services, bookings, and field management.",
    challenge:
      "On-demand home service businesses win or lose on response time and trust - a customer wants to book in a couple of taps and know roughly when someone will show up. Behind the scenes, that means dispatch, routing, and real-time technician status all have to work together, which is where most off-the-shelf booking tools stop short.",
    outcomes: [
      "Booking flows short enough that customers actually finish them",
      "Dispatch and routing that keeps technicians' schedules realistic",
      "Status updates that cut down on \"where's my technician\" calls",
    ],
    image: "/images/industries/home-services-and-maintenance.webp",
    solutions: [
      "On-demand booking platforms that let customers schedule service in a couple of taps",
      "Field-team dispatch and scheduling tools that keep technicians routed efficiently",
      "Delivery and pickup tracking so customers always know where their order stands",
    ],
  },
  {
    title: "Logistics & Transportation",
    copy: "Solutions for fleet tracking, freight management, and transport companies.",
    challenge:
      "Fleet and freight operations depend on visibility - knowing where every vehicle and shipment is right now, not in yesterday's report. Many operators are still piecing that picture together from GPS units, paper manifests, and phone calls between dispatch and drivers, which makes it hard to catch delays before a customer does.",
    outcomes: [
      "Real-time fleet visibility dispatch can actually act on",
      "Shipment tracking that replaces manual status-chasing",
      "Route and driver tools that bring down fuel and idle time",
    ],
    image: "/images/industries/logistics-and-transportation.webp",
    solutions: [
      "Fleet tracking and dispatch platforms built for real-time visibility across every vehicle",
      "Freight and shipment management systems that cut manual coordination between teams",
      "Driver and route optimization tools that bring down fuel and time costs",
    ],
  },
  {
    title: "Consulting, Staffing & Immigration",
    copy: "Solutions for consulting firms, staffing agencies, and immigration services.",
    challenge:
      "Recruiters, consultants, and immigration teams all run on the same raw material - candidate and case data - but it usually arrives as scattered resumes, email threads, and spreadsheets. Without a system that can search and structure that information, good candidates and case history get lost, and teams end up redoing work that's already been done once.",
    outcomes: [
      "A searchable, reusable pipeline instead of scattered resumes and threads",
      "Case and document tracking built for compliance-heavy workflows",
      "Pipelines every stakeholder can see without a status-update meeting",
    ],
    image: "/images/industries/consulting-staffing-and-immigration.webp",
    solutions: [
      "Applicant tracking and recruitment CRMs with AI-assisted candidate matching",
      "Case and document management systems built for immigration and consulting workflows",
      "Client and vacancy pipelines that keep every stakeholder working from the same data",
    ],
  },
  {
    title: "E-Commerce & Retail",
    copy: "Scalable platforms for online stores, marketplaces, and omnichannel retail.",
    challenge:
      "Template storefronts get a store live fast, but they flatten every brand into the same layout and checkout flow. As a retailer grows, that sameness becomes a ceiling - on how products are presented, how inventory syncs across channels, and how much of the buying decision can happen before checkout.",
    outcomes: [
      "A storefront that looks and feels like the brand, not a template",
      "Product experiences that help buyers decide faster",
      "Inventory and orders that stay in sync across every channel",
    ],
    image: "/images/industries/e-commerce-and-retail.webp",
    solutions: [
      "Custom storefronts and headless commerce builds that scale past what templates allow",
      "Immersive product experiences - configurators, AR previews - that help buyers decide faster",
      "Omnichannel inventory and order systems that keep online and in-store stock in sync",
    ],
  },
  {
    title: "Sports & Fitness",
    copy: "Apps and platforms for gyms, fitness, training, and sports communities.",
    challenge:
      "Gyms, studios, and sports communities often manage memberships, class schedules, and performance data across tools that don't talk to each other, which makes it hard to see what's actually keeping members engaged versus what's quietly driving them to cancel.",
    outcomes: [
      "Membership and scheduling in one place instead of three tools",
      "Community and training features built for how athletes actually train",
      "Performance data members and coaches can actually use",
    ],
    image: "/images/industries/sports-and-fitness.webp",
    solutions: [
      "Training, route, and community platforms built for athletes and the clubs around them",
      "Membership, booking, and class-scheduling systems for gyms and studios",
      "Performance tracking tools that turn activity data into something members actually use",
    ],
  },
  {
    title: "Food Delivery & Grocery",
    copy: "Apps and platforms for food delivery, grocery and quick commerce.",
    challenge:
      "Delivery and quick-commerce businesses compete on speed and accuracy, but both depend on real-time inventory and realistic delivery windows - two things that are hard to guarantee when stock levels and driver availability are changing by the minute.",
    outcomes: [
      "Ordering flows built around real-world delivery logistics",
      "Inventory accuracy that holds up even as stock moves fast",
      "Delivery windows that are realistic, not just optimistic",
    ],
    image: "/images/industries/food-delivery-and-grocery.webp",
    solutions: [
      "Ordering and delivery platforms built for real-world logistics, not just a checkout flow",
      "Quick-commerce inventory systems that keep availability accurate as stock moves fast",
      "Driver and dispatch tools that keep delivery windows realistic and on time",
    ],
  },
  {
    title: "Real Estate & Property",
    copy: "Digital solutions for property marketplaces, brokers, and property management.",
    challenge:
      "Property platforms have to serve very different audiences at once - buyers browsing listings, brokers managing deals, and property managers handling maintenance requests - and most generic CRMs or listing tools only do one of those three well.",
    outcomes: [
      "Listing and search experiences built around how buyers actually browse",
      "Broker CRMs that keep leads, listings, and deals in one view",
      "Maintenance and tenant communication that doesn't rely on phone calls",
    ],
    image: "/images/industries/real-estate-and-property.webp",
    solutions: [
      "Property marketplaces and listing platforms built around how buyers actually search",
      "Broker and agency CRMs that keep leads, listings, and deals in one place",
      "Property management portals for landlords, tenants, and maintenance requests",
    ],
  },
  {
    title: "Fintech & Financial Services",
    copy: "Secure solutions for banking, payments, lending, and wealth management.",
    challenge:
      "Financial products carry a different bar than most software - every workflow has to hold up under compliance requirements, and every integration touches money, which raises the cost of getting it wrong. That combination is why fintech builds tend to need more rigor than a typical product, not just more features.",
    outcomes: [
      "Payment and lending workflows built to your actual compliance requirements",
      "Dashboards that turn transaction data into decisions, not just reports",
      "Banking and payment integrations built with security as a first requirement, not an afterthought",
    ],
    image: "/images/industries/fintech-and-financial-services.webp",
    solutions: [
      "Secure, compliant platforms for payments, lending, and digital banking workflows",
      "Dashboards that turn transaction and account data into something a team can act on",
      "Integrations with banking rails and payment providers, built to your compliance requirements",
    ],
  },
  {
    title: "Healthcare & Wellness",
    copy: "Clinics, practices, gyms, wellness centers, and healthcare service providers.",
    challenge:
      "Clinics and wellness providers need software that fits around real clinical and administrative workflows, not the other way around, while still protecting patient data to the standard healthcare requires. Generic scheduling or CRM tools rarely hold up to both requirements at once.",
    outcomes: [
      "Clinic and patient-care tools built around real clinical workflows",
      "Telehealth and intake flows that cut administrative load, not add to it",
      "Patient data handled to the standard healthcare actually requires",
    ],
    image: "/images/industries/healthcare-and-wellness.webp",
    solutions: [
      "Patient care and clinic management platforms built around real clinical workflows",
      "Telehealth and intake systems that cut administrative load for staff",
      "Secure records and scheduling tools that keep patient data compliant and accessible",
    ],
  },
  {
    title: "Pet Care & Veterinary",
    copy: "Digital tools for veterinary clinics and pet care businesses.",
    challenge:
      "Veterinary clinics and pet care businesses run on relationships as much as appointments - owners expect reminders, clear records, and easy booking, while staff need patient history on hand during every visit. Generic scheduling tools rarely capture either side of that well.",
    outcomes: [
      "Patient records and appointment history in one place for staff",
      "Reminders and follow-ups that cut down on no-shows",
      "Booking flows simple enough for pet owners to use without a call",
    ],
    image: "/images/industries/pet-care-and-veterinary.webp",
    solutions: [
      "Appointment and patient-record systems built for veterinary clinics and pet care businesses",
      "Client communication tools - reminders, records, follow-ups - that cut no-shows",
      "Booking platforms for grooming, boarding, and other pet care services",
    ],
  },
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
  { name: "Muhammad Akram", role: "Co-Founder & COO", image: "/images/team/muhammad-akram.webp", linkedin: "https://www.linkedin.com/in/muhammadakram12", bio: "Leads strategy and operations behind every successful project." },
  { name: "Sopio Pipia", role: "Business Partner", image: "/images/team/sopio-pipia.webp", linkedin: "https://www.linkedin.com/in/sopio-pipia", bio: "Builds partnerships and growth opportunities across every market." },
  { name: "Alishba Arshad", role: "Human Resources", image: "/images/team/alishba-arshad.webp", bio: "Supports people, culture, and processes that keep the team moving." },
  { name: "Fizza Shahzad", role: "Creative & Brand Lead", image: "/images/team/fizza-shahzad.webp", bio: "Creates content that gets people talking." },
  { name: "Hamza Durrani", role: "Business Development Manager", image: "/images/team/hamza-durrani.webp", bio: "Drives new business and keeps the pipeline moving." },
  { name: "Laiba Zafar", role: "Social Media Coordinator", image: "/images/team/laiba-zafar.webp", bio: "Shapes our voice and presence across every platform." },
  { name: "Mutahar Murtaza", role: "Senior Salesforce Developer" },
  { name: "Zaid Bin Arif", role: "Business Analyst", image: "/images/team/zaid-bin-arif.webp", bio: "Connects with prospects and turns conversations into deals." },
  { name: "Sitara Tahir", role: "Project Manager" },
  { name: "Abdullah Sadiq", role: "Outbound Growth Specialist", image: "/images/team/abdullah-sadiq.webp", bio: "Opens doors and builds relationships that turn into partnerships." },
  { name: "Maleeha Farooq", role: "Marketing Associate", image: "/images/team/maleeha-farooq.webp", bio: "Keeps our social channels active, engaging, and on-brand." },
  { name: "Adnan Farooq", role: "Business Operations & Accounts Executive", image: "/images/team/adnan-farooq.webp", bio: "Keeps the books balanced and operations running without friction." },
  { name: "Maham Aziz", role: "HR Manager" },
  { name: "Saad Sultan", role: "Lead CRM & Automation Engineer", image: "/images/team/saad-sultan.webp", bio: "Builds the CRM and automation systems that keep everything connected." },
  { name: "Hamza Khan", role: "Motion Graphics Designer", image: "/images/team/hamza-khan.webp", bio: "Turns ideas into clean, thoughtful visuals." },
  { name: "Ali Raza", role: "Sales Development Representative", image: "/images/team/ali-raza.webp", bio: "Builds relationships that grow into long-term partnerships." },
  { name: "Musahb Ali", role: "Data Strategy Specialist", image: "/images/team/musahb-ali.webp", bio: "Turns raw data into clear, actionable strategy." },
  { name: "Asad Saleem Farooq", role: "Regional Growth Partner - North America", image: "/images/team/asad-saleem-farooq.webp", bio: "Grows Penaxis's presence and partnerships across North America." },
  { name: "Fraz Bin Arif", role: "Regional Growth Partner - Western Europe" },
  { name: "Ahmad Raza", role: "CMS and Web Solutions Expert", image: "/images/team/ahmad-raza.webp", bio: "Builds and maintains CMS-powered websites and web solutions for clients." },
  { name: "Hamza Shabbir", role: "Business Development Representative", image: "/images/team/hamza-shabbir.webp", bio: "Opens conversations that turn into new business." },
  { name: "Muhammad Yousaf", role: "Project Manager" },
  { name: "Muhammad Saad Salman", role: "CMS Developer", image: "/images/team/muhammad-saad-salman.webp", bio: "Builds and maintains the CMS-powered sites and platforms our clients run on." },
  { name: "Raza Hamid", role: "Business Development Executive" },
  { name: "Khubaib Malik", role: "Client Success Manager" },
  { name: "Umer Faraz", role: "Regional Sales Manager", image: "/images/team/umer-faraz.webp", bio: "Drives regional sales strategy and keeps the pipeline moving forward." },
  { name: "Sumaira Hussain", role: "HR Operations Executive", image: "/images/team/sumaira-hussain.webp", bio: "Keeps HR operations running smoothly for the whole team." },
  { name: "Abdul Ahad", role: "Performance Marketing", image: "/images/team/abdul-ahad.webp", bio: "Runs the paid campaigns that keep qualified leads coming in." },
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
// unbuilt work as an achieved result. The first 5 (logistics platform, AI
// receptionist kiosk, tender intelligence platform, cycling platform, hotel
// booking platform) now have real
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
    title: "Integrated Digital Logistics & Fleet Management Ecosystem",
    tags: ["Logistics & Transportation"],
    blurb:
      "Four connected apps - customer, driver, dispatch, and corporate site - replacing fragmented workflows with one on-demand logistics experience.",
    status: "delivered",
    region: "Gulf Region",
    overview:
      "A Gulf-based logistics company needed a unified digital ecosystem to replace fragmented workflows, manual driver coordination, and limited delivery visibility.",
    challenge:
      "The goal was an on-demand logistics experience - similar to ride-hailing platforms, but purpose-built for commercial freight operations.",
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
      "A proposed, school-safe AI reception kiosk - multilingual visitor sign-in, translation, and a controlled FAQ assistant, designed to scale beyond schools.",
    status: "concept",
    region: "Multi-Market",
    overview:
      "An education technology entrepreneur needed a scalable self-service reception platform for schools, with future applications across hospitals, hotels, malls, and other visitor-heavy environments.",
    challenge:
      "The goal was to reduce repetitive front-desk work, overcome language barriers, and centralize visitor activity - without exposing users to unrestricted AI responses or unpredictable token-based costs.",
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
      "The configuration-driven architecture would let the same platform be adapted for additional schools and industries without rebuilding the core product. Phase 1 retrieves only school-approved answers - no GPT or other generative LLM sits in the live response path.",
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
      { value: "2-4 Week", label: "Replication Time" },
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
    title: "AI-Powered Bidding & Tender Intelligence Platform",
    tags: ["Software, IT & SaaS"],
    blurb:
      "A proposed AI-first workspace for the full pre-award bidding lifecycle - tender discovery, explainable fit-scoring, and RAG-powered proposal drafting.",
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
    title: "Membership-Driven Cycling Community & Race Management Platform",
    tags: ["Sports & Fitness"],
    blurb:
      "A CMS-powered community hub for a gravel cycling organisation - rider profiles, race archives, paid memberships, and a gear marketplace in one place.",
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
    tags: ["Software, IT & SaaS", "Real Estate & Property"],
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
    title: "The Plate Agent - AI-Powered Private Registration Marketplace & Valuation Engine",
    tags: ["Automotive & Auto Care", "Fintech & Financial Services"],
    blurb:
      "A premium UK plate marketplace pairing searchable inventory with an AI-assisted valuation engine that turns vague buyer requests into qualified leads.",
    status: "delivered",
    region: "United Kingdom",
    overview:
      "A UK private registration dealer needed more than a conventional inventory website. The business needed to showcase plates already available for resale while capturing demand from buyers searching for registrations not currently held in stock.",
    challenge:
      "The goal was to turn open-ended buyer preferences into structured, commercially qualified enquiries - while giving customers immediate, indicative pricing guidance.",
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
      "The goal was to digitise the complete service lifecycle - from requesting a pickup and processing payment to cleaning-facility handover and final doorstep return.",
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
    title: "Digitising a Qatar-Based Cybersecurity Company - Inside and Out",
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
      "Enterprise Cybersecurity Website - cybersecurity and IT security solutions, risk management and security consulting, network and infrastructure security, cloud security, digital transformation services, enterprise technology consulting, managed IT services, and conversion-focused enquiry journeys",
      "Custom HR Operations ERP - employee profiles and centralised records, departments/roles/reporting structures, attendance and working-hour tracking, check-in/check-out management, leave balances/applications/approvals, payroll records and salary slips, employee documents and contracts, performance and increment history, birthdays and work anniversaries, internal announcements, employee self-service, HR reporting dashboards, and role-based access",
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
      "A buyer could ask something like \"Find a fuel-efficient seven-seat SUV under $35,000 near Austin,\" and the assistant would convert that into relevant inventory criteria and return matching vehicles - no need to configure numerous technical filters. Once a suitable vehicle was identified, the assistant guided the user toward the right next step: requesting more information, contacting the dealership, booking a viewing, scheduling a test drive, or submitting a financing enquiry.",
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
      "A multi-clinic healthcare provider needed one secure platform to connect patients, practitioners, appointments, and clinical records - replacing fragmented administrative processes.",
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
      "The platform created a connected patient journey from appointment booking and pre-visit assessment through consultation, medication guidance, and follow-up care - while helping practitioners access the right clinical information from one system.",
    impactPoints: [],
    metrics: [],
  },
  {
    slug: "recruitment-talent-platform",
    gridImage: "/images/case-studies/grid/recruitment-talent-platform-grid.webp",
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
      "The goal was to help recruiters prioritise suitable candidates, rediscover previous applicants, and manage high-volume hiring - without removing human control from selection decisions.",
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
      "The platform transformed disconnected applications into a searchable talent pipeline - helping recruiters prioritise suitable candidates, rediscover previous applicants, and manage high-volume hiring without removing human control from selection decisions.",
    impactPoints: [],
    metrics: [],
  },
  {
    slug: "luxury-furniture-ecommerce",
    gridImage: "/images/case-studies/grid/luxury-furniture-ecommerce-grid.webp",
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
      "A luxury furniture retailer needed to give online buyers greater confidence when purchasing high-value pieces - helping them understand craftsmanship, explore every detail, and visualise products within their own interiors.",
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
      "The platform transformed conventional product browsing into a personalised interior-design journey - allowing customers to inspect, visualise, and purchase luxury furniture through one immersive experience.",
    impactPoints: [],
    metrics: [],
  },
];

// Jordan office closed. Pakistan and Dubai both use the real, confirmed
// office addresses.

export const caseStudyGradients = [
  "linear-gradient(150deg, #734FA0, #2a1d43)",
  "linear-gradient(150deg, #FC6607, #a83e00)",
  "linear-gradient(150deg, #FC6607, #7c8f1c)",
  "linear-gradient(150deg, #8a6fc4, #212121)",
];

// Insights — Penaxis's own editorial content (not client case studies).
// Ordered newest first; the homepage teaser shows insights.slice(0, 3).
export const insights = [
  {
    slug: "5-day-mvp-sprint-startup-validation",
    category: "AI & MVP Development",
    title: "How to Validate a Startup Idea With a 5-Day MVP Sprint",
    excerpt:
      "Most founders don't need six months and a six-figure budget to find out if an idea works. Here's how a tightly scoped MVP sprint gets you a real answer in days, not quarters.",
    image: "/images/services/ai-mvp-about.webp",
    date: "2026-11-18",
    readTime: "6 min read",
    body: [
      { type: "p", text: "The most expensive mistake a founder can make isn't building the wrong product - it's spending too long finding out. Every extra week spent polishing a feature nobody has validated is a week not spent learning whether the idea works at all." },
      { type: "h3", text: "Scope the smallest version that answers the real question" },
      { type: "p", text: "A real MVP isn't a stripped-down version of the full product - it's the smallest thing you can put in front of a user that tests your riskiest assumption. Before any design or code work starts, we ask one question with the client: what's the single belief that, if wrong, kills this idea? Everything else gets cut until that question is the only thing left to answer." },
      { type: "p", text: "That discipline is what makes a five-day timeline realistic. It's not about working faster on the same scope - it's about refusing to build anything that doesn't move the validation forward." },
      { type: "h3", text: "What actually fits in five days" },
      { type: "p", text: "In practice, that's usually one core user flow, a real (not mocked) data model behind it, and just enough interface polish that a user's reaction reflects the idea and not the rough edges. We lean on AI-assisted development to compress the parts of the build that are mechanical - scaffolding, boilerplate, integrations - so the team's time goes into the handful of decisions that actually matter." },
      { type: "p", text: "It's also why this works best as a sprint, not a drawn-out engagement: a small, focused team moving continuously for five days ships more coherent software than a larger team context-switching across a month." },
      { type: "p", text: "If you're sitting on an idea and trying to decide whether it deserves real investment, the fastest way to find out is usually to build the smallest version of it - not to keep debating it in a deck." },
    ],
  },
  {
    slug: "bespoke-vs-off-the-shelf-software",
    category: "Digital Transformation",
    title: "Bespoke Software vs. Off-the-Shelf Tools: How to Choose",
    excerpt:
      "Off-the-shelf tools get you moving fast, but they can start working against you the moment your process doesn't fit their defaults. Here's a practical way to decide which path makes sense.",
    image: "/images/insights/bespoke-vs-off-the-shelf-software.webp",
    date: "2026-11-11",
    readTime: "7 min read",
    body: [
      { type: "p", text: "Almost every business starts with off-the-shelf software, and for good reason - it's cheap, it's fast to set up, and it covers the basics well. The decision to build something custom usually isn't about wanting bespoke software for its own sake. It's about the point where the tool you have starts shaping your process instead of supporting it." },
      { type: "h3", text: "The signs it's time to look at a custom build" },
      { type: "p", text: "The pattern we see most often across industries: a team has built a web of spreadsheets, automations, and workarounds just to make an off-the-shelf tool do something close to what the business actually needs. Each workaround looks small on its own, but together they become a second, unofficial system that someone has to maintain by hand - and that nobody fully understands." },
      { type: "p", text: "Other common signals: paying for seats or modules you don't use just to get the one feature you do need, hitting a hard ceiling on customization, or finding that your core workflow is the exception the software wasn't built for." },
      { type: "h3", text: "Bespoke isn't automatically the right answer" },
      { type: "p", text: "Custom software is an investment, and it only pays off when the process being built is actually core to how the business creates value. If the workflow in question is generic - invoicing, basic scheduling, standard support tickets - an off-the-shelf tool will almost always be the more sensible choice, custom or not." },
      { type: "p", text: "The honest version of this conversation, which is the one we have with every client before scoping anything, starts with mapping the real workflow end to end and being clear about which parts are genuinely differentiated and which parts are just operations. That's what decides the build, not a preference for custom software in general." },
    ],
  },
  {
    slug: "lessons-from-shipping-50-plus-products",
    category: "Engineering",
    title: "What We've Learned Shipping 50+ Products: Lessons From Our Engineering Team",
    excerpt:
      "Patterns repeat across client work more than you'd expect. Here are the habits that consistently separate projects that ship on time from the ones that drift.",
    image: "/images/insights/lessons-from-shipping-50-plus-products.webp",
    date: "2026-11-04",
    readTime: "6 min read",
    body: [
      { type: "p", text: "After enough projects, the specific industry or feature set starts to matter less than you'd think when it comes to predicting whether a build stays on track. The patterns that separate a smooth delivery from a drifting one are remarkably consistent, and most of them have nothing to do with how good the engineers are." },
      { type: "h3", text: "Scope creep is a communication failure, not a client problem" },
      { type: "p", text: "Every project that's drifted that we've been part of has one thing in common: a decision got made in a conversation that never made it back into the written scope. Not because anyone was being difficult - because it felt too small to formalize at the time. The fix isn't stricter contracts, it's writing decisions down the same day they're made, in plain language the client actually reads." },
      { type: "h3", text: "The best engineers ask about business goals before touching the editor" },
      { type: "p", text: "A feature built to the literal spec and a feature built to the actual goal behind the spec can look identical in a planning doc and be completely different in practice. The habit we push hardest on internally is for engineers to understand why a feature matters before they start building it - because that's what lets them flag a better, cheaper, or faster approach before the work is already done." },
      { type: "p", text: "None of this is complicated advice. It's just consistently hard to do under deadline pressure, which is exactly why so few teams actually do it well." },
    ],
  },
  {
    slug: "case-studies-into-pipeline-content-that-sells",
    category: "Growth",
    title: "Turning Case Studies Into Pipeline: A Practical Guide",
    excerpt:
      "A case study that only lives on your website isn't doing its job. Here's how to structure, publish, and reuse your proof of work so it actually generates conversations.",
    image: "/images/insights/case-studies-into-pipeline-content-that-sells.webp",
    date: "2026-10-28",
    readTime: "5 min read",
    body: [
      { type: "p", text: "Most case studies are written once, published, and then forgotten - a single page that occasionally gets a visit from someone who was already close to buying. That's a huge amount of real proof sitting idle. A case study's actual job is to do the convincing for you in every channel where a prospect might encounter it, not just the one page it lives on." },
      { type: "h3", text: "Write it backwards from the objection it needs to overcome" },
      { type: "p", text: "The strongest case studies aren't written chronologically. They're written starting from the specific doubt a prospect has - can this team handle our industry's compliance requirements, can they move fast enough, will this actually integrate with what we already have - and then structured to answer that doubt directly, with the project as the evidence." },
      { type: "h3", text: "One case study, five pieces of content" },
      { type: "p", text: "A well-built case study should be able to become a sales deck slide, a LinkedIn post from the founder, an answer in a discovery call, a line in a proposal, and a page on the site - without rewriting it each time. That reuse is what actually moves it from \"nice portfolio piece\" to pipeline-generating asset." },
      { type: "p", text: "If you're sitting on strong delivered work that hasn't been turned into a case study yet, that's usually the highest-leverage content gap to close first - it's proof you already have, just not yet in a form that sells." },
    ],
  },
  {
    slug: "how-engineering-teams-stay-current",
    category: "Engineering",
    title: "How Software Teams Stay Up to Date Without Chasing Every Trend",
    excerpt:
      "New frameworks and AI tools show up every month. Here's the filter we use internally to decide what's actually worth adopting, and what's just noise.",
    image: "/images/insights/how-engineering-teams-stay-current.webp",
    date: "2026-10-21",
    readTime: "6 min read",
    body: [
      { type: "p", text: "The pace of new tools and frameworks in software right now makes it easy to feel like you're always behind. The teams that actually stay current aren't the ones trying every new release - they're the ones with a clear filter for what's worth their attention and what isn't." },
      { type: "h3", text: "Adopt for a real problem, not for the resume line" },
      { type: "p", text: "Our rule internally is simple: a new tool earns a place on a client project when it solves a problem we're actually hitting, not because it's trending. That keeps the stack boring in the right places - the parts that need to be stable - and current where it actually moves delivery forward, like AI-assisted coding, which has measurably cut the time it takes us to turn a validated idea into a working build." },
      { type: "h3", text: "Build in time to evaluate, separate from client work" },
      { type: "p", text: "The teams that fall behind are usually the ones with zero slack to explore anything - every hour is billed to a client deliverable, so nothing new ever gets a fair evaluation. We protect a small, recurring block of time explicitly for the team to try new tools against real (but non-critical) problems, so that by the time something is genuinely useful, we already know how it behaves." },
      { type: "p", text: "Staying current isn't about knowing the most tools. It's about having already done the filtering by the time a client needs an answer." },
    ],
  },
  {
    slug: "crm-migration-checklist",
    category: "Digital Transformation",
    title: "CRM Migration Checklist: Moving Off Spreadsheets Without Losing Data",
    excerpt:
      "Spreadsheet CRMs break down quietly, long before anyone notices. This is the checklist we run with clients before, during, and after a migration.",
    image: "/images/insights/crm-migration-checklist.webp",
    date: "2026-10-14",
    readTime: "7 min read",
    body: [
      { type: "p", text: "A spreadsheet CRM doesn't fail loudly. It fails quietly - a lead falls through a tab nobody checks, two reps work the same contact without knowing it, a note from a call three months ago never makes it into the record. By the time the business feels the pain clearly enough to act, there's usually a surprising amount of data riding on a system nobody fully trusts anymore." },
      { type: "h3", text: "Before: audit what you actually have" },
      { type: "p", text: "The step most migrations skip is a proper audit of the existing data - duplicate contacts, inconsistent field names across different team members' copies, notes buried in free-text fields that need to become structured data. Skipping this step is how a clean new CRM ends up just as messy as the old one, six months later." },
      { type: "h3", text: "During: migrate in stages, not all at once" },
      { type: "p", text: "We run migrations in stages: contacts and companies first, verified against the original source, then deal history, then automations and integrations last - once the team has already started trusting the new system with live data. A single big-bang cutover is where most of the horror stories come from." },
      { type: "h3", text: "After: give the team a reason to actually use it" },
      { type: "p", text: "A migration only succeeds if the team adopts the new system, and adoption usually comes down to whether it's actually faster for their daily work than the old habit was - not whether it has more features. That's the part worth spending the most design time on, and it's the part that gets rushed most often." },
    ],
  },
];

// Real, confirmed client/partner logos shown in the "Featured in" marquee
// (components/HorizontalGallery.tsx and components/FeaturedLogos.tsx).
export const pressLogos = [
  { src: "/images/press/meerab-properties.webp", alt: "Meerab Properties" },
  { src: "/images/press/meerab.webp", alt: "Meerab" },
  { src: "/images/press/devmindz.png", alt: "DevMindz" },
  { src: "/images/press/bidmore.webp", alt: "BidMore" },
  { src: "/images/press/seka.webp", alt: "Seka" },
  { src: "/images/press/qovex-studio.webp", alt: "Qovex Studio" },
  { src: "/images/press/the-plate-agent.webp", alt: "The Plate Agent" },
  { src: "/images/press/orbital.webp", alt: "Orbital Installation Technologies" },
  { src: "/images/press/oktabytes.webp", alt: "OktaBytes" },
  { src: "/images/press/nas-enterprises.webp", alt: "NAS Enterprises" },
  { src: "/images/press/hyatt-regency.webp", alt: "Hyatt Regency" },
  { src: "/images/press/ahmed-dairy-farm.webp", alt: "Ahmed Dairy Farm" },
  { src: "/images/press/aleafiate-health-clinics.webp", alt: "Aleafiate Health Clinics" },
  { src: "/images/press/pharmacrop.webp", alt: "PharmaCrop" },
];

export const offices = [
  {
    country: "Pakistan",
    city: "Lahore",
    address: "2nd floor, 3-P, DHA Rahbar, Lahore, Pakistan, 54000",
    blurb: "Our head office - strategy, delivery, and engineering all under one roof.",
    theme: "violet",
  },
  {
    country: "UAE",
    city: "Dubai",
    address: "Leaders Building - Office No. 1 - 409 Sheikh Zayed Rd - Al Qouz First - Al Quoz - Dubai - United Arab Emirates",
    blurb: "Our regional hub for client partnerships across the Gulf.",
    theme: "ember",
  },
];

// Careers — real current openings, condensed from the postings the team
// runs on LinkedIn (salary figures intentionally left out; candidates state
// their own expectations when applying instead).
export const careers = [
  {
    slug: "graphic-motion-designer",
    title: "Graphic & Motion Designer",
    department: "Creative",
    location: "DHA Rahbar, Lahore",
    type: "Full-time, on-site",
    experience: "3+ years",
    summary: "A creative, detail-oriented designer who can bring strong visual ideas to life through both graphic design and motion.",
    requirements: [
      "At least 3 years of professional design experience",
      "Proficiency in Adobe Illustrator, Photoshop, and After Effects - confident with both static and motion design, not just one",
      "AI-savvy is a plus: experience with Higgsfield, Claude Design, or similar AI-powered creative tools",
      "Immediate joiners preferred",
    ],
  },
  {
    slug: "seo-performance-marketing-lead",
    title: "SEO & Performance Marketing Lead",
    department: "Marketing",
    location: "DHA Rahbar, Lahore",
    type: "Full-time, on-site - Mon-Fri, 10 AM-7 PM",
    experience: "4+ years",
    summary: "An experienced, results-driven lead to take complete ownership of our organic growth and paid advertising strategy - for Penaxis and our international clients.",
    requirements: [
      "Advanced SEO: keyword research, on-page/off-page/technical SEO, link building, competitor analysis",
      "AEO, GEO, and AI-search optimization, plus local SEO (Google Business Profile, citations, local landing pages)",
      "Hands-on Google Ads and Meta Ads experience - strategy, execution, optimization, lead generation",
      "SEO-driven content strategy and strong reporting skills (Search Console, GA4, Tag Manager)",
      "Prior experience at a software development company or digital marketing agency preferred",
    ],
    note: "Portfolio and verifiable proof of results are required - SEO case studies, ad campaign performance (CPL/CPA/ROAS), or before-and-after reports (client-sensitive data can be anonymized). When applying, please also share your expected monthly salary and notice period / earliest joining date.",
  },
  {
    slug: "full-stack-software-engineer",
    title: "Full-Stack Software Engineer",
    department: "Engineering",
    location: "DHA Rahbar, Lahore",
    type: "Full-time, on-site - Mon-Fri, 10 AM-7 PM",
    experience: "3+ years",
    summary: "A self-driven engineer with strong fundamentals in Next.js, React, TypeScript, and Python, comfortable using AI-assisted development tools to ship production work.",
    requirements: [
      "3+ years building production applications with Next.js, React, TypeScript, and Python",
      "Solid backend experience - REST APIs, authentication, database architecture (PostgreSQL/MySQL)",
      "Hands-on with AI coding agents (e.g. Claude Code, Codex, Cursor) while keeping strong engineering fundamentals",
      "Comfortable owning deployment and production troubleshooting (Vercel, AWS, DigitalOcean, Docker, CI/CD)",
      "Good to have: WordPress/Shopify/headless CMS experience, LLM API integrations (OpenAI, Anthropic)",
    ],
  },
  {
    slug: "business-development-associate",
    title: "Business Development Associate (BDA)",
    department: "Growth",
    location: "DHA Rahbar, Lahore",
    type: "Full-time, on-site - Monday-Friday",
    experience: "0-2 years",
    summary: "An energetic, confident BDA to drive our international outbound sales - cold calling, LinkedIn outreach, and lead generation for B2B clients across the US, UK, and Australia.",
    requirements: [
      "Comfortable with daily international cold calling and confident handling early objections",
      "LinkedIn outreach and prospecting (Sales Navigator or similar) with organized, consistent follow-up",
      "Strong written and spoken English",
      "Fresh graduates with strong communication skills welcome - up to 2 years' relevant experience preferred",
      "Good to have: prior cold-calling experience, CRM tools (Zoho, Apollo, Instantly)",
    ],
  },
];
