// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const sports = [
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2016/03/28/09/35/soccer-ball-1285164_960_720.jpg',
        created_at:'2023-04-01',
        updated_at:'2023-04-01',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2020/11/27/18/59/tennis-5782695_960_720.jpg',
        created_at:'2023-04-02',
        updated_at:'2023-04-03',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2016/03/28/09/35/soccer-ball-1285164_960_720.jpg',
        created_at:'2023-04-04',
        updated_at:'2023-04-04',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2016/01/02/09/35/beograd-1118033_960_720.jpg',
        created_at:'2023-04-04',
        updated_at:'2023-04-04',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2016/03/28/09/35/soccer-ball-1285164_960_720.jpg',
        created_at:'2023-04-04',
        updated_at:'2023-04-04',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2016/03/28/09/35/soccer-ball-1285164_960_720.jpg',
        created_at:'2023-04-04',
        updated_at:'2023-04-04',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2014/07/10/20/42/football-389405_960_720.jpg',
        created_at:'2023-04-04',
        updated_at:'2023-04-04',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2016/03/28/09/35/soccer-ball-1285164_960_720.jpg',
        created_at:'2023-04-04',
        updated_at:'2023-04-04',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2023/03/06/17/05/football-7833930_960_720.jpg',
        created_at:'2023-04-04',
        updated_at:'2023-04-04',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2020/04/19/20/57/soccer-5065614_960_720.jpg',
        created_at:'2023-04-04',
        updated_at:'2023-04-04',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    },
    {
        category_id:1,
        image:'https://cdn.pixabay.com/photo/2016/03/28/09/35/soccer-ball-1285164_960_720.jpg',
        created_at:'2023-04-04',
        updated_at:'2023-04-04',
        description:'The Premier League isn’t Apple’s first push into soccer. The company added all MLS games its...',
    }
];
export default function handler(req, res) {
    const {query} = req;
    let data = sports;
    if(Object.keys(query).length) {
        // data = sports.filter(r => r.category_id == query.id);
    }
    setTimeout(() => {
        res.status(200).json({
            data: data
        })
    }, 1000);
}
