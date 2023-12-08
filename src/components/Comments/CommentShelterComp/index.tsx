import {FormEvent, useContext, useState} from "react";

import {Button, Container, Form, Row} from "react-bootstrap";
import {CommentA} from "../../../shared/comment-interfaces";
import {AsString} from "../../../shared/universal-interfaces";
import {LoginInfoContext} from "../../../contexts/LoginInfoContext";
import {getB, getBE, submitAbstraction} from "../../../shared/utilities";
import FormFields from "../../FormFields";
import "./style.css"

interface CS extends CommentA {
    target_shelter_id: number;
}

function getDefaultObj(): CS {
    return {
        // target_application_id: 0,
        target_shelter_id: 0,
        content: "",
        rating: 0
    }
}

function getDefaultErr(): AsString<CS> {
    return {
        // target_application_id: "",
        target_shelter_id: "",
        content: "",
        rating: ""
    }
}


interface CCACProps {
    id: number
}

function CommentCreateShelterComponent({id}: CCACProps) {
    const mandatoryFields: (keyof CS)[] = [
        "content",
        "rating"
    ];
    const largeFields: (keyof CS)[] = [
        "content"
    ];
    const endpoint = "comments";
    const [obj, setObj] = useState<CS>(getDefaultObj());
    const [err, setErr] = useState<AsString<CS>>(getDefaultErr());
    const {loginInfo} = useContext(LoginInfoContext);
    const handleSubmit = (e: FormEvent<never>) => {
        e.preventDefault();
        obj.target_shelter_id = id;
        const getCS2 = (): CS => {
            return {
                "content":
                    "",
                target_shelter_id: obj.target_shelter_id,
                rating: 0
            }
        }
        const url = `${getBE()}/${endpoint}/`
        submitAbstraction<CS>(
            url, obj, loginInfo, setObj, setErr, getCS2,
            getDefaultErr
        ).then(() => {});
    }
    const b = getB<CS>(obj, setObj);
    return (
        <>
            <Container id="container"
                       className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <Row className="field">
                    {/*<h2>Post Comment to Application</h2>*/}
                    <Form onSubmit={handleSubmit}
                    >
                        <FormFields
                            mandatory={mandatoryFields}
                            largeFields={largeFields}
                            obj={obj}
                            err={err}
                            binder={b}></FormFields>
                        <div className="d-flex justify-content-center">
                            <Button
                                disabled={id === undefined}
                                type={"submit"}
                            >Submit Comment</Button>
                        </div>

                    </Form>
                </Row>
            </Container>
        </>
    );
}

export default CommentCreateShelterComponent;