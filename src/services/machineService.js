import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/api/machines`;

export function getMachines() {
  return http.get(apiEndpoint);
}

export function getMachine(machineId) {
  return http.get(`${apiEndpoint}/${machineId}`);
}

export function saveMachine(machine) {
  if (machine.get('id')) {
    return http.put(apiEndpoint, machine);
  }
  return http.post(apiEndpoint, machine);
}

export function deleteMachine(machineId) {
  return http.delete(`${apiEndpoint}/${machineId}`);
}
