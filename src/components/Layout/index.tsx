import React, {useContext, useEffect, useState} from "react";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import "./style.css"
import {LoginInfoContext} from "../../contexts/LoginInfoContext";
import {amILoggedInBoolean} from "../../shared/utilities";


function HeaderContent() {
    useNavigate();
    const {loginInfo} = useContext(LoginInfoContext);
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        amILoggedInBoolean(loginInfo).then((r) => {
            setLoggedIn(r);
        });
    }, [loginInfo]);
    return (
        <>
            <Container fluid>
                <Row className="border-bottom border-dark border-5">
                    {/* logo */}
                    <Col sm={1} md={1} className="d-flex align-self-center">
                        <Link to="" className="navlink">

                            <img style={{maxWidth: "60px"}} id="logo" src={process.env.PUBLIC_URL + "/images/logo.png"}
                                 alt="logo"/> </Link>
                    </Col>

                    {/* Large */}
                    <Col sm={2} md={2} className="d-flex align-self-center">
                        <Link to="" className="navlink"><h1> PetPal </h1></Link>
                    </Col>
                    {/* Small */}
                    <Col sm={2} md={2} className="d-flex align-self-center">
                        <Link to="about" className="navlink"><h4> About </h4></Link>
                    </Col>

                    {!loggedIn ? <><Col sm={2} md={2} className="d-flex align-self-center">
                        <Link to="login" className="navlink"><h4> Login </h4></Link>
                    </Col>

                        <Col sm={2} md={2} className="d-flex align-self-center">
                            <Link to="register" className="navlink"><h4> Register </h4></Link>
                        </Col></> : <></>}
                    {loggedIn ? <>
                        <Col sm={2} md={2} className="d-flex align-self-center">
                            <Link to="accounts/me" className="navlink"><h4> Profile </h4></Link>
                        </Col>

                        <Col sm={2} md={2} className="d-flex align-self-center">
                            <Link to="notifications/" className="navlink"><h4> Notifs </h4></Link>
                        </Col>

                        <Col sm={2} md={2} className="d-flex align-self-center">
                            <Link to="logout" className="navlink"><h4> Logout </h4></Link>
                        </Col>
                    </> : <></>}
                    <Row>
                    </Row>
                    {/* logo */}
                    <Col sm={1} md={1} className="d-flex align-self-center">
                    </Col>

                    {/* Large */}
                    <Col sm={2} md={2} className="d-flex align-self-center">
                    </Col>
                    {loggedIn ? <>

                        <Col sm={2} md={2} className="d-flex align-self-center">
                            <Link to="shelters" className="navlink">
                                <h4> Shelters </h4></Link>
                        </Col>

                        <Col sm={2} md={2} className="d-flex align-self-center">
                            <Link to="applications" className="navlink">
                                <h4> Apps </h4></Link>
                        </Col>


                        <Col sm={2} md={2} className="d-flex align-self-center">
                            <Link to="pets/search" className="navlink"><h4> Pets </h4></Link>
                        </Col>

                        {/* <Col sm={2} md={2} className="d-flex align-self-center">
                            <Link to="logout" className="navlink"><h4> Logout </h4></Link>
                        </Col> */}
                    </> : <></>}


                </Row>
            </Container>
        </>
    )
}


function FooterContent() {
    return (
        <Container>
            <Row className="pt-1 pb-4">
                <Col xs={12} md={9} className="pt-3">
                    <Row>
                        <h1> PetPal Inc. </h1>
                    </Row>

                    <Row>
                        <h6> Address: 27 King's College Cir </h6> <br/>
                        <h6> Toronto, Ontario M5S 1A1 </h6> <br/>
                    </Row>
                </Col>

                <Col xs={12} md={2} className="pt-3">
                    <Row>
                        <h3> Contact Us </h3>
                    </Row>

                    <Row>
                        <h6> Ph-No: 6477621779 </h6>
                    </Row>

                    <Row>
                        <h6> Email: petpal@gmail.com </h6>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}


function Layout() {
    return (
        <>
            <header>
                {HeaderContent()}
            </header>
            <main>
                <Outlet/>
            </main>
            <footer>
                {FooterContent()}
            </footer>
        </>
    )
}

export default Layout;