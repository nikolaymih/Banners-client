import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { IBanner } from '../../interfaces/interfaces';
import { getSingleBanner } from '../../service/banner.service';


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

    },[])

    // const onDeletehandler = () => {
    //     services.deleteOne(image._id)
    //         .then(() => {
    //             history.push('/');
    //             return null
    //         })
    // }

    return (
        <section className="detailsMiddlePositioned">
            <img className="detailsImg" src={banner.image} alt="No pic for now" />
            <p><h2>Description: {banner.text}</h2></p>

            {banner
                ? <>
                    <Link to={`/edit/${banner._id}`} style={{ textDecoration: 'none' }}><h3 >Edit</h3></Link>
                    <Link to='/' style={{ textDecoration: 'none' }} ><h3>Delete</h3></Link>
                </>
                : null
            }
        </section>
    )
}

export default Details