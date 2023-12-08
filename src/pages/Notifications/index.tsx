import {Button, Container, Form, Row} from "react-bootstrap";
import Notification from "../../components/Notification";
import React, {FormEvent, useState} from "react";
import {NotificationPetPal} from "../../shared/notification-interfaces";
import PaginatedList from "../../components/PaginatedList";
import "./style.css"
import FormFields from "../../components/FormFields";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AsString, DropDownOption} from "../../shared/universal-interfaces";
import {getB} from "../../shared/utilities";


interface NSS {
    sort: string;//"creation" | "";
    filter: string;//"read" | "unread" | "";
}

function newNSS(): NSS {
    return {
        sort: "",
        filter: ""
    }
}

function newNSSE(): AsString<NSS> {
    return {
        sort: "",
        filter: ""
    }
}

function Notifications() {
    // TODO: Sort, Filter. See Pet listing implementation for how to do them
    let [searchParams, setSearchParams] = useSearchParams();
    const [obj, setObj] = useState<NSS>(newNSS());
    const [err, _f] = useState<AsString<NSS>>(newNSSE());
    const navigate = useNavigate();
    const optional: (keyof NSS)[] = [
        "sort",
        "filter"
    ];
    const b = getB<NSS>(obj, setObj);
    const ddo: DropDownOption<NSS>[] = [
        {
            field: "sort",
            options: [
                {actual: "", display: "None"},
                {actual: "creation", display: "Newest First"},
            ]
        },
        {
            field: "filter",
            options: [
                {actual: "", display: "None"},
                {actual: "unread", display: "Unread"},
                {actual: "read", display: "Read"},
            ]
        }
    ];
    const handleSubmit = (e: FormEvent<never>) => {
        e.preventDefault();
        setSearchParams({
            ...obj
        });
    }

    return (
        <Container id="container"
                   className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
            <Row>
                <h2 id="title"> Notifications </h2>
            </Row>
            <Row>
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
            <Row>
                <PaginatedList<NotificationPetPal> endpoint={"notifications"} route={"notifications"}
                                                   node={Notification}
                                                   searchParams={searchParams}
                />
            </Row>
        </Container>
    )
}

export default Notifications;