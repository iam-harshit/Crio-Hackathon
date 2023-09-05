package com.crio.chapter.Models;

import java.util.List;
import java.util.Map;

import com.crio.chapter.DTO.ResponseRelatedFiles.Chapter;

import lombok.Data;

@Data
public class Video {
    
    private String id;
    private String videoUrl;
    private String audio_url;
    private List<Chapter> chapters;
    private Map<String,String> subtitles;



    public Video(String id, String videoUrl,Map<String, String> subtitles) {
        this.id = id;
        this.videoUrl = videoUrl;
        this.subtitles=subtitles;
    }
    public Video(String id, Video entity) {
        this(entity.videoUrl, entity.audio_url, entity.chapters, entity.subtitles);
        this.id = id;
    }
    public Video(String videoUrl, String audio_url, List<Chapter> chapters, Map<String, String> subtitles) {
        this.videoUrl = videoUrl;
        this.audio_url = audio_url;
        this.chapters = chapters;
        this.subtitles = subtitles;
    }
    
    
}
