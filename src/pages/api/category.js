// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json({
        data: [
            {
                id:1,
                name:'zuìxīn',
                label:'Zuìxīn',
            },
            {
                id:2,
                name:'rèmén',
                label:'Rèmén',
            },
            {
                id:3,
                name:'wǔháng',
                label:'Wǔháng',
            },
            {
                id:4,
                name:'xīngzuò',
                label:'Xīngzuò',
            },
            {
                id:4,
                name:'zhǔtí',
                label:'Zhǔtí',
            },
            {
                id:5,
                name:'fēnggé',
                label:'Fēnggé',
            }, 
        ]
    })
}
