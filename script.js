/**
 * MISSION SUBMISSION — CORE JAVASCRIPT CONTROLLER
 * Advanced Glassmorphism Academic Mission Control
 */

(function () {
  "use strict";

  // --- STORAGE KEYS ---
  const STORAGE_KEYS = {
    ACCOUNTS: "mission_submission_accounts_v2", // map of userId -> { displayName, password, tasks, createdAt }
    THEME: "mission_submission_theme",
    CURRENT_USER: "mission_submission_current_user",
    QUOTE_INDEX: "mission_submission_quote_idx",
  };

  // --- 20 SITUATIONAL GUJARATI MOTIVATIONAL QUOTES ---
  const MOTIVATIONAL_PUNCHLINES = [
    {
      text: "Alya bhadva, phone muki de—submission tari gaand ni bahar ubhi che!",
      urgency: "DEADLINE IMMINENT",
      emoji: "🚨",
      subtext: "Phone muki ne files par focus kar",
      minTasks: 1,
    },
    {
      text: "Oye ch*ya, reels bandh kar, assignment patav nahi to mamra nahi tara marks bharai jase.",
      urgency: "CRITICAL ALERT",
      emoji: "💀",
      subtext: "Reels bandh kar, marks bharai jase",
      minTasks: 5,
    },
    {
      text: "Have besi ja la*a, deadline tari maa ni vaat jovati nathi.",
      urgency: "DO NOT PROCRASTINATE",
      emoji: "⚡",
      subtext: "Shanti thi bes ane submit kar",
      minTasks: 1,
    },
    {
      text: "Bhadva, “kale karish” karta karta have kale tari gaand par besi gayu che.",
      urgency: "ACTION REQUIRED",
      emoji: "📖",
      subtext: "Kal kyarey nathi aavti, aaje j kar",
      minTasks: 1,
    },
    {
      text: "Phone ma su la*a ghusi gayo che? Assignment khol ane kaam patav!",
      urgency: "FOCUS OVERHAUL",
      emoji: "📂",
      subtext: "Phone bandh, IDE ane assignment khol",
      minTasks: 1,
    },
    {
      text: "Oye gya, deadline aavi rahi che—tara excuses ni maa chi gai.",
      urgency: "NO EXCUSES",
      emoji: "🛑",
      subtext: "Bahana koi nai sambhle, output batav",
      minTasks: 4,
    },
    {
      text: "Have kaam kar bhadva, nahi to submission divse tara b*a pan kaam nahi aave.",
      urgency: "HIGH PRESSURE",
      emoji: "🔥",
      subtext: "Calendar samne joi le, speed 2x kar",
      minTasks: 8,
    },
    {
      text: "Alya la*a, laptop khol—Netflix tari degree complete nahi karvanu.",
      urgency: "START NOW",
      emoji: "💻",
      subtext: "Laptop khol, coding ane practicals chalu kar",
      minTasks: 1,
    },
    {
      text: "Ch*ya, have chill karvanu bandh—deadline tari gaand par countdown chalu kari chuki che.",
      urgency: "TIME RUNNING OUT",
      emoji: "⏰",
      subtext: "Countdown chalu che, backlog clear kar",
      minTasks: 10,
    },
    {
      text: "Bhadva, assignment blank che ane attitude evo ke IAS interview aapvano hoy!",
      urgency: "REALITY CHECK",
      emoji: "👀",
      subtext: "Attitude side ma muk, blank file bhar",
      minTasks: 3,
    },
    {
      text: "Have phone side ma muk la*a, nahi to charger thi tari gaand garam kari dau.",
      urgency: "DEADLINE IMMINENT",
      emoji: "🚨",
      subtext: "Phone side ma muk, submission portal chalu kar",
      minTasks: 2,
    },
    {
      text: "Oye g*ya, kaam patav—deadline aavi ne tari maa ni yaad karavse.",
      urgency: "PROFESSOR RADAR",
      emoji: "👨‍🏫",
      subtext: "Submission portal par sign karav",
      minTasks: 6,
    },
    {
      text: "Alya bhadva, submission etli najik che ke have tari gaand pan tension ma che.",
      urgency: "DEADLINE ACCELERATION",
      emoji: "🏃‍♂️",
      subtext: "Time dodto nathi, udi rahyo che",
      minTasks: 5,
    },
    {
      text: "La*a, ek vaar assignment kholi le—Google Drive pan tari halat joi ne roye che.",
      urgency: "BACKLOG OVERLOAD",
      emoji: "😱",
      subtext: "Drive pan rui pade che, upload kar",
      minTasks: 12,
    },
    {
      text: "Ch*ya, project baki, report baki, ane tu WhatsApp ma online—wah re bhadva!",
      urgency: "TAKE COMMAND",
      emoji: "🎯",
      subtext: "WhatsApp offline thai ja, execution start kar",
      minTasks: 4,
    },
    {
      text: "Have fatvi jase bhadva, deadline koi tari girlfriend nathi ke wait karti beshe.",
      urgency: "KNOCKING AT DOOR",
      emoji: "⚠️",
      subtext: "Deadline wait nathi karti, kaam khatam kar",
      minTasks: 5,
    },
    {
      text: "Oye laa, kaam patav nahi to viva ma tara ba ni pan viva levase.",
      urgency: "VIVA ALERT",
      emoji: "📝",
      subtext: "Lab manual ane viva prepare kar",
      minTasks: 7,
    },
    {
      text: "Bhadva, submission date countdown ma che ane tu haju “shu karvu?” puchhe che!",
      urgency: "POWER SURGE",
      emoji: "🚀",
      subtext: "Shu karvu e nai, direct code kar",
      minTasks: 3,
    },
    {
      text: "Alya g*ya, have ghantesh lagi jase—assignment patav, nahi to professor tara sapna ma pan aavse.",
      urgency: "SERVER WARNING",
      emoji: "🔌",
      subtext: "Assignment patav, professor approval lai le",
      minTasks: 6,
    },
    {
      text: "Have chani-mani kaam patavi de la*a, nahi to deadline divse tari gaand ane laptop banne garam thase.",
      urgency: "FINAL CLEARANCE",
      emoji: "🔒",
      subtext: "Zero excuses • 100% mission completed",
      minTasks: 1,
    },
  ];

  // --- SUBJECT CURRICULUM DATA MODEL ---
  const SUBJECTS_DATA = [
    {
      id: "aad",
      code: "AAD",
      name: "Analysis and Design of Algorithms",
      category: "BE05016011",
      deadline: "05/10/26",
      tasks: [
        {
          id: "aad_assign_1",
          type: "single",
          category: "Assignment",
          label: "Assignment 1 (Complexity & Dynamic Programming)",
          badge: "A1",
        },
        {
          id: "aad_practicals",
          type: "chip_group",
          category: "Practical",
          label: "Practicals 1 to 16",
          prefix: "P",
          count: 16,
        },
        {
          id: "aad_proj",
          type: "none",
          category: "Project",
          label: "No Project Required",
          badge: "None",
          badgeType: "none",
        },
      ],
    },
    {
      id: "ds",
      code: "DS",
      name: "Data Science",
      category: "BE05016021",
      deadline: "06/10/26",
      tasks: [
        {
          id: "ds_assign",
          type: "single",
          category: "Assignment",
          label: "Assignment (TBD / Placeholder)",
          badge: "TBD",
          badgeType: "tbd",
        },
        {
          id: "ds_practicals",
          type: "chip_group",
          category: "Practical",
          label: "Practicals 1 to 15",
          prefix: "P",
          count: 15,
        },
        {
          id: "ds_proj",
          type: "single",
          category: "Project",
          label: "Mini Project (Data Pipeline & Models)",
          badge: "Mini Proj",
        },
      ],
    },
    {
      id: "wad",
      code: "WAD",
      name: "Web Application Development",
      category: "BE05000281",
      deadline: "07/10/26",
      tasks: [
        {
          id: "wad_assign",
          type: "none",
          category: "Assignment",
          label: "No Assignment Required",
          badge: "None",
          badgeType: "none",
        },
        {
          id: "wad_practicals",
          type: "chip_group",
          category: "Practical",
          label: "Practicals 1 to 11",
          prefix: "P",
          count: 11,
        },
        {
          id: "wad_proj",
          type: "single",
          category: "Project",
          label: "Mini Project (Interactive Web App)",
          badge: "Mini Proj",
        },
      ],
    },
    {
      id: "pm",
      code: "PM",
      name: "Project Management",
      category: "Elective BE05000461",
      deadline: "08/10/26",
      tasks: [
        {
          id: "pm_assignments",
          type: "chip_group",
          category: "Assignment",
          label: "Assignments 1 to 5",
          prefix: "A",
          count: 5,
        },
        {
          id: "pm_research_paper",
          type: "chip_group",
          category: "Research Paper",
          label: "Research Paper (5 Topics containing SDG)",
          prefix: "SDG",
          count: 5,
        },
        {
          id: "pm_proj",
          type: "single",
          category: "Project",
          label: "Mini Project (Syllabus topic connecting SDG)",
          badge: "SDG Project",
        },
      ],
    },
    {
      id: "adbms",
      code: "ADBMS",
      name: "Advanced Database Management System",
      category: "BE05016031",
      deadline: "09/10/26",
      tasks: [
        {
          id: "adbms_assign",
          type: "none",
          category: "Assignment",
          label: "No Assignment Required",
          badge: "None",
          badgeType: "none",
        },
        {
          id: "adbms_practicals",
          type: "chip_group",
          category: "Practical",
          label: "Practicals 1 to 13",
          prefix: "P",
          count: 13,
        },
        {
          id: "adbms_proj",
          type: "none",
          category: "Project",
          label: "No Project Required",
          badge: "None",
          badgeType: "none",
        },
      ],
    },
    {
      id: "cs",
      code: "CS",
      name: "Cyber Security",
      category: "BE05016041",
      deadline: "12/10/26",
      tasks: [
        {
          id: "cs_assign",
          type: "none",
          category: "Assignment",
          label: "No Assignment Required",
          badge: "None",
          badgeType: "none",
        },
        {
          id: "cs_practicals",
          type: "chip_group",
          category: "Practical",
          label: "Practicals 1 to 8",
          prefix: "P",
          count: 8,
        },
        {
          id: "cs_proj",
          type: "none",
          category: "Project",
          label: "No Project Required",
          badge: "None",
          badgeType: "none",
        },
      ],
    },
  ];

  // --- STATE MANAGEMENT ---
  let appState = {
    theme: "dark",
    currentUser: null,      // Display Name (e.g. "Vyom")
    currentUserId: null,    // Normalized user key (e.g. "vyom")
    taskStatus: {},         // Map of taskId -> boolean for current active student
    searchQuery: "",
    activeFilter: "all",    // "all", "pending", "completed"
    currentQuoteIndex: 0,
    quoteShuffledList: [],
  };

  // --- DOM SELECTORS ---
  const DOM = {
    // Views
    loginView: document.getElementById("login-view"),
    dashboardView: document.getElementById("dashboard-view"),
    // Login
    loginForm: document.getElementById("login-form"),
    studentIdInput: document.getElementById("student-id"),
    passwordInput: document.getElementById("password"),
    togglePasswordBtn: document.getElementById("toggle-password-btn"),
    rememberMeCheck: document.getElementById("remember-me"),
    idError: document.getElementById("id-error"),
    passwordError: document.getElementById("password-error"),
    // Header & Actions
    userGreeting: document.getElementById("user-greeting"),
    themeToggleActions: document.querySelectorAll(".theme-toggle-action"),
    resetBtn: document.getElementById("reset-btn"),
    logoutBtn: document.getElementById("logout-btn"),
    // Progress
    progressBarFill: document.getElementById("progress-bar-fill"),
    progressBarAria: document.getElementById("progress-bar-aria"),
    progressPercentText: document.getElementById("progress-percent-text"),
    progressHeadline: document.getElementById("progress-headline"),
    progressSubtext: document.getElementById("progress-subtext"),
    ringIndicator: document.getElementById("ring-indicator"),
    radialPercent: document.getElementById("radial-percent"),
    missionStatusLabel: document.getElementById("mission-status-label"),
    statCompleted: document.getElementById("stat-completed"),
    statRemaining: document.getElementById("stat-remaining"),
    statTotal: document.getElementById("stat-total"),
    statSubjectsDone: document.getElementById("stat-subjects-done"),
    lastSyncedBadge: document.getElementById("last-synced-badge"),
    // Motivation Radar
    motivationBanner: document.getElementById("motivation-banner"),
    avatarEmoji: document.getElementById("avatar-emoji"),
    motivationUrgencyTag: document.getElementById("motivation-urgency-tag"),
    motivationPunchline: document.getElementById("motivation-punchline"),
    motivationSubtext: document.getElementById("motivation-subtext"),
    quoteShuffleBtn: document.getElementById("quote-shuffle-btn"),
    // Search & Filter
    subjectSearch: document.getElementById("subject-search"),
    clearSearchBtn: document.getElementById("clear-search-btn"),
    filterPills: document.querySelectorAll(".filter-pill"),
    subjectsGrid: document.getElementById("subjects-grid"),
    // Modal
    confirmModal: document.getElementById("confirm-modal"),
    cancelResetBtn: document.getElementById("cancel-reset-btn"),
    confirmResetBtn: document.getElementById("confirm-reset-btn"),
    // Toasts & Canvas
    toastContainer: document.getElementById("toast-container"),
    confettiCanvas: document.getElementById("confetti-canvas"),
  };

  // ==========================================================
  // INITIALIZATION & EVENT BINDINGS
  // ==========================================================
  function init() {
    loadSavedTheme();
    initQuotesOrder();
    checkExistingSession();
    bindEvents();
    renderSubjects();
    updateProgressMetrics();
    updateMotivationalQuote();
    startQuoteAutoCycle();
  }

  function bindEvents() {
    // Theme toggle
    DOM.themeToggleActions.forEach((btn) => {
      btn.addEventListener("click", toggleTheme);
    });

    // Keyboard shortcut for theme toggle ('T' key)
    window.addEventListener("keydown", (e) => {
      if (
        (e.key === "t" || e.key === "T") &&
        !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
      ) {
        toggleTheme();
      }
    });

    // Login Form
    DOM.loginForm.addEventListener("submit", handleLoginSubmit);
    DOM.togglePasswordBtn.addEventListener("click", togglePasswordVisibility);

    // Logout
    DOM.logoutBtn.addEventListener("click", handleLogout);

    // Reset Modal
    DOM.resetBtn.addEventListener("click", openResetModal);
    DOM.cancelResetBtn.addEventListener("click", closeResetModal);
    DOM.confirmResetBtn.addEventListener("click", executeReset);
    DOM.confirmModal.addEventListener("click", (e) => {
      if (e.target === DOM.confirmModal) closeResetModal();
    });

    // Motivational Quote Next Kick Button
    if (DOM.quoteShuffleBtn) {
      DOM.quoteShuffleBtn.addEventListener("click", cycleNextQuote);
    }

    // Search and Filter
    DOM.subjectSearch.addEventListener("input", handleSearchInput);
    DOM.clearSearchBtn.addEventListener("click", clearSearch);

    DOM.filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        DOM.filterPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        appState.activeFilter = pill.dataset.filter;
        renderSubjects();
      });
    });

    // Window resize for canvas
    window.addEventListener("resize", handleCanvasResize);
    handleCanvasResize();
  }

  // ==========================================================
  // THEME ENGINE
  // ==========================================================
  function loadSavedTheme() {
    const saved = localStorage.getItem(STORAGE_KEYS.THEME);
    if (saved === "light" || saved === "dark") {
      appState.theme = saved;
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      appState.theme = prefersDark ? "dark" : "dark";
    }
    applyTheme(appState.theme, false);
  }

  function applyTheme(theme, showNotification = true) {
    appState.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEYS.THEME, theme);

    document.querySelectorAll(".theme-mode-text").forEach((el) => {
      el.textContent = theme === "dark" ? "Dark Mode" : "Light Mode";
    });

    if (showNotification) {
      showToast(
        theme === "dark" ? "Switched to Cosmic Dark" : "Switched to Solar Light",
        "info"
      );
    }
  }

  function toggleTheme() {
    const nextTheme = appState.theme === "dark" ? "light" : "dark";
    applyTheme(nextTheme, true);
  }

  // ==========================================================
  // MULTI-USER ACCOUNT SYSTEM (ISOLATED PROGRESS PER STUDENT)
  // ==========================================================
  function getAccounts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACCOUNTS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.error("Failed to load accounts:", e);
      return {};
    }
  }

  function saveAccounts(accounts) {
    try {
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
    } catch (e) {
      console.error("Failed to save accounts:", e);
    }
  }

  function checkExistingSession() {
    const savedUserId =
      localStorage.getItem(STORAGE_KEYS.CURRENT_USER) ||
      sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (savedUserId) {
      const accounts = getAccounts();
      const userKey = savedUserId.toLowerCase();
      if (accounts[userKey]) {
        appState.currentUserId = userKey;
        appState.currentUser = accounts[userKey].displayName || userKey;
        appState.taskStatus = accounts[userKey].tasks || {};
        showDashboard(false);
        return;
      }
    }
    showLogin(false);
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const idVal = DOM.studentIdInput.value.trim();
    const passVal = DOM.passwordInput.value.trim();

    DOM.idError.textContent = "";
    DOM.passwordError.textContent = "";

    let hasError = false;
    if (!idVal) {
      DOM.idError.textContent = "Please enter your Student ID.";
      DOM.studentIdInput.focus();
      hasError = true;
    }
    if (!passVal) {
      DOM.passwordError.textContent = "Please enter your security key.";
      if (!hasError) DOM.passwordInput.focus();
      hasError = true;
    }

    if (hasError) return;

    const userKey = idVal.toLowerCase();
    const accounts = getAccounts();

    if (accounts[userKey]) {
      // Existing User: Verify password
      if (accounts[userKey].password !== passVal) {
        DOM.passwordError.textContent = "Incorrect security key for this Student ID.";
        DOM.passwordInput.focus();
        showToast("Authentication failed: Password does not match.", "warning");
        return;
      }
      // Password matched: Load their private progress
      appState.currentUserId = userKey;
      appState.currentUser = accounts[userKey].displayName || idVal;
      appState.taskStatus = accounts[userKey].tasks || {};
      showToast(`Welcome back, ${appState.currentUser}! Your private progress is loaded.`, "success");
    } else {
      // New User: Automatically register private account with clean tasks
      accounts[userKey] = {
        id: userKey,
        displayName: idVal,
        password: passVal,
        tasks: {},
        createdAt: new Date().toISOString(),
      };
      saveAccounts(accounts);
      appState.currentUserId = userKey;
      appState.currentUser = idVal;
      appState.taskStatus = {};
      showToast(`New Cadet profile registered for ${idVal}!`, "success");
    }

    // Save session
    if (DOM.rememberMeCheck.checked) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userKey);
    } else {
      sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, userKey);
    }

    showDashboard(true);
  }

  function togglePasswordVisibility() {
    const isPass = DOM.passwordInput.type === "password";
    DOM.passwordInput.type = isPass ? "text" : "password";
    DOM.togglePasswordBtn.innerHTML = isPass
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
  }

  function showDashboard(animate = true) {
    DOM.userGreeting.innerHTML = `Welcome back, <span class="highlight-user">${escapeHtml(
      appState.currentUser || "Cadet"
    )}</span>`;

    if (animate) {
      DOM.loginView.style.opacity = "0";
      DOM.loginView.style.transform = "translateY(-15px) scale(0.98)";
      setTimeout(() => {
        DOM.loginView.classList.remove("active");
        DOM.dashboardView.classList.add("active");
        DOM.dashboardView.style.opacity = "1";
        DOM.dashboardView.style.transform = "translateY(0) scale(1)";
        renderSubjects();
        updateProgressMetrics();
        updateMotivationalQuote();
      }, 250);
    } else {
      DOM.loginView.classList.remove("active");
      DOM.dashboardView.classList.add("active");
      DOM.dashboardView.style.opacity = "1";
      DOM.dashboardView.style.transform = "translateY(0) scale(1)";
      renderSubjects();
      updateProgressMetrics();
      updateMotivationalQuote();
    }
  }

  function showLogin(animate = true) {
    if (animate) {
      DOM.dashboardView.style.opacity = "0";
      DOM.dashboardView.style.transform = "translateY(15px) scale(0.98)";
      setTimeout(() => {
        DOM.dashboardView.classList.remove("active");
        DOM.loginView.classList.add("active");
        DOM.loginView.style.opacity = "1";
        DOM.loginView.style.transform = "translateY(0) scale(1)";
      }, 250);
    } else {
      DOM.dashboardView.classList.remove("active");
      DOM.loginView.classList.add("active");
      DOM.loginView.style.opacity = "1";
      DOM.loginView.style.transform = "translateY(0) scale(1)";
    }
  }

  function handleLogout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    appState.currentUser = null;
    appState.currentUserId = null;
    appState.taskStatus = {};

    showToast("Signed out of Mission Control.", "info");

    // Redirect to login page and clean form
    showLogin(true);
    if (DOM.studentIdInput) {
      DOM.studentIdInput.value = "";
      DOM.studentIdInput.focus();
    }
    if (DOM.passwordInput) {
      DOM.passwordInput.value = "";
    }
    DOM.idError.textContent = "";
    DOM.passwordError.textContent = "";
  }

  // ==========================================================
  // STATE PERSISTENCE (ISOLATED PER USER ID)
  // ==========================================================
  function saveTaskState() {
    if (!appState.currentUserId) return;
    try {
      const accounts = getAccounts();
      if (!accounts[appState.currentUserId]) {
        accounts[appState.currentUserId] = {
          id: appState.currentUserId,
          displayName: appState.currentUser,
          password: "",
          tasks: {},
        };
      }
      accounts[appState.currentUserId].tasks = appState.taskStatus;
      accounts[appState.currentUserId].lastActive = new Date().toISOString();
      saveAccounts(accounts);

      if (DOM.lastSyncedBadge) {
        DOM.lastSyncedBadge.textContent =
          "Saved " +
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      }
    } catch (err) {
      console.error("Failed to save tasks:", err);
    }
  }

  function toggleTaskItem(taskId, isChecked) {
    if (isChecked) {
      appState.taskStatus[taskId] = true;
    } else {
      delete appState.taskStatus[taskId];
    }
    saveTaskState();
    updateProgressMetrics();
    // Quote can adaptively respond to progress changes
    updateMotivationalQuote();
  }

  // ==========================================================
  // MOTIVATIONAL QUOTES ENGINE (GUJARATI PUNCHLINES)
  // ==========================================================
  function initQuotesOrder() {
    // Generate a pseudo-randomized shuffle so different users see different order
    const list = [...MOTIVATIONAL_PUNCHLINES];
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    appState.quoteShuffledList = list;
    appState.currentQuoteIndex = Math.floor(Math.random() * list.length);
  }

  function cycleNextQuote(resetTimer = true) {
    if (!appState.quoteShuffledList.length) return;
    appState.currentQuoteIndex =
      (appState.currentQuoteIndex + 1) % appState.quoteShuffledList.length;

    // Subtle fade transition
    if (DOM.motivationPunchline) {
      DOM.motivationPunchline.style.opacity = "0";
      DOM.motivationPunchline.style.transform = "translateY(4px)";
      setTimeout(() => {
        updateMotivationalQuote();
        DOM.motivationPunchline.style.opacity = "1";
        DOM.motivationPunchline.style.transform = "translateY(0)";
      }, 180);
    } else {
      updateMotivationalQuote();
    }

    if (resetTimer) {
      startQuoteAutoCycle();
    }
  }

  function updateMotivationalQuote() {
    if (!DOM.motivationPunchline || !appState.quoteShuffledList.length) return;

    let quote = appState.quoteShuffledList[appState.currentQuoteIndex];
    if (!quote) quote = appState.quoteShuffledList[0];

    // Total metrics to see how urgent
    let grandTotal = 0;
    let grandCompleted = 0;
    SUBJECTS_DATA.forEach((s) => {
      const m = getSubjectMetrics(s);
      grandTotal += m.total;
      grandCompleted += m.completed;
    });
    const grandRemaining = grandTotal - grandCompleted;

    DOM.motivationPunchline.textContent = `"${quote.text}"`;
    if (DOM.motivationSubtext) {
      DOM.motivationSubtext.textContent = quote.subtext;
    }
    if (DOM.avatarEmoji) {
      DOM.avatarEmoji.textContent = quote.emoji;
    }
    if (DOM.motivationUrgencyTag) {
      DOM.motivationUrgencyTag.textContent =
        grandRemaining > 20
          ? "CRITICAL: " + quote.urgency
          : grandRemaining <= 5 && grandRemaining > 0
          ? "FINAL SPRINT"
          : quote.urgency;
    }
  }

  let quoteAutoTimer = null;
  function startQuoteAutoCycle() {
    if (quoteAutoTimer) clearInterval(quoteAutoTimer);
    // Automatically change quote every 1 minute (60,000 ms)
    quoteAutoTimer = setInterval(() => {
      if (document.visibilityState === "visible") {
        cycleNextQuote(false);
      }
    }, 60000);
  }

  // ==========================================================
  // SUBJECT & TASK CARD RENDERING
  // ==========================================================
  function renderSubjects() {
    DOM.subjectsGrid.innerHTML = "";

    const query = appState.searchQuery.toLowerCase();
    let visibleCount = 0;

    SUBJECTS_DATA.forEach((subject) => {
      const subjectMetrics = getSubjectMetrics(subject);
      const isCompleted =
        subjectMetrics.total > 0 &&
        subjectMetrics.completed === subjectMetrics.total;

      if (appState.activeFilter === "completed" && !isCompleted) return;
      if (appState.activeFilter === "pending" && isCompleted) return;

      if (query) {
        const matchesSubject =
          subject.name.toLowerCase().includes(query) ||
          subject.code.toLowerCase().includes(query) ||
          subject.category.toLowerCase().includes(query);
        const matchesTasks = subject.tasks.some(
          (t) =>
            t.label.toLowerCase().includes(query) ||
            t.category.toLowerCase().includes(query)
        );
        if (!matchesSubject && !matchesTasks) return;
      }

      visibleCount++;
      const card = createSubjectCardElement(subject, subjectMetrics);
      DOM.subjectsGrid.appendChild(card);
    });

    if (visibleCount === 0) {
      DOM.subjectsGrid.innerHTML = `
        <div class="glass-card empty-search-state">
          <svg class="empty-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h3 class="empty-search-title">No Matching Missions Found</h3>
          <p class="empty-search-text">No subjects or tasks correspond to "${escapeHtml(
            appState.searchQuery
          )}" in this filter tab.</p>
        </div>
      `;
    }
  }

  function createSubjectCardElement(subject, metrics) {
    const card = document.createElement("article");
    const isSubjectDone =
      metrics.total > 0 && metrics.completed === metrics.total;
    card.className = `glass-card subject-card ${
      isSubjectDone ? "is-completed" : ""
    }`;
    card.setAttribute("data-subject-id", subject.id);

    const completionPercent =
      metrics.total > 0
        ? Math.round((metrics.completed / metrics.total) * 100)
        : 100;

    // Card Top & Header
    let html = `
      <div class="card-header-block">
        <div class="card-top">
          <div class="subject-badge-wrap">
            <span class="subject-code">${escapeHtml(subject.code)}</span>
            <div class="subject-meta">
              <h3 class="subject-full-title">${escapeHtml(subject.name)}</h3>
              <span class="subject-category-tag">${escapeHtml(
                subject.category
              )}</span>
              
              <!-- Last Submission Date Badge -->
              <div class="subject-deadline-badge ${
                isSubjectDone ? "done" : "soon"
              }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <span>Submission: ${escapeHtml(subject.deadline)}</span>
              </div>
            </div>
          </div>
          <div class="subject-pill-status ${isSubjectDone ? "done" : ""}">
            <span>${metrics.completed}/${metrics.total} Done</span>
          </div>
        </div>

        <div class="subject-card-progress" style="margin-top: 1rem;">
          <div 
            class="subject-progress-fill ${isSubjectDone ? "all-done" : ""}" 
            style="width: ${completionPercent}%"
          ></div>
        </div>
      </div>

      <div class="task-sections-container">
    `;

    // Tasks Sections
    subject.tasks.forEach((task) => {
      html += renderTaskSection(task, subject);
    });

    html += `</div>`;
    card.innerHTML = html;

    attachCardEventListeners(card, subject);
    return card;
  }

  function renderTaskSection(task, subject) {
    if (task.type === "none") {
      return `
        <div class="task-section">
          <div class="section-label">
            <span>${escapeHtml(task.category)}</span>
          </div>
          <div class="task-item disabled">
            <div class="task-item-left">
              <span class="task-title">${escapeHtml(task.label)}</span>
            </div>
            <span class="task-pill-badge none">None</span>
          </div>
        </div>
      `;
    }

    if (task.type === "single") {
      const isChecked = !!appState.taskStatus[task.id];
      return `
        <div class="task-section">
          <div class="section-label">
            <span>${escapeHtml(task.category)}</span>
          </div>
          <label class="task-item ${isChecked ? "checked" : ""}" for="task-${task.id}">
            <div class="task-item-left">
              <div class="checkbox-container">
                <input 
                  type="checkbox" 
                  id="task-${task.id}" 
                  data-task-id="${task.id}" 
                  ${isChecked ? "checked" : ""}
                >
                <div class="checkbox-box">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              <span class="task-title">${escapeHtml(task.label)}</span>
            </div>
            ${
              task.badge
                ? `<span class="task-pill-badge ${task.badgeType || ""}">${escapeHtml(
                    task.badge
                  )}</span>`
                : ""
            }
          </label>
        </div>
      `;
    }

    if (task.type === "chip_group") {
      let completedInGroup = 0;
      for (let i = 1; i <= task.count; i++) {
        const chipId = `${task.id}_${i}`;
        if (appState.taskStatus[chipId]) completedInGroup++;
      }
      const isGroupAllDone = completedInGroup === task.count;

      let chipsHtml = "";
      for (let i = 1; i <= task.count; i++) {
        const chipId = `${task.id}_${i}`;
        const isChipChecked = !!appState.taskStatus[chipId];
        chipsHtml += `
          <button 
            type="button" 
            class="task-chip ${isChipChecked ? "checked" : ""}" 
            data-chip-id="${chipId}"
            title="${escapeHtml(task.label)}: Item ${i} (${isChipChecked ? "Completed" : "Pending"})"
            aria-pressed="${isChipChecked}"
          >
            ${escapeHtml(task.prefix)}${i}
          </button>
        `;
      }

      return `
        <div class="task-section">
          <div class="section-label">
            <span>${escapeHtml(task.category)}</span>
            <button 
              type="button" 
              class="section-quick-action" 
              data-group-action="${task.id}"
              data-group-count="${task.count}"
            >
              ${isGroupAllDone ? "Clear All" : "Mark All Done"}
            </button>
          </div>

          <div class="chip-grid-wrapper">
            <div class="chip-grid-header">
              <span class="chip-grid-title">${escapeHtml(task.label)}</span>
              <span class="task-pill-badge ${isGroupAllDone ? "complete" : ""}">
                ${completedInGroup}/${task.count}
              </span>
            </div>
            <div class="chip-grid">
              ${chipsHtml}
            </div>
          </div>
        </div>
      `;
    }

    return "";
  }

  function attachCardEventListeners(card, subject) {
    const singleChecks = card.querySelectorAll(
      'input[type="checkbox"][data-task-id]'
    );
    singleChecks.forEach((input) => {
      input.addEventListener("change", () => {
        const taskId = input.dataset.taskId;
        const isChecked = input.checked;
        const taskItem = input.closest(".task-item");
        if (taskItem) {
          taskItem.classList.toggle("checked", isChecked);
        }
        toggleTaskItem(taskId, isChecked);
        updateCardProgress(card, subject);
      });
    });

    const chips = card.querySelectorAll(".task-chip");
    chips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const chipId = chip.dataset.chipId;
        const isChecked = !chip.classList.contains("checked");
        chip.classList.toggle("checked", isChecked);
        chip.setAttribute("aria-pressed", isChecked);
        toggleTaskItem(chipId, isChecked);

        const groupWrapper = chip.closest(".task-section");
        updateChipGroupHeader(groupWrapper);
        updateCardProgress(card, subject);
      });
    });

    const groupActions = card.querySelectorAll("[data-group-action]");
    groupActions.forEach((btn) => {
      btn.addEventListener("click", () => {
        const groupId = btn.dataset.groupAction;
        const count = parseInt(btn.dataset.groupCount, 10);
        const groupWrapper = btn.closest(".task-section");
        const chipsInGroup = groupWrapper.querySelectorAll(".task-chip");

        let currentlyDone = 0;
        chipsInGroup.forEach((c) => {
          if (c.classList.contains("checked")) currentlyDone++;
        });

        const shouldMarkAll = currentlyDone < count;

        chipsInGroup.forEach((c) => {
          const chipId = c.dataset.chipId;
          c.classList.toggle("checked", shouldMarkAll);
          c.setAttribute("aria-pressed", shouldMarkAll);
          if (shouldMarkAll) {
            appState.taskStatus[chipId] = true;
          } else {
            delete appState.taskStatus[chipId];
          }
        });

        saveTaskState();
        updateChipGroupHeader(groupWrapper);
        updateCardProgress(card, subject);
        updateProgressMetrics();
        updateMotivationalQuote();

        showToast(
          shouldMarkAll
            ? `All ${count} items marked done!`
            : `Items cleared.`,
          "info"
        );
      });
    });
  }

  function updateChipGroupHeader(groupWrapper) {
    if (!groupWrapper) return;
    const chipsInGroup = groupWrapper.querySelectorAll(".task-chip");
    const count = chipsInGroup.length;
    let completed = 0;

    chipsInGroup.forEach((c) => {
      if (c.classList.contains("checked")) completed++;
    });

    const badge = groupWrapper.querySelector(".chip-grid-header .task-pill-badge");
    if (badge) {
      badge.textContent = `${completed}/${count}`;
      badge.classList.toggle("complete", completed === count);
    }

    const actionBtn = groupWrapper.querySelector(".section-quick-action");
    if (actionBtn) {
      actionBtn.textContent = completed === count ? "Clear All" : "Mark All Done";
    }
  }

  function updateCardProgress(card, subject) {
    const metrics = getSubjectMetrics(subject);
    const isSubjectDone =
      metrics.total > 0 && metrics.completed === metrics.total;
    const percent =
      metrics.total > 0
        ? Math.round((metrics.completed / metrics.total) * 100)
        : 100;

    card.classList.toggle("is-completed", isSubjectDone);

    const statusPill = card.querySelector(".subject-pill-status");
    if (statusPill) {
      statusPill.innerHTML = `<span>${metrics.completed}/${metrics.total} Done</span>`;
      statusPill.classList.toggle("done", isSubjectDone);
    }

    const progressFill = card.querySelector(".subject-progress-fill");
    if (progressFill) {
      progressFill.style.width = `${percent}%`;
      progressFill.classList.toggle("all-done", isSubjectDone);
    }

    const deadlineBadge = card.querySelector(".subject-deadline-badge");
    if (deadlineBadge) {
      deadlineBadge.classList.toggle("done", isSubjectDone);
      deadlineBadge.classList.toggle("soon", !isSubjectDone);
    }
  }

  // ==========================================================
  // PROGRESS CALCULATIONS & METRICS
  // ==========================================================
  function getSubjectMetrics(subject) {
    let total = 0;
    let completed = 0;

    subject.tasks.forEach((task) => {
      if (task.type === "single") {
        total++;
        if (appState.taskStatus[task.id]) completed++;
      } else if (task.type === "chip_group") {
        total += task.count;
        for (let i = 1; i <= task.count; i++) {
          if (appState.taskStatus[`${task.id}_${i}`]) completed++;
        }
      }
    });

    return { total, completed };
  }

  let previousPercent = 0;

  function updateProgressMetrics() {
    let grandTotal = 0;
    let grandCompleted = 0;
    let subjectsCleared = 0;

    SUBJECTS_DATA.forEach((subject) => {
      const { total, completed } = getSubjectMetrics(subject);
      grandTotal += total;
      grandCompleted += completed;
      if (total > 0 && completed === total) {
        subjectsCleared++;
      }
    });

    const grandRemaining = grandTotal - grandCompleted;
    const percent =
      grandTotal > 0 ? Math.round((grandCompleted / grandTotal) * 100) : 0;

    if (DOM.statCompleted) DOM.statCompleted.textContent = grandCompleted;
    if (DOM.statRemaining) DOM.statRemaining.textContent = grandRemaining;
    if (DOM.statTotal) DOM.statTotal.textContent = grandTotal;
    if (DOM.statSubjectsDone)
      DOM.statSubjectsDone.textContent = `${subjectsCleared}/${SUBJECTS_DATA.length}`;

    if (DOM.progressBarFill) {
      DOM.progressBarFill.style.width = `${percent}%`;
    }
    if (DOM.progressBarAria) {
      DOM.progressBarAria.setAttribute("aria-valuenow", percent);
    }
    if (DOM.progressPercentText) {
      DOM.progressPercentText.textContent = `${percent}%`;
    }

    if (DOM.ringIndicator) {
      const circumference = 314.16;
      const offset = circumference - (percent / 100) * circumference;
      DOM.ringIndicator.style.strokeDashoffset = offset;
    }
    if (DOM.radialPercent) {
      DOM.radialPercent.textContent = `${percent}%`;
    }

    updateMotivationalText(percent, subjectsCleared);

    if (percent === 100 && previousPercent < 100 && grandTotal > 0) {
      triggerCelebration();
    }
    previousPercent = percent;
  }

  function updateMotivationalText(percent, subjectsCleared) {
    if (!DOM.progressHeadline || !DOM.progressSubtext || !DOM.missionStatusLabel)
      return;

    if (percent === 100) {
      DOM.missionStatusLabel.textContent = "MISSION COMPLETE: 100% SUBMISSIONS";
      DOM.progressHeadline.innerHTML = `Mission Accomplished: <span>100%</span>`;
      DOM.progressSubtext.textContent =
        "Spectacular job! All academic assignments, lab practicals, and projects are officially cleared.";
    } else if (percent >= 75) {
      DOM.missionStatusLabel.textContent = "FINAL APPROACH: RE-ENTRY PHASE";
      DOM.progressHeadline.innerHTML = `Final Flight Orbit: <span>${percent}%</span>`;
      DOM.progressSubtext.textContent =
        "Outstanding trajectory! Only a few milestones remaining before full academic clearance.";
    } else if (percent >= 40) {
      DOM.missionStatusLabel.textContent = "CRUISING VELOCITY: STEADY PROGRESS";
      DOM.progressHeadline.innerHTML = `Mission in Flight: <span>${percent}%</span>`;
      DOM.progressSubtext.textContent =
        "Solid momentum! Continue checking off your pending lab tasks and assignments.";
    } else if (percent > 0) {
      DOM.missionStatusLabel.textContent = "MISSION STATUS: LAUNCH SEQUENCE ACTIVE";
      DOM.progressHeadline.innerHTML = `Mission Initialized: <span>${percent}%</span>`;
      DOM.progressSubtext.textContent =
        "Off to a great start! Check each task as you complete it to monitor your trajectory.";
    } else {
      DOM.missionStatusLabel.textContent = "MISSION STATUS: STANDBY";
      DOM.progressHeadline.innerHTML = `Academic Flight Plan: <span>0%</span>`;
      DOM.progressSubtext.textContent =
        "Your flight log is empty. Authenticate submissions below to launch your academic trajectory.";
    }
  }

  // ==========================================================
  // SEARCH & FILTER ENGINE
  // ==========================================================
  function handleSearchInput(e) {
    appState.searchQuery = e.target.value.trim();
    DOM.clearSearchBtn.classList.toggle("hidden", !appState.searchQuery);
    renderSubjects();
  }

  function clearSearch() {
    DOM.subjectSearch.value = "";
    appState.searchQuery = "";
    DOM.clearSearchBtn.classList.add("hidden");
    renderSubjects();
    DOM.subjectSearch.focus();
  }

  // ==========================================================
  // RESET ALL PROGRESS MODAL
  // ==========================================================
  function openResetModal() {
    DOM.confirmModal.classList.add("open");
    DOM.confirmModal.setAttribute("aria-hidden", "false");
  }

  function closeResetModal() {
    DOM.confirmModal.classList.remove("open");
    DOM.confirmModal.setAttribute("aria-hidden", "true");
  }

  function executeReset() {
    appState.taskStatus = {};
    saveTaskState();
    closeResetModal();
    renderSubjects();
    updateProgressMetrics();
    updateMotivationalQuote();
    showToast("All mission tasks have been reset to blank.", "info");
  }

  // ==========================================================
  // TOAST NOTIFICATION SYSTEM
  // ==========================================================
  function showToast(message, type = "info") {
    if (!DOM.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    const iconSvg =
      type === "success"
        ? `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
        : `<svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span class="toast-message">${escapeHtml(message)}</span>
    `;

    DOM.toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      toast.addEventListener("transitionend", () => {
        toast.remove();
      });
    }, 3200);
  }

  // ==========================================================
  // CONFETTI CELEBRATION ENGINE
  // ==========================================================
  let confettiParticles = [];
  let confettiAnimId = null;

  function handleCanvasResize() {
    if (!DOM.confettiCanvas) return;
    DOM.confettiCanvas.width = window.innerWidth;
    DOM.confettiCanvas.height = window.innerHeight;
  }

  function triggerCelebration() {
    showToast("🎉 Mission Accomplished! 100% Complete!", "success");
    if (!DOM.confettiCanvas) return;

    const ctx = DOM.confettiCanvas.getContext("2d");
    const colors = [
      "#3b82f6",
      "#8b5cf6",
      "#06b6d4",
      "#10b981",
      "#f59e0b",
      "#ec4899",
      "#ffffff",
    ];

    confettiParticles = [];
    for (let i = 0; i < 160; i++) {
      confettiParticles.push({
        x: DOM.confettiCanvas.width / 2,
        y: DOM.confettiCanvas.height / 2,
        w: Math.random() * 9 + 5,
        h: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 18,
        gravity: 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
      });
    }

    if (confettiAnimId) cancelAnimationFrame(confettiAnimId);

    function animateConfetti() {
      ctx.clearRect(0, 0, DOM.confettiCanvas.width, DOM.confettiCanvas.height);
      let alive = false;

      confettiParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.007;

        if (p.opacity > 0 && p.y < DOM.confettiCanvas.height + 20) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (alive) {
        confettiAnimId = requestAnimationFrame(animateConfetti);
      } else {
        ctx.clearRect(0, 0, DOM.confettiCanvas.width, DOM.confettiCanvas.height);
      }
    }

    animateConfetti();
  }

  // ==========================================================
  // UTILITY HELPERS
  // ==========================================================
  function escapeHtml(str) {
    if (typeof str !== "string") return "";
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // Start Application
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
