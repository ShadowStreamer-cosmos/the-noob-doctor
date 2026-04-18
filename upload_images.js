// Cloudinary bulk uploader
// Run: node upload_images.js

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// User's credentials
cloudinary.config({
  cloud_name: 'ddoysbcss',
  api_key: '297854894264554',
  api_secret: 'ngC0u4syRQfg91IaxwUhExY6ZK8'
});

const uploadFolder = path.join(__dirname, 'notes/Medicine/NOTES&images/Aortic stenosis');
const outputFile = path.join(__dirname, 'image_urls.txt');

async function uploadAllImages() {
  if (!fs.existsSync(uploadFolder)) {
    console.log(`❌ Source folder not found`);
    console.log(`📁 Put images in: notes/Medicine/NOTES&images/[Topic]/`);
    return;
  }
  
  const files = fs.readdirSync(uploadFolder).filter(f => 
    ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(path.extname(f).toLowerCase())
  );
  
  if (files.length === 0) {
    console.log('❌ No images found in folder!');
    return;
  }
  
  console.log(`📤 Found ${files.length} image(s)\n`);
  
  let urlList = [];
  
  for (const file of files) {
    const filePath = path.join(uploadFolder, file);
    const name = path.basename(file, path.extname(file));
    
    try {
      console.log(`Uploading: ${file}...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'noob-doctor',
        public_id: name
      });
      console.log(`✅ Uploaded!`);
      urlList.push(`${name}|${result.secure_url}`);
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
    }
  }
  
  // Save URLs
  fs.writeFileSync(outputFile, urlList.join('\n'));
  console.log(`\n✅ Done! ${urlList.length} image(s) uploaded`);
  console.log(`📋 URLs saved to: ${outputFile}`);
}

uploadAllImages();