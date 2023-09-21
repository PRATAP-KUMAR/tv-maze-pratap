import { useEffect, useState } from 'react';
import './style.css';


const ShowDetails = (props) => {
    const obj = props;
    const { display, onClose, id } = obj;

    const [imdbData, setImdbData] = useState(null)

    useEffect(() => {
        const URL = `https://api.tvmaze.com/lookup/shows?imdb=${id}`
        const getShowData = async () => {
            const response = await fetch(URL);
            const MyPromise = new Promise((resolve) => {
                setTimeout(() => {
                    resolve(response)
                }, 0)
            });
            const res = await MyPromise;
            const json = await res.json();
            console.log(json);
            setImdbData(json)
        }
        getShowData();
    }, [id])

    if (!display || !imdbData) return;

    return (
        <>
            <div className='modal-container' >
                <div><button type="button" onClick={onClose}>X</button></div>
                <div className='modal-main'>
                    <div className='image'>
                        <img src={imdbData.image?.original} alt=''></img>
                    </div>
                    <div className='show-details'>
                        <p className='name-year'>{`${imdbData.name} - ${imdbData.premiered?.slice(0, 4)} `}</p>
                        <p className='summary'>{imdbData.summary?.replace(/(<([^>]+)>)/ig, '')}</p>
                        <p className='genres'>{`Genres - [${imdbData.genres}]`}</p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default ShowDetails;