/**
 * 數位科技概論（上）隨堂測驗卷 - 錯題精析、弱點強化與全真刷題系統
 * 核心應用程式邏輯 (app.js)
 */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initSoundSystem();
  renderMetaAndStats();
  renderWrongQuestionsDeepDive();
  renderAllQuestions();
  initHotspots();
  initDrillCenter();
});

// ==========================================
// 1. 主題切換 (Dark / Light Mode)
// ==========================================
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle-btn");
  const savedTheme = localStorage.getItem("exam_theme") || "light";
  
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", nextTheme);
      localStorage.setItem("exam_theme", nextTheme);
      updateThemeIcon(nextTheme);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.getElementById("theme-icon");
  if (icon) {
    icon.textContent = theme === "dark" ? "☀️" : "🌙";
  }
}

// ==========================================
// 2. 音效系統 (Web Audio API - 無需外部檔案)
// ==========================================
let audioCtx = null;
let soundEnabled = true;

function initSoundSystem() {
  const soundToggleBtn = document.getElementById("sound-toggle-btn");
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundToggleBtn.textContent = soundEnabled ? "🔊 音效：開" : "🔇 音效：關";
      soundToggleBtn.classList.toggle("muted", !soundEnabled);
    });
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === "correct") {
      // 成功高音琶音 (Do-Mi-Sol)
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc.start(now);
      osc.stop(now + 0.38);
    } else if (type === "wrong") {
      // 答錯低音
      osc.type = "triangle";
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.setValueAtTime(210, now + 0.12);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === "tick") {
      // 切換切題微聲
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    // 忽略音效不支援
  }
}

// ==========================================
// 3. 測驗卷元資料與統計看板
// ==========================================
function renderMetaAndStats() {
  const { meta, questions } = window.EXAM_DATA;
  const wrongQuestions = questions.filter(q => !q.isCorrect);
  const correctQuestions = questions.filter(q => q.isCorrect);

  const container = document.getElementById("exam-meta-container");
  if (!container) return;

  container.innerHTML = `
    <div class="exam-header-banner">
      <div class="banner-top">
        <div class="exam-tag-group">
          <span class="badge badge-primary">高中職 / 技高專業考科</span>
          <span class="badge badge-secondary">${meta.publisher}</span>
          <span class="badge badge-outline">教用書號：${meta.bookCodeTeacher}</span>
        </div>
        <div class="exam-score-pill">
          <div class="score-label">實體卷總得分</div>
          <div class="score-val">${meta.student.score} <span class="score-total">/ 100</span></div>
        </div>
      </div>
      
      <h1 class="exam-main-title">${meta.title}</h1>
      <div class="exam-sub-title">${meta.volume} · <span class="highlight-chapter">${meta.chapter}</span></div>

      <div class="student-meta-grid">
        <div class="student-info-item">
          <span class="info-icon">🏫</span>
          <span class="info-label">班級：</span>
          <span class="info-val">${meta.student.department} ${meta.student.grade}</span>
        </div>
        <div class="student-info-item">
          <span class="info-icon">👤</span>
          <span class="info-label">姓名：</span>
          <span class="info-val">${meta.student.name}</span>
        </div>
        <div class="student-info-item">
          <span class="info-icon">🔢</span>
          <span class="info-label">座號：</span>
          <span class="info-val">${meta.student.seatNo} 號</span>
        </div>
        <div class="student-info-item">
          <span class="info-icon">📄</span>
          <span class="info-label">卷況規格：</span>
          <span class="info-val">本圖片為第 1 頁（選擇題 1~13 題，每題 4 分）</span>
        </div>
      </div>

      <!-- 統計指標卡 -->
      <div class="stats-row">
        <div class="stat-card stat-primary">
          <div class="stat-icon">📊</div>
          <div class="stat-content">
            <div class="stat-num">${meta.student.pageScore} <span class="stat-unit">/ ${meta.student.pageTotalScore} 分</span></div>
            <div class="stat-desc">第 1 頁實得分數 (扣 12 分)</div>
          </div>
        </div>

        <div class="stat-card stat-success">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <div class="stat-num">${correctQuestions.length} <span class="stat-unit">題</span></div>
            <div class="stat-desc">第一頁答對題數 (76.9%)</div>
          </div>
        </div>

        <div class="stat-card stat-danger">
          <div class="stat-icon">🚨</div>
          <div class="stat-content">
            <div class="stat-num">${wrongQuestions.length} <span class="stat-unit">題</span></div>
            <div class="stat-desc">需優先訂正錯題 (-12分)</div>
          </div>
        </div>

        <div class="stat-card stat-warning">
          <div class="stat-icon">🎯</div>
          <div class="stat-content">
            <div class="stat-num">第 9, 12, 13 題</div>
            <div class="stat-desc">弱點核心題號清單</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==========================================
// 4. 三大錯題深度剖析專區
// ==========================================
function renderWrongQuestionsDeepDive() {
  const container = document.getElementById("wrong-questions-list");
  if (!container) return;

  const wrongQuestions = window.EXAM_DATA.questions.filter(q => !q.isCorrect);

  container.innerHTML = wrongQuestions.map(q => {
    return `
      <article class="wrong-card" id="wrong-card-${q.id}">
        <div class="wrong-card-header">
          <div class="header-left">
            <span class="wrong-badge">❌ 訂正題號 ${q.id}</span>
            <span class="topic-tag">${q.category}</span>
          </div>
          <div class="answer-comparison-bar">
            <div class="student-ans-badge">
              <span class="label">學生作答：</span>
              <span class="val ans-wrong">(${q.studentAnswer}) ❌</span>
            </div>
            <div class="arrow-indicator">➔</div>
            <div class="correct-ans-badge">
              <span class="label">名師正解：</span>
              <span class="val ans-correct">(${q.correctAnswer}) ✔</span>
            </div>
          </div>
        </div>

        <!-- 考卷原始裁切特寫圖 -->
        <div class="crop-viewer-box">
          <div class="crop-header">
            <span class="crop-title">📷 考卷原始作答與批改截圖（第 ${q.id} 題特寫）</span>
            <button type="button" class="btn-sm btn-outline view-in-modal-btn" data-img="${q.cropImg}" title="點擊放大檢視原圖">🔍 放大特寫</button>
          </div>
          <div class="crop-img-wrapper">
            <img src="${q.cropImg}" alt="第 ${q.id} 題原始考卷" class="crop-img" loading="lazy">
          </div>
        </div>

        <!-- 題幹與選項列表 -->
        <div class="question-body">
          <h3 class="q-title"><strong>【題目】</strong> ${q.text}</h3>
          <div class="options-grid">
            ${q.options.map(opt => {
              let optClass = "";
              let optBadge = "";
              if (opt.key === q.correctAnswer) {
                optClass = "opt-is-correct";
                optBadge = '<span class="status-pill status-correct">✔ 名師正解</span>';
              } else if (opt.key === q.studentAnswer) {
                optClass = "opt-is-student-wrong";
                optBadge = '<span class="status-pill status-wrong">❌ 學生原填</span>';
              }
              return `
                <div class="option-item ${optClass}">
                  <span class="opt-key">(${opt.key})</span>
                  <span class="opt-text">${opt.text}</span>
                  ${optBadge}
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- 核心診斷區 -->
        <div class="diagnosis-section">
          ${q.wrongDiagnosis}
        </div>

        <!-- 名師正解詳解 -->
        <div class="solution-section">
          <div class="solution-header">
            <span class="solution-icon">💡</span>
            <h4>觀念精闢詳解與破題金鑰</h4>
          </div>
          <div class="solution-content">
            ${q.analysis}
          </div>
        </div>

        <!-- 考前速記錦囊 -->
        <div class="knowledge-tip-box">
          <span class="tip-icon">📌</span>
          <div class="tip-text"><strong>【必考考點速記】</strong> ${q.knowledgeTip}</div>
        </div>
      </article>
    `;
  }).join("");

  // 綁定特寫放大
  document.querySelectorAll(".view-in-modal-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const imgSrc = e.currentTarget.getAttribute("data-img");
      openImageModal(imgSrc, "原卷特寫放大");
    });
  });
}

