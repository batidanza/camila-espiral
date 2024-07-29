import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../management/user/Login"

const Management = () => {
  const { loggedIn } = useAuth();

  // Redirect to login page if not logged in
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="management-container">
      <div className="my-managment-options">
        <Link to="/collection-create" className="management-button">
          Create New Collection
        </Link>
        <Link to="/collection-photos-upload" className="management-button">
          Upload Collection Photos
        </Link>
        <Link to="/collection-archive-create" className="management-button">
          Create New Archive
        </Link>
        <Link to="/collection-archive-photos-upload" className="management-button">
          Upload Archives Photos
        </Link>
        <Link to="/manage-collections" className="management-button">
          Manage Collections
        </Link>
      </div>
    </div>
  );
};

export default Management;
