# Extract Audio from a Video and attach it with another Video
## Without Loosing Qulity

I have two copy of same video with same length. but with 2 different audio language, japanese and english. the japanese video have better qulity than english video. I want to extract the audio from english video and attach it to the japanese video while keeping the video and audio qulity same as original

---

To accomplish this task, you'll need to use video editing software that can handle separate audio and video tracks. Here's a step-by-step process to achieve what you want:

1. Extract the English audio from the English video.
2. Take the higher quality Japanese video.
3. Remove the Japanese audio from the Japanese video.
4. Attach the extracted English audio to the Japanese video.
5. Export the final video, ensuring you maintain the original video and audio quality.

Here's a more detailed breakdown using FFmpeg, a powerful command-line tool for video and audio processing:

1. Extract English audio:
```
ffmpeg -i english_video.mp4 -vn -acodec copy english_audio.aac
```

2. Remove audio from Japanese video:
```
ffmpeg -i japanese_video.mp4 -c copy -an japanese_video_noaudio.mp4
```

3. Combine Japanese video with English audio:
```
ffmpeg -i japanese_video_noaudio.mp4 -i english_audio.aac -c copy -map 0:v:0 -map 1:a:0 final_video.mp4
```

These commands assume your videos are in MP4 format and the audio is AAC. Adjust the file extensions if you're using different formats.

Would you like me to explain any part of this process in more detail?

---

is it possible with .mkv

---

Yes, it's absolutely possible to work with .mkv files. MKV (Matroska) is a versatile container format that can hold multiple audio and video streams. Here's how you can adapt the process for .mkv files:

1. Extract English audio from the English MKV:
```
ffmpeg -i english_video.mkv -vn -acodec copy english_audio.mka
```
This extracts the audio into an MKA file (Matroska Audio).

2. For the Japanese video, we don't need to remove the audio. Instead, we'll directly replace it in the next step.

3. Combine Japanese video with English audio:
```
ffmpeg -i japanese_video.mkv -i english_audio.mka -map 0:v -map 1:a -c copy final_video.mkv
```
This command takes the video from the Japanese MKV and the audio from the English MKA, combining them into a new MKV file.

The `-c copy` flag ensures that both audio and video are stream copied without re-encoding, preserving their original quality.

If you want to keep only one audio track in the final file, this command will work. However, if you want to keep both audio tracks (Japanese and English) in the final MKV, allowing the viewer to switch between them, you can use this command instead:

```
ffmpeg -i japanese_video.mkv -i english_audio.mka -map 0:v -map 0:a -map 1:a -c copy final_video_dual_audio.mkv
```

This command will include both the original Japanese audio and the new English audio in the output file.

Would you like me to explain any part of this process further?

---

PS C:\Users\johni\Downloads\english> ffmpeg -i The.Boy.and.the.Heron.2023.eng.mkv -vn -acodec copy english_audio.mka
ffmpeg : The term 'ffmpeg' is not recognized as the name of a cmdlet, function, script
file, or operable program. Check the spelling of the name, or if a path was included,
verify that the path is correct and try again.
At line:1 char:1
+ ffmpeg -i The.Boy.and.the.Heron.2023.eng.mkv -vn -acodec copy english ...
+ ~~~~~~
    + CategoryInfo          : ObjectNotFound: (ffmpeg:String) [], CommandNotFoundExceptio
   n
    + FullyQualifiedErrorId : CommandNotFoundException

---

The error message you're seeing indicates that FFmpeg is not installed on your system or is not in your system's PATH. To resolve this issue, you need to install FFmpeg and ensure it's accessible from the command line. Here's how you can do that:

1. Install FFmpeg:
   - Go to the official FFmpeg website: https://ffmpeg.org/download.html
   - For Windows, you can download a pre-built package from the "Windows Builds" section.

2. Set up FFmpeg:
   - Once downloaded, extract the contents of the zip file to a folder of your choice (e.g., C:\ffmpeg).
   - Add the FFmpeg bin folder to your system's PATH:
     a. Right-click on "This PC" or "My Computer" and select "Properties".
     b. Click on "Advanced system settings".
     c. Click on "Environment Variables".
     d. Under "System variables", find and select the "Path" variable, then click "Edit".
     e. Click "New" and add the path to the FFmpeg bin folder (e.g., C:\ffmpeg\bin).
     f. Click "OK" on all windows to save the changes.

