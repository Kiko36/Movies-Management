import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import utils from '../../utils'

function SubscriptionsWatched(props) {


    const [subs, setSubs] = useState([])


    useEffect(() => {

        const getSubs = async (movieId) => {
            let sub = await utils.getSubsForMovie(movieId)
            setSubs(sub)
        }

        getSubs(props.movieId)

    }, [props.movieId])

    let items = subs.map((sub, index) => <li key={index}><Link to={`/M/members?memberId=${sub.memberId}`}>{sub.memberName}</Link>
        {/* , {sub.movies.find(m => m.movieId === props.movieId).date?.split('T')[0]} */}
        ,  {new Date(sub.movies.find(m => m.movieId === props.movieId).date)?.toLocaleDateString('en-GB')}
    </li>)

    return (
        <div>
            <ul>
                {items}
            </ul>
        </div>
    );
}

export default SubscriptionsWatched;