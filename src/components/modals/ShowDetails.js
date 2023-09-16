import { useEffect, useState } from 'react';
import './style.css';

const ShowDetails = (props) => {
    const obj = props;
    const { shown, onClose, id } = obj;
    const [imdbData, setImdbData] = useState({})

    useEffect(() => {
        if (shown) {
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    })

    if (!shown) return;

    const getImdbData = async () => {
        const URL = `https://api.tvmaze.com/lookup/shows?imdb=${id}`
        const response = await fetch(URL);
        const json = await response.json();
        setImdbData(json)
    }
    getImdbData();

    if ('summary' in imdbData) {
        return (
            <div className='modal-container'>
                <div><button type="button" onClick={onClose}>X</button></div>
                <div className='modal-main'>
                    <img src={imdbData.image.original} alt='' width="200" height="auto" />
                    <p>{imdbData.summary.replace(/(<([^>]+)>)/ig, '')}</p>
                </div>
            </div>
        )
    }
}

export default ShowDetails;