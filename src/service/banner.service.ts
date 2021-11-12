import { CreateBannerInput } from "../components/CreateBanner/CreateBanner";

let url = `${process.env.REACT_APP_SERVERENDPOINT}`;

export const getAllBanners = async <T>(): Promise<T> => {
    return (await fetch(`${url}/api/banners`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })).json();
}

export const createBanner = async (values: CreateBannerInput) => {
    return fetch(`${url}/api/banners`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        credentials: 'include'
    })
}

export const getSingleBanner = async <T>(id: string): Promise<T> => {
    console.log(id);
    
    return (await fetch(`${url}/api/banners/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })).json();
}

export const updateBanner = async (id: string, values: CreateBannerInput) => {
    return fetch(`${url}/api/banners/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        credentials: 'include'
    })
}