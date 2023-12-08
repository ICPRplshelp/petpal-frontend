import {PassedInProps} from "../../shared/universal-interfaces";
import {PetPalUser} from "../../shared/account-interfaces";
import CommentListShelter from "../Comments/CommentListShelter";
import CommentCreateShelterComponent from "../Comments/CommentShelterComp";
import {Button, Image} from "react-bootstrap";
import TextField from "../TextField";
import {useNavigate} from "react-router-dom";
import "./style.css"
import React from "react";


function AccountDisplay(props: PassedInProps<PetPalUser>) {
    const user = props.item;
    const navigate = useNavigate();
    // console.log("My shelter passed in", props);
    return (
        <div>
            {/* {JSON.stringify(user)} */}
            <div id="container"
                 className="field justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                {user.avatar ? <>
                    <div className={"circle-container"}><Image src={user.avatar} alt="Your Image Alt Text" fluid/></div>
                </> : <></>}

                <TextField
                    disabled
                    aria-readonly
                    id="username"
                    label="Name"
                    className="form-control mb-3"
                    value={user.username}
                />
                <TextField
                    disabled
                    aria-readonly
                    id="email"
                    label="Email"
                    className="form-control mb-3"
                    value={user.email}
                />
                <TextField
                    disabled
                    aria-readonly
                    id="address"
                    label="Address"
                    className="form-control mb-3"
                    value={user.address}
                />
                <TextField
                    disabled
                    aria-readonly
                    id="phone"
                    label="Phone No."
                    className="form-control mb-3"
                    value={user.phone}
                />
                <div id="title">
                    <Button id="btn2" className="btn btn-dark m-1" onClick={() => {
                        navigate("/accounts/detail/" + user.id);
                    }}>Details</Button>
                </div>
            </div>
            {user.type === 'SHELTER' && props.route !== undefined ? <>
                <CommentListShelter
                    id={user.id}
                    route={props.route}
                />
                <CommentCreateShelterComponent id={user.id}/>
            </> : <></>}


        </div>
    )
}

export default AccountDisplay;