// ==========================================
// 5. 全卷 13 題完整目錄與篩選
// ==========================================
function renderAllQuestions(filterType = "all", searchQuery = "", categoryFilter = "all") {
  const container = document.getElementById("all-questions-list");
  if (!container) return;

  let list = window.EXAM_DATA.questions;

  // 狀態篩選
  if (filterType === "wrong") {
    list = list.filter(q => !q.isCorrect);
  } else if (filterType === "correct") {
    list = list.filter(q => q.isCorrect);
  }

  // 類別篩選
  if (categoryFilter !== "all") {
    list = list.filter(q => q.category === categoryFilter);
  }

  // 關鍵字搜尋
  if (searchQuery.trim() !== "") {
    const qLower = searchQuery.trim().toLowerCase();
    list = list.filter(q => {
      return (
        q.text.toLowerCase().includes(qLower) ||
        q.options.some(opt => opt.text.toLowerCase().includes(qLower)) ||
        q.category.toLowerCase().includes(qLower) ||
        q.id.toString() === qLower
      );
    });
  }

  const countBadge = document.getElementById("question-count-badge");
  if (countBadge) {
    countBadge.textContent = `顯示 ${list.length} 題`;
  }

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 2rem; color: var(--text-muted);">
        <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
        <p>查無符合條件的題目，請嘗試更換篩選條件或關鍵字。</p>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(q => {
    const isWrong = !q.isCorrect;
    const statusClass = isWrong ? "card-wrong" : "card-correct";
    const statusBadge = isWrong 
      ? '<span class="status-tag status-wrong">🚨 答錯需訂正 (-4分)</span>'
      : '<span class="status-tag status-correct">✅ 作答正確 (+4分)</span>';

    return `
      <div class="question-summary-card ${statusClass}" id="q-card-${q.id}">
        <div class="card-summary-header">
          <div class="header-left">
            <span class="q-num-pill">第 ${q.id} 題</span>
            <span class="category-pill">${q.category}</span>
            ${statusBadge}
          </div>
          <div class="header-right">
            <span class="ans-inline">學生：<strong class="${isWrong ? 'text-danger' : 'text-success'}">(${q.studentAnswer})</strong></span>
            <span class="ans-inline">正解：<strong class="text-success">(${q.correctAnswer})</strong></span>
            <button type="button" class="btn-toggle-detail" data-target="detail-${q.id}">展開解析 ▼</button>
          </div>
        </div>

        <div class="card-summary-title">
          ${q.text}
        </div>

        <div class="card-expandable-detail" id="detail-${q.id}" style="display: none;">
          <div class="detail-divider"></div>

          <div class="detail-options-list">
            ${q.options.map(opt => {
              const isCorrectOpt = opt.key === q.correctAnswer;
              const isStudentOpt = opt.key === q.studentAnswer;
              let itemClass = "";
              if (isCorrectOpt) itemClass = "opt-correct-row";
              if (isStudentOpt && isWrong) itemClass = "opt-wrong-row";

              return `
                <div class="detail-opt-item ${itemClass}">
                  <span class="badge-opt-key">(${opt.key})</span>
                  <span class="opt-content-text">${opt.text}</span>
                  ${isCorrectOpt ? '<span class="ans-correct-tag">正解</span>' : ''}
                  ${isStudentOpt ? '<span class="ans-student-tag">學生選</span>' : ''}
                </div>
              `;
            }).join("")}
          </div>

          ${isWrong && q.wrongDiagnosis ? `
            <div class="detail-diagnosis-wrap">
              ${q.wrongDiagnosis}
            </div>
          ` : ''}

          <div class="detail-analysis-content">
            <h5 class="analysis-subhead">💡 詳解探討：</h5>
            ${q.analysis}
          </div>

          <div class="detail-tip-content">
            <strong>📌 考點備忘：</strong> ${q.knowledgeTip}
          </div>
        </div>
      </div>
    `;
  }).join("");

  // 綁定展開 / 收合
  container.querySelectorAll(".btn-toggle-detail").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const targetId = e.currentTarget.getAttribute("data-target");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        const isHidden = targetEl.style.display === "none";
        targetEl.style.display = isHidden ? "block" : "none";
        e.currentTarget.textContent = isHidden ? "收合解析 ▲" : "展開解析 ▼";
      }
    });
  });
}

