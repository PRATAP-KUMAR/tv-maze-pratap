import { useEffect, useRef, useState, useMemo } from "react";
import Spinner from 'react-bootstrap/Spinner';
import Card from "./Card";

const website = 'http://api.tvmaze.com/shows';

const HomePage = () => {
    const targetRef = useRef(null);
    const [shows, setShows] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [N, setN] = useState(10);
    const [isReachedEnd, setIsReachedEnd] = useState(false);

    const options = useMemo(() => {
        return {
            root: null,
            rootMargin: '100px',
            threshold: 0.1
        }
    }, [])

    useEffect(() => {
        const getShowsData = (() => {
            return async () => {
                const response = await fetch(website);
                const MyPromise = new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(response)
                    }, 5000)
                });

                const res = await MyPromise;
                const data = await res.json();

                setShows(data);
                setIsPending(false);
            }
        })();

        getShowsData();

        const callbackFunction = (entries) => {
            const [entry] = entries;
            if (entry.isIntersecting) {
                const increaseN = (() => {
                    return () => {
                        let n = N;
                        while (n < shows.length - 10) {
                            n += 10;
                            setN(n);
                            return n;
                        }

                        if (n === shows.length - 10) {
                            setIsReachedEnd(true);
                        }
                    }
                })();
                increaseN();
            }
        }

        const observer = new IntersectionObserver(callbackFunction, options);
        const currentTarget = targetRef.current;
        if (currentTarget) observer.observe(currentTarget);

        return () => {
            if (currentTarget) observer.unobserve(currentTarget)
        }
    }, [shows, options, N])

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
                <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 bg-light">
                    {
                        shows?.slice(0, N).map((show) => (
                            <div key={show.id} className="mt-3" style={{ "width": "18rem", "height": "36rem" }}>
                                <Card show={show} />
                            </div>
                        ))
                    }
                </div >
            </section>
            {
                isReachedEnd
                    ?
                    <h1>REACHED END</h1>
                    :
                    <Spinner id="loader" animation="border" role="status" variant="primary" ref={targetRef}>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
            }
        </>
    )
}

export default HomePage;