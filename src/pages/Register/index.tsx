import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import React, {FormEvent, useState} from "react";
import {bind2, fl, getBE} from "../../shared/utilities";
import validator from "validator";
import FormErr from "../../components/FormErr";
import axios, {AxiosError} from "axios";
import {PetPalUser} from "../../shared/account-interfaces";
import {AsString} from "../../shared/universal-interfaces";
import "./style.css"

interface RegisterFormContents {
    username: string;
    email: string;
    password: string;  // write only
    password2: string;  // write only
    phone: string;
    address: string;
    type: string;  // write only
    description: string;
}


function getInitialState(): RegisterFormContents {
    return {
        username: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        address: '',
        type: 'SEEKER',
        description: ''
    };
}

function getCleanError(): AsString<RegisterFormContents> {
    return {
        username: '',
        email: '',
        password: '',
        password2: '',
        phone: '',
        address: '',
        type: '',
        description: ''
    };
}

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<RegisterFormContents>(getInitialState());

    // const {loginInfo, setLoginInfo} = useContext(LoginInfoContext);

    // how fortunate that everything syncs up. Normally, you would need another interface
    const [err, setErr] = useState<AsString<RegisterFormContents>>(getCleanError());


    const b = (target: keyof RegisterFormContents) => {
        return bind2<RegisterFormContents>(target, formData, setFormData);
    }

    const handleSubmit = (e: FormEvent<never>) => {
        e.preventDefault();
        const errTemp = getCleanError();
        console.log(formData);
        let success = true;

        // internal checks
        if (formData.password !== formData.password2) {
            errTemp.password2 = "Passwords do not match";
            success = false;
        }
        if (formData.password.length < 8) {
            errTemp.password = "Password must be at least 8 characters";
            success = false;
        }
        if (formData.username.length === 0) {
            errTemp.username = "Username can't be blank";
            success = false;
        }
        if (formData.phone.length === 0) {
            errTemp.phone = "Phone can't be blank";
            success = false;
        }
        if (formData.address.length === 0) {
            errTemp.address = "Address can't be blank";
            success = false;
        }
        if (!validator.isEmail(formData.email)) {
            errTemp.email = "This isn't an email";
            success = false;
        }
        if (!success) {
            setErr(errTemp);
            return;
        }
        // external checks

        axios.post<{ user: PetPalUser }>(
            `${getBE()}/accounts/registration/`,
            formData
        ).then((_) => {
            navigate('/');
        }).catch((e: AxiosError) => {
            console.log(e);
            let resp: any = e.response?.data ?? {};
            console.log(resp);
            errTemp.username = fl(resp['username']);
            errTemp.type = fl(resp['type']);
            errTemp.email = fl(resp['email']);
            setErr(errTemp);
        });

    }


    function changed(isSeeker: boolean) {
        return (e: any) => {
            // console.log("Changed");

            let newState = (isSeeker ? e.target.checked : !e.target.checked)
                ? "SEEKER" : "SHELTER";
            setFormData({
                ...formData,
                type: newState
            });
        };
    }

    return (
        <Container id='container'
                   className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
            <Row className="p-3">
                <h1 className="d-flex justify-content-center">Signup</h1>
            </Row>

            <Row className="field">
                <Form onSubmit={handleSubmit}>
                    <Container className="text-center">
                        <Row className="btn-group" role="group" aria-label="Basic radio toggle button group">
                            <Col><Form.Check
                                type="radio"
                                id="btnradio1"
                                label="Seeker"
                                name="btnradio"
                                defaultChecked
                                onChange={changed(true)}
                            /></Col>
                            <Col><Form.Check
                                type="radio"
                                id="btnradio2"
                                label="Shelter"
                                name="btnradio"
                                onChange={changed(false)}
                            /></Col>
                        </Row>
                    </Container>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Username</Form.Label>
                        <Form.Control onChange={b("username")}
                                      required name="name" style={{minWidth: '100%'}}/>
                        <FormErr message={err.username}/>
                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={b("email")}
                                      required type="email" name="email" style={{minWidth: '100%'}}/>
                        <FormErr message={err.email}/>
                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={b("password")}
                                      required type="password" name="password" style={{minWidth: '100%'}}/>
                        <FormErr message={err.password}/>

                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            onChange={b("password2")}
                            required type="password" name="confirm_password" style={{minWidth: '100%'}}/>
                        <FormErr message={err.password2}/>

                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control required
                                      onChange={b("phone")}
                                      name="contact" style={{minWidth: '100%'}}/>
                        <FormErr message={err.phone}/>

                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Address</Form.Label>
                        <Form.Control required
                                      onChange={b("address")}
                                      id="inputLocation"/>
                        <FormErr message={err.address}/>

                    </Form.Group>

                    {formData.type === 'SHELTER' ? <Form.Group className="p-2 fw-bold">
                            <Form.Label>Shelter Description</Form.Label>
                            <Form.Control
                                onChange={b("description")}
                                id="shelterDescription"/>
                            <FormErr message={err.description}/>

                        </Form.Group>

                        : <></>}

                    <div className="d-flex justify-content-center">
                        <Button
                            type="submit"
                            id="btn1" className="btn btn-dark m-1">
                            Register
                        </Button>
                        <Button id="btn2" className="btn btn-dark m-1" onClick={() => {
                            navigate("/");
                        }}>
                            Back
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    );
}

export default Register;