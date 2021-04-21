import React, { useState, useEffect } from "react"
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { AppContext } from "./lib/contextLib"
import { getMyProfile } from "./resource/auth"
import HomePage from './pages/homepage'
import SearchPage from './pages/searchpage'
import InfoPage from './pages/infopage'
import CMSPage from './pages/cmspage'
import OrderPage from './pages/orderpage'
import LoginPage from './pages/loginpage'
import PesananSayaPage from './pages/pesanansayapage'

function App(){

    const [isAuthenticated, userHasAuthenticated] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function onLoad() {
            try {
                if (isAuthenticated) {
                    console.log("Fetching profile...");
                    const response = await getMyProfile();
                    console.log(response)

                    if (response.data.detail) {
                        alert(
                            "Your login session has ended, please login again."
                        );

                        // sign out
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");

                        userHasAuthenticated(false);
                    } else {
                        const { values } = response;
                        setUser(values[0]);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        }

        onLoad();
    }, [isAuthenticated]);

    return(
        <AppContext.Provider
            value={{ isAuthenticated, userHasAuthenticated, user, setUser }}
        >
            <BrowserRouter>
                <Switch>
                    <Route exact={true} path="/" component={HomePage}/>
                    <Route exact path="/search" component={SearchPage}/>
                    <Route exact path="/warung/:id" component={InfoPage}/>
                    <Route exact path="/pesanan" component={PesananSayaPage}/>
                    <Route exact path="/cms" component={CMSPage}/>
                    <Route exact path="/konfirmasi" component={OrderPage}/>
                    <Route exact path="/login" component={LoginPage}/>
                </Switch>
            </BrowserRouter>
        </AppContext.Provider>
    );
}
export default App;