### Run 


1. Start server `serverless offline`
2. Open http://localhost:3000/, file will be create and upload to local S3


### S3 trigger lambda when file is uploaded.
1. Create a new local profile `aws configure --profile s3local` with content 

  ```
  aws_access_key_id = S3RVER
  aws_secret_access_key = S3RVER
  ```

2. Trigger lambda

  ```
  aws --endpoint http://localhost:8080 s3 cp data\email-message.txt s3://local-bucket/email-message.csv --profile s3local
  upload: data\email-message.txt to s3://local-bucket/email-message.csv
  ```
