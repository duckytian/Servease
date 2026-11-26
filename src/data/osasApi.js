import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'

// OSAS staff 
export function useOsasRequests(pollMs = 15000) {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    try {
      setRequests(await api('/osas/requests'))
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
    const timer = setInterval(reload, pollMs)
    return () => clearInterval(timer)
  }, [reload, pollMs])

  return { requests, loading, error, reload }
}

export const updateOsasStatus = (ref, { newStatus, remarks, assignedStaff }) =>
  api(`/osas/requests/${ref}/status`, {
    method: 'PATCH',
    body: { status: newStatus, remarks, assignedStaff },
  })

// Student 
export const submitOsasRequest = (details) =>
  api('/requests', { method: 'POST', body: { department: 'osas', ...details } })

export const fetchMyRequests = () => api('/requests/mine')

export function useMyOsasRequests(pollMs = 15000) {
  const [requests, setRequests] = useState([])
  const [error, setError] = useState('')

  const reload = useCallback(async () => {
    try {
      setRequests(await fetchMyRequests())
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    reload()
    const timer = setInterval(reload, pollMs)
    return () => clearInterval(timer)
  }, [reload, pollMs])

  return { requests, error, reload }
}
