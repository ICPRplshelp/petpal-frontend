/*

                <TextField
                    disabled
                    aria-readonly
                    id="sender"
                    label="Sender"
                    className="form-control mb-3"
                    value={item.user}
                />


 */

import {Container, Row} from "react-bootstrap";

type TextFieldProps = {
    id?: string;
    className?: string;
    label?: string | number;
    value?: string | number;
    disabled?: any;
    "aria-readonly"?: any;
}

function FauxTextField({label, value}: TextFieldProps) {
    return (
        <>
            <Container>
                <Row>
                    <h4> {label ?? ""} </h4>
                </Row>
                <Row>
                    <p> {value ?? ""} </p>
                </Row>
            </Container>
        </>
    );
}

export default FauxTextField;