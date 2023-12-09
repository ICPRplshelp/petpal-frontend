import React, {FormEvent, useContext, useState} from "react";
import PaginatedList from "../../../components/PaginatedList";
import {Button, Container, Form, Row} from "react-bootstrap";
import PetComponent from "../../../components/Pet/index";
import {Pet} from "../../../shared/pet-interfaces";
import {bind} from "../../../shared/utilities";
import {useNavigate, useSearchParams} from "react-router-dom";
import "./style.css"
import { LoginInfoContext } from "../../../contexts/LoginInfoContext";

function removeEmptyOrFalseFromObj(params: Object) {
    for (let key in params) {
        // @ts-ignore
        // eslint-disable-next-line eqeqeq
        if (!params[key] || params[key] == 0) {
            // @ts-ignore
            delete params[key];
        }
    }
}


function PetSearch() {
    const [showFS, setShowFS] = useState(false);
    const toggleFS = () => {
        setShowFS(!showFS);
    }
    const {loginInfo} = useContext(LoginInfoContext);
    let [searchParams, setSearchParams] = useSearchParams();

    const [sortState, setSortState] = useState('');
    const [breedOfPet, setBreedOfPet] = useState('');
    const [age, setAge] = useState(0);
    const [color, setColor] = useState("");
    const [gender, setGender] = useState("");
    const [status, setStatus] = useState("available");
    const [name, setName] = useState("");
    const [shelterUsername, setShelterUsername] = useState("");
    const navigate = useNavigate();


    const handleSubmit = (e: FormEvent<never>) => {
        e.preventDefault();

        const params = {
            "name": name,
            "sort": sortState,
            "filter_status": status,
            "filter_breed": breedOfPet,
            "filter_age": age.toString(),
            "filter_color": color,
            "filter_gender": gender,
            "filter_shelter_username": shelterUsername
        }
        removeEmptyOrFalseFromObj(params);
        console.log(params);
        setSearchParams(params);
    }

    return (
        <div>
            <div id="title">Pets</div>
            <Container id='container'
                       className="justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <Button id="btn2" className="btn btn-dark m-1" onClick={toggleFS}>Filter / Sort</Button>
                {showFS ? <>
                    <Row className="field">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Shelter name:</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={shelterUsername}
                                    placeholder={"Shelter name"}
                                    onChange={bind(setShelterUsername)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Name of pet:</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={name}
                                    placeholder={"John"}
                                    onChange={bind(setName)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Breed:</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={breedOfPet}
                                    placeholder={"Dog"}
                                    onChange={bind(setBreedOfPet)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Age:</Form.Label>
                                <Form.Control
                                    type={"number"}
                                    value={age}
                                    placeholder={"3"}
                                    onChange={bind(setAge)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Color:</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={color}
                                    placeholder={"Green"}
                                    onChange={bind(setColor)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Gender:</Form.Label>
                                <Form.Control
                                    type={"text"}
                                    value={gender}
                                    placeholder={"Male"}
                                    onChange={bind(setGender)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Status:</Form.Label>
                                <Form.Control
                                    as={"select"}
                                    value={status}
                                    onChange={bind(setStatus)}
                                >
                                    <option value={"available"}>Available</option>
                                    <option value={"withdrawn"}>Withdrawn</option>
                                    <option value={"pending"}>Pending</option>

                                </Form.Control>
                            </Form.Group>


                            <Form.Group>
                                <Form.Label>Sort by:</Form.Label>
                                <Form.Control
                                    as={"select"}
                                    value={sortState}
                                    onChange={bind(setSortState)}
                                >
                                    <option value={""}>None</option>
                                    <option value={"age"}>Age</option>
                                    <option value={"size"}>Size</option>

                                </Form.Control>
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button
                                    // type="submit"
                                    type="submit"
                                    id="btn1" className="btn btn-dark m-1">
                                    Filter
                                </Button>
                            </div>
                            {/* <a id="btn1" type="submit" className="btn btn-dark align-self-center" role="button"> <h5>Filter</h5> </a> */}

                        </Form>
                        {/* <Typography>
                            Surely this will work, right?
    
    
                        </Typography> */}
                    </Row>
                </> : <></>}
            </Container>
            <div>
                <div id="title">Listing</div>
                <div id="title">
                    <Button disabled={loginInfo.currentUser?.type === "SEEKER" ?? true}
                    id="btn_apply" className="btn btn-dark m-1" onClick={() => {
                        navigate("/pets/new/");
                    }}>Add Pet</Button>
                </div>
                <Row id="container"
                     className="field justify-content-center mt-2 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                    <PaginatedList<Pet> endpoint={"pets"} route={"pets/search"} node={PetComponent}
                                        searchParams={searchParams}
                    />
                </Row>
            </div>
        </div>


    )
}

export default PetSearch;