import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import ShowCard from "./ShowCard";
import useIntersect from './hooks/useIntersect';

const website = 'http://api.tvmaze.com/shows';

const HomePage = () => {
    const [shows, setShows] = useState([]);
    const [isPending, setIsPending] = useState(true);

    useEffect(() => {
        const getShowsData = (() => {
            return async () => {
                const response = await fetch(website, { mode: 'cors' });
                const data = await response.json();
                setShows(data);
                console.log(data.length)
                setIsPending(false);
            }
        })();

        getShowsData();

    }, [])

    useIntersect({
        root: null,
        rootMargin: '0px',
        threshold: 1
    })

    return (
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
            <div className="d-flex flex-wrap justify-content-center align-items-end gap-2 bg-light">
                {
                    shows?.map((show) => (
                        <div key={show.id} className="mt-3" style={{ "width": "18rem" }}>
                            {show.externals.imdb && <ShowCard show={show} />}
                        </div>
                    ))
                }
            </div >
        </section>
    )
}

export default HomePage;