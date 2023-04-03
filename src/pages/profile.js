import Layout from '@/layouts'
const Profile = () => {
    return <>
        Pofile
    </>
};
Profile.getLayout = function getLayout(page) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Profile;