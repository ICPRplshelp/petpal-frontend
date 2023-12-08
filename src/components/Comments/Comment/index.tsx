import {CommentT} from "../../../shared/comment-interfaces";
import {PassedInProps} from "../../../shared/universal-interfaces";
import TextField from "../../TextField";
import "./style.css"

function CommentComponent({item}: PassedInProps<CommentT>) {
    // const user = item;
    return (
        <>
            {/* {JSON.stringify(item)} */}

            <div id="container2"
                 className="field justify-content-center mt-5 mb-5 ml-2 mr-2 p-2 border border-dark rounded border-2">
                <TextField
                    disabled
                    aria-readonly
                    id="sender"
                    label="Sender"
                    className="form-control mb-3"
                    value={item.user}
                />
                <TextField
                    disabled
                    aria-readonly
                    id="content"
                    label="Content"
                    className="form-control mb-3"
                    value={item.content}
                />
                {item.shelter !== undefined ? <>
                    <TextField
                        disabled
                        aria-readonly
                        id="rating"
                        label="Rating"
                        className="form-control mb-3"
                        value={item.rating}
                    />
                </> : <></>}
            </div>
        </>
    );
}

export default CommentComponent;