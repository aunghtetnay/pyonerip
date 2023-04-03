import { config } from 'dotenv'

config()

export const PP_API_URL = 'https://app.pyoneplay.com/api/v1'

export const PORT = process.env.PORT || 4000
