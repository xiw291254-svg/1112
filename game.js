/**
 * 《星海之境 · 迴光之誓》 (Astral Sanctuary) - 視覺小說引擎核心
 * 支援 50 重深度幾何解謎、4 大夥伴感情攻略、流暢快進跳過對話、精確劇情存讀檔與命運回溯
 */

document.addEventListener('DOMContentLoaded', () => {
  const VN_DATA = window.VN_DATA;

  // ================= 1. 遊戲全局狀態 =================
  const state = {
    currentSceneIndex: 0,
    
    // 4 大夥伴戰友羈絆好感度 (初始 50)
    bonds: {
      luna: 50,
      seris: 50,
      elena: 50,
      mira: 50
    },

    inventory: [],
    selectedItem: null,
    solvedCount: 0,
    activePuzzleId: null,

    // 對話狀態機 (精確記錄當前劇本鍵值與指針)
    currentDialogueKey: 'start',
    dialogueQueue: [],
    dialoguePointer: 0,
    isTyping: false,
    typewriterTimer: null,
    currentFullText: '',
    autoPlay: false,
    autoPlayTimer: null,
    isFastForwarding: false,
    uiHidden: false,

    // 歷史履歷
    backlog: []
  };

  // DOM 元素引用
  const sceneLayers = document.querySelectorAll('.scene-layer');
  const navPills = document.querySelectorAll('.nav-pill');
  const btnPrev = document.getElementById('btn-nav-prev');
  const btnNext = document.getElementById('btn-nav-next');
  const leftDestName = document.getElementById('left-dest-name');
  const rightDestName = document.getElementById('right-dest-name');
  const hotspotsLayer = document.getElementById('hotspots-layer');

  // 對話 UI
  const dialogueDock = document.getElementById('dialogue-dock');
  const dialogueBox = document.getElementById('dialogue-box');
  const dialogueTextBody = document.getElementById('dialogue-text-body');
  const speakerNameplate = document.getElementById('speaker-nameplate');
  const speakerName = document.getElementById('speaker-name');
  const speakerIcon = document.getElementById('speaker-icon');
  const choiceContainer = document.getElementById('choice-container');
  const btnSkipText = document.getElementById('btn-skip-text');

  // 角色動態立繪 DOM
  const activeCompanionSprite = document.getElementById('active-companion-sprite');
  const charRoleBadge = document.getElementById('char-role-badge');
  const charNameFloating = document.getElementById('char-name-floating');

  // 頂部 HUD 與道具
  const invSlots = document.querySelectorAll('.inv-cell');
  const toastBox = document.getElementById('toast-box');
  const puzzleScoreText = document.getElementById('puzzle-score-text');

  // 解謎專用彈窗
  const puzzleModal = document.getElementById('puzzle-modal');
  const pmIcon = document.getElementById('pm-icon');
  const pmTitle = document.getElementById('pm-title');
  const pmSceneTag = document.getElementById('pm-scene-tag');
  const pmDesc = document.getElementById('pm-desc');
  const pmInteractiveStage = document.getElementById('pm-interactive-stage');
  const btnPuzzleVerify = document.getElementById('btn-puzzle-verify');
  const btnPuzzleHint = document.getElementById('btn-puzzle-hint');

  // ================= 2. 背景粒子渲染 =================
  function initAmbientParticles() {
    const canvas = document.getElementById('ambient-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.8,
      speedY: Math.random() * 0.4 + 0.1,
      speedX: (Math.random() - 0.5) * 0.2,
      alpha: Math.random()
    }));

    function loop() {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;
        if (p.y < 0) {
          p.y = h;
          p.x = Math.random() * w;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${0.2 + 0.6 * Math.sin(p.alpha += 0.02)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      requestAnimationFrame(loop);
    }
    loop();
  }

  // ================= 3. 場景切換與左右箭頭控制 =================
  function switchScene(index, direction = 1, triggerDialogue = true) {
    if (index < 0) index = VN_DATA.scenes.length - 1;
    if (index >= VN_DATA.scenes.length) index = 0;

    state.currentSceneIndex = index;
    window.soundEngine.playRoomWhoosh(direction);

    sceneLayers.forEach((layer, idx) => {
      layer.classList.toggle('active', idx === index);
    });

    navPills.forEach((pill, idx) => {
      pill.classList.toggle('active', idx === index);
    });

    const leftIdx = (index - 1 + VN_DATA.scenes.length) % VN_DATA.scenes.length;
    const rightIdx = (index + 1) % VN_DATA.scenes.length;
    if (leftDestName) leftDestName.innerText = VN_DATA.scenes[leftIdx].name;
    if (rightDestName) rightDestName.innerText = VN_DATA.scenes[rightIdx].name;

    renderSceneHotspots();
    autoSaveGame();

    const cur = VN_DATA.scenes[index];
    showToast(`📍 抵達【${cur.name}】`);

    if (triggerDialogue && index > 0 && VN_DATA.dialogues[`scene_${index}`]) {
      startDialogue(VN_DATA.dialogues[`scene_${index}`], `scene_${index}`);
    }
  }

  btnPrev?.addEventListener('click', () => switchScene(state.currentSceneIndex - 1, -1));
  btnNext?.addEventListener('click', () => switchScene(state.currentSceneIndex + 1, 1));

  navPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const idx = parseInt(pill.getAttribute('data-scene'), 10);
      switchScene(idx, idx > state.currentSceneIndex ? 1 : -1);
    });
  });

  // 鍵盤導航
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') btnPrev?.click();
    else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') btnNext?.click();
    else if (e.key === ' ' || e.key === 'Enter') advanceDialogueSmoothly();
    else if (e.key === 's' || e.key === 'S') document.getElementById('btn-save-load')?.click();
    else if (e.key === 't' || e.key === 'T') document.getElementById('btn-timeline')?.click();
    else if (e.key === 'q' || e.key === 'Q') document.getElementById('btn-quest-log')?.click();
    else if (e.key === 'l' || e.key === 'L') document.getElementById('btn-backlog')?.click();
  });

  // ================= 4. 場景 50 重解謎熱點動態渲染 =================
  function renderSceneHotspots() {
    if (!hotspotsLayer) return;
    hotspotsLayer.innerHTML = '';
    const currentScene = VN_DATA.scenes[state.currentSceneIndex];

    // 動態排列場景中的多重謎題光點
    currentScene.puzzles.forEach((pKey, idx) => {
      const pData = VN_DATA.puzzles[pKey];
      if (!pData) return;

      const total = currentScene.puzzles.length;
      // 平均分散佈局
      const posX = 18 + (idx % 4) * 22 + (idx > 3 ? 6 : 0);
      const posY = idx < 4 ? 45 : 70;

      const node = document.createElement('div');
      node.className = 'hotspot-interactive-node';
      node.style.left = `${posX}%`;
      node.style.top = `${posY}%`;

      node.innerHTML = `
        <div class="hotspot-orb ${pData.solved ? 'solved' : ''}">
          <div class="hotspot-sparkle-ring"></div>
          <span>${pData.solved ? '✨' : '🧩'}</span>
        </div>
        <div class="hotspot-title-tag">${pData.title} ${pData.solved ? '✓' : ''}</div>
      `;

      node.addEventListener('click', (e) => {
        e.stopPropagation();
        openPuzzleModal(pData);
      });

      hotspotsLayer.appendChild(node);
    });
  }

  // ================= 5. 解謎小遊戲動態渲染 =================
  function openPuzzleModal(pData) {
    state.activePuzzleId = pData.id;
    window.soundEngine.playPrismRotate();

    pmIcon.innerText = pData.solved ? '✨' : '🧩';
    pmTitle.innerText = pData.title;
    pmSceneTag.innerText = `${VN_DATA.scenes[pData.sceneIndex].name} · ${pData.solved ? '已解開' : '未解開'}`;
    pmDesc.innerText = pData.desc;

    pmInteractiveStage.innerHTML = '';
    renderSpecificPuzzleStage(pData);
    puzzleModal.style.display = 'flex';
  }

  function renderSpecificPuzzleStage(pData) {
    const stage = pmInteractiveStage;

    switch (pData.type) {
      case 'dial_angle': {
        const row = document.createElement('div');
        row.className = 'dial-row';
        ['第一星環', '第二星環', '第三星環'].forEach((label, i) => {
          const item = document.createElement('div');
          item.className = 'dial-item';
          item.innerHTML = `
            <div class="dial-circle">${pData.current[i]}°</div>
            <span style="font-size:11px; color:var(--text-dim);">${label}</span>
          `;
          item.querySelector('.dial-circle').onclick = function() {
            pData.current[i] = (pData.current[i] + (pData.target[i] || 45)) % 360;
            this.innerText = `${pData.current[i]}°`;
            window.soundEngine.playPrismRotate();
          };
          row.appendChild(item);
        });
        stage.appendChild(row);
        break;
      }
      case 'rune_lock': {
        const runes = ['🜂', '🜄', '🜁', '🜃'];
        const grid = document.createElement('div');
        grid.className = 'rune-buttons-grid';
        pData.current.forEach((r, i) => {
          const btn = document.createElement('button');
          btn.className = 'rune-btn-slot';
          btn.innerText = r;
          btn.onclick = () => {
            const nextIdx = (runes.indexOf(pData.current[i]) + 1) % runes.length;
            pData.current[i] = runes[nextIdx];
            btn.innerText = pData.current[i];
            window.soundEngine.playPrismRotate();
          };
          grid.appendChild(btn);
        });
        stage.appendChild(grid);
        break;
      }
      case 'number_pad': {
        const wrap = document.createElement('div');
        wrap.style.display = 'flex';
        wrap.style.flexDirection = 'column';
        wrap.style.alignItems = 'center';
        wrap.style.gap = '10px';
        wrap.innerHTML = `
          <input type="text" id="numpad-input" value="${pData.current}" placeholder="輸入數值答案" style="background:#050711; border:1.5px solid var(--border-cyan); border-radius:12px; color:#fff; font-size:18px; text-align:center; padding:6px 14px; width:170px;" />
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:6px;">
            ${[1,2,3,4,5,6,7,8,9,0].map(n => `<button class="btn-secondary btn-num" data-num="${n}" style="padding:6px 12px; font-weight:700;">${n}</button>`).join('')}
            <button class="btn-secondary" id="btn-num-clear" style="grid-column: span 2; padding:6px;">清除</button>
          </div>
        `;
        wrap.querySelectorAll('.btn-num').forEach(b => {
          b.onclick = () => {
            const inp = wrap.querySelector('#numpad-input');
            inp.value += b.getAttribute('data-num');
            pData.current = inp.value;
            window.soundEngine.playPrismRotate();
          };
        });
        wrap.querySelector('#btn-num-clear').onclick = () => {
          wrap.querySelector('#numpad-input').value = '';
          pData.current = '';
        };
        stage.appendChild(wrap);
        break;
      }
      case 'music_harp': {
        const row = document.createElement('div');
        row.className = 'chime-flowers-row';
        const notes = [
          { n: 1, name: 'Do', icon: '🌸' }, { n: 3, name: 'Mi', icon: '🌺' },
          { n: 5, name: 'Sol', icon: '🌼' }, { n: 6, name: 'La', icon: '🪷' },
          { n: 8, name: 'HiDo', icon: '✨' }
        ];
        notes.forEach(note => {
          const btn = document.createElement('button');
          btn.className = 'chime-btn';
          btn.innerHTML = `<span>${note.icon}</span><strong style="color:#fff; font-size:11px;">${note.name}</strong>`;
          btn.onclick = () => {
            pData.userSeq.push(note.n);
            window.soundEngine.playStarChime(note.n);
            if (pData.userSeq.length > (pData.sequence ? pData.sequence.length : 5)) pData.userSeq.shift();
          };
          row.appendChild(btn);
        });
        stage.appendChild(row);
        break;
      }
      default: {
        const box = document.createElement('div');
        box.style.textAlign = 'center';
        box.innerHTML = `
          <div style="font-size:44px; margin-bottom:8px;">✨</div>
          <p style="font-size:13px; color:var(--text-gold);">點擊下方【印證符印】引導以太能量流轉，觸發機關共鳴！</p>
        `;
        stage.appendChild(box);
        break;
      }
    }
  }

  // 成功解開謎題
  function solvePuzzleSuccess(pData) {
    if (pData.solved) return;
    pData.solved = true;
    state.solvedCount++;
    window.soundEngine.playPuzzleSolved();
    updatePuzzleProgress();
    puzzleModal.style.display = 'none';

    if (pData.rewardItem && VN_DATA.items[pData.rewardItem]) {
      addItemToInventory(VN_DATA.items[pData.rewardItem]);
    }

    showToast(`🎉 成功破解【${pData.title}】！(${state.solvedCount} / 50)`);
    renderSceneHotspots();
    autoSaveGame();

    startDialogue([
      { speaker: 'system', text: `【${pData.title}】已成功解開！神殿共鳴能量擴散！` },
      { speaker: 'luna', text: '「太棒了，艾倫！古代的以太迴路正在逐一復甦！」' }
    ]);

    if (state.solvedCount >= 50) {
      setTimeout(() => triggerFinalCompanionshipEvaluation(), 2500);
    }
  }

  btnPuzzleVerify?.addEventListener('click', () => {
    if (!state.activePuzzleId) return;
    const pData = VN_DATA.puzzles[state.activePuzzleId];
    if (pData.solved) {
      showToast('✨ 此處機關早已被你成功解開！');
      puzzleModal.style.display = 'none';
      return;
    }

    let isSuccess = false;
    switch (pData.type) {
      case 'dial_angle': isSuccess = pData.current[0] === pData.target[0] && pData.current[1] === pData.target[1] && pData.current[2] === pData.target[2]; break;
      case 'rune_lock': isSuccess = JSON.stringify(pData.current) === JSON.stringify(pData.target); break;
      case 'number_pad': isSuccess = pData.current.trim() === pData.target; break;
      case 'music_harp': isSuccess = JSON.stringify(pData.userSeq) === JSON.stringify(pData.sequence); break;
      default: isSuccess = true; break;
    }

    if (isSuccess) solvePuzzleSuccess(pData);
    else showToast('❌ 符印尚未完全契合，請再思考或查看右上角【答案秘卷】！');
  });

  btnPuzzleHint?.addEventListener('click', () => {
    if (!state.activePuzzleId) return;
    const pData = VN_DATA.puzzles[state.activePuzzleId];
    showToast(`💡 啟示：${pData.desc}`);
  });

  document.getElementById('btn-close-puzzle')?.addEventListener('click', () => puzzleModal.style.display = 'none');

  // ================= 6. 右上角：50 謎題官方答案秘卷 (Cheat Sheet) =================
  document.getElementById('btn-cheat-sheet')?.addEventListener('click', () => {
    const modal = document.getElementById('cheat-sheet-modal');
    const list = document.getElementById('cheat-sheet-list');

    list.innerHTML = Object.values(VN_DATA.puzzles).map(p => `
      <div class="cheat-item-box ${p.solved ? 'solved' : ''}">
        <div class="cheat-left-info">
          <div class="cheat-puzzle-title">${p.title} ${p.solved ? '✓ (已破解)' : ''}</div>
          <div class="cheat-scene-badge">場景：${VN_DATA.scenes[p.sceneIndex].name}</div>
          <div class="cheat-solution-text">${p.solutionText || '點擊印證即可直接通過。'}</div>
        </div>
        <div>
          ${!p.solved ? `<button class="btn-auto-solve" data-pid="${p.id}">⚡ 一鍵破解</button>` : '<span style="font-size:12px; color:var(--emerald-neon); font-weight:700;">已解鎖</span>'}
        </div>
      </div>
    `).join('');

    list.querySelectorAll('.btn-auto-solve').forEach(btn => {
      btn.onclick = () => {
        const pid = btn.getAttribute('data-pid');
        const targetP = VN_DATA.puzzles[pid];
        if (targetP && !targetP.solved) {
          solvePuzzleSuccess(targetP);
          document.getElementById('btn-cheat-sheet').click();
        }
      };
    });

    modal.style.display = 'flex';
    window.soundEngine.playPrismRotate();
  });

  document.getElementById('btn-close-cheat')?.addEventListener('click', () => {
    document.getElementById('cheat-sheet-modal').style.display = 'none';
  });

  // ================= 7. 劇情存檔與讀檔系統 (Save & Load) =================
  function autoSaveGame() {
    saveToSlot(0, '自動存檔 (Auto-Save)');
  }

  function saveToSlot(slotIndex, customName = null) {
    const saveData = {
      name: customName || `存檔槽位 0${slotIndex}`,
      timestamp: new Date().toLocaleString(),
      sceneIndex: state.currentSceneIndex,
      bonds: { ...state.bonds },
      inventory: [...state.inventory],
      solvedPuzzles: Object.keys(VN_DATA.puzzles).filter(k => VN_DATA.puzzles[k].solved),
      solvedCount: state.solvedCount,
      currentDialogueKey: state.currentDialogueKey,
      dialoguePointer: state.dialoguePointer,
      backlog: [...state.backlog]
    };
    localStorage.setItem(`astral_vn_save_v2_${slotIndex}`, JSON.stringify(saveData));
  }

  function loadFromSlot(slotIndex) {
    const raw = localStorage.getItem(`astral_vn_save_v2_${slotIndex}`);
    if (!raw) {
      showToast('⚠️ 該槽位暫無存檔資料！');
      return;
    }
    const data = JSON.parse(raw);
    state.bonds = data.bonds || { luna: 50, seris: 50, elena: 50, mira: 50 };
    state.inventory = data.inventory || [];
    state.solvedCount = data.solvedCount || 0;
    state.backlog = data.backlog || [];

    // 恢復 50 謎題狀態
    Object.keys(VN_DATA.puzzles).forEach(k => {
      VN_DATA.puzzles[k].solved = (data.solvedPuzzles || []).includes(k);
    });

    updateBondHeaderUI();
    updatePuzzleProgress();
    renderInventory();
    switchScene(data.sceneIndex || 0, 1, false);

    // 恢復確切對話進度
    if (data.currentDialogueKey && VN_DATA.dialogues[data.currentDialogueKey]) {
      state.currentDialogueKey = data.currentDialogueKey;
      state.dialogueQueue = VN_DATA.dialogues[data.currentDialogueKey];
      state.dialoguePointer = data.dialoguePointer || 0;
      showNextLine();
    }

    document.getElementById('save-load-modal').style.display = 'none';
    showToast(`📂 成功讀取【${data.name}】！`);
    window.soundEngine.playPuzzleSolved();
  }

  document.getElementById('btn-save-load')?.addEventListener('click', () => {
    const modal = document.getElementById('save-load-modal');
    const grid = document.getElementById('save-slots-grid');

    grid.innerHTML = [0, 1, 2, 3].map(slotIdx => {
      const raw = localStorage.getItem(`astral_vn_save_v2_${slotIdx}`);
      const data = raw ? JSON.parse(raw) : null;
      const isAuto = slotIdx === 0;

      return `
        <div class="save-slot-item">
          <div class="save-slot-header">
            <span>${isAuto ? '⚡ 自動存檔' : `槽位 0${slotIdx}`}</span>
            <span style="font-size:10px; color:var(--text-dim);">${data ? data.timestamp : '空槽位'}</span>
          </div>
          <div class="save-slot-meta">
            ${data ? `場景：${VN_DATA.scenes[data.sceneIndex].name}<br/>解謎進度：${data.solvedCount} / 50<br/>劇本進度：行 ${data.dialoguePointer + 1}` : '無記錄存檔'}
          </div>
          ${data ? `
            <div class="save-slot-bonds">
              <span>🌙 ${data.bonds.luna}</span>
              <span>⚗️ ${data.bonds.seris}</span>
              <span>⚔️ ${data.bonds.elena}</span>
              <span>🗡️ ${data.bonds.mira}</span>
            </div>
          ` : ''}
          <div class="save-slot-actions">
            ${!isAuto ? `<button class="btn-secondary btn-slot-save" data-slot="${slotIdx}">💾 保存</button>` : ''}
            <button class="btn-primary btn-slot-load" data-slot="${slotIdx}" ${!data ? 'disabled style="opacity:0.4;"' : ''}>📂 讀取</button>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.btn-slot-save').forEach(b => {
      b.onclick = () => {
        const s = parseInt(b.getAttribute('data-slot'), 10);
        saveToSlot(s);
        showToast(`💾 存檔成功！已保存至槽位 0${s}`);
        document.getElementById('btn-save-load').click();
      };
    });

    grid.querySelectorAll('.btn-slot-load').forEach(b => {
      b.onclick = () => {
        const s = parseInt(b.getAttribute('data-slot'), 10);
        loadFromSlot(s);
      };
    });

    modal.style.display = 'flex';
    window.soundEngine.playPrismRotate();
  });

  document.getElementById('btn-close-save-load')?.addEventListener('click', () => {
    document.getElementById('save-load-modal').style.display = 'none';
  });

  // ================= 8. 命運時空回溯系統 (Timeline Rewind) =================
  document.getElementById('btn-timeline')?.addEventListener('click', () => {
    const modal = document.getElementById('timeline-modal');
    const list = document.getElementById('timeline-nodes-list');

    list.innerHTML = VN_DATA.checkpoints.map(cp => `
      <div class="timeline-node-item">
        <div class="node-info">
          <h4>${cp.name}</h4>
          <p>${cp.desc}</p>
        </div>
        <button class="btn-primary btn-jump-cp" data-sidx="${cp.sceneIndex}">⏳ 回溯至此</button>
      </div>
    `).join('');

    list.querySelectorAll('.btn-jump-cp').forEach(b => {
      b.onclick = () => {
        const sidx = parseInt(b.getAttribute('data-sidx'), 10);
        switchScene(sidx);
        modal.style.display = 'none';
        showToast('⏳ 命運線已成功回溯！');
        startDialogue(VN_DATA.dialogues.start, 'start');
      };
    });

    modal.style.display = 'flex';
    window.soundEngine.playPrismRotate();
  });

  document.getElementById('btn-close-timeline')?.addEventListener('click', () => {
    document.getElementById('timeline-modal').style.display = 'none';
  });

  // ================= 9. 流暢打字機對話與快進跳過系統 =================
  function startDialogue(queue, keyName = 'temp') {
    if (!queue || queue.length === 0) return;
    state.currentDialogueKey = keyName;
    state.dialogueQueue = queue;
    state.dialoguePointer = 0;
    showNextLine();
  }

  function showNextLine() {
    if (state.dialoguePointer >= state.dialogueQueue.length) return;
    const currentLine = state.dialogueQueue[state.dialoguePointer];

    const speakerData = VN_DATA.characters[currentLine.speaker] || VN_DATA.characters.narrator;
    if (speakerData.name) {
      speakerNameplate.style.display = 'inline-flex';
      speakerName.innerText = speakerData.name;
      speakerIcon.innerText = speakerData.avatar || '✦';
      speakerNameplate.style.borderColor = speakerData.color || 'var(--border-purple)';
      speakerName.style.color = speakerData.color || 'var(--purple-neon)';
    } else {
      speakerNameplate.style.display = 'none';
    }

    updateCompanionSpriteVisual(currentLine.speaker);

    state.backlog.push({ speaker: speakerData.name || '旁白', text: currentLine.text });

    playTypewriter(currentLine.text, () => {
      if (currentLine.choices && currentLine.choices.length > 0) {
        state.isFastForwarding = false;
        renderChoices(currentLine.choices);
      } else if (state.isFastForwarding) {
        // 快進模式：50ms 後迅速進入下一句
        setTimeout(() => {
          state.dialoguePointer++;
          showNextLine();
        }, 50);
      } else if (state.autoPlay) {
        clearTimeout(state.autoPlayTimer);
        state.autoPlayTimer = setTimeout(() => {
          state.dialoguePointer++;
          showNextLine();
        }, 2200);
      }
    });
  }

  function updateCompanionSpriteVisual(speakerKey) {
    const charData = VN_DATA.characters[speakerKey];
    if (charData && charData.bgClass) {
      activeCompanionSprite.className = `sprite-container ${charData.bgClass}`;
      charRoleBadge.innerText = `${charData.avatar} ${charData.name.split(' ')[0]}`;
      charNameFloating.innerText = charData.name;
      charNameFloating.style.color = charData.color;
    }
  }

  function playTypewriter(fullText, onComplete) {
    clearInterval(state.typewriterTimer);
    state.isTyping = true;
    state.currentFullText = fullText;
    dialogueTextBody.innerText = '';
    choiceContainer.style.display = 'none';

    let charIdx = 0;
    const speed = state.isFastForwarding ? 4 : 20;

    state.typewriterTimer = setInterval(() => {
      if (charIdx < fullText.length) {
        dialogueTextBody.innerText += fullText.charAt(charIdx);
        charIdx++;
        if (charIdx % 4 === 0 && !state.isFastForwarding) window.soundEngine.playPrismRotate();
      } else {
        clearInterval(state.typewriterTimer);
        state.isTyping = false;
        if (onComplete) onComplete();
      }
    }, speed);
  }

  // 點擊對話框流暢推進/瞬間跳過打字機
  function advanceDialogueSmoothly() {
    if (choiceContainer.style.display === 'flex') return;

    if (state.isTyping) {
      // 第一次點擊：瞬間完成當前打字機
      clearInterval(state.typewriterTimer);
      state.isTyping = false;
      dialogueTextBody.innerText = state.currentFullText;
      const cur = state.dialogueQueue[state.dialoguePointer];
      if (cur && cur.choices) renderChoices(cur.choices);
    } else {
      // 第二次點擊：立即進入下一句
      state.dialoguePointer++;
      showNextLine();
    }
  }

  dialogueBox.addEventListener('click', advanceDialogueSmoothly);

  // 快進按鈕點擊
  btnSkipText?.addEventListener('click', (e) => {
    e.stopPropagation();
    state.isFastForwarding = true;
    showToast('⏩ 正在快進對話……');
    advanceDialogueSmoothly();
  });

  function renderChoices(choices) {
    choiceContainer.innerHTML = '';
    choiceContainer.style.display = 'flex';

    choices.forEach(ch => {
      const btn = document.createElement('button');
      btn.className = 'choice-btn';
      btn.innerText = ch.text;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        window.soundEngine.playStarChime(4);
        choiceContainer.style.display = 'none';

        if (ch.targetChar && ch.affinity && state.bonds[ch.targetChar] !== undefined) {
          state.bonds[ch.targetChar] += ch.affinity;
          updateBondHeaderUI();
          showToast(`💖 ${VN_DATA.characters[ch.targetChar].name} 好感度提升至 ${state.bonds[ch.targetChar]}！`);
        }

        if (ch.next && VN_DATA.dialogues[ch.next]) {
          startDialogue(VN_DATA.dialogues[ch.next], ch.next);
        } else {
          state.dialoguePointer++;
          showNextLine();
        }
      });
      choiceContainer.appendChild(btn);
    });
  }

  function updateBondHeaderUI() {
    document.getElementById('bond-val-luna').innerText = state.bonds.luna;
    document.getElementById('bond-val-seris').innerText = state.bonds.seris;
    document.getElementById('bond-val-elena').innerText = state.bonds.elena;
    document.getElementById('bond-val-mira').innerText = state.bonds.mira;
  }

  // ================= 10. 終章感情結局檢定 (戰友情 vs 分道揚鑣) =================
  function triggerFinalCompanionshipEvaluation() {
    const modal = document.getElementById('ending-modal');
    const evalBox = document.getElementById('ending-companions-eval');
    const endingTitle = document.getElementById('ending-title');
    const endingDesc = document.getElementById('ending-desc');

    const threshold = 60;
    const chars = ['luna', 'seris', 'elena', 'mira'];
    let bondedCount = 0;

    evalBox.innerHTML = chars.map(cKey => {
      const c = VN_DATA.characters[cKey];
      const val = state.bonds[cKey];
      const isBonded = val >= threshold;
      if (isBonded) bondedCount++;

      return `
        <div class="companion-eval-card ${isBonded ? 'bonded' : 'parted'}">
          <div class="eval-name">${c.avatar} ${c.name} (${val} pts)</div>
          <div class="eval-status ${isBonded ? 'bonded' : 'parted'}">
            ${isBonded ? '💖 戰友情：生死與共，立下靈魂誓約！' : '💔 分道揚鑣：理念不合，各奔前程。'}
          </div>
        </div>
      `;
    }).join('');

    if (bondedCount >= 3) {
      endingTitle.innerText = 'TRUE END · 戰友誓約之光';
      endingDesc.innerText = '你以真誠與智慧破解了 50 重遠古謎題，贏得了全體夥伴的絕對信任！四位守護者與你並肩作戰，永恆星海重獲新生！';
    } else {
      endingTitle.innerText = 'NORMAL END · 孤獨的旅人';
      endingDesc.innerText = '神殿的機關雖已重啟，但因理念的差異，夥伴們在世界樹下與你揮手道別，各自踏上了孤獨的旅途……';
    }

    modal.style.display = 'flex';
    window.soundEngine.playVictoryFanfare();
  }

  // ================= 11. 背包與圖鑑與輔助按鈕 =================
  function addItemToInventory(item) {
    if (state.inventory.some(it => it.id === item.id)) return;
    state.inventory.push(item);
    renderInventory();
    showToast(`🎁 獲得新聖物【${item.name}】！`);
  }

  function renderInventory() {
    invSlots.forEach((slot, idx) => {
      const it = state.inventory[idx];
      slot.innerHTML = '';
      if (it) {
        slot.classList.remove('empty');
        slot.innerText = it.icon;
        slot.title = `${it.name} (點擊檢視)`;
        slot.onclick = () => openItemModal(it);
      } else {
        slot.classList.add('empty');
        slot.onclick = null;
      }
    });
  }

  function openItemModal(item) {
    state.selectedItem = item;
    const modal = document.getElementById('item-modal');
    document.getElementById('inspect-title').innerText = item.name;
    document.getElementById('inspect-icon').innerText = item.icon;
    document.getElementById('inspect-type').innerText = item.type;
    document.getElementById('inspect-desc').innerText = item.desc;
    modal.style.display = 'flex';
    window.soundEngine.playPrismRotate();
  }

  document.getElementById('btn-close-item')?.addEventListener('click', () => {
    document.getElementById('item-modal').style.display = 'none';
  });

  function updatePuzzleProgress() {
    if (puzzleScoreText) puzzleScoreText.innerText = `${state.solvedCount} / 50`;
  }

  document.getElementById('btn-quest-log')?.addEventListener('click', () => {
    const modal = document.getElementById('quest-log-modal');
    const grid = document.getElementById('quest-puzzles-grid');
    document.getElementById('quest-modal-score').innerText = `${state.solvedCount} / 50`;
    document.getElementById('quest-modal-percent').innerText = `${Math.round((state.solvedCount / 50) * 100)}%`;

    grid.innerHTML = Object.values(VN_DATA.puzzles).map(p => `
      <div class="quest-item-card ${p.solved ? 'solved' : ''}">
        <div class="quest-item-info">
          <span class="quest-title">${p.title}</span>
          <span class="quest-scene">${VN_DATA.scenes[p.sceneIndex].name}</span>
        </div>
        <span class="${p.solved ? 'badge-solved' : 'badge-unsolved'}">${p.solved ? '已解開' : '探索中'}</span>
      </div>
    `).join('');

    modal.style.display = 'flex';
    window.soundEngine.playPrismRotate();
  });

  document.getElementById('btn-close-quest')?.addEventListener('click', () => {
    document.getElementById('quest-log-modal').style.display = 'none';
  });

  document.getElementById('btn-backlog')?.addEventListener('click', () => {
    const modal = document.getElementById('backlog-modal');
    const list = document.getElementById('backlog-content-list');
    list.innerHTML = state.backlog.map(entry => `
      <div class="backlog-entry">
        <div class="backlog-speaker">${entry.speaker}</div>
        <div class="backlog-text">${entry.text}</div>
      </div>
    `).join('');
    modal.style.display = 'flex';
    window.soundEngine.playPrismRotate();
  });

  document.getElementById('btn-close-backlog')?.addEventListener('click', () => {
    document.getElementById('backlog-modal').style.display = 'none';
  });

  document.getElementById('btn-audio-toggle')?.addEventListener('click', () => {
    const isMuted = window.soundEngine.toggleMute();
    document.getElementById('icon-sound-on').classList.toggle('hidden', isMuted);
    document.getElementById('icon-sound-off').classList.toggle('hidden', !isMuted);
    showToast(isMuted ? '🔇 音效已靜音' : '🔊 音效已開啟');
  });

  document.getElementById('btn-restart-game')?.addEventListener('click', () => window.location.reload());

  function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    toastBox.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal && modal.id !== 'ending-modal') modal.style.display = 'none';
    });
  });

  // ================= 初始化執行 =================
  initAmbientParticles();
  switchScene(0);
  updateBondHeaderUI();
  updatePuzzleProgress();
  startDialogue(VN_DATA.dialogues.start, 'start');
});
