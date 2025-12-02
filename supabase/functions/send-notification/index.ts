import fetch from 'node-fetch'; // Expo push notifications
import { serve } from 'std/server';

serve(async (req) => {
  try {
    const { title, body, userIds } = await req.json(); 
    // userIds = array of your users' uid whom you want to notify

    if (!title || !body || !userIds) {
      return new Response(JSON.stringify({ message: 'Missing title, body, or userIds' }), { status: 400 });
    }

    // 1️⃣ Get user tokens from Supabase
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const response = await fetch(`${supabaseUrl}/rest/v1/users?uid=in.(${userIds.join(',')})&select=expo_token`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    const users = await response.json();

    const tokens = users.map((u: any) => u.expo_token).filter(Boolean);
    if (!tokens.length) {
      return new Response(JSON.stringify({ message: 'No tokens found for these users' }), { status: 404 });
    }

    // 2️⃣ Send push notifications via Expo
    const messages = tokens.map((token: string) => ({
      to: token,
      sound: 'default',
      title,
      body,
      data: { customData: 'optional' },
    }));

    const expoResponse = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    const result = await expoResponse.json();

    return new Response(JSON.stringify({ message: 'Notifications sent', result }), { status: 200 });

  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
});
