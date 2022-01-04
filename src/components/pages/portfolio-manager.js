import React, { Component } from "react";
import axios from 'axios';

import PortfolioSidebarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";


export default class PortfolioManager extends Component {
   constructor () {
       super();
       this.state = {
           portfolioItems: [],    
           portfolioToEdit: {}  // this is to edit files in your port manager *
       };
   

    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this); 
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
}

    clearPortfolioToEdit() {
            this.setState({
                portfolioToEdit: {}
            });
    }

    handleEditClick(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        });
    }

    handleDeleteClick(portfolioItem) { //this is for the delete button in PortSideBar *
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, //this connects to DevCampSpace to respond to delete items
            { withCredentials: true }
        )
        .then(response => {
            this.setState ({
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id;
                })
            })

            return response.data;
        })
        .catch(error => {
            console.log("handleDeleteClick error", error);
        });      
    }

    handleEditFormSubmission(){
        this.getPortfolioItems();
    }

   handleNewFormSubmission(portfolioItem) {
       this.setState({
           portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
       });
   }

   handleFormSubmissionError (error) {
       console.log("handleSubmissionForm", Error)
   }                                                                            // v'?' -- this is used to store data from PortForm to DevCampSpace
    getPortfolioItems(){                                                        // v -- saves from refresh & stays on top of PortSideBar list
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
      return (                                          // this resets all of our data and calls on the all the records frm handleSubmit in PortForm.js
        <div>
          <div className="portfolio-manager-wrapper">  
                <div className="left-column">
                    <PortfolioForm
                    handleEditFormSubmission = {this.handleEditFormSubmission}
                    handleNewFormSubmission = {this.handleNewFormSubmission}
                    handleFormSubmissionError = {this.handleFormSubmissionError}
                    portfolioToEdit= {this.state.portfolioToEdit}
                    clearPortfolioToEdit= {this.clearPortfolioToEdit}
                    />
                </div>
                <div className="right-column">
                    <PortfolioSidebarList 
                    handleDeleteClick ={this.handleDeleteClick}
                    data={this.state.portfolioItems}
                    handleEditClick={this.handleEditClick}
                    />
                </div>
                    
            </div>
        </div>
        )
    }
}