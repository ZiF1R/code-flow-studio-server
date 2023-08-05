type GoogleOAuthConfig = {
  clientID: string,
  clientSecret: string,
  callbackURL: string,
  scope: string[],
}

export default (): GoogleOAuthConfig => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
  scope: String(process.env.GOOGLE_SCOPE).split(','),
});
