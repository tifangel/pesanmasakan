import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import HomePage from './pages/homepage'
import SearchPage from './pages/searchpage'
import InfoPage from './pages/infopage'
import CMSPage from './pages/cmspage'

function App(){
    return(
        <BrowserRouter>
            <Switch>
                <Route exact={true} path="/" component={HomePage}/>
                <Route exact path="/search" component={SearchPage}/>
                <Route exact path="/warung/:id" component={InfoPage}/>
                <Route exact path="/cms" component={CMSPage}/>
            </Switch>
        </BrowserRouter>
    );
}
export default App;