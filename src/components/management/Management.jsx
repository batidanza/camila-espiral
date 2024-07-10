import React from "react";
import { Link } from "react-router-dom";

const Management = () => {
  return (
    <div className="managment-container">
      <div className="my-container-form">
        <Link to="/collection-create" className="management-button">
          Create New Collection
        </Link>
        <Link to="/collection-archive-create" className="management-button">
          Create New Archive
        </Link>
        <Link to="/manage-collections" className="management-button">
          Manage Collections
        </Link>
        <Link to="/manage-archives" className="management-button">
          Manage Archives
        </Link>
        <Link to="/create-user" className="management-button">
          Create User
        </Link>
      </div>
    </div>
  );
};

export default Management;
