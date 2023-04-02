import { PP_API_URL } from '../config.js'

export async function Search({ keywords }) {
    const encodedKeywords = encodeURIComponent(keywords)
    const res = await fetch(`${PP_API_URL}/search?keywords=${encodedKeywords}`)
    return await res.json()
}

/**
{
    "success": true,
    "message": "Successfully!",
    "status": 200,
    "data": {
        "actors": [],
        "shows": [
            {
                "id": "01gt5smh5fc03rh4kez73r47d8",
                "name_en": "Black Pearl",
                "name_mm": "မဟူရာပုလဲ",
                "description_en": "မိဘမေတ္တာကို အပြည့်အ၀ မခံစားခဲ့ရသော သားသမီးများသည် အသက်ရွယ်ကြီးလာတဲ့အခါ ဖြတ်သန်းရာဘဝတစ်လျှောက်၌ မည်ကဲ့သို့ စိတ်ဒဏ်ရာများ ကြုံတွေ့ခံစားရသည်ကို ရေးဖွဲ့ပုံဖော်ထားသည့် ဇာတ်လမ်းဖြစ်ပါတယ်...",
                "description_mm": "မိဘမေတ္တာကို အပြည့်အ၀ မခံစားခဲ့ရသော သားသမီးများသည် အသက်ရွယ်ကြီးလာတဲ့အခါ ဖြတ်သန်းရာဘဝတစ်လျှောက်၌ မည်ကဲ့သို့ စိတ်ဒဏ်ရာများ ကြုံတွေ့ခံစားရသည်ကို ရေးဖွဲ့ပုံဖော်ထားသည့် ဇာတ်လမ်းဖြစ်ပါတယ်...",
                "landscape_image": "shows/1677836788RzVIIh.jpg",
                "portrait_image": "shows/1677836788pttnib.jpg",
                "header_image": "shows/1677836788EUo69F.jpg",
                "center_image": "shows/1677836788U0k9Po.png",
                "landscape_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/shows/1677836788RzVIIh.jpg",
                "portrait_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/shows/1677836788pttnib.jpg",
                "header_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/shows/1677836788EUo69F.jpg",
                "center_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/shows/1677836788U0k9Po.png",
                "casts": []
            }
        ]
    }
}
*/