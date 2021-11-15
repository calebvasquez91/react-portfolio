import React, { Component } from "react";
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";


export default class PortfolioManager extends Component {
   constructor () {
       super();
       this.state = {
           portfolioItems: []
       };
   

    this.handleSuccesfulFormSubmission = this.handleSuccesfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
}

   handleSuccesfulFormSubmission(portfolioItem) {
       this.setState({
           portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
       });
   }

   handleFormSubmissionError (error) {
       console.log("handleSubmissionForm", Error)
   }                                                                            // v? -- this is to store data in PF 
    getPortfolioItems(){                                                        // v -- saves from refresh & stays on top
        axios.get("https://calebvasquez.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc",   
            { withCredentials: true
        })
        .then (response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })
            console.log("response from get portfolio items");
        })
        .catch(error => {
            console.log("error in getPortfolioItems", error);
        })
    }

    componentDidMount() {
        this.getPortfolioItems();
    }

    render () {
      return (
        <div>
          <div className="portfolio-manager-wrapper">
                <div className="left-column">
                    <PortfolioForm
                    handleSuccesfulFormSubmission = {this.handleSuccesfulFormSubmission}
                    handleFormSubmissionError = {this.handleFormSubmissionError}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList data={this.state.portfolioItems}/>
                </div>
                    
            </div>
        </div>
        )
    }
}