// 篩選與搜尋監聽
function initAllQuestionsFilters() {
  let currentFilter = "all";
  let currentCategory = "all";
  let currentSearch = "";

  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderAllQuestions(currentFilter, currentSearch, currentCategory);
    });
  });

  const catBtns = document.querySelectorAll(".cat-btn");
  catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      catBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.getAttribute("data-category");
      renderAllQuestions(currentFilter, currentSearch, currentCategory);
    });
  });

  const searchInput = document.getElementById("search-question-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      renderAllQuestions(currentFilter, currentSearch, currentCategory);
    });
  }

  const expandAllBtn = document.getElementById("expand-all-btn");
  const collapseAllBtn = document.getElementById("collapse-all-btn");

  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", () => {
      document.querySelectorAll(".card-expandable-detail").forEach(el => el.style.display = "block");
      document.querySelectorAll(".btn-toggle-detail").forEach(btn => btn.textContent = "收合解析 ▲");
    });
  }

  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", () => {
      document.querySelectorAll(".card-expandable-detail").forEach(el => el.style.display = "none");
      document.querySelectorAll(".btn-toggle-detail").forEach(btn => btn.textContent = "展開解析 ▼");
    });
  }
}

// ==========================================
// 6. 考卷互動熱點 (Hotspots) 與原卷檢視
// ==========================================
function initHotspots() {
  const hotspotBtns = document.querySelectorAll(".paper-hotspot");
  hotspotBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const qId = e.currentTarget.getAttribute("data-qid");
      scrollToQuestion(qId);
    });
  });

  const fullPaperBtn = document.getElementById("view-full-paper-modal-btn");
  if (fullPaperBtn) {
    fullPaperBtn.addEventListener("click", () => {
      openImageModal("2772.jpg", "原試卷高解析全景照片");
    });
  }
}

function scrollToQuestion(qId) {
  const wrongCard = document.getElementById(`wrong-card-${qId}`);
  if (wrongCard) {
    wrongCard.scrollIntoView({ behavior: "smooth", block: "center" });
    wrongCard.classList.add("card-spotlight");
    setTimeout(() => {
      wrongCard.classList.remove("card-spotlight");
    }, 2000);
    return;
  }

  const qCard = document.getElementById(`q-card-${qId}`);
  if (qCard) {
    qCard.scrollIntoView({ behavior: "smooth", block: "center" });
    const detail = document.getElementById(`detail-${qId}`);
    if (detail) detail.style.display = "block";
    const btn = qCard.querySelector(".btn-toggle-detail");
    if (btn) btn.textContent = "收合解析 ▲";
    qCard.classList.add("card-spotlight");
    setTimeout(() => {
      qCard.classList.remove("card-spotlight");
    }, 2000);
  }
}

