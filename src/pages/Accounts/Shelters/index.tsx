import React from "react";
import PaginatedList from "../../../components/PaginatedList";
import {PetPalUser} from "../../../shared/account-interfaces";
import {Container, Row} from "react-bootstrap";
import AccountDisplay from "../../../components/AccountDisplay";
import "./style.css"

function Shelters() {
    return (
        <>
            <Row id="title">
                <h2> Shelters </h2>
            </Row>
            <Container id="container3"
                       className="field justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">

                <Row>
                    <PaginatedList<PetPalUser> endpoint={"accounts/account/shelter"} route={"shelters"}
                                               node={AccountDisplay}/>
                </Row>
            </Container>
        </>
    )
}

export default Shelters;