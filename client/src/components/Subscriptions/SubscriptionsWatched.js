import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import utils from '../../utils';

function SubscriptionsWatched(props) {



    const [subs, setSubs] = useState([])


    useEffect(() => {

        const getSubs = async (memberId) => {
            let sub = await utils.getSubsByMemberId(memberId)
            setSubs(sub)
        }

        getSubs(props.memberId)

    }, [props.memberId])
    let items = []
    subs.forEach((sub) => sub.movies.forEach((movie, index) =>
        items.push(<li key={index}><Link to={`/M/movies?movieName=${movie.name}`}>{movie.name}</Link>,
     {movie.date.split('T')[0]}
        </li>
        )))

    return (
        <div>
            <ul>
                {items}
            </ul>
        </div>
    );
}

export default SubscriptionsWatched;