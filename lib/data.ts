// Left navigation capsule — primary destinations
export const navLeft = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "#industries" },
  // No dedicated case-studies page yet — placeholder destination until one exists
  { label: "Case Studies", href: "/case-studies" },
];

// Right navigation capsule — About (quiet) + Start a Project (primary CTA)
export const navRight = [{ label: "About", href: "/about" }];

export const navCta = { label: "Start a Project", href: "#contact" };

// Kept for mobile full-screen menu — same destinations plus Team,
// per the spec's note that Team/Insights/Careers stay out of primary desktop nav for now
export const navMobile = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "#industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Our Team", href: "#team" },
];

export const stats = [
  { value: "3", suffix: " Weeks", label: "Average MVP launch timeline" },
  { value: "50", suffix: "+", label: "Websites, platforms and CRMs launched" },
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
    pillars: [
      { title: "Product Discovery & MVP Strategy", copy: "Defining the problem, target users, core features, and roadmap before development begins." },
      { title: "SaaS & Custom MVP Development", copy: "Building responsive platforms, portals, dashboards, and web products with the right features first." },
      { title: "AI Assistants & Intelligent Features", copy: "Integrating chatbots, knowledge assistants, document intelligence, content generation, and smart workflows." },
      { title: "Automation & Third-Party Integrations", copy: "Connecting APIs, CRMs, payment systems, communication tools, and business platforms." },
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
    pillars: [
      { title: "Business Analysis & Process Optimization", copy: "Assessing current workflows, identifying inefficiencies, and recommending practical improvements that support better decision-making and smoother operations." },
      { title: "Digital Strategy & Transformation Roadmap", copy: "Creating clear digital strategies and step-by-step transformation plans aligned with business goals, market needs, and long-term growth priorities." },
      { title: "Social Media Marketing & Digital Presence", copy: "Strengthening online visibility through strategic social media management, content planning, audience engagement, and a more consistent digital brand presence." },
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
    pillars: [
      { title: "Business Development-as-a-Service", copy: "We operate as an extension of your commercial team, handling targeted prospecting, outreach, lead qualification, follow-ups, and meeting generation to build a consistent pipeline of relevant opportunities." },
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
    pillars: [
      { title: "Website & E-Commerce Development", copy: "Building responsive business websites, e-commerce stores, landing pages, and digital experiences designed for usability, performance, and conversion." },
      { title: "Custom CRM & Business Portals", copy: "Developing tailored CRM systems, customer portals, admin panels, and internal tools that centralize information and improve day-to-day management." },
      { title: "Custom Software & Integrated Systems", copy: "Creating dashboards, workflow platforms, reporting systems, and custom applications connected with the tools and services your business relies on." },
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
  { name: "Adeel Aslam", role: "CEO & Founder" },
  { name: "Shahzad Ali", role: "Co-Founder & CFO" },
  { name: "Fizza Shahzad", role: "Creative & Brand Lead" },
  { name: "Hamza Durrani", role: "BD Manager" },
  { name: "Laiba Zafar", role: "Social Media Manager" },
  { name: "Mutahar Murtaza", role: "Full Stack Developer" },
  { name: "Zaid Bin Arif", role: "Business Analyst" },
  { name: "Sitara Tahir", role: "Project Manager" },
  { name: "Abdullah Sadiq", role: "BD Representative" },
  { name: "Maleeha Farooq", role: "Marketing Associate" },
  { name: "Adnan Farooq", role: "AI DevOps Engineer" },
  { name: "Maham Aziz", role: "HR Manager" },
  { name: "Saad Sultan", role: "CMS Developer" },
  { name: "Farwa Saleem", role: "Recruitment Manager" },
];

export const contact = {
  phone: "+92-324-4035507",
  email: "info@penaxis.com",
  linkedin: "/company/penaxis",
  website: "www.penaxis.com",
  address: "2nd floor, 3-P, DHA Rahbar, Lahore, Pakistan, 54000",
};
