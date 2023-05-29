export default function getBackendUrl() {
  const secret = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!secret) throw new Error(`Can't find NEXT_PUBLIC_BACKEND_URL.`);

  return secret;
}
