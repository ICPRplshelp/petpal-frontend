import {useNavigate, useParams} from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import {LoginInfoContext} from "../../contexts/LoginInfoContext";
import {Paginated, PassedInProps} from "../../shared/universal-interfaces";
import axios from "axios";
import {getBE, navigateLoginUnauthorized, PAGE_SIZE} from "../../shared/utilities";
import {Container, Row} from "react-bootstrap";
import Paginator from "../Paginator";


function getSearchObj(searchParams: URLSearchParams | undefined) {
    let searchObj = {};
    if (searchParams !== undefined) {
        searchObj = Object.fromEntries(searchParams.entries());
    }
    return searchObj;
}


interface PaginatedListProps<T> {
    // Endpoint of the API - No trailing or leading slash
    endpoint: string;
    // Route to the current page - No leading or trailing slash
    route: string;
    // the element to pass in, which must always accept one prop: {item: T}
    node: React.ComponentType<PassedInProps<T>>;
    // additional parameters for searching
    searchParams?: URLSearchParams;
}

/**
 * A generic component that encapsulates the logic of any endpoint that has a list.
 * T is the type of each element that you want to list. E.g. shelter, notification.
 *
 * Node: the element to pass in, which must always accept one prop: {item: T}.
 * It is a Component; pass it in as a function (NOT a function call).
 *
 * @param endpoint string, backend, no leading/trailing slash
 * @param node string, frontend, no leading/trailing slash
 * @param route Component (as just the function itself)
 * @param searchParams search parameters passed into the GET parameters (optional)
 * @constructor
 */
function PaginatedList<T extends { id: number }>({endpoint, node, route, searchParams}: PaginatedListProps<T>) {
    const navigate = useNavigate();
    const {loginInfo} = useContext(LoginInfoContext);
    const [items, setItems] = useState<Paginated<T> | null>();
    const {page} = useParams<{ page: string | undefined }>();
    let curPage = 1;
    if (page != null) {
        curPage = parseInt(page);
        if (isNaN(curPage)) {
            curPage = 1;
        }
    }
    // console.log("My page is", curPage);
    const getTotalCount = () => {
        return items?.count ?? 0;
    }


    useEffect(() => {
        const fetchItems = async () => {
            let searchObj = getSearchObj(searchParams);
            try {
                let fetchedItems = await axios.get<Paginated<T>>(
                    `${getBE()}/${endpoint}/`,
                    {
                        params: {
                            ...searchObj,
                            page: page ?? 1,
                            page_size: PAGE_SIZE
                        },
                        headers: {
                            Authorization: `Bearer ${loginInfo.token}`
                        }
                    }
                );
                setItems(fetchedItems.data);
            } catch (e: any) {
                navigateLoginUnauthorized(navigate, e);
                // eslint-disable-next-line eqeqeq
                if (e?.response?.status == 404 && curPage !== 1) {
                    navigate(`/${route}/1?${searchParams?.toString() ?? ""}`);
                }
            }
        }
        fetchItems().catch(() => {
            // console.log("Ideally, I should never be seeing this.")
        });
    }, [curPage, loginInfo.token, navigate, page, endpoint, searchParams, route]);

    const NodeElem = node;
    const curItems = items?.results ?? [];
    return (
        <Container>
            {curItems.map(nt => {
                return <NodeElem key={nt.id} item={nt}/>
            })}
            <Row>
                <Paginator route={route} curPage={curPage}
                           totalElements={getTotalCount()}
                           searchParams={searchParams}
                />
            </Row>
        </Container>
    )
}


export default PaginatedList;


/**
 * Props:
 *
 * - endpoint:     string, backend, no leading/trailing slash
 * - route:        string, frontend, no leading/trailing slash
 * - node:         Component (as just the function itself)
 * - searchParams: search parameters passed into the GET parameters (optional)
 */