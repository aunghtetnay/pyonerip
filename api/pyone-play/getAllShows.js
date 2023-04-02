import { PP_API_URL } from '../config.js'

export default async function getAllShows({ page = 1 }) {
    const res = await fetch(`${PP_API_URL}/shows?page=${page}`)
    return await res.json()
}

/**
{
    "success": true,
    "message": "Successfully!",
    "status": 200,
    "data": [
        {
            "id": "01gwp0ekkt00tr4pyv2vasxtnx",
            "bunny_collection_id": "d16ddab7-a482-4610-854d-40570e51131e",
            "name_en": "The Love Proposal",
            "name_mm": "ချစ်ခြင်းကတိတည်စေ",
            "description_en": "မေထီဂရု၏အမွေဆက်ခံခွင့်ရှိသူ မြေးကြီးဖြစ်သူ ထက်နှင့်ညီဖြစ်သူထမ်...ထက်ကအမွေဆက်ခံသူဆိုသော်လည်း သေတမ်းစာသတ်မှတ်ချက်အရ သေတမ်းစာဖွင့်ဖတ်ပြီးနှစ်နှစ်အတွင်း အိမ်ထောင်ပြုကလေးယူရမည်ဖြစ်သည်...သို့သော်ထက်မှာဂေးဖြစ်နေပြီးမိသားစု၏မျှော်လင့်ချက်ကိုမဖြည့်စည်းပေးနိုင်ဖြစ်နေသည်ကို ညီဖြစ်သူထမ်မှဘေးမှကူညီစောင်မပေးခဲ့သည်...ထန်မှာဂျစ်ကန်ကန်နိုင်သည့်လူငယ်တစ်ဦးဖြစ်သော်လည်းကူညီပေးတတ်သူဖြစ်သည်...တစ်နေ့ထမ်မီးပွိုင့်တွင်ကားပိတ်နေချိန်နားကြပ်တပ်ကာလမ်းကိုမကြည့်ဘဲစက်ဘီးနင်းလာသည့်ကလေးငယ်တစ်ဦးကလမ်းကူးသူများကိုတိုက်မိမည့်အဖြစ်မှဟန့်တားရင်းနွတ်နှင့်တွေ့ဆုံကာသဘောကျလာခဲ့ပြီးနှစ်ဦးရင်းနှီးခဲ့သည်...အမျိုးသမီးလေး နွတ် မှာ ညီအစ်ကိုနှစ်ယောက်ထဲမှ တစ်ယောက်ကိုတကယ်ချစ်ခင်နှစ်သက်သွားမိပြီး ကျန်တစ်ယောက်ကတော့ မိသားစု‌ငွေကြေးပြဿနာအခြေအနေကြောင့်ဟန်ဆောင်စေ့စပ်ခဲ့ရသူဖြစ်ခဲ့တယ်...ရှုပ်ထွေးလှတဲ့သုံးပွင့်ဆိုင်အချစ်ဇာတ်လမ်းကိုဒီဇာတ်လမ်းတွဲမှာခံစားကြည့်ရှုနိုင်မှာဖြစ်ပါတယ်...",
            "description_mm": "မေထီဂရု၏အမွေဆက်ခံခွင့်ရှိသူ မြေးကြီးဖြစ်သူ ထက်နှင့်ညီဖြစ်သူထမ်...ထက်ကအမွေဆက်ခံသူဆိုသော်လည်း သေတမ်းစာသတ်မှတ်ချက်အရ သေတမ်းစာဖွင့်ဖတ်ပြီးနှစ်နှစ်အတွင်း အိမ်ထောင်ပြုကလေးယူရမည်ဖြစ်သည်...သို့သော်ထက်မှာဂေးဖြစ်နေပြီးမိသားစု၏မျှော်လင့်ချက်ကိုမဖြည့်စည်းပေးနိုင်ဖြစ်နေသည်ကို ညီဖြစ်သူထမ်မှဘေးမှကူညီစောင်မပေးခဲ့သည်...ထန်မှာဂျစ်ကန်ကန်နိုင်သည့်လူငယ်တစ်ဦးဖြစ်သော်လည်းကူညီပေးတတ်သူဖြစ်သည်...တစ်နေ့ထမ်မီးပွိုင့်တွင်ကားပိတ်နေချိန်နားကြပ်တပ်ကာလမ်းကိုမကြည့်ဘဲစက်ဘီးနင်းလာသည့်ကလေးငယ်တစ်ဦးကလမ်းကူးသူများကိုတိုက်မိမည့်အဖြစ်မှဟန့်တားရင်းနွတ်နှင့်တွေ့ဆုံကာသဘောကျလာခဲ့ပြီးနှစ်ဦးရင်းနှီးခဲ့သည်...အမျိုးသမီးလေး နွတ် မှာ ညီအစ်ကိုနှစ်ယောက်ထဲမှ တစ်ယောက်ကိုတကယ်ချစ်ခင်နှစ်သက်သွားမိပြီး ကျန်တစ်ယောက်ကတော့ မိသားစု‌ငွေကြေးပြဿနာအခြေအနေကြောင့်ဟန်ဆောင်စေ့စပ်ခဲ့ရသူဖြစ်ခဲ့တယ်...ရှုပ်ထွေးလှတဲ့သုံးပွင့်ဆိုင်အချစ်ဇာတ်လမ်းကိုဒီဇာတ်လမ်းတွဲမှာခံစားကြည့်ရှုနိုင်မှာဖြစ်ပါတယ်...",
            "header_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/shows/1680070888IlEMg0.jpg",
            "center_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/shows/1680070888YSjsrA.png",
            "landscape_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/shows/1680070887fecO8Q.jpg",
            "portrait_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/shows/1680070888U9y6Cr.jpg",
            "similar_shows": [],
            "actors": []
        },
    ],
    "links": {
        "first": "https://app.pyoneplay.com/api/v1/shows?page=1",
        "last": "https://app.pyoneplay.com/api/v1/shows?page=1",
        "prev": null,
        "next": null
    },
    "meta": {
        "current_page": 1,
        "from": 1,
        "last_page": 1,
        "links": [],
        "path": "https://app.pyoneplay.com/api/v1/shows",
        "per_page": 20,
        "to": 14,
        "total": 14
    }
}
*/