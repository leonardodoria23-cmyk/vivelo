import twilio from 'twilio';

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { phone, code } = req.body;
  try {
    await client.messages.create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${phone}`,
      body: `Tu código de verificación Vívelo es: ${code}`
    });
    res.status(200).json({ ok: true });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
