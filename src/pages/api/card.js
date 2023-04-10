// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json({
        data: [
            {
                image: '/assets/NewsJourney/newscard1.png',
                label:'General',
                translate:'一般'
            },
            {
                image: '/assets/NewsJourney/newscard2.png',
                label:'Casino',
                translate:'机率'
            },
            {
                image: '/assets/NewsJourney/newscard3.png',
                label:'Fishing',
                translate:'捕鱼'
            },
            {
                image: '/assets/NewsJourney/newscard5.png',
                label:'Live Casino',
                translate:'视讯'
            },
            {
                image: '/assets/NewsJourney/newscard5.png',
                label:'Live Casino',
                translate:'视讯'
            }
        ]
    })
}
