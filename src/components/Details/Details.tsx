import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IBanner } from '../../interfaces/interfaces';
import { deleteBanner, getSingleBanner } from '../../service/banner.service';
import { useNavigate } from 'react-router';

import './Details.css';

const Details = () => {
    let [banner, setBanner] = useState<IBanner>({
        _id: '',
        user: '',
        text: '',
        image: '',
        createdAt: new Date(),
        updatedAt: new Date()
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchMyAPI() {
            const banner: IBanner = await getSingleBanner(id!);

            if (banner) {
                setBanner(banner);
            }
        }
        fetchMyAPI()

    },[])

    const deleteHandler = () => {
        deleteBanner(id!)
            .then(() => {
                return navigate('/');
            })
    }

    return (
        <section className="detailsMiddlePositioned">
            <img className="detailsImg" src={banner.image} alt="No pic for now" />
            <p><h2>Description: {banner.text}</h2></p>

            {banner._id !== '' 
                ? <>
                    <Link to={`/edit/${banner._id}`} style={{ textDecoration: 'none' }}><h3 >Edit</h3></Link>
                    <Link to='/' style={{ textDecoration: 'none' }} onClick={deleteHandler}><h3>Delete</h3></Link>
                </>
                : null
            }
        </section>
    )
}

export default Details