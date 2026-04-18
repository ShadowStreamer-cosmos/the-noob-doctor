// =============================================
// THE NOOB DOCTOR — Discord-Style Dashboard JS
// =============================================

// ===== STATE =====
let currentCat = '', currentQs = [], currentIdx = 0, score = 0, timer = null, timeLeft = 45, answered = false;
let userAnswers = [];
let pendingPool = [], pendingEmoji = '', pendingParent = '', pendingIsSubcat = false;
let activeServer = 'home', activeChannel = null;
let chartInstances = {};
let currentParentCat = '';
let currentTopicInfo = { cat: '', sys: '', chapter: '', topic: '' };
var TRACKING_URL = 'https://script.google.com/macros/s/AKfycbwxFErgPmvEul7E4v-Ba4jb5uSyBONjeSwy1c-WoMyjjE5ZMkvoDZuR995dokrmUgxv/exec';
var _sessionStart = Date.now();

// ===== PROGRESS =====
function getProgress() { return JSON.parse(localStorage.getItem('nbd_progress') || '{}'); }
function saveQuestionProgress(q, userAns, isCorrect) {
    const prog = getProgress();
    prog[q.id] = { ans: userAns, correct: isCorrect, ts: Date.now() };
    localStorage.setItem('nbd_progress', JSON.stringify(prog));
}
function isAnswered(q) { return getProgress().hasOwnProperty(q.id); }
function wasCorrect(q) { const p = getProgress()[q.id]; return p && p.correct; }

// ===== THEME SYNC FOR IFRAMES =====
function syncThemeToIframe(iframe) {
    try {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        const theme = localStorage.getItem('nbd_theme') || 'dark';
        if (doc.documentElement) {
            doc.documentElement.setAttribute('data-theme', theme);
        }
        // Inject theme-aware styles
        const style = doc.createElement('style');
        if (theme === 'light') {
            style.textContent = `body { background: #f5f5f7 !important; color: #1a1a2e !important; }
              .card, .card-title, .section, .section-title, .topic-view, .topic-header, h1, h2, h3 { background: #ffffff !important; color: #1a1a2e !important; }
              a { color: #2563eb !important; }
              table, th, td { border-color: #e5e5e5 !important; }
              th { background: #f0f0f5 !important; }`;
        } else {
            style.textContent = ''; // Reset to dark default
        }
        doc.head.appendChild(style);
    } catch (e) { console.log('Theme sync blocked:', e.message); }
}

// Listen for theme changes and update all iframes
function updateAllIframes() {
    const theme = localStorage.getItem('nbd_theme') || 'dark';
    document.querySelectorAll('iframe[data-theme]').forEach(iframe => {
        try {
            iframe.contentWindow.postMessage({ theme: theme }, '*');
        } catch (e) { console.log('Theme update blocked'); }
    });
}

// ===== CHART HELPERS =====
function destroyChart(id) { if (chartInstances[id]) { chartInstances[id].destroy(); delete chartInstances[id]; } }

// ===== BOOT =====
(function boot() {
    // Restore theme
    const savedTheme = localStorage.getItem('nbd_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.checked = savedTheme === 'dark';

    const profile = JSON.parse(localStorage.getItem('nbd_profile') || '{}');
    if (!profile.name) {
        document.getElementById('profileModal').classList.add('visible');
    }
    buildServerBar();
    selectServer('home');
    renderSidebarFooter();
    renderAnalytics();
    if (profile.name) trackEvent('visit');
    // Sync settings profile name
    const spName = document.getElementById('spProfileName');
    if (spName && profile.name) spName.textContent = profile.name;
})();

// ===== SETTINGS & THEME =====
function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    const overlay = document.getElementById('settingsOverlay');
    const isOpen = panel.classList.toggle('open');
    overlay.classList.toggle('vis', isOpen);
    // Sync profile name
    if (isOpen) {
        const p = JSON.parse(localStorage.getItem('nbd_profile') || '{}');
        const spName = document.getElementById('spProfileName');
        if (spName) spName.textContent = p.name || 'Doctor';
    }
}

function handleThemeToggle(el) {
    const theme = el.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nbd_theme', theme);
    updateAllIframes();
}

