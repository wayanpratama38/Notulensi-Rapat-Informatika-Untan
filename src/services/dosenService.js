export async function fetchDosen() {
  try {
    const res = await fetch('/api/users?role=DOSEN');
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) {
      const err = await res.json();
      
      throw new Error(err.message || `Error fetching dosen: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching dosen:", error);
    throw error;
  }
}

export async function createDosen(dosenData) {
  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...dosenData,
        role: 'DOSEN'
      }),
    });
    
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Error creating dosen: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error creating dosen:", error);
    throw error;
  }
}

export async function updateDosen(id, dosenData) {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dosenData),
    });
    
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Error updating dosen: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error updating dosen:", error);
    throw error;
  }
}

export async function deleteDosen(id) {
  try {
    const res = await fetch(`/api/users/${id}`, {
      method: 'DELETE',
    });
    
    if (res.status === 401) {
      throw new Error("Unauthorized");
    }
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || `Error deleting dosen: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error deleting dosen:", error);
    throw error;
  }
} 