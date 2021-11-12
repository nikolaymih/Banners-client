let url = `${process.env.REACT_APP_SERVERENDPOINT}`;

export const fetcher = async <T>(): Promise<T> => {
    return (await fetch(`${url}/api/user`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    })).json()
}