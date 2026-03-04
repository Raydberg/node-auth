import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
    ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { envs } from "./envs";


export class R2 {
    static S3Client = new S3Client({
        region: "auto", // Required by AWS SDK, not used by R2
        // Provide your R2 endpoint: https://<ACCOUNT_ID>.r2.cloudflarestorage.com
        endpoint: envs.CLOUDFLARE_URL,
        credentials: {
            // Provide your R2 Access Key ID and Secret Access Key
            accessKeyId: envs.CLOUDFLARE_ACCESS_KEY,
            secretAccessKey: envs.CLOUDFLARE_SECRET_KEY,
        },
    });

}


// // Upload a file
// await s3.send(
//     new PutObjectCommand({
//         Bucket: "my-bucket",
//         Key: "myfile.txt",
//         Body: "Hello, R2!",
//     }),
// );
// console.log("Uploaded myfile.txt");

// // Download a file
// const response = await s3.send(
//     new GetObjectCommand({
//         Bucket: "my-bucket",
//         Key: "myfile.txt",
//     }),
// );
// const content = await response.Body.transformToString();
// console.log("Downloaded:", content);

// // List objects
// const list = await s3.send(
//     new ListObjectsV2Command({
//         Bucket: "my-bucket",
//     }),
// );
// console.log(
//     "Objects:",
//     list.Contents.map((obj) => obj.Key),
// );