function exportProgress() {
    const data = {
        progress: JSON.parse(localStorage.getItem('nbd_progress') || '{}'),
        profile: JSON.parse(localStorage.getItem('nbd_profile') || '{}'),
        leaderboard: JSON.parse(localStorage.getItem('mbc_leaderboard') || '[]'),
        theme: localStorage.getItem('nbd_theme') || 'dark'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'noob_doctor_progress.json';
    a.click();
}

function resetAllProgress() {
    if (confirm('⚠️ This will reset ALL your progress, scores, and leaderboard data. Are you sure?')) {
        localStorage.removeItem('nbd_progress');
        localStorage.removeItem('mbc_leaderboard');
        selectServer('home');
        renderAnalytics();
        toggleSettings();
        alert('✅ All progress has been reset.');
    }
}

// ===== PROFILE =====
function getProfileName() {
    return (JSON.parse(localStorage.getItem('nbd_profile') || '{}')).name || 'Player';
}

function saveProfile() {
    const name = document.getElementById('profileName').value.trim();
    const email = document.getElementById('profileEmail').value.trim();
    const err = document.getElementById('nameError');
    if (!name) { err.style.display = 'block'; document.getElementById('profileName').style.borderColor = 'var(--rd)'; return; }
    err.style.display = 'none';
    localStorage.setItem('nbd_profile', JSON.stringify({ name, email }));
    trackEvent('new_user', { name, email });
    document.getElementById('profileModal').classList.remove('visible');
    renderSidebarFooter();
    selectServer('home');
}

function editProfile() {
    const p = JSON.parse(localStorage.getItem('nbd_profile') || '{}');
    document.getElementById('profileName').value = p.name || '';
    document.getElementById('profileEmail').value = p.email || '';
    document.getElementById('profileModal').classList.add('visible');
}

function renderSidebarFooter() {
    const p = JSON.parse(localStorage.getItem('nbd_profile') || '{}');
    const ft = document.getElementById('sidebarFooter');
    if (p.name) {
        const initials = p.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
        ft.innerHTML = `<div class="user-panel">
            <div class="user-av">${initials}</div>
            <div class="user-info"><div class="user-name">${p.name}</div><div class="user-status">Online</div></div>
            <button class="user-edit" onclick="editProfile()" title="Edit Profile">⚙️</button>
        </div>`;
    }
}

// ===== SERVER BAR =====
function buildServerBar() {
    const list = document.getElementById('serverList');
    list.innerHTML = '';
    Object.keys(CAT_META).forEach(cat => {
        const m = CAT_META[cat];
        const div = document.createElement('div');
        div.className = 'server-icon';
        div.dataset.server = cat;
        div.title = cat;
        div.onclick = () => selectServer(cat);
        div.innerHTML = `<div class="si-inner">${m.emoji}</div><span class="si-pill"></span>`;
        list.appendChild(div);
    });
}

function selectServer(name) {
    activeServer = name;
    activeChannel = null;
    // Update active state
    document.querySelectorAll('.server-icon').forEach(el => {
        el.classList.toggle('active', el.dataset.server === name);
    });
    // Build channels + main panel
    if (name === 'home') {
        document.getElementById('sidebarTitle').textContent = 'The Noob Doctor';
        renderHomeChannels();
        renderDashboard();
        document.getElementById('mainTitle').textContent = 'dashboard';
    } else if (name === 'leaderboard') {
        document.getElementById('sidebarTitle').textContent = 'Leaderboard';
        renderLBChannels();
        renderLeaderboard();
        document.getElementById('mainTitle').textContent = 'leaderboard';
    } else {
        const meta = CAT_META[name];
        document.getElementById('sidebarTitle').textContent = meta.emoji + ' ' + name;
        if (meta.hasSystems) {
            renderSystemChannels(name);
        } else if (meta.hasSubcategories) {
            renderSubjectChannels(name);
        } else {
            renderDirectSubjectChannels(name);
        }
    }
    renderAnalytics();
    closeAllDrawers();
}

// ===== CHANNEL SIDEBAR RENDERERS =====
function renderHomeChannels() {
    const cl = document.getElementById('channelList');
    cl.innerHTML = `
        <div class="ch-cat">Navigation</div>
        <div class="ch-item active" onclick="selectHomeChannel('dashboard')"><span class="ch-hash">#</span><span class="ch-name">dashboard</span></div>
        <div class="ch-item" onclick="selectHomeChannel('leaderboard')"><span class="ch-hash">#</span><span class="ch-name">leaderboard</span></div>
        <div class="ch-cat">Subjects</div>
        ${Object.entries(CAT_META).map(([cat, m]) => {
            const qs = getSubjectQuestions(cat);
            const prog = getProgress();
            const done = qs.filter(q => prog[q.id]).length;
            const dot = done === 0 ? 'none' : done >= qs.length ? 'done' : 'partial';
            return `<div class="ch-item" onclick="selectServer('${cat}')"><span class="ch-hash">#</span><span class="ch-name">${cat.toLowerCase()}</span><span class="ch-dot ${dot}"></span><span class="ch-badge">${qs.length}</span></div>`;
        }).join('')}
    `;
}

function renderLBChannels() {
    const cl = document.getElementById('channelList');
    cl.innerHTML = `
        <div class="ch-cat">Views</div>
        <div class="ch-item active" onclick="selectLBChannel('all')"><span class="ch-hash">#</span><span class="ch-name">all-scores</span></div>
        <div class="ch-cat">Actions</div>
        <div class="ch-item" onclick="if(confirm('Clear all scores?')){localStorage.removeItem('mbc_leaderboard');renderLeaderboard();renderAnalytics()}"><span class="ch-hash">🗑️</span><span class="ch-name" style="color:var(--rd)">clear-all</span></div>
        <div class="ch-item" onclick="selectServer('home')"><span class="ch-hash">←</span><span class="ch-name">back-home</span></div>
    `;
}

function renderSubjectChannels(parentCat) {
    currentParentCat = parentCat;
    const subData = SUBCATEGORIES[parentCat];
    const prog = getProgress();
    const cl = document.getElementById('channelList');
    cl.innerHTML = `
        <div class="ch-cat">Subcategories</div>
        ${Object.entries(subData).map(([name, sc]) => {
            const done = sc.questions.filter(q => prog[q.id]).length;
            const dot = done === 0 ? 'none' : done >= sc.questions.length ? 'done' : 'partial';
            return `<div class="ch-item" onclick="selectSubChannel('${esc(name)}','${parentCat}')"><span class="ch-hash">#</span><span class="ch-name">${name.toLowerCase()}</span><span class="ch-dot ${dot}"></span><span class="ch-badge">${sc.questions.length}</span></div>`;
        }).join('')}
        <div class="ch-cat">Navigation</div>
        <div class="ch-item" onclick="selectServer('home')"><span class="ch-hash">←</span><span class="ch-name">back-home</span></div>
    `;
    // Show first subcategory by default
    const firstSub = Object.keys(subData)[0];
    if (firstSub) selectSubChannel(firstSub, parentCat);
}

function renderDirectSubjectChannels(cat) {
    const qs = QUESTIONS[cat];
    const prog = getProgress();
    const done = qs.filter(q => prog[q.id]).length;
    const correct = qs.filter(q => prog[q.id] && prog[q.id].correct).length;
    const cl = document.getElementById('channelList');
    cl.innerHTML = `
        <div class="ch-cat">Overview</div>
        <div class="ch-item active"><span class="ch-hash">#</span><span class="ch-name">quiz</span><span class="ch-badge">${qs.length} Qs</span></div>
        <div class="ch-cat">Stats</div>
        <div class="ch-item"><span class="ch-hash">✅</span><span class="ch-name">${correct} correct</span></div>
        <div class="ch-item"><span class="ch-hash">❌</span><span class="ch-name">${done - correct} wrong</span></div>
        <div class="ch-item"><span class="ch-hash">📋</span><span class="ch-name">${qs.length - done} remaining</span></div>
        <div class="ch-cat">Navigation</div>
        <div class="ch-item" onclick="selectServer('home')"><span class="ch-hash">←</span><span class="ch-name">back-home</span></div>
    `;
    showContentHub(cat, qs, CAT_META[cat].emoji, false, cat);
    renderAnalytics(cat, cat);
}

// ===== SYSTEM-BASED SIDEBAR (4-level: Subject → System → Chapter → Topics) =====
function renderSystemChannels(cat) {
    const systems = SUBJECT_SYSTEMS[cat];
    if (!systems) return;
    currentParentCat = cat;
    const meta = CAT_META[cat];
    const prog = getProgress();
    let html = '';

    // Level 1: Subject header
    html += `<div class="ch-subject-header">
        <span class="ch-subject-icon">${meta.emoji}</span>
        <span class="ch-subject-name">${cat}</span>
        <button class="ch-subject-collapse" onclick="toggleAllSystems()" title="Collapse all">▾</button>
    </div>`;

    // Level 2: Systems
    let sysIndex = 0;
    Object.entries(systems).forEach(([sysName, sys]) => {
        sysIndex++;
        const hasMasterGuide = sys.notesUrl ? true : false;
        const chapterCount = sys.chapters ? Object.keys(sys.chapters).length : 0;
        const topicCount = sys.topics ? Object.keys(sys.topics).length : 0;
        const sysId = 'sys-' + sysIndex;

        // If has master guide, click on icon opens notes, click on name toggles
        const iconClick = hasMasterGuide ? `onclick="openMasterGuideFromSidebar('${esc(cat)}','${esc(sysName)}','${sys.notesUrl}', event)"` : '';
        
        html += `<div class="ch-system" id="${sysId}" onclick="toggleSystem('${sysId}', event)">
            <span class="ch-system-icon" ${iconClick}>${hasMasterGuide ? '📖' : '▸'}</span>
            <span class="ch-system-name">${sysName}</span>
            <span class="ch-system-count">${chapterCount || topicCount}</span>
        </div>
        <div class="ch-system-items" id="${sysId}-items" style="display:none">`;

        // Level 3: Chapters (if chapter-based)
        if (sys.chapters) {
            let chIndex = 0;
            Object.entries(sys.chapters).forEach(([chapterName, chapter]) => {
                chIndex++;
                const chId = 'ch-' + sysIndex + '-' + chIndex;
                html += `<div class="ch-chapter" id="${chId}" onclick="toggleChapter('${chId}', event)">
                    <span class="ch-chapter-arrow">▸</span>
                    <span class="ch-chapter-name">${chapterName}</span>
                    <span class="ch-chapter-badge">${chapter.topics.length}</span>
                </div>
                <div class="ch-chapter-topics" id="${chId}-topics" style="display:none">`;

                // Level 4: Topics
                chapter.topics.forEach(topic => {
                    const priorityClass = topic.priority || 'default';
                    html += `<div class="ch-topic" data-priority="${priorityClass}" onclick="selectTopic('${esc(cat)}','${esc(sysName)}','${esc(chapterName)}','${esc(topic.name)}')">
                        <span class="ch-topic-dot ${priorityClass}"></span>
                        <span class="ch-topic-name">${topic.name}</span>
                    </div>`;
                });

                html += `</div>`;
            });
        } else if (sys.topics) {
            // Legacy: topic-based (no chapters)
            Object.entries(sys.topics).forEach(([topicName, topic]) => {
                const tDone = topic.questions.filter(q => prog[q.id]).length;
                html += `<div class="ch-topic" onclick="selectSystemTopic('${esc(cat)}','${esc(topicName)}')">
                    <span class="ch-topic-dot"></span>
                    <span class="ch-topic-name">${topicName}</span>
                </div>`;
            });
        }

        html += `</div>`;
    });

    html += `<div class="ch-item" style="margin-top:16px" onclick="selectServer('home')">
        <span class="ch-hash">←</span><span class="ch-name">back to dashboard</span>
    </div>`;
    document.getElementById('channelList').innerHTML = html;

    // All systems start collapsed (user clicks to expand)

    showContentHub(cat, [], meta.emoji, false, cat);
    renderAnalytics(cat, cat);
}

function toggleSystem(sysId, event) {
    if (event) event.stopPropagation();
    const el = document.getElementById(sysId);
    const items = document.getElementById(sysId + '-items');
    if (el && items) {
        const isOpen = items.style.display !== 'none';
        items.style.display = isOpen ? 'none' : 'block';
        // Toggle open class for styling
        el.classList.toggle('open', !isOpen);
    }
}

function toggleAllSystems() {
    const btn = document.querySelector('.ch-subject-collapse');
    const items = document.querySelectorAll('.ch-system-items');
    const firstItem = items[0];
    const isCollapsed = firstItem && firstItem.style.display !== 'none';
    items.forEach(i => i.style.display = isCollapsed ? 'none' : 'block');
    btn.textContent = isCollapsed ? '▾' : '▔';
}

function toggleChapter(chId, event) {
    if (event) event.stopPropagation();
    const el = document.getElementById(chId);
    const topicsDiv = document.getElementById(chId + '-topics');
    if (el && topicsDiv) {
        const isOpen = topicsDiv.style.display !== 'none';
        topicsDiv.style.display = isOpen ? 'none' : 'block';
        el.classList.toggle('open', !isOpen);
        const arrow = el.querySelector('.ch-chapter-arrow');
        if (arrow) arrow.textContent = isOpen ? '▸' : '▾';
    }
}

function selectTopic(cat, sysName, chapterName, topicName) {
    console.log(`Selected: ${cat} > ${sysName} > ${chapterName} > ${topicName}`);

    // Find and expand parent elements
    const systems = SUBJECT_SYSTEMS[cat];
    if (systems && systems[sysName] && systems[sysName].chapters && systems[sysName].chapters[chapterName]) {
        const chapter = systems[sysName].chapters[chapterName];
        const topic = chapter.topics.find(t => t.name === topicName);

        // Expand system if collapsed
        const sysEl = document.querySelector(`.ch-system[data-system="${esc(sysName)}"]`);
        if (sysEl && !sysEl.classList.contains('open')) {
            sysEl.classList.add('open');
            sysEl.nextElementSibling.classList.add('expanded');
        }

        // Expand chapter if collapsed (find chapter next to clicked topic's parent)
        document.querySelectorAll('.ch-chapter').forEach(c => {
            if (c.dataset.chapter === chapterName && !c.classList.contains('open')) {
                c.classList.add('open');
                const topicsDiv = c.nextElementSibling;
                if (topicsDiv && topicsDiv.classList.contains('ch-chapter-topics')) {
                    topicsDiv.style.display = 'block';
                }
            }
        });

        // Highlight active topic
        document.querySelectorAll('.ch-topic').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.ch-chapter').forEach(el => el.classList.remove('active'));
        if (event && event.currentTarget) event.currentTarget.classList.add('active');

        // Highlight parent chapter
        const topicEl = event && event.currentTarget;
        if (topicEl) {
            const prevChapter = topicEl.previousElementSibling;
            if (prevChapter && prevChapter.classList.contains('ch-chapter')) {
                prevChapter.classList.add('active');
            }
        }

        showTopicContent(cat, sysName, chapterName, topicName);
    }
}

function showTopicContent(cat, sysName, chapterName, topicName) {
    // Get topic data - try direct data access first
    let topicData;
    let dataSource;
    if (cat === 'Medicine') dataSource = MEDICINE_DATA;
    else if (cat === 'Surgery') dataSource = SURGERY_DATA;
    else if (cat === 'OBG') dataSource = OBG_DATA;
    
    if (dataSource && dataSource[sysName] && dataSource[sysName].chapters && dataSource[sysName].chapters[chapterName]) {
        const chapter = dataSource[sysName].chapters[chapterName];
        topicData = chapter.topics.find(t => t.name === topicName);
    } else {
        // Fallback to SUBJECT_SYSTEMS
        const systems = SUBJECT_SYSTEMS[cat];
        const chapter = systems[sysName].chapters[chapterName];
        topicData = chapter.topics.find(t => t.name === topicName);
    }
    
    const topic = topicData;
    
    const priorityColor = PRIORITY_COLORS[topic.priority] || PRIORITY_COLORS.default;
    const priorityLabel = topic.priority === 'red' ? 'Frequently Asked' : (topic.priority === 'purple' ? 'Normally Asked' : 'Other');
    
    document.getElementById('mainTitle').textContent = topicName.toLowerCase();
    
    // Check if topic has notesUrl and get current theme
    const hasNotes = topic && topic.notesUrl ? true : false;
    console.log('Topic notesUrl:', topic ? topic.notesUrl : 'no topic');
    const currentTheme = localStorage.getItem('nbd_theme') || 'dark';
    const notesHtml = hasNotes ? `<iframe src="${topic.notesUrl}?theme=${currentTheme}" data-theme="${currentTheme}" onload="syncThemeToIframe(this)" style="width:100%;height:calc(100vh - 140px);border:none;margin-top:10px;border-radius:8px;overflow:hidden;"></iframe>` : `
        <div class="topic-content">
            <p style="color:var(--t3);padding:20px;text-align:center;">
                Questions for this topic coming soon...<br>
                <small>Study this topic with Avanti to generate notes</small>
            </p>
        </div>
    `;
    
    document.getElementById('mainBody').innerHTML = `
        <div class="topic-view">
            <div class="topic-header">
                <span class="topic-priority" style="background:${priorityColor}">${priorityLabel}</span>
                <h2>${topicName}</h2>
                <p class="topic-path">${cat} > ${sysName} > ${chapterName}</p>
                <button class="topic-sections-btn" onclick="toggleSectionChecklist()">📋 Sections</button>
                <button class="topic-mcq-btn" onclick="openMcqPanel()">🎯 MCQs</button>
                <button class="topic-mcq-btn" onclick="openDynamicPanel()">🫀 Tools</button>
                <button class="topic-fullscreen-btn" id="immersiveBtn" onclick="toggleImmersiveMode()" title="Immersive Learning Mode">⛶ Immersive</button>
            </div>
            <div class="section-checklist" id="sectionChecklist" style="display:none">
                <div class="section-checklist-header">
                    <span>📖 Study Progress</span>
                    <button onclick="toggleSectionChecklist()">✕</button>
                </div>
                <div class="section-checklist-body" id="sectionChecklistBody"></div>
            </div>
            ${notesHtml}
        </div>
    `;
    
    setTimeout(() => {
        renderSectionChecklist();
    }, 300);
    
    closeAllDrawers();
    storeCurrentTopic(cat, sysName, chapterName, topicName);
    renderAnalytics();
}

function getTopicSections(topicName) {
    // First try to get sections from topic data in the data files
    const sectionsFromData = getSectionsFromData(currentTopicInfo.cat, currentTopicInfo.sys, currentTopicInfo.chapter, currentTopicInfo.topic);
    if (sectionsFromData && sectionsFromData.length > 0) {
        return sectionsFromData;
    }
    
    // Fallback: try to extract sections from the loaded iframe notes
    const iframe = document.querySelector('.topic-view iframe');
    if (iframe && iframe.contentDocument) {
        const doc = iframe.contentDocument;
        
        // Get all section titles from the notes HTML
        const h2Sections = doc.querySelectorAll('h2.section-title');
        const h3Sections = doc.querySelectorAll('h3.sub-heading');
        const cardTitles = doc.querySelectorAll('.card-title');
        
        let sections = [];
        let majorIndex = 1;
        
        // Process h2 sections as major
        h2Sections.forEach((el, idx) => {
            const text = el.textContent?.trim() || '';
            if (text) {
                sections.push({ text: text, type: 'major' });
                majorIndex++;
            }
        });
        
        // Process h3 and card-title as sub-sections
        h3Sections.forEach(el => {
            const text = el.textContent?.trim() || '';
            if (text && text.length > 2) {
                sections.push({ text: text, type: 'sub' });
            }
        });
        
        cardTitles.forEach(el => {
            const text = el.textContent?.trim() || '';
            if (text && text.length > 2) {
                // Avoid duplicates
                const exists = sections.some(s => s.text.includes(text.substring(0, 30)));
                if (!exists) {
                    sections.push({ text: text, type: 'sub' });
                }
            }
        });
        
        // If we found sections, return them
        if (sections.length > 0) {
            return sections;
        }
    }
    
    // Fallback: default sections if nothing works
    return [
        { text: '01. Introduction', type: 'major' },
        { text: '02. Etiology', type: 'major' },
        { text: '03. Pathophysiology', type: 'major' },
        { text: '04. Clinical Features', type: 'major' },
        { text: '05. Investigations', type: 'major' },
        { text: '06. Management', type: 'major' },
        { text: '07. Summary', type: 'major' }
    ];
}

// Get sections from data files
function getSectionsFromData(cat, sys, chapter, topicName) {
    let dataSource;
    if (cat === 'Medicine') dataSource = MEDICINE_DATA;
    else if (cat === 'Surgery') dataSource = SURGERY_DATA;
    else if (cat === 'OBG') dataSource = OBG_DATA;
    
    if (!dataSource) return null;
    
    // Find the system
    const system = dataSource[sys] || dataSource[Object.keys(dataSource).find(s => s.toLowerCase().includes(sys.toLowerCase()))];
    if (!system || !system.chapters) return null;
    
    // Find the chapter
    const chap = system.chapters[chapter] || system.chapters[Object.keys(system.chapters).find(c => c.toLowerCase().includes(chapter.toLowerCase()))];
    if (!chap || !chap.topics) return null;
    
    // Find the topic
    const topic = chap.topics.find(t => t.name.toLowerCase() === topicName.toLowerCase());
    if (topic && topic.sections) {
        return topic.sections.map(s => ({ text: s, type: 'sub' }));
    }
    
    return null;
}

function renderSectionChecklist() {
    const topicKey = currentTopicInfo.topic;
    if (!topicKey) return;
    
    // Get sections dynamically from loaded notes
    const sections = getTopicSections(topicKey);
    
    const body = document.getElementById('sectionChecklistBody');
    if (!body) return;
    
    let html = '';
    sections.forEach((sec, idx) => {
        const checkKey = 'section_done_' + topicKey + '_' + idx;
        const isChecked = localStorage.getItem(checkKey) === 'true';
        html += `<label class="checklist-item ${sec.type} ${isChecked ? 'checked' : ''}">
            <input type="checkbox" ${isChecked ? 'checked' : ''} onchange="toggleSectionItem(${idx}, this.checked)">
            <span class="checklist-box">${isChecked ? '✓' : ''}</span>
            <span class="checklist-text">${sec.text}</span>
        </label>`;
    });
    
    body.innerHTML = html;
}

function toggleSectionChecklist() {
    const panel = document.getElementById('sectionChecklist');
    panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

function toggleSectionItem(idx, checked) {
    const topicKey = currentTopicInfo.topic;
    if (!topicKey) return;
    const checkKey = 'section_done_' + topicKey + '_' + idx;
    localStorage.setItem(checkKey, checked ? 'true' : 'false');
    renderSectionChecklist();
    renderMultiRingChart();
}

function renderMultiRingChart() {
    const sectionData = getSectionCompletion();
    const prog = getProgress();
    const qs = topicQuestions || [];
    
    let mcqCorrect = 0, mcqWrong = 0;
    const mcqTotal = qs.length;
    qs.forEach((q, i) => {
        const qId = q.id || 'tq' + i;
        if (prog[qId]) {
            if (prog[qId].correct) mcqCorrect++;
            else mcqWrong++;
        }
    });
    
    const notesPct = sectionData.total > 0 ? (sectionData.completed / sectionData.total) * 100 : 0;
    const notesDone = Math.round(notesPct);
    const notesLeft = 100 - notesDone;
    
    destroyChart('completion');
    const ctx = document.getElementById('completionChart');
    if (!ctx) return;
    
    chartInstances['completion'] = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Correct', 'Wrong', 'Unattempted'],
            datasets: [
                // Outer ring - MCQ data (weight 1)
                {
                    data: [mcqCorrect, mcqWrong, mcqTotal - mcqCorrect - mcqWrong],
                    backgroundColor: ['#22c55e', '#ef4444', '#374151'],
                    borderWidth: 0,
                    weight: 1.2
                },
                // Inner ring - Notes data (weight 0.6)
                {
                    data: [notesDone, notesLeft],
                    backgroundColor: ['#6366f1', '#1e1e2e'],
                    borderWidth: 0,
                    weight: 0.7
                }
            ]
        },
        options: {
            responsive: true,
            cutout: '40%',
            animation: { duration: 600, easing: 'easeOutQuart' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    titleFont: { size: 13, weight: '600' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const datasetIndex = context.datasetIndex;
                            if (datasetIndex === 0) {
                                const labels = ['Correct', 'Wrong', 'Unattempted'];
                                return ` MCQ ${labels[context.dataIndex]}: ${context.raw}`;
                            } else {
                                return context.dataIndex === 0 ? ` Notes Done: ${notesDone}%` : ` Notes Left: ${notesLeft}%`;
                            }
                        }
                    }
                }
            }
        }
    });
}

function injectSectionCheckboxes() {
    const iframe = document.querySelector('.topic-view iframe');
    if (!iframe || !iframe.contentDocument) return;
    
    const doc = iframe.contentDocument;
    const topicKey = currentTopicInfo.topic;
    if (!topicKey) return;
    
    // Target main section titles (h2 with class section-title) and cards
    const selectors = ['h2.section-title', 'div.card-title'];
    let idx = 0;
    
    selectors.forEach(selector => {
        const elements = doc.querySelectorAll(selector);
        elements.forEach(el => {
            if (el.querySelector('.section-check')) return; // Already has checkbox
            
            const sectionText = el.textContent?.trim().substring(0, 40) || 'Section';
            const checkKey = 'section_done_' + topicKey + '_' + idx;
            const isChecked = localStorage.getItem(checkKey) === 'true';
            
            // Create inline checkbox
            const checkLabel = doc.createElement('label');
            checkLabel.className = 'section-check-label';
            checkLabel.innerHTML = `<input type="checkbox" ${isChecked ? 'checked' : ''}> <span class="check-mark">${isChecked ? '✓' : '○'}</span>`;
            checkLabel.style.cssText = 'margin-left:12px;cursor:pointer;vertical-align:middle;display:inline-flex;align-items:center;gap:4px;font-size:12px;';
            checkLabel.onclick = (e) => e.stopPropagation();
            checkLabel.onchange = function() {
                const checked = this.querySelector('input').checked;
                localStorage.setItem(checkKey, checked ? 'true' : 'false');
                this.querySelector('.check-mark').textContent = checked ? '✓' : '○';
                renderAnalytics();
            };
            
            el.appendChild(checkLabel);
            idx++;
        });
    });
    
    console.log('Injected', idx, 'section checkboxes for', topicKey);
}

function getSectionCompletion() {
    if (!currentTopicInfo.topic) return { completed: 0, total: 0 };
    
    const topicKey = currentTopicInfo.topic;
    const sections = getTopicSections(topicKey);
    let completed = 0;
    const total = sections.length;
    
    // Count completed sections for this specific topic
    for (let i = 0; i < total; i++) {
        const checkKey = 'section_done_' + topicKey + '_' + i;
        if (localStorage.getItem(checkKey) === 'true') {
            completed++;
        }
    }
    
return { completed, total };
}

// Toggle sidebar panel visibility
function toggleSidebar(panel) {
    const sidebar = document.getElementById('channelSidebar');
    const btn = sidebar.querySelector('.sidebar-float-btn');
    
    if (panel === 'left') {
        sidebar.classList.toggle('collapsed');
        
        // Update button icon
        if (btn) {
            btn.innerHTML = sidebar.classList.contains('collapsed') ? '▶' : '◀';
        }
    }
}

// Toggle analytics panel collapse (Desktop)
function toggleAnalyticsCollapse() {
    const panel = document.getElementById('analyticsSidebar');
    const btn = panel.querySelector('.sidebar-float-btn');
    
    if (panel) {
        panel.classList.toggle('collapsed');
        
        // Update button icon
        if (btn) {
            btn.innerHTML = panel.classList.contains('collapsed') ? '◀' : '▶';
        }
    }
}

// Removed duplicate toggleSystem - using the one above with sysId

function openMasterGuideFromSidebar(cat, sysName, notesUrl, event) {
    if (event) event.stopPropagation();
    openMasterGuide(cat, sysName, notesUrl);
}

function openMasterGuide(cat, sysName, notesUrl) {
    console.log('Opening master guide:', sysName, notesUrl);
    const notes = [{ title: sysName + ' Master Guide', url: notesUrl, type: 'local' }];
    showContentHub(sysName, [], '📖', false, cat);
    
    // After showing content, open notes reader with the URL
    setTimeout(() => {
        openNoteReader(notesUrl, sysName + ' Master Guide');
    }, 100);
}

function selectSystemTopic(cat, topicName) {
    currentParentCat = cat;
    const systems = SUBJECT_SYSTEMS[cat];
    for (const sys of Object.values(systems)) {
        if (sys.topics[topicName]) {
            const topic = sys.topics[topicName];
            document.querySelectorAll('.ch-item').forEach(el => el.classList.remove('active'));
            event.currentTarget.classList.add('active');
            showContentHub(topicName, topic.questions, topic.emoji, true, cat);
            closeAllDrawers();
            return;
        }
    }
}

function selectHomeChannel(ch) {
    document.querySelectorAll('.ch-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    if (ch === 'dashboard') { renderDashboard(); document.getElementById('mainTitle').textContent = 'dashboard'; }
    else if (ch === 'leaderboard') { renderLeaderboard(); document.getElementById('mainTitle').textContent = 'leaderboard'; }
}

function selectLBChannel(type) {
    document.querySelectorAll('.ch-item').forEach(el => el.classList.remove('active'));
    event.currentTarget.classList.add('active');
    renderLeaderboard();
}

function selectSubChannel(subName, parentCat) {
    activeChannel = subName;
    document.querySelectorAll('.ch-item').forEach(el => el.classList.remove('active'));
    const items = document.querySelectorAll('.ch-item');
    items.forEach(el => { if (el.querySelector('.ch-name')?.textContent === subName.toLowerCase()) el.classList.add('active'); });
    const sc = SUBCATEGORIES[parentCat][subName];
    if (sc) {
        showContentHub(subName, sc.questions, sc.emoji, true, parentCat);
        document.getElementById('mainTitle').textContent = subName.toLowerCase();
    }
}

function esc(s) { return s.replace(/'/g, "\\'"); }

// ===== SUBJECT QUESTION HELPER =====
function getSubjectQuestions(cat) {
    const meta = CAT_META[cat];
    if (meta.hasSystems) {
        return getSystemSubjectQuestions(cat);
    }
    if (meta.hasSubcategories) {
        const all = [];
        Object.values(SUBCATEGORIES[cat]).forEach(sc => all.push(...sc.questions));
        return all;
    }
    return QUESTIONS[cat] || [];
}

// ===== DASHBOARD =====
function renderDashboard() {
    const allQs = getAllQuestions();
    const prog = getProgress();
    const total = allQs.length;
    const attempted = allQs.filter(q => prog[q.id]).length;
    const correct = allQs.filter(q => prog[q.id] && prog[q.id].correct).length;
    const wrong = attempted - correct;
    const lb = JSON.parse(localStorage.getItem('mbc_leaderboard') || '[]');
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const name = getProfileName();

    let subjectCards = '';
    Object.entries(CAT_META).forEach(([cat, m]) => {
        const qs = getSubjectQuestions(cat);
        const t = qs.length, d = qs.filter(q => prog[q.id]).length;
        const c = qs.filter(q => prog[q.id] && prog[q.id].correct).length;
        const pct = t > 0 ? Math.round((d / t) * 100) : 0;
        subjectCards += `<div class="subj-card" style="--subj-color:${m.color}" onclick="selectServer('${cat}')">
            <div class="sc-emoji">${m.emoji}</div><div class="sc-name">${cat}</div>
            <div class="sc-bar"><div class="sc-fill" style="width:${pct}%"></div></div>
            <div class="sc-info"><span>${c}✓ ${d-c}✗</span><span>${pct}%</span></div>
        </div>`;
    });

    let recentHtml = '';
    lb.slice(0, 5).forEach(e => {
        const emoji = CAT_META[e.cat]?.emoji || '📋';
        recentHtml += `<div class="recent-item"><div class="ri-emoji">${emoji}</div><div class="ri-info"><div class="ri-name">${e.cat}</div><div class="ri-detail">${e.level} • ${e.date}</div></div><div class="ri-score">${e.pct}%</div></div>`;
    });
    if (!recentHtml) recentHtml = '<p style="color:var(--t3);text-align:center;padding:20px">No quizzes taken yet. Pick a subject to start!</p>';

    document.getElementById('mainBody').innerHTML = `
        <div class="dash-welcome"><h1>Welcome back, <span>${name}</span> 👋</h1><p>Track your progress, drill questions, and conquer your exams!</p></div>
        <div class="dash-stats">
            <div class="ds ds-ac"><div class="ds-val">${total}</div><div class="ds-lbl">Total Qs</div></div>
            <div class="ds ds-gr"><div class="ds-val">${correct}</div><div class="ds-lbl">Correct</div></div>
            <div class="ds ds-rd"><div class="ds-val">${wrong}</div><div class="ds-lbl">Wrong</div></div>
            <div class="ds ds-yl"><div class="ds-val">${accuracy}%</div><div class="ds-lbl">Accuracy</div></div>
        </div>
        <div class="dash-section"><h3>📚 Subjects</h3><div class="subj-grid">${subjectCards}</div></div>
        <div class="dash-section"><h3>🕐 Recent Activity</h3><div class="recent-list">${recentHtml}</div></div>
    `;
}

// ===== CONTENT HUB =====
function showContentHub(catName, questions, emoji, isSubcat, parentCat) {
    currentCat = catName;
    pendingPool = questions;
    pendingEmoji = emoji;
    pendingIsSubcat = isSubcat;
    pendingParent = parentCat || currentParentCat;
    document.getElementById('mainTitle').textContent = catName.toLowerCase();

    const prog = getProgress();
    const total = questions.length;
    const correct = questions.filter(q => prog[q.id] && prog[q.id].correct).length;
    const wrong = questions.filter(q => prog[q.id] && !prog[q.id].correct).length;
    const remaining = questions.filter(q => !prog[q.id]).length;
    const attempted = correct + wrong;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const completion = total > 0 ? Math.round((attempted / total) * 100) : 0;

    const clinical = questions.filter(q => q.t === 'c');
    const recall = questions.filter(q => q.t === 'r');
    const cRemain = clinical.filter(q => !prog[q.id]).length;
    const rRemain = recall.filter(q => !prog[q.id]).length;

    const videos = getContentVideos(catName, pendingParent);
    const notes = getContentNotes(catName, pendingParent);

    // Redo buttons
    let extraBtns = '';
    if (wrong > 0) extraBtns += `<button class="btn-o" onclick="startWithPool(pendingPool.filter(q=>{const p=getProgress()[q.id];return p&&!p.correct}),'🔁 Redo Wrong')">🔁 Redo Wrong (${wrong})</button>`;
    if (attempted > 0) extraBtns += `<button class="btn-o" onclick="startWithPool([...pendingPool],'🔄 Redo All')">🔄 Redo All (${total})</button>`;

    // Videos HTML
    let videosHtml = '';
    if (videos.length > 0) {
        videosHtml = `<div class="video-grid">${videos.map((v, i) => `
            <div class="video-card" id="vcard${i}" onclick="toggleVideo(${i},'${v.ytId}')">
                <div class="vc-header">
                    <div class="vc-play">▶</div>
                    <div class="vc-info">
                        <div class="vc-title">${v.title}</div>
                        <div class="vc-meta"><span class="vc-dur">⏱ ${v.duration || 'Video'}</span></div>
                    </div>
                </div>
                <div class="video-player" id="vplayer${i}"></div>
            </div>
        `).join('')}</div>`;
    } else {
        videosHtml = `<div class="coming-soon"><div class="cs-icon">🎬</div><div class="cs-text">Videos Coming Soon</div><div class="cs-sub">Lectures will be added here</div></div>`;
    }

    // Notes HTML
    let notesHtml = '';
    if (notes.length > 0) {
        notesHtml = `<div class="note-grid">${notes.map((n, i) => {
            const icon = n.type === 'notion' ? '📓' : n.type === 'link' ? '📄' : n.type === 'local' ? '📖' : '📝';
            const arrow = '→';
            const escAttr = s => s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;').replace(/</g,'&lt;');
            const url = escAttr(n.url || '');
            const title = escAttr(n.title || '');
            return `<div class="note-card" data-url="${url}" data-title="${title}" onclick="openNoteReader(this.dataset.url,this.dataset.title)"><div class="nc-icon">${icon}</div><div class="nc-info"><div class="nc-title">${n.title}</div><div class="nc-desc">${n.desc || (n.type === 'notion' ? 'Notion' : n.type === 'local' ? 'Master Guide' : 'Notes')}</div></div><div class="nc-arrow">${arrow}</div></div>`;
        }).join('')}</div>`;
    }
    // Always add a general notes card for this topic
    const _noteTitle = catName + ' Notes';
    notesHtml = `<div class="note-grid">${notesHtml ? notesHtml.replace(/<\/?div class="note-grid">/g,'') : ''}<div class="note-card" onclick="openNoteReader('','${esc(_noteTitle)}')"><div class="nc-icon">📝</div><div class="nc-info"><div class="nc-title">${catName} Notes</div><div class="nc-desc">Open notes panel</div></div><div class="nc-arrow">→</div></div></div>`;

    document.getElementById('mainBody').innerHTML = `
        <div class="hub-tabs">
            <button class="hub-tab active" onclick="scrollToSection('hubDash',this)">
                <span class="ht-icon">📊</span><span class="ht-label">Dashboard</span>
            </button>
            <button class="hub-tab" onclick="scrollToSection('hubQbank',this)">
                <span class="ht-icon">📋</span><span class="ht-label">Q-Bank</span>
                <span class="ht-badge">${total} Qs</span>
            </button>
            <button class="hub-tab" onclick="scrollToSection('hubVideos',this)">
                <span class="ht-icon">🎬</span><span class="ht-label">Videos</span>
                <span class="ht-badge">${videos.length > 0 ? videos.length : '—'}</span>
            </button>
            <button class="hub-tab" onclick="scrollToSection('hubNotes',this)">
                <span class="ht-icon">📝</span><span class="ht-label">Notes</span>
                <span class="ht-badge">${notes.length > 0 ? notes.length : '—'}</span>
            </button>
        </div>

        <div class="hub-section" id="hubDash">
            <div class="hub-section-head"><span class="hs-icon">📊</span><h3>Dashboard</h3></div>
            <div class="topic-stats">
                <div class="topic-stat ts-ac"><div class="ts-val">${total}</div><div class="ts-lbl">Total</div></div>
                <div class="topic-stat ts-gr"><div class="ts-val">${correct}</div><div class="ts-lbl">Correct</div></div>
                <div class="topic-stat ts-rd"><div class="ts-val">${wrong}</div><div class="ts-lbl">Wrong</div></div>
            </div>
            <div class="topic-progress">
                <div class="tp-info"><span>Completion</span><span>${completion}%</span></div>
                <div class="tp-bar"><div class="tp-fill" style="width:${completion}%"></div></div>
                <div class="tp-info"><span>${attempted} of ${total} attempted</span><span>Accuracy: ${accuracy}%</span></div>
            </div>
        </div>

        <div class="hub-section" id="hubQbank">
            <div class="hub-section-head"><span class="hs-icon">📋</span><h3>Question Bank</h3><span class="hs-count">${remaining} remaining</span></div>
            <div class="mode-grid">
                <div class="mode-card" onclick="startWithMode('c')"><div class="mc-icon">🏥</div><div class="mc-name">Clinical</div><div class="mc-desc">Case vignettes</div><div class="mc-count">${cRemain} remaining of ${clinical.length}</div></div>
                <div class="mode-card" onclick="startWithMode('r')"><div class="mc-icon">📝</div><div class="mc-name">Recall</div><div class="mc-desc">Factual MCQs</div><div class="mc-count">${rRemain} remaining of ${recall.length}</div></div>
                <div class="mode-card hl" onclick="startWithMode('all')"><div class="mc-icon">🔀</div><div class="mc-name">Mixed</div><div class="mc-desc">Both shuffled</div><div class="mc-count">${remaining} remaining of ${total}</div></div>
            </div>
            <div class="mode-extra">${extraBtns}</div>
        </div>

        <div class="hub-section" id="hubVideos">
            <div class="hub-section-head"><span class="hs-icon">🎬</span><h3>Videos</h3><span class="hs-count">${videos.length > 0 ? videos.length + ' videos' : 'Coming soon'}</span></div>
            ${videosHtml}
        </div>

        <div class="hub-section" id="hubNotes">
            <div class="hub-section-head"><span class="hs-icon">📝</span><h3>Notes</h3><span class="hs-count">${notes.length > 0 ? notes.length + ' notes' : 'Coming soon'}</span></div>
            ${notesHtml}
        </div>
    `;

    // Animate progress bar
    setTimeout(() => {
        const fill = document.querySelector('.tp-fill');
        if (fill) fill.style.width = completion + '%';
    }, 100);
}

// Tab navigation scroll
function scrollToSection(id, btn) {
    const el = document.getElementById(id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        document.querySelectorAll('.hub-tab').forEach(t => t.classList.remove('active'));
        if (btn) btn.classList.add('active');
    }
}

// Video player toggle
function toggleVideo(idx, ytId) {
    const player = document.getElementById('vplayer' + idx);
    const card = document.getElementById('vcard' + idx);
    if (!player || !card) return;

    // Close other open players
    document.querySelectorAll('.video-player.open').forEach(p => {
        if (p.id !== 'vplayer' + idx) {
            p.classList.remove('open');
            p.innerHTML = '';
            p.closest('.video-card')?.classList.remove('playing');
        }
    });

    if (player.classList.contains('open')) {
        player.classList.remove('open');
        player.innerHTML = '';
        card.classList.remove('playing');
    } else {
        player.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1" allow="autoplay;encrypted-media" allowfullscreen></iframe>`;
        player.classList.add('open');
        card.classList.add('playing');
    }
}