3. Restart PowerShell:
   - Close and reopen PowerShell for the changes to take effect.

4. Verify installation:
   - In PowerShell, type `ffmpeg -version` and press Enter.
   - If FFmpeg is correctly installed and in your PATH, you should see version information.

Once FFmpeg is properly installed and accessible from the command line, you should be able to run the command without encountering the "command not found" error.

If you prefer not to modify your system PATH, you can also navigate to the folder containing the FFmpeg executable in PowerShell and run the command from there, or use the full path to the FFmpeg executable in your command.

Would you like me to explain any part of this process in more detail?

---

how to download ffmpeg from cli

---

You can download FFmpeg directly from the command line using PowerShell. Here's a step-by-step guide:

1. Open PowerShell as an administrator.

2. Create a directory for FFmpeg (if it doesn't exist):
```powershell
New-Item -ItemType Directory -Force -Path "C:\ffmpeg"
```

3. Navigate to the new directory:
```powershell
Set-Location -Path "C:\ffmpeg"
```

4. Download the FFmpeg build using Invoke-WebRequest. We'll use the latest build from BtbN, which is regularly updated:
```powershell
Invoke-WebRequest -Uri "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip" -OutFile "ffmpeg.zip"
```

5. Extract the downloaded zip file:
```powershell
Expand-Archive -Path "ffmpeg.zip" -DestinationPath "."
```

6. Move the contents of the extracted folder to the main directory:
```powershell
Move-Item -Path "ffmpeg-master-latest-win64-gpl\bin\*" -Destination "."
```

7. Clean up unnecessary files:
```powershell
Remove-Item -Recurse -Force "ffmpeg-master-latest-win64-gpl", "ffmpeg.zip"
```

8. Add FFmpeg to your system PATH:
```powershell
$oldPath = [Environment]::GetEnvironmentVariable('Path', [EnvironmentVariableTarget]::Machine)
$newPath = $oldPath + ';C:\ffmpeg'
[Environment]::SetEnvironmentVariable('Path', $newPath, [EnvironmentVariableTarget]::Machine)
```

9. Refresh the PowerShell session's environment variables:
```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

10. Verify the installation:
```powershell
ffmpeg -version
```

If everything worked correctly, you should see the FFmpeg version information. You may need to restart PowerShell or your computer for the PATH changes to take effect fully.

Remember, these commands assume you want to install FFmpeg to C:\ffmpeg. Adjust the paths if you prefer a different location.

Would you like me to explain any part of this process further?


---

Great job! You've successfully installed FFmpeg on your system. The output you've shared shows that FFmpeg is now properly installed and accessible from the command line. Here's a breakdown of what you've accomplished:

1. You created the FFmpeg directory.
2. You downloaded the FFmpeg zip file.
3. You extracted the contents of the zip file.
4. You moved the necessary files to the correct location.
5. You cleaned up unnecessary files.
6. You added FFmpeg to your system PATH.
7. You refreshed your PowerShell session's environment variables.
8. You verified the installation by running `ffmpeg -version`.

The version information shows that you have installed FFmpeg version N-116556-gcda5f5c5ed-20240809, which is a very recent build.

Now that FFmpeg is installed and working, you can proceed with your original task of extracting audio from one MKV file and adding it to another. You can use the commands I provided earlier:

1. To extract English audio:
```
ffmpeg -i "The.Boy.and.the.Heron.2023.eng.mkv" -vn -acodec copy english_audio.mka
```

2. To combine the Japanese video with the English audio:
```
ffmpeg -i japanese_video.mkv -i english_audio.mka -map 0:v -map 1:a -c copy final_video.mkv
```

Remember to replace "japanese_video.mkv" with the actual filename of your Japanese video.

Is there anything else you'd like help with regarding FFmpeg or the audio extraction and combination process?

---

I realise that the english video was dubed and has 2 audio japanese and english, after doing ffmpeg -i "The.Boy.and.the.Heron.2023.eng.mkv" -vn -acodec copy english_audio.mka i only got the japanese of it.

---

I see. Thank you for providing that information. It's common for some video files to contain multiple audio tracks. In this case, we need to specifically select the English audio track. Let's modify our approach:

1. First, let's check the audio streams in your file:

```
ffmpeg -i "The.Boy.and.the.Heron.2023.eng.mkv" -hide_banner
```

This command will show you information about the file, including all audio streams. Look for lines that start with "Stream #0:x(y)" where x is a number, and y is the language code. You should see entries for both Japanese and English audio.

2. Once you've identified the stream number for the English audio (let's say it's stream 1), use this command to extract it:

```
ffmpeg -i "The.Boy.and.the.Heron.2023.eng.mkv" -map 0:a:1 -c copy english_audio.mka
```

Replace `0:a:1` with `0:a:0` if English is the first audio stream, or adjust the number accordingly.

3. Now, to combine this with your Japanese video:

```
ffmpeg -i japanese_video.mkv -i english_audio.mka -map 0:v -map 1:a -c copy final_video.mkv
```

If you want to keep both audio tracks in the final file:

```
ffmpeg -i japanese_video.mkv -i english_audio.mka -map 0:v -map 0:a -map 1:a -c copy final_video_dual_audio.mkv
```

This will include both the original Japanese audio and the English audio in the output file.

Would you like me to explain any part of this process further?

---

PS C:\Users\johni\Downloads\english> ffmpeg -i "The.Boy.and.the.Heron.2023.eng.mkv" -hide_banner
Input #0, matroska,webm, from 'The.Boy.and.the.Heron.2023.eng.mkv':
  Metadata:
    encoder         : libebml v1.4.5 + libmatroska v1.7.1
  Duration: 02:03:56.93, start: 0.000000, bitrate: 25979 kb/s
  Chapters:
    Chapter #0:0: start 0.000000, end 616.157000
      Metadata:
        title           : Chapter 01
    Chapter #0:1: start 616.157000, end 1243.702000
      Metadata:
        title           : Chapter 02
    Chapter #0:2: start 1243.702000, end 2132.549000
      Metadata:
        title           : Chapter 03
    Chapter #0:3: start 2132.549000, end 3010.301000
      Metadata:
        title           : Chapter 04
    Chapter #0:4: start 3010.301000, end 3758.341000
      Metadata:
        title           : Chapter 05
    Chapter #0:5: start 3758.341000, end 4377.460000
      Metadata:
        title           : Chapter 06
    Chapter #0:6: start 4377.460000, end 5081.956000
      Metadata:
        title           : Chapter 07
    Chapter #0:7: start 5081.956000, end 5993.785000
      Metadata:
        title           : Chapter 08
    Chapter #0:8: start 5993.785000, end 6682.766000
      Metadata:
        title           : Chapter 09
    Chapter #0:9: start 6682.766000, end 7159.159000
      Metadata:
        title           : Chapter 10
    Chapter #0:10: start 7159.159000, end 7436.930000
      Metadata:
        title           : Chapter 11
  Stream #0:0(eng): Video: hevc (Main 10), yuv420p10le(tv, bt2020nc/bt2020/smpte2084), 3832x2068 [SAR 1:1 DAR 958:517], 23.98 fps, 23.98 tbr, 1k tbn (default) (original)
      Metadata:
        BPS             : 24440394
        DURATION        : 02:03:56.930000000
        NUMBER_OF_FRAMES: 178308
        NUMBER_OF_BYTES : 22720188270
        _STATISTICS_WRITING_APP: mkvmerge v83.0 ('Circle Of Friends') 64-bit
        _STATISTICS_TAGS: BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES
      Side data:
        DOVI configuration record: version: 1.0, profile: 8, level: 6, rpu flag: 1, el flag: 0, bl flag: 1, compatibility id: 1, compression: 0
  Stream #0:1(jpn): Audio: eac3 (Dolby Digital Plus + Dolby Atmos), 48000 Hz, 5.1(side), fltp, 768 kb/s (default) (original)
      Metadata:
        BPS             : 768000
        DURATION        : 02:03:56.896000000
        NUMBER_OF_FRAMES: 232403
        NUMBER_OF_BYTES : 713942016
        _STATISTICS_WRITING_APP: mkvmerge v83.0 ('Circle Of Friends') 64-bit
        _STATISTICS_TAGS: BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES
  Stream #0:2(eng): Audio: eac3 (Dolby Digital Plus + Dolby Atmos), 48000 Hz, 5.1(side), fltp, 768 kb/s (dub)
      Metadata:
        BPS             : 768000
        DURATION        : 02:03:56.896000000
        NUMBER_OF_FRAMES: 232403
        NUMBER_OF_BYTES : 713942016
        _STATISTICS_WRITING_APP: mkvmerge v83.0 ('Circle Of Friends') 64-bit
        _STATISTICS_TAGS: BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES
  Stream #0:3(eng): Subtitle: subrip (srt) (dub) (forced)
      Metadata:
        title           : Forced
        BPS             : 1
        DURATION        : 02:00:55.964000000
        NUMBER_OF_FRAMES: 38
        NUMBER_OF_BYTES : 1578
        _STATISTICS_WRITING_APP: mkvmerge v83.0 ('Circle Of Friends') 64-bit
        _STATISTICS_TAGS: BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES
  Stream #0:4(eng): Subtitle: subrip (srt) (dub)
      Metadata:
        BPS             : 24
        DURATION        : 02:03:00.881000000
        NUMBER_OF_FRAMES: 833
        NUMBER_OF_BYTES : 22555
        _STATISTICS_WRITING_APP: mkvmerge v83.0 ('Circle Of Friends') 64-bit
        _STATISTICS_TAGS: BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES
  Stream #0:5(eng): Subtitle: subrip (srt) (original) (hearing impaired)
      Metadata:
        title           : SDH
        BPS             : 41
        DURATION        : 01:59:13.480000000
        NUMBER_OF_FRAMES: 1449
        NUMBER_OF_BYTES : 36771
        _STATISTICS_WRITING_APP: mkvmerge v83.0 ('Circle Of Friends') 64-bit
        _STATISTICS_TAGS: BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES
  Stream #0:6(spa): Subtitle: subrip (srt) (dub)
      Metadata:
        title           : Latin American
        BPS             : 28
        DURATION        : 02:03:11.684000000
        NUMBER_OF_FRAMES: 867
        NUMBER_OF_BYTES : 25920
        _STATISTICS_WRITING_APP: mkvmerge v83.0 ('Circle Of Friends') 64-bit
        _STATISTICS_TAGS: BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES
  Stream #0:7(fre): Subtitle: subrip (srt) (dub)
      Metadata:
        BPS             : 28
        DURATION        : 02:03:11.600000000
        NUMBER_OF_FRAMES: 980
        NUMBER_OF_BYTES : 26589
        _STATISTICS_WRITING_APP: mkvmerge v83.0 ('Circle Of Friends') 64-bit
        _STATISTICS_TAGS: BPS DURATION NUMBER_OF_FRAMES NUMBER_OF_BYTES

---

Thank you for providing the detailed output. This information is very helpful. Based on the output, we can see that:

1. The Japanese audio is Stream #0:1(jpn)
2. The English audio is Stream #0:2(eng)

To extract the English audio, you should use the following command:

```
ffmpeg -i "The.Boy.and.the.Heron.2023.eng.mkv" -map 0:2 -c copy english_audio.mka
```

This command specifically selects the English audio stream (0:2) and copies it without re-encoding.

For combining this with your Japanese video, you can use:

```
ffmpeg -i japanese_video.mkv -i english_audio.mka -map 0:v -map 1:a -c copy final_video.mkv
```

If you want to keep both audio tracks in the final file:

```
ffmpeg -i japanese_video.mkv -i english_audio.mka -map 0:v -map 0:a -map 1:a -c copy final_video_dual_audio.mkv
```

This will include both the original Japanese audio and the English audio in the output file.

Additionally, I noticed that your input file has several subtitle streams. If you want to include any of these in your final video, you can add them to the mapping. For example, to include the English subtitles:

```
ffmpeg -i japanese_video.mkv -i english_audio.mka -map 0:v -map 1:a -map 0:3 -map 0:4 -c copy final_video_with_subs.mkv
```

This command includes both the forced (0:3) and regular (0:4) English subtitles.

Would you like me to explain any part of this process further?