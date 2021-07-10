package com.letsson.letsson.service;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.regions.Region;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Component
public class AmazonS3ClientServiceImpl implements AmazonS3ClientService{

    private String bucket;
    private AmazonS3 amazonS3;
    private  static final Logger logger = LoggerFactory.getLogger(AmazonS3ClientServiceImpl.class);

    @Autowired
    public AmazonS3ClientServiceImpl(Region region, AWSCredentialsProvider awsCredentialsProvider, String bucket)
    {
        this.amazonS3 = AmazonS3ClientBuilder.standard()
                .withCredentials(awsCredentialsProvider)
                .withRegion(region.getName()).build();
        this.bucket = bucket;
    }

    @Override
    public void delete(String filename) {
        this.amazonS3.deleteObject(bucket,filename);
    }

    @Override
    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
        File uploadFile = convert(multipartFile)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));

        return upload(uploadFile, dirName);
    }


    private String upload(File uploadFile, String dirName) {
        SimpleDateFormat date = new SimpleDateFormat("yyyymmddHHmmss");
        String originalfileName = uploadFile.getName() + "-" + date.format(new Date());
        String fileName = dirName + "/" + originalfileName;
        String uploadImageUrl = putS3(uploadFile, fileName);
        removeNewFile(uploadFile);
        return uploadImageUrl;
    }


    private String putS3(File uploadFile, String fileName) {
        this.amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return this.amazonS3.getUrl(bucket, fileName).toString();
    }


    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            logger.info("파일이 삭제되었습니다.");
        } else {
            logger.info("파일이 삭제되지 못했습니다.");
        }
    }


    private Optional<File> convert(MultipartFile file) throws IOException {
        File convertFile = new File(file.getOriginalFilename());
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }

}