// ===== NOTES READER PANEL =====
var currentNoteUrl = '';

function openNoteReader(url, title) {
    currentNoteUrl = url || '';
    const panel = document.getElementById('notesReader');
    const overlay = document.getElementById('notesOverlay');
    const body = document.getElementById('nrBody');
    const extBtn = document.getElementById('nrExtBtn');
    document.getElementById('nrTitle').textContent = title || 'Notes';

    // Show/hide external link button based on URL
    if (extBtn) extBtn.style.display = url ? '' : 'none';

    panel.classList.add('open');
    overlay.classList.add('vis');

    if (url) {
        const clean = url.split('?')[0];
        body.innerHTML = '<iframe src="' + clean + '" style="width:100%;height:100%;border:none;position:absolute;top:0;left:0;right:0;bottom:0;" allowfullscreen></iframe>';
    } else {
        body.innerHTML = `<div class="nr-empty-state">
            <div class="nr-empty-icon">📝</div>
            <h3 class="nr-empty-title">${title || 'Notes'}</h3>
            <p class="nr-empty-text">Notes will be added here as you study this topic.</p>
            <p class="nr-empty-hint">Check back later for updated content!</p>
        </div>`;
    }
}

function closeNoteReader() {
    const panel = document.getElementById('notesReader');
    const overlay = document.getElementById('notesOverlay');
    const body = document.getElementById('nrBody');
    panel.classList.remove('open');
    overlay.classList.remove('vis');
    // Clear iframe after animation
    setTimeout(() => { body.innerHTML = '<div class="nr-loading">Loading notes...</div>'; }, 350);
}

