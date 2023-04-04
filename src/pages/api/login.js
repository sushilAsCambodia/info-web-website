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
    if(!matches(req.body,user)) {
        res.status(200).json({ 
            name:'chhay vitou',
            first_name:'vitou',
            last_name:'chhay',
            profile:null,
            access_token:'xxxxxx11111xxxxxx'
        })
    }else {
        res.status(404).json({ status: 'failed',message:'User doest not exist!' })
    }
}
  