export async function fetchDataRapat({page=1,limit=10,filters=[],sorting=[]} = { }){
    const params = new URLSearchParams();
    params.append('page',page.toString());
    params.append('limit',limit.toString());

    filters.forEach((filter) => {
        if (filter.value) {
            const key = filter.id === 'namaRapat' ? 'searchNamaRapat' : filter.id;
            params.append(key,filter.value);
        }
    })

    if (sorting.length > 0) {
        params.append('sortBy',sorting[0].id);
        params.append('order',sorting[0].desc ? 'desc' : 'asc');
    }

    const res = await fetch(`api/meetings?${params.toString()}`);
    if(res.status === 401) {
        throw new Error("Unauthorized");
    }
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `Error fetching meetings: ${res.status}`);
    }
    return res.json();
} 


export async function deleteDataRapat(id) {
    if(!id) throw Error ("ID Rapat dibutuhkan");
    const res = await fetch(`api/meetings/${id}`,
        {
            method : "DELETE"
        }
    );
    if(res.status === 401) {
        throw new Error("Unauthorized");
    }
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `Error deleting meeting: ${res.status}`);
    }
    return res.json();
}

export async function completeDataRapat(id,formData){
    if(!id) throw Error ("ID Rapat dibutuhkan");
    const res = await fetch(`api/meetings/${id}/complete`,
        {
            method : "POST",
            body : formData,
        }
    );
    if(res.status === 401) {
        throw new Error("Unauthorized");
    }
    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || `Error completing meeting: ${res.status}`);
    }
    return res.json();
}


export async function downloadDataRapat(id){
    if(!id) throw Error ("ID Rapat dibutuhkan");
    const res = await fetch(`api/meetings/${id}/download-report`);
    if(res.status === 401) {
        throw new Error("Unauthorized");
    }
    if (!res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            const err = await res.json();
            throw new Error(err.message || `Error downloading meeting report: ${res.status}`);
        } else {
            // If it's not JSON, it might be an HTML error page or plain text
            const errorText = await res.text();
            // Try to extract a meaningful message from HTML or use the text directly
            const bodyMatch = errorText.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
            const titleMatch = errorText.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            const match = bodyMatch || titleMatch;
            const displayError = match && match[1] ? match[1].trim().replace(/<[^>]+>/g, ' ').replace(/\s\s+/g, ' ').substring(0, 200) : errorText.substring(0,200);
            throw new Error(displayError.trim() || `Error downloading meeting report: ${res.status} - ${res.statusText}`);
        }
    }
    return res.blob();
        
}