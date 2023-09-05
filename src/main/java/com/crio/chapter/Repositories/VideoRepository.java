package com.crio.chapter.Repositories;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.crio.chapter.Models.Video;

@Repository
public class VideoRepository {

    Map<String,Video> videoMap;
    Long autoIncrementor=1L;

    public VideoRepository() {
        videoMap = new HashMap<>();
    }

    public List<Video> findAll(){
        return videoMap.values().stream().toList();
    }

    public Video findById(String id){
        return videoMap.get(id);
    }
    
    public boolean addSong(Video entity){
        Video video = new Video(String.valueOf(autoIncrementor),entity);
        return videoMap.put(String.valueOf(autoIncrementor++), video) != null;
    }
}
