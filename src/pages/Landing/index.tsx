import "./style.css"
import {useNavigate} from "react-router-dom";

function Landing() {
    const navigate = useNavigate();
    return (
        <div className="container-fluid">
            <div className="row heading p-5">
                <p className="text-center"> Welcome to PetPal! </p>
            </div>

            <div className="row" id="seeker_section">
                <div className="col-sm-12 col-md-4">
                    <img id="logo" src={process.env.PUBLIC_URL + "/images/seeker.png"} alt="logo"/>
                </div>

                <div className="col-sm-12 col-md-8 align-self-center">
                    <div className="row pt-3 d-flex text-center">
                        <h1> It is not just people who need a home </h1>
                        <h2> Find your new family member </h2>
                    </div>

                    <div className="row pt-3 pb-4" id="seeker_button">
                        <a className="btn btn-dark align-self-center" onClick={() => {
                            navigate("register")
                        }} role="button"><h4> Start Your Journey </h4></a>
                    </div>
                </div>
            </div>

            <div className="row" id="shelter_section">
                <div className="col-sm-12 col-md-7 align-self-center">
                    <div className="row pt-3 d-flex text-center">
                        <h2> Do you want your pets adopted? </h2>
                        <h3> You have come at the right place </h3>
                    </div>

                    <div className="row pt-3 pb-4" id="seeker_button">
                        <a className="btn btn-dark align-self-center" onClick={()=>{navigate("register")}} role="button"><h5> Click
                            Here </h5></a>
                    </div>
                </div>

                <div className="col-sm-12 col-md-5">
                    <img id="logo" src={process.env.PUBLIC_URL + "/images/shelter.png"} alt="logo"/>
                </div>
            </div>

            <div className="row">
                <div className="col-sm-12 col-md-6 d-flex justify-content-end p-5">
                    <p className="facts font-weight-bold"> 500+ </p>
                    <h3> Pets Adopted </h3>
                </div>

                <div className="col-sm-12 col-md-6 d-flex justify-content-start p-5">
                    <p className="facts font-weight-bold"> 20+ </p>
                    <h3> Shelters Associated </h3>
                </div>
            </div>
        </div>
    );
}

export default Landing;