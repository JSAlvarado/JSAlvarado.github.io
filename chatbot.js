// ============ CHATBOT: floating Q&A assistant (see .claude/rules/chatbot.md) ============
// A round, draggable button opens a chatbox with suggested questions. Answers come only from
// John's approved sources (Johns DIR/chatbot-questions.md). No AI, no network calls: questions never leave the browser.
(() => {
  "use strict";

  const EMAIL = "johnalvarado.565655@gmail.com";
  const MAILTO = { text: "Email John", href: "mailto:" + EMAIL };

  // ---- Approved answers: q = suggestion label, keys = words/phrases for typed questions, next = follow-ups ----
  const QA = [
    { id: "overview", q: "Who is John?", keys: ["who", "overview", "background", "summary", "introduce", "about john", "tell me about"],
      a: "John (Johnstheward S. Alvarado) is a Computer Engineering student at Holy Cross of Davao College in Davao City, Philippines. John has hands-on experience in cell site installation, Wi-Fi and CCTV setup, and hardware troubleshooting, and completed Smart Communications’ Wireless Engineering Education Program (SWEEP) in 2026. John’s focus areas are networking, embedded systems and IoT.",
      next: ["strengths", "sweep", "floatech"] },
    { id: "status", q: "What is John’s current status?", keys: ["status", "currently", "student", "studying", "year"],
      a: "John is currently pursuing a BS in Computer Engineering at Holy Cross of Davao College (2023 to present) and is available for work, anywhere.",
      next: ["degree", "availability", "position"] },
    { id: "strengths", q: "What are John’s core strengths?", keys: ["strength", "strengths", "strongest", "expertise", "good at", "best at", "core"],
      a: "John’s core strengths are networking and field work (Wi-Fi access point installation, cell site installation support, cable connection and termination, CCTV installation and network performance monitoring), hardware troubleshooting, and microcontroller-based embedded development, as demonstrated in the FLOATech project. John follows procedures closely, works safely on site and explains technical problems in plain language.",
      next: ["skills", "why", "floatech"] },
    { id: "why", q: "Why should we consider John?", keys: ["why hire", "why should", "hire", "value", "offer", "different", "distinguish", "stand out", "unique"],
      a: "John combines hands-on field experience from Smart Communications’ SWEEP program with FLOATech, an embedded systems design project recognized twice in 2026. John follows procedures closely, works safely on site, and explains technical problems clearly to non-technical staff.",
      next: ["sweep", "awards", "contact"] },
    { id: "sectors", q: "Which industries is John aligned with?", keys: ["industry", "industries", "sector", "sectors", "field", "interests"],
      a: "John’s background aligns most closely with networking and telecommunications, and embedded systems and IoT. Longer term, John aims to contribute to innovation in food security and resource management.",
      next: ["goals", "position", "skills"] },
    { id: "position", q: "What type of position is John pursuing?", keys: ["position", "role", "job", "looking for", "pursuing", "seeking", "opportunity", "opportunities"],
      a: "John is open to new opportunities in tech, wherever the work is.",
      next: ["availability", "strengths", "contact"] },
    { id: "availability", q: "Is John available for work?", keys: ["available", "availability", "relocate", "relocation", "move", "anywhere", "open to"],
      a: "Yes. John is available for work, anywhere, and is open to opportunities beyond Davao City.",
      next: ["location", "position", "contact"] },
    { id: "location", q: "Where is John based?", keys: ["where is john", "where is john based", "location", "based", "city", "country", "located"],
      a: "John is based in Davao City, Philippines.",
      next: ["availability", "contact"] },
    { id: "ojt", q: "Is John available for OJT?", keys: ["ojt", "on the job", "on-the-job", "internship", "intern", "training placement"],
      a: "Completing on-the-job training (OJT) is one of John’s short-term goals. For specific dates and arrangements, please contact John directly.",
      links: [MAILTO], next: ["goals", "degree", "contact"] },
    { id: "degree", q: "What is John studying?", keys: ["degree", "course", "program", "major", "school", "university", "college", "institution", "education", "studying", "study", "studies"],
      a: "John is pursuing a BS in Computer Engineering at Holy Cross of Davao College (2023 to present). John was previously enrolled in BS Electronics and Communications Engineering (2022 to 2023), and completed junior and senior high school at Davao City National High School (2016 to 2022).",
      next: ["research", "training", "goals"] },
    { id: "research", q: "Has John done research?", keys: ["research", "capstone", "thesis", "design project", "academic project", "poster"],
      a: "Yes. John was part of the four-person team behind FLOATech, an Arduino-based floating unit for tilapia farms, which received 2nd Best Research Poster at the CET Research Conference (Conversazione 2026) at Holy Cross of Davao College.",
      next: ["floatech", "role", "awards"] },
    { id: "sweep", q: "What did John do at Smart Communications?", keys: ["smart", "sweep", "smart communications", "wireless engineering", "trainee"],
      a: "As a Wireless Engineering Trainee in Smart Communications’ SWEEP program (2026), John assisted engineers with cell site installation, recorded and analyzed network performance data, checked rack and board status in network equipment management software, and built HTML pages and AI prompts that made the team’s internal documentation faster to produce. John completed the program and received a Certificate of Completion.",
      next: ["cellsite", "tools", "anawim"] },
    { id: "cellsite", q: "What cell site work did John do?", keys: ["cell site", "cellsite", "tower", "radio", "feeder", "grounding", "installation", "field work", "outdoor"],
      a: "During SWEEP, John assisted engineers with cell site installation, connecting and terminating feeder and grounding cables on outdoor radio units while following site safety protocols.",
      next: ["safety", "tools", "sweep"] },
    { id: "tools", q: "Which network analysis tools does John use?", keys: ["tools", "ookla", "cellmapper", "monitoring", "analysis", "analyze", "performance", "data"],
      a: "John recorded and analyzed network performance data in Microsoft Excel, Ookla Insights and CellMapper to support network monitoring. John also checked rack and board status in network equipment management software to confirm hardware was active and running normally.",
      next: ["software", "sweep", "skills"] },
    { id: "docs", q: "How did John help with the team’s documentation?", keys: ["process", "improvement", "improve", "documentation", "html pages", "prompts", "efficiency"],
      a: "At Smart Communications, John built HTML pages and AI prompts that made the team’s internal documentation faster to produce and easier to use.",
      next: ["ai", "sweep"] },
    { id: "safety", q: "How does John approach workplace safety?", keys: ["safety", "safe", "osh", "protocol", "protocols", "hazard"],
      a: "John followed site safety protocols during cell site installation and has completed an Occupational Safety and Health (OSH) Orientation.",
      next: ["cellsite", "training"] },
    { id: "anawim", q: "What did John do as a Network and CCTV Technician?", keys: ["anawim", "cctv", "camera", "cameras", "technician", "wifi", "wi-fi", "access point", "access points", "elementary"],
      a: "In 2024, as Network and CCTV Technician at Anawim Elementary School, Inc. in Davao City, John installed and configured wired Wi-Fi access points to give the school reliable connectivity, installed CCTV cameras across the campus, handled basic troubleshooting and gave on-site technical support to teachers and staff.",
      next: ["network", "communication", "clerk"] },
    { id: "clerk", q: "What did John do as a clerk?", keys: ["clerk", "data entry", "inventory", "sales", "excel", "records"],
      a: "In 2023, as a Data Entry and Sales Inventory Clerk on various assignments in Davao City, John kept digital records and inventory data accurate and up to date in Microsoft Excel and supported sales operations with inventory tracking and administrative coordination, often handling several tasks at once.",
      next: ["anawim", "teamwork"] },
    { id: "floatech", q: "What is FLOATech?", keys: ["floatech", "float tech", "floating", "tilapia", "fish", "pond", "aquaculture"],
      a: "FLOATech is an Arduino-based, solar-powered floating unit for tilapia (Oreochromis niloticus) farms, built and tested on a real pond by a four-person team at Holy Cross of Davao College in 2026. It monitors water parameters in real time, feeds the fish on schedule and runs aeration. It is designed so farmers spend less time checking the pond by hand.",
      links: [{ text: "See FLOATech on this page", href: "#floatech" }], next: ["role", "functions", "awards"] },
    { id: "role", q: "What was John’s role in FLOATech?", keys: ["floatech", "role", "contribution", "contribute", "responsible", "responsibility", "did john build"],
      a: "John was a member of FLOATech’s four-person team, not the team leader, and worked hands-on across every part of the project. This included assembling and testing the control electronics: custom-soldered circuit boards, voltage regulators, LCD, keypad and sensors in weatherproof enclosures.",
      links: [MAILTO], next: ["power", "functions", "awards"] },
    { id: "functions", q: "What are FLOATech’s main functions?", keys: ["floatech", "function", "functions", "features", "monitor", "feeding", "feeder", "aeration", "what does floatech do"],
      a: "FLOATech has three main functions: real-time water monitoring through water-parameter sensors, automated feeding on schedule, and automatic water aeration. The Arduino control unit includes an LCD and keypad.",
      next: ["power", "role", "results"] },
    { id: "power", q: "How is FLOATech powered and protected?", keys: ["floatech", "power", "powered", "solar", "battery", "charge controller", "off-grid", "waterproof", "weatherproof", "enclosure", "barrels", "pontoon"],
      a: "FLOATech runs off-grid on a solar panel, charge controller and battery. The electronics sit in weatherproof enclosures on a pontoon frame of buoyant barrels.",
      next: ["functions", "role"] },
    { id: "awards", q: "What awards has John received?", keys: ["award", "awards", "recognition", "recognized", "won", "win", "prize", "champion", "competition", "technofair", "conversazione"],
      a: "John’s awards are: Champion, Networking Competition (2025); Second Runner Up, Best Design Project Exhibit, TechnoFair 2026 (FLOATech), Holy Cross of Davao College; and 2nd Best Research Poster, CET Research Conference, Conversazione 2026 (FLOATech), Holy Cross of Davao College. The certificates appear in the Awards section.",
      links: [{ text: "See the Awards section", href: "#awards" }], next: ["training", "floatech", "competition"] },
    { id: "otherprojects", q: "What other projects has John worked on?", keys: ["other projects", "projects", "project", "function generator", "amplifier", "mono", "cobot", "robot", "portfolio"],
      a: "Besides FLOATech, John’s projects include a basic function generator circuit, a mono amplifier with speaker, a walking cobot (collaborative robot) build, and this portfolio website, built with HTML, CSS and JavaScript with the help of Claude Code and hosted on GitHub Pages.",
      links: [{ text: "See Other projects", href: "#projects" }], next: ["floatech", "website", "skills"] },
    { id: "website", q: "How was this website built?", keys: ["website", "site", "this page", "built this", "web page", "github pages"],
      a: "This portfolio was built with HTML, CSS and JavaScript, with the help of Claude Code, Anthropic’s AI coding assistant, and is hosted on GitHub Pages.",
      next: ["ai", "software"] },
    { id: "skills", q: "What are John’s technical skills?", keys: ["skill", "skills", "competencies", "competency", "capabilities", "technical", "abilities", "qualifications"],
      a: "John’s skills fall into four groups: networking and field work (Wi-Fi access point installation and setup, cell site installation support, cable connection and termination, CCTV installation, network performance monitoring, basic networking, site safety procedures); hardware and embedded (hardware troubleshooting, microcontroller and embedded development, sensors and automation, solar power systems); software and tools (Claude Code, HTML, CSS and JavaScript, Microsoft Excel, Ookla Insights, CellMapper, AI prompting for documentation); and working with people (on-site support for non-technical staff, clear technical explanations, accurate data entry and records, teamwork under deadlines).",
      links: [{ text: "See the Skills section", href: "#skills" }], next: ["network", "hardware", "software"] },
    { id: "network", q: "What networking experience does John have?", keys: ["network", "networking", "wireless", "lan", "cabling", "cable", "termination", "cellular", "telecom", "telecommunications"],
      a: "John’s networking experience includes installing and configuring wired Wi-Fi access points for a school campus, supporting cell site installation with Smart Communications, connecting and terminating cables, network performance monitoring, and basic networking. John was also Champion of a Networking Competition in 2025.",
      next: ["anawim", "cellsite", "competition"] },
    { id: "competition", q: "What was the Networking Competition?", keys: ["networking competition"],
      a: "John was Champion of a Networking Competition in 2025. Further details about the competition are not included in John’s profile; please contact John directly for more information.",
      links: [MAILTO], next: ["network", "awards"] },
    { id: "hardware", q: "What hardware and embedded experience does John have?", keys: ["hardware", "embedded", "microcontroller", "microcontrollers", "arduino", "sensor", "sensors", "automation", "electronics", "troubleshoot", "troubleshooting", "circuit", "circuits", "solder", "soldering"],
      a: "John’s hardware and embedded experience includes hardware troubleshooting, microcontroller and embedded development, sensors and automation, and solar power systems. In FLOATech, John assembled and tested the Arduino-based control electronics, including custom-soldered circuit boards, voltage regulators, an LCD, a keypad and sensors.",
      next: ["role", "otherprojects", "skills"] },
    { id: "software", q: "Which software and programming languages does John use?", keys: ["software", "programming", "language", "languages", "code", "coding", "html", "css", "javascript", "developer", "development"],
      a: "John works with HTML, CSS and JavaScript, Microsoft Excel, Ookla Insights and CellMapper, and uses Claude Code (AI-assisted development) and AI prompting for documentation.",
      next: ["ai", "website", "tools"] },
    { id: "ai", q: "How does John use AI tools?", keys: ["ai", "artificial intelligence", "claude", "claude code", "prompt", "prompting", "chatgpt"],
      a: "John learns by building and uses Claude Code, Anthropic’s AI coding assistant, to help write and debug code, work through problems, document work and build web pages. At Smart Communications, John also built AI prompts that made the team’s documentation faster to produce.",
      next: ["website", "learning"] },
    { id: "teamwork", q: "How does John work in a team?", keys: ["team", "teamwork", "collaborate", "collaboration", "deadline", "deadlines", "pressure", "priorities"],
      a: "John is experienced in teamwork under deadlines: assisting engineers during SWEEP, working in a four-person team on FLOATech, and handling several tasks at once as a clerk.",
      next: ["communication", "floatech"] },
    { id: "communication", q: "How does John communicate with non-technical staff?", keys: ["communicate", "communication", "explain", "explaining", "non-technical", "stakeholders", "support", "end users", "customer"],
      a: "John explains technical problems in plain language and has given on-site technical support to teachers and staff.",
      next: ["anawim", "teamwork"] },
    { id: "learning", q: "How does John learn new technologies?", keys: ["learn", "learning", "learner", "new technologies", "growth", "improve skills"],
      a: "John learns by building: designing embedded and IoT projects, building web pages, and using tools such as Claude Code. Improving programming skills and building more monitoring and automation projects are among John’s short-term goals.",
      next: ["goals", "ai"] },
    { id: "motivation", q: "What motivates John?", keys: ["motivate", "motivates", "motivation", "passion", "passionate", "drive", "inspire"],
      a: "John is motivated to build technology that improves efficiency, sustainability and productivity, and aims to contribute to food security and resource management in the long term.",
      next: ["goals", "sectors"] },
    { id: "training", q: "What certifications and training has John completed?", keys: ["certification", "certifications", "certificate", "certified", "training", "trainings", "workshop", "workshops", "seminar", "credentials"],
      a: "John holds a Certificate of Completion from Smart Communications’ Wireless Engineering Education Program (SWEEP, 2026) and has completed an Occupational Safety and Health Orientation, a Basic Computer Networking Workshop and programming workshops. John is a member of the Institute of Computer Engineers of the Philippines (ICpEP) and participated in the 16th CODEE Region XI Engineering Congress.",
      next: ["awards", "degree"] },
    { id: "membership", q: "Is John part of any professional organization?", keys: ["member", "membership", "organization", "organisation", "icpep", "affiliation", "congress", "codee", "conference"],
      a: "John is a member of the Institute of Computer Engineers of the Philippines (ICpEP) and participated in the 16th CODEE Region XI Engineering Congress.",
      next: ["training", "awards"] },
    { id: "goals", q: "What are John’s career goals?", keys: ["goal", "goals", "career", "future", "plan", "plans", "five years", "5 years", "aspiration", "aspirations", "roadmap", "long term", "short term", "business", "small business"],
      a: "In the next one to three years, John plans to complete the degree and on-the-job training, improve programming skills, build more monitoring and automation projects, and develop leadership, project management and communication skills. In three to five years, John aims to build a career in the tech industry, design and deploy real-world technology solutions, and join research and development on automation and smart systems. In five to ten years, John aims to become a recognized expert, contribute to food security and resource management, and mentor future IT professionals in local communities.",
      links: [{ text: "See the Career roadmap", href: "#roadmap" }], next: ["sectors", "motivation", "contact"] },
    { id: "contact", q: "How can I contact John?", keys: ["contact", "email", "e-mail", "reach", "message", "get in touch", "interview", "schedule", "hire john"],
      a: "Email is the preferred way to reach John, including to schedule an interview: " + EMAIL + ". John’s resume and GitHub profile are also available below.",
      links: [MAILTO, { text: "Download resume (PDF)", href: "assets/Johnstheward-Alvarado-Resume.pdf", download: true }, { text: "GitHub profile", href: "https://github.com/JSAlvarado" }],
      next: ["availability", "overview"] },
    { id: "resume", q: "May I have John’s resume?", keys: ["resume", "cv", "curriculum vitae", "download"],
      a: "Yes. John’s resume is available as a PDF download.",
      links: [{ text: "Download resume (PDF)", href: "assets/Johnstheward-Alvarado-Resume.pdf", download: true }], next: ["contact", "skills"] },
    { id: "github", q: "Where can I see John’s work online?", keys: ["github", "online", "work samples", "linkedin", "profile", "links"],
      a: "John’s work is presented on this website, and John’s GitHub profile is at github.com/JSAlvarado. John has not listed a LinkedIn profile; please contact John directly for other links.",
      links: [{ text: "GitHub profile", href: "https://github.com/JSAlvarado" }], next: ["otherprojects", "contact"] },
    { id: "bot", q: "Am I talking to John?", keys: ["are you", "who are you", "bot", "robot assistant", "assistant", "real person", "human", "source", "information from", "stored", "data", "privacy"],
      a: "No. This is an automated assistant for John’s portfolio. It answers only from John’s resume, portfolio, career plan and this website, current as of October 2026. Your questions are processed in your browser and are not stored.",
      next: ["overview", "contact"] },
    { id: "experience", q: "What is John’s work experience?", keys: ["experience", "work experience", "employment", "worked", "jobs", "work history", "previous roles"],
      a: "John’s experience includes: Wireless Engineering Trainee, Smart Communications, Inc. (SWEEP), 2026; Network and CCTV Technician, Anawim Elementary School, Inc., 2024; and Data Entry and Sales Inventory Clerk, various assignments in Davao City, 2023.",
      links: [{ text: "See the Experience section", href: "#experience" }], next: ["sweep", "anawim", "clerk"] }
  ];

  // ---- Topics that need John's own answer: replied to with a topic-specific referral to email ----
  const REFER = [
    { topic: "John’s expected graduation date", keys: ["graduate", "graduation", "graduating", "finish school"] },
    { topic: "John’s available start date", keys: ["start date", "when can john start", "can john start", "start working", "start work", "join", "notice"] },
    { topic: "employment type and work arrangements", keys: ["full-time", "full time", "part-time", "part time", "remote", "hybrid", "onsite", "on-site", "work from home", "shift", "shifts", "weekend", "weekends", "overtime"] },
    { topic: "travel and licensing", keys: ["travel", "license", "licence", "driver", "drive", "passport", "visa", "work permit"] },
    { topic: "the languages John speaks", keys: ["speak", "speaks", "english", "tagalog", "filipino", "bisaya", "cebuano"] },
    { topic: "why John changed degree programs", keys: ["switch", "switched", "shifted", "transfer", "transferred", "electronics to computer"] },
    { topic: "FLOATech’s sensors, measured parameters and connectivity", keys: ["which sensors", "what sensors", "parameters", "ph", "temperature", "oxygen", "turbidity", "internet", "wifi module", "app", "remote monitoring", "iot connection"] },
    { topic: "FLOATech’s results, challenges, cost and timeline", keys: ["results", "outcome", "outcomes", "challenge", "challenges", "problem", "problems", "cost", "budget", "timeline", "how long", "improve floatech", "next version"] },
    { topic: "specific tools, platforms and advanced skills", keys: ["git", "cisco", "routing", "switching", "subnet", "subnetting", "ip address", "fiber", "fibre", "pcb", "schematic", "schematics", "python", "c++", "java", "database", "databases", "sql", "linux", "kubernetes", "cloud", "aws"] },
    { topic: "examples from John’s experience", keys: ["example", "situation", "time when", "tell me about a time", "weakness", "weaknesses", "mistake", "failure", "leadership", "led", "initiative", "feedback", "supervision", "conflict"] },
    { topic: "references", keys: ["reference", "references", "referee", "recommendation"] },
    { topic: "fit with your organization", keys: ["our company", "our organization", "culture", "why us", "join us", "expect", "expectations"] }
  ];

  // ---- Fallback replies (chatbot-questions.md, section 18) ----
  const REPLY = {
    welcome: "Welcome. I am an automated assistant for Johnstheward S. Alvarado’s portfolio. I can answer questions about John’s professional experience, the FLOATech project, technical skills, education and career objectives. How may I assist you?",
    notCovered: "Thank you for your question. That information is not included in John’s profile. For a detailed answer, please contact John directly at " + EMAIL + ".",
    greeting: "Good day. How may I assist you with your inquiry about John’s professional profile?",
    thanks: "Thank you for your interest in John’s profile. Should you wish to continue the conversation, John can be reached at " + EMAIL + ".",
    offTopic: "I am designed to assist with inquiries about John’s professional profile only. Is there anything you would like to know about John’s experience, projects or skills?",
    sensitive: "For matters of this nature, please contact John directly at " + EMAIL + ".",
    otherPerson: "I can only provide information about John’s own professional profile. For other inquiries, please contact John directly at " + EMAIL + ".",
    commitment: "I am not able to make commitments on John’s behalf. Please contact John directly at " + EMAIL + " to discuss opportunities.",
    unclear: "I’m sorry, I didn’t quite understand your question. Could you please rephrase it? You may also select one of the suggested topics below.",
    inappropriate: "I can only assist with questions about John’s professional profile.",
    privacy: "Your questions are processed in your browser and are not stored."
  };
  const START = ["overview", "floatech", "availability", "skills", "contact"];

  // ---- Special intents, checked before the answers ----
  const SENSITIVE = ["phone", "mobile", "cellphone", "telephone", "whatsapp", "viber", "contact number", "phone number", "home address", "street address", "residential address", "john address", "his address", "where does john live", "salary", "compensation", "hourly rate", "daily rate", "expected rate", "wage", "expected pay", "pay range", "age", "how old", "birthday", "birthdate", "born", "married", "relationship status", "girlfriend", "wife", "religion", "religious", "politics", "political", "gpa", "grade", "grades"];
  const OTHER_PERSON = ["teammate", "teammates", "classmate", "classmates", "colleague", "colleagues", "other candidate", "other candidates", "former employer", "boss"];
  const COMMITMENT = ["accept", "job offer", "commit", "commitment", "guarantee", "promise", "on behalf"];
  const GREETING = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "good day", "greetings"];
  const THANKS = ["thank", "thanks", "thank you", "bye", "goodbye", "see you"];
  const OFF_TOPIC = ["weather", "joke", "news", "recipe", "movie", "song", "music", "game", "bitcoin", "crypto", "stock", "sports", "horoscope"];
  const INAPPROPRIATE = ["fuck", "shit", "bitch", "damn", "stupid", "idiot", "dumb", "sexy", "nude"];

  // ---- Matching helpers: whole-word / whole-phrase matches on normalized text ----
  const normalize = (s) => " " + s.toLowerCase().replace(/[’']s\b/g, "").replace(/[’']/g, "").replace(/[^a-z0-9+#\-]+/g, " ").trim() + " ";
  const has = (text, key) => text.includes(" " + normalize(key).trim() + " ");
  const hits = (text, keys) => keys.reduce((n, k) => n + (has(text, k) ? (k.includes(" ") ? 2 : 1) : 0), 0);
  const specificity = (text, keys) => keys.reduce((n, k) => n + (has(text, k) ? k.length : 0), 0);
  const better = (s, l, bestS, bestL) => s > bestS || (s === bestS && s > 0 && l > bestL);
  const byId = (id) => QA.find((e) => e.id === id);

  // Decide the reply for a typed question
  function answerFor(raw) {
    const text = normalize(raw);
    const words = text.trim().split(" ").filter(Boolean);
    if (!/[a-z]/.test(text) || words.length === 0) return { a: REPLY.unclear, next: START };
    if (hits(text, INAPPROPRIATE)) return { a: REPLY.inappropriate, next: START };
    if (hits(text, SENSITIVE)) return { a: REPLY.sensitive, links: [MAILTO], next: START };
    if (hits(text, OTHER_PERSON)) return { a: REPLY.otherPerson, links: [MAILTO], next: START };
    if (hits(text, COMMITMENT)) return { a: REPLY.commitment, links: [MAILTO], next: START };
    if (words.length <= 4 && hits(text, THANKS)) return { a: REPLY.thanks, links: [MAILTO], next: START };
    if (words.length <= 4 && hits(text, GREETING) && !QA.some((e) => hits(text, e.keys))) return { a: REPLY.greeting, next: START };
    if (hits(text, OFF_TOPIC)) return { a: REPLY.offTopic, next: START };

    // Best approved answer vs best "ask John" topic; ties favor the approved answer
    let best = null, bestScore = 0, bestLen = 0;
    QA.forEach((e) => {
      const s = hits(text, e.keys), l = specificity(text, e.keys);
      if (better(s, l, bestScore, bestLen)) { best = e; bestScore = s; bestLen = l; }
    });
    let refer = null, referScore = 0;
    REFER.forEach((r) => { const s = hits(text, r.keys); if (s > referScore) { refer = r; referScore = s; } });
    if (refer && referScore > bestScore) {
      return { a: "Information about " + refer.topic + " is not included in John’s profile. Please contact John directly at " + EMAIL + ".", links: [MAILTO], next: START };
    }
    if (best) return best;
    return { a: REPLY.notCovered, links: [MAILTO], next: START };
  }

  // ---- Build the floating button and the chatbox ----
  const fab = document.createElement("button");
  fab.type = "button";
  fab.className = "chat-fab";
  fab.setAttribute("aria-label", "Open chat assistant");
  fab.setAttribute("aria-expanded", "false");
  fab.setAttribute("aria-controls", "chat-panel");
  fab.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M8 10h8M8 13h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

  const panel = document.createElement("div");
  panel.id = "chat-panel";
  panel.className = "chat-panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-labelledby", "chat-title");
  panel.tabIndex = -1;
  panel.innerHTML =
    '<div class="chat-head"><div><p class="label">Assistant</p><h2 id="chat-title">Ask about John</h2></div>' +
    '<button type="button" class="chat-close" aria-label="Close chat">✕</button></div>' +
    '<div class="chat-log" aria-live="polite"></div>' +
    '<div class="chat-suggest" role="group" aria-label="Suggested questions"></div>' +
    '<form class="chat-form"><label class="chat-sr" for="chat-input">Type your question</label>' +
    '<input id="chat-input" class="chat-input" type="text" autocomplete="off" maxlength="200" placeholder="Type your question…">' +
    '<button type="submit" class="chat-send">Send</button></form>' +
    '<p class="chat-note"></p>';

  document.body.append(panel, fab);
  const log = panel.querySelector(".chat-log");
  const suggest = panel.querySelector(".chat-suggest");
  const form = panel.querySelector(".chat-form");
  const input = panel.querySelector(".chat-input");
  panel.querySelector(".chat-note").textContent = REPLY.privacy;

  // Add one message to the conversation (text only; links become real anchors)
  function say(who, text, links) {
    const msg = document.createElement("div");
    msg.className = "chat-msg chat-msg--" + who;
    const p = document.createElement("p");
    p.textContent = text;
    msg.append(p);
    (links || []).forEach((l) => {
      const a = document.createElement("a");
      a.className = "chat-link";
      a.href = l.href;
      a.textContent = l.text;
      if (l.download) a.setAttribute("download", "");
      if (l.href.startsWith("#")) a.addEventListener("click", () => close(false));
      msg.append(a);
    });
    log.append(msg);
    log.scrollTop = log.scrollHeight;
  }

  // Show suggestion buttons (follow-ups, or the starting topics)
  function showSuggestions(ids) {
    suggest.replaceChildren();
    ids.map(byId).filter(Boolean).forEach((e) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chat-chip";
      b.textContent = e.q;
      b.addEventListener("click", () => ask(e.q, e));
      suggest.append(b);
    });
  }

  // Handle a question from a suggestion button or the text field
  function ask(text, entry) {
    const reply = entry || answerFor(text);
    say("user", text);
    say("bot", reply.a, reply.links);
    showSuggestions(reply.next && reply.next.length ? reply.next : START);
  }

  form.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = "";
    ask(text);
  });

  // ---- Open and close ----
  let started = false;
  function open() {
    panel.classList.toggle("is-left", fabX() < window.innerWidth / 2);
    panel.classList.add("is-open");
    // The welcome is added after the panel is visible, so screen readers announce it
    if (!started) { say("bot", REPLY.welcome); showSuggestions(START); started = true; }
    fab.classList.add("is-active");
    fab.setAttribute("aria-expanded", "true");
    fab.setAttribute("aria-label", "Close chat assistant");
    panel.focus({ preventScroll: true });
  }
  function close(returnFocus = true) {
    panel.classList.remove("is-open");
    fab.classList.remove("is-active");
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-label", "Open chat assistant");
    if (returnFocus) fab.focus({ preventScroll: true });
  }
  const isOpen = () => panel.classList.contains("is-open");
  panel.querySelector(".chat-close").addEventListener("click", () => close());
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && isOpen()) close(); });
  // Tapping anywhere outside the open chatbox closes it, like iPhone's AssistiveTouch
  document.addEventListener("pointerdown", (e) => {
    if (isOpen() && !panel.contains(e.target) && !fab.contains(e.target)) close(false);
  });

  // ---- Drag and snap (approved exception: JS sets the position as CSS custom properties) ----
  const SIZE = 56, EDGE = 16, TAP = 6, KEY = "chatFabPosition";
  const navH = () => (document.querySelector(".nav") || { offsetHeight: 64 }).offsetHeight;
  const viewW = () => document.documentElement.clientWidth;
  const viewH = () => window.innerHeight;
  let pos = { side: "right", y: null };

  const fabX = () => (pos.side === "left" ? EDGE : viewW() - SIZE - EDGE);
  const clampY = (y) => Math.min(Math.max(y, navH() + EDGE), viewH() - SIZE - EDGE);
  function place(x, y) {
    fab.style.setProperty("--chat-x", Math.round(x) + "px");
    fab.style.setProperty("--chat-y", Math.round(y) + "px");
  }
  // The stored height is clamped only when placed, so a brief resize (like a phone keyboard) doesn't move it for good
  function snap() {
    place(fabX(), clampY(pos.y === null ? viewH() - SIZE - EDGE : pos.y));
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify({ side: pos.side, ratio: pos.y / viewH() })); } catch (e) { /* storage unavailable */ }
  }
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (saved && (saved.side === "left" || saved.side === "right") && typeof saved.ratio === "number") {
      pos = { side: saved.side, y: saved.ratio * viewH() };
    }
  } catch (e) { /* storage unavailable: start bottom-right */ }
  snap();
  void fab.offsetWidth; // commit the first position before the glide transition is enabled
  fab.classList.add("is-ready");

  let drag = null, suppressClick = false;
  fab.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    suppressClick = false; // a touch drag never sends a click, so clear the flag on the next press
    const r = fab.getBoundingClientRect();
    drag = { id: e.pointerId, dx: e.clientX - r.left, dy: e.clientY - r.top, x0: e.clientX, y0: e.clientY, moved: false };
    fab.setPointerCapture(e.pointerId);
  });
  fab.addEventListener("pointermove", (e) => {
    if (!drag || e.pointerId !== drag.id) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.x0, e.clientY - drag.y0) < TAP) return;
    if (!drag.moved) { drag.moved = true; fab.classList.add("is-dragging"); if (isOpen()) close(false); }
    const x = Math.min(Math.max(e.clientX - drag.dx, 0), viewW() - SIZE);
    place(x, clampY(e.clientY - drag.dy));
  });
  function endDrag(e) {
    if (!drag || e.pointerId !== drag.id) return;
    if (drag.moved) {
      const r = fab.getBoundingClientRect();
      pos = { side: r.left + SIZE / 2 < viewW() / 2 ? "left" : "right", y: r.top };
      fab.classList.remove("is-dragging");
      snap();
      save();
      suppressClick = true;
    }
    drag = null;
  }
  fab.addEventListener("pointerup", endDrag);
  fab.addEventListener("pointercancel", endDrag);

  // A tap (or Enter/Space on the keyboard) opens the chatbox; the click after a drag is ignored
  fab.addEventListener("click", () => {
    if (suppressClick) { suppressClick = false; return; }
    if (isOpen()) close(); else open();
  });

  // Keep the button on screen when the window changes size
  window.addEventListener("resize", () => {
    snap();
    if (isOpen()) panel.classList.toggle("is-left", fabX() < window.innerWidth / 2);
  });
})();
