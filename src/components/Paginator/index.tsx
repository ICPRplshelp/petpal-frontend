import Button from "react-bootstrap/esm/Button";
import {clamp, PAGE_SIZE} from "../../shared/utilities";
import {Col, Container, Row} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


interface PaginatorProps {
    // what page am I on?
    curPage: number;
    // how many elements are there in total?
    totalElements: number;
    // what is the link before the pagination, with NO leading or trailing slash?
    route: string;
    // the name of the resource in plural, optional
    resource?: string;
    // search parameters
    searchParams?: URLSearchParams;

}

/**
 * Place this for any paginated page, and insert all props. Read the interface for its props carefully.
 * @param props
 * @constructor
 */
function Paginator(props: PaginatorProps) {
    // PAGE_SIZE;
    let pages = Math.ceil(props.totalElements / PAGE_SIZE);
    if (isNaN(pages)) {
        pages = 9999;
    }
    const nothingMessage = props.resource ? `There are no ${props.resource} as of right now. If this is a searched field, change your filters.` : `This is empty! If this is a searched field, change your filters.`
    const navigate = useNavigate();
    const redirectPage = (page: number) => {
        navigate(`/${props.route}/${clamp(page, 0, pages)}?${props.searchParams?.toString() ?? ""}`);
    }
    return <div>
        <Container>
            <Row className="align-content-start align-items-center">
                <Col>
                    {pages === 0 ? <>{nothingMessage}</> : <>Page {props.curPage} of {pages}</>}
                </Col>
                <Col>
                    <Button disabled={props.curPage <= 1} variant={"primary"}
                            onClick={() => redirectPage(props.curPage - 1)}>
                        Previous
                    </Button>
                </Col>
                <Col>
                    <Button disabled={props.curPage >= pages} variant={"primary"}
                            onClick={() => redirectPage(props.curPage + 1)}>
                        Next
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>
}

export default Paginator;