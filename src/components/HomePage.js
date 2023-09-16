import { useState } from "react";
import '../style.css';
import ShowDetails from "./modals/ShowDetails";

const website = 'http://api.tvmaze.com/shows';

const HomePage = () => {
    const [shows, setShows] = useState([])
    const [shown, setShown] = useState(false);
    const [id, setId] = useState(0);

    const getShowsData = async () => {
        const response = await fetch(website);
        const json = await response.json();
        setShows(json)
    }
    getShowsData();

    const onClose = () => {
        setId(0);
        setShown(false);
    };

    const onLike = () => {

    }

    const showDetails = (e) => {
        setId(e.target.id);
        setShown(true);
    }

    const onComments = () => {

    }

    // const URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/'

    if (shows.length === 0) {
        return (
            <h1>Fetching API Data...</h1>
        )
    }

    return (
        <>
            <>
                <section>
                    <div className="shows-container" >
                        {
                            shows.map((show, idx) => (
                                <div className="card" key={show.externals.imdb}>
                                    <p>{show.name}</p>
                                    <p>{show.premiered.slice(0, 4)}</p>
                                    <img src={show.image.original} alt='' width="200" height="auto" />
                                    <div className="show-details"><button type="button" id={show.externals.imdb} onClick={showDetails}>ShowDetails</button></div>
                                    <div className="like-comment">
                                        <button id={show.id} onClick={onLike}>Like</button>
                                        <button id={show.id} onClick={onComments}>Comments</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div >
                </section>
                <ShowDetails
                    id={id}
                    shown={shown}
                    onClose={onClose}
                />
            </>
        </>
    )
}

export default HomePage;