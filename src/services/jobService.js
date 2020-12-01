import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = `${apiUrl}/api/jobs`;

export function getJobs() {
    return http.get(apiEndpoint);
}

export function getJob(jobId) {
    return http.get(`${apiEndpoint}/${jobId}`);
}

export function saveJob(job) {
    if (job.id) {
        return http.put(apiEndpoint, job);
    }
    return http.post(apiEndpoint, job);
}

export function deleteJob(jobId) {
    return http.delete(`${apiEndpoint}/${jobId}`);
}

export function filterJobs(query) {
    return http.get(`${apiEndpoint}/${query}`);
}