// ==========================================
// 7. 圖片放大檢視 Modal
// ==========================================
function openImageModal(imgSrc, title) {
  let modal = document.getElementById("image-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "image-modal";
    modal.className = "image-modal-overlay";
    modal.innerHTML = `
      <div class="modal-content-wrap">
        <div class="modal-header">
          <span class="modal-title" id="modal-img-title"></span>
          <button type="button" class="modal-close-btn" id="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body">
          <img src="" id="modal-display-img" alt="放大圖片">
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.id === "modal-close-btn") {
        modal.classList.remove("active");
      }
    });
  }

  document.getElementById("modal-img-title").textContent = title || "原圖放大檢視";
  document.getElementById("modal-display-img").src = imgSrc;
  modal.classList.add("active");
}

// ========================================================
// 8. 🚀 升級版：刷題與複習練習中心 (Drill Center)
//    包含 3 大核心模組：
//    1. 🎯 錯題強化特訓營 (原卷錯題 + 6 題概念變形題)
//    2. ⚡ 逐題沉浸刷題模式 (Flashcard 單題翻牌 + 鍵盤快捷鍵)
//    3. ⏱️ 全真模擬計時大考 (15分鐘計時 + 懸浮答題卡 + 結算單)
// ========================================================
function initDrillCenter() {
  initAllQuestionsFilters();
  initTabNavigation();
  initMistakeCamp();
  initFlashcardDrill();
  initTimedMockExam();
}

function initTabNavigation() {
  const tabBtns = document.querySelectorAll(".drill-tab-btn");
  const tabPanes = document.querySelectorAll(".drill-tab-pane");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const targetPaneId = btn.getAttribute("data-tab");

      tabBtns.forEach(b => b.classList.remove("active"));
      tabPanes.forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(targetPaneId);
      if (targetPane) {
        targetPane.classList.add("active");
      }

      // 若切換到逐題刷題模式，重設監聽或更新目前題目
      if (targetPaneId === "pane-flashcard") {
        renderCurrentFlashcard();
      }
    });
  });
}

// --------------------------------------------------------
// 模組 1：🎯 錯題強化特訓營 (Mistake Training Camp)
// --------------------------------------------------------
let mistakeAnswers = {}; // { qId: selectedOption }
let mistakeMastery = {}; // { qId: true/false }

function getMistakeCampPool(filterType = "all") {
  const origWrong = window.EXAM_DATA.questions.filter(q => !q.isCorrect);
  const variants = window.EXAM_DATA.variantQuestions;

  if (filterType === "orig") return origWrong;
  if (filterType === "variants") return variants;
  return [...origWrong, ...variants];
}

function initMistakeCamp() {
  const filterBtns = document.querySelectorAll(".mistake-filter-btn");
  let currentFilter = "all";

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.getAttribute("data-filter");
      renderMistakeCampQuestions(currentFilter);
    });
  });

  const resetBtn = document.getElementById("mistake-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      mistakeAnswers = {};
      mistakeMastery = {};
      updateMasteryStats();
      renderMistakeCampQuestions(currentFilter);
    });
  }

  renderMistakeCampQuestions(currentFilter);
}

function renderMistakeCampQuestions(filterType = "all") {
  const container = document.getElementById("mistake-questions-list");
  if (!container) return;

  const list = getMistakeCampPool(filterType);

  container.innerHTML = list.map((q, idx) => {
    const isVariant = !!q.variantOf;
    const userSelected = mistakeAnswers[q.id];
    const isAnswered = !!userSelected;
    const isCorrect = userSelected === q.correctAnswer;

    return `
      <div class="quiz-item-card" id="mistake-item-${q.id}" style="${isAnswered && isCorrect ? 'border-color: var(--success);' : ''}">
        <div class="quiz-item-header">
          <span class="quiz-num">${isVariant ? '🔥 概念變形題' : '🚨 原卷錯題'}</span>
          <span class="quiz-cat">${q.category}</span>
          ${isVariant ? `<span class="variant-badge">${q.tag}</span>` : `<span class="badge-was-wrong">原卷第 ${q.id} 題 (扣4分)</span>`}
        </div>

        <div class="quiz-question-text">
          ${q.text}
        </div>

        <div class="quiz-options-group">
          ${q.options.map(opt => {
            let optClass = "";
            if (isAnswered) {
              if (opt.key === q.correctAnswer) {
                optClass = "quiz-opt-correct";
              } else if (userSelected === opt.key) {
                optClass = "quiz-opt-wrong";
              }
            }

            return `
              <button type="button" 
                      class="quiz-option-btn ${optClass}" 
                      data-qid="${q.id}" 
                      data-key="${opt.key}"
                      ${isAnswered ? 'disabled' : ''}>
                <span class="quiz-key">(${opt.key})</span>
                <span class="quiz-text">${opt.text}</span>
              </button>
            `;
          }).join("")}
        </div>

        ${isAnswered ? `
          <div class="quiz-feedback-box">
            <div class="feedback-msg ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
              <span class="msg-icon">${isCorrect ? '🎉' : '❌'}</span>
              <div class="msg-text">
                <strong>${isCorrect ? '答對了！恭喜完全攻克！' : `答錯了！正解為 (${q.correctAnswer})`}</strong>
                <p style="margin-top:0.3rem;">${q.highlight}</p>
                <div style="margin-top:0.5rem; font-size: 0.88rem; color: var(--text-sub);">
                  ${q.analysis}
                </div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join("");

  // 點選選項事件
  container.querySelectorAll(".quiz-option-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const qId = parseInt(e.currentTarget.getAttribute("data-qid"), 10);
      const key = e.currentTarget.getAttribute("data-key");

      const pool = getMistakeCampPool("all");
      const qObj = pool.find(item => item.id === qId);
      if (!qObj) return;

      mistakeAnswers[qId] = key;
      const isRight = key === qObj.correctAnswer;
      mistakeMastery[qId] = isRight;

      if (isRight) {
        playSound("correct");
      } else {
        playSound("wrong");
      }

      updateMasteryStats();
      renderMistakeCampQuestions(filterType);
    });
  });

  updateMasteryStats();
}

function updateMasteryStats() {
  const allMistakes = getMistakeCampPool("all");
  const total = allMistakes.length;
  const masteredCount = Object.values(mistakeMastery).filter(v => v === true).length;
  const pct = Math.round((masteredCount / total) * 100);

  const fill = document.getElementById("mastery-progress-fill");
  const label = document.getElementById("mastery-progress-label");

  if (fill) fill.style.width = `${pct}%`;
  if (label) label.textContent = `弱點攻克掌握度：${masteredCount} / ${total} 題 (${pct}%)`;
}

// --------------------------------------------------------
// 模組 2：⚡ 逐題沉浸刷題 (Card Flashcard Drill)
// --------------------------------------------------------
let flashcardIndex = 0;
let flashcardPool = [];
let flashcardAnswers = {}; // { qId: selectedKey }
let flashcardShuffle = false;

function initFlashcardDrill() {
  flashcardPool = [...window.EXAM_DATA.questions];

  const prevBtn = document.getElementById("flashcard-prev-btn");
  const nextBtn = document.getElementById("flashcard-next-btn");
  const shuffleBtn = document.getElementById("flashcard-shuffle-btn");
  const resetBtn = document.getElementById("flashcard-reset-btn");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      if (flashcardIndex > 0) {
        flashcardIndex--;
        playSound("tick");
        renderCurrentFlashcard();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (flashcardIndex < flashcardPool.length - 1) {
        flashcardIndex++;
        playSound("tick");
        renderCurrentFlashcard();
      }
    });
  }

  if (shuffleBtn) {
    shuffleBtn.addEventListener("click", () => {
      flashcardShuffle = !flashcardShuffle;
      shuffleBtn.textContent = flashcardShuffle ? "🔀 隨機題序：開" : "➡️ 循序題序：正常";
      shuffleBtn.classList.toggle("btn-purple", flashcardShuffle);

      if (flashcardShuffle) {
        flashcardPool = shuffleArray([...window.EXAM_DATA.questions]);
      } else {
        flashcardPool = [...window.EXAM_DATA.questions];
      }
      flashcardIndex = 0;
      renderCurrentFlashcard();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      flashcardAnswers = {};
      flashcardIndex = 0;
      renderCurrentFlashcard();
    });
  }

  // 鍵盤監聽快捷鍵 (A, B, C, D, ArrowLeft, ArrowRight)
  window.addEventListener("keydown", handleFlashcardKeydown);

  renderCurrentFlashcard();
}

function handleFlashcardKeydown(e) {
  const flashPane = document.getElementById("pane-flashcard");
  if (!flashPane || !flashPane.classList.contains("active")) return;

  const key = e.key.toUpperCase();
  const q = flashcardPool[flashcardIndex];
  if (!q) return;

  if (["A", "B", "C", "D"].includes(key) || ["1", "2", "3", "4"].includes(key)) {
    const keyMap = { "1": "A", "2": "B", "3": "C", "4": "D" };
    const chosenKey = keyMap[key] || key;
    if (!flashcardAnswers[q.id]) {
      selectFlashcardOption(chosenKey);
    }
  } else if (e.key === "ArrowLeft") {
    if (flashcardIndex > 0) {
      flashcardIndex--;
      playSound("tick");
      renderCurrentFlashcard();
    }
  } else if (e.key === "ArrowRight") {
    if (flashcardIndex < flashcardPool.length - 1) {
      flashcardIndex++;
      playSound("tick");
      renderCurrentFlashcard();
    }
  }
}

function selectFlashcardOption(key) {
  const q = flashcardPool[flashcardIndex];
  if (!q || flashcardAnswers[q.id]) return;

  flashcardAnswers[q.id] = key;
  const isRight = key === q.correctAnswer;
  if (isRight) {
    playSound("correct");
  } else {
    playSound("wrong");
  }
  renderCurrentFlashcard();
}

function renderCurrentFlashcard() {
  const cardContainer = document.getElementById("flashcard-render-area");
  const progText = document.getElementById("flashcard-prog-num");
  const accText = document.getElementById("flashcard-acc-rate");
  const prevBtn = document.getElementById("flashcard-prev-btn");
  const nextBtn = document.getElementById("flashcard-next-btn");

  if (!cardContainer || flashcardPool.length === 0) return;

  const q = flashcardPool[flashcardIndex];
  const userSelected = flashcardAnswers[q.id];
  const isAnswered = !!userSelected;
  const isCorrect = userSelected === q.correctAnswer;

  if (prevBtn) prevBtn.disabled = flashcardIndex === 0;
  if (nextBtn) nextBtn.disabled = flashcardIndex === flashcardPool.length - 1;

  if (progText) {
    progText.textContent = `第 ${flashcardIndex + 1} / ${flashcardPool.length} 題`;
  }

  // 計算累計刷題正確率
  const answeredKeys = Object.keys(flashcardAnswers);
  if (accText) {
    if (answeredKeys.length === 0) {
      accText.textContent = `尚未作答`;
    } else {
      let rights = 0;
      answeredKeys.forEach(qId => {
        const item = flashcardPool.find(i => i.id === parseInt(qId, 10));
        if (item && flashcardAnswers[qId] === item.correctAnswer) rights++;
      });
      const pct = Math.round((rights / answeredKeys.length) * 100);
      accText.textContent = `已刷 ${answeredKeys.length} 題 · 正確率 ${pct}%`;
    }
  }

  let cardStatusClass = "";
  if (isAnswered) {
    cardStatusClass = isCorrect ? "status-correct" : "status-wrong";
  }

  cardContainer.innerHTML = `
    <div class="flashcard-main-card ${cardStatusClass}">
      <div class="flashcard-meta-line">
        <div style="display: flex; gap: 0.5rem; align-items: center;">
          <span class="q-num-pill">題號 ${q.id}</span>
          <span class="topic-tag">${q.category}</span>
          ${!q.isCorrect ? '<span class="status-tag status-wrong">原考卷錯題</span>' : ''}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-muted);">
          快捷鍵：按 <strong>A / B / C / D</strong> 或 <strong>1 / 2 / 3 / 4</strong>
        </div>
      </div>

      <h3 class="flashcard-q-text">${q.text}</h3>

      <div class="flashcard-options">
        ${q.options.map(opt => {
          let optClass = "";
          if (isAnswered) {
            if (opt.key === q.correctAnswer) {
              optClass = "state-correct";
            } else if (userSelected === opt.key) {
              optClass = "state-wrong";
            }
          }

          return `
            <button type="button" 
                    class="flashcard-opt-btn ${optClass}" 
                    data-key="${opt.key}"
                    ${isAnswered ? 'disabled' : ''}>
              <span class="opt-key-kbd">${opt.key}</span>
              <span>${opt.text}</span>
            </button>
          `;
        }).join("")}
      </div>

      ${isAnswered ? `
        <div class="flashcard-feedback-drawer">
          <div class="feedback-msg ${isCorrect ? 'feedback-correct' : 'feedback-wrong'}">
            <span class="msg-icon">${isCorrect ? '🎉' : '❌'}</span>
            <div class="msg-text">
              <strong>${isCorrect ? `答對了！名師正解為 (${q.correctAnswer})` : `答錯了！名師正解為 (${q.correctAnswer})，您選擇了 (${userSelected})`}</strong>
              <p style="margin-top: 0.4rem;">${q.highlight}</p>
            </div>
          </div>

          <div style="margin-top: 1rem; font-size: 0.92rem;">
            ${q.analysis}
          </div>

          <div class="knowledge-tip-box" style="margin-top: 0.85rem;">
            <span class="tip-icon">📌</span>
            <div><strong>速記口訣：</strong> ${q.knowledgeTip}</div>
          </div>

          <div style="margin-top: 1.25rem; display: flex; justify-content: flex-end;">
            ${flashcardIndex < flashcardPool.length - 1 ? `
              <button type="button" class="btn btn-primary btn-sm" id="flashcard-inline-next-btn">下一題 ➔ (方向鍵 Right)</button>
            ` : `
              <span class="badge badge-primary">🎉 已刷完全卷所有題目！</span>
            `}
          </div>
        </div>
      ` : ''}
    </div>
  `;

  // 選項點選
  cardContainer.querySelectorAll(".flashcard-opt-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const key = e.currentTarget.getAttribute("data-key");
      selectFlashcardOption(key);
    });
  });

  const inlineNext = document.getElementById("flashcard-inline-next-btn");
  if (inlineNext) {
    inlineNext.addEventListener("click", () => {
      if (flashcardIndex < flashcardPool.length - 1) {
        flashcardIndex++;
        playSound("tick");
        renderCurrentFlashcard();
      }
    });
  }
}

// --------------------------------------------------------
// 模組 3：⏱️ 全真模擬計時大考 (Timed Mock Exam)
// --------------------------------------------------------
let mockQuestions = [];
let mockAnswers = {}; // { qId: selectedKey }
let mockFlagged = {}; // { qId: true/false }
let mockTimerSeconds = 15 * 60; // 15 分鐘
let mockTimerInterval = null;
let mockTimerRunning = false;
let mockSubmitted = false;
let mockShuffleOptions = false;

function initTimedMockExam() {
  mockQuestions = [...window.EXAM_DATA.questions];

  const startPauseBtn = document.getElementById("mock-timer-toggle-btn");
  const submitBtn = document.getElementById("mock-exam-submit-btn");
  const resetBtn = document.getElementById("mock-exam-reset-btn");
  const shuffleOptCheck = document.getElementById("mock-shuffle-options-check");

  if (startPauseBtn) {
    startPauseBtn.addEventListener("click", toggleMockTimer);
  }

  if (submitBtn) {
    submitBtn.addEventListener("click", submitMockExam);
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetMockExam);
  }

  if (shuffleOptCheck) {
    shuffleOptCheck.addEventListener("change", (e) => {
      mockShuffleOptions = e.target.checked;
      renderMockExamQuestions();
    });
  }

  startMockTimer();
  renderMockExamQuestions();
  renderBubbleSheet();
}

function startMockTimer() {
  if (mockTimerInterval) clearInterval(mockTimerInterval);
  mockTimerRunning = true;
  updateTimerDisplay();

  mockTimerInterval = setInterval(() => {
    if (!mockTimerRunning) return;
    if (mockTimerSeconds > 0) {
      mockTimerSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(mockTimerInterval);
      mockTimerRunning = false;
      alert("⏰ 時間到！考試時間已截止，系統將自動交卷！");
      submitMockExam();
    }
  }, 1000);
}

function toggleMockTimer() {
  mockTimerRunning = !mockTimerRunning;
  const btn = document.getElementById("mock-timer-toggle-btn");
  if (btn) {
    btn.textContent = mockTimerRunning ? "⏸️ 暫停計時" : "▶️ 繼續計時";
  }
}

function updateTimerDisplay() {
  const clockEl = document.getElementById("mock-timer-clock");
  const boxEl = document.getElementById("mock-timer-box");
  if (!clockEl) return;

  const mins = Math.floor(mockTimerSeconds / 60);
  const secs = mockTimerSeconds % 60;
  const text = `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  clockEl.textContent = text;

  if (boxEl) {
    boxEl.classList.toggle("timer-warning", mockTimerSeconds <= 180); // 3分鐘警示
  }
}

function resetMockExam() {
  mockAnswers = {};
  mockFlagged = {};
  mockSubmitted = false;
  mockTimerSeconds = 15 * 60;
  mockTimerRunning = true;
  startMockTimer();

  const resultBox = document.getElementById("mock-exam-result-banner");
  if (resultBox) resultBox.style.display = "none";

  renderMockExamQuestions();
  renderBubbleSheet();
}

function renderMockExamQuestions() {
  const container = document.getElementById("mock-exam-questions-list");
  if (!container) return;

  container.innerHTML = mockQuestions.map(q => {
    const userSelected = mockAnswers[q.id];
    const isFlagged = !!mockFlagged[q.id];
    let displayOptions = [...q.options];

    return `
      <div class="quiz-item-card" id="mock-q-${q.id}">
        <div class="quiz-item-header" style="justify-content: space-between;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <span class="quiz-num">第 ${q.id} 題</span>
            <span class="quiz-cat">${q.category}</span>
          </div>
          <button type="button" class="flag-question-btn ${isFlagged ? 'active' : ''}" data-qid="${q.id}">
            ${isFlagged ? '⭐ 已標記' : '☆ 標記待查'}
          </button>
        </div>

        <div class="quiz-question-text">
          ${q.text}
        </div>

        <div class="quiz-options-group">
          ${displayOptions.map(opt => {
            const isSelected = userSelected === opt.key;
            let optStatusClass = "";

            if (mockSubmitted) {
              if (opt.key === q.correctAnswer) {
                optStatusClass = "quiz-opt-correct";
              } else if (isSelected && opt.key !== q.correctAnswer) {
                optStatusClass = "quiz-opt-wrong";
              }
            } else if (isSelected) {
              optStatusClass = "quiz-opt-selected";
            }

            return `
              <button type="button" 
                      class="quiz-option-btn ${optStatusClass}" 
                      data-qid="${q.id}" 
                      data-key="${opt.key}"
                      ${mockSubmitted ? 'disabled' : ''}>
                <span class="quiz-key">(${opt.key})</span>
                <span class="quiz-text">${opt.text}</span>
              </button>
            `;
          }).join("")}
        </div>

        ${mockSubmitted ? `
          <div class="quiz-feedback-box">
            <div class="feedback-msg ${userSelected === q.correctAnswer ? 'feedback-correct' : 'feedback-wrong'}">
              <span class="msg-icon">${userSelected === q.correctAnswer ? '🎉' : '❌'}</span>
              <div class="msg-text">
                <strong>${userSelected === q.correctAnswer ? '答對！' : `答錯！正解為 (${q.correctAnswer})`}</strong>
                <p>${q.highlight}</p>
                <div style="margin-top: 0.5rem; font-size: 0.9rem;">${q.analysis}</div>
              </div>
            </div>
          </div>
        ` : ''}
      </div>
    `;
  }).join("");

  // 選項點選
  container.querySelectorAll(".quiz-option-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      if (mockSubmitted) return;
      const qId = parseInt(e.currentTarget.getAttribute("data-qid"), 10);
      const key = e.currentTarget.getAttribute("data-key");
      mockAnswers[qId] = key;
      renderMockExamQuestions();
      renderBubbleSheet();
    });
  });

  // 標記星號
  container.querySelectorAll(".flag-question-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const qId = parseInt(e.currentTarget.getAttribute("data-qid"), 10);
      mockFlagged[qId] = !mockFlagged[qId];
      renderMockExamQuestions();
      renderBubbleSheet();
    });
  });
}

