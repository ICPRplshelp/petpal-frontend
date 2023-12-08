import {NotificationPetPal} from "../../shared/notification-interfaces";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {authAPI, getBE} from "../../shared/utilities";
import {LoginInfoContext} from "../../contexts/LoginInfoContext";
import {CommentT} from "../../shared/comment-interfaces";
import {useContext} from "react";


function notNullUndef(item: any): boolean {
    return item !== null && item !== undefined;
}

function JumpTo({notification}: { notification: NotificationPetPal }) {
    const navigate = useNavigate();
    const {loginInfo} = useContext(LoginInfoContext);
    const actuallyShowIt = notNullUndef(notification.application_id) || notNullUndef(notification.comment_id);
    return (
        <>
            {actuallyShowIt ? <>
                <Button onClick={() => {
                    if (notification.application_id !== null) {
                        navigate(`/applications/detail/${notification.application_id}`);
                    } else if (notification.comment_id !== null) {
                        // fetch the comment
                        axios.get<CommentT>(`${getBE()}/comments/${notification.comment_id}/`,
                            authAPI(loginInfo)).then((r) => {
                            const comm = r.data;
                            if (notNullUndef(comm.application)) {
                                navigate(`/applications/detail/${comm.application}`)
                            } else if (notNullUndef(comm.shelter_id)) {
                                navigate(`/accounts/me`);
                            } else {
                                console.log("the heck", comm.shelter_id, comm.application);
                            }
                        })
                        ;
                    }
                }}>
                    Jump
                </Button>
            </> : <></>}
        </>
    );
}

export default JumpTo;