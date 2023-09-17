import { useEffect, useState } from "react";
import ShowDetails from './modals/ShowDetails';
import '../style.css';

const website = 'http://api.tvmaze.com/shows';

const HomePage = () => {
    const [shows, setShows] = useState([]);
    const [display, setDisplay] = useState(false);
    const [imdbId, setImdbId] = useState(0);

    const handleClick = (e) => {
        setDisplay(true);
        setImdbId(e.target.id)
    }

    const onClose = () => {
        setDisplay(false);
    }

    useEffect(() => {
        const getShowsData = async () => {
            const response = await fetch(website);
            const json = await response.json();
            setShows(json)
            console.log(json)
        }
        getShowsData();
    }, [])

    if (shows.length === 0) {
        return (
            <h1>Fetching API Data...</h1>
        )
    }

    return (
        <>
            <section>
                <div className="shows-container" >
                    {
                        shows.map((show) => (
                            <div className="card" key={show.externals.imdb}>
                                <p>{show.name}</p>
                                <p>{show.premiered.slice(0, 4)}</p>
                                <img src={show.image.original} alt='' width="200" height="auto" />
                                <div className="show-details">
                                    <button
                                        type="button"
                                        id={show.externals.imdb}
                                        onClick={handleClick}
                                    >
                                        ShowDetails
                                    </button>
                                </div>
                                <div className="like-comment">
                                    <button id={show.id}>Like</button>
                                    <button id={show.id}>Comments</button>
                                </div>
                            </div>
                        ))
                    }
                </div >
            </section>
            {display ?
                <ShowDetails
                    display={display}
                    onClose={onClose}
                    id={imdbId}
                />
                :
                null}
        </>
    )
}

export default HomePage;