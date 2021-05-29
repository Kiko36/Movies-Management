/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import utils from '../../utils'
import './AddMovie.css'

function AddMovie() {

    const { id } = useParams()
    const history = useHistory();

    const [name, setName] = useState("");
    const [genres, setGenres] = useState("");
    const [image, setImage] = useState("url");
    const [premiered] = useState(Date);

    const HandleForm = (e) => {
        e.preventDefault();
        let obj =
        {
            name,
            genres,
            image,
            premiered
        }
        utils.addMovie(obj).then(() => {
            alert("Movie as Added")
            history.push('/m/movies')
        }).catch(err => alert("couldn't Add a Movie !!"))

    }


    const cancel = (e) => {
        e.preventDefault()
        history.goBack()
    }

    return (



        <div className="goof">
            <form onSubmit={HandleForm} >
                <div className="card">
                    <div className="back" >
                        <div className="card:hover .content">
                            <div className="content">
                                <div className="front">
                                    <div className="add">
                                        <h1>Add Movie</h1>
            Name: <input value={name}
                                            onChange={(e) => setName(e.target.value)} />
                                        <br /><br />
            Genres: <input value={genres}
                                            onChange={(e) => setGenres(e.target.value)} />
                                        <br /><br />
            Image Url: <input value={image}
                                            onChange={(e) => setImage(e.target.value)} />
                                        <br /><br />
            Premiered: {premiered}
                                        <br /><br />
                                        <input type="submit" value="Save" />
                                        <button onClick={cancel}>Cancel</button>
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

export default AddMovie;