function openNoteExternal() {
    if (currentNoteUrl) window.open(currentNoteUrl, '_blank');
}

// ===== MCQ PANEL =====
function storeCurrentTopic(cat, sys, chapter, topic) {
    currentTopicInfo = { cat, sys, chapter, topic };
}
let currentMcqType = 'all';
let topicQuestions = [];

function openMcqPanel() {
    const panel = document.getElementById('mcqPanel');
    const overlay = document.getElementById('mcqOverlay');
    
    panel.classList.add('open');
    overlay.classList.add('vis');
    currentMcqType = 'all';
    
    // Get and store current topic questions
    topicQuestions = getTopicMcqs();
    initMcqResize();
    renderMcqPanel();
}

function closeMcqPanel() {
    const panel = document.getElementById('mcqPanel');
    const overlay = document.getElementById('mcqOverlay');
    panel.classList.remove('open');
    panel.classList.remove('fullscreen');
    overlay.classList.remove('vis');
}

let mcqIsFullscreen = false;
function toggleMcqFullscreen() {
    const panel = document.getElementById('mcqPanel');
    mcqIsFullscreen = !mcqIsFullscreen;
    if (mcqIsFullscreen) {
        panel.classList.add('fullscreen');
        panel.style.width = (window.innerWidth * 0.75) + 'px';
    } else {
        panel.classList.remove('fullscreen');
        panel.style.width = '400px';
    }
}

// Notes fullscreen mode
let notesIsFullscreen = false;
function toggleNotesFullscreen() {
    const topicView = document.querySelector('.topic-view');
    if (!topicView) return;
    notesIsFullscreen = !notesIsFullscreen;
    if (notesIsFullscreen) {
        hideAllSidebars();
        topicView.classList.add('fullscreen-mode');
    } else {
        showAllSidebars();
        topicView.classList.remove('fullscreen-mode');
    }
}

// Hide all sidebars for clean view
function hideAllSidebars() {
    const channelSidebar = document.getElementById('channelSidebar');
    const analyticsSidebar = document.getElementById('analyticsSidebar');
    if (channelSidebar) channelSidebar.classList.add('collapsed');
    if (analyticsSidebar) analyticsSidebar.classList.add('collapsed');
}

// Show all sidebars
function showAllSidebars() {
    const channelSidebar = document.getElementById('channelSidebar');
    const analyticsSidebar = document.getElementById('analyticsSidebar');
    if (channelSidebar) channelSidebar.classList.remove('collapsed');
    if (analyticsSidebar) analyticsSidebar.classList.remove('collapsed');
}

// Keyboard shortcut
document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
        if (document.querySelector('.topic-view')) {
            toggleNotesFullscreen();
        }
    }
});

function initMcqResize() {
    const panel = document.getElementById('mcqPanel');
    const handle = document.getElementById('mcqResizeHandle');
    if (!handle) return;
    
    let isResizing = false;
    let startX, startWidth;
    
    handle.onmousedown = function(e) {
        isResizing = true;
        startX = e.clientX;
        startWidth = panel.offsetWidth;
        panel.classList.add('resizing');
        document.body.style.cursor = 'ew-resize';
        document.body.style.userSelect = 'none';
        e.preventDefault();
        e.stopPropagation();
    };
    
    document.onmousemove = function(e) {
        if (!isResizing) return;
        // Moving mouse left = more width, right = less width
        const delta = startX - e.clientX;
        const newWidth = startWidth + delta;
        
        // Fullscreen at 75% of screen (gives 25% space on right)
        const fullscreenThreshold = window.innerWidth * 0.75;
        
        if (newWidth > fullscreenThreshold) {
            panel.classList.add('fullscreen');
            mcqIsFullscreen = true;
            panel.style.width = fullscreenThreshold + 'px';
        } else if (newWidth >= 380) {
            panel.classList.remove('fullscreen');
            mcqIsFullscreen = false;
            panel.style.width = newWidth + 'px';
        } else {
            panel.style.width = '380px';
        }
    };
    
    document.onmouseup = function() {
        if (isResizing) {
            isResizing = false;
            panel.classList.remove('resizing');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }
    };
}

function getTopicMcqs() {
    const { cat, sys, chapter, topic } = currentTopicInfo;
    if (!cat || !sys || !chapter || !topic) return [];
    
    // Access data directly from MEDICINE_DATA etc
    let dataSource;
    if (cat === 'Medicine') dataSource = MEDICINE_DATA;
    else if (cat === 'Surgery') dataSource = SURGERY_DATA;
    else if (cat === 'OBG') dataSource = OBG_DATA;
    else if (cat === 'Paeds') dataSource = PAEDS_DATA;
    else if (cat === 'ENT') dataSource = ENT_DATA;
    else if (cat === 'Ortho') dataSource = ORTHO_DATA;
    else return [];
    
    const sysData = dataSource[sys];
    if (!sysData || !sysData.chapters) return [];
    const ch = sysData.chapters[chapter];
    if (!ch || !ch.topics) return [];
    const t = ch.topics.find(t => t.name === topic);
    return t && t.questions ? t.questions : [];
}

function renderMcqPanel() {
    const body = document.getElementById('mcqBody');
    if (!body) return;
    
    const allQs = topicQuestions;
    
    if (!allQs || allQs.length === 0) {
        body.innerHTML = `<div class="nr-empty-state">
            <div class="nr-empty-icon">🎯</div>
            <h3 class="nr-empty-title">No MCQs Yet</h3>
            <p class="nr-empty-text">MCQs for this topic are coming soon.</p>
            <p class="nr-empty-hint">Add questions to enable practice mode</p>
        </div>`;
        return;
    }
    
    // Calculate progress
    const prog = getProgress();
    const answered = allQs.filter((q, i) => prog[q.id || 'tq' + i]).length;
    const correct = allQs.filter((q, i) => {
        const p = prog[q.id || 'tq' + i];
        return p && p.correct;
    }).length;
    const pct = Math.round((correct / allQs.length) * 100);
    
    // Filter questions by type
    const recallQs = allQs.filter(q => q.t === 'r');
    const caseQs = allQs.filter(q => q.t === 'c');
    const allCount = allQs.length;
    const recallCount = recallQs.length;
    const caseCount = caseQs.length;
    
    let html = `
        <div class="mcq-panel-header">
            <div class="mcq-panel-progress">
                <div class="mcq-panel-progress-fill" style="width:${(answered / allCount) * 100}%"></div>
            </div>
            <div class="mcq-panel-stats">${answered}/${allCount} done • ${correct} correct (${pct}%)</div>
        </div>
        <div class="mcq-filter-bar">
            <button class="mcq-filter-btn ${currentMcqType === 'all' ? 'active' : ''}" onclick="filterMcqs('all')">
                All (${allCount})
            </button>
            <button class="mcq-filter-btn ${currentMcqType === 'recall' ? 'active' : ''}" onclick="filterMcqs('recall')">
                Recall (${recallCount})
            </button>
            <button class="mcq-filter-btn ${currentMcqType === 'case' ? 'active' : ''}" onclick="filterMcqs('case')">
                Case (${caseCount})
            </button>
        </div>
        <div class="mcq-scroll-list">
    `;
    
    // Get filtered questions
    let filtered;
    if (currentMcqType === 'recall') filtered = recallQs;
    else if (currentMcqType === 'case') filtered = caseQs;
    else filtered = allQs;
    
    const letters = ['A', 'B', 'C', 'D'];
    
    filtered.forEach((q, i) => {
        const qId = q.id || 'tq' + allQs.indexOf(q);
        const done = prog[qId];
        const prevAnswer = done ? done.ans : -1;
        const isAnswered = done !== undefined;
        
        html += `<div class="mcq-card ${isAnswered ? 'answered' : ''}">
            <div class="mcq-card-num">Q${i + 1} ${q.t === 'r' ? '🧠' : q.t === 'c' ? '📋' : ''}</div>
            <div class="mcq-card-q">${q.q}</div>
            <div class="mcq-card-opts">`;
        
        q.o.forEach((opt, j) => {
            let optClass = 'mcq-card-opt';
            if (isAnswered) {
                optClass += ' disabled';
                if (j === q.a) optClass += ' correct';
                if (j === prevAnswer && prevAnswer !== q.a) optClass += ' wrong';
            }
            html += `<div class="${optClass}" onclick="${isAnswered ? '' : `answerMcqInPanel(${allQs.indexOf(q)},${j})`}">
                <span class="mcq-card-letter">${letters[j]}</span>
                <span class="mcq-card-text">${opt}</span>
            </div>`;
        });
        
        html += `</div>`;
        
        if (isAnswered) {
            const expClass = done.correct ? 'correct' : 'wrong';
            const expText = q.e || (done.correct ? 'Well done!' : 'The correct answer is: ' + q.o[q.a]);
            html += `<div class="mcq-card-exp ${expClass}">
                <div class="mcq-exp-title ${expClass}">${done.correct ? '✅ Correct!' : '❌ Incorrect'}</div>
                <div class="mcq-exp-text">${expText}</div>
            </div>`;
        }
        
        html += `</div>`;
    });
    
    html += `</div>`;
    body.innerHTML = html;
}

function answerMcqInPanel(qIdx, ans, evt) {
    if (evt) { evt.stopPropagation(); evt.preventDefault(); }
    
    const scrollList = document.querySelector('.mcq-scroll-list');
    const savedScroll = scrollList ? scrollList.scrollTop : 0;
    
    const q = topicQuestions[qIdx];
    if (!q) return;
    
    const isCorrect = ans === q.a;
    const qId = q.id || 'tq' + qIdx;
    saveQuestionProgress({ id: qId }, ans, isCorrect);
    renderMcqPanel();
    
    // Update analytics - pass current topic to ensure topic-specific analytics
    if (currentTopicInfo && currentTopicInfo.topic) {
        renderAnalytics();
    }
    
    const newList = document.querySelector('.mcq-scroll-list');
    if (newList) newList.scrollTop = savedScroll;
}

function filterMcqs(type) {
    currentMcqType = type;
    renderMcqPanel();
}

