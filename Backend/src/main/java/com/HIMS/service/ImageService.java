package com.HIMS.service;

import com.HIMS.model.Claim;
import com.HIMS.model.Image;
import com.HIMS.repository.ClaimRepository;
import com.HIMS.repository.ImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ImageService {

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ClaimRepository claimRepository;

    private final String uploadDir = "uploads/";

    public List<String> uploadMultipleImages(Long claimId, List<MultipartFile> files) throws IOException {
        Claim claim = claimRepository.findById(claimId)
                .orElseThrow(() -> new RuntimeException("Claim not found with ID: " + claimId));

        Files.createDirectories(Paths.get(uploadDir));

        List<String> fileNames = new ArrayList<>();

        for (MultipartFile file : files) {
            String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
            String fileName = UUID.randomUUID() + "_" + originalFilename;
            String filePath = uploadDir + fileName;

            Files.copy(file.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);

            Image image = new Image();
            image.setFileName(originalFilename);
            image.setFileType(file.getContentType());
            image.setFilePath(filePath);
            image.setClaim(claim);

            imageRepository.save(image);
            fileNames.add(originalFilename);
        }

        return fileNames;
    }

    public List<Image> getImagesByClaimId(Long claimId) {
        if (!claimRepository.existsById(claimId)) {
            throw new RuntimeException("Claim not found with ID: " + claimId);
        }
        return imageRepository.findByClaim_ClaimId(claimId);
    }

}
