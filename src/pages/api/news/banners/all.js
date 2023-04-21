// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json({
        data: [
            {
                image: 'https://cdn.pixabay.com/photo/2022/06/22/11/32/fortune-7277751__340.jpg',
                label:'1'
            },
            {
                image: 'https://cdn.pixabay.com/photo/2018/11/29/21/34/lottery-3846567__340.jpg',
                label:'2'
            },
            {
                image: 'https://cdn.pixabay.com/photo/2021/02/11/17/00/balls-6005924__340.jpg',
                label:'3'
            },
            {
                image: 'https://cdn.pixabay.com/photo/2022/04/16/21/00/spin-wheel-7137017__340.png',
                label:'4'
            }
        ]
    })
}
