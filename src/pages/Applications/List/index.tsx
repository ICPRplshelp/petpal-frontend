import {Button, Container, Form, Row} from "react-bootstrap";
import PaginatedList from "../../../components/PaginatedList";
import React, {FormEvent, useState} from "react";
import {Application} from "../../../shared/application-interfaces";
import ApplicationComponentDetailless from "../../../components/Application";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AsString, DropDownOption} from "../../../shared/universal-interfaces";
import {getB} from "../../../shared/utilities";
import FormFields from "../../../components/FormFields";
import "./style.css"

// all fields are optional
type ApplicationSearchSettings = {
    pet_name: string,
    application_status: string,
    sort: string, // created_time, last_update_time
}

function getEmptySearchSettings(): ApplicationSearchSettings {
    return {
        pet_name: "",
        application_status: "",
        sort: ""
    }
}

function getEmptySearchSettingsERR(): AsString<ApplicationSearchSettings> {
    return {
        pet_name: "",
        application_status: "",
        sort: ""
    }
}

// WHO USES VANILLA JS TO UPDATE A REACT COMPONENT


function ApplicationsList() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [obj, setObj] = useState<ApplicationSearchSettings>(getEmptySearchSettings());
    const [err, _] = useState<AsString<ApplicationSearchSettings>>(getEmptySearchSettingsERR());
    const navigate = useNavigate();
    // const endpoint = "applications";
    // const url = `${getBE()}/${endpoint}/`;
    // const navigate = useNavigate();
    const optional: (keyof ApplicationSearchSettings)[] = [
        "pet_name",
        "application_status",
        "sort",
    ];
    const ddo: DropDownOption<ApplicationSearchSettings>[] = [
        {
            field: "application_status",
            options: [
                {actual: "", display: ""},
                {actual: "accepted", display: "Accepted"},
                {actual: "denied", display: "Denied"},
                {actual: "pending", display: "Pending"},
                {actual: "withdrawn", display: "Withdrawn"}
            ]
        },
        {
            field: "sort",
            options: [
                {actual: "", display: ""},
                {actual: "created_time", display: "Last Created"},
                {actual: "last_update_time", display: "Last Updated"},
            ]
        }
    ]
    const handleSubmit = (e: FormEvent<never>) => {
        e.preventDefault();
        setSearchParams(obj);
    }
    const b = getB<ApplicationSearchSettings>(obj, setObj);
    const [visible, setVisible] = useState<boolean>(false);
    return (
        <>
            <Row id="title"><h2>Applications</h2></Row>
            <Container id='container'
                       className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <Button id="btn2" className="btn btn-dark m-1" onClick={() => {
                    setVisible(!visible)
                }}>Filter / Sort</Button>
                {visible ? <>
                    <Row className="field">
                        <Form onSubmit={handleSubmit}>
                            <FormFields
                                optional={optional}
                                obj={obj}
                                err={err}
                                binder={b}
                                dropDownOptions={ddo}
                            />
                            <div className="d-flex justify-content-center">
                                <Button
                                    type="submit"
                                    id="btn1" className="btn btn-dark m-1">
                                    Filter
                                </Button>
                            </div>
                        </Form>

                    </Row>
                </> : <></>}
            </Container>
            <div>
                <Row id="container"
                     className="field justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                    <h4 id="title">Results</h4>
                    <PaginatedList<Application> endpoint={"applications"} route={"applications"}
                                                node={ApplicationComponentDetailless}
                                                searchParams={searchParams}
                    />
                </Row>
            </div>
        </>
    );
}

export default ApplicationsList;