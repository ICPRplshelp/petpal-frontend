import {PassedInProps} from "../../shared/universal-interfaces";
import {Pet} from "../../shared/pet-interfaces";
import TextField from "../TextField";
import {useNavigate} from "react-router-dom";
import {Button, Col, Container, Row} from "react-bootstrap";
import "./style.css"
import {useContext} from "react";
import {LoginInfoContext} from "../../contexts/LoginInfoContext";

function PetComponentInDetail(props: PassedInProps<Pet>) {
    const temp = props.item;
    const navigate = useNavigate();
    const {loginInfo} = useContext(LoginInfoContext);
    const isShelter = loginInfo.currentUser?.type === "SHELTER";
    const iOwnThisPet = loginInfo.currentUser?.id === temp.shelter_user_id;



    return (<div>
        {/* {JSON.stringify(temp)} */}
        <div id="container2"
             className="field justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
            <TextField
                disabled
                aria-readonly
                id="petname"
                label="Name"
                className="form-control mb-3"
                value={temp.name}
            />
            <TextField
                disabled
                aria-readonly
                id="breed"
                label="Breed"
                className="form-control mb-3"
                value={temp.breed}
            />
            <TextField
                disabled
                aria-readonly
                id="age"
                label="Age"
                className="form-control mb-3"
                value={temp.age}
            />
            <TextField
                disabled
                aria-readonly
                id="size"
                label="Size"
                className="form-control mb-3"
                value={temp.size}
            />
            <TextField
                disabled
                aria-readonly
                id="gender"
                label="Gender"
                className="form-control mb-3"
                value={temp.gender}
            />
            <TextField
                disabled
                aria-readonly
                id="color"
                label="Color"
                className="form-control mb-3"
                value={temp.color}
            />
            <TextField
                disabled
                aria-readonly
                id="location"
                label="Location"
                className="form-control mb-3"
                value={temp.location}
            />
            <TextField
                disabled
                aria-readonly
                id="behaviour"
                label="Behaviour"
                className="form-control mb-3"
                value={temp.behavior}
            />
            <TextField
                disabled
                aria-readonly
                id="description"
                label="Description"
                className="form-control mb-3"
                value={temp.description}
            />
            <TextField
                disabled
                aria-readonly
                id="medical_history"
                label="Medical History"
                className="form-control mb-3"
                value={temp.medical_history}
            />
            <TextField
                disabled
                aria-readonly
                id="special_needs"
                label="Special Needs"
                className="form-control mb-3"
                value={temp.special_needs}
            />

            <Container className="justify-content-start"><Row>
                <Col>
                    <TextField
                        disabled
                        aria-readonly
                        id="shelter"
                        label="Shelter"
                        className="form-control mb-3"
                        value={temp.shelter_name}
                    />
                </Col>
                <Col>
                    <Button id="btn3" className="btn btn-dark" onClick={() => {
                        navigate("/accounts/detail/" + temp.shelter_id);
                    }}>Link to Shelter Info</Button>
                </Col>
            </Row></Container>

            <TextField
                disabled
                aria-readonly
                id="status"
                label="Status"
                className="form-control mb-3"
                value={temp.status}
            />


            <div id="title">
                {/* <Button id="btn2" className="btn btn-dark m-1" onClick={() => { navigate("/pets/detail/" + temp.id);}}>Details</Button> */}

                {isShelter ? <>
                    { iOwnThisPet ? <>
                        <Button id="btn2" className="btn btn-dark m-1" onClick={() => {
                            navigate("/pets/update/" + temp.id);
                        }}>Update</Button>
                    </> : <></> }

                </> : <Button id="btn_apply" className="btn m-1" onClick={() => {
                    navigate("/applications/create/" + temp.id);
                }}>Apply</Button>}


                <Button id="btn2" className="btn btn-dark m-1" onClick={() => {
                    navigate("/pets/search/" + temp.id);
                }}>Back</Button>
            </div>
        </div>
    </div>)
}

export default PetComponentInDetail;