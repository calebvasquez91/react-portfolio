import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import profilePicture from "../../../static/assets/images/auth/login.jpg";


export default function() {
  return (
    <div className="content-page-wrapper">
      <div className="left-column">
        <div className="contact-bullet-point">
          <div className="contact-point-group">
            <div className="icon"><FontAwesomeIcon icon= "phone"/>
            </div>
            <div className="text">
              555-555-5555
            </div>
          </div>

          <div className="contact-point-group">
            <div className="icon"><FontAwesomeIcon icon= "at"/>
            </div>
            <div className="text">
              myrealemail@email.com
            </div>
          </div>

          <div className="contact-point-group">
            <div className="icon"><FontAwesomeIcon icon= "map"/>
            </div>
            <div className="text">
              Brooklyn, NY
            </div>
          </div>
        </div>
      </div>

      <div
        className="right-column"
        style={{
          background: "url(" + profilePicture + ") no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      />
    </div>
  );
}