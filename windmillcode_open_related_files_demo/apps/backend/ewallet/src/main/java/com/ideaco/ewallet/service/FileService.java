package com.ideaco.ewallet.service;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class FileService {
    private final Path root = Paths.get("/Documents/Dia/");

    public String saveFile(MultipartFile file) {
        try {
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }

            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));

            return file.getOriginalFilename();
        } catch (Exception e) {
            e.printStackTrace();
            return "";
        }
    }
}
