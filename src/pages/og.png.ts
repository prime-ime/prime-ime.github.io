import { Buffer } from 'node:buffer';
import type { APIRoute } from 'astro';
import sharp from 'sharp';
export const GET: APIRoute = async () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#0a192e"/><path d="M820 80V550M940 80V550M1060 80V550M700 180H1140M700 300H1140M700 420H1140" stroke="#20394d" fill="none"/><path d="M700 470C760 470 770 240 830 320S910 440 970 230S1070 260 1140 130" fill="none" stroke="#81e5c4" stroke-width="4"/><text x="80" y="115" font-size="18" font-family="sans-serif" fill="#81e5c4" letter-spacing="5">XINJIANG UNIVERSITY</text><text x="75" y="270" font-size="104" font-family="sans-serif" font-weight="700" fill="#f5f8fb">PRIME Lab.</text><text x="80" y="365" font-size="32" font-family="sans-serif" fill="#c9d8e6">Understand industry.</text><text x="80" y="415" font-size="32" font-family="sans-serif" fill="#81e5c4">Anticipate energy.</text><path d="M80 520H1120" stroke="#334658"/><text x="80" y="562" font-size="17" font-family="sans-serif" fill="#9bb0c5">Predictive Research in Industrial Modeling and Energy</text></svg>`;
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
