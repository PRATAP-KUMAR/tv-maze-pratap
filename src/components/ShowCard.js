import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

const htmlRegexG = /(<([^>]+)>)/ig;

export default function ShowCard(props) {
    const obj = props
    const { show, cardIndex } = obj;

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
            <Card className="border-2 border-info rounded" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="" data-src={show.image.original} />
                <Card.Body>
                    <Card.Title className='fw-bold'>{show.name} - {show.premiered.slice(0, 4)}</Card.Title>
                    <Card.Text>
                        {show.summary.replace(htmlRegexG, '').slice(0, 100)} ...
                    </Card.Text>
                    <div className='d-flex justify-content-around align-items-center'>
                        <Button className="fw-bold" variant="outline-primary" id={show.externals.imdb} onClick={generateModal}>
                            See 'Show Details'
                        </Button>
                        <span>Card - {cardIndex}</span>
                    </div>
                </Card.Body>
            </Card>
            {
                fetchedObj &&
                <Modal
                    show={visible}
                    onHide={handleClose}
                    size='lg'
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
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
                        <img className="card-img-top border rounded" src={fetchedObj.image.original} alt={fetchedObj.name}></img>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            }
        </>
    );
}
