// ============ CHATBOT: floating Q&A assistant (see .claude/rules/chatbot.md) ============
// A round, draggable button opens a chatbox with suggested questions. Answers come only from
// John's approved sources (Johns DIR/chatbot-questions.md). No AI, no network calls: questions never leave the browser.
(() => {
  "use strict";

  const EMAIL = "johnalvarado.565655@gmail.com";
  const MAILTO = { text: "Email John", href: "mailto:" + EMAIL };

  // ---- Approved answers: q = suggestion label, keys = words/phrases for typed questions, next = follow-ups ----
  const QA = [
    { id: "overview", q: "Who is John?", keys: ["who", "overview", "background", "summary", "introduce", "about john", "tell me about john", "yourself", "profile summary"],
      a: "John (Johnstheward S. Alvarado) is a Computer Engineering student at Holy Cross of Davao College in Davao City, Philippines. John has hands-on experience in cell site installation, Wi-Fi and CCTV setup, and hardware troubleshooting, and completed Smart Communications’ Wireless Engineering Education Program (SWEEP) in 2026. John’s focus areas are networking, embedded systems and IoT.",
      next: ["strengths", "sweep", "floatech"] },
    { id: "status", q: "What is John’s current status?", keys: ["status", "currently", "student", "studying", "year", "current status", "enrolled", "undergraduate"],
      a: "John is currently pursuing a BS in Computer Engineering at Holy Cross of Davao College (2023 to present) and is available for work, anywhere.",
      next: ["degree", "availability", "position"] },
    { id: "strengths", q: "What are John’s core strengths?", keys: ["strength", "strengths", "strongest", "expertise", "good at", "best at", "core", "strong points", "specialty", "specialize", "specializes", "known for"],
      a: "John’s core strengths are networking and field work (Wi-Fi access point installation, cell site installation support, cable connection and termination, CCTV installation and network performance monitoring), hardware troubleshooting, and microcontroller-based embedded development, as demonstrated in the FLOATech project. John follows procedures closely, works safely on site and explains technical problems in plain language.",
      next: ["skills", "why", "floatech"] },
    { id: "why", q: "Why should we consider John?", keys: ["why hire", "why should", "hire", "value", "offer", "different", "distinguish", "stand out", "unique", "why john", "advantage", "contribute to our", "benefit"],
      a: "John combines hands-on field experience from Smart Communications’ SWEEP program with FLOATech, an embedded systems design project recognized twice in 2026. John follows procedures closely, works safely on site, and explains technical problems clearly to non-technical staff.",
      next: ["sweep", "awards", "contact"] },
    { id: "sectors", q: "Which industries is John aligned with?", keys: ["industry", "industries", "sector", "sectors", "field", "interests", "focus", "focus areas", "specialization", "areas"],
      a: "John’s background aligns most closely with networking and telecommunications, as well as embedded systems and IoT. Longer term, John aims to contribute to innovation in food security and resource management.",
      next: ["goals", "position", "skills"] },
    { id: "position", q: "What type of position is John pursuing?", keys: ["position", "role", "job", "looking for", "pursuing", "seeking", "opportunity", "opportunities"],
      a: "John is open to new opportunities in tech, wherever the work is.",
      next: ["availability", "strengths", "contact"] },
    { id: "availability", q: "Is John available for work?", keys: ["available", "availability", "relocate", "relocation", "move", "anywhere", "open to", "abroad", "overseas", "international", "outside davao", "other cities", "willing to move", "work abroad", "open for work"],
      a: "Yes. John is available for work, anywhere, and is open to opportunities beyond Davao City.",
      next: ["location", "position", "contact"] },
    { id: "location", q: "Where is John based?", keys: ["where is john", "where is john based", "location", "based", "city", "country", "located", "hometown", "region", "philippines", "davao"],
      a: "John is based in Davao City, Philippines.",
      next: ["availability", "contact"] },
    { id: "ojt", q: "Is John available for OJT?", keys: ["ojt", "on the job", "on-the-job", "internship", "intern", "training placement", "practicum", "apprentice", "apprenticeship"],
      a: "Completing on-the-job training (OJT) is one of John’s short-term goals. For specific dates and arrangements, please contact John directly.",
      links: [MAILTO], next: ["goals", "degree", "contact"] },
    { id: "degree", q: "What is John studying?", keys: ["degree", "course", "program", "major", "school", "university", "college", "institution", "education", "studying", "study", "studies", "academic", "academics", "engineering", "computer engineering", "high school", "highschool", "schooling", "educational background"],
      a: "John is pursuing a BS in Computer Engineering at Holy Cross of Davao College (2023 to present). John was previously enrolled in BS Electronics and Communications Engineering (2022 to 2023), and completed junior and senior high school at Davao City National High School (2016 to 2022).",
      next: ["research", "training", "goals"] },
    { id: "research", q: "Has John done research?", keys: ["research", "capstone", "thesis", "design project", "academic project", "poster", "paper", "papers", "study project", "research project"],
      a: "Yes. John was part of the four-person team behind FLOATech, an Arduino-based floating unit for tilapia farms, which received 2nd Best Research Poster at the CET Research Conference (Conversazione 2026) at Holy Cross of Davao College.",
      next: ["floatech", "role", "awards"] },
    { id: "sweep", q: "What did John do at Smart Communications?", keys: ["smart", "sweep", "smart communications", "wireless engineering", "trainee", "smart telecom", "smart inc", "smart internship", "smart training"],
      a: "As a Wireless Engineering Trainee in Smart Communications’ SWEEP program (2026), John assisted engineers with cell site installation, recorded and analyzed network performance data, checked rack and board status in network equipment management software, and built HTML pages and AI prompts that made the team’s internal documentation faster to produce. John completed the program and received a Certificate of Completion.",
      next: ["cellsite", "tools", "anawim"] },
    { id: "cellsite", q: "What cell site work did John do?", keys: ["cell site", "cellsite", "tower", "radio", "feeder", "grounding", "installation", "field work", "outdoor", "towers", "antenna", "antennas", "base station", "site work", "site visit"],
      a: "During SWEEP, John assisted engineers with cell site installation, connecting and terminating feeder and grounding cables on outdoor radio units while following site safety protocols.",
      next: ["safety", "tools", "sweep"] },
    { id: "tools", q: "Which network analysis tools does John use?", keys: ["tools", "ookla", "cellmapper", "monitoring", "analysis", "analyze", "performance", "data", "network tools", "software tools", "data analysis", "measurement"],
      a: "John recorded and analyzed network performance data in Microsoft Excel, Ookla Insights and CellMapper to support network monitoring. John also checked rack and board status in network equipment management software to confirm hardware was active and running normally.",
      next: ["software", "sweep", "skills"] },
    { id: "docs", q: "How did John help with the team’s documentation?", keys: ["process", "improvement", "improve", "documentation", "html pages", "prompts", "efficiency", "documents", "documenting", "internal documentation"],
      a: "At Smart Communications, John built HTML pages and AI prompts that made the team’s internal documentation faster to produce and easier to use.",
      next: ["ai", "sweep"] },
    { id: "safety", q: "How does John approach workplace safety?", keys: ["safety", "safe", "osh", "protocol", "protocols", "hazard", "ppe", "safety training", "safely"],
      a: "John followed site safety protocols during cell site installation and has completed an Occupational Safety and Health (OSH) Orientation.",
      next: ["cellsite", "training"] },
    { id: "anawim", q: "What did John do as a Network and CCTV Technician?", keys: ["anawim", "cctv", "camera", "cameras", "technician", "wifi", "wi-fi", "access point", "access points", "elementary", "cctv cameras", "security cameras", "surveillance", "access point installation"],
      a: "In 2024, as Network and CCTV Technician at Anawim Elementary School, Inc. in Davao City, John installed and configured wired Wi-Fi access points to give the school reliable connectivity, installed CCTV cameras across the campus, handled basic troubleshooting and gave on-site technical support to teachers and staff.",
      next: ["network", "communication", "clerk"] },
    { id: "clerk", q: "What did John do as a clerk?", keys: ["clerk", "data entry", "inventory", "sales", "excel", "records", "spreadsheet", "spreadsheets", "encoding", "encoder", "administrative", "admin", "office work", "data entry clerk"],
      a: "In 2023, as a Data Entry and Sales Inventory Clerk on various assignments in Davao City, John kept digital records and inventory data accurate and up to date in Microsoft Excel and supported sales operations with inventory tracking and administrative coordination, often handling several tasks at once.",
      next: ["anawim", "teamwork"] },
    { id: "floatech", q: "What is FLOATech?", keys: ["floatech", "float tech", "floating", "tilapia", "fish", "pond", "aquaculture", "fish farm", "fish farming", "farm", "farming", "floater", "aquatic", "water quality", "fishpond"],
      a: "FLOATech is an Arduino-based, solar-powered floating unit for tilapia (Oreochromis niloticus) farms, built and tested on a real pond by a four-person team at Holy Cross of Davao College in 2026. It monitors water parameters in real time, feeds the fish on schedule and runs aeration. It is designed so farmers spend less time checking the pond by hand.",
      links: [{ text: "See FLOATech on this page", href: "#floatech" }], next: ["role", "functions", "awards"] },
    { id: "role", q: "What was John’s role in FLOATech?", keys: ["floatech", "role", "contribution", "contribute", "responsible", "responsibility", "did john build", "team leader", "leader", "what did john do in", "john part", "john task", "tasks", "involvement", "involved", "handled"],
      a: "John was a member of FLOATech’s four-person team, not the team leader, and worked hands-on across every part of the project. This included assembling and testing the control electronics: custom-soldered circuit boards, voltage regulators, LCD, keypad and sensors in weatherproof enclosures.",
      links: [MAILTO], next: ["power", "functions", "awards"] },
    { id: "functions", q: "What are FLOATech’s main functions?", keys: ["floatech", "function", "functions", "features", "monitor", "feeding", "feeder", "aeration", "what does floatech do", "diffuser", "microbubble", "microbubble diffuser", "bubbles", "how does floatech work", "how it works", "automatic", "automated", "monitoring system"],
      a: "FLOATech has three main functions: real-time water monitoring through water-parameter sensors, automated feeding on schedule, and automatic water aeration through a microbubble diffuser. The Arduino control unit includes an LCD and keypad, and the unit also carries a GSM module.",
      next: ["power", "role", "results"] },
    { id: "power", q: "How is FLOATech powered and protected?", keys: ["floatech", "power", "powered", "solar", "battery", "charge controller", "off-grid", "waterproof", "weatherproof", "enclosure", "barrels", "pontoon", "energy", "solar panel", "electricity", "float", "floats", "protected"],
      a: "FLOATech runs off-grid on a solar panel, charge controller and battery. The electronics sit in weatherproof enclosures on a pontoon frame of buoyant barrels.",
      next: ["functions", "role"] },
    { id: "awards", q: "What awards has John received?", keys: ["award", "awards", "recognition", "recognized", "won", "win", "prize", "champion", "competition", "technofair", "conversazione", "achievement", "achievements", "accomplishment", "accomplishments", "honor", "honors", "medal", "placed", "best design", "runner up"],
      a: "John’s awards are: Champion, Networking Competition (2025); Second Runner Up, Best Design Project Exhibit, TechnoFair 2026 (FLOATech), Holy Cross of Davao College; and 2nd Best Research Poster, CET Research Conference, Conversazione 2026 (FLOATech), Holy Cross of Davao College. The certificates appear in the Awards section.",
      links: [{ text: "See the Awards section", href: "#awards" }], next: ["training", "floatech", "competition"] },
    { id: "otherprojects", q: "What other projects has John worked on?", keys: ["other projects", "projects", "project", "function generator", "amplifier", "mono", "cobot", "robot", "portfolio", "builds", "function gen", "amp", "speaker", "walking robot", "four-legged", "quadruped", "legged robot", "electronics projects", "past projects"],
      a: "Besides FLOATech, John’s projects include a basic function generator circuit, a mono amplifier with speaker, a four-legged, box-type walking cobot (collaborative robot), and this portfolio website, built with HTML, CSS and JavaScript with the help of Claude Code and hosted on GitHub Pages.",
      links: [{ text: "See Other projects", href: "#projects" }], next: ["floatech", "website", "skills"] },
    { id: "website", q: "How was this website built?", keys: ["website", "site", "this page", "built this", "web page", "github pages", "this website", "portfolio site", "how was this built", "webpage"],
      a: "This portfolio was built with HTML, CSS and JavaScript, with the help of Claude Code, Anthropic’s AI coding assistant, and is hosted on GitHub Pages.",
      next: ["ai", "software"] },
    { id: "skills", q: "What are John’s technical skills?", keys: ["skill", "skills", "competencies", "competency", "capabilities", "technical", "abilities", "qualifications", "know how", "proficient", "proficiency", "skillset", "skill set", "can john do"],
      a: "John’s skills fall into four groups: networking and field work (Wi-Fi access point installation and setup, cell site installation support, cable connection and termination, CCTV installation, network performance monitoring, basic networking, site safety procedures); hardware and embedded (hardware troubleshooting, microcontroller and embedded development, sensors and automation, solar power systems); software and tools (Claude Code, HTML, CSS and JavaScript, Microsoft Excel, Ookla Insights, CellMapper, AI prompting for documentation); and working with people (on-site support for non-technical staff, clear technical explanations, accurate data entry and records, teamwork under deadlines).",
      links: [{ text: "See the Skills section", href: "#skills" }], next: ["network", "hardware", "software"] },
    { id: "network", q: "What networking experience does John have?", keys: ["network", "networking", "wireless", "lan", "cabling", "cable", "termination", "cellular", "telecom", "telecommunications", "networks", "router", "routers", "internet", "connectivity", "telco", "signal"],
      a: "John’s networking experience includes installing and configuring wired Wi-Fi access points for a school campus, supporting cell site installation with Smart Communications, connecting and terminating cables, network performance monitoring, and basic networking. John was also Champion of a Networking Competition in 2025.",
      next: ["anawim", "cellsite", "competition"] },
    { id: "competition", q: "What was the Networking Competition?", keys: ["networking competition"],
      a: "John was Champion of a Networking Competition in 2025. Further details about the competition are not included in John’s profile; please contact John directly for more information.",
      links: [MAILTO], next: ["network", "awards"] },
    { id: "hardware", q: "What hardware and embedded experience does John have?", keys: ["hardware", "embedded", "microcontroller", "microcontrollers", "arduino", "sensor", "sensors", "automation", "electronics", "troubleshoot", "troubleshooting", "circuit", "circuits", "solder", "soldering", "iot", "internet of things", "electronic", "embedded systems", "devices", "repair", "computer", "computers"],
      a: "John’s hardware and embedded experience includes hardware troubleshooting, microcontroller and embedded development, sensors and automation, and solar power systems. In FLOATech, John assembled and tested the Arduino-based control electronics, including custom-soldered circuit boards, voltage regulators, an LCD, a keypad and sensors.",
      next: ["role", "otherprojects", "skills"] },
    { id: "software", q: "Which software and programming languages does John use?", keys: ["software", "programming", "language", "languages", "code", "coding", "html", "css", "javascript", "developer", "development", "program", "programs", "programmer", "coder", "web development", "web dev", "frontend"],
      a: "John works with HTML, CSS and JavaScript, Microsoft Excel, Ookla Insights and CellMapper, and uses Claude Code (AI-assisted development) and AI prompting for documentation.",
      next: ["ai", "website", "tools"] },
    { id: "ai", q: "How does John use AI tools?", keys: ["ai", "artificial intelligence", "claude", "claude code", "prompt", "prompting", "chatgpt", "gpt", "copilot", "llm", "generative", "ai tools"],
      a: "John learns by building and uses Claude Code, Anthropic’s AI coding assistant, to help write and debug code, work through problems, document work and build web pages. At Smart Communications, John also built AI prompts that made the team’s documentation faster to produce.",
      next: ["website", "learning"] },
    { id: "teamwork", q: "How does John work in a team?", keys: ["team", "teamwork", "collaborate", "collaboration", "deadline", "deadlines", "pressure", "priorities", "team player", "group", "groupmates", "teammates", "work with others"],
      a: "John lists teamwork under deadlines among John’s skills, and has assisted engineers during SWEEP and worked in a four-person team on FLOATech.",
      next: ["communication", "floatech"] },
    { id: "communication", q: "How does John communicate with non-technical staff?", keys: ["communicate", "communication", "explain", "explaining", "non-technical", "stakeholders", "support", "end users", "customer", "communication skills", "people skills", "soft skills", "explain things"],
      a: "John explains technical problems in plain language and has given on-site technical support to teachers and staff.",
      next: ["anawim", "teamwork"] },
    { id: "learning", q: "How does John learn new technologies?", keys: ["learn", "learning", "learner", "new technologies", "growth", "improve skills", "fast learner", "quick learner", "self-taught", "adapt", "adaptable", "learn quickly"],
      a: "John learns by building: designing embedded and IoT projects, building web pages, and using tools such as Claude Code. Improving programming skills and building more monitoring and automation projects are among John’s short-term goals.",
      next: ["goals", "ai"] },
    { id: "motivation", q: "What motivates John?", keys: ["motivate", "motivates", "motivation", "passion", "passionate", "drive", "inspire", "why tech", "why engineering", "enjoy", "enjoys", "love"],
      a: "John is motivated to build technology that improves efficiency, sustainability and productivity, and aims to contribute to food security and resource management in the long term.",
      next: ["goals", "sectors"] },
    { id: "training", q: "What certifications and training has John completed?", keys: ["certification", "certifications", "certificate", "certified", "training", "trainings", "workshop", "workshops", "seminar", "credentials", "seminars", "courses taken", "certs", "orientation"],
      a: "John holds a Certificate of Completion from Smart Communications’ Wireless Engineering Education Program (SWEEP, 2026) and has completed an Occupational Safety and Health Orientation, a Basic Computer Networking Workshop and programming workshops. John is a member of the Institute of Computer Engineers of the Philippines (ICpEP) and participated in the 16th CODEE Region XI Engineering Congress.",
      next: ["awards", "degree"] },
    { id: "membership", q: "Is John part of any professional organization?", keys: ["member", "membership", "organization", "organisation", "icpep", "affiliation", "congress", "codee", "conference"],
      a: "John is a member of the Institute of Computer Engineers of the Philippines (ICpEP) and participated in the 16th CODEE Region XI Engineering Congress.",
      next: ["training", "awards"] },
    { id: "goals", q: "What are John’s career goals?", keys: ["goal", "goals", "career", "future", "plan", "plans", "five years", "5 years", "aspiration", "aspirations", "roadmap", "long term", "short term", "ambition", "ambitions", "dream", "vision", "ten years", "10 years", "three years", "next step", "next steps"],
      a: "In the next one to three years, John plans to complete the degree and on-the-job training, improve programming skills, build more monitoring and automation projects, and develop leadership, project management and communication skills. In three to five years, John aims to build a career in the tech industry, design and deploy real-world technology solutions, and join research and development on automation and smart systems. In five to ten years, John aims to become a recognized expert, contribute to food security and resource management, and mentor future IT professionals in local communities.",
      links: [{ text: "See the Career roadmap", href: "#roadmap" }], next: ["sectors", "motivation", "contact"] },
    { id: "contact", q: "How can I contact John?", keys: ["contact", "email", "e-mail", "reach", "message", "get in touch", "interview", "schedule", "hire john", "reach out", "talk to john", "get hold", "contact details", "contact info", "connect"],
      a: "Email is the preferred way to reach John, including to schedule an interview: " + EMAIL + ". John’s resume and GitHub profile are also available below.",
      links: [MAILTO, { text: "Download resume (PDF)", href: "assets/Johnstheward-Alvarado-Resume.pdf", download: true }, { text: "GitHub profile", href: "https://github.com/JSAlvarado" }],
      next: ["availability", "overview"] },
    { id: "resume", q: "May I have John’s resume?", keys: ["resume", "cv", "curriculum vitae", "download", "biodata", "resume pdf", "copy of"],
      a: "Yes. John’s resume is available as a PDF download.",
      links: [{ text: "Download resume (PDF)", href: "assets/Johnstheward-Alvarado-Resume.pdf", download: true }], next: ["contact", "skills"] },
    { id: "github", q: "Where can I see John’s work online?", keys: ["github", "online", "work samples", "linkedin", "profile", "links", "repositories", "repository", "repo", "socials", "social media"],
      a: "John’s work is presented on this website, and John’s GitHub profile is at github.com/JSAlvarado. John has not listed a LinkedIn profile; please contact John directly for other links.",
      links: [{ text: "GitHub profile", href: "https://github.com/JSAlvarado" }], next: ["otherprojects", "contact"] },
    { id: "bot", q: "Am I talking to John?", keys: ["are you", "who are you", "bot", "robot assistant", "assistant", "real person", "human", "source", "information from", "stored", "data", "privacy", "chatbot", "automated", "who am i talking to", "ai assistant"],
      a: "No. This is an automated assistant for John’s portfolio. It answers only from John’s resume, portfolio, career plan and this website, current as of October 2026. Your questions are processed in your browser and are not stored.",
      next: ["overview", "contact"] },
    { id: "experience", q: "What is John’s work experience?", keys: ["experience", "work experience", "employment", "worked", "jobs", "work history", "previous roles", "job history", "past jobs", "work background", "previous jobs", "previous work", "employment history"],
      a: "John’s experience includes: Wireless Engineering Trainee, Smart Communications, Inc. (SWEEP), 2026; Network and CCTV Technician, Anawim Elementary School, Inc., 2024; and Data Entry and Sales Inventory Clerk, various assignments in Davao City, 2023.",
      links: [{ text: "See the Experience section", href: "#experience" }], next: ["sweep", "anawim", "clerk"] }
  ];

  // ---- Topics that need John's own answer: replied to with a topic-specific referral to email ----
  // ko = the topic in Korean; Korean keywords sit in the same keys list
  const REFER = [
    { topic: "John’s expected graduation date", ko: "John의 졸업 예정일", keys: ["graduate", "graduation", "graduating", "finish school", "졸업"] },
    { topic: "John’s available start date", ko: "John의 근무 시작 가능일", keys: ["start date", "when can john start", "can john start", "start working", "start work", "join", "notice", "시작일", "언제부터", "입사", "출근"] },
    { topic: "employment type and work arrangements", ko: "고용 형태와 근무 방식", keys: ["full-time", "full time", "part-time", "part time", "remote", "hybrid", "onsite", "on-site", "work from home", "shift", "shifts", "weekend", "weekends", "overtime", "정규직", "계약직", "파트타임", "아르바이트", "재택", "원격 근무", "하이브리드", "교대", "주말", "야근", "초과 근무"] },
    { topic: "travel and licensing", ko: "출장과 면허", keys: ["travel", "license", "licence", "driver", "drive", "passport", "visa", "work permit", "출장", "면허", "운전", "여권", "비자", "취업 허가"] },
    { topic: "the languages John speaks", ko: "John이 구사하는 언어", keys: ["speak", "speaks", "english", "tagalog", "filipino", "bisaya", "cebuano", "한국어", "영어", "타갈로그", "필리핀어", "세부아노", "비사야", "구사"] },
    { topic: "why John changed degree programs", ko: "John이 전공을 바꾼 이유", keys: ["switch", "switched", "shifted", "transfer", "transferred", "electronics to computer", "전과", "전공을 바꾼", "전공 변경", "편입"] },
    { topic: "FLOATech’s sensors, measured parameters and connectivity", ko: "FLOATech의 센서, 측정 항목, 통신 방식", keys: ["which sensors", "what sensors", "parameters", "ph", "temperature", "oxygen", "turbidity", "internet", "wifi module", "app", "remote monitoring", "iot connection", "gsm", "gsm module", "sms", "text alert", "text alerts", "어떤 센서", "무슨 센서", "측정 항목", "수온", "온도", "산소", "탁도", "원격 모니터링", "어플", "애플리케이션", "문자", "알림"] },
    { topic: "FLOATech’s results, challenges, cost and timeline", ko: "FLOATech의 결과, 어려움, 비용, 일정", keys: ["results", "outcome", "outcomes", "challenge", "challenges", "problem", "problems", "cost", "budget", "timeline", "how long", "improve floatech", "next version", "결과", "어려움", "문제점", "비용", "예산", "기간", "얼마나 걸", "개선", "다음 버전"] },
    { topic: "specific tools, platforms and advanced skills", ko: "구체적인 도구, 플랫폼, 고급 기술", keys: ["git", "cisco", "routing", "switching", "subnet", "subnetting", "ip address", "fiber", "fibre", "pcb", "schematic", "schematics", "python", "c++", "java", "database", "databases", "sql", "linux", "kubernetes", "cloud", "aws", "시스코", "라우팅", "스위칭", "서브넷", "파이썬", "자바", "데이터베이스", "리눅스", "클라우드", "회로도"] },
    { topic: "examples from John’s experience", ko: "John의 경험 사례", keys: ["example", "situation", "time when", "tell me about a time", "leadership experience", "weakness", "weaknesses", "mistake", "failure", "leadership", "led", "initiative", "feedback", "supervision", "conflict", "사례", "예시", "예를 들", "리더십", "약점", "단점", "실수", "실패", "갈등", "피드백", "주도"] },
    { topic: "references", ko: "추천인", keys: ["reference", "references", "referee", "recommendation", "추천인", "추천서", "레퍼런스"] },
    { topic: "fit with your organization", ko: "귀사와의 적합성", keys: ["our company", "our organization", "culture", "why us", "join us", "expect", "expectations", "우리 회사", "저희 회사", "조직 문화", "회사 문화", "기대"] }
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

  // ---- Korean (site language switch in lang.js): the same answers, translated; no new facts ----
  const REPLY_KO = {
    welcome: "안녕하세요. Johnstheward S. Alvarado의 포트폴리오 자동 안내 도우미입니다. John의 경력, FLOATech 프로젝트, 기술 역량, 학력, 커리어 목표에 관한 질문에 답변해 드립니다. 무엇을 도와드릴까요?",
    notCovered: "질문해 주셔서 감사합니다. 해당 정보는 John의 프로필에 포함되어 있지 않습니다. 자세한 답변은 John에게 직접 문의해 주세요: " + EMAIL,
    greeting: "안녕하세요. John의 프로필에 대해 무엇을 도와드릴까요?",
    thanks: "John의 프로필에 관심을 가져 주셔서 감사합니다. 대화를 이어 가시려면 John에게 연락해 주세요: " + EMAIL,
    offTopic: "저는 John의 프로필에 관한 질문만 도와드릴 수 있습니다. John의 경력, 프로젝트, 기술에 대해 궁금한 점이 있으신가요?",
    sensitive: "이러한 내용은 John에게 직접 문의해 주세요: " + EMAIL,
    otherPerson: "저는 John 본인의 프로필에 관한 정보만 제공할 수 있습니다. 그 밖의 문의는 John에게 직접 연락해 주세요: " + EMAIL,
    commitment: "John을 대신해 약속을 드릴 수는 없습니다. 기회에 대해 논의하시려면 John에게 직접 연락해 주세요: " + EMAIL,
    unclear: "죄송합니다. 질문을 잘 이해하지 못했습니다. 다시 표현해 주시거나 아래 추천 주제 중 하나를 선택해 주세요.",
    inappropriate: "저는 John의 프로필에 관한 질문만 도와드릴 수 있습니다.",
    privacy: "질문은 브라우저 안에서만 처리되며 저장되지 않습니다."
  };
  const referReply = (r, l) => l === "ko"
    ? r.ko + "에 관한 정보는 John의 프로필에 포함되어 있지 않습니다. John에게 직접 문의해 주세요: " + EMAIL
    : "Information about " + r.topic + " is not included in John’s profile. Please contact John directly at " + EMAIL + ".";
  // Korean suggestion label (q), answer (a) and Korean keywords (keys) for each answer id above
  const KO = {
    overview: { q: "John은 어떤 사람인가요?", keys: ["누구", "소개", "프로필", "배경", "요약", "어떤 사람"],
      a: "John(Johnstheward S. Alvarado)은 필리핀 다바오시에 있는 Holy Cross of Davao College의 컴퓨터공학과 학생입니다. 기지국 설치, Wi-Fi 및 CCTV 구축, 하드웨어 문제 해결 분야의 실무 경험이 있으며, 2026년 Smart Communications의 Wireless Engineering Education Program(SWEEP)을 수료했습니다. 주요 관심 분야는 네트워킹, 임베디드 시스템, IoT입니다." },
    status: { q: "John의 현재 상황은 어떤가요?", keys: ["현재", "상황", "재학", "학년", "학생"],
      a: "John은 현재 Holy Cross of Davao College에서 컴퓨터공학 학사 과정(2023년~현재)을 밟고 있으며, 지역에 관계없이 근무할 수 있습니다." },
    strengths: { q: "John의 핵심 강점은 무엇인가요?", keys: ["강점", "장점", "전문", "잘하는", "특기"],
      a: "John의 핵심 강점은 네트워킹 및 현장 업무(Wi-Fi 액세스 포인트 설치, 기지국 설치 지원, 케이블 연결 및 단자 처리, CCTV 설치, 네트워크 성능 모니터링), 하드웨어 문제 해결, 그리고 FLOATech 프로젝트에서 보여 준 마이크로컨트롤러 기반 임베디드 개발입니다. John은 절차를 철저히 따르고, 현장에서 안전하게 작업하며, 기술적인 문제를 쉬운 말로 설명합니다." },
    why: { q: "왜 John을 고려해야 하나요?", keys: ["채용", "왜 john", "뽑아야", "고용", "차별점", "경쟁력"],
      a: "John은 Smart Communications SWEEP 프로그램에서 얻은 현장 실무 경험과, 2026년에 두 차례 수상한 임베디드 시스템 설계 프로젝트 FLOATech를 함께 갖추고 있습니다. 절차를 철저히 따르고, 현장에서 안전하게 작업하며, 비기술 직원에게도 기술적인 문제를 명확하게 설명합니다." },
    sectors: { q: "John은 어떤 산업 분야와 잘 맞나요?", keys: ["산업", "업계", "분야", "관심 분야"],
      a: "John의 경력은 네트워킹 및 통신 분야, 그리고 임베디드 시스템과 IoT 분야와 가장 잘 맞습니다. 장기적으로는 식량 안보와 자원 관리 분야의 혁신에 기여하는 것을 목표로 합니다." },
    position: { q: "John은 어떤 직무를 찾고 있나요?", keys: ["직무", "포지션", "직책", "일자리", "구직", "찾고 있"],
      a: "John은 근무지에 관계없이 기술 분야의 새로운 기회에 열려 있습니다." },
    availability: { q: "John은 지금 근무할 수 있나요?", keys: ["근무 가능", "가능한가", "이사", "이주", "해외", "외국", "타지역", "어디서든", "근무할 수"],
      a: "네. John은 지역에 관계없이 근무할 수 있으며, 다바오시 외 지역의 기회에도 열려 있습니다." },
    location: { q: "John은 어디에 있나요?", keys: ["어디", "위치", "거주", "사는 곳", "지역", "필리핀", "다바오", "출신"],
      a: "John은 필리핀 다바오시를 기반으로 활동하고 있습니다." },
    ojt: { q: "John은 OJT가 가능한가요?", keys: ["인턴", "실습", "현장 실습"],
      a: "현장 실습(OJT)을 마치는 것은 John의 단기 목표 중 하나입니다. 구체적인 일정과 조건은 John에게 직접 문의해 주세요." },
    degree: { q: "John은 무엇을 공부하고 있나요?", keys: ["전공", "학위", "학교", "대학", "학력", "공부", "교육", "고등학교", "컴퓨터공학"],
      a: "John은 Holy Cross of Davao College에서 컴퓨터공학 학사 과정(2023년~현재)을 밟고 있습니다. 이전에는 전자통신공학 학사 과정(2022~2023년)에 재학했으며, Davao City National High School에서 중학교와 고등학교 과정(2016~2022년)을 마쳤습니다." },
    research: { q: "John은 연구를 한 적이 있나요?", keys: ["연구", "논문", "캡스톤", "졸업 작품", "포스터", "설계 프로젝트"],
      a: "네. John은 틸라피아 양식장을 위한 아두이노 기반 부유식 장치 FLOATech를 개발한 4인 팀의 일원이었으며, 이 프로젝트는 Holy Cross of Davao College의 CET Research Conference(Conversazione 2026)에서 2nd Best Research Poster를 받았습니다." },
    sweep: { q: "John은 Smart Communications에서 무엇을 했나요?", keys: ["스마트", "스윕", "교육생", "통신사"],
      a: "John은 Smart Communications의 SWEEP 프로그램(2026)에서 Wireless Engineering Trainee로서 엔지니어들의 기지국 설치를 지원하고, 네트워크 성능 데이터를 기록·분석했으며, 네트워크 장비 관리 소프트웨어에서 랙과 보드 상태를 점검했습니다. 또한 팀의 내부 문서를 더 빠르게 작성할 수 있도록 HTML 페이지와 AI 프롬프트를 만들었습니다. 프로그램을 수료하고 수료증을 받았습니다." },
    cellsite: { q: "John은 기지국에서 어떤 일을 했나요?", keys: ["기지국", "안테나", "철탑", "현장 작업", "접지", "피더", "설치 작업"],
      a: "SWEEP 기간 동안 John은 현장 안전 수칙을 준수하며 엔지니어들의 기지국 설치를 지원했고, 옥외 무선 장비의 피더 케이블과 접지 케이블을 연결하고 단자 처리했습니다." },
    tools: { q: "John은 어떤 네트워크 분석 도구를 사용하나요?", keys: ["도구", "툴", "분석", "모니터링", "성능", "데이터"],
      a: "John은 네트워크 모니터링을 지원하기 위해 Microsoft Excel, Ookla Insights, CellMapper로 네트워크 성능 데이터를 기록하고 분석했습니다. 또한 네트워크 장비 관리 소프트웨어에서 랙과 보드 상태를 점검해 하드웨어가 활성 상태로 정상 작동하는지 확인했습니다." },
    docs: { q: "John은 팀의 문서 작업을 어떻게 도왔나요?", keys: ["문서", "문서화", "업무 개선", "효율"],
      a: "Smart Communications에서 John은 HTML 페이지와 AI 프롬프트를 만들어 팀의 내부 문서를 더 빠르게 작성하고 더 쉽게 활용할 수 있도록 했습니다." },
    safety: { q: "John은 작업장 안전을 어떻게 지키나요?", keys: ["안전", "보건", "보호구", "위험"],
      a: "John은 기지국 설치 중 현장 안전 수칙을 준수했으며, 산업안전보건(OSH) 오리엔테이션을 이수했습니다." },
    anawim: { q: "Network and CCTV Technician으로서 John은 무엇을 했나요?", keys: ["카메라", "기술자", "와이파이", "액세스 포인트", "초등학교", "감시"],
      a: "2024년 John은 다바오시 Anawim Elementary School, Inc.의 Network and CCTV Technician으로서 유선 Wi-Fi 액세스 포인트를 설치·설정해 학교에 안정적인 연결을 제공하고, 캠퍼스 전역에 CCTV 카메라를 설치했으며, 기본적인 문제 해결과 교사 및 직원 대상 현장 기술 지원을 담당했습니다." },
    clerk: { q: "사무원으로서 John은 무엇을 했나요?", keys: ["사무", "데이터 입력", "재고", "엑셀", "판매", "영업", "행정", "기록"],
      a: "2023년 John은 다바오시의 여러 근무지에서 Data Entry and Sales Inventory Clerk으로 일하며 Microsoft Excel로 디지털 기록과 재고 데이터를 정확한 최신 상태로 관리했고, 재고 추적과 행정 조율로 영업 업무를 지원했으며, 여러 업무를 동시에 처리하는 경우가 많았습니다." },
    floatech: { q: "FLOATech는 무엇인가요?", keys: ["플로텍", "플로테크", "틸라피아", "물고기", "양식", "양어장", "연못", "수질", "부유식"],
      a: "FLOATech는 틸라피아(Oreochromis niloticus) 양식장을 위한 아두이노 기반 태양광 부유식 장치로, 2026년 Holy Cross of Davao College의 4인 팀이 실제 연못에서 제작하고 시험했습니다. 수질을 실시간으로 모니터링하고, 정해진 일정에 따라 먹이를 주며, 폭기를 수행합니다. 농가가 연못을 직접 확인하는 시간을 줄일 수 있도록 설계되었습니다." },
    role: { q: "FLOATech에서 John의 역할은 무엇이었나요?", keys: ["역할", "담당", "기여", "팀장", "맡은", "참여"],
      a: "John은 FLOATech 4인 팀의 팀원(팀장 아님)으로, 프로젝트 전반에 걸쳐 직접 작업했습니다. 여기에는 직접 납땜한 회로 기판, 전압 레귤레이터, LCD, 키패드, 센서를 내후성 함체에 넣은 제어 전자 장치를 조립하고 시험하는 일이 포함됩니다." },
    functions: { q: "FLOATech의 주요 기능은 무엇인가요?", keys: ["기능", "급이", "먹이", "폭기", "디퓨저", "마이크로버블", "작동"],
      a: "FLOATech의 주요 기능은 세 가지입니다. 수질 측정 센서를 통한 실시간 수질 모니터링, 일정에 따른 자동 급이, 마이크로버블 디퓨저를 통한 자동 폭기입니다. 아두이노 제어부에는 LCD와 키패드가 있으며, GSM 모듈도 탑재되어 있습니다." },
    power: { q: "FLOATech는 어떻게 전원을 얻고 보호되나요?", keys: ["전원", "전력", "태양광", "배터리", "충전", "방수", "함체", "배럴", "에너지"],
      a: "FLOATech는 태양광 패널, 충전 컨트롤러, 배터리로 이루어진 독립 전원으로 작동합니다. 전자 장치는 부력 배럴로 만든 폰툰 프레임 위의 내후성 함체 안에 들어 있습니다." },
    awards: { q: "John은 어떤 상을 받았나요?", keys: ["수상", "상을", "상장", "우승", "대회", "입상", "성과", "업적"],
      a: "John의 수상 내역은 다음과 같습니다. 네트워킹 대회 Champion(2025), Holy Cross of Davao College TechnoFair 2026 Best Design Project Exhibit 부문 Second Runner Up(FLOATech), Holy Cross of Davao College CET Research Conference Conversazione 2026 2nd Best Research Poster(FLOATech). 상장은 수상 섹션에서 볼 수 있습니다." },
    otherprojects: { q: "John은 다른 어떤 프로젝트를 했나요?", keys: ["프로젝트", "함수 발생기", "앰프", "증폭기", "스피커", "로봇", "코봇", "작품"],
      a: "FLOATech 외에도 John의 프로젝트로는 기본 함수 발생기 회로, 스피커가 달린 모노 앰프, 네 다리로 걷는 상자형 보행 코봇(협동 로봇), 그리고 Claude Code의 도움을 받아 HTML, CSS, JavaScript로 제작하고 GitHub Pages에 호스팅한 이 포트폴리오 웹사이트가 있습니다." },
    website: { q: "이 웹사이트는 어떻게 만들었나요?", keys: ["웹사이트", "사이트", "홈페이지", "이 페이지"],
      a: "이 포트폴리오는 Anthropic의 AI 코딩 어시스턴트인 Claude Code의 도움을 받아 HTML, CSS, JavaScript로 제작했으며, GitHub Pages에 호스팅되어 있습니다." },
    skills: { q: "John의 기술 역량은 무엇인가요?", keys: ["기술", "역량", "스킬", "능력", "자격"],
      a: "John의 기술은 네 가지로 나뉩니다. 네트워킹 및 현장 업무(Wi-Fi 액세스 포인트 설치 및 설정, 기지국 설치 지원, 케이블 연결 및 단자 처리, CCTV 설치, 네트워크 성능 모니터링, 기초 네트워킹, 현장 안전 절차), 하드웨어 및 임베디드(하드웨어 문제 해결, 마이크로컨트롤러 및 임베디드 개발, 센서 및 자동화, 태양광 발전 시스템), 소프트웨어 및 도구(Claude Code, HTML, CSS, JavaScript, Microsoft Excel, Ookla Insights, CellMapper, 문서화를 위한 AI 프롬프트 작성), 협업 및 소통(비기술 직원 대상 현장 지원, 명확한 기술 설명, 정확한 데이터 입력 및 기록 관리, 마감 기한 내 팀워크)입니다." },
    network: { q: "John은 어떤 네트워킹 경험이 있나요?", keys: ["네트워크", "네트워킹", "무선", "케이블", "통신", "인터넷", "랜선", "공유기"],
      a: "John의 네트워킹 경험으로는 학교 캠퍼스의 유선 Wi-Fi 액세스 포인트 설치 및 설정, Smart Communications에서의 기지국 설치 지원, 케이블 연결 및 단자 처리, 네트워크 성능 모니터링, 기초 네트워킹이 있습니다. 또한 2025년 네트워킹 대회에서 Champion을 차지했습니다." },
    competition: { q: "네트워킹 대회는 어떤 대회였나요?", keys: ["네트워킹 대회"],
      a: "John은 2025년 네트워킹 대회에서 Champion을 차지했습니다. 대회에 대한 자세한 내용은 John의 프로필에 포함되어 있지 않으니 John에게 직접 문의해 주세요." },
    hardware: { q: "John은 어떤 하드웨어 및 임베디드 경험이 있나요?", keys: ["하드웨어", "임베디드", "마이크로컨트롤러", "아두이노", "센서", "전자", "회로", "납땜", "사물인터넷", "수리", "컴퓨터"],
      a: "John의 하드웨어 및 임베디드 경험에는 하드웨어 문제 해결, 마이크로컨트롤러 및 임베디드 개발, 센서 및 자동화, 태양광 발전 시스템이 포함됩니다. FLOATech에서는 직접 납땜한 회로 기판, 전압 레귤레이터, LCD, 키패드, 센서를 포함한 아두이노 기반 제어 전자 장치를 조립하고 시험했습니다." },
    software: { q: "John은 어떤 소프트웨어와 프로그래밍 언어를 사용하나요?", keys: ["소프트웨어", "프로그래밍", "코딩", "코드", "개발", "언어", "자바스크립트", "웹 개발"],
      a: "John은 HTML, CSS, JavaScript, Microsoft Excel, Ookla Insights, CellMapper를 사용하며, Claude Code(AI 지원 개발)와 문서화를 위한 AI 프롬프트 작성을 활용합니다." },
    ai: { q: "John은 AI 도구를 어떻게 활용하나요?", keys: ["인공지능", "클로드", "프롬프트", "챗gpt", "생성형"],
      a: "John은 직접 만들어 보며 배우고, Anthropic의 AI 코딩 어시스턴트인 Claude Code를 활용해 코드 작성과 디버깅, 문제 해결, 작업 문서화, 웹 페이지 제작에 도움을 받습니다. Smart Communications에서는 팀의 문서를 더 빠르게 작성할 수 있도록 AI 프롬프트도 만들었습니다." },
    teamwork: { q: "John은 팀에서 어떻게 일하나요?", keys: ["팀워크", "협업", "팀에서", "마감"],
      a: "John은 마감 기한 내 팀워크를 자신의 기술 중 하나로 들고 있으며, SWEEP 기간에는 엔지니어들을 지원했고 FLOATech에서는 4인 팀으로 일했습니다." },
    communication: { q: "John은 비기술 직원과 어떻게 소통하나요?", keys: ["소통", "의사소통", "커뮤니케이션", "설명", "비기술"],
      a: "John은 기술적인 문제를 쉬운 말로 설명하며, 교사와 직원에게 현장 기술 지원을 제공한 경험이 있습니다." },
    learning: { q: "John은 새로운 기술을 어떻게 배우나요?", keys: ["배우", "학습", "배움", "성장", "적응", "독학"],
      a: "John은 임베디드 및 IoT 프로젝트를 설계하고, 웹 페이지를 만들고, Claude Code 같은 도구를 사용하면서 직접 만들어 보며 배웁니다. 프로그래밍 실력 향상과 모니터링·자동화 프로젝트 추가 개발은 John의 단기 목표에 포함되어 있습니다." },
    motivation: { q: "John의 동기는 무엇인가요?", keys: ["동기", "열정", "좋아하", "왜 엔지니어", "왜 공학", "영감"],
      a: "John은 효율성, 지속 가능성, 생산성을 높이는 기술을 만드는 데서 동기를 얻으며, 장기적으로 식량 안보와 자원 관리에 기여하는 것을 목표로 합니다." },
    training: { q: "John은 어떤 자격증과 교육을 이수했나요?", keys: ["자격증", "수료", "교육 이수", "연수", "워크숍", "세미나", "인증"],
      a: "John은 Smart Communications Wireless Engineering Education Program(SWEEP, 2026) 수료증을 보유하고 있으며, 산업안전보건 오리엔테이션, 기초 컴퓨터 네트워킹 워크숍, 프로그래밍 워크숍을 이수했습니다. Institute of Computer Engineers of the Philippines(ICpEP) 회원이며, 제16회 CODEE Region XI Engineering Congress에 참가했습니다." },
    membership: { q: "John은 전문 단체에 소속되어 있나요?", keys: ["회원", "단체", "협회", "소속", "학회"],
      a: "John은 Institute of Computer Engineers of the Philippines(ICpEP) 회원이며, 제16회 CODEE Region XI Engineering Congress에 참가했습니다." },
    goals: { q: "John의 커리어 목표는 무엇인가요?", keys: ["목표", "커리어", "미래", "계획", "포부", "로드맵", "장기", "단기", "비전", "꿈", "향후"],
      a: "John은 앞으로 1~3년 동안 학위 과정과 현장 실습(OJT)을 마치고, 프로그래밍 역량을 키우고, 모니터링·자동화 프로젝트를 더 많이 만들고, 리더십, 프로젝트 관리, 커뮤니케이션 역량을 기를 계획입니다. 3~5년 안에는 기술 업계에서 경력을 쌓고, 실제 현장에 쓰이는 기술 솔루션을 설계·구축하며, 자동화 및 스마트 시스템 연구개발에 참여하는 것을 목표로 합니다. 5~10년 안에는 인정받는 전문가로 성장하고, 식량 안보와 자원 관리에 기여하며, 지역 사회의 미래 IT 인재를 멘토링하는 것을 목표로 합니다." },
    contact: { q: "John에게 어떻게 연락하나요?", keys: ["연락", "이메일", "메일", "면접", "인터뷰", "문의"],
      a: "면접 일정 조율을 포함해 John에게 연락하는 가장 좋은 방법은 이메일입니다: " + EMAIL + ". John의 이력서와 GitHub 프로필도 아래에서 볼 수 있습니다." },
    resume: { q: "John의 이력서를 받을 수 있나요?", keys: ["이력서", "다운로드"],
      a: "네. John의 이력서는 PDF(영문)로 다운로드할 수 있습니다." },
    github: { q: "John의 작업을 온라인에서 어디서 볼 수 있나요?", keys: ["깃허브", "온라인", "링크드인", "링크", "저장소"],
      a: "John의 작업은 이 웹사이트에 소개되어 있으며, GitHub 프로필은 github.com/JSAlvarado입니다. LinkedIn 프로필은 등록되어 있지 않으니, 다른 링크는 John에게 직접 문의해 주세요." },
    bot: { q: "John과 대화하고 있는 건가요?", keys: ["너는 누구", "누구세요", "챗봇", "사람이야", "사람인가", "개인정보", "저장"],
      a: "아니요. 이 챗봇은 John의 포트폴리오를 위한 자동 안내 도우미입니다. 2026년 10월 기준 John의 이력서, 포트폴리오, 커리어 계획, 이 웹사이트의 내용으로만 답변합니다. 질문은 브라우저 안에서만 처리되며 저장되지 않습니다." },
    experience: { q: "John의 경력은 어떻게 되나요?", keys: ["경력", "경험", "일한", "직장"],
      a: "John의 경력은 다음과 같습니다. Smart Communications, Inc.(SWEEP) Wireless Engineering Trainee(2026), Anawim Elementary School, Inc. Network and CCTV Technician(2024), 다바오시 여러 근무지 Data Entry and Sales Inventory Clerk(2023)." }
  };
  const LINK_KO = {
    "Email John": "John에게 이메일 보내기",
    "See FLOATech on this page": "이 페이지에서 FLOATech 보기",
    "See the Awards section": "수상 섹션 보기",
    "See Other projects": "기타 프로젝트 보기",
    "Download resume (PDF)": "이력서 다운로드(PDF, 영문)",
    "GitHub profile": "GitHub 프로필",
    "See the Skills section": "기술 섹션 보기",
    "See the Career roadmap": "커리어 로드맵 보기",
    "See the Experience section": "경력 섹션 보기"
  };
  const UI = {
    en: { open: "Open chat assistant", close: "Close chat assistant", label: "Assistant", title: "Ask about John", closeChat: "Close chat",
      field: "Type your question", placeholder: "Type your question…", send: "Send", suggest: "Suggested questions" },
    ko: { open: "채팅 도우미 열기", close: "채팅 도우미 닫기", label: "어시스턴트", title: "John에 대해 물어보기", closeChat: "채팅 닫기",
      field: "질문을 입력하세요", placeholder: "질문을 입력하세요…", send: "보내기", suggest: "추천 질문" }
  };
  const lang = () => (window.siteLang && window.siteLang.get() === "ko" ? "ko" : "en");
  const HANGUL = /[가-힣]/;
  const replies = (l) => (l === "ko" ? REPLY_KO : REPLY);
  const qText = (e, l) => (l === "ko" ? KO[e.id].q : e.q);
  // Answers are matched on English and Korean keywords together
  const keysOf = (e) => e.keys.concat(KO[e.id].keys);

  // ---- Special intents, checked before the answers (Korean words included) ----
  const SENSITIVE = ["phone", "mobile", "cellphone", "telephone", "whatsapp", "viber", "contact number", "phone number", "home address", "street address", "residential address", "john address", "his address", "where does john live", "salary", "compensation", "hourly rate", "daily rate", "expected rate", "wage", "expected pay", "pay range", "age", "how old", "birthday", "birthdate", "born", "married", "relationship status", "girlfriend", "wife", "religion", "religious", "politics", "political", "gpa", "grade", "grades",
    "전화", "휴대폰", "핸드폰", "카톡", "카카오톡", "집 주소", "자택", "주소지", "상세 주소", "연봉", "월급", "급여", "시급이", "시급은", "나이", "몇 살", "생일", "생년월일", "결혼", "여자친구", "애인", "종교", "정치", "학점", "성적"];
  const OTHER_PERSON = ["teammate", "teammates", "classmate", "classmates", "colleague", "colleagues", "other candidate", "other candidates", "former employer", "boss",
    "팀원들", "다른 팀원", "동료", "동기들", "같은 동기", "상사", "다른 지원자", "전 고용주"];
  const COMMITMENT = ["accept", "job offer", "commit", "commitment", "guarantee", "promise", "on behalf", "수락", "약속", "보장", "대신해", "대신 약속", "확정"];
  const GREETING = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "good day", "greetings", "안녕", "반갑", "하이"];
  const THANKS = ["thank", "thanks", "thank you", "bye", "goodbye", "see you", "감사", "고마", "고맙", "안녕히", "잘 있어"];
  const OFF_TOPIC = ["weather", "joke", "news", "recipe", "movie", "song", "music", "game", "bitcoin", "crypto", "stock", "sports", "horoscope",
    "날씨", "농담", "뉴스", "레시피", "요리", "영화", "노래", "음악", "게임", "비트코인", "코인", "주식", "스포츠", "운세"];
  const INAPPROPRIATE = ["fuck", "shit", "bitch", "damn", "stupid", "idiot", "dumb", "sexy", "nude", "씨발", "시발", "병신", "개새", "좆", "바보", "멍청", "섹시", "야한 사진"];

  // ---- Matching helpers: whole-word / whole-phrase matches on normalized text ----
  // Accents are dropped ("résumé" → "resume") before possessives and punctuation are removed; Hangul is kept
  // (NFC puts Korean syllables back together after the accent step splits them)
  const normalize = (s) => " " + s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").normalize("NFC").toLowerCase().replace(/[’']s\b/g, "").replace(/[’']/g, "").replace(/[^a-z0-9+#\-\uac00-\ud7a3]+/g, " ").trim() + " ";
  // Korean particles attach to words ("기술은", "경력이"), so Korean keywords match anywhere in the text
  const has = (text, key) => HANGUL.test(key) ? text.includes(normalize(key).trim()) : text.includes(" " + normalize(key).trim() + " ");
  const hits = (text, keys) => keys.reduce((n, k) => n + (has(text, k) ? (k.includes(" ") ? 2 : 1) : 0), 0);
  // Blocking lists (privacy, greetings, off-topic…) match Korean only at the start of a word, so "해야한다" isn't "야한"
  const starts = (text, keys) => keys.some((k) => (HANGUL.test(k) ? text.includes(" " + normalize(k).trim()) : has(text, k)));
  const specificity = (text, keys) => keys.reduce((n, k) => n + (has(text, k) ? k.length : 0), 0);
  const better = (s, l, bestS, bestL) => s > bestS || (s === bestS && s > 0 && l > bestL);
  const byId = (id) => QA.find((e) => e.id === id);

  // ---- Forgiving keywords: word forms and small typos ----
  // Every word used in an answer or "ask John" keyword; visitor words are mapped onto this vocabulary
  const VOCAB = new Set();
  [...QA, ...REFER].forEach((e) => e.keys.forEach((k) => normalize(k).trim().split(" ").forEach((w) => VOCAB.add(w))));
  // Everyday words that are never "corrected" into a keyword
  const COMMON = new Set(["what", "when", "where", "which", "there", "their", "these", "those", "about", "would", "could",
    "should", "please", "does", "have", "john", "with", "from", "that", "this", "your", "they", "them", "into", "much",
    "many", "some", "tell", "give", "know", "also", "been", "being", "other", "using", "used", "make", "made", "time", "here"]);
  // Edit distance with swapped letters counted as one edit ("netwroking" → "networking")
  function distance(a, b) {
    const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
    for (let j = 1; j <= b.length; j++) d[0][j] = j;
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
    return d[a.length][b.length];
  }
  // Map one visitor word onto a known keyword word: same word, a simple word form, or a close spelling
  function toKeyword(w) {
    if (VOCAB.has(w) || COMMON.has(w) || w.length < 4 || HANGUL.test(w)) return w;
    const forms = [w.replace(/ies$/, "y"), w.replace(/es$/, ""), w.replace(/s$/, ""), w.replace(/ing$/, ""), w.replace(/ed$/, ""), w.replace(/ly$/, ""), w + "s"];
    const form = forms.find((f) => f !== w && VOCAB.has(f));
    if (form) return form;
    if (w.length < 5) return w;
    const limit = w.length >= 7 ? 2 : 1;
    let best = w, bestD = limit + 1;
    VOCAB.forEach((v) => {
      if (v.length < 4 || Math.abs(v.length - w.length) > limit) return;
      const dist = distance(w, v);
      if (dist < bestD) { best = v; bestD = dist; }
    });
    return best;
  }
  const forgiving = (text) => " " + text.trim().split(" ").filter(Boolean).map(toKeyword).join(" ") + " ";

  // An approved answer in one language: its text, links and follow-ups. make(l) rebuilds it in either language,
  // so a language switch can redraw the whole conversation
  const answerText = (e, l) => (l === "ko" ? KO[e.id].a : e.a);
  const local = (e, l) => ({ a: answerText(e, l), links: e.links, next: e.next, lang: l, make: (x) => ({ a: answerText(e, x), links: e.links }) });
  const fixed = (key) => (x) => replies(x)[key];

  // Decide the reply for a typed question (in Korean when the question is written in Korean, else in the page language)
  function answerFor(raw) {
    const l = HANGUL.test(raw) ? "ko" : lang();
    const text = normalize(raw);
    const words = text.trim().split(" ").filter(Boolean);
    const reply = (text, links) => ({ a: text(l), links, next: START, lang: l, make: (x) => ({ a: text(x), links }) });
    if (!/[a-z\uac00-\ud7a3]/.test(text) || words.length === 0) return reply(fixed("unclear"));
    if (starts(text, INAPPROPRIATE)) return reply(fixed("inappropriate"));
    // Private topics are also caught in plural form ("salaries", "phones")
    const singular = " " + text.trim().split(" ").map((w) => w.replace(/ies$/, "y").replace(/s$/, "")).join(" ") + " ";
    if (starts(text, SENSITIVE) || starts(singular, SENSITIVE)) return reply(fixed("sensitive"), [MAILTO]);
    if (starts(text, OTHER_PERSON)) return reply(fixed("otherPerson"), [MAILTO]);
    if (starts(text, COMMITMENT)) return reply(fixed("commitment"), [MAILTO]);
    if (words.length <= 4 && starts(text, THANKS)) return reply(fixed("thanks"), [MAILTO]);
    if (words.length <= 4 && starts(text, GREETING) && !QA.some((e) => hits(text, keysOf(e)))) return reply(fixed("greeting"));
    if (starts(text, OFF_TOPIC)) return reply(fixed("offTopic"));

    // Answers are matched on the forgiving text, so "skils", "FLOATek" and "certificates" still find their keywords
    const loose = forgiving(text);
    // Best approved answer vs best "ask John" topic; ties favor the approved answer
    let best = null, bestScore = 0, bestLen = 0;
    QA.forEach((e) => {
      const keys = keysOf(e), s = hits(loose, keys), n = specificity(loose, keys);
      if (better(s, n, bestScore, bestLen)) { best = e; bestScore = s; bestLen = n; }
    });
    let refer = null, referScore = 0;
    REFER.forEach((r) => { const s = hits(loose, r.keys); if (s > referScore) { refer = r; referScore = s; } });
    if (refer && referScore > bestScore) return reply((x) => referReply(refer, x), [MAILTO]);
    if (best) return local(best, l);
    return reply(fixed("notCovered"), [MAILTO]);
  }

  // ---- Build the floating button and the chatbox ----
  const fab = document.createElement("button");
  fab.type = "button";
  fab.className = "chat-fab";
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
    '<div class="chat-head"><div><p class="label"></p><h2 id="chat-title"></h2></div>' +
    '<button type="button" class="chat-close">✕</button></div>' +
    '<div class="chat-log"><div class="chat-thread" aria-live="polite"></div>' +
    '<div class="chat-suggest" role="group"></div></div>' +
    '<form class="chat-form"><label class="chat-sr" for="chat-input"></label>' +
    '<input id="chat-input" class="chat-input" type="text" autocomplete="off" maxlength="200">' +
    '<button type="submit" class="chat-send"></button></form>' +
    '<p class="chat-note"></p>';

  document.body.append(panel, fab);
  const log = panel.querySelector(".chat-log");
  const thread = panel.querySelector(".chat-thread");
  const suggest = panel.querySelector(".chat-suggest");
  const form = panel.querySelector(".chat-form");
  const input = panel.querySelector(".chat-input");

  // Fill in the chatbox labels in the page language (again whenever the language switch is used)
  function renderUI() {
    const l = lang(), u = UI[l];
    panel.lang = l;
    panel.querySelector(".chat-head .label").textContent = u.label;
    panel.querySelector("#chat-title").textContent = u.title;
    panel.querySelector(".chat-close").setAttribute("aria-label", u.closeChat);
    suggest.setAttribute("aria-label", u.suggest);
    panel.querySelector(".chat-sr").textContent = u.field;
    input.placeholder = u.placeholder;
    panel.querySelector(".chat-send").textContent = u.send;
    panel.querySelector(".chat-note").textContent = replies(l).privacy;
    fab.setAttribute("aria-label", isOpen() ? u.close : u.open);
  }

  // Add one message to the conversation (text only; links become real anchors)
  function say(who, text, links, l) {
    const msg = document.createElement("div");
    msg.className = "chat-msg chat-msg--" + who;
    if (l) msg.lang = l;
    const p = document.createElement("p");
    p.textContent = text;
    msg.append(p);
    (links || []).forEach((l) => {
      const a = document.createElement("a");
      a.className = "chat-link";
      a.href = l.href;
      a.textContent = msg.lang === "ko" ? LINK_KO[l.text] || l.text : l.text;
      if (l.download) a.setAttribute("download", "");
      if (l.href.startsWith("#")) a.addEventListener("click", () => close(false));
      msg.append(a);
    });
    thread.append(msg);
    return msg;
  }

  // Show suggestion buttons (follow-ups, or the starting topics); they sit in the scrolling conversation right after
  // the latest answer, so they never take space from the messages
  let shown = START;
  function showSuggestions(ids) {
    shown = ids;
    suggest.replaceChildren();
    const l = lang();
    ids.map(byId).filter(Boolean).forEach((e) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "chat-chip";
      b.textContent = qText(e, l);
      b.addEventListener("click", () => ask(qText(e, l), e));
      suggest.append(b);
    });
  }

  // Every message so far: typed questions as typed, picked suggestions and bot replies as recipes that can be
  // rebuilt in either language
  const history = [];
  function addUser(text, entry) {
    const l = entry ? lang() : HANGUL.test(text) ? "ko" : lang();
    history.push({ who: "user", text, entry, l });
    return say("user", text, null, l);
  }
  function addBot(make, l = lang()) {
    history.push({ who: "bot", make });
    const r = make(l);
    return say("bot", r.a, r.links, l);
  }
  // Redraw the whole conversation in the page language (after the language switch)
  function redraw() {
    const l = lang();
    thread.replaceChildren();
    history.forEach((h) => {
      if (h.who === "user") { h.entry ? say("user", qText(h.entry, l), null, l) : say("user", h.text, null, h.l); return; }
      const r = h.make(l);
      say("bot", r.a, r.links, l);
    });
    log.scrollTop = log.scrollHeight;
  }

  // Handle a question from a suggestion button or the text field
  function ask(text, entry) {
    const reply = entry ? local(entry, lang()) : answerFor(text);
    const question = addUser(text, entry);
    addBot(reply.make, reply.lang);
    showSuggestions(reply.next && reply.next.length ? reply.next : START);
    // Scroll so the new question and its answer start at the top of the conversation
    log.scrollTop += question.getBoundingClientRect().top - log.getBoundingClientRect().top - 12;
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
    if (!started) { addBot((x) => ({ a: replies(x).welcome })); showSuggestions(START); started = true; }
    fab.classList.add("is-active");
    fab.setAttribute("aria-expanded", "true");
    fab.setAttribute("aria-label", UI[lang()].close);
    panel.focus({ preventScroll: true });
  }
  function close(returnFocus = true) {
    panel.classList.remove("is-open");
    fab.classList.remove("is-active");
    fab.setAttribute("aria-expanded", "false");
    fab.setAttribute("aria-label", UI[lang()].open);
    if (returnFocus) fab.focus({ preventScroll: true });
  }
  const isOpen = () => panel.classList.contains("is-open");
  renderUI();
  // The language switch relabels the chatbox and redraws the conversation and suggestions in the new language
  // (visitors' own questions stay as they typed them)
  document.addEventListener("langchange", () => { renderUI(); if (started) { redraw(); showSuggestions(shown); } });
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
