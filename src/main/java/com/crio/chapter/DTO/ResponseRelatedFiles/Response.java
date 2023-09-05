package com.crio.chapter.DTO.ResponseRelatedFiles;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown=true)
public class Response {
    private String id;
    private String language_model;
    private String acoustic_model;
    private String language_code;
    private String status;
    private String audio_url;
    private String text;
    private ArrayList<Word> words;
    // private Object utterances;
    private double confidence;
    private int audio_duration;
    private boolean punctuate;
    private boolean format_text;
    // private Object dual_channel;
    // private Object webhook_url;
    // private Object webhook_status_code;
    private boolean webhook_auth;
    // private Object webhook_auth_header_name;
    private boolean speed_boost;
    // private Object auto_highlights_result;
    private boolean auto_highlights;
    // private Object audio_start_from;
    // private Object audio_end_at;
    // private ArrayList<Object> word_boost;
    // private Object boost_param;
    private boolean filter_profanity;
    private boolean redact_pii;
    private boolean redact_pii_audio;
    // private Object redact_pii_audio_quality;
    // private Object redact_pii_policies;
    // private Object redact_pii_sub;
    private boolean speaker_labels;
    private boolean content_safety;
    private boolean iab_categories;
    // private ContentSafetyLabels content_safety_labels;
    // private IabCategoriesResult iab_categories_result;
    private boolean language_detection;
    private Object custom_spelling;
    private Object throttled;
    private boolean auto_chapters;
    private boolean summarization;
    private Object summary_type;
    private Object summary_model;
    private boolean custom_topics;
    private ArrayList<Object> topics;
    // private Object speech_threshold;
    private boolean disfluencies;
    private boolean sentiment_analysis;
    private ArrayList<Chapter> chapters;
    // private Object sentiment_analysis_results;
    // private boolean entity_detection;
    // private Object entities;
    // private String summary;
    // private String speakers_expected;

}
