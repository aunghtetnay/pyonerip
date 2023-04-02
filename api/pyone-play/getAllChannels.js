import { PP_API_URL } from '../config.js'

export default async function GetAllChannels() {
    const res = await fetch(`${PP_API_URL}/channels`)
    return await res.json()
}