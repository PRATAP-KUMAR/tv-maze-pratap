import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg='info' sticky='top' className='d-flex justify-content-center'>
            <Container >
                <Navbar.Brand className='fw-bold' href="https://www.tvmaze.com/" target="_blank">TV MAZE</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="https://www.tvmaze.com/people" target="_blank" rel="noreferrer">TV MAZE People</Nav.Link>
                        <Nav.Link href="https://www.tvmaze.com/countdown" target="_blank" rel="noreferrer">TV MAZE Count Down</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default CustomNavbar;