package com.crio.chapter.DTO.ResponseRelatedFiles;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Chapter {
    private String chapterId;
    public String summary;
    public String gist;
    public String headline;
    public int start;
    public int end;
}
