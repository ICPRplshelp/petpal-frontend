import {PetPalUser} from "../../../shared/account-interfaces";
import {useContext, useEffect, useState} from "react";
import {getAccountFromID} from "../../../shared/utilities";
import {useNavigate} from "react-router-dom";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import AccountDisplay from "../../../components/AccountDisplay";
import {Button} from "react-bootstrap";
import "./style.css"

function MyAccountDetail() {
    const navigate = useNavigate();
    const {loginInfo} = useContext(LoginInfoContext);
    const [user, setUser] = useState<PetPalUser>();
    useEffect(() => {
        const fn = async () => {
            if (loginInfo.currentUser === undefined) {
                navigate("/login");
                return;
            }
            const account = await getAccountFromID(navigate, loginInfo.currentUser.id, loginInfo.token);
            setUser(account);
        }
        fn().then(() => {
        });
    }, [loginInfo.currentUser, loginInfo.token, navigate]);


    return (<div>
        <div id="title">Account Info</div>
        <div id="title">
            <Button id="btn2" className="btn btn-dark m-1" onClick={() => {
                navigate("/accounts/update");
            }}>Update Account Info</Button>
            <Button variant="danger" className="btn m-1" onClick={() => {
                navigate("/accounts/delete");
            }}>Delete Account</Button>
        </div>
        {user !== undefined ? <>
            <AccountDisplay item={user} single={true} route={"accounts/me"}/>
        </> : <></>}
    </div>);
}

export default MyAccountDetail;