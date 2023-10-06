import Cookies from "universal-cookie";

export const cookies = new Cookies(null, { path: "/" });

export const setCookies = (
  name: string,
  value: any,
  maxAge: number | undefined
) => {
  cookies.set(name, value, {
    maxAge,
    secure: true,
    sameSite: "strict",
  });
};

export const removeCookies = (name: string) => {
  cookies.remove(name);
};
