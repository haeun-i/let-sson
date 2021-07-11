package com.letsson.letsson.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Optional;

public interface AmazonS3ClientService {

    String upload(MultipartFile multipartFile, String dirName,Long userid) throws IOException;



    void deleteFile(final String keyName);
    //void delete(String filename);



}
