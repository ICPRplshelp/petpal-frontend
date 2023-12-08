import {Button} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import axios from "axios";
import {getBE, redirLoginIfLoggedOut, swalFire} from "../../../shared/utilities";
import {useNavigate} from "react-router-dom";
import "./style.css"

function AccountDelete() {
    const {loginInfo} = useContext(LoginInfoContext);

    const navigate = useNavigate();

    useEffect(() => {
        redirLoginIfLoggedOut(navigate, loginInfo).then(() => {
        });
    });
    const handleDelete = () => {
        axios.delete(
            `${getBE()}/accounts/account/`,
            {
                headers: {
                    Authorization: `Bearer ${loginInfo.token}`
                }
            }
        ).then(() => {
            swalFire("Success!", "Account deleted", navigate, "/");
            // navigate("/")
        });
    }

    return (
        <>
            <div id="container"
                 className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <h1>Delete account</h1>
                <p>You sure about that?</p>
                <Button variant="danger" onClick={handleDelete}>
                    Delete
                </Button>
                <Button onClick={() => {
                    navigate("/accounts/me");
                }}>
                    Cancel
                </Button>
            </div>
        </>
    );
}

export default AccountDelete;