import { PP_API_URL } from '../config.js'

export default async function getShowEpisodes({ showId }) {
    const res = await fetch(`${PP_API_URL}/shows/${showId}/episodes`)
    return await res.json()
}

/**
{
    success: true,
    message: "Successfully!",
    status: 200,
    data: [{
        id: '01gwv0dyfkfetnen00jt5ke87z',
        name_en: 'Black Pearl-Ep40',
        name_mm: 'မဟူရာပုလဲ-အပိုင်း ၄၀',
        original_filename: 'Ep_40_MHY_Final_ On air.mp4',
        episode_number: 40,
        description_en: 'အဖေဂျင်မီပြောပြမှပဲ ဦးမင်းနိုင်နဲ့ အမေတို့ ဘယ်လောက်ချစ်ခဲ့ကြတယ်ဆိုတာ သိရတော့တယ် သားတစ်ယောက်အနေနဲ့ အမေပျော်ရွှင်မှာကို မတားရက်ပါဘူးလေ...',
        description_mm: 'အဖေဂျင်မီပြောပြမှပဲ ဦးမင်းနိုင်နဲ့ အမေတို့ ဘယ်လောက်ချစ်ခဲ့ကြတယ်ဆိုတာ သိရတော့တယ် သားတစ်ယောက်အနေနဲ့ အမေပျော်ရွှင်မှာကို မတားရက်ပါဘူးလေ...',
        channel_id: '01gt4wvvbcbx1pxb3s96k4j7h2',
        thumbnail_image_url: 'https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/episodes/1680259451WgRsEY.jpg',
        streaming_url: 'https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=SXoHpa-uf9OryiFw1CwMcbqNYBoKfqNdwtTEVZc7J0s&expires=1680436096&token_path=%2F4b2c4be3-9c3e-4d44-aa89-62879ca96eb3%2F/4b2c4be3-9c3e-4d44-aa89-62879ca96eb3/playlist.m3u8',
    }],
    links: {
        first: '',
        last: '',
        prev: '',
        next: '',
    },
    meta: {
        current_page: 1,
        from: 1,
        last_page: 2,
        path: 'https://app.pyoneplay.com/api/v1/shows/01gt5smh5fc03rh4kez73r47d8/episodes',
        per_page: 20,
        to: 20,
        total: 40
    }
*/