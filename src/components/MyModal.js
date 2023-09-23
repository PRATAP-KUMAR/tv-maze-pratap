import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const htmlRegexG = /(<([^>]+)>)/ig;

function MyModal(props) {
    const obj = props;
    const { visible, imdbid } = obj;
    const [imdb, setImdb] = useState(null);

    const url = `https://api.tvmaze.com/lookup/shows?imdb=${imdbid}`
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url, { mode: 'cors' });
                const data = await response.json();
                setImdb(data);
            } catch (error) {
                console.log('error from modal' + error)
            }
        }
        fetchData();
    })

    return (
        <Modal
            show={visible}
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
                <p>{`Genres - ${JSON.stringify(imdb?.genres)}`}</p>
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