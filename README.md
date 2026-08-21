# Vercel-ready User Info Checker

## Deploy
1. Upload this folder to GitHub.
2. Import the repository into Vercel.
3. In Vercel → Project → Settings → Environment Variables, add:
   - `API_BASE_URL`
   - `API_PATH`
   - `API_TOKEN`
   - `USER_ID_PARAM`
4. Redeploy.
5. Open the Vercel URL.

The frontend calls `/api/user?userId=...`; Vercel runs `api/user.js` as a serverless function.

The API token is kept in Vercel Environment Variables and is not exposed to the browser.

Use only an API and account data that you are authorized to access. This implementation does not bypass authentication.
