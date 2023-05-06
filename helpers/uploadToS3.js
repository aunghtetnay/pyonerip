import { createReadStream } from 'fs'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { S3_REGION, S3_BUCKET_NAME, S3_ACCESS_KEY, S3_SECRET_KEY } from '../config.js'

const s3Client = new S3Client({
    region: S3_REGION, credentials: {
        accessKeyId: S3_ACCESS_KEY,
        secretAccessKey: S3_SECRET_KEY,
    }
})

export async function upload(path, Key) {
    const rs = createReadStream(path)
    const uploadParams = {
        Bucket: S3_BUCKET_NAME,
        Key,
        Body: rs,
    }
    const result = await s3Client.send(new PutObjectCommand(uploadParams))
    console.log(result)
    return result
}