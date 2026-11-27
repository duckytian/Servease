import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'

const DEPT_PATH = { osas: 'osas', registrar: 'registrar', it: 'it' }

export const fetchServices = (department) =>
  api(`/requests/services?department=${encodeURIComponent(department)}`)

export const submitRequest = (department, details) =>
  api('/requests', { method: 'POST', body: { department, ...details } })

export const fetchMyRequests = (department) => {
  const q = department ? `?department=${encodeURIComponent(department)}` : ''
  return api(`/requests/mine${q}`)
}

export const fetchDeptRequests = (department) =>
  api(`/${DEPT_PATH[department]}/requests`)

export const fetchSummary = (department) =>
  api(`/${DEPT_PATH[department]}/summary`)

export const fetchRequest = (department, ref) =>
  api(`/${DEPT_PATH[department]}/requests/${encodeURIComponent(ref)}`)

export const updateStatus = (department, ref, { newStatus, remarks, assignedStaff }) =>
  api(`/${DEPT_PATH[department]}/requests/${encodeURIComponent(ref)}/status`, {
    method: 'PATCH',
    body: { status: newStatus, remarks, assignedStaff },
  })

// Hooks
export function useMyRequests(pollMs = 15000, department) {
  const [requests, setRequests] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    try {
      setRequests(await fetchMyRequests(department))
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [department])

  useEffect(() => {
    reload()
    const timer = setInterval(reload, pollMs)
    return () => clearInterval(timer)
  }, [reload, pollMs])

  return { requests, error, loading, reload }
}

export function useDeptRequests(department, pollMs = 15000) {
  const [requests, setRequests] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    try {
      setRequests(await fetchDeptRequests(department))
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [department])

  useEffect(() => {
    reload()
    const timer = setInterval(reload, pollMs)
    return () => clearInterval(timer)
  }, [reload, pollMs])

  return { requests, error, loading, reload }
}