function openMcqInPanel(idx) {
    const q = topicQuestions[idx];
    if (!q) return;
    
    const letters = ['A', 'B', 'C', 'D'];
    const body = document.getElementById('mcqBody');
    
    body.innerHTML = `
        <div class="mcq-back-bar">
            <button class="mcq-back-btn" onclick="renderMcqPanel()">← Back to List</button>
        </div>
        <div class="mcq-full-question">
            <div class="mcq-full-text">${q.q}</div>
            <div class="mcq-full-options">`;
    
    q.o.forEach((opt, i) => {
        body.innerHTML += `<div class="mcq-full-opt" id="opt${i}" onclick="selectMcqOption(${idx}, ${i})">
            <span class="mcq-full-letter">${letters[i]}</span>
            <span class="mcq-full-text">${opt}</span>
        </div>`;
    });
    
    body.innerHTML += `</div></div>
        <div class="mcq-full-exp" id="mcqExp" style="display:none">
            <div class="mcq-exp-label"></div>
            <div class="mcq-exp-text"></div>
        </div>`;
}

function selectMcqOption(qIdx, ans) {
    const q = topicQuestions[qIdx];
    if (!q) return;
    
    const isCorrect = ans === q.a;
    const qId = q.id || 'tq' + qIdx;
    saveQuestionProgress({ id: qId }, ans, isCorrect);
    
    document.querySelectorAll('.mcq-full-opt').forEach((el, i) => {
        el.classList.add('disabled');
        if (i === q.a) el.classList.add('correct');
        if (i === ans && !isCorrect) el.classList.add('wrong');
    });
    
    const expEl = document.getElementById('mcqExp');
    expEl.style.display = 'block';
    expEl.querySelector('.mcq-exp-label').textContent = isCorrect ? '✅ Correct!' : '❌ Wrong!';
    expEl.querySelector('.mcq-exp-text').textContent = q.e || 'The correct answer is: ' + q.o[q.a];
    
    renderAnalytics();
}

function filterMcqs(type) {
    currentMcqType = type;
    renderMcqPanel();
}

function startMcqFromPanel(idx) {
    const q = topicQuestions[parseInt(idx)];
    if (q) {
        closeMcqPanel();
        pendingPool = topicQuestions;
        startQuiz([q], false);
    }
}

// Legacy wrapper — keeps old code paths working
function showModeScreen(catName, questions, emoji, isSubcat) {
    showContentHub(catName, questions, emoji, isSubcat, currentParentCat);
}

function startWithMode(mode) {
    const prog = getProgress();
    let pool;
    if (mode === 'c') pool = pendingPool.filter(q => q.t === 'c');
    else if (mode === 'r') pool = pendingPool.filter(q => q.t === 'r');
    else pool = [...pendingPool];
    const unanswered = pool.filter(q => !prog[q.id]);
    if (unanswered.length === 0) { alert('All done! Use Redo Wrong or Redo All.'); return; }
    startWithPool(unanswered, pendingEmoji + ' ' + currentCat);
}

function startWithPool(pool, label) {
    currentIdx = 0; answered = false;
    const count = Math.min(pool.length, 10);
    currentQs = shuffle([...pool]).slice(0, count);
    userAnswers = new Array(count).fill(-1);
    renderQuiz(label);
}

// ===== QUIZ =====
function renderQuiz(label) {
    const total = currentQs.length;
    document.getElementById('mainTitle').textContent = currentCat.toLowerCase() + ' quiz';
    document.getElementById('mainBody').innerHTML = `
        <div class="quiz-top"><span class="qt-cat">${label || currentCat}</span><span class="qt-prog" id="quizProg">1/${total}</span><button class="qt-quit" onclick="confirmQuit()">✕ Quit</button></div>
        <div class="quiz-nav"><button class="q-arrow" id="prevBtn" onclick="prevQuestion()">←</button><div class="timer-wrap"><div class="timer-bar"><div class="timer-fill" id="timerFill"></div></div></div><button class="q-arrow" id="nextBtn" onclick="nextQuestion()">→</button></div>
        <div class="timer-text" id="timerText">45</div>
        <div class="q-card"><div class="q-num" id="qNum"></div><div class="q-text" id="qText"></div></div>
        <div class="opts" id="optionsDiv"></div>
        <div class="exp-card" id="expCard"><div class="exp-t">💡 EXPLANATION</div><div class="exp-txt" id="expText"></div><div class="exp-rev" id="expRevise"></div></div>
    `;
    renderQuestion();
}

function renderQuestion() {
    clearInterval(timer);
    const q = currentQs[currentIdx];
    const prevAnswer = userAnswers[currentIdx];
    const alreadyDone = prevAnswer !== -1;
    answered = alreadyDone;
    const total = currentQs.length;

    document.getElementById('quizProg').textContent = `${currentIdx + 1}/${total}`;
    document.getElementById('qNum').textContent = `QUESTION ${currentIdx + 1} OF ${total}`;
    document.getElementById('qText').textContent = q.q;

    const od = document.getElementById('optionsDiv');
    od.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];
    q.o.forEach((opt, i) => {
        const d = document.createElement('div');
        d.className = 'opt';
        if (alreadyDone) {
            d.classList.add('disabled');
            if (i === q.a) d.classList.add('correct');
            if (prevAnswer >= 0 && i === prevAnswer && prevAnswer !== q.a) d.classList.add('wrong');
        }
        d.innerHTML = `<div class="ol">${letters[i]}</div><div class="ot">${opt}</div>`;
        if (!alreadyDone) d.onclick = () => selectOption(i);
        od.appendChild(d);
    });

    if (alreadyDone) {
        document.getElementById('timerText').textContent = '--';
        document.getElementById('timerFill').style.width = '0%';
        document.getElementById('timerFill').className = 'timer-fill';
        document.getElementById('timerText').className = 'timer-text';
        showExplanation(q);
        showQuizNav();
    } else {
        hideQuizArrows();
        document.getElementById('expCard').classList.remove('vis');
        startTimer();
    }
}

function selectOption(idx) {
    if (answered) return;
    answered = true; clearInterval(timer);
    userAnswers[currentIdx] = idx;
    const q = currentQs[currentIdx];
    const isCorrect = idx === q.a;
    saveQuestionProgress(q, idx, isCorrect);
    const opts = document.querySelectorAll('.opt');
    opts.forEach((o, i) => {
        o.classList.add('disabled');
        if (i === q.a) o.classList.add('correct');
        if (i === idx && idx !== q.a) o.classList.add('wrong');
    });
    showExplanation(q);
    showQuizNav();
    renderAnalytics();
}

function nextQuestion() {
    currentIdx++;
    if (currentIdx >= currentQs.length) { hideQuizArrows(); computeScore(); showResults(); return; }
    renderQuestion();
}

function prevQuestion() { if (currentIdx <= 0) return; currentIdx--; renderQuestion(); }

function computeScore() {
    score = 0;
    for (let i = 0; i < currentQs.length; i++) { if (userAnswers[i] === currentQs[i].a) score++; }
}

function showQuizNav() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    prevBtn.disabled = currentIdx <= 0;
    prevBtn.classList.add('vis');
    nextBtn.textContent = currentIdx >= currentQs.length - 1 ? '✓' : '→';
    nextBtn.classList.add('vis');
}

function hideQuizArrows() {
    const p = document.getElementById('prevBtn'); if (p) p.classList.remove('vis');
    const n = document.getElementById('nextBtn'); if (n) n.classList.remove('vis');
}

function startTimer() {
    timeLeft = 45;
    const fill = document.getElementById('timerFill');
    const txt = document.getElementById('timerText');
    fill.style.width = '100%'; fill.className = 'timer-fill';
    txt.className = 'timer-text'; txt.textContent = '45';
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        fill.style.width = (timeLeft / 45 * 100) + '%';
        txt.textContent = timeLeft;
        if (timeLeft <= 10) { fill.className = 'timer-fill danger'; txt.className = 'timer-text danger'; }
        else if (timeLeft <= 20) { fill.className = 'timer-fill warn'; txt.className = 'timer-text warn'; }
        if (timeLeft <= 0) { clearInterval(timer); timeUp(); }
    }, 1000);
}

function timeUp() {
    if (answered) return;
    answered = true;
    userAnswers[currentIdx] = -2;
    const q = currentQs[currentIdx];
    saveQuestionProgress(q, -2, false);
    document.querySelectorAll('.opt').forEach((o, i) => { o.classList.add('disabled'); if (i === q.a) o.classList.add('correct'); });
    showExplanation(q);
    showQuizNav();
    renderAnalytics();
}

function confirmQuit() {
    if (confirm('Quit quiz? Progress on unanswered questions will be lost.')) {
        clearInterval(timer); hideQuizArrows();
        showModeScreen(currentCat, pendingPool, pendingEmoji, pendingIsSubcat);
        renderAnalytics();
    }
}

function showExplanation(q) {
    const card = document.getElementById('expCard');
    const textEl = document.getElementById('expText');
    const reviseEl = document.getElementById('expRevise');
    if (q.e) {
        textEl.innerHTML = q.e;
        reviseEl.style.display = q.r ? 'block' : 'none';
        if (q.r) reviseEl.innerHTML = '📚 Revise: ' + q.r;
        card.classList.add('vis');
    } else {
        textEl.innerHTML = '✅ Correct answer: <strong>' + q.o[q.a] + '</strong>';
        reviseEl.style.display = 'none';
        card.classList.add('vis');
    }
}

// ===== RESULTS =====
function showResults() {
    clearInterval(timer);
    const total = currentQs.length;
    const pct = Math.round((score / total) * 100);
    const level = LEVELS.find(l => pct <= l.max) || LEVELS[LEVELS.length - 1];

    const lb = JSON.parse(localStorage.getItem('mbc_leaderboard') || '[]');
    lb.push({ cat: currentCat, score, total, pct, level: level.title, date: new Date().toLocaleDateString(), time: Date.now(), name: getProfileName() });
    lb.sort((a, b) => b.pct - a.pct || b.time - a.time);
    if (lb.length > 50) lb.length = 50;
    localStorage.setItem('mbc_leaderboard', JSON.stringify(lb));
    trackEvent('quiz_complete', { category: currentCat, score, pct, level: level.title });

    const barColors = ['#f87171', '#f87171', '#fbbf24', '#fbbf24', '#34d399', '#34d399', '#7c5cf0', '#7c5cf0', '#f472b6'];
    const levelIdx = LEVELS.indexOf(level);
    const barColor = barColors[levelIdx] || '#7c5cf0';

    document.getElementById('mainTitle').textContent = 'results';
    document.getElementById('mainBody').innerHTML = `
        <div class="res-container">
            <div class="res-emoji">${pct >= 70 ? '🎉' : '🏥'}</div>
            <div class="res-title">Quiz Complete!</div>
            <div class="res-score">${score}/${total}</div>
            <div class="res-sub">${currentCat} • ${pct}% Accuracy</div>
            <div class="res-breakdown">
                <div class="rb gr"><div class="rv">${score}</div><div class="rl">Correct</div></div>
                <div class="rb rd"><div class="rv">${total - score}</div><div class="rl">Wrong</div></div>
                <div class="rb yl"><div class="rv">${pct}%</div><div class="rl">Score</div></div>
            </div>
            <div class="res-bar-wrap"><div class="res-bar-label">YOUR LEVEL</div><div class="res-bar-outer"><div class="res-bar-inner" id="resultBar" style="--tw:${pct}%;background:linear-gradient(90deg,${barColor},${barColor}dd)">${pct}%</div></div></div>
            <div class="personality"><div class="pe">${level.emoji}</div><div class="pl">${level.title}</div><div class="pr">"${level.roast}"</div></div>
            <div class="res-btns">
                <button class="btn-s" onclick="shareScore()">📤 Share Score</button>
                <button class="btn-p" onclick="showModeScreen(currentCat,pendingPool,pendingEmoji,pendingIsSubcat)">🔄 Play Again</button>
                <button class="btn-o" onclick="selectServer('home')">🏠 Dashboard</button>
            </div>
        </div>
    `;
    setTimeout(() => { const bar = document.getElementById('resultBar'); if (bar) bar.classList.add('anim'); }, 300);
    if (pct >= 70) launchConfetti();
    renderAnalytics();
}

function shareScore() {
    const total = currentQs.length;
    const pct = Math.round((score / total) * 100);
    const level = LEVELS.find(l => pct <= l.max) || LEVELS[LEVELS.length - 1];
    const text = `🧠 The Noob Doctor\n${pendingEmoji} ${currentCat}\n\n📊 Score: ${score}/${total} (${pct}%)\n${level.emoji} Level: ${level.title}\n"${level.roast}"\n\n🔥 Can you beat me?`;
    if (navigator.share) { navigator.share({ title: 'The Noob Doctor', text }).catch(() => {}); }
    else { navigator.clipboard.writeText(text).then(() => alert('Score copied! 📋')).catch(() => {}); }
}

// ===== LEADERBOARD =====
function renderLeaderboard() {
    document.getElementById('mainTitle').textContent = 'leaderboard';
    const lb = JSON.parse(localStorage.getItem('mbc_leaderboard') || '[]');
    if (lb.length === 0) {
        document.getElementById('mainBody').innerHTML = '<div class="lb-empty">🏆 No scores yet. Complete a quiz to see your rankings!</div>';
        return;
    }
    let html = '<div class="lb-list">';
    lb.slice(0, 20).forEach((e, i) => {
        const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
        html += `<div class="lb-item" style="animation-delay:${i * .05}s">
            <div class="lb-rank ${rankClass}">${i < 3 ? ['🥇','🥈','🥉'][i] : (i+1)}</div>
            <div class="lb-info"><div class="lb-name">${e.name || 'Player'} • ${CAT_META[e.cat]?.emoji || ''} ${e.cat}</div><div class="lb-detail">${e.level} • ${e.date}</div></div>
            <div class="lb-score">${e.pct}%</div>
        </div>`;
    });
    html += '</div><button class="btn-d lb-clear" onclick="if(confirm(\'Clear all scores?\')){localStorage.removeItem(\'mbc_leaderboard\');renderLeaderboard();renderAnalytics()}">🗑️ Clear All</button>';
    document.getElementById('mainBody').innerHTML = html;
}

