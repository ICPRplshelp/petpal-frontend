import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, HashRouter, Route, Routes} from "react-router-dom";
import Layout from "./components/Layout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import {LoginInfo} from "./shared/account-interfaces";
import {LoginInfoContext} from './contexts/LoginInfoContext';
import {emptyTokenConstructor} from "./shared/utilities";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
import Shelters from "./pages/Accounts/Shelters";
import PetSearch from "./pages/Pets/PetSearch";
import AccountUpdate from "./pages/Accounts/AccountUpdate";
import MyAccountDetail from "./pages/Accounts/MyAccountDetail";
import AccountDelete from "./pages/Accounts/AccountDelete";
import Logout from "./pages/Logout";
import NotMyAccountDetail from "./pages/Accounts/NotMyAccountDetail";
import NewPetListing from "./pages/Pets/New";
import UpdatePet from "./pages/Pets/Update";
import PetDetail from "./pages/Pets/Detail";
import ApplicationCreate from "./pages/Applications/Create";
import ApplicationsList from "./pages/Applications/List";
import ApplicationDetail from "./pages/Applications/Detail";
import AboutPage from "./pages/About";
import AccountUpdatePFP from "./pages/Accounts/AccountUpdatePFP";
import NotFound from "./pages/NotFound";

const BROWSER_STORAGE = localStorage; //sessionStorage; // localStorage;
const PETPAL_STORAGE_KEY = "petpallogin_31010130303945039642"

function retrieveLoginInfo(): LoginInfo {
    const storedData = BROWSER_STORAGE.getItem(PETPAL_STORAGE_KEY);
    if (storedData === null) {
        return emptyTokenConstructor();
    }
    try {
        const a = JSON.parse(storedData) as LoginInfo;
        console.log("On reload, I am actually logged in", a);
        return a;
    } catch (error) {
        return emptyTokenConstructor();
    }
}

function App() {
    const [sessionToken, setSessionToken] =
        useState<LoginInfo>(retrieveLoginInfo());


    const setLoginInfoAndSave = (sessionToken: LoginInfo) => {
        console.log("Saving login info into LocalStorage", sessionToken);
        setSessionToken(sessionToken);
        BROWSER_STORAGE.setItem(PETPAL_STORAGE_KEY, JSON.stringify(sessionToken));
    }

    return (
        <LoginInfoContext.Provider value={{loginInfo: sessionToken, setLoginInfo: setLoginInfoAndSave}}><BrowserRouter >
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={"*"} element={<NotFound/>}></Route>
                    <Route path={"/"} index element={<Landing/>}></Route>
                    <Route path={"login"} element={<Login/>}></Route>
                    <Route path={"notifications/"} element={<Notifications/>}></Route>
                    <Route path={"notifications/:page"} element={<Notifications/>}></Route>
                    <Route path={"register"} element={<Register/>}></Route>
                    <Route path={"shelters"} element={<Shelters/>}></Route>
                    <Route path={"shelters/:page"} element={<Shelters/>}></Route>
                    <Route path={"pets/search"} element={<PetSearch/>}></Route>
                    <Route path={"pets/search/:page"} element={<PetSearch/>}></Route>
                    <Route path={"accounts/update"} element={<AccountUpdate/>}></Route>
                    <Route path={"accounts/update/pfp"} element={<AccountUpdatePFP/>}></Route>
                    <Route path={"accounts/me"} element={<MyAccountDetail/>}></Route>
                    <Route path={"accounts/me/:page"} element={<MyAccountDetail/>}></Route>
                    <Route path={"accounts/detail/:id"} element={<NotMyAccountDetail/>}></Route>
                    <Route path={"accounts/detail/:id/:page"} element={<NotMyAccountDetail/>}></Route>
                    <Route path={"accounts/delete"} element={<AccountDelete/>}></Route>
                    <Route path={"logout/"} element={<Logout/>}></Route>
                    <Route path={"pets/new"} element={<NewPetListing/>}></Route>
                    <Route path={"pets/update/:id"} element={<UpdatePet/>}></Route>
                    <Route path={"pets/detail/:id"} element={<PetDetail/>}></Route>
                    <Route path={"applications/create/:id"} element={<ApplicationCreate/>}></Route>
                    <Route path={"applications"} element={<ApplicationsList/>}
                    ></Route>
                    <Route path={"applications/:page"} element={<ApplicationsList/>}
                    ></Route>
                    <Route path={"applications/detail/:id"}
                           element={<ApplicationDetail/>}></Route>
                    <Route path={"applications/detail/:id/:page"}
                           element={<ApplicationDetail/>}></Route>
                    <Route path={"about"}
                           element={<AboutPage/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter></LoginInfoContext.Provider>
    );
}

export default App;
