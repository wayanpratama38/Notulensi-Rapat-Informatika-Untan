/**
 * Fetch paginated, filtered, and sorted meetings data.
 * @param {Object} options
 * @param {number} options.page - current page (1-indexed)
 * @param {number} options.limit - items per page
 * @param {Array<{id: string, value: string}>} options.filters - column filters
 * @param {Array<{id: string, desc: boolean}>} options.sorting - sorting config
 * @returns {Promise<{data: any[], totalPages: number}>}
 */
export async function fetchMeetings({ page = 1, limit = 10, filters = [], sorting = [] } = {}) {
  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('limit', limit.toString());
  filters.forEach(filter => {
    if (filter.value) {
      const key = filter.id === 'namaRapat' ? 'searchNamaRapat' : filter.id;
      params.append(key, filter.value);
    }
  });
  if (sorting.length > 0) {
    params.append('sortBy', sorting[0].id);
    params.append('order', sorting[0].desc ? 'desc' : 'asc');
  }

  const res = await fetch(`/api/meetings?${params.toString()}`);
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `Error fetching meetings: ${res.status}`);
  }
  return res.json();
}

/**
 * Delete a meeting by ID.
 * @param {string|number} id - meeting ID
 * @returns {Promise<void>}
 */
export async function deleteMeeting(id) {
  if (!id) throw new Error('Meeting ID is required');
  const res = await fetch(`/api/meetings/${id}`, { method: 'DELETE' });
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `Error deleting meeting: ${res.status}`);
  }
}

/**
 * Complete a meeting by uploading notes and documents.
 * @param {string|number} id - meeting ID
 * @param {FormData} formData - form data with notes & files
 * @returns {Promise<any>}
 */
export async function completeMeeting(id, formData) {
  if (!id) throw new Error('Meeting ID is required');
  const res = await fetch(`/api/meetings/${id}/complete`, {
    method: 'POST',
    body: formData,
  });
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `Error completing meeting: ${res.status}`);
  }
  return res.json();
}

/**
 * Download a meeting report PDF as a blob.
 * @param {string|number} id - meeting ID
 * @returns {Promise<Blob>}
 */
export async function downloadMeetingReport(id) {
  if (!id) throw new Error('Meeting ID is required');
  const res = await fetch(`/api/meetings/${id}/download-report`);
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `Error downloading report: ${res.status}`);
  }
  return res.blob();
} 