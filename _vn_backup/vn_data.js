/**
 * 《星海之境 · 迴光之誓》 (Chronicles of the Astral Sanctuary)
 * 視覺小說 完整資料庫：4 大夥伴感情攻略、50 重深度幾何與邏輯謎題、全詳解答案秘卷、劇本分歧
 */

window.VN_DATA = {
  // 4 大夥伴角色設定
  characters: {
    player: { name: '艾倫 (Alen)', color: '#00f0ff', avatar: '✦', title: '時之記憶編織者' },
    luna: { id: 'luna', name: '露娜 (Luna)', title: '星穹神殿守護司祭', color: '#c084fc', avatar: '🌙', bgClass: 'sprite-luna', personality: '溫柔虔誠，渴望破除三百年的孤獨循環。' },
    seris: { id: 'seris', name: '賽利斯 (Seris)', title: '天體鍊金奇才', color: '#fbbf24', avatar: '⚗️', bgClass: 'sprite-seris', personality: '崇尚數據與比例的怪才學者。' },
    elena: { id: 'elena', name: '伊蓮娜 (Elena)', title: '星界星環聖騎士長', color: '#f43f5e', avatar: '⚔️', bgClass: 'sprite-elena', personality: '以誓言為刃，絕不背棄戰友。' },
    mira: { id: 'mira', name: '米拉 (Mira)', title: '幽冥星之引路人', color: '#38bdf8', avatar: '🗡️', bgClass: 'sprite-mira', personality: '行蹤莫測的傲嬌盜賊，精通隱秘暗號。' },
    system: { name: '神殿機關', color: '#38bdf8', avatar: '❖' },
    narrator: { name: '', color: '#e2e8f0', avatar: '' }
  },

  // 6 大探索場景 (共分配 50 個深度謎題)
  scenes: [
    {
      id: 'library',
      name: '星穹大圖書館',
      subName: 'The Celestial Archive',
      desc: '沉睡著上古數學、星圖與密碼學古籍的智慧殿堂。',
      puzzles: ['p_01', 'p_02', 'p_03', 'p_04', 'p_05', 'p_06', 'p_07', 'p_08', 'p_09']
    },
    {
      id: 'garden',
      name: '月影琉璃溫室',
      subName: 'The Moonlit Conservatory',
      desc: '夜光花卉與以太神泉流淌的生靈聖所。',
      puzzles: ['p_10', 'p_11', 'p_12', 'p_13', 'p_14', 'p_15', 'p_16', 'p_17']
    },
    {
      id: 'clocktower',
      name: '煉金時計塔',
      subName: 'The Chrono Clocktower',
      desc: '複雜齒輪、天體儀與鍊金試劑運轉的時間核心。',
      puzzles: ['p_18', 'p_19', 'p_20', 'p_21', 'p_22', 'p_23', 'p_24', 'p_25']
    },
    {
      id: 'observatory',
      name: '星象觀測迴廊',
      subName: 'The Astral Observatorium',
      desc: '能窺視超空間幾何與深空光譜的超維觀測台。',
      puzzles: ['p_26', 'p_27', 'p_28', 'p_29', 'p_30', 'p_31', 'p_32', 'p_33']
    },
    {
      id: 'foundry',
      name: '元素魔導工坊',
      subName: 'The Elemental Foundry',
      desc: '以太線路導通與高壓激光折射的能量熔爐。',
      puzzles: ['p_34', 'p_35', 'p_36', 'p_37', 'p_38', 'p_39', 'p_40', 'p_41']
    },
    {
      id: 'shrine',
      name: '星辰聖壇與世界樹',
      subName: 'The Astral Shrine',
      desc: '四大夥伴靈魂共鳴與時空奇點歸一的終極聖域。',
      puzzles: ['p_42', 'p_43', 'p_44', 'p_45', 'p_46', 'p_47', 'p_48', 'p_49', 'p_50']
    }
  ],

  // 50 個高難度幾何與邏輯謎題庫 (含官方答案秘卷)
  puzzles: {
    // === 圖書館 (01 ~ 09) ===
    p_01: { id: 'p_01', sceneIndex: 0, title: '01. 斐波那契天體星軌儀', type: 'dial_angle', desc: '斐波那契數列黃金角：將三層星軌旋轉至黃金比例角 [55° / 89° / 144°]。', target: [55, 89, 144], current: [0, 0, 0], rewardItem: 'starlight_prism', solutionText: '【解答】點擊三環分別調至 55°、89°、144° 即可觸發黃金共鳴！', solved: false },
    p_02: { id: 'p_02', sceneIndex: 0, title: '02. 四象元素克制密碼鎖', type: 'rune_lock', desc: '依據克制循環：【火 🜂 剋 風 🜁 剋 地 🜃 剋 水 🜄】排列。', target: ['🜂', '🜁', '🜃', '🜄'], current: ['🜃', '🜄', '🜂', '🜁'], rewardItem: 'element_scroll', solutionText: '【解答】符文切換為：[火 🜂]、[風 🜁]、[地 🜃]、[水 🜄]！', solved: false },
    p_03: { id: 'p_03', sceneIndex: 0, title: '03. 丟番圖古代算術方程式', type: 'number_pad', desc: '「星辰七次方乘三，減去天體常數 15，再除以二」( (7 × 3 - 15) / 2 = ? )', target: '3', current: '', solutionText: '【解答】於數字鍵盤輸入「3」並點擊印證！', solved: false },
    p_04: { id: 'p_04', sceneIndex: 0, title: '04. 凱撒位移星象密文破譯', type: 'number_pad', desc: '密文為 [F-L-O-W]，位移量為 +3，解密後的字符 ASCII 總和為 312。請輸入檢驗碼 312。', target: '312', current: '', solutionText: '【解答】輸入檢驗碼「312」！', solved: false },
    p_05: { id: 'p_05', sceneIndex: 0, title: '05. 莫比烏斯立體殘頁幾何', type: 'slider_puzzle', desc: '旋轉殘卷拼合莫比烏斯無限環。', target: [1, 2, 3, 4], current: [3, 1, 4, 2], solutionText: '【解答】點擊調整碎片次序為 1-2-3-4！', solved: false },
    p_06: { id: 'p_06', sceneIndex: 0, title: '06. 恆星亮度微積分衰減率', type: 'number_pad', desc: '「光子流從 100% 歷經三次半衰期後剩餘百分比」(100 / 8 = 12.5)。請輸入整數 12。', target: '12', current: '', solutionText: '【解答】輸入整數「12」！', solved: false },
    p_07: { id: 'p_07', sceneIndex: 0, title: '07. 亞歷山大藏書十進制索引', type: 'number_pad', desc: '星圖典籍編號：根號 625 加上 7 的平方 (25 + 49 = 74)。', target: '74', current: '', solutionText: '【解答】輸入索引號「74」！', solved: false },
    p_08: { id: 'p_08', sceneIndex: 0, title: '08. 蒼穹星座幾何對稱矩陣', type: 'rune_lock', desc: '排列四角星座：【天琴 🜂 ➔ 天鵝 🜄 ➔ 仙女 🜁 ➔ 仙王 🜃】。', target: ['🜂', '🜄', '🜁', '🜃'], current: ['🜁', '🜂', '🜄', '🜃'], solutionText: '【解答】排列為 火、水、風、地！', solved: false },
    p_09: { id: 'p_09', sceneIndex: 0, title: '09. 古代七曜曆法交食週期', type: 'number_pad', desc: '沙羅交食週期：223 個朔望月。請輸入沙羅常數 223。', target: '223', current: '', rewardItem: 'ancient_score', solutionText: '【解答】輸入「223」解開圖書館隱藏聖典！', solved: false },

    // === 溫室 (10 ~ 17) ===
    p_10: { id: 'p_10', sceneIndex: 1, title: '10. 水晶風鈴花十二平均律', type: 'music_harp', desc: '按照樂譜【Do - Mi - Sol - La - HiDo】彈奏生命讚歌。', sequence: [1, 3, 5, 6, 8], userSeq: [], solutionText: '【解答】依序點擊：Do ➔ Mi ➔ Sol ➔ La ➔ HiDo！', solved: false },
    p_11: { id: 'p_11', sceneIndex: 1, title: '11. 以太虹吸三管壓差配平', type: 'valve_pipe', desc: '調節 A(+30%), B(+45%), C(+25%) 使壓力達 100%。', valves: [false, false, false], rewardItem: 'moon_dew', solutionText: '【解答】將三枚閥門 A, B, C 全部點亮開啟！', solved: false },
    p_12: { id: 'p_12', sceneIndex: 1, title: '12. 發光靈蝶波長光譜排序', type: 'color_order', desc: '波長排序：【赤紅 ➔ 耀金 ➔ 翠綠 ➔ 靛青】。', target: ['red', 'gold', 'green', 'cyan'], current: ['cyan', 'red', 'green', 'gold'], solutionText: '【解答】由長至短：紅 ➔ 金 ➔ 綠 ➔ 青！', solved: false },
    p_13: { id: 'p_13', sceneIndex: 1, title: '13. 月神雙鏡光路折射', type: 'laser_angle', desc: '調節凹面鏡偏轉至 60° 匯聚光束消除荊棘。', target: 60, current: 0, rewardItem: 'flora_gem', solutionText: '【解答】滑桿拖動至 60°！', solved: false },
    p_14: { id: 'p_14', sceneIndex: 1, title: '14. 曼陀羅植物向光性角度鎖', type: 'dial_angle', desc: '向光生長方位角：[晨曦 90° / 正午 180° / 暮光 270°]。', target: [90, 180, 270], current: [0, 0, 0], solutionText: '【解答】三環分別設為 90°、180°、270°！', solved: false },
    p_15: { id: 'p_15', sceneIndex: 1, title: '15. 夜光水仙生長週期推演', type: 'number_pad', desc: '「一株生二、二生四、四生八，經六代之數」(2^6 = 64)。', target: '64', current: '', solutionText: '【解答】輸入「64」！', solved: false },
    p_16: { id: 'p_16', sceneIndex: 1, title: '16. 露水表面張力微量滴定', type: 'potion_mix', desc: '加入 3 滴以太、2 滴水銀、1 滴赤焰 (3:2:1)。', target: { ether: 3, mercury: 2, fire: 1 }, current: { ether: 0, mercury: 0, fire: 0 }, solutionText: '【解答】點擊 以太 3 次、水銀 2 次、赤焰 1 次！', solved: false },
    p_17: { id: 'p_17', sceneIndex: 1, title: '17. 琉璃穹頂極光偏振濾光', type: 'rgb_overlap', desc: '疊加青色 (Cyan) 與黃色 (Yellow) 鏡片產生純綠光。', slots: ['cyan', 'yellow'], solutionText: '【解答】選擇 青色 + 黃色 濾鏡！', solved: false },

    // === 時計塔 (18 ~ 25) ===
    p_18: { id: 'p_18', sceneIndex: 2, title: '18. 差速黃銅行星齒輪組', type: 'gear_select', desc: '選擇 12 齒與 24 齒達成 1:2 減速比。', target: [12, 24], current: [0, 0], solutionText: '【解答】左側選 12，右側選 24！', solved: false },
    p_19: { id: 'p_19', sceneIndex: 2, title: '19. 天文鐘十二宮雙指針刻度', type: 'clock_hands', desc: '日針撥至金牛座(2點)，月針撥至天蠍座(8點)。', target: { sun: 2, moon: 8 }, current: { sun: 0, moon: 0 }, rewardItem: 'chrono_key', solutionText: '【解答】日針 2、月針 8！', solved: false },
    p_20: { id: 'p_20', sceneIndex: 2, title: '20. 賢者之石四元鍊金質量守恆', type: 'potion_mix', desc: '精確加入 4 滴以太、3 滴水銀、2 滴赤焰。', target: { ether: 4, mercury: 3, fire: 2 }, current: { ether: 0, mercury: 0, fire: 0 }, rewardItem: 'chrono_catalyst', solutionText: '【解答】以太 4 次、水銀 3 次、赤焰 2 次！', solved: false },
    p_21: { id: 'p_21', sceneIndex: 2, title: '21. 高壓蒸汽階梯式洩壓聯鎖', type: 'pressure_button', desc: '依序按下緊急閥門 [A ➔ C ➔ B ➔ D]。', target: ['A', 'C', 'B', 'D'], userSeq: [], solutionText: '【解答】依序按 A ➔ C ➔ B ➔ D！', solved: false },
    p_22: { id: 'p_22', sceneIndex: 2, title: '22. 鐘擺簡諧運動共振頻率', type: 'wave_tuner', desc: '調節擺動頻率至神聖諧振點 440 Hz。', targetFreq: 440, currentFreq: 220, solutionText: '【解答】滑桿拖至 440 Hz！', solved: false },
    p_23: { id: 'p_23', sceneIndex: 2, title: '23. 莫比烏斯環拓撲扭結解扣', type: 'slider_puzzle', desc: '解開時空拓撲紐結，按順序 1-2-3-4 歸位。', target: [1, 2, 3, 4], current: [2, 4, 1, 3], solutionText: '【解答】碎片排成 1-2-3-4！', solved: false },
    p_24: { id: 'p_24', sceneIndex: 2, title: '24. 重力水銀氣壓計刻度', type: 'number_pad', desc: '標準大氣壓水銀柱高度：760 mmHg。', target: '760', current: '', solutionText: '【解答】輸入「760」！', solved: false },
    p_25: { id: 'p_25', sceneIndex: 2, title: '25. 報時鳥音簧諧音音栓', type: 'music_harp', desc: '演奏整點報時四音律【Do - Sol - Mi - Do】。', sequence: [1, 5, 3, 1], userSeq: [], solutionText: '【解答】點擊：Do ➔ Sol ➔ Mi ➔ Do！', solved: false },

    // === 觀測迴廊 (26 ~ 33) ===
    p_26: { id: 'p_26', sceneIndex: 3, title: '26. 3D 多面體超立方體陰影', type: 'shadow_rot', desc: '旋轉星石使 Y 軸達 45° 產生神聖鑰匙陰影。', target: { x: 0, y: 45, z: 0 }, current: { x: 45, y: 30, z: 20 }, rewardItem: 'shadow_lens', solutionText: '【解答】Y 軸調至 45°，吻合度達 90%+！', solved: false },
    p_27: { id: 'p_27', sceneIndex: 3, title: '27. 蒼穹神鳥七星連線大陣', type: 'constellation_line', desc: '依次連綴 0-1-2-3-4-5-6-0 完成神鳥。', nodes: 7, rewardItem: 'astral_gem', solutionText: '【解答】依序連線 0 到 6 再回 0！', solved: false },
    p_28: { id: 'p_28', sceneIndex: 3, title: '28. 4x4 洛書超級幻方陣', type: 'number_pad', desc: '幻方常數為 34，缺口數為 34 減去 33 = 1。請輸入 1。', target: '1', current: '', solutionText: '【解答】輸入「1」！', solved: false },
    p_29: { id: 'p_29', sceneIndex: 3, title: '29. 牛頓環干涉光譜色散校正', type: 'dial_angle', desc: '光程差校正角：[45° / 90° / 135°]。', target: [45, 90, 135], current: [0, 0, 0], solutionText: '【解答】三環設為 45°、90°、135°！', solved: false },
    p_30: { id: 'p_30', sceneIndex: 3, title: '30. 多普勒紅移星系退行速度', type: 'number_pad', desc: '光速 c 的 10% (30,000 km/s)。輸入數值 30000。', target: '30000', current: '', solutionText: '【解答】輸入「30000」！', solved: false },
    p_31: { id: 'p_31', sceneIndex: 3, title: '31. 折射望遠鏡消色差雙膠合透鏡', type: 'rgb_overlap', desc: '選擇紅藍對偶濾光鏡。', slots: ['red', 'blue'], solutionText: '【解答】選擇 紅色 + 藍色 濾鏡！', solved: false },
    p_32: { id: 'p_32', sceneIndex: 3, title: '32. 脈衝星摩斯密碼 [S-O-S]', type: 'pressure_button', desc: '依序按下 [. . .  - - -  . . .] 救援訊號。', target: ['A', 'A', 'B', 'B'], userSeq: [], solutionText: '【解答】連點 A, A, B, B！', solved: false },
    p_33: { id: 'p_33', sceneIndex: 3, title: '33. 重力透鏡光束偏轉角度', type: 'laser_angle', desc: '愛因斯坦偏折角：調整至 45°。', target: 45, current: 0, solutionText: '【解答】滑桿拖至 45°！', solved: false },

    // === 魔導工坊 (34 ~ 41) ===
    p_34: { id: 'p_34', sceneIndex: 4, title: '34. 雙正弦波李薩如圖形調諧', type: 'wave_tuner', desc: '調諧雙波相位至 440 Hz。', targetFreq: 440, currentFreq: 110, rewardItem: 'resonator_core', solutionText: '【解答】滑桿拖至 440 Hz！', solved: false },
    p_35: { id: 'p_35', sceneIndex: 4, title: '35. 4x4 導力符文電路導通', type: 'circuit_rotate', desc: '旋轉方塊接通熔爐電源。', tiles: [0, 90, 180, 270], solutionText: '【解答】點擊印證直接接通以太回路！', solved: false },
    p_36: { id: 'p_36', sceneIndex: 4, title: '36. 槓桿滑輪組多重力臂平衡', type: 'balance_scale', desc: '放置 8g + 5g 法碼平衡 13g 星核。', target: 13, current: 0, rewardItem: 'solar_crest', solutionText: '【解答】放置 8g 與 5g 法碼！', solved: false },
    p_37: { id: 'p_37', sceneIndex: 4, title: '37. 四象以太激光分束矩陣', type: 'laser_grid', desc: '折射 4 道激光至終端。', solutionText: '【解答】點擊印證直接聚焦！', solved: false },
    p_38: { id: 'p_38', sceneIndex: 4, title: '38. 鍛造魔導合金熱膨脹比', type: 'potion_mix', desc: '比例：秘銀 3 + 精金 2 + 火精 1。', target: { ether: 3, mercury: 2, fire: 1 }, current: { ether: 0, mercury: 0, fire: 0 }, solutionText: '【解答】以太 3、水銀 2、赤焰 1！', solved: false },
    p_39: { id: 'p_39', sceneIndex: 4, title: '39. 電磁感應線圈自感磁通量', type: 'number_pad', desc: '電感係數 L = 100 毫亨。輸入 100。', target: '100', current: '', solutionText: '【解答】輸入「100」！', solved: false },
    p_40: { id: 'p_40', sceneIndex: 4, title: '40. 黑體輻射維恩位移定則', type: 'number_pad', desc: '太陽表面色溫：5800 K。輸入 5800。', target: '5800', current: '', solutionText: '【解答】輸入「5800」！', solved: false },
    p_41: { id: 'p_41', sceneIndex: 4, title: '41. 聚能核心高壓電弧防護', type: 'dial_angle', desc: '電弧偏向三相角：[120° / 240° / 360°]。', target: [120, 240, 0], current: [0, 0, 0], solutionText: '【解答】設為 120°、240°、0°！', solved: false },

    // === 聖壇世界樹 (42 ~ 50) ===
    p_42: { id: 'p_42', sceneIndex: 5, title: '42. 六角芒星神聖幾何節點', type: 'constellation_line', desc: '連綴 6 芒星頂點完成幾何結界。', nodes: 6, solutionText: '【解答】連線形成正反雙三角形六角星！', solved: false },
    p_43: { id: 'p_43', sceneIndex: 5, title: '43. 世界之樹年輪碳十四衰變計', type: 'number_pad', desc: '世界樹年齡：300 年。請輸入 300。', target: '300', current: '', solutionText: '【解答】輸入「300」！', solved: false },
    p_44: { id: 'p_44', sceneIndex: 5, title: '44. 四方聖印超維八元數矩陣', type: 'socket_four', desc: '安置四大聖印喚醒世界樹。', solutionText: '【解答】點擊印證直接安置四大聖印！', solved: false },
    p_45: { id: 'p_45', sceneIndex: 5, title: '45. 露娜的心之誓言試煉', type: 'heart_dialogue', desc: '「你願意與我一同承擔星海的命運嗎？」', solutionText: '【解答】選擇「我願意永遠守護在妳身邊」！', solved: false },
    p_46: { id: 'p_46', sceneIndex: 5, title: '46. 賽利斯的終極以太方程', type: 'number_pad', desc: '質能方程常數 c^2 符號代碼：999。', target: '999', current: '', solutionText: '【解答】輸入「999」！', solved: false },
    p_47: { id: 'p_47', sceneIndex: 5, title: '47. 伊蓮娜的聖騎士誓約劍陣', type: 'rune_lock', desc: '陣型：【堅守 🜃 ➔ 突刺 🜂 ➔ 護盾 🜄 ➔ 疾風 🜁】。', target: ['🜃', '🜂', '🜄', '🜁'], current: ['🜁', '🜂', '🜄', '🜃'], solutionText: '【解答】排列為 地、火、水、風！', solved: false },
    p_48: { id: 'p_48', sceneIndex: 5, title: '48. 米拉的暗影迷蹤瞬移路徑', type: 'pressure_button', desc: '步法順序：[D ➔ B ➔ C ➔ A]。', target: ['D', 'B', 'C', 'A'], userSeq: [], solutionText: '【解答】點擊 D ➔ B ➔ C ➔ A！', solved: false },
    p_49: { id: 'p_49', sceneIndex: 5, title: '49. 世界樹脈動七拍多重節奏', type: 'rhythm_tap', desc: '跟隨節奏完成 7 拍神聖同步。', targetBeats: [1, 1, 0, 1, 0, 1, 1], solutionText: '【解答】點擊印證直接同步共振！', solved: false },
    p_50: { id: 'p_50', sceneIndex: 5, title: '50. 終極超維萬象星盤奇點歸一', type: 'grand_finale', desc: '轉動核心星盤開啟昇華之門！', solutionText: '【解答】點擊印證啟動終極通關！', solved: false }
  },

  // 道具定義
  items: {
    starlight_prism: { id: 'starlight_prism', name: '星光稜鏡', icon: '💎', type: '光學聖物', desc: '折射純淨星光的高階水晶。' },
    element_scroll: { id: 'element_scroll', name: '元素共鳴古卷', icon: '📜', type: '古籍秘卷', desc: '記錄四大元素調和的羊皮紙。' },
    ancient_score: { id: 'ancient_score', name: '星之詠嘆樂譜', icon: '🎼', type: '音律法卷', desc: '喚醒世界之樹的古老旋律。' },
    moon_dew: { id: 'moon_dew', name: '月露精粹', icon: '🧪', type: '以太聖藥', desc: '萃取於月影神泉的純淨液體。' },
    flora_gem: { id: 'flora_gem', name: '生命翡翠', icon: '💚', type: '自然結晶', desc: '蘊含自然繁衍之力的翡翠。' },
    chrono_key: { id: 'chrono_key', name: '時之發條鑰匙', icon: '🗝️', type: '時間遺物', desc: '掌握神殿時間齒輪的莫比烏斯鑰匙。' },
    chrono_catalyst: { id: 'chrono_catalyst', name: '時空催化劑', icon: '✨', type: '鍊金藥劑', desc: '加速魔導機關反應的金色溶劑。' },
    shadow_lens: { id: 'shadow_lens', name: '幽影透鏡', icon: '◐', type: '暗影法器', desc: '看穿光影虛實的黑曜石薄片。' },
    astral_gem: { id: 'astral_gem', name: '星辰秘石', icon: '✵', type: '星穹基石', desc: '凝聚恆星能量的神聖結晶。' },
    resonator_core: { id: 'resonator_core', name: '諧振水晶核心', icon: '🔮', type: '導力元件', desc: '以固定頻率持續震盪的魔導核心。' },
    solar_crest: { id: 'solar_crest', name: '光之聖印', icon: '✦', type: '神殿至寶', desc: '四方聖印之一，始源之光。' }
  },

  // 劇本對話 (支援流暢快進與存檔精確記錄)
  dialogues: {
    start: [
      { speaker: 'narrator', text: '意識穿透璀璨的星雲……神殿大門在耀眼的星光中緩緩開啟。' },
      { speaker: 'luna', text: '「時之旅者艾倫，歡迎來到星海之境。我是神殿守護司祭露娜。」' },
      { speaker: 'seris', text: '「哇哈哈！終於有新的智慧生命體踏進這座古老機關城了！我是首席鍊金學者賽利斯！」' },
      { speaker: 'elena', text: '「我是星環騎士長伊蓮娜。此地危機四伏，我將以手中之劍保證全體人員的安全。」' },
      { speaker: 'mira', text: '「切……又來了一個自以為是的冒險者。我是米拉，別指望我會特別照顧你哦。」' },
      {
        speaker: 'luna',
        text: '「我們四人各自代表著神殿不同的守護信念。在接下來的探索中，你的每一個選擇，都將決定我們最終是結為【生死與共的戰友】，亦或是【理念不合而分道揚鑣】。」',
        choices: [
          { text: '「露娜，我會以真誠與信念守護神殿！」', next: 'talk_luna_lead', targetChar: 'luna', affinity: 15 },
          { text: '「賽利斯，讓我們一起破解 50 重古代機械！」', next: 'talk_seris_lead', targetChar: 'seris', affinity: 15 },
          { text: '「伊蓮娜，我的後背就交給妳守護了！」', next: 'talk_elena_lead', targetChar: 'elena', affinity: 15 },
          { text: '「米拉，我很期待妳的暗影身手。」', next: 'talk_mira_lead', targetChar: 'mira', affinity: 15 }
        ]
      }
    ],
    talk_luna_lead: [
      { speaker: 'luna', text: '「謝謝你，艾倫……你的溫柔能撫平三百年以來的孤寂。（露娜好感度 +15）」' },
      { speaker: 'luna', text: '「請探索圖書館中的星軌儀與古籍，解開被封印的 9 重智慧之鎖吧！」' }
    ],
    talk_seris_lead: [
      { speaker: 'seris', text: '「太棒了！知音難尋！整整 50 重機關等著我們大展身手！（賽利斯好感度 +15）」' },
      { speaker: 'seris', text: '「右上角有我精心整理的【答案秘卷】，卡關隨時能一鍵破解！」' }
    ],
    talk_elena_lead: [
      { speaker: 'elena', text: '「很好！戰士之間的信任重於生命，我必誓死護你周全！（伊蓮娜好感度 +15）」' },
      { speaker: 'elena', text: '「勇往直前吧，有我的星環之盾在，任何陷阱都傷不到你！」' }
    ],
    talk_mira_lead: [
      { speaker: 'mira', text: '「哼……油嘴滑舌。不過算你有眼光啦！（米拉好感度 +15）」' },
      { speaker: 'mira', text: '「別掉以輕心，各個角落的隱蔽符印就由我來替你標記出來吧。」' }
    ],

    // === 場景 1：月影溫室 劇情 ===
    scene_1: [
      { speaker: 'narrator', text: '踏入月影溫室，四周飄散著以太夜光花的淡雅清香，琉璃穹頂下蝴蝶翩翩起舞。' },
      { speaker: 'luna', text: '「這些神泉是維繫整座神殿生命的源泉。艾倫，你能感受到空氣中流動的共鳴嗎？」' },
      { speaker: 'mira', text: '「喂喂，別光顧著賞花，那邊的水晶風鈴花和以太三閥門機關可是會噴出毒霧的！」' },
      {
        speaker: 'elena',
        text: '「大家小心戒備。艾倫，我們該如何展開調查？」',
        choices: [
          { text: '「與露娜一同感應音律水晶的十二平均律。」', next: 'garden_choice_luna', targetChar: 'luna', affinity: 10 },
          { text: '「相信米拉的敏銳直覺，先排查毒霧閥門。」', next: 'garden_choice_mira', targetChar: 'mira', affinity: 10 }
        ]
      }
    ],
    garden_choice_luna: [
      { speaker: 'luna', text: '「謝謝你的信任，艾倫。閉上眼睛……隨我一同聆聽生命讚歌。（露娜好感度 +10）」' }
    ],
    garden_choice_mira: [
      { speaker: 'mira', text: '「嘿！果然聽專業盜賊的準沒錯！本小姐就大發慈悲幫你把風！（米拉好感度 +10）」' }
    ],

    // === 場景 2：時計塔 劇情 ===
    scene_2: [
      { speaker: 'narrator', text: '金屬齒輪的交錯聲響徹雲霄，巨大的天文鐘在虛空中緩緩轉動。' },
      { speaker: 'seris', text: '「看啊！差速黃銅行星齒輪組！還有賢者之石的四元質量守恆配方！這簡直是鍊金學的最高傑作！」' },
      { speaker: 'elena', text: '「這裡的高壓蒸汽管線極其危險，稍有不慎就會引發連環爆炸。」' },
      {
        speaker: 'seris',
        text: '「艾倫！你願意相信我的精密計算，還是伊蓮娜的直覺判斷？」',
        choices: [
          { text: '「賽利斯，我支持你的鍊金精準度！」', next: 'clock_choice_seris', targetChar: 'seris', affinity: 10 },
          { text: '「伊蓮娜，以妳的堅定防護為優先！」', next: 'clock_choice_elena', targetChar: 'elena', affinity: 10 }
        ]
      }
    ],
    clock_choice_seris: [
      { speaker: 'seris', text: '「哈哈哈哈！果然英雄所見略同！看我把齒輪比調至極致！（賽利斯好感度 +10）」' }
    ],
    clock_choice_elena: [
      { speaker: 'elena', text: '「明智的抉擇。安全第一，我會為大家撐開星環力場。（伊蓮娜好感度 +10）」' }
    ],

    // === 場景 3：星象觀測迴廊 劇情 ===
    scene_3: [
      { speaker: 'narrator', text: '站上萬丈星空的觀測迴廊，超維幾何投影在腳下如瀑布般展開。' },
      { speaker: 'luna', text: '「看著這片星海，總會讓人想起神殿沉睡前那場漫長的浩劫……」' },
      { speaker: 'mira', text: '「……那場浩劫奪走了我的故鄉。但我不會沉溺在悲傷裡。」' },
      {
        speaker: 'narrator',
        text: '夥伴們注視著你，等待著時空旅者的指引。',
        choices: [
          { text: '「露娜，未來不再有孤獨，我們將重寫星辰的命運。」', next: 'obs_choice_luna', targetChar: 'luna', affinity: 12 },
          { text: '「米拉，妳的勇敢令人敬佩，我會陪妳走到最後。」', next: 'obs_choice_mira', targetChar: 'mira', affinity: 12 }
        ]
      }
    ],
    obs_choice_luna: [
      { speaker: 'luna', text: '「重寫命運……艾倫，遇見你是我三百年來最幸福的事。（露娜好感度 +12）」' }
    ],
    obs_choice_mira: [
      { speaker: 'mira', text: '「……笨蛋，幹嘛突然說這種肉麻話……謝啦。（米拉好感度 +12）」' }
    ],

    // === 場景 4：元素魔導工坊 劇情 ===
    scene_4: [
      { speaker: 'narrator', text: '熾熱的以太熔爐燃燒著耀眼的藍白色火焰，四周閃爍著高壓電弧。' },
      { speaker: 'elena', text: '「此處的以太激光與諧振核心是整座神殿的能量源泉，也是最危險的試煉之地。」' },
      { speaker: 'seris', text: '「只要我們解開 34 到 41 重的雙正弦波李薩如圖形與力臂天平，就能啟動四方聖印！」' },
      {
        speaker: 'elena',
        text: '「艾倫，在踏入終極聖壇前，請讓我們結為最牢不可破的陣型！」',
        choices: [
          { text: '「伊蓮娜，以聖騎士之誓，生死與共！」', next: 'foundry_choice_elena', targetChar: 'elena', affinity: 12 },
          { text: '「賽利斯，用你的導力科學震撼整個星界！」', next: 'foundry_choice_seris', targetChar: 'seris', affinity: 12 }
        ]
      }
    ],
    foundry_choice_elena: [
      { speaker: 'elena', text: '「生死與共！我伊蓮娜以星環聖劍起誓，永不背棄！（伊蓮娜好感度 +12）」' }
    ],
    foundry_choice_seris: [
      { speaker: 'seris', text: '「衝啊！讓古代先賢見識一下現代鍊金學的威力！（賽利斯好感度 +12）」' }
    ],

    // === 場景 5：星辰聖壇與世界樹 終章劇情 ===
    scene_5: [
      { speaker: 'narrator', text: '世界之樹巨大的光枝穿透星穹，50 重機關的終極奇點在此匯聚！' },
      { speaker: 'luna', text: '「我們終於走到了這裡……四方聖印已經全部集齊。」' },
      { speaker: 'seris', text: '「只差最後一道【終極超維萬象星盤】（第50題），奇點即將歸一！」' },
      { speaker: 'elena', text: '「艾倫，無論前方是昇華還是毀滅，我們始終與你同在。」' },
      { speaker: 'mira', text: '「哼，可別在最後關頭掉鏈子啊，隊長！」' },
      {
        speaker: 'narrator',
        text: '在轉動世界樹核心之前，你對身邊的四位戰友說道：',
        choices: [
          { text: '「【生死誓約】我們是一個不可分割的整體，共同迎接新星海！」', next: 'shrine_choice_all', targetChar: 'luna', affinity: 10 },
          { text: '「【孤勇前行】世界樹的危險由我一人承擔，大家退後！」', next: 'shrine_choice_solo', targetChar: 'mira', affinity: -10 }
        ]
      }
    ],
    shrine_choice_all: [
      { speaker: 'elena', text: '「說得好！這就是我們所認可的隊長！（全體好感度提升）」' },
      { speaker: 'luna', text: '「請解開最後的第 50 題，讓我們一同見證星海的重生！」' }
    ],
    shrine_choice_solo: [
      { speaker: 'mira', text: '「你在胡說什麼啊！？我們不是一路並肩作戰走過來的嗎！？（米拉好感度 -10）」' },
      { speaker: 'elena', text: '「艾倫……別小看戰友的決心啊！」' }
    ]
  },

  checkpoints: [
    { id: 'cp_start', name: '序章：四大夥伴之誓', sceneIndex: 0, desc: '甦醒於星穹大圖書館，與露娜、賽利斯、伊蓮娜、米拉初遇。' },
    { id: 'cp_garden', name: '貳章：月影溫室之花', sceneIndex: 1, desc: '月露神泉與音律水晶，加深與夥伴的情感羈絆。' },
    { id: 'cp_clock', name: '參章：時計塔的黃金比', sceneIndex: 2, desc: '精密齒輪與鍊金調配，考驗彼此的智慧默契。' },
    { id: 'cp_observatory', name: '肆章：星穹暗影與觀測', sceneIndex: 3, desc: '3D 投影與七星連線，迎來信念的重大分歧。' },
    { id: 'cp_foundry', name: '伍章：導力熔爐之火', sceneIndex: 4, desc: '以太諧振與天平試煉，最終共鳴前的整備。' },
    { id: 'cp_shrine', name: '終章：世界樹之誓約', sceneIndex: 5, desc: '四方聖印歸位，迎來【戰友情誓約】或【分道揚鑣】結局！' }
  ]
};
