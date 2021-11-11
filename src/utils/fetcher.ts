export const fetcher = async <T>(url: string): Promise<T> => {
    return (await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })).json()
}