function renderBubbleSheet() {
  const grid = document.getElementById("mock-bubble-grid");
  const answeredCountEl = document.getElementById("mock-answered-count");
  if (!grid) return;

  const answeredCount = Object.keys(mockAnswers).length;
  if (answeredCountEl) {
    answeredCountEl.textContent = `${answeredCount} / ${mockQuestions.length}`;
  }

  grid.innerHTML = mockQuestions.map(q => {
    const isAnswered = !!mockAnswers[q.id];
    const isFlagged = !!mockFlagged[q.id];
    let classes = ["bubble-item"];
    if (isAnswered) classes.push("answered");
    if (isFlagged) classes.push("flagged");

    return `
      <div class="${classes.join(" ")}" data-qid="${q.id}" title="跳轉至第 ${q.id} 題">
        <span>${q.id}</span>
        ${isAnswered ? `<small style="font-size:0.7rem;">(${mockAnswers[q.id]})</small>` : ''}
      </div>
    `;
  }).join("");

  // 點擊答題卡跳轉
  grid.querySelectorAll(".bubble-item").forEach(item => {
    item.addEventListener("click", (e) => {
      const qId = e.currentTarget.getAttribute("data-qid");
      const targetCard = document.getElementById(`mock-q-${qId}`);
      if (targetCard) {
        targetCard.scrollIntoView({ behavior: "smooth", block: "center" });
        targetCard.classList.add("card-spotlight");
        setTimeout(() => targetCard.classList.remove("card-spotlight"), 1500);
      }
    });
  });
}

