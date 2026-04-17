# Noob Doctor Notes Setup Guide

## Quick Setup - Just Copy This!

Add this to the `<head>` section of your notes HTML file, right after the existing `<script>` tag (before `</head>`):

```html
<!-- ===== NOOB DOCTOR AUTO-SETUP ===== -->
<script>
  // Check theme from URL param or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const theme = urlParams.get('theme') || localStorage.getItem('nbd_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', theme);
</script>
```

Add this CSS to `<style>` section (in light mode overrides area):

```css
/* ===== LIGHT MODE OVERRIDES ===== */
html[data-theme="light"] {
  --bg: #f5f5f7;
  --surface: #ffffff;
  --surface2: #f0f0f3;
  --surface3: #e8e8ec;
  --border: #d0d0d8;
  --text: #1a1a2e;
  --text-muted: #6b6b80;
  --text-dim: #9a9ab0;
  --highlight-bg: rgba(224, 92, 92, 0.08);
  --mnemonic-bg: rgba(126, 200, 138, 0.08);
  --trap-bg: rgba(240, 160, 80, 0.08);
  --case-bg: rgba(92, 184, 224, 0.06);
}

html[data-theme="light"] .tab-nav { background: var(--surface); }
html[data-theme="light"] .tab-btn { color: var(--text-muted); }
html[data-theme="light"] .tab-btn.active { color: var(--accent); }

/* MCQ Interactive Styles */
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
li.show-correct {
  border-color: var(--accent4) !important;
  background: rgba(126,200,138,0.12) !important;
}
li.show-correct .opt-letter { color: var(--accent4) !important; }
```

Add this JavaScript before `</body>` (in script section):

```javascript
// INTERACTIVE MCQ
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
    btn.textContent = 'Hide Explanation';
  }
}

document.querySelectorAll('.mcq-options li').forEach(li => {
  li.addEventListener('click', function() {
    const card = this.closest('.mcq-card');
    chooseOption(this, card);
  });
});

// Horizontal scroll on hover
const tabNav = document.querySelector('.tab-nav');
if (tabNav) {
  tabNav.addEventListener('wheel', function(e) {
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      this.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, { passive: false });
}

// Theme sync from parent
window.addEventListener('message', (e) => {
  if (e.data && e.data.theme) {
    document.documentElement.setAttribute('data-theme', e.data.theme);
  }
});
```

---

## AI Prompt to Use

When adding a new notes HTML file to your app, use this prompt:

```
Add these features to this HTML notes file to make it compatible with "The Noob Doctor" web app:

1. Add theme detection script in <head> - reads 'theme' param from URL or localStorage
2. Add light mode CSS overrides using data-theme="light" attribute
3. Make navigation tab bar use var(--surface) color instead of hardcoded colors
4. Make MCQ section interactive - add click handlers to select answers
5. Add interactive MCQ JS - click option shows green (correct) or red (wrong)
6. Add horizontal scroll on tab nav when hovering + mouse wheel
7. Add theme sync listener to receive theme changes from parent page

Use the exact code from SETUP_GUIDE.md for consistent integration.
```

---

## Key Features Added

| Feature | What It Does |
|---------|-------------|
| Theme detection | Auto-detects dark/light from app |
| Light mode CSS | Matches app's light theme |
| Tab nav styling | Uses CSS variables, not hardcoded |
| Interactive MCQ | Click to select, shows right/wrong |
| Horizontal scroll | Scroll wheel moves tabs left/right |
| Theme sync | Updates when app theme changes |

## File Structure Expected

Your notes HTML should have:
- `.tab-nav` with `.tab-btn` buttons
- `.section` divs for each tab content
- `.mcq-options li` with `class="correct"` or `class="wrong"`

---

## Questions? Issues?

Check the main notes file: `notes/Medicine/mitral_stenosis_masterclass.html`