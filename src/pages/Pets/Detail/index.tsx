import {useContext, useEffect, useState} from "react";
import {Pet} from "../../../shared/pet-interfaces";
import {NavigateFunction, useNavigate, useParams} from "react-router-dom";
import {authAPI, getBE, navigateLoginUnauthorized} from "../../../shared/utilities";
import axios from "axios";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import PetComponentInDetail from "../../../components/Pet/index2";
import {LoginInfo} from "../../../shared/account-interfaces";
import "./style.css"

const PET_AVAILABLE = "available";

function newPet(): Pet {
    return {
        id: 0,
        shelter_id: 0,
        location: "",
        name: "",
        breed: "",
        age: 0,
        gender: "",
        size: 0,
        color: "",
        description: "",
        status: PET_AVAILABLE,
        medical_history: "",
        behavior: "",
        special_needs: "",
        shelter_name: "",
        shelter_user_id: 0
    };
}

function iNeedMyPet(endpoint: string, id: string | undefined, loginInfo: LoginInfo, setObj: (value: (((prevState: Pet) => Pet) | Pet)) => void, navigate: NavigateFunction) {
    const url = `${getBE()}/${endpoint}/${id}/`;
    if (id !== undefined) {
        axios.get<Pet>(url, authAPI(loginInfo)).then(resp => {
            setObj(resp.data);
        }).catch(e => {
            navigateLoginUnauthorized(navigate, e);
        });
    }
}

function PetDetail() {
    const {loginInfo} = useContext(LoginInfoContext);
    const [obj, setObj] = useState<Pet>(newPet());
    const {id} = useParams<{ id: string | undefined }>();
    const navigate = useNavigate();
    const endpoint = "pets";
    useEffect(() => {
        iNeedMyPet(endpoint, id, loginInfo, setObj, navigate);
    }, [id, loginInfo, navigate]);

    return (
        <>
            <div id="title">Pet Details</div>
            <div id="container5" className="justify-content-center mt-2 mb-5 ml-2 mr-2 p-2">
                <div className="field">
                    <PetComponentInDetail item={obj}></PetComponentInDetail>
                </div>
            </div>
        </>
    );
}

export default PetDetail;