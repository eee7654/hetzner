import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

const sessionOptions = {
  password: process.env.COOKIE_PASS,
  cookieName: process.env.COOKIE_NAME,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    /*maxAge:60*1000*/
  }/*,
  ttl:60*/
};

export function authApi(handler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

export function authPages(handler) {
  return withIronSessionSsr(handler, sessionOptions);
}