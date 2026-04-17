# AI Prompt for Noob Doctor Notes Setup

Copy and paste this to your AI model when adding any new notes HTML file:

---

## Prompt

```
I want to add a notes HTML file to my medical quiz web app called "The Noob Doctor".

Please make this HTML file compatible with the app by adding these features:

1. THEME DETECTION:
Add this script in <head> (after existing scripts, before </head>):


<!-- Theme Detection -->
<script>
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get('theme') || localStorage.getItem('nbd_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
</script>


2. LIGHT MODE CSS:
Add to <style> section (in light mode overrides area). Use these CSS variables:

html[data-theme="light"] {
  --bg: #f5f5f7;
  --surface: #ffffff;
  --surface2: #f0f0f3;
  --surface3: #e8e8ec;
  --border: #d0d0d8;
  --text: #1a1a2e;
  --text-muted: #6b6b80;
  --text-dim: #9a9ab0;
}

html[data-theme="light"] .tab-nav { background: var(--surface); }
html[data-theme="light"] .tab-btn { color: var(--text-muted); }
html[data-theme="light"] .tab-btn.active { color: var(--accent); }


3. INTERACTIVE MCQ STYLES:
Add CSS for clickable MCQ options:

.mcq-options li { cursor: pointer; transition: all 0.2s ease; }
.mcq-options li.correct, .mcq-options li.wrong {
  border-color: var(--border);
  background: var(--surface2);
  opacity: 1;
}
.mcq-options li.correct .opt-letter, .mcq-options li.wrong .opt-letter {
  color: var(--text-muted);
}
li.revealed.correct {
  border-color: rgba(126,200,138,0.5);
  background: rgba(126,200,138,0.12);
}
li.revealed.correct .opt-letter { color: var(--accent4); }
li.revealed.wrong {
  border-color: rgba(224,92,92,0.3);
  background: rgba(224,92,92,0.08);
  opacity: 0.8;
}
li.revealed.wrong .opt-letter { color: var(--accent); }
li.selected-correct {
  border-color: var(--accent4) !important;
  background: rgba(126,200,138,0.25) !important;
}
li.selected-correct .opt-letter { color: var(--accent4) !important; }
li.selected-wrong {
  border-color: var(--accent) !important;
  background: rgba(224,92,92,0.15) !important;
}
li.selected-wrong .opt-letter { color: var(--accent) !important; }


4. INTERACTIVE MCQ JAVASCRIPT:
Add this JavaScript before </body>:

<script>
// Interactive MCQ
function chooseOption(li, card) {
  if (card.classList.contains('answered')) return;
  card.classList.add('answered');
  const correct = li.classList.contains('correct');
  const opts = card.querySelectorAll('.mcq-options li');
  opts.forEach(opt => {
    opt.classList.add('revealed');
    if (opt.classList.contains('correct')) {
      opt.classList.add('show-correct');
    }
  });
  if (correct) {
    li.classList.add('selected-correct');
  } else {
    li.classList.add('selected-wrong');
  }
  const btn = card.querySelector('.reveal-btn');
  if (btn) {
    btn.classList.add('show');
    const explain = btn.nextElementSibling;
    if (explain) explain.classList.add('show');
  }
}

document.querySelectorAll('.mcq-options li').forEach(li => {
  li.addEventListener('click', function() {
    const card = this.closest('.mcq-card');
    chooseOption(this, card);
  });
});

// Horizontal scroll on tab nav hover
const tabNav = document.querySelector('.tab-nav');
if (tabNav) {
  tabNav.addEventListener('wheel', function(e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      this.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });
}

// Theme sync from parent page
window.addEventListener('message', (e) => {
  if (e.data && e.data.theme) {
    document.documentElement.setAttribute('data-theme', e.data.theme);
  }
});
</script>
</script>


5. IMPORTANT NOTES:
- The HTML file uses class names: .tab-nav, .tab-btn, .section, .mcq-options, .mcq-card, .mcq-options li with class="correct" or class="wrong"
- Each section has id="tab-{name}" for navigation
- Don't change existing CSS that isn't listed above
- Keep existing content and structure intact


Reference file: notes/Medicine/mitral_stenosis_masterclass.html
```

---

## That's It!

The AI will add all these features automatically. Your new notes will:
- Match the app's dark/light theme
- Have clickable MCQs
- Support horizontal scroll on tab nav
- Auto-sync when you change theme

## Reference

For full details, see: `notes/SETUP_GUIDE.md`