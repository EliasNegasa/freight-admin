import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/api/users`;

function accountUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getAccounts() {
  return http.get(apiEndpoint);
}

export function getAccount(accountId) {
  return http.get(accountUrl(accountId));
}

export function saveMovie(account) {
  if (account._id) {
    const body = { ...account };
    delete body._id;
    return http.put(accountUrl(account._id), body);
  }

  return http.post(apiEndpoint, account);
}

export function deleteAccount(accountId) {
  return http.delete(accountUrl(accountId));
}
