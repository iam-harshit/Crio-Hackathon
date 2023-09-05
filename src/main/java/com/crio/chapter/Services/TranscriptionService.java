package com.crio.chapter.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.crio.chapter.DTO.ChapterRequest;
import com.crio.chapter.DTO.ResponseRelatedFiles.Response;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TranscriptionService {

    @Value("assemblyai.transcriptEndpoint")
    private String transcriptEndpoint;

    @Value("assemblyai.pollingEndpoint")
    private String pollingEndpoint;

    @Value("assemblyai.apikey")
    private String API_TOKEN;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    RestTemplate restTemplate;

    public Response getResponse(ChapterRequest chapterRequest) throws Exception {
        
            // String YOUR_API_TOKEN = "51bb80c48ac54237a19611572b2b4a35";
            // String FILE_URL = "https://github.com/AssemblyAI-Examples/audio-examples/raw/main/20230607_me_canadian_wildfires.mp3";
            // String transcriptEndpoint = "https://api.assemblyai.com/v2/transcript";


            // Set up request headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", API_TOKEN);

            // Create the request body
            // String requestBody = "{\"audio_url\": \"" + FILE_URL + "\", \"auto_chapters\": true, \"summary_model\" : \"catchy\", \"punctuate\": true}";

            String requestBody = objectMapper.writeValueAsString(chapterRequest);

            // Create the HTTP entity with headers and body
            HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);

            // Send the POST request to submit the file for transcription
            ResponseEntity<String> response = restTemplate.exchange(transcriptEndpoint, HttpMethod.POST, entity, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                String jsonResponse = response.getBody();
                System.out.println(jsonResponse);

                // Polling for transcription completion
                String transcriptId = jsonResponse.split(":")[1].split(",")[0].trim().replaceAll("\"","");

                System.out.println(transcriptId);
                // String pollingEndpoint = "https://api.assemblyai.com/v2/transcript/" + transcriptId;
                pollingEndpoint += transcriptId;

                while (true) {
                    UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(pollingEndpoint);

                    // Send the GET request to check the transcription status
                    ResponseEntity<String> pollingResponse = restTemplate.exchange(builder.build().encode().toUri(), HttpMethod.GET, entity, String.class);

                    if (pollingResponse.getStatusCode() == HttpStatus.OK) {
                        String pollingJsonResponse = pollingResponse.getBody();

                        // Check if transcription is completed
                        if (pollingJsonResponse.contains("\"status\": \"completed\"")||pollingJsonResponse.contains("\"status\":\"completed\"")) {
                            System.out.println(pollingJsonResponse);
                            Response response2 = objectMapper.readValue(pollingJsonResponse, Response.class);
                            return response2;
                            
                        } else if (pollingJsonResponse.contains("\"status\": \"error\"")||pollingJsonResponse.contains("\"status\":\"error\"")) {
                            throw new Exception("Transcription failed: " + pollingJsonResponse);
                        } else {
                            Thread.sleep(3000); // Sleep for 3 seconds before polling again
                        }
                    } else {
                        throw new Exception("Polling request failed with response code: " + pollingResponse.getStatusCode());
   
                    }
                }
            } else {
                throw new Exception("Transcription request failed with response code: " + response.getStatusCode());
            }
        
    }
}
