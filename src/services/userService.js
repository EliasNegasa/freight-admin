import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/api/user`;

export function register(user) {
  let request = {
    firstName: user.firstname,
    lastName: user.lastname,
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
