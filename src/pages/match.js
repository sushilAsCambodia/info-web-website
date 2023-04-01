import Layout from '@/layouts'
const Match = () => {
    return <>
        Match
    </>
};
Match.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Match;