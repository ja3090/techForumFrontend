export default function getSecret() {
  const secret = process.env.NEXT_PUBLIC_SECRET;

  if (!secret) throw new Error(`Can't find NEXT_PUBLIC_SECRET.`);

  return secret;
}
