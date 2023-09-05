package com.crio.chapter.Controller;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.crio.chapter.DTO.AddRequest;
import com.crio.chapter.Models.Video;
import com.crio.chapter.Repositories.VideoRepository;
import com.crio.chapter.Services.FileImportService;
import com.crio.chapter.Services.RepoService;
import com.crio.chapter.Services.TranscriptionService;

@RestController
@RequestMapping("/v1/")
public class VideoController {

    @Autowired
    TranscriptionService transcriptionService;

    @Autowired
    RepoService repoService;

    @Autowired
    FileImportService fileImportService;

    @Autowired
    VideoRepository videoRepository;

    @GetMapping("findVideo/{videoId}")
    public ResponseEntity<Video> getVideo(@RequestParam String videoId) {
        Video video = videoRepository.findById(videoId);
        return ResponseEntity.ok().body(video);

    }

    @GetMapping("allVideo")
    public ResponseEntity<List<Video>> getAllVedio() {

        return ResponseEntity.ok().body(videoRepository.findAll());
    }

    @PostMapping("/addSong")
    public String addSong(@RequestBody AddRequest request){
        String outputChapter = "src\\main\\resources\\Chapters\\chapter"+System.currentTimeMillis()+".json";

        String outputSubs = "src\\main\\resources\\Videos\\subtitle"+System.currentTimeMillis()+".srt";
        try {
            fileImportService.importFileFromLink(request.getSrtURL(), outputSubs);
            if(request.getChapterURL()!= null)
            fileImportService.importFileFromLink(request.getChapterURL() ,outputChapter);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        try {
            if(request.getChapterURL() != null)
            repoService.addVideo(request.getVideoURL(), new File(outputSubs), new File(outputChapter));
            else
            repoService.addVideo(request.getVideoURL(), new File(outputSubs),new File("src\\main\\java\\com\\crio\\chapter\\tmp\\n" + //
                    "ull.json"));
            return "Success";
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "fail";
    }
}
