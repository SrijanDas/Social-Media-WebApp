import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./People.css";

export default function People() {
  return (
    <div className="pageContainer">
      <div className="page">
        <Sidebar className="sidebar" />
        <div className="pageContent">
          <h1>People</h1>
        </div>
      </div>
    </div>
  );
}