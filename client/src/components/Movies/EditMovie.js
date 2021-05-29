/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import utils from '../../utils'


function EditMovie() {

    const history = useHistory()
    const { id } = useParams()
    const [movie, setMovie] = useState({})

    useEffect(() => {
        utils.getMovieById(id)
            .then((data) => setMovie({ ...data, genres: data.genres.join(', ') }))
            .catch(err => alert(err))

    }, []);



    const handleForm = (e) => {
        e.preventDefault();

        utils.updateMovie(id, { ...movie, genres: movie.genres.split(', ') }).then(() => {
            alert("Movie Updated !!");
            history.goBack();
        }).catch((err) => alert(err))

    }

    const cancel = (e) => {
        e.preventDefault();
        history.goBack();
    }

    return (
        <div className="goof">
            <form onSubmit={handleForm} >
                <div className="card">
                    <div className="back" >
                        <div className="card:hover .content">
                            <div className="content">
                                <div className="front">
                                    <div className="add">
                                        <h1>Edit Movie</h1>
            Name: <input value={movie.name}
                                            onChange={(e) => setMovie({ ...movie, name: e.target.value })} />
                                        <br /><br />
            Genres: <input value={movie.genres}
                                            onChange={(e) => setMovie({ ...movie, genres: e.target.value })} />
                                        <br /><br />
            Image Url: <input value={movie.image}
                                            onChange={(e) => setMovie({ ...movie, image: e.target.value })} />
                                        <br /><br />
            Premiered: <input type="date" onChange={(e) => setMovie({ ...movie, premiered: e.target.value })} value={movie.premiered?.split('T')[0]} />

                                        <br /><br />

                                        <input type="submit" style={{ float: "inline-start" }} />
                                        <button onClick={cancel} style={{}} >Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default EditMovie;