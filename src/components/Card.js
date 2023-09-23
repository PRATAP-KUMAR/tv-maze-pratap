import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Modal } from 'react-bootstrap';

const htmlRegexG = /(<([^>]+)>)/ig;

export default function Card(props) {
    const obj = props
    const { show } = obj;

    const [visible, setVisible] = useState(false);
    const [fetchedObj, setFetchedObj] = useState(null);

    const handleClose = () => setVisible(false);

    const generateModal = (e) => {
        setVisible(true);
        fetch(`https://api.tvmaze.com/lookup/shows?imdb=${e.target.id}`)
            .then(res => res.json())
            .then(data => setFetchedObj(data))
    }

    return (
        <>
            <div className="card shadow d-flex align-items-center justify-content-between" style={{ "height": "100%" }}>
                <img className="card-img-top border rounded mask flex-center" src="" data-src={show.image.original} alt=""></img>
                <div className='d-flex justify-content-between'>
                    <h5 className="card-title text-primary">{show.name}</h5>
                    <h5 className="card-title text-info">{show.premiered.slice(0, 4)}</h5>
                </div>

                <Button variant="primary" id={show.externals.imdb} onClick={generateModal}>
                    Launch demo modal
                </Button>
                {
                    fetchedObj &&
                    <Modal show={visible} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                {fetchedObj.name}
                                -
                                {fetchedObj.premiered.slice(0, 4)}
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p>{`Genres - ${JSON.stringify(fetchedObj.genres)}`}</p>
                            <p>
                                {fetchedObj.summary.replace(htmlRegexG, '')}
                            </p>
                            <img className="card-img-top border rounded" src={fetchedObj.image.original} alt=""></img>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handleClose}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                }
            </div>
        </>
    );
}
