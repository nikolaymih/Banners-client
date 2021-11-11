import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';
import { createUser } from '../../service/user.service';

import './Register.css'

const createUserSchema = object({
    email: string().email('not a valid email').nonempty({
        message: 'email is required'
    }),
    name: string().nonempty({
        message: 'name is required'
    }),
    password: string().min(6).nonempty({
        message: 'password is required'
    }),
    passwordConfirmation: string().nonempty({
        message: 'passwordConfirmation is required'
    })
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "passwords do not match",
    path: ['passwordConfirmation']
})

export type CreateUserInput = TypeOf<typeof createUserSchema>;

const Register = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (values: CreateUserInput) => {
        try {
            const user = await createUser(values);

            if (user.ok === true) {
                navigate('/auth/login');
            }

            throw new Error('Email already exists');
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
                        <label htmlFor="name">Name</label>
                        <span className="inputChangePassword">
                            <input type="text" id="name" placeholder="Type your name" {...register('name')} />
                            <p>{errors.name?.message}</p>
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

                    <p className="fieldCreateUser">
                        <label htmlFor="passwordConfirmation">Repeat password</label>
                        <span className="inputChangePassword">
                            <input type="password" id="passwordConfirmation" placeholder="Confirm your password" {...register('passwordConfirmation')} />
                            <p>{errors.passwordConfirmation?.message}</p>
                            <span className="actions"></span>
                        </span>
                    </p>

                    <hr />
                    <span className="createImgButton">
                        <input className="button submit" type="submit" value="Register" />
                    </span>
                </fieldset>
            </form>
        </section>
    )
}

export default Register;