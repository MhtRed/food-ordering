import cookie from "cookie";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "POST") {
    const { username, password } = req.body;
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", process.env.NEXT_PUBLIC_ADMIN_TOKEN, {
          maxAge: 3600,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json("Succesfull");
    } else {
      res.status(400).json("Wrong Credentials!");
    }
  }
}
