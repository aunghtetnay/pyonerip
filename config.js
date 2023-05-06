import { config } from 'dotenv'

config()

export const PP_API_URL = 'https://app.pyoneplay.com/api/v1'

export const PORT = process.env.PORT || 4000

// S3
export const SS3_URL = process.env.SS3_URL
export const S3_REGION = process.env.S3_REGION
export const S3_ACCESS_KEY = process.env.S3_ACCESS_KEY
export const S3_SECRET_KEY = process.env.S3_SECRET_KEY
export const S3_BUCKET_NAME = process.env.S3_BUCKET_NAME
