import React from "react";
import {LoginInfo, PetPalUser} from "./account-interfaces";
import {NavigateFunction} from "react-router-dom";
import axios, {AxiosError, AxiosRequestConfig} from "axios";
import {AsString} from "./universal-interfaces";
import Swal from "sweetalert2";

/**
 * The page size, to be used in every list request that uses pagination
 */
export const PAGE_SIZE = 3;

/**
 * Returns a function to be passed into onChange for a text field.
 * @param setter the setter for the variable to bind to
 */
export function bind(setter: React.Dispatch<React.SetStateAction<any>>): (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
    return (event) => {
        setter(event.target.value);
    }
}

export function emptyTokenConstructor(): LoginInfo {
    return {
        token: "",
        refresh: ""
    }
}

/**
 * No trailing slash in the URL.
 */
export function getBE() {
    return "https://localhost:8000";
}

/**
 * Gets my account. Ideally, should never actually thow an error
 * @param navigate
 * @param userID
 * @param token
 */
export async function getAccountFromID(navigate: NavigateFunction | null, userID: number,
                                       token: string): Promise<PetPalUser> {
    try {
        let fetched = await axios.get<PetPalUser>(
            `${getBE()}/accounts/account/${userID}/`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        return fetched.data;
    } catch (e) {
        navigateLoginUnauthorized(navigate, e);
        throw e;
    }
}

/**
 * Redirects me to the login page if the error of the request was a 401. Does nothing otherwise.
 *
 * @param navigate The navigator obtained from useNavigate(), or null if I don't want to navigate at all
 * @param error the error thrown by an Axios request
 * @returns whether I navigated to the login (whether it was a 401)
 */
export function navigateLoginUnauthorized(navigate: NavigateFunction | null, error: any): boolean {
    console.log("I'd like to say something wrong here happened");
    const status = error?.response?.status;
    // eslint-disable-next-line eqeqeq
    if (status && status == 401 && navigate) {
        navigate("/login");
        return true;
    }
    return false;
}

type AID = {
    id: number;
}

/**
 * Navigates me to the login page if I'm not logged in
 * @param navigate
 * @param loginInfo
 */
export async function redirLoginIfLoggedOut(navigate: NavigateFunction, loginInfo: LoginInfo) {
    amILoggedInBoolean(loginInfo).then((r) => {
        if (r) {
            return;
        } else {
            navigate("/login");
        }
    });
}

export async function amILoggedInBoolean(loginInfo: LoginInfo) {
    try {
        if (loginInfo.currentUser === undefined) {
            return false;
        }
        let fetched = await axios.get<AID>(
            `${getBE()}/accounts/id/`,
            {
                headers: {
                    Authorization: `Bearer ${loginInfo.token}`
                }
            }
        );

        return fetched.data.id === loginInfo.currentUser.id;
    } catch (e) {
        return false;
    }
}


// /**
//  * Redirects me to the home page if I'm not a shelter (either I'm logged in as a seeker, or I'm logged out)
//  * @param navigate the navigate function
//  * @param loginInfo useContext should give you this: {loginInfo} = useContext(LoginInfoContext)
//  */
// export function navigateHomeNotShelter(navigate: NavigateFunction, loginInfo: LoginInfo) {
//     if (!(loginInfo.currentUser?.type === "SHELTER")) {
//         navigate("/");
//     }
// }


export function clamp(v: number, b: number, e: number) {
    return Math.max(b, Math.min(e, v));
}


export function bind2<T>(target: keyof T, prev: T, setter: React.Dispatch<React.SetStateAction<T>>): (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
    return e => {
        let newValue = e.target.value;
        setter({
            ...prev,
            [target]: newValue
        });
    }
}

/**
 * Formats a string or a string[] into a string.
 * @param potentiallyAList
 */
export function fl(potentiallyAList: string | string[] | undefined | null): string {
    // console.log(potentiallyAList);
    potentiallyAList = potentiallyAList ?? "";
    if (typeof potentiallyAList === 'string') {
        return potentiallyAList;
    } else {
        return potentiallyAList.join(", ")
    }
}

export function authAPI(loginInfo: LoginInfo): AxiosRequestConfig<any> {
    return {
        headers: {
            Authorization: `Bearer ${loginInfo.token}`
        }
    }
}

/**
 * Should a POST/PATCH request fail, use this to set the error message
 * @param resp the response payload that the backend returned
 * @param errTemp the AsString error thing
 */
export function constructErrorsFromResponse<T>(resp: any, errTemp: AsString<T>) {
    for (const a of Object.keys(resp)) {
        let state = (a in errTemp);
        if (state) {
            let b = a as keyof AsString<T>;
            errTemp[b] = fl(resp[a]);
        }
    }
}


export function getB<T>(obj: T, setObj: React.Dispatch<React.SetStateAction<T>>) {
    return (target: keyof T) => {
        return bind2<T>(target, obj, setObj);
    }
}

/**
 * Use this if you want to submit something. It takes up a lot less space!
 **/
export async function submitAbstraction<T>(url: string, obj: T, loginInfo: LoginInfo, setObj: React.Dispatch<React.SetStateAction<T>>, setErr: (value: (((prevState: AsString<T>) => AsString<T>) | AsString<T>)) => void, objInit: () => T, objErrInit: () => AsString<T>, nav?: NavigateFunction, redir?: string) {
    console.log("I just submitted");
    const errTemp = objErrInit();
    axios.post<T>(url, obj, authAPI(loginInfo)).then(_ => {
        console.log("Whatever you made has been created created");
        setObj(objInit());
        setErr(objErrInit());
        swalFire("Success!", "Submitted.", nav, redir);
    }).catch((e: AxiosError) => {
        let resp: any = e.response?.data ?? {};
        constructErrorsFromResponse<T>(resp, errTemp);
        setErr(errTemp);
    });
}

/**
 * Returns true if the would be integer represented by string number would
 * succeed on a parseInt call.
 * @param num
 */
export function numValid(num: string | undefined | null): boolean {
    if (num === undefined || num === null) {
        return false;
    }
    const ininint = parseInt(num);
    return !isNaN(ininint);
}

export function swalFire(title: string, text: string, nav?: NavigateFunction, to: string = "/") {
    Swal.fire({
        title: title,
        text: text,
        icon: 'success', // success, error, warning, info, question
        confirmButtonText: 'OK',
        confirmButtonColor: '#3f9ef3',
        timer: 3500
    }).then(() => {
        if (nav !== undefined) {
            console.log("Navigating to", to);
            nav(to);
        } else {
            console.log("Nav is undefined and I can't redir");
        }
    });
}