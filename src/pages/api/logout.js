// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default function handler(req, res) {
    const { method } = req
    if (method !== 'POST') {
        res.status(405).send({ status:405, message: 'Only POST requests allowed' });
    }else {
        res.status(200).json({ 
            status:200,
            message: 'successfull'
        })
    }
}
  