import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CustomNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg='info' sticky='top' className='border-bottom border-primary'>
            <Container>
                <Navbar.Brand href="https://www.tvmaze.com/" target="_blank" rel="noreferrer" className='fw-bold fs-5'>
                    TVmaze Home
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className='ms-auto'>
                        <Nav.Link className='fw-bold fs-5' href="https://www.tvmaze.com/people" target="_blank" rel="noreferrer">TVmaze People</Nav.Link>
                        <Nav.Link className='fw-bold fs-5' href="https://www.tvmaze.com/countdown" target="_blank" rel="noreferrer">TVmaze Count Down</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default CustomNavbar;