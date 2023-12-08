import {PassedInProps} from "../../shared/universal-interfaces";
import {Application} from "../../shared/application-interfaces";
import CommentCreateAppComponent from "../Comments/CommentApplicationComp";
import CommentListApp from "../Comments/CommentListApp";
import {Button} from "react-bootstrap";
import TextField from "../TextField";
import {useNavigate} from "react-router-dom";
import "./style.css"

function ApplicationComponentDetailless(props: PassedInProps<Application>) {
    const application = props.item;
    const navigate = useNavigate();
    return (
        <>
            {/* {JSON.stringify(props.item)}
             */}
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
                <div id="title">
                    <Button id="btn2" className="btn btn-dark m-1" onClick={() => {
                        navigate("/applications/detail/" + application.id);
                    }}>Details</Button>
                </div>
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

export default ApplicationComponentDetailless;