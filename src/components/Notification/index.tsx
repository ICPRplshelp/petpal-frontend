import {Alert, Container} from "react-bootstrap";
import {useContext, useEffect, useState} from "react";
import {NotificationPetPal} from "../../shared/notification-interfaces";
import axios from "axios";
import {getBE, navigateLoginUnauthorized} from "../../shared/utilities";
import {useNavigate} from "react-router-dom";
import {LoginInfoContext} from "../../contexts/LoginInfoContext";
import {PassedInProps} from "../../shared/universal-interfaces";
import JumpTo from "./jump_to";


function Notification(props: PassedInProps<NotificationPetPal>) {

    const notif = props.item;

    const [read, setRead] = useState(notif.read ?? false);
    const notification = notif ?? {
        link: "/",
        author: 1,
        pk: 1,
        subject: "Placeholder",
        content: "Placeholder",
        read: false,
        created: "",
        comment_id: 1,
        application_id: null,
    };
    const {loginInfo} = useContext(LoginInfoContext);
    let navigate = useNavigate();
    // mark as read on sight
    useEffect(() => {
        if (read) {
            return;
        }
        const asf = async () => {
            try {
                await axios.patch(
                    `${getBE()}/notifications/${notification.id}/`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${loginInfo.token}`
                        }
                    }
                );
            } catch (e) {
                navigateLoginUnauthorized(navigate, e);
            }
        }
        asf().catch(() => {
        });
    }, [loginInfo.token, navigate, notification.id, read]);
    const [deleted, setDeleted] = useState(false);
    /**
     * Deletes the notification targeted.
     */
    const deleteMe = () => {

        axios.delete(`${getBE()}/notifications/${notification.id}/`,
            {
                headers: {
                    Authorization: `Bearer ${loginInfo.token}`
                }
            }
        ).then(() => {
            setDeleted(true);
        }).catch(e => {
            // I give up I'm doing nothing here
        });
    }

    return (<>
            {deleted ?
                <Alert variant={"dark"} className="border border-dark border-3">
                    <Container>
                        <h4> Deleted </h4>
                    </Container>
                </Alert>
                :
                <Alert variant={read ? "secondary" : "primary"} className="border border-dark border-3">
                    <Container>
                        <h4> {notification?.subject ?? "No subject"} {read ? "" : "•"} </h4>
                        <p> {notification?.content ?? "No content"} </p>
                        <div className="d-flex justify-content-end">

                            <JumpTo notification={notif}/>

                            <button onClick={deleteMe}
                                    type="button" className="close bg-transparent border border-0" data-dismiss="alert"
                                    aria-label="Close">
                                <span aria-hidden="true"> <h5> &times; </h5> </span>
                            </button>
                        </div>
                    </Container>
                </Alert>
            }</>
    )
}

export default Notification;