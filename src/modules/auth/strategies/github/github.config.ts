type GithubOAuthConfig = {
  clientID: string,
  clientSecret: string,
  callbackURL: string,
}

export default (): GithubOAuthConfig => ({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
});
