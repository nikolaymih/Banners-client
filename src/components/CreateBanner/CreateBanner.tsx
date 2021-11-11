import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';

import './CreateBanner.css';
import { createBanner } from '../../service/banner.service';

const createBannerSchema = object({
    text: string().max(10).nonempty({
        message: 'text is required'
    }),
    image: string().nonempty({
        message: 'image is required'
    }),
})

export type CreateBannerInput = TypeOf<typeof createBannerSchema>;

const CreateBanner = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm<CreateBannerInput>({
        resolver: zodResolver(createBannerSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (values: CreateBannerInput) => {
        try {
            const banner = await createBanner(values);

            if (banner.ok === true) {
                navigate('/');
            }

            throw new Error('Something went wrong');
        } catch (e: any) {
            setErrorMessage(e.message);
        }
    }

    return (
        <section className="createPicture">
            <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="orderFieldsetByColumn">
                    <legend>photogram</legend>
                    <p className="formHeaderCreateImage">
                        <h1>Add a new Banner</h1>
                    </p>
                    <p>{errorMessage}</p>
                    <p className="fieldCreatePet">
                        <label htmlFor="text">Description</label>
                        <span className="input">
                            <input type="text" id="text" placeholder="description" {...register('text')} />
                            <p>{errors.text?.message}</p>
                        </span>
                    </p>
                    <p className="fieldCreatePet">
                        <label htmlFor="image">Image</label>
                        <span className="inputCreatePet">
                            <input type="text" id="image" placeholder="image" {...register('image')} />
                            <p>{errors.image?.message}</p>
                            <span className="actions"></span>
                        </span>
                    </p>
                    <hr />
                    <span className="createImgButton">
                        <input className="button submit" type="submit" value="Add Image" />
                    </span>
                </fieldset>
            </form>
        </section>
    )
}

export default CreateBanner