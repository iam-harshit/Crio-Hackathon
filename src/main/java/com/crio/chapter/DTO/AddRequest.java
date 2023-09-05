package com.crio.chapter.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class AddRequest {
    String videoURL;
    String srtURL;
    @JsonIgnore
    String chapterURL;
}
