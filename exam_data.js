/**
 * 數位科技概論（上）隨堂測驗卷 - 錯題精析與全真詳解系統
 * 題庫資料集（包含第1頁13題原卷題庫 + 6題錯題變形強化訓練題）
 */

const EXAM_DATA = {
  meta: {
    title: "數位科技概論（上）隨堂測驗卷",
    volume: "第3回 系統平台的組成架構－硬體",
    chapter: "範圍：第 3 章",
    publisher: "旗立發行",
    bookCodeTeacher: "C221A3-X1",
    bookCodeStudent: "C221A3-Y1",
    student: {
      department: "資料處理科",
      grade: "一年仁班",
      name: "洪欣愉",
      seatNo: "6",
      score: 64,
      totalQuestionsOnPage: 13,
      correctCountOnPage: 10,
      wrongCountOnPage: 3,
      pageScore: 40,
      pageTotalScore: 52
    }
  },
  // 原卷 13 題
  questions: [
    {
      id: 1,
      category: "記憶體階層",
      text: "隨機存取記憶體（RAM）區分為動態隨機存取記憶體（DRAM）及靜態隨機存取記憶體（SRAM）兩種，請問下列哪一項是SRAM優於DRAM的特點？",
      options: [
        { key: "A", text: "單位資料的存取速度較快" },
        { key: "B", text: "單位面積所能儲存資料量較小" },
        { key: "C", text: "需要持續充電更新（refresh），才能確保資料完整" },
        { key: "D", text: "每單位資料的儲存成本較低" }
      ],
      studentAnswer: "A",
      correctAnswer: "A",
      isCorrect: true,
      cropImg: "crop_q1.jpg",
      highlight: "SRAM 速度極快，主要用作快取記憶體（Cache Memory）。",
      analysis: `
        <p><strong>【核心觀念：SRAM vs DRAM 特性對比】</strong></p>
        <ul>
          <li><strong>SRAM（靜態隨機存取記憶體）</strong>：內部由正反器（Flip-Flop，通常包含 4~6 顆電晶體）組成，只要通電即可保持資料，<strong>不需要週期性充電更新（No Refresh）</strong>，其<strong>存取速度非常快</strong>（通常在幾奈秒內），故廣泛應用於 CPU 內部的<strong>快取記憶體（Cache Memory）</strong>。然而其電路複雜、集成度低、單位面積儲存量小、成本昂貴。</li>
          <li><strong>DRAM（動態隨機存取記憶體）</strong>：每個位元僅需 1 顆電晶體與 1 個電容儲存電荷，構造簡單、集成度高、每單位成本低，主要用作電腦的<strong>主記憶體（Main Memory）</strong>。但因為電容存在漏電現象，必須每隔一段時間<strong>進行持續充電更新（Refresh）</strong>，存取速度明顯慢於 SRAM。</li>
        </ul>
        <p><strong>【選項剖析】</strong></p>
        <p>(A) <strong>正確</strong>：SRAM 存取速度顯著高於 DRAM，是其主要優勢。<br>
        (B) 單位面積所能儲存資料量較小是 SRAM 的缺點（集成度低）。<br>
        (C) 需要 refresh 是 DRAM 的缺點，SRAM 不需要 refresh。<br>
        (D) 儲存成本較低是 DRAM 的優勢，SRAM 單價較高。</p>
      `,
      knowledgeTip: "口訣：SRAM 速（S）度快不必充電當快取；DRAM 動（D）態漏電需更新當主存。"
    },
    {
      id: 2,
      category: "五大單元",
      text: "傑克將iPhone手機拍攝的照片轉存到電腦中，並列印出來與朋友分享，請問列印設備在電腦的五大單元中，是歸屬為下列哪一種單元？",
      options: [
        { key: "A", text: "控制單元" },
        { key: "B", text: "輸入單元" },
        { key: "C", text: "輸出單元" },
        { key: "D", text: "記憶單元" }
      ],
      studentAnswer: "C",
      correctAnswer: "C",
      isCorrect: true,
      cropImg: "crop_q2.jpg",
      highlight: "列印設備（印表機）將數位資料轉為實體文件輸出，屬於輸出單元（Output Unit）。",
      analysis: `
        <p><strong>【核心觀念：電腦五大單元職責分類】</strong></p>
        <p>范紐曼架構將電腦硬體劃分為五大單元：</p>
        <ol>
          <li><strong>輸入單元（Input Unit, IU）</strong>：將外界資訊轉換成電腦可處理的二進位形式送入電腦，如鍵盤、滑鼠、掃描器、數位相機。</li>
          <li><strong>輸出單元（Output Unit, OU）</strong>：將電腦內部運算處理完畢的資料，轉換為人類可感知的文字、圖像、聲音或紙本印出，如<strong>印表機（列印設備）</strong>、螢幕（顯示器）、喇叭、投影機。</li>
          <li><strong>記憶單元（Memory Unit, MU）</strong>：存放程式指令與資料。</li>
          <li><strong>控制單元（Control Unit, CU）</strong>：指揮調度各單元運作。</li>
          <li><strong>算術邏輯單元（Arithmetic and Logic Unit, ALU）</strong>：負責各類算術與邏輯運算。</li>
        </ol>
        <p>傑克使用的<strong>列印設備（印表機）</strong>將相片輸出於紙張，屬於標準的<strong>輸出單元</strong>，故選 (C)。</p>
      `,
      knowledgeTip: "判斷原則：資料「進電腦」是輸入；資訊「給人類看/聽/印」是輸出。"
    },
    {
      id: 3,
      category: "五大單元",
      text: "下列對於電腦硬體五大單元的敘述何者有誤？",
      options: [
        { key: "A", text: "輸入單元：待處理的資料須經由此單元進入電腦" },
        { key: "B", text: "輸出單元：處理完成之資料由此單元送出" },
        { key: "C", text: "算術邏輯單元：所有的算術運算均在此單元完成" },
        { key: "D", text: "記憶單元：僅儲存輸入待處理之資料。" }
      ],
      studentAnswer: "D",
      correctAnswer: "D",
      isCorrect: true,
      cropImg: "crop_q3.jpg",
      highlight: "記憶單元除了儲存待處理資料，還必須儲存「程式指令」、「中間計算暫存結果」與「準備輸出的結果」，絕非『僅』儲存輸入資料。",
      analysis: `
        <p><strong>【核心觀念：記憶單元的多重儲存職責】</strong></p>
        <p>記憶單元（Memory Unit, MU）在范紐曼架構中實行<strong>「內儲程式概念（Stored-Program Concept）」</strong>，其儲存的內容包含四大類：</p>
        <ul>
          <li><strong>原始輸入資料</strong>：由輸入單元傳入等待處理的原始資料。</li>
          <li><strong>程式指令碼</strong>：控制電腦執行每一步驟的機器碼/指令序列。</li>
          <li><strong>中繼運算資料</strong>：運算過程產生的中間變數與暫存值。</li>
          <li><strong>處理完成結果</strong>：運算結束、準備送交輸出單元顯示或列印的最終資料。</li>
        </ul>
        <p>選項 (D) 敘述使用了極端字詞<strong>「僅儲存輸入待處理之資料」</strong>，忽略了程式、運算中間值與輸出資料的儲存功能，敘述明顯錯誤，故為正確答案。</p>
      `,
      knowledgeTip: "考題破題技巧：遇到包含「僅（only）」、「絕對」、「必然」等過度武斷詞彙的敘述時，通常為錯誤敘述。"
    },
    {
      id: 4,
      category: "五大單元",
      text: "電腦基本架構中有數個主要的組成單元（或部門），其中負責存放電腦程式與資料的單元是：",
      options: [
        { key: "A", text: "算術與邏輯單元" },
        { key: "B", text: "輸入單元" },
        { key: "C", text: "記憶單元" },
        { key: "D", text: "控制單元" }
      ],
      studentAnswer: "C",
      correctAnswer: "C",
      isCorrect: true,
      cropImg: "crop_q4.jpg",
      highlight: "記憶單元（Memory Unit）職司程式指令與資料之儲存。",
      analysis: `
        <p><strong>【核心觀念：內儲程式與記憶體】</strong></p>
        <p>在當代電腦系統架構中，所有欲被執行的應用程式指令碼以及需要處理的各項資料，都必須載入至<strong>記憶單元（Memory Unit, MU）</strong>中才能供 CPU 讀取並執行。</p>
        <ul>
          <li>(A) 算術與邏輯單元：負責運算，不負責長效存放程式與大量資料。</li>
          <li>(B) 輸入單元：負責採集外在資料輸入，不存放。</li>
          <li>(C) <strong>記憶單元</strong>：負責存放程式碼與所有運算資料，為正確答案。</li>
          <li>(D) 控制單元：負責解讀指令與控制協調各部運作。</li>
        </ul>
      `,
      knowledgeTip: "記住：范紐曼架構三大基石之一就是「內儲程式」於記憶體中。"
    },
    {
      id: 5,
      category: "CPU架構",
      text: "在電腦的組成單元中，下列哪兩個單元合稱為中央處理單元？",
      options: [
        { key: "A", text: "輸入單元及控制單元" },
        { key: "B", text: "控制單元及算術／邏輯單元" },
        { key: "C", text: "輸入單元及輸出單元" },
        { key: "D", text: "算術／邏輯單元及記憶單元" }
      ],
      studentAnswer: "B",
      correctAnswer: "B",
      isCorrect: true,
      cropImg: "crop_q5.jpg",
      highlight: "CPU = 控制單元 (CU) + 算術邏輯單元 (ALU) + 暫存器 (Registers)。",
      analysis: `
        <p><strong>【核心觀念：CPU 的定義與核心構成】</strong></p>
        <p><strong>中央處理單元（Central Processing Unit, CPU）</strong>被譽為電腦的心臟與大腦，由五大單元中的兩個核心部門整合而成：</p>
        <div class="formula-box">
          <strong>CPU = 控制單元（CU） ＋ 算術邏輯單元（ALU）</strong><br>
          <small>（內部輔以暫存器組 Registers 與內部匯流排 Internal Bus）</small>
        </div>
        <p>控制單元負責調度協調，算術邏輯單元負責執行實質運算，兩者緊密結合組成微處理器（CPU）。故正確答案為 (B)。</p>
      `,
      knowledgeTip: "必考公式：CPU = CU + ALU（有時題目會把暫存器視為內部高速元件，但主單元即是 CU + ALU）。"
    },
    {
      id: 6,
      category: "周邊介面",
      text: "請問所謂的I/O指的是",
      options: [
        { key: "A", text: "1跟0" },
        { key: "B", text: "物聯網 (IoT)" },
        { key: "C", text: "輸入與輸出" },
        { key: "D", text: "整合式辦公室系統 (integrated office system)" }
      ],
      studentAnswer: "C",
      correctAnswer: "C",
      isCorrect: true,
      cropImg: "crop_q6.jpg",
      highlight: "I/O 即 Input（輸入）與 Output（輸出）之縮寫。",
      analysis: `
        <p><strong>【核心觀念：常見電腦英文縮寫解析】</strong></p>
        <ul>
          <li><strong>I/O</strong>：<strong>Input / Output</strong> 的合稱，中文翻譯為「輸入與輸出」，用來涵蓋所有與外界進行資訊交換的硬體設備、連接埠或傳輸動作（例如 I/O 介面卡、I/O 埠）。故選 (C)。</li>
          <li>(A) 1 跟 0 為二進位制（Binary System）。</li>
          <li>(B) 物聯網的英文縮寫為 <strong>IoT（Internet of Things）</strong>，不是 I/O。</li>
          <li>(D) 整合式辦公室系統一般統稱為 Office Automation (OA) 或 Integrated Office System。</li>
        </ul>
      `,
      knowledgeTip: "易混淆對照：I/O = Input / Output；IoT = Internet of Things（物聯網）。"
    },
    {
      id: 7,
      category: "周邊介面",
      text: "關於 \"熱插拔\" 的敘述，何者為真？",
      options: [
        { key: "A", text: "只能在開機的情況下插拔" },
        { key: "B", text: "只能在關機的情況下插拔" },
        { key: "C", text: "在關機及開機的情況下皆可插拔" },
        { key: "D", text: "只有當主機溫度高於一定溫度時才可插拔。" }
      ],
      studentAnswer: "C",
      correctAnswer: "C",
      isCorrect: true,
      cropImg: "crop_q7.jpg",
      highlight: "熱插拔支援通電運作時插拔，斷電關機時自然更能插拔，因此「開機與關機皆可插拔」。",
      analysis: `
        <p><strong>【核心觀念：熱插拔（Hot Swapping / Hot Plugging）機制】</strong></p>
        <p>早期硬體介面（如 PS/2 鍵盤孔、IDE 硬碟）若在通電開機時插拔，可能導致主機板晶片燒毀或系統當機，必須在<strong>關機斷電</strong>時才能進行。而具備<strong>熱插拔</strong>技術的介面（例如 USB、Thunderbolt、Hot-swap SATA/SAS）具備防突波與隨插即用（PnP）驅動偵測能力，<strong>允許使用者在系統開機運轉中直接插拔設備</strong>。</p>
        <p>既然在有通電（開機）的環境下都可以安全插拔，那麼在完全斷電（關機）的情況下當然同樣可以進行物理插拔，因此 <strong>(C) 在關機及開機的情況下皆可插拔</strong> 是最完整客觀的正確描述。</p>
        <p>(D) 提到「溫度高於一定溫度」屬於無稽之談的字面望文生義誘答。</p>
      `,
      knowledgeTip: "生活實例：USB 隨身碟與滑鼠就是最普遍的熱插拔裝置，你開機時能插拔，關機時拔掉也不會壞！"
    },
    {
      id: 8,
      category: "記憶體階層",
      text: "阿布想要為自己的筆記型電腦擴充2G的RAM，請問他應該將RAM安插在下列哪一種插槽？",
      options: [
        { key: "A", text: "記憶體插槽" },
        { key: "B", text: "PCI-E插槽" },
        { key: "C", text: "CPU插槽" },
        { key: "D", text: "M.2插槽" }
      ],
      studentAnswer: "A",
      correctAnswer: "A",
      isCorrect: true,
      cropImg: "crop_q8.jpg",
      highlight: "RAM 專門安裝於主機板上的記憶體插槽（DIMM / SO-DIMM）。",
      analysis: `
        <p><strong>【核心觀念：主機板各擴充插槽用途】</strong></p>
        <ul>
          <li><strong>(A) 記憶體插槽</strong>：專供安裝 RAM（主記憶體）的模組槽。筆記型電腦通常採用 <strong>SO-DIMM（Small Outline Dual In-line Memory Module）</strong> 插槽，故擴充 RAM 必須安裝在記憶體插槽上，正確答案為 (A)。</li>
          <li>(B) <strong>PCI-E 插槽</strong>：通常用於桌上型電腦安裝高速擴充卡，例如獨立顯示卡（GPU）、高速網路卡、音效卡或擴充轉接卡。</li>
          <li>(C) <strong>CPU 插槽</strong>：安裝微處理器（CPU）的專用腳座（如 LGA / PGA / BGA 封裝）。</li>
          <li>(D) <strong>M.2 插槽</strong>：現代電腦用於安裝 NVMe / SATA 高速固態硬碟（SSD）或 Wi-Fi 無線網卡。</li>
        </ul>
      `,
      knowledgeTip: "速記對應：RAM 裝記憶體槽；顯示卡裝 PCI-E；固態硬碟 SSD 裝 M.2；處理器裝 CPU 腳座。"
    },
    {
      id: 9,
      category: "五大單元",
      text: "微軟公司在台灣成立了亞洲第一座「雲端運算」中心，以整合電腦的運算資源，來提供給國內各項創新研究計畫使用。一般而言，研究計畫都需要大量的運算，包括計算、比對、配對等不同的處理，請問電腦中負責這些運算工作的是下列哪一個單元？",
      options: [
        { key: "A", text: "CU" },
        { key: "B", text: "MU" },
        { key: "C", text: "ALU" },
        { key: "D", text: "OU" }
      ],
      studentAnswer: "D",
      correctAnswer: "C",
      isCorrect: false,
      cropImg: "crop_q9.jpg",
      highlight: "負責「計算（加減乘除）」與「比對、配對（邏輯判斷）」的單元是 ALU（算術邏輯單元）！",
      wrongDiagnosis: `
        <div class="diagnosis-card">
          <div class="diagnosis-badge">🚨 學生盲點診斷</div>
          <p><strong>學生作答：(D) OU（Output Unit 輸出單元）❌</strong></p>
          <p><strong>錯誤成因分析：</strong></p>
          <ol>
            <li><strong>英文縮寫混淆不清</strong>：考卷上老師用紅筆在選項旁分別寫上：<code>CU = 控制</code>、<code>MU = 記憶</code>、<code>OU = 輸出</code>。這說明批改老師一眼就看出學生根本<strong>沒有記熟五大單元的英文簡寫代碼</strong>！</li>
            <li><strong>誤將「雲端提供運算結果」聯想為「輸出」</strong>：學生看到題目敘述「提供給國內各項創新研究計畫使用」，可能誤以為這是一種「輸出服務」而直覺勾選了 OU。</li>
            <li><strong>忽略了題幹最重要的核心關鍵詞</strong>：題幹明確寫出<strong>「需要大量的運算，包括計算、比對、配對等不同的處理」</strong>！「計算」就是算術運算（Arithmetic），「比對、配對」就是邏輯判斷（Logic），兩者合起來正是 <strong>ALU（Arithmetic and Logic Unit）</strong>！</li>
          </ol>
        </div>
      `,
      analysis: `
        <p><strong>【名師正解詳析：掌握五大單元英文全名與職責】</strong></p>
        <p>電腦五大單元的英文縮寫是歷年計算機概論與數位科技概論的<strong>絕對必考題</strong>：</p>
        <div class="table-responsive">
          <table class="concept-table">
            <thead>
              <tr>
                <th>英文縮寫</th>
                <th>英文全名</th>
                <th>中文名稱</th>
                <th>核心功能與題目關鍵字</th>
              </tr>
            </thead>
            <tbody>
              <tr class="highlight-row">
                <td><strong>ALU</strong></td>
                <td>Arithmetic and Logic Unit</td>
                <td><strong>算術邏輯單元</strong></td>
                <td><strong>加減乘除、計算、比對大小、邏輯判斷（AND/OR/NOT）、配對</strong></td>
              </tr>
              <tr>
                <td><strong>CU</strong></td>
                <td>Control Unit</td>
                <td><strong>控制單元</strong></td>
                <td><strong>指令解碼、協調、發號施令、指揮調度、控制信號（如交警、船長）</strong></td>
              </tr>
              <tr>
                <td><strong>MU</strong></td>
                <td>Memory Unit</td>
                <td><strong>記憶單元</strong></td>
                <td><strong>存放資料、儲存指令、暫存運算結果（如 RAM、ROM）</strong></td>
              </tr>
              <tr>
                <td><strong>IU</strong></td>
                <td>Input Unit</td>
                <td><strong>輸入單元</strong></td>
                <td><strong>資料採集、外界輸入至電腦（如鍵盤、滑鼠、麥克風）</strong></td>
              </tr>
              <tr>
                <td><strong>OU</strong></td>
                <td>Output Unit</td>
                <td><strong>輸出單元</strong></td>
                <td><strong>輸出給人觀看、列印、播音（如螢幕、印表機、喇叭）</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>本題中，雲端中心所要執行的「計算、比對、配對」全部屬於算術與邏輯處理，負責執行的唯一核心單元就是 <strong>(C) ALU</strong>。</p>
      `,
      knowledgeTip: "速記秘訣：A = Arithmetic (算術/計算)；L = Logic (邏輯/比對)；U = Unit (單元)。看到「計算+比對」二話不說選 ALU！"
    },
    {
      id: 10,
      category: "CPU架構",
      text: "MIPS為一種衡量電腦CPU之測量指標，其中I代表：",
      options: [
        { key: "A", text: "資訊 (Information)" },
        { key: "B", text: "指令 (Instruction)" },
        { key: "C", text: "輸入 (Input)" },
        { key: "D", text: "內部 (Internal)" }
      ],
      studentAnswer: "B",
      correctAnswer: "B",
      isCorrect: true,
      cropImg: "crop_q10.jpg",
      highlight: "MIPS = Million Instructions Per Second（每秒百萬條指令）。",
      analysis: `
        <p><strong>【核心觀念：CPU 效能衡量指標】</strong></p>
        <p><strong>MIPS</strong> 的全名為：</p>
        <div class="formula-box">
          <strong>M</strong>illion <strong>I</strong>nstructions <strong>P</strong>er <strong>S</strong>econd<br>
          <small>（每秒鐘所能執行的百萬條指令數）</small>
        </div>
        <p>因此其中的字母 <strong>I</strong> 代表的是 <strong>Instruction（指令）</strong>，故正確答案為 (B)。</p>
        <p><strong>補充相關指標：</strong></p>
        <ul>
          <li><strong>FLOPS（Floating-point Operations Per Second）</strong>：每秒浮點數運算次數，常用於評估科學計算、超級電腦與 GPU 深度學習效能。</li>
          <li><strong>CPI（Cycles Per Instruction）</strong>：每執行一條指令平均所需的時脈週期數。</li>
          <li><strong>Clock Rate / Frequency（時脈頻率）</strong>：單位為 GHz（十億赫茲），表示 CPU 內部的時鐘振盪頻率。</li>
        </ul>
      `,
      knowledgeTip: "高頻必考：MIPS 的 I 是 Instruction（指令）；FLOPS 的 FLOP 是 Floating-point Operation（浮點運算）。"
    },
    {
      id: 11,
      category: "五大單元",
      text: "在「星際迷航記」影集中，船長寇克領導眾船員一同探索宇宙，當遇上危機時，船長便會指派船員完成各自的工作，並引導船員們脫離險境。請問若以船長扮演的角色來看，可比喻成電腦的哪一個單元最恰當？",
      options: [
        { key: "A", text: "輸入單元" },
        { key: "B", text: "記憶單元" },
        { key: "C", text: "輸出單元" },
        { key: "D", text: "控制單元" }
      ],
      studentAnswer: "D",
      correctAnswer: "D",
      isCorrect: true,
      cropImg: "crop_q11.jpg",
      highlight: "船長統籌大局、指揮調派、發號施令，對應電腦中的控制單元（Control Unit, CU）。",
      analysis: `
        <p><strong>【核心觀念：控制單元（CU）的情境比喻】</strong></p>
        <p>控制單元（Control Unit, CU）如同電腦中的<strong>大腦中樞神經、交通警察、管弦樂團指揮家或軍隊指揮官</strong>。它的主要任務不是親自去算數學（那是 ALU 的工作），而是：</p>
        <ol>
          <li>從記憶體中提取（Fetch）指令。</li>
          <li>將指令進行解碼（Decode），搞清楚要幹什麼。</li>
          <li>向算術邏輯單元、記憶單元、輸入/輸出單元發送各項控制訊號（Execute & Control），調度大家協同運作。</li>
        </ol>
        <p>題目中描述「寇克船長領導船員、指派工作、引導各部門協作」，非常生動精確地比喻了 <strong>(D) 控制單元</strong> 的職責。</p>
      `,
      knowledgeTip: "比喻考題大補帖：交警、船長、總司令、大腦神經中樞 ➔ 均指「控制單元 (CU)」。"
    },
    {
      id: 12,
      category: "CPU架構",
      text: "志華購買了一台安插8GB記憶體的64位元電腦，下列有關該台電腦的敘述何者正確？",
      options: [
        { key: "A", text: "8GB指的是快取記憶體的容量" },
        { key: "B", text: "一般用途暫存器的位元數為8GB" },
        { key: "C", text: "CPU時脈頻率為64位元" },
        { key: "D", text: "64位元指的是一般用途暫存器的位元數。" }
      ],
      studentAnswer: "A",
      correctAnswer: "D",
      isCorrect: false,
      cropImg: "crop_q12.jpg",
      highlight: "8GB 是指「主記憶體（RAM）」；「64 位元」是指 CPU 內部「一般用途暫存器」的位元長度（字組長度 Word Size）！",
      wrongDiagnosis: `
        <div class="diagnosis-card">
          <div class="diagnosis-badge">🚨 學生盲點診斷</div>
          <p><strong>學生作答：(A) 8GB指的是快取記憶體的容量 ❌</strong></p>
          <p><strong>錯誤成因分析：</strong></p>
          <ol>
            <li><strong>缺乏硬體規格常識概念</strong>：快取記憶體（Cache Memory，由高成本 SRAM 製作）的容量在現代電腦中一般僅為 <strong>8MB、16MB 至 64MB</strong>。如果是 8GB 的快取記憶體，晶片面積將無比龐大且成本高達數十萬元！日常購買電腦廣告上的「8GB / 16GB / 32GB」，全部是指<strong>主記憶體（RAM）</strong>。</li>
            <li><strong>不清楚「XX 位元電腦」的真實定義</strong>：學生看到題目出現「64位元」和「8GB」，但完全不清楚電腦所謂的「64位元」到底是指什麼硬體部件的規格，因而被誘答選項誤導。</li>
          </ol>
        </div>
      `,
      analysis: `
        <p><strong>【名師正解詳析：逐項檢驗選項破綻】</strong></p>
        <div class="analysis-box">
          <p><strong>(A) 8GB指的是快取記憶體的容量 ❌【錯誤】</strong><br>
          8GB 是指<strong>主記憶體（RAM，主要由 DRAM 構成）</strong>的容量。快取記憶體容量極小（通常以 MB 為單位），絕不是 8GB。</p>

          <p><strong>(B) 一般用途暫存器的位元數為8GB ❌【單位荒謬錯誤】</strong><br>
          暫存器（Register）是 CPU 內部最快速的記憶元件，其容量是以<strong>位元（bit）</strong>為單位。在 64 位元架構下，一般用途暫存器的位元數就是 <strong>64 位元（64 bits）</strong>，根本不是 8GB！</p>

          <p><strong>(C) CPU時脈頻率為64位元 ❌【物理量混淆】</strong><br>
          CPU「時脈頻率（Clock Speed）」的衡量單位是<strong>赫茲（Hz、MHz、GHz）</strong>，代表每秒脈衝振盪次數（例如 3.6 GHz）；而「位元（bit）」是資料長度與寬度的計量單位，兩者完全是風馬牛不相及的物理量！</p>

          <p><strong>(D) 64位元指的是一般用途暫存器的位元數 ✔【正確正解】</strong><br>
          我們常說的「32 位元電腦」或「64 位元電腦」，其嚴謹定義就是 CPU 內部<strong>「一般用途暫存器（General-Purpose Register, GPR）」的寬度（位元數）</strong>，亦即 CPU 的<strong>字組大小（Word Size）</strong>與內部資料匯流排寬度！這代表 CPU 一個時脈週期內能夠直接處理、加總或定址的最大原生資料位元長度為 64-bit。</p>
        </div>
      `,
      knowledgeTip: "必背鐵律：「64位元處理器」＝ 一般用途暫存器為 64 位元 ＝ 字組長度 (Word Size) 為 64 位元！"
    },
    {
      id: 13,
      category: "周邊介面",
      text: "高雄六龜區為了成立社區數位機會中心（digital opportunity center），打算將原社區教室的電腦全數移轉至該中心。如果你是數位機會中心的電腦管理員，為了要提升這些電腦的執行效能，下列何者最不可能是你優先考慮要更換的設備或元件？",
      options: [
        { key: "A", text: "CPU" },
        { key: "B", text: "主記憶體" },
        { key: "C", text: "顯示卡" },
        { key: "D", text: "鍵盤" }
      ],
      studentAnswer: "A",
      correctAnswer: "D",
      isCorrect: false,
      cropImg: "crop_q13.jpg",
      highlight: "更換鍵盤只改變打字手感，對電腦系統本身的運算執行效能（Processing Performance）完全沒有任何提升！",
      wrongDiagnosis: `
        <div class="diagnosis-card">
          <div class="diagnosis-badge">🚨 學生盲點診斷</div>
          <p><strong>學生作答：(A) CPU ❌</strong></p>
          <p><strong>錯誤成因分析：</strong></p>
          <ol>
            <li><strong>審題倒置 / 漏看否定詞</strong>：從考卷原圖可以清晰看見，學生其實已經在「<u>最不可能</u>」這四個字底下畫了紅線標記！然而在填答時，心智卻反向選成了「<strong>最能夠提升效能</strong>」的核心元件——CPU（中央處理器）。這屬於標準的「看懂了題目在問否定，但作答時思維打結，選成了最優先的選項」。</li>
            <li><strong>混淆了「外設周邊」與「核心效能元件」</strong>：鍵盤只是單純的人機輸入周邊設備，電腦運算的快與慢，完全由 CPU、RAM、SSD/硬碟與 GPU 決定，就算你換裝要價上萬元的頂級客製化機械鍵盤，電腦開機與運算的速度依舊是<strong>0% 增長</strong>！</li>
          </ol>
        </div>
      `,
      analysis: `
        <p><strong>【名師正解詳析：影響電腦執行效能之核心硬體清單】</strong></p>
        <p>當評估「提升電腦系統執行效能（System Execution Performance）」時，電腦硬體有著決定性的影響權重：</p>
        <ul>
          <li><strong>(A) CPU（中央處理單元）</strong>：運算核心大腦。升級更高時脈或更多核心的 CPU，能夠直接巨幅縮減程式編譯、科學計算、壓縮與多工排程的耗時，是<strong>絕對優先考慮更換</strong>的核心效能元件。</li>
          <li><strong>(B) 主記憶體（RAM）</strong>：容量加大能容納更多作業系統程序與瀏覽器分頁，防止因為記憶體不足而頻繁動用硬碟虛擬記憶體交換（Page Thrashing）造成嚴重系統卡頓，同樣是提升效能的關鍵元件。</li>
          <li><strong>(C) 顯示卡（GPU）</strong>：負責影像解碼、圖形處理、3D 渲染與影片剪輯加速，更換高效能顯示卡能直接大幅提升圖形執行效能。</li>
          <li><strong>(D) 鍵盤（Keyboard）</strong>：純屬<strong>外部輸入設備（Input Peripheral）</strong>。更換鍵盤僅能改善鍵軸打字手感、回彈觸感、背光視覺或降低打字疲勞度，<strong>對電腦主機內部的指令處理週期、運算速率與執行效能完全沒有任何直接貢獻（貢獻值為零）</strong>！因此面對「最不可能優先考慮」的提問，答案毫無疑問為 <strong>(D) 鍵盤</strong>。</li>
        </ul>
      `,
      knowledgeTip: "考題心法：作答時務必在題目中的「最不可能」、「何者有誤」、「不包含」圈起來，選出答案後務必反向再檢查一次！"
    }
  ],

  // 6 題同類觀念變形強化題（針對 Q9, Q12, Q13 深度拓展）
  variantQuestions: [
    {
      id: 101,
      variantOf: 9,
      category: "五大單元",
      tag: "第9題變形題 · 概念強化",
      text: "【變形題 9-A】在中央處理單元（CPU）內部，專門負責執行二進位數值的「加、減、乘、除等算術運算」以及「AND、OR、NOT、數值大小比較等邏輯運算」的核心部門是：",
      options: [
        { key: "A", text: "控制單元 (CU)" },
        { key: "B", text: "算術邏輯單元 (ALU)" },
        { key: "C", text: "記憶單元 (MU)" },
        { key: "D", text: "輸出單元 (OU)" }
      ],
      correctAnswer: "B",
      highlight: "ALU (Arithmetic and Logic Unit) 即為算術邏輯單元，負責一切數值運算與邏輯比較判斷。",
      analysis: `
        <p><strong>【破題金鑰】</strong></p>
        <p>題幹指出負責「算術運算（加減乘除）」及「邏輯運算（AND/OR/NOT/比大小）」，這正是 <strong>(B) 算術邏輯單元（Arithmetic and Logic Unit, ALU）</strong> 的定義！</p>
        <p>控制單元 (CU) 負責解碼與調度指揮；記憶單元 (MU) 負責儲存；輸出單元 (OU) 負責向使用者展示結果。</p>
      `,
      knowledgeTip: "牢記：看到「加減乘除 + 邏輯比大小」，唯一正解就是 ALU。"
    },
    {
      id: 102,
      variantOf: 9,
      category: "五大單元",
      tag: "第9題變形題 · 角色比喻",
      text: "【變形題 9-B】在現代電腦系統中，若將算術邏輯單元（ALU）比喻為埋頭苦幹的精算師，那麼負責從記憶體提取指令、解碼指令並發號施令協調各單元運作的「總指揮官」，應為下列何者？",
      options: [
        { key: "A", text: "輸入單元 (IU)" },
        { key: "B", text: "輸出單元 (OU)" },
        { key: "C", text: "控制單元 (CU)" },
        { key: "D", text: "快取記憶體 (Cache)" }
      ],
      correctAnswer: "C",
      highlight: "控制單元（Control Unit, CU）職司指揮協調、指令解碼與控制信號發送。",
      analysis: `
        <p><strong>【破題金鑰】</strong></p>
        <p>電腦的「總指揮官、交通警察、大腦中樞神經」指的是 <strong>(C) 控制單元（Control Unit, CU）</strong>。它負責指揮各部門何時該讀取、何時該計算、何時該輸出，但本身不執行加減乘除數學計算。</p>
      `,
      knowledgeTip: "配對速記：算數學 = ALU；發號施令 = CU。"
    },
    {
      id: 103,
      variantOf: 12,
      category: "CPU架構",
      tag: "第12題變形題 · 規格概念",
      text: "【變形題 12-A】市面上常見廣告標註「64 位元處理器（64-bit CPU）」，下列關於「64 位元」的描述，何者最為正確？",
      options: [
        { key: "A", text: "處理器的內部工作時脈頻率固定為 64 GHz" },
        { key: "B", text: "代表 CPU 內部一般用途暫存器（GPR）的長度為 64 位元（字組大小）" },
        { key: "C", text: "代表該電腦只能支援安裝 64 位元（即 8 位元組）的硬碟容量" },
        { key: "D", text: "快取記憶體容量必須剛好為 64 MB" }
      ],
      correctAnswer: "B",
      highlight: "「XX 位元處理器」是指 CPU 的字組大小（Word Size），即內部一般用途暫存器的位元寬度！",
      analysis: `
        <p><strong>【破題金鑰】</strong></p>
        <p>「64 位元處理器」的嚴格定義為：CPU 內部<strong>一般用途暫存器（General-Purpose Registers）</strong>的位元數為 64-bit，即 CPU 的字組大小（Word Size）為 64 位元，一次可直接運算處理 64 個位元的資料。故選 (B)。</p>
        <p>(A) 時脈頻率單位為 GHz，與位元數無關；(C) 64 位元架構的虛擬定址空間理論值可達 16EB，而非硬碟容量；(D) 快取容量由製造商依產品等級設計，與 64 位元無直接綁定。</p>
      `,
      knowledgeTip: "必背觀念：32位元/64位元 ＝ 暫存器寬度 ＝ 字組大小 (Word Size)。"
    },
    {
      id: 104,
      variantOf: 12,
      category: "記憶體階層",
      tag: "第12題變形題 · 階層對比",
      text: "【變形題 12-B】關於電腦內部各階層記憶體的敘述，下列何者正確？",
      options: [
        { key: "A", text: "快取記憶體（Cache）每單位儲存成本比主記憶體（RAM）便宜" },
        { key: "B", text: "暫存器（Register）位於 CPU 內部，是電腦中存取速度最快但容量極小的記憶元件" },
        { key: "C", text: "主記憶體（RAM）通常是由 SRAM 組成，故斷電後資料依然永久保存" },
        { key: "D", text: "硬碟（HDD/SSD）屬於主記憶體的一種，存取速度高於快取記憶體" }
      ],
      correctAnswer: "B",
      highlight: "暫存器位於 CPU 核心之內，存取延遲僅小於 1 奈秒，是速度最快、成本最高的頂級記憶元件。",
      analysis: `
        <p><strong>【破題金鑰】</strong></p>
        <p>記憶體階層架構由快到慢為：<strong>暫存器 ＞ 快取記憶體（SRAM） ＞ 主記憶體（DRAM） ＞ 輔助記憶體（SSD/HDD）</strong>。</p>
        <p>(B) 暫存器位於 CPU 內部，速度最快、單位成本最高、容量最小（僅數百至數千位元組），敘述完全正確！</p>
        <p>(A) 快取記憶體單位成本遠比主存昂貴；(C) 主存由 DRAM 組成且為揮發性（斷電資料消失）；(D) 硬碟屬於輔助記憶體，速度遠慢於快取。</p>
      `,
      knowledgeTip: "速度金字塔頂端：暫存器（Register）速度第 1 名！"
    },
    {
      id: 105,
      variantOf: 13,
      category: "周邊介面",
      tag: "第13題變形題 · 升級評估",
      text: "【變形題 13-A】資訊管理員發現辦公室舊電腦開機載入作業系統需要耗時 3 分鐘，且開啟檔案時硬碟指示燈持續常亮閃爍、系統嚴重卡頓。若欲以有限預算最立竿見影地改善開機與載入速度，最優先更換的硬體設備應為：",
      options: [
        { key: "A", text: "更換高解析度電競防眩光螢幕" },
        { key: "B", text: "將舊型傳統機械硬碟（HDD）升級為固態硬碟（SSD）" },
        { key: "C", text: "更換全尺寸機械式鍵盤與電競滑鼠" },
        { key: "D", text: "加裝高品質重低音立體聲喇叭" }
      ],
      correctAnswer: "B",
      highlight: "SSD 的讀寫速度是傳統機械硬碟的數倍至數十倍，能極大消除開機與軟體載入的 I/O 瓶頸！",
      analysis: `
        <p><strong>【破題金鑰】</strong></p>
        <p>傳統 HDD 讀寫速度約 100~150 MB/s，且受限於物理磁頭尋軌時間；而固態硬碟（SSD）隨機讀寫速度極快（SATA SSD 約 500 MB/s，NVMe SSD 可達 3500~7000 MB/s 以上），升級 SSD 能瞬間解決磁碟讀取瓶頸，開機速度可縮減至十幾秒，是改善開機慢最顯著的方案。</p>
        <p>選項 (A)、(C)、(D) 皆屬於周邊外設設備，對開機與載入系統之執行效能毫無任何改善效益。</p>
      `,
      knowledgeTip: "電腦升級常識：開機載入慢換 SSD；多開程式卡頓加 RAM；運算繪圖繁重升 CPU/GPU。"
    },
    {
      id: 106,
      variantOf: 13,
      category: "周邊介面",
      tag: "第13題變形題 · 觀念判別",
      text: "【變形題 13-B】下列四項電腦配備中，何者更換或升級後，「對主機內部的指令處理速率、資料吞吐量及運算效能完全沒有任何直接貢獻（提升幅度為 0%）」？",
      options: [
        { key: "A", text: "更換為 RGB 幻彩機械鍵盤" },
        { key: "B", text: "將單通道 8GB 記憶體擴充為雙通道 16GB" },
        { key: "C", text: "將內建顯示晶片升級為獨立顯示卡 (GPU)" },
        { key: "D", text: "更換為更高時脈、更多核心之 CPU" }
      ],
      correctAnswer: "A",
      highlight: "鍵盤僅是外部輸入裝置，更換只改變手指打字手感，對主機運算效能為 0 貢獻！",
      analysis: `
        <p><strong>【破題金鑰】</strong></p>
        <p>電腦的運算執行效能取決於：<strong>CPU、RAM、GPU 與儲存裝置（SSD）</strong>。鍵盤屬於單純的<strong>輸入設備（Input Unit）</strong>，其功能是將使用者的按鍵動作轉換為掃描碼傳入電腦。無論機械軸體再高級、燈效再華麗，<strong>主機處理指令的運算時脈與速度依舊分毫未變（0% 效能提升）</strong>！故選 (A)。</p>
      `,
      knowledgeTip: "外設（鍵盤、滑鼠、喇叭）影響的是「使用者操作舒適度」，內部核心（CPU/RAM/GPU/SSD）影響的是「電腦運算效能」。"
    }
  ]
};

// 匯出至全域
window.EXAM_DATA = EXAM_DATA;
