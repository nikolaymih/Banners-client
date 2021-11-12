import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";

import './Header.css';

interface IUser {
    _id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    session: string;
    iat: number;
    exp: number;
}

const Header = () => {
        const { data } = useSWR<IUser | null>(`
        ${process.env.REACT_APP_SERVERENDPOINT}/api/user
    `, fetcher)

    return (
        <header id="site-header">
            <nav className="navbar">
                <section className="navbar-left">
                    <div className="left-logged">
                        <Link className="button" to="/">FFW</Link>
                        {data ? <Link className="button" to='/create-banner'>Create Banner</Link> : null}
                    </div>

                </section>

                <section className="navbar-rightL">
                    <div className="right-logged">
                        {data
                            ? <Link to="/"> Hello, {data.name} </Link>
                            : <>
                                <Link className="button" to='/auth/login'>Login</Link>
                                <Link className="button" to='/auth/register'>Register</Link>
                            </>
                        }
                    </div>
                </section>
            </nav>
        </header>
    )
}

export default Header;