import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { loginUser } from '../../service/user.service';

import './Login.css'

const loginUserSchema = object({
    email: string().email('not a valid email').nonempty({
        message: 'email is required'
    }),
    password: string().min(6).nonempty({
        message: 'password is required'
    }),
})

export type LoginUserInput = TypeOf<typeof loginUserSchema>;

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm<LoginUserInput>({
        resolver: zodResolver(loginUserSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (values: LoginUserInput) => {
        try {
            const user = await loginUser(values);

            if (user.ok === true) {
                navigate('/');
            }

            throw new Error('Wrong email or password');
        } catch (e: any) {
            setErrorMessage(e.message);
        }
    }

    return (
        <section className="registerWrapper">
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="orderFieldsetByColumn">
                    <legend>React</legend>
                    <p className="formHeaderCreateUser">
                        <h2>Javascript developer</h2>
                    </p>
                    <p>{errorMessage}</p>
                    <p className="fieldCreateUser">
                        <label htmlFor="email">Email</label>
                        <span className="inputChangePassword">
                            <input type="email" id="email" placeholder="Type your email" {...register('email')} />
                            <p>{errors.email?.message}</p>
                            <span className="actions"></span>
                        </span>
                    </p>

                    <p className="fieldCreateUser">
                        <label htmlFor="password">Password</label>
                        <span className="inputChangePassword">
                            <input type="password" id="password" placeholder="Type your password" {...register('password')} />
                            <p>{errors.password?.message}</p>
                            <span className="actions"></span>
                        </span>
                    </p>
                    <hr />
                    <span className="createImgButton">
                        <input className="button submit" type="submit" value="Login" />
                    </span>
                </fieldset>
            </form>
        </section>
    )
}

export default Login;