// src/utils/api.js
import { API_BASE_URL } from "../../../config";

// Fetch profile by id (handles both { profile: {...} } and direct profile object)
export async function fetchPublicProfile(profileId) {
  const res = await fetch(`${API_BASE_URL}/api/profile/${profileId}`);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const message = text || `Request failed with status ${res.status}`;
    const err = new Error(message);
    err.status = res.status;
    throw err;
  }
  // Try JSON parse (backend should return JSON)
  const data = await res.json().catch(() => null);
  if (!data) throw new Error("Invalid response from server");
  // Accept either { profile: {...} } or {...}
  return data.profile ?? data;
}
