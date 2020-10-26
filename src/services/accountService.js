import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/api/users`;

export function getAccounts() {
  return http.get(apiEndpoint);
}

export function getAccount(accountId) {
  return http.get(`${apiEndpoint}/${accountId}`);
}

export function saveAccount(account) {
  if (account.get('id')) {
    return http.put(apiEndpoint, account);
  }
  const password = "password@app";
  account.append('password', password);
  // account.password = account.firstName.substring(0, 1).toUpperCase() + account.lastName.substring(0, 1) + "@app"
  return http.post(apiEndpoint, account);
}

export function deleteAccount(accountId) {
  return http.delete(`${apiEndpoint}/${accountId}`);
}
