#!/usr/bin/env node

/**
 * Image Optimization Script for About Section Images
 * 
 * This script optimizes images in the about images folder by:
 * 1. Creating WebP versions
 * 2. Creating AVIF versions (if supported)
 * 3. Optimizing JPEG files
 * 
 * Usage: node optimize-about-images.js
 * 
 * Requirements: npm install --save-dev sharp
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, 'public/images/about-images');
const IMAGE_NAMES = ['about-1', 'about-2', 'about-3'];
const TARGET_WIDTH = 400;
const TARGET_HEIGHT = 600;
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 75;

async function optimizeImage(baseName) {
    const inputPath = path.join(IMAGES_DIR, `${baseName}.jpg`);
    const outputPaths = {
        jpg: path.join(IMAGES_DIR, `${baseName}.jpg`),
        webp: path.join(IMAGES_DIR, `${baseName}.webp`),
        avif: path.join(IMAGES_DIR, `${baseName}.avif`)
    };

    // Check if input file exists
    if (!fs.existsSync(inputPath)) {
        console.warn(`⚠️  ${baseName}.jpg not found, skipping...`);
        return;
    }

    try {
        console.log(`\n📸 Optimizing ${baseName}...`);

        // Get original file size
        const originalStats = fs.statSync(inputPath);
        const originalSize = (originalStats.size / 1024).toFixed(2);

        // Optimize JPEG
        await sharp(inputPath)
            .resize(TARGET_WIDTH, TARGET_HEIGHT, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({
                quality: JPEG_QUALITY,
                progressive: true,
                mozjpeg: true
            })
            .toFile(outputPaths.jpg);

        const jpgStats = fs.statSync(outputPaths.jpg);
        const jpgSize = (jpgStats.size / 1024).toFixed(2);
        const jpgSavings = ((1 - jpgStats.size / originalStats.size) * 100).toFixed(1);

        console.log(`  ✅ JPEG: ${jpgSize}KB (${jpgSavings}% reduction)`);

        // Create WebP version
        await sharp(inputPath)
            .resize(TARGET_WIDTH, TARGET_HEIGHT, {
                fit: 'cover',
                position: 'center'
            })
            .webp({
                quality: WEBP_QUALITY
            })
            .toFile(outputPaths.webp);

        const webpStats = fs.statSync(outputPaths.webp);
        const webpSize = (webpStats.size / 1024).toFixed(2);
        const webpSavings = ((1 - webpStats.size / originalStats.size) * 100).toFixed(1);

        console.log(`  ✅ WebP: ${webpSize}KB (${webpSavings}% reduction)`);

        // Create AVIF version (if supported)
        try {
            await sharp(inputPath)
                .resize(TARGET_WIDTH, TARGET_HEIGHT, {
                    fit: 'cover',
                    position: 'center'
                })
                .avif({
                    quality: AVIF_QUALITY
                })
                .toFile(outputPaths.avif);

            const avifStats = fs.statSync(outputPaths.avif);
            const avifSize = (avifStats.size / 1024).toFixed(2);
            const avifSavings = ((1 - avifStats.size / originalStats.size) * 100).toFixed(1);

            console.log(`  ✅ AVIF: ${avifSize}KB (${avifSavings}% reduction)`);
        } catch (avifError) {
            console.warn(`  ⚠️  AVIF not supported: ${avifError.message}`);
        }

        console.log(`  📊 Original: ${originalSize}KB`);

    } catch (error) {
        console.error(`  ❌ Error optimizing ${baseName}:`, error.message);
    }
}

async function main() {
    console.log('🚀 Starting image optimization...\n');
    console.log(`📁 Directory: ${IMAGES_DIR}\n`);

    // Check if directory exists
    if (!fs.existsSync(IMAGES_DIR)) {
        console.error(`❌ Directory not found: ${IMAGES_DIR}`);
        console.log(`\n💡 Create the directory and add your images first:`);
        console.log(`   mkdir -p "${IMAGES_DIR}"`);
        console.log(`   # Then add about-1.jpg, about-2.jpg, about-3.jpg`);
        process.exit(1);
    }

    // Optimize each image
    for (const imageName of IMAGE_NAMES) {
        await optimizeImage(imageName);
    }

    console.log('\n✨ Optimization complete!\n');
    console.log('📝 Next steps:');
    console.log('   1. Verify images look good in the browser');
    console.log('   2. Test loading performance in DevTools');
    console.log('   3. Adjust quality settings if needed\n');
}

// Check if sharp is installed
try {
    require.resolve('sharp');
    main().catch(console.error);
} catch (error) {
    console.error('❌ Sharp is not installed.');
    console.log('\n📦 Install it with: npm install --save-dev sharp\n');
    process.exit(1);
}
