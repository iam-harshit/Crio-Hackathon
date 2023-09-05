package com.crio.chapter.Services;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.crio.chapter.DTO.ResponseRelatedFiles.Chapter;
import com.crio.chapter.Models.Video;
import com.crio.chapter.Repositories.VideoRepository;
import com.fasterxml.jackson.core.exc.StreamReadException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DatabindException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class RepoService {

    @Autowired
    VideoRepository videoRepository;
    @Autowired
    ObjectMapper objectMapper;

    public boolean addVideo(String videoUrl, File srtFile, File chapters) throws StreamReadException, DatabindException, IOException{

        List<Chapter> chapterList = objectMapper.readValue(chapters, new TypeReference<List<Chapter>>(){});
       
        Video video = new Video(videoUrl, null, chapterList, getSubtitles(srtFile));
        return videoRepository.addSong(video);
        
    }



    public Map<String,String> getSubtitles(File esrt){

        Map<String,String> map =new  HashMap<String,String>();
        try (FileInputStream inputStream = new FileInputStream(new File("src\\main\\resources\\Videos\\video.srt"))) {
            BufferedReader br= new BufferedReader(new InputStreamReader(inputStream));
            String t = br.readLine();
            int flag = 1;
            String key = "";
            String value = "";
            
            while(t != null){
                if (flag == 0 ){
                    t = br.readLine();
                    flag = 1;
                    continue;
                }
                else if(flag == 1){
                    t = br.readLine();
                    flag = 2;
                    continue;
                }
                else if(flag == 2){
                    key = t;
                    flag = 3;
                }else{
                    value = t;
                    flag = 0;
                    map.put(key,value);
                }
                t = br.readLine();
            }
            return map;
        } catch (IOException e) {
            
            e.printStackTrace();
        }
        return null;
    }
    
}
