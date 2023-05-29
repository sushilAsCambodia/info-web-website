import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      })
    // ...add more providers here
  ],

  callbacks: {
    async jwt({  token, account }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
            token.access_token = account.access_token;
            console.log('account=>',account)
            console.log('token=>',token)
        }
      return token
    },
  },
  secret: "looselipssinkships",
}
export default NextAuth(authOptions)