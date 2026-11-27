import {
  fetchMyRequests,
  fetchServices,
  submitRequest,
  updateStatus,
  useDeptRequests,
  useMyRequests,
} from './requestsApi.js'

// Backward-compatible wrappers used by the OSAS dashboard and others.
export function useOsasRequests(pollMs = 15000) {
  const { requests, loading, error, reload } = useDeptRequests('osas', pollMs)
  return { requests, loading, error, reload }
}

export const updateOsasStatus = (ref, { newStatus, remarks, assignedStaff }) =>
  updateStatus('osas', ref, { newStatus, remarks, assignedStaff })

export const submitOsasRequest = (details) => submitRequest('osas', details)

export { fetchMyRequests, fetchServices, submitRequest, updateStatus, useMyRequests }