import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/auth/register`;

export function register(user) {
  let request = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    password: user.password,
    username: user.username,
    phone: user.phone,
    userType: user.userType,
    role: user.role,
  };
  console.log("request ", request );
  return http.post(apiEndpoint, request);
}
