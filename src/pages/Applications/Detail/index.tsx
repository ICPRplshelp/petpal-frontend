import {useNavigate, useParams} from "react-router-dom";
import ApplicationComponentInDetail from "../../../components/Application/index2";
import {authAPI, getBE, navigateLoginUnauthorized, numValid} from "../../../shared/utilities";
import {Application} from "../../../shared/application-interfaces";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import "./style.css"

function ApplicationDetail() {
    const {loginInfo} = useContext(LoginInfoContext);
    const navigate = useNavigate();
    const {id} = useParams<{ id: string | undefined }>();
    const [app, setApp] = useState<Application>();
    useEffect(() => {
        if (numValid(id)) {
            const url = `${getBE()}/applications/${id}/`;
            console.log(url);
            axios.get<Application>(
                url,
                authAPI(loginInfo)
            ).then(r => {
                setApp(r.data)
            }).catch(e => {
                navigateLoginUnauthorized(navigate, e);
            });
        }
    }, [id, loginInfo, navigate]);

    return (
        <>
            <div id="container" className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                {app !== undefined && id !== undefined ? <>
                    <ApplicationComponentInDetail item={app}
                                                  single={true}
                                                  route={`applications/detail/${id}`}
                    ></ApplicationComponentInDetail>
                </> : <></>}
            </div>
        </>
    );
}

export default ApplicationDetail;