// ===== ANALYTICS SIDEBAR =====
function renderAnalytics(customCat, customParent) {
    const cat = customCat || currentCat || '';
    const parent = customParent || currentParentCat || '';
    const server = activeServer;
    const prog = getProgress();
    
    let qs = [];
    let title = '';
    let showLevel = 'overall';
    
    // Check if we're viewing a specific topic - show topic progress
    if (currentTopicInfo && currentTopicInfo.topic) {
        qs = getTopicMcqs();
        console.log('Topic analytics:', currentTopicInfo.topic, 'Questions:', qs.length);
        title = currentTopicInfo.topic + ' Progress';
        showLevel = 'topic';
    }
    // Determine what to show based on current context
    else if (server === 'home' || !server) {
        // Overall analytics for dashboard
        qs = getAllQuestions();
        title = 'Overall Progress';
        showLevel = 'overall';
    } else if (cat && parent) {
        // Specific chapter/topic - get questions for that chapter
        const systems = SUBJECT_SYSTEMS[parent];
        if (systems && systems[cat] && systems[cat].chapters) {
            // We're in a specific chapter
            for (const chapter of Object.values(systems[cat].chapters)) {
                qs.push(...chapter.topics);
            }
            title = cat + ' Analytics';
            showLevel = 'chapter';
        } else if (parent && SUBJECT_SYSTEMS[parent]) {
            // We're in a system (e.g., Rheumatology under Medicine)
            const subData = SUBJECT_SYSTEMS[parent];
            if (subData[cat]) {
                for (const sys of Object.values(subData)) {
                    if (sys.chapters) {
                        for (const chapter of Object.values(sys.chapters)) {
                            qs.push(...chapter.topics);
                        }
                    }
                }
                title = cat + ' Analytics';
                showLevel = 'system';
            }
        }
    } else {
        // Fallback to overall
        qs = getAllQuestions();
        title = 'Overall Progress';
        showLevel = 'overall';
    }

    // Calculate stats for the filtered questions
    const total = qs.length;
    const attempted = qs.filter((q, i) => {
        const qId = q.id || 'tq' + i;
        return prog[qId];
    }).length;
    const correct = qs.filter((q, i) => {
        const qId = q.id || 'tq' + i;
        return prog[qId] && prog[qId].correct;
    }).length;
    const wrong = attempted - correct;
    const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
    const completion = total > 0 ? Math.round((attempted / total) * 100) : 0;
    
    // Determine what charts to show
    let chartsHtml = '';
    if (showLevel === 'topic') {
        chartsHtml = `
            <div class="a-chart"><h4>Topic Progress</h4><canvas id="topicChart" height="160"></canvas></div>
            <div class="a-weak"><h4>📊 Performance</h4><div class="a-progress-list">${renderTopicProgressList()}</div></div>
        `;
    } else if (showLevel === 'overall') {
        chartsHtml = `
            <div class="a-chart"><h4>Subject Progress</h4><canvas id="subjectChart" height="260"></canvas></div>
            <div class="a-chart"><h4>Score Trend</h4><canvas id="trendChart" height="140"></canvas></div>
            <div class="a-weak"><h4>⚠️ Focus Areas</h4><div id="weakSubjects"></div></div>
        `;
    } else {
        chartsHtml = `
            <div class="a-chart"><h4>Topic Completion</h4><canvas id="topicChart" height="180"></canvas></div>
            <div class="a-weak"><h4>🔴 Weak Topics</h4><div id="weakTopics"></div></div>
        `;
    }

    document.getElementById('analyticsBody').innerHTML = `
        <div class="a-header">
            <div class="a-title">${title}</div>
            <div class="a-level">${showLevel === 'overall' ? 'All Subjects' : cat}</div>
        </div>
        <div class="a-stats">
            <div class="a-stat"><div class="a-val a-ac">${total}</div><div class="a-lbl">Total</div></div>
            <div class="a-stat"><div class="a-val a-gr">${correct}</div><div class="a-lbl">Correct</div></div>
            <div class="a-stat"><div class="a-val a-rd">${wrong}</div><div class="a-lbl">Wrong</div></div>
            <div class="a-stat"><div class="a-val a-ac">${accuracy}%</div><div class="a-lbl">Accuracy</div></div>
        </div>
        <div class="a-chart"><h4>Completion</h4><canvas id="completionChart" height="180"></canvas></div>
        ${chartsHtml}
    `;
    
    setTimeout(() => {
        const sectionData = getSectionCompletion();
        const prog = getProgress();
        const qs = topicQuestions || [];
        
        let mcqCorrect = 0, mcqWrong = 0;
        const mcqTotal = qs.length;
        qs.forEach((q, i) => {
            const qId = q.id || 'tq' + i;
            if (prog[qId]) {
                if (prog[qId].correct) mcqCorrect++;
                else mcqWrong++;
            }
        });
        
        const notesPct = sectionData.total > 0 ? (sectionData.completed / sectionData.total) * 100 : 0;
        const notesDone = Math.round(notesPct);
        const notesLeft = 100 - notesDone;
        
        destroyChart('completion');
        const ctx = document.getElementById('completionChart');
        if (ctx) {
            chartInstances['completion'] = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Correct', 'Wrong', 'Unattempted'],
                    datasets: [
                        {
                            data: [mcqCorrect, mcqWrong, mcqTotal - mcqCorrect - mcqWrong],
                            backgroundColor: ['#22c55e', '#ef4444', '#374151'],
                            borderWidth: 0,
                            weight: 1.2
                        },
                        {
                            data: [notesDone, notesLeft],
                            backgroundColor: ['#6366f1', '#1e1e2e'],
                            borderWidth: 0,
                            weight: 0.7
                        }
                    ]
                },
                options: {
                    responsive: true,
                    cutout: '40%',
                    animation: { duration: 600, easing: 'easeOutQuart' },
                    plugins: { legend: { display: false }, tooltip: { enabled: true } }
                }
            });
        }
        
        if (showLevel === 'overall') {
            renderSubjectChart();
            renderTrendChart();
            renderWeakSubjects();
        } else if (showLevel === 'topic') {
            renderTopicChart(topicQuestions || getTopicMcqs(), getProgress());
        } else {
            renderTopicChart(topicQuestions || getTopicMcqs(), getProgress());
        }
    }, 50);
}

function renderCompletionChart(correct, wrong, unattempted, sectionsDone, sectionsTotal) {
    destroyChart('completion');
    
    const sectionPct = sectionsTotal > 0 ? Math.round((sectionsDone / sectionsTotal) * 100) : 0;
    const notesCompleted = sectionPct > 0;
    
    const ctx = document.getElementById('completionChart');
    if (!ctx) return;
    
    chartInstances['completion'] = new Chart(ctx, {
        type: 'doughnut',
        data: { 
            labels: ['Correct', 'Wrong', 'Unattempted'], 
            datasets: [{ 
                data: [correct, wrong, unattempted], 
                backgroundColor: ['#34d399', '#f87171', '#6b7280'], 
                borderWidth: 0
            }] 
        },
        options: { 
            responsive: true, 
            cutout: '65%', 
            animation: { duration: 600, easing: 'easeOutQuart' },
            plugins: { legend: { display: false }, tooltip: { enabled: true } }
        },
        plugins: [{
            id: 'notesRing',
            beforeDraw: function(chart) {
                const ctx = chart.ctx;
                const cx = chart.chartArea.left + chart.width / 2;
                const cy = chart.chartArea.top + chart.height / 2;
                const radius = Math.min(chart.width, chart.height) / 2;
                
                ctx.save();
                ctx.beginPath();
                ctx.arc(cx, cy, radius * 0.32, 0, 2 * Math.PI);
                ctx.fillStyle = notesCompleted ? 'rgba(52, 211, 153, 0.15)' : 'rgba(107, 114, 128, 0.1)';
                ctx.fill();
                
                ctx.font = 'bold 16px Inter';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = notesCompleted ? '#34d399' : '#6b7280';
                ctx.fillText(sectionPct + '%', cx, cy - 6);
                ctx.font = '9px Inter';
                ctx.fillStyle = '#8b8da8';
                ctx.fillText('Notes', cx, cy + 10);
                ctx.restore();
            }
        }]
    });
}

function renderSubjectChart() {
    destroyChart('subject');
    const ctx = document.getElementById('subjectChart');
    if (!ctx) return;
    const names = [], pcts = [], colors = [];
    const prog = getProgress();
    Object.entries(CAT_META).forEach(([cat, m]) => {
        const qs = getSubjectQuestions(cat);
        const t = qs.length, d = qs.filter(q => prog[q.id]).length;
        names.push(cat); pcts.push(t > 0 ? Math.round((d / t) * 100) : 0); colors.push(m.color);
    });
    chartInstances['subject'] = new Chart(ctx, {
        type: 'bar',
        data: { labels: names, datasets: [{ data: pcts, backgroundColor: colors, borderRadius: 4, barThickness: 18 }] },
        options: { indexAxis: 'y', responsive: true, plugins: { legend: { display: false } },
            scales: { x: { max: 100, grid: { color: '#262648' }, ticks: { color: '#8b8da8', font: { size: 10 } } }, y: { grid: { display: false }, ticks: { color: '#eef0f6', font: { size: 10 } } } }
        }
    });
}

function renderTopicProgressList() {
    const qs = topicQuestions || getTopicMcqs();
    const prog = getProgress();
    let html = '<div class="a-progress-items">';
    
    qs.forEach((q, i) => {
        const qId = q.id || 'tq' + i;
        const p = prog[qId];
        const done = !!p;
        const correct = p && p.correct;
        
        html += `<div class="a-progress-item ${done ? (correct ? 'correct' : 'wrong') : ''}">
            <span class="a-pi-num">Q${i+1}</span>
            <span class="a-pi-text">${q.q.substring(0, 35)}${q.q.length > 35 ? '...' : ''}</span>
            <span class="a-pi-status">${done ? (correct ? '✓' : '✗') : '○'}</span>
        </div>`;
    });
    
    html += '</div>';
    return html;
}

function renderTopicChart() {
    destroyChart('topic');
    const ctx = document.getElementById('topicChart');
    if (!ctx) return;
    
    const qs = topicQuestions || getTopicMcqs();
    const prog = getProgress();
    
    const data = qs.map((q, i) => {
        const qId = q.id || 'tq' + i;
        const p = prog[qId];
        return p ? (p.correct ? 100 : 0) : 0;
    });
    
    chartInstances['topic'] = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: qs.map((_, i) => 'Q' + (i+1)),
            datasets: [{
                data: data,
                backgroundColor: data.map(v => v === 100 ? '#34d399' : (v === 0 ? '#f87171' : '#6b7280')),
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: { legend: { display: false } },
            scales: {
                x: { grid: { display: false }, ticks: { color: '#8b8da8', font: { size: 9 } } },
                y: { min: 0, max: 100, grid: { color: '#262648' }, ticks: { color: '#8b8da8', font: { size: 9 } }, display: false }
            }
        }
    });
}

function renderTrendChart() {
    destroyChart('trend');
    const ctx = document.getElementById('trendChart');
    if (!ctx) return;
    const lb = JSON.parse(localStorage.getItem('mbc_leaderboard') || '[]');
    const recent = lb.slice(0, 15).reverse();
    if (recent.length === 0) { ctx.parentElement.style.display = 'none'; return; }
    ctx.parentElement.style.display = 'block';
    chartInstances['trend'] = new Chart(ctx, {
        type: 'line',
        data: { labels: recent.map((_, i) => '#' + (i + 1)), datasets: [{ data: recent.map(e => e.pct), borderColor: '#7c5cf0', backgroundColor: 'rgba(124,92,240,.1)', fill: true, tension: .4, pointRadius: 3, pointBackgroundColor: '#7c5cf0' }] },
        options: { responsive: true, plugins: { legend: { display: false } },
            scales: { y: { min: 0, max: 100, grid: { color: '#262648' }, ticks: { color: '#8b8da8', font: { size: 9 } } }, x: { grid: { display: false }, ticks: { color: '#8b8da8', font: { size: 9 } } } }
        }
    });
}

function renderWeakSubjects() {
    const el = document.getElementById('weakSubjects');
    if (!el) return;
    const prog = getProgress();
    const subjects = [];
    Object.entries(CAT_META).forEach(([cat, m]) => {
        const qs = getSubjectQuestions(cat);
        const attempted = qs.filter(q => prog[q.id]);
        if (attempted.length > 0) {
            const correct = attempted.filter(q => prog[q.id].correct).length;
            const acc = Math.round((correct / attempted.length) * 100);
            subjects.push({ name: cat, emoji: m.emoji, acc });
        }
    });
    subjects.sort((a, b) => a.acc - b.acc);
    const weak = subjects.filter(s => s.acc < 70).slice(0, 4);
    if (weak.length === 0) { el.innerHTML = '<p style="font-size:12px;color:var(--t3)">Looking good! No weak areas found.</p>'; return; }
    el.innerHTML = weak.map(s => `<div class="weak-item"><span class="w-em">${s.emoji}</span><span>${s.name}</span><span class="w-pct">${s.acc}%</span></div>`).join('');
}

// Topic-level chart renderer
function renderTopicChart(qs, prog) {
    destroyChart('topic');
    const ctx = document.getElementById('topicChart');
    if (!ctx || !qs || qs.length === 0) return;
    
    const names = [], done = [], remaining = [];
    if (!qs || qs.length === 0) return;
    qs.forEach(t => {
        names.push(t.name);
        done.push(prog[t.name] ? 1 : 0);
        remaining.push(prog[t.name] ? 0 : 1);
    });
    
    chartInstances['topic'] = new Chart(ctx, {
        type: 'bar',
        data: { 
            labels: names.slice(0, 10), 
            datasets: [
                { label: 'Done', data: done.slice(0, 10), backgroundColor: '#34d399', borderRadius: 4 },
                { label: 'Remaining', data: remaining.slice(0, 10), backgroundColor: '#262648', borderRadius: 4 }
            ] 
        },
        options: { 
            responsive: true, 
            plugins: { legend: { display: true, position: 'bottom' } },
            scales: { x: { stacked: true, grid: { display: false } }, y: { stacked: true, max: 1 } }
        }
    });
}

// Topic-level weak areas
function renderWeakTopics(qs, prog) {
    const el = document.getElementById('weakTopics');
    if (!el) return;
    
    const weakTopics = [];
    qs.forEach(t => {
        if (prog[t.name] && !prog[t.name].correct) {
            weakTopics.push({ name: t.name, priority: t.priority });
        }
    });
    
    if (weakTopics.length === 0) {
        el.innerHTML = '<p style="font-size:12px;color:var(--t3)">Looking good! No weak topics found.</p>';
        return;
    }
    el.innerHTML = weakTopics.slice(0, 6).map(t => `<div class="weak-item"><span>${t.name}</span></div>`).join('');
}

// ===== MOBILE DRAWERS =====
function toggleDrawer() {
    const sb = document.getElementById('channelSidebar');
    const ov = document.getElementById('drawerOverlay');
    sb.classList.toggle('open');
    ov.classList.toggle('vis', sb.classList.contains('open'));
}

function toggleAnalytics() {
    const as = document.getElementById('analyticsSidebar');
    const ov = document.getElementById('drawerOverlay');
    as.classList.toggle('open');
    ov.classList.toggle('vis', as.classList.contains('open'));
    if (as.classList.contains('open')) renderAnalytics();
}

