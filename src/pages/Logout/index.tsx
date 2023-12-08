import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {LoginInfoContext} from "../../contexts/LoginInfoContext";

function Logout() {
    const navigate = useNavigate();
    const {setLoginInfo} = useContext(LoginInfoContext);

    useEffect(() => {
        setLoginInfo({
            token: "",
            refresh: "",
            currentUser: undefined
        });

        navigate("/login");

    }, [navigate, setLoginInfo]);
    return (
        <>
            Logging out!
        </>
    );
}

export default Logout;