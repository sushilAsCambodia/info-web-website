import Layout from '@/layouts'
const Home = () => {
    return <>
        Home
    </>
};
Home.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Home;