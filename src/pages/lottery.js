import Layout from '@/layouts'
const Lottery = () => {
    return <>
        Lottery
    </>
};
Lottery.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Lottery;