# Noob Doctor - Data Structure Guide

## Current File Organization

### Data Files (data/)
Each subject has its own file:
- `medicine_data.js` - Medicine topics
- `surgery_data.js` - Surgery topics  
- `obg_data.js` - OBG topics
- `paeds_data.js` - Pediatrics
- `ortho_data.js` - Orthopedics
- `ent_data.js` - ENT
- `ophthalmology_data.js` - Ophthalmology
- `dermatology_data.js` - Dermatology

### Topic Structure
```javascript
{ 
  name: "Topic Name", 
  priority: "red",           // red = frequently asked, purple = normally asked
  notesUrl: "path/to/notes.html",  // optional
  sections: ["Section 1", "Section 2"],  // optional - study checklist
  questions: [                    // optional - MCQs
    { 
      q: "Question text",
      o: ["Option A", "Option B", "Option C", "Option D"],
      a: 0,    // correct answer index (0-3)
      t: "r",   // r = recall, c = clinical
      e: "Explanation"
    }
  ]
}
```

## When to Split

Current limits: ~2000 lines per file

### Split Trigger Points
- `medicine_data.js` > 2000 lines → Split by system
- `surgery_data.js` > 2000 lines → Split by system

### New Split Structure (when triggered)
```
data/medicine/
├── medicine_cardio.js     (Cardiovascular)
├── medicine_respi.js    (Respiratory)
├── medicine_gi.js     (GI)
├── medicine_neuro.js   (Neurology)
├── medicine_nephro.js (Nephrology)
├── medicine_endo.js   (Endocrinology)
├── medicine_hemo.js   (Hematology)
├── medicine_rheumo.js (Rheumatology)
```

### Split Template
```javascript
// ========== MEDICINE - [SYSTEM] MODULE ==========
const MEDICINE_[SYSTEM] = {
    "[Chapter Name]": {
        topics: [
            { name: "Topic", priority: "red" }
        ]
    }
};
module.exports = MEDICINE_[SYSTEM];
```

## Image Guidelines

- Store images in: `notes/Medicine/NOTES&images/[Topic Name]/`
- Upload to Cloudinary (not GitHub)
- Use upload utility: `node utils/upload_images.js`

## App.js Guidelines

- Keep below ~3000 lines
- If grows too large, split into modules:
  - `app_render.js` (rendering functions)
  - `app_data.js` (data handling)
  - `app_storage.js` (localStorage)
  - `app_charts.js` (analytics)

## Notes HTML Notes

- Keep each topic file under ~5000 lines
- Use scroll spy for navigation (see aortic_stenosis_guide.html)
- Add images via Cloudinary URLs
- Test locally before push