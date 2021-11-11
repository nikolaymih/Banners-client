import { LoginUserInput } from "../components/Login/Login";
import { CreateUserInput } from "../components/Register/Register";

let url = `${process.env.REACT_APP_SERVERENDPOINT}`;

export const createUser = async (values: CreateUserInput) => {
    return fetch(`${url}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
    })
}

export const loginUser = async (values: LoginUserInput) => {
    return fetch(`${url}/api/sessions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        credentials: 'include',
    })
}