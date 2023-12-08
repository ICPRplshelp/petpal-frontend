import PaginatedList from "../../PaginatedList";
import {CommentT} from "../../../shared/comment-interfaces";
import CommentComponent from "../Comment";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import "./style.css"

function CommentListShelter({id, route}: { id: number, route: string }) {
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setSearchParams({
            shelter_id: id.toString()
        });

    }, [id, setSearchParams]);

    return (
        <>
            <div id="container" className="field justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <h2>Comments</h2>
                {
                    // eslint-disable-next-line eqeqeq
                    (searchParams.get("shelter_id") == id.toString()) ? <>
                        <PaginatedList<CommentT>
                            endpoint={"comments"}
                            route={route}
                            node={CommentComponent}
                            searchParams={searchParams}
                        ></PaginatedList>
                    </> : <></>}
            </div>
        </>
    );
}

export default CommentListShelter;