# Audio Samples Upload Instructions

## Overview
The Media Gallery has been updated with real band samples and album tracks from John Flanders' various projects. You need to download these audio files from the old website and place them in the `/public/audio/` folder.

## Audio Files Needed

Based on [johnflanders.com/recordings.html](http://www.johnflanders.com/recordings.html) and [johnflanders.com/Bandsamples.html](http://www.johnflanders.com/Bandsamples.html), you need the following audio samples:

### Album Tracks (from recordings page):

1. **LatinBlues.mp3**
   - Download from: http://www.johnflanders.com/audio/LatinBlues.mp3
   - Save as: `LatinBlues.mp3`
   - Description: From "The Go Between"

2. **TheGoBetween.mp3**
   - Download from: http://www.johnflanders.com/audio/TheGoBetween.mp3
   - Save as: `TheGoBetween.mp3`
   - Description: Title track from latest album

3. **Architeuthis.mp3**
   - Download from: http://www.johnflanders.com/audio/Architeuthis.mp3
   - Save as: `Architeuthis.mp3`
   - Description: From "In The Sky Tonight"

### Band Samples (from Bandsamples page):

4. **Double Helix Sample**
   - Download from: Find the audio link/icon on Bandsamples.html
   - Save as: `06HunkeredDown.mp3`
   - Description: High energy original jazz funk, swing, latin

5. **John Flanders Trio - Corcovado**
   - Download from: Find the audio link/icon on Bandsamples.html
   - Save as: `trio-corcovado.mp3`
   - Description: Bossa nova classic

6. **John Flanders Quartet**
   - Download from: Find the audio link/icon on Bandsamples.html
   - Save as: `quartet-sample.mp3`
   - Description: Jazz with drums

7. **Jazz with Male Vocals**
   - Download from: Find the audio link/icon on Bandsamples.html
   - Save as: `jazz-vocals-sample.mp3`
   - Description: Standards from Sinatra to Elvis

8. **Latin Jazz Factory**
   - Download from: Find the audio link/icon on Bandsamples.html
   - Save as: `latin-jazz-factory.mp3`
   - Description: Latin jazz with horns

9. **Sin City Soul**
   - Download from: Find the audio link/icon on Bandsamples.html
   - Save as: `sin-city-soul.mp3`
   - Description: Blues, funk, New Orleans grooves

10. **Raydius**
    - Download from: Find the audio link/icon on Bandsamples.html
    - Save as: `raydius.mp3`
    - Description: Semi-acoustic with female vocals

11. **ATF Band**
    - Download from: Find the audio link/icon on Bandsamples.html
    - Save as: `atf-band.mp3`
    - Description: Lounge jazz rock

## How to Upload

### Method 1: Direct Download (Recommended)
1. Visit the old website pages linked above
2. Right-click on each audio file link or click the play icons to find the audio URLs
3. Download each MP3 file with the exact filename specified above
4. Place all files directly in: `/public/audio/`
5. Files will be immediately available on the Media Gallery page

### Method 2: Copy from Old Website Server
If you have access to the old website's server:
1. Navigate to the `/audio/` folder on the old site
2. Download all MP3 files
3. Place them in `/public/audio/` with the filenames specified above

## Technical Details

**File format:** MP3  
**Location:** `/public/audio/` (files go directly in this folder, not in a subfolder)  
**Playback:** Audio plays directly in the browser using HTML5 audio element  
**No upload needed:** Just place files in the public/audio folder and refresh the page

## Testing

After placing the audio files:
1. Start the dev server: `npm run dev`
2. Navigate to the Media Gallery section
3. Click the play button on any audio track
4. Audio should play immediately in the browser
5. The play button becomes a pause button while playing

## Current Status

✅ Media Gallery component updated with real track listings  
✅ Audio player functionality implemented  
⏳ Need to download 11 audio files from old website  
⏳ Need to place files in `/public/audio/`  

Once all audio files are in place, the Media Gallery will be fully functional with real audio playback!

