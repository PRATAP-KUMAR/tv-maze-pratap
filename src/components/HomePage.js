import { useEffect, useState } from "react";
import '../style.css';

const website = 'http://api.tvmaze.com/shows';

const HomePage = () => {
    const [shows, setShows] = useState([])

    useEffect(() => {
        const getShowsData = async () => {
            const response = await fetch(website);
            const json = await response.json();
            console.log(json)
            const timer = setTimeout(() => {
                setShows(json)
            }, 2000)
            return () => clearTimeout(timer)
        }
        getShowsData();
    }, [])

    const onLike = () => {

    }

    const onComments = () => {
        
    }

    if (shows.length === 0) {
        return (
            <h1>Fetching API Data...</h1>
        )
    }

    return (
        <>
            <div className="shows-container" >
                {
                    shows.map((obj, idx) => (
                        <div className="card">
                            <p key={`${obj.id} + ${idx} + firstkey`}>{obj.name}</p>
                            <p key={`${obj.id} + ${idx} + secondkey`}>{obj.premiered.slice(0,4)}</p>
                            <img key={`${obj.id} + ${idx} + thirdkey`} src={obj.image.original} alt='' width="200" height="auto" />
                            <div className="like-comment">
                                <button onClick={onLike}>Like</button>
                                <button onClick={onComments}>Comments</button>
                            </div>
                        </div>
                    ))
                }
            </div >
        </>
    )
}

export default HomePage;