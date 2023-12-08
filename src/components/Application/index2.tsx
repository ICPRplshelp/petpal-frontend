import {PassedInProps} from "../../shared/universal-interfaces";
import {Application} from "../../shared/application-interfaces";
import CommentCreateAppComponent from "../Comments/CommentApplicationComp";
import CommentListApp from "../Comments/CommentListApp";
import TextField from "../TextField";
import {useNavigate} from "react-router-dom";
import "./style.css"
import {LoginInfoContext} from "../../contexts/LoginInfoContext";
import {useContext, useState} from "react";
import {Button, Col, Row} from "react-bootstrap";
import {getBE, swalFire} from "../../shared/utilities";
import axios from "axios";

type AppStates = "accepted" | "denied" | "pending" | "withdrawn" | "";

function ApplicationComponentInDetail(props: PassedInProps<Application>) {


    const applicationTemp = props.item;
    const [application, setApplication] = useState(applicationTemp);
    const navigate = useNavigate();
    const {loginInfo} = useContext(LoginInfoContext);
    const updateAppStatus = (newState: AppStates) => {
        axios.patch(`${getBE()}/applications/${application.id}/`, {
                application_status: newState
            },
            {
                headers: {
                    Authorization: `Bearer ${loginInfo.token}`
                }
            }
        ).then(r => {
            swalFire("Update successful", "Application updated");
            setApplication({
                ...application,
                application_status: newState
            });
        }).catch(
            () => console.log("Oops")
        );
    }
    const uacb = (newState: AppStates): (() => void) => {
        return () => {
            updateAppStatus(newState);
        };
    };

    return (
        <>
            {/* {JSON.stringify(props.item)}
             */}
            <div id="title">Application Details</div>
            <div id="container2"
                 className="field justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <TextField
                    disabled
                    aria-readonly
                    id="applicant"
                    label="Applicant"
                    className="form-control mb-3"
                    value={application.applicant_name}
                />
                <TextField
                    disabled
                    aria-readonly
                    id="pet"
                    label="Pet"
                    className="form-control mb-3"
                    value={application.pet_name}
                />
                <TextField
                    disabled
                    aria-readonly
                    id="reason"
                    label="Reason"
                    className="form-control mb-3"
                    value={application.reason}
                />
                <TextField
                    disabled
                    aria-readonly
                    id="status"
                    label="Status"
                    className="form-control mb-3"
                    value={application.application_status}
                />
            </div>

            <div>
                {loginInfo.currentUser?.type === "SEEKER" && application.application_status === "pending" ? <>
                    <Button variant="danger"
                            onClick={uacb("withdrawn")}
                    >Cancel</Button>
                </> : <></>}

                {loginInfo.currentUser?.type === "SHELTER" && application.application_status === "pending" ? <>
                    <Row>
                        <Col>
                            <Button
                                onClick={uacb("accepted")}
                            > Accept </Button>
                        </Col>
                        <Col>
                            <Button
                                onClick={uacb("denied")}
                                variant={"danger"}> Deny </Button>
                        </Col>
                    </Row>
                </> : <></>}
            </div>

            {props.single && props.route ? <>
                <CommentListApp
                    id={props.item.id}
                    route={props.route}
                />
                <CommentCreateAppComponent id={props.item.id}/>

            </> : <></>}
        </>
    );
}

export default ApplicationComponentInDetail;