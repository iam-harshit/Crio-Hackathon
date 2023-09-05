package com.crio.chapter.Services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class VideoToAudioService {

    public void main(String[] args) {
        String inputVideoPath = "src\\main\\resources\\Videos\\testingvideo.mp4"; // Replace with your input video file path
        String outputAudioPath = "src\\main\\resources\\Audios\\testingAudio.mp3"; // Replace with your desired output audio file path

        // FFmpeg command for video to audio conversion
        String[] cmd = {
            "ffmpeg",
            "-i", inputVideoPath, // Input video file path
            "-vn", // Disable video processing
            "-acodec", "libmp3lame", // Audio codec for output file
            "-y", // Overwrite output file if it exists
            outputAudioPath // Output audio file path
        };

        ProcessBuilder processBuilder = new ProcessBuilder(cmd);

        try {
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Video to audio conversion completed successfully.");
            } else {
                System.err.println("Video to audio conversion failed with exit code " + exitCode);
            }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}

