# Notes Organization

This folder stores your study notes in a hierarchical structure matching the app.

## Folder Structure

```
notes/
├── Ophthalmology/
│   └── Glaucoma/
│       ├── primary_angle_closure.html
│       └── acute_pacg.html
├── Medicine/
│   └── Cardiology/
│       └── heart_failure.html
└── ...
```

## How to Add Notes

1. Create folders matching the hierarchy: `Subject/System/Chapter/`
2. Name files as `topic-name.html`
3. The app will auto-detect notes in the data structure

## Supported Formats

- `.html` - Full HTML with styles
- `.md` - Markdown (converted to HTML)

## Integration

Notes are linked in `data/*_data.js` files via the `notesUrl` property:

```javascript
{
    name: "Acute Angle Closure",
    priority: "red",
    notesUrl: "notes/Ophthalmology/Glaucoma/primary_angle_closure.html"
}
```