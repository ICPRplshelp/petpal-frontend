import {Pet} from "../../../shared/pet-interfaces";
import React, {FormEvent, useContext, useEffect, useState} from "react";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import {
    authAPI,
    bind2,
    constructErrorsFromResponse,
    getBE,
    navigateLoginUnauthorized,
    swalFire
} from "../../../shared/utilities";
import axios, {AxiosError} from "axios";
import {Button, Container, Form, Row} from "react-bootstrap";
import {AsString, DropDownOption} from "../../../shared/universal-interfaces";
import FormFields from "../../../components/FormFields";
import {useNavigate, useParams} from "react-router-dom";


const PET_AVAILABLE = "available";


function newPetErr(): AsString<Pet> {
    return {
        id: "",
        shelter_id: "",
        location: "",
        name: "",
        breed: "",
        age: "",
        gender: "",
        size: "",
        color: "",
        description: "",
        status: "",
        medical_history: "",
        behavior: "",
        special_needs: "",
        shelter_name: "",
        shelter_user_id: ""
    };
}

function newPet(): Pet {
    return {
        id: 0,
        shelter_id: 0,
        location: "",
        name: "",
        breed: "",
        age: 0,
        gender: "",
        size: 0,
        color: "",
        description: "",
        status: PET_AVAILABLE,
        medical_history: "",
        behavior: "",
        special_needs: "",
        shelter_name: "",
        shelter_user_id: 0
    };
}

function UpdatePet() {
    const mandatoryPetFields: (keyof Pet)[] = [
        "name",
        "breed",
        "age",
        "gender",
        "size",
        "status",
    ];
    const optionalPetFields: (keyof Pet)[] = [
        "location",
        "behavior",
        "color",
        "description",
        "medical_history",
        "special_needs"
    ];
    const largeFields: (keyof Pet)[] = [
        "description",
        "medical_history",
        "special_needs"
    ];
    const disabled: (keyof Pet)[] = [
        "location"
    ]
    const ddo: DropDownOption<Pet>[] = [

        {
            field: "status",
            options: [
                {
                    actual: "available", display: "Available"
                },
                {
                    actual: "adopted", display: "Adopted"
                },
                {
                    actual: "pending", display: "Pending"
                },
                {
                    actual: "withdrawn", display: "Withdrawn"
                }

            ]
        }
    ];
    const {loginInfo} = useContext(LoginInfoContext);

    const [obj, setObj] = useState<Pet>(newPet());
    const [err, setErr] = useState<AsString<Pet>>(newPetErr());

    const {id} = useParams<{ id: string | undefined }>();
    const navigate = useNavigate();

    const b = (target: keyof Pet) => {
        return bind2<Pet>(target, obj, setObj);
    }
    const endpoint = "pets";
    useEffect(() => {
        const url = `${getBE()}/${endpoint}/${id}/`;
        if (id !== undefined) {
            axios.get<Pet>(url, authAPI(loginInfo)).then(resp => {
                setObj(resp.data);
            }).catch(e => {
                navigateLoginUnauthorized(navigate, e);
            });
        }
    }, [id, loginInfo, navigate]);


    const handleSubmit = (e: FormEvent<never>) => {
        e.preventDefault();
        const url = `${getBE()}/${endpoint}/${id}/`;
        const errTemp = newPetErr();
        axios.patch<Pet>(url, obj, authAPI(loginInfo)).then(_ => {
            console.log("Whatever you made has been created created");
            setObj(newPet());
            setErr(newPetErr());
        }).then(
            (r) => {
                swalFire("Updated", "Pet successfully updated", navigate, "/pets/search");
            }
        ).catch((e: AxiosError) => {
            let resp: any = e.response?.data ?? {};
            constructErrorsFromResponse<Pet>(resp, errTemp);
            setErr(errTemp);
        });
    }


    return (
        <>
            <Container id="container"
                       className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <Row className="p-3">
                    <h1 className="d-flex justify-content-center">Update Pet</h1>
                </Row>
                <Row className="field">
                    <Form onSubmit={handleSubmit}>

                        <FormFields
                            mandatory={mandatoryPetFields}
                            optional={optionalPetFields}
                            obj={obj}
                            err={err}
                            binder={b}
                            largeFields={largeFields}
                            dropDownOptions={ddo}
                            disabled={disabled}
                        />
                        <div className="d-flex justify-content-center">
                            <Button
                                type="submit"
                                id="btn1" className="btn btn-dark m-1">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Row>
            </Container>
        </>
    );
}

export default UpdatePet;