function closeAllDrawers() {
    document.getElementById('channelSidebar').classList.remove('open');
    document.getElementById('analyticsSidebar').classList.remove('open');
    document.getElementById('drawerOverlay').classList.remove('vis');
}

// ===== HELPERS =====
function shuffle(arr) { for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[arr[i], arr[j]] = [arr[j], arr[i]]; } return arr; }

function launchConfetti() {
    const colors = ['#7c5cf0', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#f87171', '#22d3ee'];
    for (let i = 0; i < 40; i++) {
        const el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.background = colors[Math.floor(Math.random() * colors.length)];
        el.style.animationDelay = Math.random() * 2 + 's';
        el.style.animationDuration = (2 + Math.random() * 2) + 's';
        el.style.width = (6 + Math.random() * 8) + 'px';
        el.style.height = (6 + Math.random() * 8) + 'px';
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 5000);
    }
}

// ===== EXPLANATIONS =====
const EXP = {
"Most common cause of MI?":["Coronary atherosclerosis causes >90% of MIs via plaque rupture & thrombosis. Spasm (Prinzmetal angina) is rare.","ACS & MI Pathophysiology"],
"Virchow's triad is associated with?":["Stasis, endothelial injury, and hypercoagulability → thrombosis. Charcot's triad is for cholangitis.","Thrombosis & Virchow's Triad"],
"Austin Flint murmur is heard in?":["Low-pitched mid-diastolic rumble at apex due to severe AR jet hitting anterior mitral leaflet.","Valvular Heart Disease"],
"Pulsus paradoxus is seen in?":["Exaggerated drop in SBP >10 mmHg during inspiration. Classic in cardiac tamponade & severe asthma.","Pericardial Diseases"],
"Cannon 'a' waves in JVP are seen in?":["Atrium contracts against closed tricuspid valve in complete heart block.","JVP Waveform Analysis"],
"Most common valvular lesion in rheumatic heart disease?":["Mitral stenosis is the hallmark. Mitral valve most commonly affected.","Rheumatic Heart Disease"],
"Tall T waves on ECG suggest?":["Hyperkalemia causes tall peaked T waves → widened QRS → sine wave → arrest.","ECG — Electrolyte Changes"],
"Drug of choice for acute SVT?":["Adenosine (6mg rapid IV push) blocks AV node conduction.","SVT Management"],
"Kussmaul's sign is positive in?":["Paradoxical rise in JVP during inspiration in constrictive pericarditis.","Constrictive vs Tamponade"],
"Opening snap is heard in?":["Opening snap pathognomonic of mitral stenosis. Closer OS to S2 = more severe.","Mitral Stenosis"],
"Drug of choice for Status Epilepticus?":["IV Lorazepam is first-line. Phenytoin is second-line.","Status Epilepticus Protocol"],
"Most common type of stroke?":["Ischemic strokes ~85%. Hemorrhagic ~15%.","Stroke Classification"],
"Argyll Robertson pupil is seen in?":["Accommodates but doesn't react to light. Pathognomonic of neurosyphilis.","Pupillary Abnormalities"],
"Charcot triad of MS includes all EXCEPT?":["Nystagmus + intention tremor + scanning speech. Rigidity is Parkinsonism.","Multiple Sclerosis"],
"Brown-Séquard syndrome causes ipsilateral?":["Hemisection → ipsilateral motor + DCML loss + contralateral pain/temp loss.","Spinal Cord Lesions"],
"Most common brain tumor in adults?":["Metastases most common intracranial. GBM most common primary.","CNS Tumors"],
"Babinski sign indicates?":["Upgoing plantar = UMN lesion. Normal in infants <1 year.","UMN vs LMN Lesions"],
"Lhermitte's sign is seen in?":["Electric shock on neck flexion. Classic in MS.","Demyelinating Diseases"],
"CSF in tubercular meningitis shows?":["High protein, low glucose, lymphocytic pleocytosis with cobweb.","CSF Analysis"],
"Pill-rolling tremor is characteristic of?":["Resting tremor 4-6 Hz, hallmark of Parkinson's.","Movement Disorders"],
"Most common cause of nephrotic syndrome in adults?":["Membranous nephropathy in adults. MCD in children.","Nephrotic Syndrome"],
"Trousseau's sign is elicited in?":["Carpal spasm on inflating BP cuff = hypocalcemia.","Hypocalcemia"],
"Most common cause of nephrotic syndrome in children?":["Minimal change disease — responds to steroids.","Nephrotic Syndrome in Children"],
"IgA nephropathy typically presents as?":["Gross hematuria 1-2 days after URTI (synpharyngitic).","Glomerulonephritis"],
"Kimmelstiel-Wilson nodules are seen in?":["Nodular glomerulosclerosis pathognomonic of diabetic nephropathy.","Diabetic Nephropathy"],
"Most common cause of acute renal failure?":["Pre-renal azotemia 55-60% of AKI. FENa <1%.","Acute Kidney Injury"],
"Muddy brown casts are seen in?":["Pathognomonic of ATN. RBC casts = GN. WBC casts = pyelonephritis.","Urinary Casts"],
"Renal tubular acidosis Type 1 shows?":["Distal RTA = hypokalemia + urine pH >5.5.","Renal Tubular Acidosis"],
"Wire loop lesion is seen in?":["Class IV lupus nephritis — most severe form.","Lupus Nephritis"],
"Fanconi syndrome affects?":["Generalized proximal tubule dysfunction.","Proximal Tubular Disorders"],
"Charcot's triad is seen in?":["Fever + jaundice + RUQ pain = cholangitis.","Cholangitis"],
"Spider naevi are seen in?":["Liver cirrhosis. >5 = significant liver disease.","Chronic Liver Disease"],
"Most common cause of portal hypertension in India?":["NCPF in India. Alcoholic cirrhosis worldwide.","Portal Hypertension"],
"Courvoisier sign is positive when?":["Palpable non-tender GB + painless jaundice = periampullary CA.","Obstructive Jaundice"],
"Grey Turner's sign is associated with?":["Flank ecchymosis in acute pancreatitis.","Acute Pancreatitis"],
"Barrett's esophagus increases risk of?":["Intestinal metaplasia → adenocarcinoma risk.","GERD & Barrett's"],
"Celiac disease is associated with which HLA?":["HLA-DQ2 (95%) and DQ8 (5%).","Celiac Disease"],
"Crohn's disease most commonly affects?":["Terminal ileum. Skip lesions, transmural.","IBD"],
"Hepatorenal syndrome is characterized by?":["Functional renal failure in liver disease.","Hepatorenal Syndrome"],
"Anti-mitochondrial antibodies are seen in?":["AMA >95% specific for PBC.","Autoimmune Liver Diseases"],
"Most common type of lung cancer?":["Adenocarcinoma now most common.","Lung Cancer"],
"Most common cause of community-acquired pneumonia?":["Streptococcus pneumoniae #1 worldwide.","CAP"],
"Pancoast tumor involves?":["Superior sulcus causing Horner syndrome.","Pancoast Tumor"],
"Honeycomb lung is seen in?":["End-stage IPF with UIP pattern.","ILD"],
"Most common cause of exudative pleural effusion?":["TB in India. Parapneumonic worldwide.","Pleural Effusion"],
"Hamman's sign is associated with?":["Crunching sound in pneumomediastinum.","Pneumomediastinum"],
"PFT in obstructive disease shows?":["FEV1/FVC decreased (<0.7).","PFTs"],
"Ghon focus in tuberculosis is located in?":["Subpleural mid/lower zone. Reactivation = apex.","TB"],
"Type 2 respiratory failure is defined by?":["PaO2 <60 + PaCO2 >50 mmHg.","Respiratory Failure"],
"Curschmann spirals are seen in?":["Spiral mucus casts in bronchial asthma.","Asthma Pathology"],
"Most common cause of Cushing's syndrome?":["Iatrogenic most common overall. Pituitary = endogenous.","Cushing's"],
"HbA1c reflects blood glucose control over?":["2-3 months (RBC lifespan 120 days).","Diabetes Monitoring"],
"Most common cause of hyperthyroidism?":["Graves' disease — TSI antibodies.","Hyperthyroidism"],
"Chvostek's sign is seen in?":["Tapping facial nerve causes twitch in hypocalcemia.","Calcium Disorders"],
"Conn's syndrome is caused by?":["Aldosterone-producing adenoma → HTN + hypokalemia.","Adrenal Tumors"],
"Most common cause of Addison's disease?":["Autoimmune in developed. TB worldwide.","Adrenal Insufficiency"],
"MEN 1 syndrome includes all EXCEPT?":["Pituitary + Parathyroid + Pancreatic. Medullary thyroid = MEN 2.","MEN Syndromes"],
"Dawn phenomenon is caused by?":["Early morning GH & cortisol surge.","Dawn vs Somogyi"],
"DKA is characterized by all EXCEPT?":["Hyperglycemia + ketoacidosis + ketonuria. Caused by insulin deficiency.","Diabetic Emergencies"],
"Thyroid storm is treated with all EXCEPT?":["Propranolol + PTU + Lugol's. Levothyroxine worsens storm.","Thyroid Storm"],
"Rheumatoid factor is an antibody against?":["IgM against Fc portion of IgG.","RA"],
"Heberden's nodes are seen at?":["DIP joints (OA). Bouchard's = PIP.","OA vs RA"],
"Anti-CCP antibody is specific for?":["Specificity ~95% for RA.","RA Serology"],
"Bamboo spine is seen in?":["Ankylosing spondylitis. HLA-B27.","AS"],
"Most specific antibody for SLE?":["Anti-Smith most specific. Anti-dsDNA correlates with activity.","SLE"],
"Negatively birefringent crystals are seen in?":["MSU crystals in gout. CPPD = pseudogout.","Crystal Arthropathies"],
"HLA-B27 is associated with?":["Seronegative spondyloarthropathies.","HLA Associations"],
"Schober's test is used to assess?":["Lumbar spine flexion in AS.","Spinal Exam"],
"Drug of choice for acute gout?":["NSAIDs first-line. Allopurinol for prophylaxis only.","Acute Gout"],
"Jaccoud's arthropathy is seen in?":["Reducible, non-erosive deformity in SLE.","SLE MSK"],
"Target cells are seen in all EXCEPT?":["NOT G6PD (causes bite cells).","Peripheral Smear"],
"Reed-Sternberg cells are pathognomonic of?":["Hodgkin's lymphoma. CD15+ CD30+.","Hodgkin's"],
"Auer rods are seen in?":["Pathognomonic of AML, especially M3.","AML"],
"Philadelphia chromosome is seen in?":["t(9;22) BCR-ABL in CML.","CML"],
"Most common inherited bleeding disorder?":["Von Willebrand disease.","Bleeding Disorders"],
"Howell-Jolly bodies are seen after?":["Splenectomy/hyposplenism.","Splenic Function"],
"Bence Jones proteins are found in?":["Multiple myeloma.","Myeloma"],
"Ringed sideroblasts are seen in?":["Sideroblastic anemia. Treat with pyridoxine.","Sideroblastic Anemia"],
"Tear drop cells (dacrocytes) are seen in?":["Myelofibrosis. Dry tap on BM aspiration.","Myelofibrosis"],
"Most common leukemia in children?":["ALL. Peak 2-5 years.","Childhood Leukemia"],
"Widal test is used for?":["Salmonella typhi O & H antigens.","Typhoid"],
"Paul-Bunnell test is positive in?":["Infectious mononucleosis (EBV).","Mono"],
"Most common cause of meningitis in neonates?":["E. coli (K1) and GBS.","Neonatal Meningitis"],
"Koplik spots are pathognomonic of?":["White spots on buccal mucosa in measles.","Measles"],
"Rose spots are seen in?":["Salmon-colored macules in typhoid.","Typhoid"],
"Negri bodies are seen in?":["Hippocampal neurons in rabies.","Rabies"],
"Drug of choice for MRSA?":["Vancomycin for serious MRSA.","MRSA"],
"Most common opportunistic infection in AIDS?":["PCP at CD4 <200.","HIV OIs"],
"Erythema chronicum migrans is seen in?":["Bulls-eye rash in Lyme disease.","Lyme Disease"],
"Jarisch-Herxheimer reaction is seen in treatment of?":["Spirochetal infections (syphilis).","Syphilis"],
"Duration of normal human pregnancy from LMP?":["40 weeks (280 days). Naegele's rule.","Gestational Age"],
"Hegar's sign is a sign of?":["Softening of lower uterine segment at 6-8 weeks.","Early Pregnancy"],
"Quickening in primigravida is felt at?":["18-20 weeks. Multigravida 16-18 weeks.","Fetal Milestones"],
"Chadwick's sign refers to?":["Bluish vagina due to increased vascularity.","Early Pregnancy"],
"Fundal height at umbilicus corresponds to gestational age of?":["24 weeks (not 20!).","Fundal Height"],
"Physiological anemia of pregnancy is due to?":["Plasma volume increases more than RBC mass.","Pregnancy Physiology"],
"Supine hypotension syndrome in pregnancy is due to compression of?":["IVC compression by gravid uterus.","Pregnancy Hemodynamics"],
"Linea nigra is caused by increased?":["MSH increase in pregnancy.","Skin Changes"],
"Braxton Hicks contractions are?":["Painless, irregular, non-progressive.","True vs False Labor"],
"Lightening in primigravida occurs at?":["36 weeks — head descends into pelvis.","Approaching Labor"],
"Most common cause of postpartum hemorrhage?":["Uterine atony (75-80%).","PPH"],
"Bishop's score is used to assess?":["Cervical favorability. Score ≥8 = favorable.","Labor Induction"],
"Bandl's ring is seen in?":["Obstructed labor. Immediate C-section needed.","Obstructed Labor"],
"Most common ectopic pregnancy site?":["Ampulla of tube (70-80%).","Ectopic Pregnancy"],
"Sheehan's syndrome is due to?":["Postpartum pituitary necrosis.","Sheehan's"],
"PCOD is associated with all EXCEPT?":["INCREASED LH:FSH ratio, not decreased.","PCOS"],
"Drug of choice for eclampsia?":["MgSO4. Antidote = calcium gluconate.","Eclampsia"],
"Most common ovarian tumor in pregnancy?":["Dermoid cyst (mature cystic teratoma).","Ovarian Tumors"],
"Partogram helps monitor?":["Progress of labor — WHO tool.","Labor Monitoring"],
"Montevideo units measure?":["Uterine contraction intensity.","Contractions"],
"Most common presentation at term?":["Vertex (96%).","Fetal Presentation"],
"Krukenberg tumor originates from?":["Stomach (metastasis to ovary).","Ovarian Metastases"],
"Most common type of hernia?":["Indirect inguinal hernia.","Hernias"],
"McBurney's point tenderness suggests?":["Appendicitis.","Appendicitis"],
"Charcot's joint is seen in?":["Diabetes mellitus (most common today).","Neuropathic Joints"],
"Sister Mary Joseph nodule is found at?":["Umbilical metastatic nodule.","Metastatic Nodules"],
"Most common site of gastric ulcer?":["Lesser curvature.","PUD"],
"Virchow's node is located at?":["Left supraclavicular — abdominal malignancy.","Lymph Node Metastasis"],
"Most common cause of surgical jaundice?":["Gallstones (choledocholithiasis).","Surgical Jaundice"],
"Battle's sign indicates?":["Middle cranial fossa fracture.","Skull Base Fractures"],
"Coulvoisier's law — palpable GB with jaundice suggests?":["Periampullary/pancreatic head CA.","Courvoisier's Law"],
"Most common thyroid malignancy?":["Papillary CA (80%). Orphan Annie nuclei.","Thyroid"],
"Rovsing's sign is positive in?":["Appendicitis.","Appendicitis Signs"],
"Zadek's operation is done for?":["Recurrent ingrown toenail.","Ingrown Toenail"],
"Most common congenital heart disease?":["VSD most common overall.","CHD"],
"Koplik's spots are seen in?":["Measles. Pathognomonic.","Measles"],
"Most common childhood malignancy?":["ALL.","Childhood Cancers"],
"Moro reflex disappears by?":["4 months.","Primitive Reflexes"],
"Social smile appears at?":["2 months.","Developmental Milestones"],
"Kernicterus is caused by deposition of?":["Unconjugated bilirubin in basal ganglia.","Neonatal Jaundice"],
"ORS composition—sodium concentration (mmol/L)?":["Na 75 mmol/L (low-osmolarity).","ORS"],
"Retinoblastoma gene is located on chromosome?":["13q14 (RB1). Two-hit hypothesis.","Retinoblastoma"],
"Pincer grasp develops at?":["9 months.","Fine Motor"],
"Vitamin K prophylaxis at birth prevents?":["Hemorrhagic disease of newborn.","Neonatal Vitamin K"],
"Handedness is established by what age?":["3 years. Early = suspect hemiparesis.","Motor Development"],
"Most common organism causing neonatal sepsis?":["GBS (early-onset).","Neonatal Sepsis"],
"Most common cause of epistaxis in children?":["Nose picking at Little's area.","Epistaxis"],
"Quinsy is?":["Peritonsillar abscess.","PTA"],
"Rinne test is negative in?":["Conductive hearing loss (BC > AC).","Tuning Fork Tests"],
"Bezold's abscess is a complication of?":["CSOM (cholesteatoma).","CSOM Complications"],
"Trotter's triad is seen in?":["Nasopharyngeal CA.","NPC"],
"Most common benign tumor of larynx?":["Squamous papilloma (HPV 6,11).","Laryngeal Tumors"],
"Caldwell-Luc operation is done for?":["Chronic maxillary sinusitis.","Maxillary Sinusitis"],
"Gradenigo syndrome involves cranial nerve?":["CN V + VI. Petrous apicitis.","Gradenigo Syndrome"],
"Most common foreign body site in airway?":["Right main bronchus.","Airway FB"],
"Le Fort I fracture line passes through?":["Horizontal above teeth.","Le Fort Fractures"],
"A 28-year-old woman with progressive hearing loss hears better in noisy environments. What is this phenomenon?":["Paracusis Willisii — pathognomonic of otosclerosis.","Otosclerosis"],
"Which audiometric finding is characteristically seen in otosclerosis?":["Carhart's notch at 2000 Hz.","Otosclerosis Audiometry"],
"A pink blush seen through intact tympanic membrane in active otosclerosis is called?":["Schwartze sign — active otospongiosis.","Active Otosclerosis"],
"Tympanometry in otosclerosis shows?":["Type As (shallow/stiff).","Impedance Audiometry"],
"Most feared complication of stapedotomy?":["SNHL — irreversible.","Stapedotomy"],
"Most common cause of preventable blindness worldwide?":["Trachoma (Chlamydia A-C).","Preventable Blindness"],
"Marcus Gunn pupil indicates?":["RAPD — optic nerve/retinal disease.","RAPD"],
"Cherry red spot on macula is seen in?":["CRAO. Also Tay-Sachs.","CRAO"],
"Bitot's spots are due to deficiency of?":["Vitamin A.","Vitamin A Deficiency"],
"Most common intraocular malignancy in adults?":["Uveal melanoma.","IO Tumors"],
"Fleischer ring is seen in?":["Keratoconus. KF ring = Wilson's.","Corneal Rings"],
"Seidel test is used to detect?":["Aqueous humor leak.","Ocular Trauma"],
"Accommodation triad includes all EXCEPT?":["Mydriasis is opposite.","Accommodation"],
"Most common type of squint in children?":["Esotropia (convergent).","Pediatric Squint"],
"Glaucoma is diagnosed by measuring?":["IOP (tonometry).","Glaucoma"],
"Nikolsky's sign is positive in?":["Pemphigus vulgaris (intraepidermal).","Pemphigus vs Pemphigoid"],
"Auspitz sign is seen in?":["Psoriasis — pinpoint bleeding.","Psoriasis"],
"Herald patch is characteristic of?":["Pityriasis rosea.","Pityriasis Rosea"],
"Wickham's striae are seen in?":["Lichen planus.","Lichen Planus"],
"Most common skin malignancy?":["BCC — locally invasive.","Skin Malignancies"],
"Koebner phenomenon is seen in all EXCEPT?":["NOT pemphigoid.","Koebner"],
"Dermatitis herpetiformis is associated with?":["Celiac disease. IgA deposits.","DH"],
"Target (iris) lesions are seen in?":["Erythema multiforme.","EM"],
"Tzanck smear shows acantholytic cells in?":["Pemphigus.","Pemphigus"],
"'Leonine facies' is characteristic of?":["Lepromatous leprosy.","Leprosy"],
"Most common carpal bone fracture?":["Scaphoid. AVN risk.","Scaphoid Fractures"],
"Colles' fracture has?":["Dorsal displacement = dinner fork.","Distal Radius"],
"Pott's fracture involves?":["Ankle fracture-dislocation.","Ankle Fractures"],
"Most common bone tumor?":["Metastases overall. Osteosarcoma = primary.","Bone Tumors"],
"Garden classification is for fractures of?":["Femoral neck.","Femoral Neck"],
"Erb's palsy involves nerve roots?":["C5-C6 (upper trunk). Waiter's tip.","Brachial Plexus"],
"Trendelenburg test is positive when which muscle is weak?":["Gluteus medius.","Hip Exam"],
"Boutonniere deformity is?":["PIP flexion + DIP hyperextension.","Hand Deformities"],
"Most common site of osteosarcoma?":["Lower end of femur.","Osteosarcoma"],
"Thomas test detects?":["Fixed flexion deformity of hip.","Hip Exam"],
"Bankart lesion is seen in?":["Anterior shoulder dislocation.","Shoulder"],
"Dinner fork deformity is seen in?":["Colles' fracture.","Colles' Fracture"]
};

