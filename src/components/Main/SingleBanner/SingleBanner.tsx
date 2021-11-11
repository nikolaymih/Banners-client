import { Link } from 'react-router-dom';
import { IBanner } from '../../../interfaces/interfaces';

const SingleBanner = (values: IBanner) => {
    return (
        <div className="individualSectionWrapper">
            <Link to={`/details/${values._id}`}><img className="actualImg" src={values.image} alt=""/></Link>
            <p className="descriptionImg"><h1>Description: {values.text}</h1></p>
        </div>
    )
}

export default SingleBanner