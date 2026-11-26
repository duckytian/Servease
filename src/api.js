const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function api(path, { method = 'GET', body } = {}) {
  const token = sessionStorage.getItem('token')
  const res = await fetch(`${API}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Server error')
  return data
}

// Login: ise-save ang token, ibabalik ang user { id, userId, name, role, ... }
export async function loginRequest(userId, password) {
  const { token, user } = await api('/auth/login', { method: 'POST', body: { userId, password } })
  sessionStorage.setItem('token', token)
  return user
}

export function clearSession() {
  sessionStorage.removeItem('token')
}
