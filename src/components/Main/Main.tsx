import { useEffect, useState } from 'react';
import { IBanner } from '../../interfaces/interfaces';
import { getAllBanners } from '../../service/banner.service';
import SingleBanner from './SingleBanner/SingleBanner';
import './Main.css';

const Main = () => {
    let [banners, setBanners] = useState<IBanner[]>([])

    useEffect(() => {
        async function fetchMyAPI() {
            const { userBanners } = await getAllBanners();

            if (userBanners) {
                setBanners(userBanners);
            }
        }
        fetchMyAPI()

    }, [])
    return (
        <section className="CardBanners">
            <div className="sectionWrapper">
                {banners ? banners.map((x: IBanner) =>
                    <SingleBanner key={x._id} {...x} />
                ) : null}
            </div>
        </section >
    )
}

export default Main;