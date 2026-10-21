// ============ LANGUAGE SWITCH: English / Korean (see .claude/rules/content.md) ============
// index.html is written in English. This file swaps the visible text, alt text and labels for their Korean
// translations and back. Translations say the same as the English page, nothing more. Without JavaScript the page stays English.
(() => {
  "use strict";

  const KEY = "siteLang";

  // ---- Korean translations, keyed by the English text as it appears on the page (spaces collapsed) ----
  // Job titles, award rankings and proper names stay in English, exactly as written.
  const KO = {
    // Head, navigation and labels set by script.js
    "Johnstheward S. Alvarado | Computer Engineering": "Johnstheward S. Alvarado | 컴퓨터공학",
    "Johnstheward S. Alvarado, Computer Engineering student in Davao City. Network and field technical support experience as a Smart Communications SWEEP trainee, plus the FLOATech Arduino-based monitoring and automation design project.":
      "필리핀 다바오시의 컴퓨터공학과 학생 Johnstheward S. Alvarado. Smart Communications SWEEP 교육생으로 쌓은 네트워크 및 현장 기술 지원 경험과 아두이노 기반 모니터링·자동화 설계 프로젝트 FLOATech.",
    "Skip to content": "본문으로 건너뛰기",
    "Open menu": "메뉴 열기",
    "Close menu": "메뉴 닫기",
    "Sections": "섹션",
    "About": "소개",
    "Projects": "프로젝트",
    "Skills": "기술",
    "Experience": "경력",
    "Awards": "수상",
    "Education": "학력",
    "Roadmap": "로드맵",
    "Contact": "연락처",
    "Copy": "복사",
    "Copied!": "복사됨!",
    "Copy failed": "복사 실패",
    "Photo viewer. Press Escape or click to close.": "사진 뷰어. Esc 키를 누르거나 클릭하면 닫힙니다.",

    // Hero
    "Introduction": "인트로",
    "Available for work, anywhere": "지역에 관계없이 근무 가능",
    "John installs, tests and troubleshoots the hardware that keeps people connected, from helping install cell site equipment with Smart Communications to setting up Wi-Fi and CCTV for a school campus.":
      "John은 사람들을 연결하는 하드웨어를 설치하고, 시험하고, 문제를 해결합니다. Smart Communications에서 기지국 장비 설치를 지원한 일부터 학교 캠퍼스의 Wi-Fi와 CCTV를 구축한 일까지 해 왔습니다.",
    "Get in touch": "연락하기",
    "See FLOATech": "FLOATech 보기",
    "Download resume": "이력서 다운로드",
    "Based in": "활동 지역",
    "Davao City, Philippines": "필리핀 다바오시",
    "Studying": "전공",
    "BS Computer Engineering, Holy Cross of Davao College": "Holy Cross of Davao College 컴퓨터공학 학사 과정",
    "Field experience": "현장 경험",
    "Cell site installation, Wi-Fi access points, CCTV": "기지국 설치, Wi-Fi 액세스 포인트, CCTV",
    "Looking for": "희망 분야",
    "New opportunities in tech": "기술 분야의 새로운 기회",

    // 01 About
    "01. About": "01. 소개",
    "John is a Computer Engineering student at Holy Cross of Davao College with hands-on experience in cell site installation, Wi-Fi and CCTV setup, and hardware troubleshooting. In 2026 John completed Smart Communications’ Wireless Engineering Education Program (SWEEP), assisting engineers with cell site installation.":
      "John은 Holy Cross of Davao College의 컴퓨터공학과 학생으로, 기지국 설치, Wi-Fi 및 CCTV 구축, 하드웨어 문제 해결 분야의 실무 경험을 갖추고 있습니다. 2026년에는 Smart Communications의 Wireless Engineering Education Program(SWEEP)을 수료했으며, 이 과정에서 엔지니어들의 기지국 설치 작업을 지원했습니다.",
    "John follows procedures closely, works safely on site, explains technical problems in plain language, and is building toward a career in embedded systems, IoT and networking.":
      "John은 절차를 철저히 따르고, 현장에서 안전하게 작업하며, 기술적인 문제를 쉬운 말로 설명합니다. 임베디드 시스템, IoT, 네트워킹 분야의 커리어를 목표로 하고 있습니다.",
    "John learns by building, and uses": "John은 직접 만들어 보며 배우고, Anthropic의 AI 코딩 어시스턴트인",
    ", Anthropic’s AI coding assistant, to help write and debug code, work through problems, document work and build web pages, including this one.":
      "를 활용해 코드 작성과 디버깅, 문제 해결, 작업 문서화, 그리고 이 사이트를 포함한 웹 페이지 제작에 도움을 받습니다.",

    // 02 FLOATech
    "An Arduino-based, solar-powered floating unit for tilapia farms. It looks after a fish pond automatically, designed so farmers of":
      "틸라피아 양식장을 위한 아두이노 기반의 태양광 부유식 장치입니다. 양어장을 자동으로 관리하며,",
    "(Nile tilapia) spend less time checking the pond by hand. Built and tested on a real pond by a four-person team at Holy Cross of Davao College, 2026.":
      "(나일틸라피아) 양식 농가가 연못을 직접 확인하는 시간을 줄일 수 있도록 설계되었습니다. 2026년 Holy Cross of Davao College의 4인 팀이 실제 연못에서 제작하고 시험했습니다.",
    "Animated drawing of FLOATech on a pond": "연못 위에서 작동하는 FLOATech 애니메이션 그림",
    "The floating unit bobs on the water. The feeder throws feed onto the surface, a plume of fine bubbles rises from the microbubble diffuser beside the sensor probe under the water and signal waves show the GSM module's antenna.":
      "부유식 장치가 물 위에서 흔들립니다. 급이기가 수면 위로 사료를 뿌리고, 물속 센서 프로브 옆의 마이크로버블 디퓨저에서 미세한 기포가 올라오며, 신호 파형이 GSM 모듈의 안테나를 나타냅니다.",
    "Fig. 01 · How FLOATech works on the pond": "그림 01 · 연못에서 FLOATech가 작동하는 방식",
    "Real-time water monitoring": "실시간 수질 모니터링",
    "Water-parameter sensors with real-time feedback monitoring.": "수질 측정 센서로 실시간 피드백 모니터링을 합니다.",
    "Automated feeding": "자동 급이",
    "An automated feeder that feeds the fish on schedule.": "정해진 일정에 따라 물고기에게 먹이를 주는 자동 급이기입니다.",
    "Water aeration": "폭기(산소 공급)",
    "Runs water aeration for the pond automatically.": "연못의 폭기를 자동으로 수행합니다.",
    "The FLOATech floating unit deployed on a tilapia pond": "틸라피아 연못에 설치된 FLOATech 부유식 장치",
    "The FLOATech unit deployed on a tilapia pond": "틸라피아 연못에 설치된 FLOATech 장치",
    "Feeder": "급이기",
    "GSM module": "GSM 모듈",
    "Sensor monitoring": "센서 모니터링",
    "Microbubble diffuser": "마이크로버블 디퓨저",
    "Parts shown in the photo": "사진 속 부품",
    "01. Feeder": "01. 급이기",
    "02. GSM module": "02. GSM 모듈",
    "03. Sensor monitoring": "03. 센서 모니터링",
    "04. Microbubble diffuser": "04. 마이크로버블 디퓨저",
    "What went into it": "구성 요소",
    "Arduino control with custom-soldered circuit boards, voltage regulators, LCD and keypad": "직접 납땜한 회로 기판, 전압 레귤레이터, LCD, 키패드로 구성된 아두이노 제어부",
    "Solar panel, charge controller and battery for off-grid power": "독립 전원을 위한 태양광 패널, 충전 컨트롤러, 배터리",
    "Weatherproof enclosures on a pontoon frame of buoyant barrels": "부력 배럴로 만든 폰툰 프레임 위의 내후성 함체",
    "Microbubble diffuser for aeration and a GSM module": "폭기를 위한 마이크로버블 디퓨저와 GSM 모듈",
    "Recognized twice in 2026: Second Runner Up, Best Design Project Exhibit (TechnoFair 2026), and 2nd Best Research Poster (CET Research Conference, Conversazione 2026).":
      "2026년 두 차례 수상: Best Design Project Exhibit 부문 Second Runner Up(TechnoFair 2026), 2nd Best Research Poster(CET Research Conference, Conversazione 2026).",
    "Topics": "주제",
    "Arduino": "아두이노",
    "Sensors": "센서",
    "Automation": "자동화",
    "Solar power": "태양광 발전",
    "Aquaculture tech": "양식 기술",
    "Wiring and testing the control electronics": "제어 전자 장치 배선 및 시험",
    "The team with the finished prototype": "완성된 시제품과 함께한 팀",
    "Accepting the research poster award at Conversazione 2026": "Conversazione 2026에서 연구 포스터 상을 받는 모습",

    // 03 Other projects
    "03. Other projects": "03. 기타 프로젝트",
    "Other projects": "기타 프로젝트",
    "Function generator": "함수 발생기",
    "A basic function generator circuit.": "기본적인 함수 발생기 회로입니다.",
    "Mono amplifier with speaker": "스피커가 달린 모노 앰프",
    "An audio amplifier circuit driving a speaker.": "스피커를 구동하는 오디오 증폭 회로입니다.",
    "Walking cobot": "보행 코봇",
    "A four-legged, box-type walking cobot (collaborative robot).": "네 다리로 걷는 상자형 보행 코봇(협동 로봇)입니다.",
    "This website": "이 웹사이트",
    "John’s portfolio site, built with HTML, CSS and JavaScript and hosted on GitHub Pages.": "HTML, CSS, JavaScript로 제작하고 GitHub Pages에 호스팅한 John의 포트폴리오 사이트입니다.",
    "Built with Claude Code": "Claude Code로 제작",

    // 04 Skills
    "04. Skills": "04. 기술",
    "Networking and field work": "네트워킹 및 현장 업무",
    "Wi-Fi access point installation and setup": "Wi-Fi 액세스 포인트 설치 및 설정",
    "Cell site installation support": "기지국 설치 지원",
    "Cable connection and termination": "케이블 연결 및 단자 처리",
    "CCTV installation": "CCTV 설치",
    "Network performance monitoring": "네트워크 성능 모니터링",
    "Basic networking": "기초 네트워킹",
    "Site safety procedures (OSH)": "현장 안전 절차(OSH)",
    "Hardware and embedded": "하드웨어 및 임베디드",
    "Hardware troubleshooting": "하드웨어 문제 해결",
    "Microcontroller and embedded development": "마이크로컨트롤러 및 임베디드 개발",
    "Sensors and automation": "센서 및 자동화",
    "Solar power systems": "태양광 발전 시스템",
    "Software and tools": "소프트웨어 및 도구",
    "Claude Code (AI-assisted development)": "Claude Code(AI 지원 개발)",
    "HTML, CSS and JavaScript": "HTML, CSS, JavaScript",
    "AI prompting for documentation": "문서화를 위한 AI 프롬프트 작성",
    "Working with people": "협업 및 소통",
    "On-site support for non-technical staff": "비기술 직원 대상 현장 지원",
    "Clear technical explanations": "명확한 기술 설명",
    "Accurate data entry and records": "정확한 데이터 입력 및 기록 관리",
    "Teamwork under deadlines": "마감 기한 내 팀워크",

    // 05 Experience
    "05. Experience": "05. 경력",
    "Assisted engineers with cell site installation, connecting and terminating feeder and grounding cables on outdoor radio units while following site safety protocols.":
      "현장 안전 수칙을 준수하며 엔지니어들의 기지국 설치를 지원했고, 옥외 무선 장비의 피더 케이블과 접지 케이블을 연결하고 단자 처리했습니다.",
    "Recorded and analyzed network performance data in Excel, Ookla Insights and CellMapper to support network monitoring.":
      "네트워크 모니터링을 지원하기 위해 Excel, Ookla Insights, CellMapper로 네트워크 성능 데이터를 기록하고 분석했습니다.",
    "Checked rack and board status in network equipment management software to confirm hardware was active and running normally.":
      "네트워크 장비 관리 소프트웨어에서 랙과 보드 상태를 점검해 하드웨어가 활성 상태로 정상 작동하는지 확인했습니다.",
    "Built HTML pages and AI prompts that made the team’s internal documentation faster to produce and easier to use.":
      "HTML 페이지와 AI 프롬프트를 만들어 팀의 내부 문서를 더 빠르게 작성하고 더 쉽게 활용할 수 있도록 했습니다.",
    "Completed the program and received a Certificate of Completion from Smart Communications.":
      "프로그램을 수료하고 Smart Communications로부터 수료증(Certificate of Completion)을 받았습니다.",
    "John terminating cables on an outdoor radio unit at a cell site": "기지국의 옥외 무선 장비에서 케이블 단자를 처리하는 John",
    "Terminating cables on an outdoor radio unit": "옥외 무선 장비의 케이블 단자 처리",
    "John receiving the SWEEP Certificate of Completion with Smart engineers": "Smart 엔지니어들과 함께 SWEEP 수료증을 받는 John",
    "Receiving the SWEEP Certificate of Completion": "SWEEP 수료증 수여",
    "Reviewing rack and board status on a laptop": "노트북으로 랙과 보드 상태를 확인하는 모습",
    "Reviewing rack and board status in equipment management software": "장비 관리 소프트웨어에서 랙과 보드 상태 확인",
    "Site visit with the engineering team and service truck": "엔지니어링 팀, 서비스 차량과 함께한 현장 방문",
    "Anawim Elementary School, Inc. · Davao City": "Anawim Elementary School, Inc. · 다바오시",
    "Installed and configured wired Wi-Fi access points to give the school reliable connectivity for daily operations.":
      "유선 Wi-Fi 액세스 포인트를 설치하고 설정해 학교의 일상 업무에 안정적인 네트워크 연결을 제공했습니다.",
    "Installed CCTV cameras across the campus and handled basic troubleshooting when problems came up.":
      "캠퍼스 전역에 CCTV 카메라를 설치하고, 문제가 생기면 기본적인 문제 해결을 담당했습니다.",
    "Gave on-site technical support to teachers and staff.": "교사와 직원에게 현장 기술 지원을 제공했습니다.",
    "Various assignments · Davao City": "여러 근무지 · 다바오시",
    "Kept digital records and inventory data accurate and up to date in Microsoft Excel.":
      "Microsoft Excel로 디지털 기록과 재고 데이터를 정확한 최신 상태로 관리했습니다.",
    "Supported sales operations with inventory tracking and administrative coordination, often handling several tasks at once.":
      "재고 추적과 행정 조율로 영업 업무를 지원했으며, 여러 업무를 동시에 처리하는 경우가 많았습니다.",

    // 06 Awards
    "06. Awards": "06. 수상",
    "Networking Competition": "네트워킹 대회",
    "March 2026": "2026년 3월",
    "May 2026": "2026년 5월",
    "TechnoFair 2026 Certificate of Recognition, Second Runner Up": "TechnoFair 2026 표창장, Second Runner Up",
    "TechnoFair 2026 certificate, Second Runner Up": "TechnoFair 2026 상장, Second Runner Up",
    "CET Research Conference 2026 Certificate of Recognition, 2nd Best Research Poster": "CET Research Conference 2026 표창장, 2nd Best Research Poster",
    "CET Research Conference 2026 certificate, 2nd Best Research Poster": "CET Research Conference 2026 상장, 2nd Best Research Poster",

    // 07 Education
    "07. Education": "07. 학력",
    "2023 to present": "2023년 ~ 현재",
    "BS Computer Engineering": "컴퓨터공학 학사 과정",
    "2022 to 2023": "2022년 ~ 2023년",
    "BS Electronics and Communications Engineering": "전자통신공학 학사 과정",
    "Previously enrolled": "이전 재학",
    "2016 to 2022": "2016년 ~ 2022년",
    "Junior and Senior High School": "중학교 및 고등학교",
    "Batch 2016": "2016년 졸업",
    "Elementary": "초등학교",
    "Training and memberships": "교육 및 소속 단체",
    "Certificate of Completion, Smart Wireless Engineering Education Program (SWEEP), 2026": "Smart Wireless Engineering Education Program(SWEEP) 수료증, 2026",
    "Occupational Safety and Health Orientation": "산업안전보건 오리엔테이션",
    "Basic Computer Networking Workshop": "기초 컴퓨터 네트워킹 워크숍",
    "Programming workshops": "프로그래밍 워크숍",
    "Member, Institute of Computer Engineers of the Philippines (ICpEP)": "Institute of Computer Engineers of the Philippines(ICpEP) 회원",
    "Participant, 16th CODEE Region XI Engineering Congress": "제16회 CODEE Region XI Engineering Congress 참가",

    // 08 Career roadmap
    "08. Career roadmap": "08. 커리어 로드맵",
    "Career roadmap": "커리어 로드맵",
    "John aims to become a Computer Engineering professional in embedded systems, IoT and networking, building technology that improves efficiency, sustainability and productivity.":
      "John은 임베디드 시스템, IoT, 네트워킹 분야의 컴퓨터공학 전문가가 되어 효율성, 지속 가능성, 생산성을 높이는 기술을 만드는 것을 목표로 합니다.",
    "1–3 years": "1–3년",
    "Build the foundation": "기반 다지기",
    "Complete the degree and on-the-job training": "학위 과정과 현장 실습(OJT) 이수",
    "Improve programming skills and build more monitoring and automation projects": "프로그래밍 역량 향상 및 모니터링·자동화 프로젝트 추가 개발",
    "Develop leadership, project management and communication skills": "리더십, 프로젝트 관리, 커뮤니케이션 역량 개발",
    "3–5 years": "3–5년",
    "Grow in industry": "업계에서 성장하기",
    "Build a career in the tech industry and take on more responsibility": "기술 업계에서 경력을 쌓으며 더 큰 책임 수행",
    "Design and deploy real-world technology solutions": "실제 현장에 쓰이는 기술 솔루션 설계 및 구축",
    "Join research and development on automation and smart systems": "자동화 및 스마트 시스템 연구개발 참여",
    "5–10 years": "5–10년",
    "Give back": "사회에 환원하기",
    "Become a recognized expert in the field": "분야에서 인정받는 전문가로 성장",
    "Contribute to innovation in food security and resource management": "식량 안보와 자원 관리 분야의 혁신에 기여",
    "Mentor future IT professionals in local communities": "지역 사회의 미래 IT 인재 멘토링",

    // 09 Contact and footer
    "09. Contact": "09. 연락처",
    "John is open to new opportunities, wherever the work is. Email is the fastest way to reach John.":
      "John은 근무지에 관계없이 새로운 기회에 열려 있습니다. 이메일이 John에게 가장 빠르게 연락하는 방법입니다.",
    "Download resume (PDF)": "이력서 다운로드(PDF, 영문)",
    "Location": "위치",
    "© 2026 Johnstheward S. Alvarado · Built with HTML, CSS, JavaScript and Claude Code": "© 2026 Johnstheward S. Alvarado · HTML, CSS, JavaScript, Claude Code로 제작",
    "Back to top ↑": "맨 위로 ↑",
    "Visits are counted anonymously with GoatCounter. No cookies are used.": "방문 수는 GoatCounter로 익명 집계되며, 쿠키는 사용하지 않습니다."
  };

  const clean = (s) => s.replace(/\s+/g, " ").trim();
  // Own keys only, so text like "constructor" is never looked up on the object prototype
  const own = (en) => Object.prototype.hasOwnProperty.call(KO, en);
  const SKIP = ".chat-panel, .chat-fab, script, style";

  // ---- Remember the English original of every translatable text and label, before anything changes ----
  const texts = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const en = clean(n.nodeValue);
    if (!own(en) || n.parentElement.closest(SKIP)) continue;
    // Keep the spaces around the text, so words next to <em> or <strong> stay apart
    const lead = n.nodeValue.match(/^\s*/)[0], trail = n.nodeValue.match(/\s*$/)[0];
    texts.push({ node: n, en: n.nodeValue, ko: lead + KO[en] + trail });
  }
  const labels = [];
  document.querySelectorAll("[alt], [aria-label]").forEach((el) => {
    if (el.closest(SKIP)) return;
    ["alt", "aria-label"].forEach((attr) => {
      const en = el.getAttribute(attr);
      if (en && own(clean(en))) labels.push({ el, attr, en, ko: KO[clean(en)] });
    });
  });
  const meta = document.querySelector('meta[name="description"]');
  const head = { title: document.title, description: meta ? meta.content : "" };

  // ---- The switch button, placed before the menu button so the tab order matches what phones show ----
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "lang-btn";
  document.querySelector(".nav-toggle").before(btn);
  // Screen readers hear the change, since the focused button's new name usually isn't announced
  const live = document.createElement("p");
  live.className = "sr-only";
  live.setAttribute("aria-live", "polite");
  document.body.append(live);

  // Noto Sans KR is loaded only when the Korean view is first shown, so English visitors never download it
  let fontLoaded = false;
  function loadKoreanFont() {
    if (fontLoaded) return;
    fontLoaded = true;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;800&display=swap";
    document.head.append(link);
  }

  let current = "en";
  const t = (en) => (current === "ko" && own(en) ? KO[en] : en);

  // Show one language everywhere, then tell script.js and chatbot.js to refresh their own labels
  function apply(lang, announce) {
    current = lang;
    const ko = lang === "ko";
    if (ko) loadKoreanFont();
    texts.forEach((x) => { x.node.nodeValue = ko ? x.ko : x.en; });
    labels.forEach((x) => x.el.setAttribute(x.attr, ko ? x.ko : x.en));
    document.documentElement.lang = lang;
    document.title = t(head.title);
    if (meta) meta.content = t(head.description);
    // The button names the other language, in that language
    btn.textContent = ko ? "English" : "한국어";
    btn.lang = ko ? "en" : "ko";
    btn.setAttribute("aria-label", ko ? "View this page in English" : "이 페이지를 한국어로 보기");
    if (announce) {
      live.lang = lang;
      live.textContent = ko ? "한국어로 표시됩니다." : "Now showing in English.";
      document.dispatchEvent(new CustomEvent("langchange", { detail: lang }));
    }
  }

  btn.addEventListener("click", () => {
    const next = current === "ko" ? "en" : "ko";
    apply(next, true);
    try { localStorage.setItem(KEY, next); } catch (e) { /* storage unavailable */ }
  });

  // ---- First visit: browsers whose first language is Korean start in Korean; afterwards the last choice is kept ----
  let start = "en";
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "ko") start = saved;
    else if (/^ko\b/i.test((navigator.languages || [])[0] || navigator.language || "")) start = "ko";
  } catch (e) { /* storage unavailable: use English */ }
  apply(start, false);

  window.siteLang = { get: () => current, t };
})();
