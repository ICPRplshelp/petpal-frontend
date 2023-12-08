// ApplicationSubmit and Application


import {ApplicationSubmit} from "../../../shared/application-interfaces";
import {AsString} from "../../../shared/universal-interfaces";
import React, {FormEvent, useContext, useEffect, useState} from "react";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import {authAPI, getB, getBE, navigateLoginUnauthorized, submitAbstraction} from "../../../shared/utilities";
import {Button, Container, Form, Row} from "react-bootstrap";
import FormFields from "../../../components/FormFields";
import {useNavigate, useParams} from "react-router-dom";
import {Pet} from "../../../shared/pet-interfaces";
import axios from "axios";
import PetComponent3 from "../../../components/Pet/index3";
import "./style.css"

type AS = ApplicationSubmit;

function getAS(): AS {
    return {
        "reason": "",
        "pet": -99
    };
}

function getASErr(): AsString<AS> {
    return {
        reason: "",
        pet: ""
    };
}


function ApplicationCreate() {
    const mandatoryAFields: (keyof AS)[] = [
        "reason"
    ];
    const largeFields: (keyof AS)[] = [
        "reason"
    ];
    const {id} = useParams<{ id: string | undefined }>();
    const {loginInfo} = useContext(LoginInfoContext);
    const [obj, setObj] = useState<AS>(getAS());
    const [err, setErr] = useState<AsString<AS>>(getASErr());
    const endpoint = "applications";
    const url = `${getBE()}/${endpoint}/`;
    const navigate = useNavigate();
    const [pet, setPet] = useState<Pet>();
    const [shelter, setShelter] = useState(false);

    useEffect(() => {
        if (loginInfo.currentUser?.type === 'SHELTER') {
            setShelter(true);
        }
    }, [loginInfo.currentUser?.type]);


    useEffect(() => {
        if (id === undefined) {
            return;
        }
        const pn = parseInt(id);
        if (isNaN(pn)) {
            return;
        }
        // setObj({
        //     ...obj,
        //     pet: pn
        // });
        setObj(o => {
            return {
                ...o, pet: pn
            }
        })
        const endpoint = "pets";
        const url = `${getBE()}/${endpoint}/${pn}/`;

        // check if the pet exists and is available
        axios.get<Pet>(url, authAPI(loginInfo)).then(p => {
            setPet(p.data);
        }).catch(e => {
            navigateLoginUnauthorized(navigate, e);
            console.log("Does that pet not exist?");
        });


    }, [id, loginInfo, navigate]);

    const handleSubmit = (e: FormEvent<never>) => {
        e.preventDefault();
        const getAS2 = (): AS => {
            return {
                reason: "",
                pet: obj.pet
            }
        }
        submitAbstraction<AS>(
            url, obj, loginInfo, setObj, setErr, getAS2,
            getASErr
        ).then(() => {
        });
    }
    const b = getB<AS>(obj, setObj);
    return (
        <>
            <Container id="container"
                       className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <Row className="p-3">
                    <h1 className="d-flex justify-content-center">New Pet Application</h1>
                </Row>
                {pet !== undefined ? <>
                    <Row className="field">
                        <PetComponent3 item={pet}></PetComponent3>
                    </Row>
                </> : <></>}

                <Row className="field">
                    {!shelter ? <>
                        <Form onSubmit={handleSubmit}>
                            <FormFields
                                mandatory={mandatoryAFields}
                                obj={obj}
                                err={err}
                                binder={b}
                                largeFields={largeFields}
                                // dropDownOptions={ddo}
                            />
                            <div className="d-flex justify-content-center">
                                <Button
                                    disabled={obj.pet < 0 || pet === undefined || pet.status !== "available"}
                                    type="submit"
                                    id="btn1" className="btn btn-dark m-1">
                                    {pet === undefined || pet.status !== "available" ? <>
                                        <div>
                                            {pet === undefined ? <>
                                                This pet doesn't exist.</> : <>This pet is not available.</>}
                                        </div>
                                    </> : <>Submit</>}
                                </Button>
                            </div>
                        </Form></> : <p>Shelters cannot create applications.</p>}
                </Row>
            </Container>
        </>
    );
}

export default ApplicationCreate;