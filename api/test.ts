export function GET(request: Request) {
  //   return new Response(`Hello from ${process.env.VERCEL_REGION}`);
  console.log("Hello from me");
  return new Response(`Hello from me`);
}
