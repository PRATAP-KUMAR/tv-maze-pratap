import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from 'react-icons/ai';

function CustomNavbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg='info' sticky='top'>
            <Container>
                <Navbar.Brand className='text-primary' href="/">PRATAP PANABAKA</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="mailto:pratap@fastmail.com" target="_blank" aria-label="Email to PRATAP"><AiOutlineMail fontSize={32} /></Nav.Link>
                        <Nav.Link href="https://github.com/PRATAP-KUMAR" target="_blank" rel="noreferrer" aria-label="Github"><AiFillGithub fontSize={32} /></Nav.Link>
                        <Nav.Link href="https://linkedin.com/in/pratap-kumar-panabaka" target="_blank" rel="noreferrer" aria-label="LinkedIn"><AiFillLinkedin fontSize={32} /></Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/projects">Projects</Nav.Link>
                        <Nav.Link href="/certificates">Certificates</Nav.Link>
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    );
}

export default CustomNavbar;