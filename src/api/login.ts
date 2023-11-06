import http from "./http";
import { login_signInParams } from "./interface/login";

export const snsSignIn = async (params: login_signInParams) => {
  const url = "/signIn";
  return await http.post(url, params);
};

