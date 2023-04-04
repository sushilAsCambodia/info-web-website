// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
var user = {
    username:'vitou',
    password:'11111111'
};
const matches = (obj, source) =>
  Object.keys(source).every(
    key => obj.hasOwnProperty(key) && obj[key] === source[key]
);
export default function handler(req, res) {
    const { method } = req
    if (method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' });
    }
    if(matches(req.body,user)) {
        res.status(403).json({ 
            message:'User already exist',
            status:'failed'
        })
    }else {
        setTimeout(() => {
            res.status(200).send({ status:'successfull',message:'User has been created' });
        }, 1000);
    }
}
  