import React, { Component } from 'react';
import {
  BrowserRouter as Router, Switch, Route
} from "react-router-dom";
import axios from 'axios';
import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import Auth from "./pages/auth";
import PortfolioDetail from "./portfolio/portfolio-detail";
import NoMatch from "./pages/no-match";

export default class App extends Component {
    constructor (props) {
      super(props);

      this.state = {
        loggedInStatus: "NOT_LOGGED_IN"
      }
    }

    handleSuccessfulLogin= this.handleSuccessfulLogin.bind(this);
    handleUnSuccessfulLogin= this.handleUnSuccessfulLogin.bind(this);
 
      handleSuccessfulLogin () {
        this.SetState ({
          loggedInStatus:  "LOGGED_IN"
        });
      }

      handleUnSuccessfulLogin () {
        this.SetState ({
          loggedInStatus:  "NOT_LOGGED_IN"
        });
      }

      checkLoginStatus() {
          return axios.get("https://api.devcamp.space/logged_in", { 
            withCredentials: true })
            .then(response => {
              console.log("logged_in return", response);
            });
      }

    componentDidMount () {
      this.checkLoginStatus();
    }

  render() {

    return (
      <div className="container">
        <Router>
         <div>
            <NavigationContainer />
            <h2>{this.state.loggedInStatus}</h2>

            <Switch>
              <Route exact path="/" component={Home}/> 
              <Route path="/about-me" component={About} />    
              <Route path="/contact" component={Contact} />  
              <Route path="/blog" component={Blog} />  

              <Route 
              path="/auth" 
              render={props => (
                <Auth
                  {...props}
                  handleSuccessfulLogin={this.handleSuccessfulLogin}
                  handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
                />
                )}
              component={Auth} />  
              <Route 
                exact
                path="/portfolio/:slug" 
                component={PortfolioDetail} />  

              <Route component={NoMatch}/>
            </Switch>
          </div>
        </Router>
          
      </div>
    )
  }
}
