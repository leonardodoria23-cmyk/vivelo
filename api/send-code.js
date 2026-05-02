import { Resend } from 'resend';
const resend = new Resend('re_6h42SKaL_7qZEFDCXdhhvungBbwgFbkB8');
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, code } = req.body;
  try {
    await resend.emails.send({
      from: 'Vívelo <onboarding@resend.dev>',
      to: email,
      subject: 'Tu código de verificación - Vívelo',
      html: `<div style="font-family:sans-serif;max-width:400px;margin:auto;padding:32px;background:#0A4A52;border-radius:16px;color:white;text-align:center"><h1 style="color:#FFD60A;font-size:32px;margin-bottom:8px">Vívelo</h1><p style="margin-bottom:24px;opacity:0.8">Tu código de verificación es:</p><div style="background:#FFD60A;color:#0A4A52;font-size:48px;font-weight:bold;padding:24px;border-radius:12px;letter-spacing:8px">${code}</div><p style="margin-top:24px;opacity:0.6;font-size:12px">Válido por 10 minutos</p></div>`
    });
    res.status(200).json({ ok: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
