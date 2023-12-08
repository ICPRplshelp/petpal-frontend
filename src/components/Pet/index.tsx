import {PassedInProps} from "../../shared/universal-interfaces";
import {Pet} from "../../shared/pet-interfaces";
import {useNavigate} from "react-router-dom";
import "./style.css"
import TextField from "../TextField";
import {Button} from "react-bootstrap";
import {LoginInfoContext} from "../../contexts/LoginInfoContext";
import {useContext} from "react";

function PetComponent(props: PassedInProps<Pet>) {
    const {loginInfo} = useContext(LoginInfoContext);
    const isShelter = loginInfo.currentUser?.type === "SHELTER";

    const temp = props.item;
    const navigate = useNavigate();
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
                id="status"
                label="Status"
                className="form-control mb-3"
                value={temp.status}
            />
            <div id="title">
                <Button id="btn2" className="btn btn-dark m-1" onClick={() => {
                    navigate("/pets/detail/" + temp.id);
                }}>Details</Button>
                { !isShelter ? <>
                    <Button id="btn_apply" className="btn m-1" onClick={() => {
                        navigate("/applications/create/" + temp.id);
                    }}>Apply</Button>
                </> :

                    // <Button id="btn2" className="btn btn-dark m-1" onClick={() => { navigate("/pets/update/" + temp.id);}}>Update</Button>

                    <></>
                }
            </div>
        </div>
    </div>)
}

export default PetComponent;