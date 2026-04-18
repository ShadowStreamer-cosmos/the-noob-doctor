# Adding Images to Your Notes

## Solution: Use Cloudinary (Free CDN)

### Step 1: Create Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for free account
3. Note your `cloud_name` from the dashboard

### Step 2: Upload Images

**Option A: Manual (easiest)**
1. Go to Assets → Uploads in Cloudinary dashboard
2. Drag & drop your images
3. Copy the "secure_url" for each image

**Option B: Bulk Upload (for 1000s of images)**
```bash
npm install cloudinary dotenv
# Edit upload_images.js with your credentials
node upload_images.js
```

### Step 3: Add to HTML

```html
<img src="https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1/folder/filename.jpg" 
     alt="Description" 
     loading="lazy"
     style="max-width:100%; border-radius:8px;">
```

## Image Tips
- Use `loading="lazy"` for faster page load
- Resize in CDN URL: `w_400` = 400px width
- Compress: `q_auto,f_auto` = auto quality/format
- Example: `.../w_400,q_auto,f_auto/sample.jpg`

## Free Tier Limits
- Storage: 25GB
- Bandwidth: 1GB/month  
- Enough for 3000-5000 images (compressed)

## Why Not GitHub?
- GitHub limits: 1GB total, 100MB per file
- LFS costs ~$10/month for 5GB
- CDN is free & faster

## Quick Start
1. Sign up at cloudinary.com
2. Upload a test image
3. Copy the URL → paste in your HTML