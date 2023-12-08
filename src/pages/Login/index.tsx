import React, {useContext, useState} from 'react';
import {Container} from 'react-bootstrap';
import {LoginInfoContext} from "../../contexts/LoginInfoContext";

import {bind, emptyTokenConstructor, getAccountFromID, getBE, swalFire} from "../../shared/utilities";
import axios from 'axios';
import {LoginInfo} from "../../shared/account-interfaces";
import "./style.css"
import {TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";

type Session = {
    refresh: string,
    access: string
}


function Login() {
    const {setLoginInfo} = useContext(LoginInfoContext);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();
    const [errMsg, setErrMsg] = useState("");

    const handleLogin = () => {
        let heldLoginInfo: LoginInfo = emptyTokenConstructor();
        let bToken = "";
        axios.post<Session>(
            `${getBE()}/accounts/token/`,
            {username, password}
        ).then((p) => {
            console.log("Successful, my access token is", p.data.access);
            heldLoginInfo = {
                token: p.data.access,
                refresh: p.data.refresh
            };
            bToken = p.data.access;

            axios.get<{ id: number }>(
                `${getBE()}/accounts/id/`,
                {
                    headers: {
                        Authorization: `Bearer ${bToken}`
                    }
                }
            ).then((p) => {
                return p.data.id;
            }).then((p) => {
                getAccountFromID(null, p, bToken)
                    // axios.get<PetPalUser>(
                    //     `${getBE()}/accounts/account/${p}/`,
                    //     {
                    //         headers: {
                    //             Authorization: `Bearer ${bToken}`
                    //         }
                    //     }
                    // )
                    .then(r => {
                        console.log("My user info is", r);
                        setLoginInfo({
                            ...heldLoginInfo,
                            currentUser: r
                        });
                    });
            });
            // TODO: handle more things on login success, such as redirection
            swalFire("Logged in", "Login Successful", navigate, "/accounts/me");
        }, () => {
            console.log("I couldn't log in;")
            setErrMsg("Invalid username or password.");
            // TODO: handle login failure
        });

    }

    return (
        <Container id='container'
                   className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
            <div id='title'>Login</div>
            <TextField
                required
                id="username"
                label="Username"
                className="form-control mb-3"
                value={username}
                onChange={bind(setUsername)}
            />
            <TextField
                required
                id="password"
                label="Password"
                type='password'
                className="form-control mb-3"
                value={password}
                onChange={bind(setPassword)}
            />
            {/* <Button variant="outlined"
                    onClick={handleLogin}
            >Login</Button> */}
            <div id="btn" className="btn btn-dark align-self-center" role="button" onClick={handleLogin}><h5>Login</h5>
            </div>
            <p> {errMsg} </p>
        </Container>
    )
}

export default Login;