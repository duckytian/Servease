import { useCallback, useEffect, useState } from 'react'
import { initialRequestsData } from '../roles/registrar/pages/data.js'

const STORAGE_KEY = 'servease_requests_v1'
const UPDATE_EVENT = 'servease:requests'
const receivingOffices = {
  Registrar: 'Registrar Office',
  OSAS: 'Office of Student Affairs and Services',
  'IT Department': 'IT Department',
}

function formatTimestamp() {
  const now = new Date()
  return (
    now.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }) +
    ' ' +
    now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  )
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  })
}

export function readRequests() {
  if (typeof window === 'undefined') return initialRequestsData

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return initialRequestsData
    const parsed = JSON.parse(saved)
    return Array.isArray(parsed) ? parsed : initialRequestsData
  } catch {
    return initialRequestsData
  }
}

export function writeRequests(requests) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT))
}

export function nextReference(requests) {
  const highest = requests.reduce((max, request) => {
    const number = Number(String(request.ref ?? '').replace('SER-', ''))
    return Number.isFinite(number) ? Math.max(max, number) : max
  }, 0)

  return `SER-${String(highest + 1).padStart(4, '0')}`
}

export function createRequest(details) {
  const requests = readRequests()
  const submitted = {
    ...details,
    ref: nextReference(requests),
    date: formatDate(),
    status: 'Pending',
    remarks: '',
    remarksTimestamp: '',
    statusHistory: [
      {
        step: 'Request Submitted',
        time: formatTimestamp(),
        note: `Request received by the ${receivingOffices[details.department] ?? 'service office'}.`,
        status: 'Pending',
      },
    ],
  }

  writeRequests([submitted, ...requests])
  return submitted
}

export function useRequests() {
  const [requests, setLocalRequests] = useState(readRequests)

  useEffect(() => {
    const sync = () => setLocalRequests(readRequests())
    window.addEventListener('storage', sync)
    window.addEventListener(UPDATE_EVENT, sync)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener(UPDATE_EVENT, sync)
    }
  }, [])

  const setRequests = useCallback((value) => {
    const next = typeof value === 'function' ? value(readRequests()) : value
    writeRequests(next)
    setLocalRequests(next)
  }, [])

  return [requests, setRequests]
}
