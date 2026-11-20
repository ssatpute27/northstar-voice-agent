import { defineConfig, loadEnv } from 'vite';
export default defineConfig(({ mode }) => {
 const env = loadEnv(mode, process.cwd(), '');
 return { plugins: [{ name: 'elevenlabs-token', configureServer(server) {
   server.middlewares.use('/api/signed-url', async (req, res) => {
     res.setHeader('Content-Type','application/json'); res.setHeader('Cache-Control','no-store');
     if (req.method !== 'POST') { res.statusCode = 405; return res.end(JSON.stringify({error:'Method not allowed'})); }
     if (!env.ELEVENLABS_API_KEY || !env.ELEVENLABS_AGENT_ID) { res.statusCode = 503; return res.end(JSON.stringify({error:'Add ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID to .env.local, then restart the server.'})); }
     try {
       const url = new URL('https://api.elevenlabs.io/v1/convai/conversation/get-signed-url'); url.searchParams.set('agent_id', env.ELEVENLABS_AGENT_ID);
       const response = await fetch(url, {headers:{'xi-api-key':env.ELEVENLABS_API_KEY}});
       if (!response.ok) { res.statusCode = 502; return res.end(JSON.stringify({error:'ElevenLabs could not start a session. Check your API key and agent ID.'})); }
       const data = await response.json(); return res.end(JSON.stringify({signedUrl:data.signed_url}));
     } catch { res.statusCode=502; return res.end(JSON.stringify({error:'Could not reach ElevenLabs.'})); }
   });
 }}] };
});
