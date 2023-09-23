import React from 'react'
import MyModal from "./MyModal";
import Button from 'react-bootstrap/Button';

export default function Card(props) {
    const obj = props
    const { show } = obj;

    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <div className="card shadow d-flex align-items-center justify-content-between" style={{ "height": "100%" }}>
                <img className="card-img-top border rounded mask flex-center" src={show.image.original} alt=""></img>
                <div className='d-flex justify-content-between'>
                    <h5 className="card-title text-primary">{show.name}</h5>
                    <h5 className="card-title text-info">{show.premiered.slice(0, 4)}</h5>
                </div>
                <Button variant="info" onClick={() => setModalShow(true)}>
                    See Details
                </Button>
                <MyModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    imdbid={show.externals.imdb}
                />
            </div>
        </>
    )
}
