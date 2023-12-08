import React, {FormEvent, useContext, useState} from "react";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import {Button, Container, Form, Row} from "react-bootstrap";
import axios from "axios";
import {getBE, navigateLoginUnauthorized, swalFire} from "../../../shared/utilities";
import {useNavigate} from "react-router-dom";

function AccountUpdatePFP() {
    const {loginInfo} = useContext(LoginInfoContext);

    const [image, setImage] = useState<File | null>(null);
    const hfc = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files !== null) {
            console.log(event.target.files[0]);
            setImage(event.target.files[0]);
        }
    }
    const navigate = useNavigate();
    const handleSubmit = (e: FormEvent<never>) => {

        e.preventDefault();
        console.log("I am submitting");
        console.log(image);
        if (image === null) {
            return;
        }
        if (loginInfo.currentUser === undefined) {
            return;
        }

        const formData = new FormData();
        formData.append("avatar", image)
        axios.patch<never>(`${getBE()}/accounts/account/${loginInfo.currentUser.id}/`, formData, {
            headers: {
                Authorization: `Bearer ${loginInfo.token}`,
                "Content-Type": "multipart/form-data"
            }
        }).then(() => {
            console.log("Pfp updated");
            swalFire("Success", "Profile Picture successfully update!", navigate, "/accounts/me");

        }).catch(e => {
                navigateLoginUnauthorized(e, navigate)
                console.log("Couldn't update the pfp!");
            }
        );

    }
    return (
        <>

            <Container className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <Row className="mb-3">
                    <h2>Select a new avatar</h2>
                </Row>
                <Row className="mb-3">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>
                                Choose an image:
                            </Form.Label>
                            <Form.Control
                                type={"file"}
                                onChange={hfc}
                            >

                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button
                                disabled={image === null}
                                type={"submit"}
                            >Submit </Button>

                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button
                                onClick={() => {
                                    navigate("/accounts/update")
                                }}
                            >Back </Button>
                        </Form.Group>
                    </Form>
                </Row>
            </Container>

        </>
    )
        ;
}

export default AccountUpdatePFP;