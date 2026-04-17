# Auto-Integration Guide for New Topics

## Overview
When you add a new HTML notes file and MCQ data, the system should automatically:
- Show sections in the "📋 Sections" checklist
- Display MCQs in the MCQ panel
- Track progress in analytics

Follow this guide to ensure automatic integration works.

---

## 1. HTML Notes File Structure

### Location
Place HTML files in: `notes/Medicine/`

### Required Classes (for automatic section detection)
Your HTML notes should use these classes for sections to be auto-detected:

```html
<!-- Major Section (h2) -->
<h2 class="section-title"><span>01.</span> Pathophysiology</h2>

<!-- Sub-Section (h3) -->
<h3 class="sub-heading">Etiology</h3>

<!-- Card Title (div) -->
<div class="card-title"><span class="icon">🦠</span> Etiology — What Causes MS?</div>
```

### Class Reference
| Element | Class | Detected As |
|---------|-------|--------------|
| h2 | `.section-title` | Major section |
| h3 | `.sub-heading` | Sub-section |
| div | `.card-title` | Sub-section |

### Important
- The **topic name** in your data file must match the HTML filename
- Example: `mitral_stenosis_masterclass.html` → Topic: "Mitral stenosis"

---

## 2. MCQ Data Integration

### Location
Add MCQs to: `data/medicine_data.js`

### Structure
```javascript
{ name: "Topic Name", priority: "red", notesUrl: "notes/Medicine/topic_filename.html", questions: [
    { 
        q: "Question text here?", 
        o: ["Option A", "Option B", "Option C", "Option D"], 
        a: 1,          // Correct answer index (0-3)
        t: "r",         // Type: "r" = recall, "c" = case
        e: "Explanation text - why this answer is correct"  // Optional
    },
    // ... more questions
]},
```

### Important Fields
- `name`: Must match exactly with topic name used in app
- `notesUrl`: Path to the HTML notes file
- `questions[]`: Array of MCQ objects
- `q`: Question text
- `o`: Array of 4 options
- `a`: Correct answer index (0, 1, 2, or 3)
- `t`: Type - "r" for recall, "c" for case-based
- `e`: **Explanation** - highly recommended for better UX

### Adding New Topics
```javascript
// In medicine_data.js, find the system and add:
"System Name": {
    chapters: {
        "Chapter Name": {
            topics: [
                { 
                    name: "New Topic Name", 
                    priority: "red", 
                    notesUrl: "notes/Medicine/new_topic.html", 
                    questions: [
                        { q: "...", o: [...], a: 0, t: "r", e: "..." }
                    ]
                }
            ]
        }
    }
}
```

---

## 3. Data File Reference

### medicine_data.js Structure
```javascript
const MEDICINE_DATA = {
    "Cardiovascular System": {
        chapters: {
            "Valvular Heart Diseases": {
                topics: [
                    { name: "Mitral stenosis", priority: "red", notesUrl: "...", questions: [...] },
                    { name: "Mitral regurgitation", priority: "red", notesUrl: "...", questions: [...] }
                ]
            }
        }
    }
};
```

### Priority Values
- `"red"` = Frequently Asked
- `"purple"` = Normally Asked  
- Default = Other

---

## 4. Automatic Features

### What Works Automatically ✅
1. **Section Checklist** - Extracts from HTML classes automatically
2. **MCQ Loading** - Questions load based on topic name
3. **Progress Tracking** - localStorage handles all progress
4. **Analytics** - Shows correct/incorrect/unattempted for topic

### What Needs Manual Update ⚠️
1. Nothing! The system is designed to auto-detect.

---

## 5. Quick Checklist

Before testing a new topic:

- [ ] HTML file in `notes/Medicine/` with proper classes
- [ ] Topic added to `data/medicine_data.js` with questions
- [ ] `notesUrl` path matches HTML file location
- [ ] Topic name in data matches exactly (case-sensitive)

---

## 6. Testing New Topics

1. Open the app
2. Navigate to the new topic
3. Click "📋 Sections" → Should show sections from HTML
4. Click "🎯 MCQs" → Should show MCQs from data
5. Answer MCQs → Progress saves automatically
6. Check sections → Progress saves automatically
7. Check analytics → Should show topic-specific stats

---

## 7. Troubleshooting

### Sections not showing?
- Check HTML has `.section-title`, `.sub-heading`, or `.card-title` classes
- Iframe may have cross-origin restrictions (run via local server)

### MCQs not loading?
- Verify topic name matches exactly in data file
- Check `notesUrl` path is correct
- Ensure questions array is not empty

### Progress not saving?
- localStorage must be enabled
- First-party cookies required for file:// protocol

---

*Last Updated: April 2026*