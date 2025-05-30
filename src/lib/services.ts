import { TWalletsData } from '@/types';

export async function getClientCredentialAndStore(): Promise<string | null> {
  try {
    const res = await fetch('/api/auth/client-credential', {
      method: 'POST',
    });

    if (!res.ok) return null;

    const data = await res.json();
    const token = data.token;

    if (token) {
      const now = Date.now();
      localStorage.setItem('client-credential-token', token);
      localStorage.setItem('client-credential-timestamp', now.toString());
      return token;
    }

    return null;
  } catch (err) {
    console.error('Client token fetch error:', err);
    return null;
  }
}

export async function getOrRefreshClientCredential(): Promise<string | null> {
  const token = localStorage.getItem('client-credential-token');
  const timestamp = localStorage.getItem('client-credential-timestamp');
  const now = Date.now();
  if (!token || !timestamp) {
    return await getClientCredentialAndStore();
  }

  const ageInHours = (now - parseInt(timestamp, 10)) / (1000 * 60 * 60);
  if (ageInHours > 100) {
    return await getClientCredentialAndStore();
  }

  return token;
}

export async function getWalletsData(
  mode: string
): Promise<TWalletsData | null> {
  try {
    const token = await getOrRefreshClientCredential();
    if (!token) {
      console.warn('No token available for wallets fetch');
      return null;
    }

    const res = await fetch('/api/wallet', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'x-mode': mode,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      console.error('Wallets API error:', errData);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('getWalletsData error:', error);
    return null;
  }
}
