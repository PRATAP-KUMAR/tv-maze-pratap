import { useEffect, useState } from "react";
import ShowDetails from './modals/ShowDetails';

import Spinner from 'react-bootstrap/Spinner';

const website = 'http://api.tvmaze.com/shows';

const HomePage = () => {
    const [shows, setShows] = useState(null);
    const [display, setDisplay] = useState(false);
    const [imdbId, setImdbId] = useState(0);
    const [isPending, setIsPending] = useState(true);

    // const handleClick = (e) => {
    //     setDisplay(true);
    //     setImdbId(e.target.id)
    // }

    const onClose = () => {
        setDisplay(false);
    }

    useEffect(() => {
        const getShowsData = async () => {
            const response = await fetch(website);
            const MyPromise = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(response)
                }, 5000)
            });
            const res = await MyPromise;
            const json = await res.json();
            setShows(json)
            setIsPending(false)
        }
        getShowsData();
    }, [])

    return (
        <>
            <section>
                {
                    isPending &&
                    <div className="vh-100 d-flex align-items-center justify-content-center bg-info">
                        <h1>Loading...</h1>
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                }
                <div className="d-flex flex-wrap flex-gap-1 bg-light">
                    {
                        shows?.map((show) => (
                            <>
                                <div class="card g-2 border-info" style={{ "width": '18rem' }}>
                                    <img class="card-img-top" src={show.image.original} alt=""></img>
                                    <div class="card-body">
                                        <h5 class="card-title">{show.name}</h5>
                                    </div>
                                </div>
                            </>
                        ))
                    }
                </div >
            </section>
            {display &&
                <ShowDetails
                    display={display}
                    onClose={onClose}
                    id={imdbId}
                />
            }
        </>
    )
}

export default HomePage;