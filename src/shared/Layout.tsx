import React from "react";
import {Container, Image, Nav, Navbar} from "react-bootstrap";
import {BoxArrowRight} from "react-bootstrap-icons";
import {Storage} from "@capacitor/storage";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate()
    const storageClear = () => {
        Storage.remove({key: 'token'});
        Storage.remove({key: 'id'});
        Storage.remove({key: 'role'});
        Storage.remove({key: 'name'});
    }
    return (
        <>
            <Navbar key={'navbar'}collapseOnSelect expand="lg" className={'shadow-sm'}>
                <Container key={'container'}>
                    <Navbar.Brand key={'navbar_brand'} href={'/'}><Image height={40} src={'/ubb_logo.png'}/></Navbar.Brand>
                    <Navbar.Toggle key={'navbar_toogle'} aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse key={'navbar_collapse'}>
                        <Nav key={'nav1'} className="me-auto">
                            {links && links.map((link,i) => <Nav.Link key={`nav1_${i}`} onClick={() => navigate(`/${link.nav_link}`)} href={'#'}>{link.title}</Nav.Link>)}
                        </Nav>
                        <Nav key={'nav2'}>
                            <Navbar.Text key={'nav2_text'} className={'d-md-none d-lg-block'}>{title}</Navbar.Text>
                            <Nav.Link key={'nav2_link'}><BoxArrowRight key={'bar'} onClick={() => {storageClear(); window.location.reload();}}/></Nav.Link>
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