function submitMockExam() {
  if (mockSubmitted) return;

  const total = mockQuestions.length;
  const answeredCount = Object.keys(mockAnswers).length;

  if (answeredCount < total) {
    const unAnswered = total - answeredCount;
    if (!confirm(`尚有 ${unAnswered} 題未作答，確定現在交卷嗎？`)) {
      return;
    }
  }

  mockSubmitted = true;
  mockTimerRunning = false;
  if (mockTimerInterval) clearInterval(mockTimerInterval);

  let correctCount = 0;
  mockQuestions.forEach(q => {
    if (mockAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const score = Math.round((correctCount / total) * 100);
  const timeUsedSeconds = 15 * 60 - mockTimerSeconds;
  const mins = Math.floor(timeUsedSeconds / 60);
  const secs = timeUsedSeconds % 60;

  if (score >= 80) {
    playSound("correct");
  } else {
    playSound("wrong");
  }

  const resultBox = document.getElementById("mock-exam-result-banner");
  if (resultBox) {
    resultBox.style.display = "block";
    resultBox.innerHTML = `
      <div class="result-score-circle" style="${score >= 80 ? 'border-color: var(--success); color: var(--success);' : 'border-color: var(--primary);'}">
        <div class="circle-val">${score}</div>
        <div class="circle-unit">分</div>
      </div>
      <div class="result-content">
        <h3 class="result-heading">${score >= 90 ? '🏆 頂標！概念融會貫通！' : (score >= 70 ? '🎉 表現優良！核心觀念具備！' : '💪 仍有進步空間，請精讀下方錯題解析！')}</h3>
        <p class="result-detail">
          全真大考共 <strong>${total}</strong> 題 · 答對 <strong>${correctCount}</strong> 題 · 答錯 <strong>${total - correctCount}</strong> 題 · 作答耗時 <strong>${mins} 分 ${secs} 秒</strong>
        </p>
        <div class="result-actions">
          <button type="button" class="btn btn-outline" id="mock-retry-btn">🔄 重新挑戰全真大考</button>
          <a href="#cheatsheet" class="btn btn-secondary">📖 複習考前速記寶典</a>
        </div>
      </div>
    `;

    document.getElementById("mock-retry-btn").addEventListener("click", resetMockExam);
    resultBox.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  renderMockExamQuestions();
  renderBubbleSheet();
}

// 輔助函式：陣列隨機打亂
function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}
