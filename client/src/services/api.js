// API service layer connecting React client to Express REST API

const API_BASE = '/api';

export async function fetchJournalInfo() {
  const res = await fetch(`${API_BASE}/journal/info`);
  const json = await res.json();
  return json.data;
}

export async function fetchTimeline() {
  const res = await fetch(`${API_BASE}/timeline`);
  const json = await res.json();
  return json.data;
}

export async function fetchGallery() {
  const res = await fetch(`${API_BASE}/gallery`);
  const json = await res.json();
  return json.data;
}

export async function fetchReasons() {
  const res = await fetch(`${API_BASE}/reasons`);
  const json = await res.json();
  return json.data;
}

export async function fetchQuiz() {
  const res = await fetch(`${API_BASE}/quiz`);
  const json = await res.json();
  return json.data;
}

export async function submitQuizScore(score, total) {
  const res = await fetch(`${API_BASE}/quiz/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score, total }),
  });
  return await res.json();
}

export async function unlockSurprise(key) {
  const res = await fetch(`${API_BASE}/surprise/unlock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  });
  return await res.json();
}
