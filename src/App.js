import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

// import components 
import { Navbar, Footer, Alert } from './components/layouts'
import { User } from './components/users'
import { Home, About, Notfound } from './components/pages'

// import react contexts
import { GithubState } from './context/github'
import { AlertState } from './context/alert'

import "./App.css";


const App = () => {
    return (
      <GithubState>
        <AlertState>
          <Router>
            <div className="App" id="content-wrap">
              <header className="App-header">
                <Navbar title="Github Finder" icon="fa fa-github" />
                <div className="container">
                  <Alert alert={alert}/>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/user/:login' component={User} />
                    <Route component={Notfound} />
                  </Switch>
                  
                </div>
                <Footer />
              </header>
            </div>
          </Router>
        </AlertState>
      </GithubState>
    )
}

export default App;
