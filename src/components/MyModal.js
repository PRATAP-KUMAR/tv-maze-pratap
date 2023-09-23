import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const htmlRegexG = /(<([^>]+)>)/ig;

function MyModal(props) {

    const [imdb, setImdb] = useState(null);

    const url = `https://api.tvmaze.com/lookup/shows?imdb=${props.imdbid}`
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setImdb(data);
        }
        fetchData();
    })

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {imdb?.name}
                    -
                    {imdb?.premiered.slice(0, 4)}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {`Genres - ${JSON.stringify(imdb?.genres)}`}
                <p>
                    {imdb?.summary.replace(htmlRegexG, '')}
                </p>
                <img className="card-img-top border rounded" src={imdb?.image.original} alt=""></img>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;