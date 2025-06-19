package com.HIMS.controller;

import com.HIMS.model.Image;
import com.HIMS.service.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private ImageService imageService;

    @PostMapping("/upload-multiple/{claimId}")
    public ResponseEntity<String> uploadMultipleImages(
            @PathVariable Long claimId,
            @RequestParam("files") List<MultipartFile> files) throws IOException {

        List<String> uploadedFiles = imageService.uploadMultipleImages(claimId, files);
        return ResponseEntity.ok("Uploaded: " + String.join(", ", uploadedFiles));
    }

    @GetMapping("/claim/{claimId}")
    public ResponseEntity<List<Image>> getImagesByClaim(@PathVariable Long claimId) {
        return ResponseEntity.ok(imageService.getImagesByClaimId(claimId));
    }
}
