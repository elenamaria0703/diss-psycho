import React from "react";
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {BoxArrowRight} from "react-bootstrap-icons";

export interface NavLinkProp{
    title: string,
    nav_link: string
}
export interface LayoutProps {
    children: React.ReactNode
    title?: string,
    links?: Array<NavLinkProp>
}

const Layout: React.FC<LayoutProps> = ({ children, title, links}) => {
    return (
        <>
            <Navbar collapseOnSelect expand="lg" className={'shadow-sm'}>
                <Container>
                    <Navbar.Brand href={'/'}><Image height={40} src={'ubb_logo.png'}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            {links && links.map((link) => <Nav.Link href={link.nav_link}>{link.title}</Nav.Link>)}
                        </Nav>
                        <Nav>
                            <Navbar.Text className={'d-md-none d-lg-block'}>{title}</Navbar.Text>
                            <Nav.Link><BoxArrowRight/></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main>
                {children}
            </main>
        </>
    );
}
export default Layout;