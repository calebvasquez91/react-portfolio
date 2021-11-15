import React, { Component } from "react";
import axios from 'axios';
import DropzoneComponent from "react-dropzone-component";

import "../../../node_modules/react-dropzone-component/styles/filepicker.css";
import "../../../node_modules/dropzone/dist/min/dropzone.min.css";

export default class PortfolioForm extends Component {
  constructor (props) {
      super (props);

      this.state = {
          name:"",
          description: "",
          category:"eCommerce",
          positon:"",
          url:"",
          thumb_image:"",
          banner_image:"",
          logo:"",
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this); //this is for portfolio form *
      this.componentConfig = this.componentConfig.bind(this);
      this.djsConfig = this.djsConfig.bind(this);
      this.handleThumbDrop = this.handleThumbDrop.bind(this);
      this.handleBannerDrop = this.handleBannerDrop.bind(this);
      this.handleLogoDrop = this.handleLogoDrop.bind(this);

      this.thumbRef = React.createRef();
      this.bannerRef = React.createRef();
      this.logoRef = React.createRef();
  }

  handleThumbDrop() {
      return{
          addedfile: file => this.setState({ thumb_image: file })  //this is to add a file to the thumb image *
      };
  }

 handleBannerDrop() {
      return{
          addedfile: file => this.setState({ banner_image: file })  //this is to add a file to the banner *
      };
  }

   handleLogoDrop() {
      return{
          addedfile: file => this.setState({ logo: file })  //this is to add a file to the logo *
      };
  }

  componentConfig() {  //this is is specify what type of image files you can upload
      return {
        iconFiletypes: [".jpg", ".png"],
        showFiletypeIcon: true,
        postUrl: "https://httpbin.org/post"  //this where you would add the API website attached to the image
      };
  }

  djsConfig() {
      return{
          addRemoveLinks: true,
          maxFiles: 1
      }
  }

//this is to create a form to add items to your portfolio (blank) *
    buildForm () {
        let formData = new FormData ();
//these are the data where you add your items *
        formData.append("portfolio_item[name]", this.state.name);
        formData.append("portfolio_item[description]", this.state.description);
        formData.append("portfolio_item[url]", this.state.url);
        formData.append("portfolio_item[category]", this.state.category);
        formData.append("portfolio_item[position]", this.state.position);
        
        if (this.state.thumb_image) {
            formData.append("portfolio_item[thumb_image}", this.state.thumb_image);  //this is to specify to upload a thumb image instead of an actual file *
        }
        if (this.state.banner_image) {
            formData.append("portfolio_item[banner_image}", this.state.banner_image);  //this is to specify to upload a banner image instead of an actual file *
        }
        if (this.state.logo) {
            formData.append("portfolio_item[logo]}", this.state.logo);  //this is to specify to upload a logo image instead of an actual file *
        }
        return formData;
    }

        handleChange(event){        //this is to add words in portfolio form *
            this.setState({
                [event.target.name]: event.target.value
            });
        }

        handleSubmit(event) {       //this is where you upload to the portfolio *
         axios
          .post (
            "https://calebvasquez.devcamp.space/portfolio/portfolio_items", 
            this.buildForm(), 
            { withCredentials: true }
            )
            .then (response => {
                this.props.handleSuccesfulFormSubmission(response.data.portfolio_item);

                   this.setState({
                        name:"",
                        description: "",
                        category:"eCommerce",
                        positon:"",
                        url:"",
                        thumb_image:"",
                        banner_image:"",
                        logo:"",
                   });
                
                [this.thumbRef, this.bannerRef, this.logoRef].forEach(ref => {
                    ref.current.dropzone.removeAllFiles();
                });
            })
            .catch(error => {
                console.log("portfolio form handleSubmit error", error);
            });
            event.preventDefault();
        }
  
    render(){
        return (                                  //form onSubmit is needed to connect handleSubmit func. *
            
            
            <form onSubmit={this.handleSubmit}  className="portfolio-form-wrapper">
                <div className="two-column">
                    <input
                        type="text"
                        name="name"
                        placeholder="Portfolio Item Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <input
                        type="text"
                        name="url"
                        placeholder="URL"
                        value={this.state.url}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="two-column">
                    <input
                    type="text"
                    name="position"
                    placeholder="position"
                    value={this.state.position}
                    onChange={this.handleChange}
                    />

                    <select                             //this is for the drop down select box *
                        name="category"
                        value={this.state.category}
                        onChange={this.handleChange}
                        className="select-element"
                    >
                        <option value="eCommerce">eCommerce</option>
                        <option value="Scheduling">Scheduling</option>
                        <option value="Enterprise">Enterprise</option>
                    </select>
                </div>
                <div className="one-column">
                    <textarea
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={this.state.description}
                    onChange={this.handleChange}
                    />
                </div>

                <div className="image_uploaders">
                
                    <DropzoneComponent
                        ref={this.thumbRef}
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleThumbDrop()}
                    >
                    <div className="dz-message">Thumbnail</div>

                    </DropzoneComponent>


                    <DropzoneComponent
                    ref={this.bannerRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleThumbDrop()}
                    >

                    <div className="dz-message">Banner</div>

                    </DropzoneComponent>


                    <DropzoneComponent
                    ref={this.logoRef}
                    config={this.componentConfig()}
                    djsConfig={this.djsConfig()}
                    eventHandlers={this.handleThumbDrop()}
                    >

                    <div className="dz-message">Logo</div>

                    </DropzoneComponent>

                </div>

                <div>
                    <button className="btn" type="submit">Save</button>
                </div>
            </form> 
        
       );
    }
}