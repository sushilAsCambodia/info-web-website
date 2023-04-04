// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    res.status(200).json([
        {
            image:'https://cdn.pixabay.com/photo/2023/03/15/04/30/joy-7853671_960_720.jpg'
        },
        {
            image:'https://cdn.pixabay.com/photo/2023/03/25/17/35/girl-7876505_960_720.jpg'
        },
        {
            image:'https://cdn.pixabay.com/photo/2023/03/25/16/02/hummingbird-7876355_960_720.jpg'
        }
    ])
  }
  