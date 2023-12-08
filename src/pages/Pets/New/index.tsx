import {Button, Container, Form, Row} from "react-bootstrap";
import React, {FormEvent, useContext, useState} from "react";
import {Pet} from "../../../shared/pet-interfaces";
import {AsString} from "../../../shared/universal-interfaces";
import {getB, getBE, submitAbstraction} from "../../../shared/utilities";
import {FormFields} from "../../../components/FormFields";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import "./style.css"

const PET_AVAILABLE = "available";


function newPetErr(): PetErr {
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


type PetErr = AsString<Pet>;


function NewPetListing() {
    const mandatoryPetFields: (keyof Pet)[] = [
        "name",
        "breed",
        "age",
        "gender",
        "size",
        "location",
    ];
    const optionalPetFields: (keyof Pet)[] = [
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
    // const ddo: DropDownOption<Pet>[] = [
    //     /*
    //     {
    //         field: "status",
    //         options: [{
    //             actual: "", display: ""
    //         },
    //             {
    //             actual: "available", display: "Available"
    //         }]
    //     } */
    // ];
    const {loginInfo} = useContext(LoginInfoContext);

    const [obj, setObj] = useState<Pet>(newPet());
    const [err, setErr] = useState<PetErr>(newPetErr());
    const b = getB<Pet>(obj, setObj);
    // const b = (target: keyof Pet) => {
    //     return bind2<Pet>(target, obj, setObj);
    // }
    const endpoint = "pets"
    const url = `${getBE()}/${endpoint}/`

    const handleSubmit = (e: FormEvent<never>) => {
        e.preventDefault();
        submitAbstraction<Pet>(url, obj, loginInfo, setObj, setErr, newPet, newPetErr).then(() => {});
    }


    return (
        <>
            <Container id='container'
                       className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <Row className="p-3">
                    <h1 className="d-flex justify-content-center">New Pet Listing</h1>
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
                            // dropDownOptions={ddo}
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

export default NewPetListing;