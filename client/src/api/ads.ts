// const API_URL = 'http://localhost:8080';

export async function fetchAds({page = 1, limit = 10, category = '', q = '', needsRevision = false}) {
    const skip = (page-1)*limit;
    const params = new URLSearchParams({
        limit: String(limit),
        page: String(page),
        skip: String(skip)
    });

    if (q) params.append('q', q);
    if (category) params.append('categories', category);
    if (needsRevision) params.append('needsRevision', 'true')

    try {
    const res = await fetch(`/items?${params.toString()}`);

    if (!res.ok) {
        throw new Error('Не удалось загрузить объявления')
    }

    return res.json();
} catch(e) {
    throw new Error(e.message);
}
} 

export async function fetchAdById(id: string | number) {
    try {
    const res = await fetch(`/items/${id}`);

    if (!res.ok) {
        throw new Error('Не удалось загрузить объявления')
    }

    return res.json();
    } catch(e) {
        throw new Error(e.message);
    }
} 

export async function putAdEdit(items, id: string | number) {
    try{
    const res = await fetch(`/items/${id}`, {
        'method': 'PUT',
        'headers': {
            'Content-Type': 'application/json'
        },
        'body': JSON.stringify(items, (key, value) => {
            if (value === '') return undefined;
        return value;
        })});
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || 'Error while saving object'); 
        }
        return res.json()
    } catch(e) {
        throw new Error(e.message);
    }
}