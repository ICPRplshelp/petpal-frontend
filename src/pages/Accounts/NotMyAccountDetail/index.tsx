import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import {PetPalUser} from "../../../shared/account-interfaces";
import {getAccountFromID, navigateLoginUnauthorized} from "../../../shared/utilities";
import AccountDisplay from "../../../components/AccountDisplay";

function NotMyAccountDetail() {
    const navigate = useNavigate();
    const {loginInfo} = useContext(LoginInfoContext);
    const [user, setUser] = useState<PetPalUser>();
    const {id} = useParams<{ id: string | undefined }>();
    useEffect(() => {
            let num = parseInt(id ?? "");
            if (!isNaN(num)) {
                getAccountFromID(navigate, num, loginInfo.token).then(r => {
                    setUser(r);
                }).catch((e) => {
                    navigateLoginUnauthorized(navigate, e);
                });
            }
        }
        , [id, loginInfo.token, navigate]);

    return (
        <>
            {id !== undefined && user !== undefined ? <>
                <AccountDisplay item={user}
                                single={true}
                                route={`accounts/detail/${id}`}

                />
            </> : <></>}
        </>
    );
}

export default NotMyAccountDetail;