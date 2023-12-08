import {Container} from "react-bootstrap";
import "./style.css";

function NotFound() {
    return (
        <>
            <Container className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2"><h1> 404 Not Found</h1>
                <p> Seems like this URL is invalid. Might want to try another page? </p>
            </Container>     </>
    );
}

export default NotFound;