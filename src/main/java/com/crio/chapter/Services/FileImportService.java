package com.crio.chapter.Services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class FileImportService {

    private final RestTemplate restTemplate;

    public FileImportService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void importFileFromLink(String fileUrl, String savePath) throws IOException {
        ResponseEntity<byte[]> responseEntity = restTemplate.getForEntity(fileUrl, byte[].class);

        if (responseEntity.getStatusCode().is2xxSuccessful()) {
            byte[] fileData = responseEntity.getBody();
            Path filePath = Path.of(savePath);

            try (FileOutputStream outputStream = new FileOutputStream(filePath.toFile())) {
                outputStream.write(fileData);
            }

            System.out.println("File imported successfully.");
        } else {
            System.err.println("Failed to import file from URL: " + fileUrl);
        }
    }
}