// Apply explanations
(function(){
    function applyExp(questions) { questions.forEach(q => { const exp = EXP[q.q]; if(exp) { q.e = exp[0]; q.r = exp[1]; } }); }
    Object.values(MED_SUBCATEGORIES).forEach(s => applyExp(s.questions));
    Object.values(OBG_SUBCATEGORIES).forEach(s => applyExp(s.questions));
    Object.values(QUESTIONS).forEach(qs => applyExp(qs));
})();

// ===== DYNAMIC TOOLS =====
const dynamicTools = {
    'as_interactive': {
        name: 'Aortic Stenosis Hemodynamic',
        desc: 'Interactive AS Calculator',
        icon: '❤️',
        path: 'notes/Medicine/NOTES&images/Aortic stenosis/interactive aortic stenosis.html'
    },
    'sokolow': {
        name: 'Sokolow-Lyon Criteria',
        desc: 'LVH ECG Calculator',
        icon: '📊',
        path: 'notes/Medicine/NOTES&images/Aortic stenosis/Interactive Sokolow-Lyon Criteria Visualizer.html'
    }
};

// Get tools for current topic
function getDynamicToolsForTopic() {
    const topic = currentTopicInfo.topic;
    if (!topic) return [];
    
    // Map topics to their tool keys
    const toolMap = {
        'Aortic stenosis': ['as_interactive', 'sokolow'],
        'aortic stenosis': ['as_interactive', 'sokolow']
    };
    
    const toolKeys = toolMap[topic] || [];
    return toolKeys.map(key => dynamicTools[key]).filter(Boolean);
}

function openDynamicPanel() {
    const panel = document.getElementById('dynamicPanel');
    const overlay = document.getElementById('dynamicOverlay');
    const titleEl = document.getElementById('dynamicTitle');
    const bodyEl = document.getElementById('dynamicBody');
    
    panel.classList.add('open');
    overlay.classList.add('vis');
    
    titleEl.textContent = '🫀 Interactive Tools';
    
    let toolsHTML = '<div style="padding:15px;">';
    Object.keys(dynamicTools).forEach(key => {
        const tool = dynamicTools[key];
        toolsHTML += `
            <div class="tool-card" onclick="selectDynamicTool('${key}')">
                <div style="font-size:32px;margin-bottom:10px;">${tool.icon}</div>
                <div style="font-weight:600;font-size:16px;margin-bottom:5px;">${tool.name}</div>
                <div style="font-size:12px;color:var(--t2);">${tool.desc}</div>
            </div>
        `;
    });
    toolsHTML += '</div>';
    bodyEl.innerHTML = toolsHTML;
}

function selectDynamicTool(toolKey) {
    const tool = dynamicTools[toolKey];
    const bodyEl = document.getElementById('dynamicBody');
    const titleEl = document.getElementById('dynamicTitle');
    
    titleEl.textContent = tool.icon + ' ' + tool.name;
    bodyEl.innerHTML = `<iframe src="${tool.path}" style="width:100%;height:100%;border:none;background:#fff;"></iframe>`;
}

function closeDynamicPanel() {
    const panel = document.getElementById('dynamicPanel');
    const overlay = document.getElementById('dynamicOverlay');
    panel.classList.remove('open');
    panel.classList.remove('immersive');
    overlay.classList.remove('vis');
}

// ===== IMMERSIVE MODE =====
let isImmersive = false;

function toggleImmersiveMode() {
    const topicView = document.querySelector('.topic-view');
    if (!topicView) return;
    
    const channelSidebar = document.getElementById('channelSidebar');
    const analyticsSidebar = document.getElementById('analyticsSidebar');
    const btn = document.getElementById('immersiveBtn');
    
    if (!isImmersive) {
        // ===== ENTER IMMERSIVE MODE =====
        isImmersive = true;
        topicView.classList.add('immersive-mode');
        
        if (btn) btn.innerHTML = '⛶ Exit';
        
        // Hide sidebars
        if (channelSidebar) { channelSidebar.classList.add('collapsed'); channelSidebar.style.display = 'none'; }
        if (analyticsSidebar) { analyticsSidebar.classList.add('collapsed'); analyticsSidebar.style.display = 'none'; }
        
        // Get and reconfigure notes iframe (LEFT side - 60%)
        const notesIframe = topicView.querySelector('iframe');
        if (notesIframe) {
            notesIframe.removeAttribute('style');
            notesIframe.style.cssText = 'position:absolute;left:0;top:60px;width:60%;height:calc(100vh - 60px);border:none;z-index:1;margin:0;';
        }
        
        // Get the dynamic tools for current topic
        const tools = getDynamicToolsForTopic();
        
        // Create dynamic tools container on right side - split evenly
        let rightContainer = topicView.querySelector('.immersive-right');
        if (!rightContainer) {
            rightContainer = document.createElement('div');
            rightContainer.className = 'immersive-right';
            rightContainer.style.cssText = 'position:absolute;right:0;top:60px;width:40%;height:calc(100vh - 60px);background:#fff;z-index:1;margin:0;display:flex;flex-direction:column;';
            topicView.appendChild(rightContainer);
        }
        
        if (tools.length > 0) {
            const toolCount = tools.length;
            const heightPct = 100 / toolCount;
            rightContainer.innerHTML = tools.map(tool => 
                `<div style="height:${heightPct}%;overflow:hidden;border-bottom:1px solid #eee;"><iframe src="${tool.path}" style="width:100%;height:100%;border:none;"></iframe></div>`
            ).join('');
        } else {
            rightContainer.innerHTML = `<div style="padding:20px;text-align:center;color:#888;">No tools available for this topic</div>`;
        }
        
    } else {
        // ===== EXIT IMMERSIVE MODE =====
        isImmersive = false;
        topicView.classList.remove('immersive-mode');
        
        if (btn) btn.innerHTML = '⛶ Immersive';
        
        // Show sidebars
        if (channelSidebar) { channelSidebar.classList.remove('collapsed'); channelSidebar.style.display = ''; }
        if (analyticsSidebar) { analyticsSidebar.classList.remove('collapsed'); analyticsSidebar.style.display = ''; }
        
        // Reset notes iframe to original state
        const notesIframe = topicView.querySelector('iframe');
        if (notesIframe) {
            notesIframe.removeAttribute('style');
            notesIframe.style.cssText = 'width:100%;height:calc(100vh - 140px);border:none;margin-top:10px;border-radius:8px;overflow:hidden;';
        }
        
        // Remove right container
        const rightContainer = topicView.querySelector('.immersive-right');
        if (rightContainer) rightContainer.remove();
    }
}

// ===== ANALYTICS TRACKING =====
function trackEvent(eventType, data = {}) {
    if (!TRACKING_URL) return;
    const profile = JSON.parse(localStorage.getItem('nbd_profile') || '{}');
    const payload = { event: eventType, name: profile.name || 'Unknown', email: profile.email || '', timestamp: new Date().toISOString(), userAgent: navigator.userAgent, screenWidth: screen.width, ...data };
    try { navigator.sendBeacon(TRACKING_URL, JSON.stringify(payload)); } catch (e) { fetch(TRACKING_URL, { method: 'POST', body: JSON.stringify(payload), mode: 'no-cors' }).catch(() => {}); }
}
window.addEventListener('beforeunload', () => { const seconds = Math.round((Date.now() - _sessionStart) / 1000); trackEvent('time_spent', { seconds, minutes: Math.round(seconds / 60 * 10) / 10 }); });
