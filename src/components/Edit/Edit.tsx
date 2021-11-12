import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IBanner } from '../../interfaces/interfaces';
import { getSingleBanner, updateBanner } from '../../service/banner.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { object, string, TypeOf } from 'zod';

import './Edit.css'
import { useForm } from 'react-hook-form';

const editBannerSchema = object({
    text: string().max(10).nonempty({
        message: 'text is required'
    }),
    image: string().nonempty({
        message: 'image is required'
    }),
})

export type EditBannerInput = TypeOf<typeof editBannerSchema>;

const EditDetails = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const { register, formState: { errors }, handleSubmit } = useForm<EditBannerInput>({
        resolver: zodResolver(editBannerSchema),
    });
    const navigate = useNavigate();
    let [banner, setBanner] = useState<IBanner>({
        _id: '',
        user: '',
        text: '',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    let { id } = useParams();

    useEffect(() => {
        async function fetchMyAPI() {
            const banner: IBanner = await getSingleBanner(id!);

            if (banner) {
                setBanner(banner);
            }
            console.log(banner);

        }
        fetchMyAPI()

    }, [])

    const onSubmit = async (values: EditBannerInput) => {
        try {
            const updatedBanner = await updateBanner(id!, values);
            console.log(updatedBanner);
            
            if (updatedBanner.ok === true) {
                navigate(`/details/${banner._id}`);
            }

            throw new Error('Something went wrong');
        } catch (e: any) {
            setErrorMessage(e.message);
        }
    }

    return (
        <div className="wrappingPersonalSettings">

            <div className="formsMenu">
                <section className="createPicture">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="orderFieldsetByColumn">
                            <legend>photogram</legend>
                            <p className="formHeaderCreateImage">
                                <h1>Edit the picture</h1>
                            </p>
                            <p>{errorMessage}</p>
                            <p className="fieldCreatePet">
                                <label htmlFor="description">Description</label>
                                <span className="input">
                                    <input type="text" id="text" defaultValue={banner.text} placeholder="text" {...register('text')} />
                                    <p>{errors.text?.message}</p>
                                    <span className="actions"></span>
                                </span>
                            </p>
                            <p className="fieldCreatePet">
                                <label htmlFor="image">Image</label>
                                <span className="inputCreatePet">
                                    <input type="text" id="image" defaultValue={banner.image} placeholder="image" {...register('image')} />
                                    <p>{errors.image?.message}</p>
                                    <span className="actions"></span>
                                </span>
                            </p>
                            <hr />
                            <span className="createImgButton">
                                <input className="button submit" type="submit" value="Edit the picture" />
                            </span>
                        </fieldset>
                    </form>
                </section>
            </div>

            <div className="thirdPosition" />
        </div>
    )
}

export default EditDetails