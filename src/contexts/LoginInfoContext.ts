import {createContext} from "react";
import {LoginInfo} from "../shared/account-interfaces";
import {emptyTokenConstructor} from "../shared/utilities";


export type LoginInfoContextType = {
    loginInfo: LoginInfo;
    setLoginInfo: (token: LoginInfo) => void;
}


export const LoginInfoContext = createContext<LoginInfoContextType>({
    loginInfo: emptyTokenConstructor(),
    setLoginInfo: () => {
    }
});
