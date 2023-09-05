package com.crio.chapter.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChapterRequest {

    private String audio_url;
    private boolean auto_chapters;
    private boolean punctuate;
    private String summary_model;

    public ChapterRequest(String audio_url) {
        this.audio_url = audio_url;
        this.auto_chapters = true;
        this.punctuate = true;
        this.summary_model="catchy";
    }
}
