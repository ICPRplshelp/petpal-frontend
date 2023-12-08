import {PassedInProps} from "../../shared/universal-interfaces";
import {Pet} from "../../shared/pet-interfaces";
import {Button} from "@mui/material";
import TextField from "../TextField";
import {useNavigate} from "react-router-dom";
import "./style.css"

function PetComponent3(props: PassedInProps<Pet>) {
    const temp = props.item;
    const navigate = useNavigate();
    return (<div>
        {/* {JSON.stringify(temp)} */}
        <div id="container2" className="field justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
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
                {/* <div id="title">
                    <Button id="btn2" className="btn btn-dark m-1" onClick={() => { navigate("/pets/detail/" + temp.id);}}>Details</Button>
                    <Button id="btn_apply" className="btn m-1" onClick={() => { navigate("/applications/create/" + temp.id);}}>Apply</Button>
                </div> */}
            </div>
    </div>)
}

export default PetComponent3;