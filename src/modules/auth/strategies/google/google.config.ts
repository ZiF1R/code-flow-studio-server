type GoogleOAuthConfig = {
  clientID: string,
  clientSecret: string,
  callbackURL: string,
  scope: string[],
}

export default (): GoogleOAuthConfig => ({
  clientID: process.env.OAUTH_CLIENT_ID,
  clientSecret: process.env.OAUTH_CLIENT_SECRET,
  callbackURL: process.env.OAUTH_CALLBACK_URL,
  scope: String(process.env.OAUTH_SCOPE).split(','),
});
