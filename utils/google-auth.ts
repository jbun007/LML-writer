import { JWT } from 'google-auth-library';
import fs from 'fs';
import path from 'path';

export async function getAccessToken() {
  // Resolve the path to ensure it's correct relative to the project root
  const keyFilePath = path.resolve(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_FILE!);
  const key = JSON.parse(fs.readFileSync(keyFilePath, 'utf8'));

  const client = new JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ['https://www.googleapis.com/auth/adwords'],
  });

  try {
    const accessToken = await client.authorize();
    return accessToken.access_token;
  } catch (error) {
    console.error('Error retrieving access token:', error);
    throw new Error('Failed to retrieve access token');
  }
}