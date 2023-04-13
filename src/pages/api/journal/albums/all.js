// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var journals = [
    {
        id:1,
        title:'Jiuxiao 10 yards',
        images:[
            '/assets/HomeMobile/mainslider.png',
            '/assets/HomeMobile/mainslider1.png',
            '/assets/HomeMobile/mainslider1.png',
            '/assets/HomeMobile/mainslider1.png',
            '/assets/HomeMobile/mainslider1.png',
        ],
        created_at:'2023-04-01',
        updated_at:'2023-04-01',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        id:2,
        title:'Jiuxiao 20 yards',
        images:[
            '/assets/HomeMobile/mainslider.png',
            '/assets/HomeMobile/mainslider1.png',
            '/assets/HomeMobile/mainslider1.png',
            '/assets/HomeMobile/mainslider1.png',
            '/assets/HomeMobile/mainslider1.png',
        ],
        created_at:'2023-04-01',
        updated_at:'2023-04-01',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    // {
    //     id:3,
    //     title:'Jiuxiao 30 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    
    // {
    //     id:4,
    //     title:'Jiuxiao 40 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:5,
    //     title:'Jiuxiao 50 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:6,
    //     title:'Jiuxiao 60 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:7,
    //     title:'Jiuxiao 70 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:8,
    //     title:'Jiuxiao 80 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:9,
    //     title:'Jiuxiao 80 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:10,
    //     title:'Jiuxiao 80 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:11,
    //     title:'Jiuxiao 80 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:12,
    //     title:'Jiuxiao 80 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:13,
    //     title:'Jiuxiao 80 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // },
    // {
    //     id:14,
    //     title:'Jiuxiao 80 yards',
    //     images:[
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/23/china-5177558_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2018/01/01/09/07/celebration-3053773_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2020/05/16/13/21/china-5177551_960_720.jpg',
    //         'https://cdn.pixabay.com/photo/2022/01/29/04/28/tiger-icon-6976312_960_720.jpg',
    //     ],
    //     created_at:'2023-04-01',
    //     updated_at:'2023-04-01',
    //     description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    // }

];
export default function handler(req, res) {
    const {query} = req;
    let data = JSON.parse(JSON.stringify(journals));
    if(Object.keys(query).length && query.id) {
        data = data.find(r => r.id == query.id) || {};
    }
    if(Object.keys(query).length && query.lang_id) {
        if(query.lang_id == 2) {
            data = data.map(r => {
                r.title = r.title+'- ch';
                return r;
            });
        }else if(query.lang_id == 3) {
            data = data.map(r => {
                r.title = r.title+'- kh';
                return r;
            });
        }
    }
    setTimeout(() => {
        res.status(200).json({
            data: data
        })
    }, 2000);
}
