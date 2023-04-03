import { PP_API_URL } from '../config.js'

export default async function getAllEpisodes({ page }) {
    const res = await fetch(`${PP_API_URL}/episodes?page=${page}`)
    return await res.json()
}
/**
{
    "success": true,
    "message": "Successfully!",
    "status": 200,
    "data": [
        {
            "id": "01gv2da1vva379416dee59s4ts",
            "name_en": "MasterChef All Stars Myanmar-Cooking23",
            "name_mm": "Lime Tart with Italian Meringue",
            "original_filename": "Merge.mp4",
            "search_keywords": "Lime Tart with Italian Meringue",
            "episode_number": 0,
            "sort_order": 0,
            "description_en": "MasterChef All Stars Myanmar ပြိုင်ပွဲဝင်များအတွက် Lime Tart  အချိုပွဲပြင်ဆင်ပုံကို Chef Joseph မှ Master Class ပြသွားပါတယ်။",
            "description_mm": "MasterChef All Stars Myanmar ပြိုင်ပွဲဝင်များအတွက် Lime Tart  အချိုပွဲပြင်ဆင်ပုံကို Chef Joseph မှ Master Class ပြသွားပါတယ်။",
            "channel_id": "01gt4wvvbcbx1pxb3s96k4j7h2",
            "start_at": "2023-03-08T17:30:00.000000Z",
            "end_at": "2024-03-09T17:29:00.000000Z",
            "duration_in_seconds": 0,
            "file_size": 0,
            "landscape_image_url": null,
            "portrait_image_url": null,
            "thumbnail_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/episodes/1678339539JdoAZc.jpg",
            "bunny_id": "b804b682-5450-4882-b65b-a17f7583c4e4",
            "library_id": "95621",
            "streaming_url": "https://vz-30d21f49-6b1.b-cdn.net/bcdn_token=pLrVSd0BMqxWlFnTLy9wPpy5_CJSaqJY9ul59ePijYQ&expires=1680438243&token_path=%2Fb804b682-5450-4882-b65b-a17f7583c4e4%2F/b804b682-5450-4882-b65b-a17f7583c4e4/playlist.m3u8",
            "channel": {
                "id": "01gt4wvvbcbx1pxb3s96k4j7h2",
                "name_en": "MRTV-4",
                "name_mm": "MRTV-4",
                "landscape_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/channels/1678162894cazK89.png",
                "portrait_image_url": "https://pyoneplay-bucket.s3.ap-southeast-1.amazonaws.com/channels/1678162895qy6GQu.png",
                "bunny_collection_id": null,
                "is_active": null,
                "description_en": null,
                "description_mm": null,
                "sort_order": null,
                "live_id": "01gt74kf63194hkch7pbsp46he"
            },
            "view_count": 0,
            "released_date": "2023-03-08T17:30:00.000000Z"
        }
    ],
    "links": {
        "first": "https://app.pyoneplay.com/api/v1/episodes?page=1",
        "last": "https://app.pyoneplay.com/api/v1/episodes?page=19",
        "prev": "https://app.pyoneplay.com/api/v1/episodes?page=18",
        "next": null
    },
    "meta": {
        "current_page": 19,
        "from": 361,
        "last_page": 19,
        "links": [
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=18",
                "label": "&laquo; Previous",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=1",
                "label": "1",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=2",
                "label": "2",
                "active": false
            },
            {
                "url": null,
                "label": "...",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=10",
                "label": "10",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=11",
                "label": "11",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=12",
                "label": "12",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=13",
                "label": "13",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=14",
                "label": "14",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=15",
                "label": "15",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=16",
                "label": "16",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=17",
                "label": "17",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=18",
                "label": "18",
                "active": false
            },
            {
                "url": "https://app.pyoneplay.com/api/v1/episodes?page=19",
                "label": "19",
                "active": true
            },
            {
                "url": null,
                "label": "Next &raquo;",
                "active": false
            }
        ],
        "path": "https://app.pyoneplay.com/api/v1/episodes",
        "per_page": 20,
        "to": 361,
        "total": 361
    }
}
 */