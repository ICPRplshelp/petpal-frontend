import {Button, Container, Form, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import React, {FormEvent, useContext, useEffect, useState} from "react";
import {
    authAPI,
    bind2,
    constructErrorsFromResponse,
    getAccountFromID,
    getBE,
    swalFire
} from "../../../shared/utilities";
import validator from "validator";
import FormErr from "../../../components/FormErr";
import axios, {AxiosError} from "axios";
import {PetPalUser} from "../../../shared/account-interfaces";
import {AsString} from "../../../shared/universal-interfaces";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import "./style.css"

interface AccountUpdateFormContents {
    username: string;
    email: string;
    previous_password: string;
    new_password: string;  // write only
    password2: string;  // write only
    phone: string;
    address: string;
    description: string;
}


function getInitialState(): AccountUpdateFormContents {
    return {
        username: '',
        email: '',
        previous_password: '',
        new_password: '',
        password2: '',
        phone: '',
        address: '',
        description: ''
    };
}

function getCleanError(): AsString<AccountUpdateFormContents> {
    return {
        username: '',
        email: '',
        previous_password: '',
        new_password: '',
        password2: '',
        phone: '',
        address: '',
        description: ''
    };
}

function AccountUpdate() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<AccountUpdateFormContents>(getInitialState());
    // const {loginInfo, setLoginInfo} = useContext(LoginInfoContext);
    // how fortunate that everything syncs up. Normally, you would need another interface
    const [err, setErr] = useState<AsString<AccountUpdateFormContents>>(getCleanError());
    const {loginInfo} = useContext(LoginInfoContext);

    const {
        address,
        username,
        email,
        new_password,
        password2,
        phone,
        description,
    } = formData;

    // FORM INIT
    useEffect(() => {
        const runIt = async () => {
            if (loginInfo.currentUser === undefined) {
                navigate("/login");
                return;
            }
            const me = await getAccountFromID(navigate, loginInfo.currentUser.id, loginInfo.token);
            console.log(me);
            setFormData({
                username: me.username,
                email: me.email,
                previous_password: '',
                new_password: '',
                password2: '',
                phone: me.phone,
                address: me.address,
                description: me.description
            });
        }
        runIt().then(() => {
        });
    }, [loginInfo.currentUser, loginInfo.token, navigate]);

    const b = (target: keyof AccountUpdateFormContents) => {
        return bind2<AccountUpdateFormContents>(target, formData, setFormData);
    }

    const handleSubmit = (e: FormEvent<never>) => {
        e.preventDefault();
        const errTemp = getCleanError();
        console.log(formData);
        let success = true;

        // internal checks
        if (formData.new_password !== formData.password2) {
            errTemp.password2 = "Passwords do not match";
            success = false;
        }
        if (formData.new_password.length > 0 && formData.new_password.length < 8) {
            errTemp.new_password = "Password must be at least 8 characters";
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

        let newObj = {...formData};


        // This is the only time I'll use ts-ignore
        if (newObj.previous_password === "") {
            // @ts-ignore
            delete newObj["previous_password"];
        }
        if (newObj.new_password === "") {
            // @ts-ignore
            delete newObj["new_password"];
        }

        axios.patch<{ user: PetPalUser }>(
            `${getBE()}/accounts/account/${loginInfo.currentUser?.id ?? 420696969}/`,
            newObj,
            authAPI(loginInfo)
        ).then((_) => {
            console.log("Account updated!");
            setErr(errTemp);
            swalFire("Success!", "Account updated");

        }).catch((e: AxiosError) => {
            let resp: any = e.response?.data ?? {};
            constructErrorsFromResponse<AccountUpdateFormContents>(resp, errTemp);
            setErr(errTemp);
        });

    }


    return (
        <Container id="container"
                   className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
            <Row className="p-3">
                <h1 className="d-flex justify-content-center">Update Account</h1>
            </Row>
            <Row>
                <Button onClick={() => {
                    navigate("/accounts/update/pfp");
                }}>Update Avatar</Button>
            </Row>

            <Row className="field">
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            value={username}
                            onChange={b("username")}
                            required name="name" style={{minWidth: '100%'}}/>
                        <FormErr message={err.username}/>
                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            value={email}
                            onChange={b("email")}
                            required type="email" name="email" style={{minWidth: '100%'}}/>
                        <FormErr message={err.email}/>
                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Previous Password</Form.Label>
                        <Form.Control
                            value={formData.previous_password}

                            onChange={b("previous_password")}
                            type="password" name="previous_password" style={{minWidth: '100%'}}/>
                        <FormErr message={err.previous_password}/>

                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                            value={new_password}
                            onChange={b("new_password")}
                            type="password" name="password" style={{minWidth: '100%'}}/>
                        <FormErr message={err.new_password}/>

                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                            value={password2}
                            onChange={b("password2")}
                            type="password" name="confirm_password" style={{minWidth: '100%'}}/>
                        <FormErr message={err.password2}/>

                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control required
                                      value={phone}
                                      onChange={b("phone")}
                                      name="contact" style={{minWidth: '100%'}}/>
                        <FormErr message={err.phone}/>

                    </Form.Group>

                    <Form.Group className="p-2 fw-bold">
                        <Form.Label>Address</Form.Label>
                        <Form.Control required
                                      value={address}
                                      onChange={b("address")}
                                      id="inputLocation"/>
                        <FormErr message={err.address}/>

                    </Form.Group>

                    {loginInfo.currentUser?.type === 'SHELTER' ? <Form.Group className="p-2 fw-bold">
                            <Form.Label>Shelter Description</Form.Label>
                            <Form.Control
                                value={description}
                                onChange={b("description")}
                                id="shelterDescription"/>
                            <FormErr message={err.description}/>

                        </Form.Group>

                        : <></>}

                    <div className="d-flex justify-content-center">
                        <Button
                            type="submit"
                            id="btn1" className="btn btn-dark m-1">
                            Update Account
                        </Button>
                        <Button id="btn2" className="btn btn-dark m-1" onClick={() => {
                            navigate("/accounts/me");
                        }}>
                            Back
                        </Button>
                    </div>
                </Form>
            </Row>
        </Container>
    );
}

export default AccountUpdate;