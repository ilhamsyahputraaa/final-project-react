import React from "react";
import { Button } from "react-bootstrap";
import NavBar from "../Components/NavBar";

const PageError = () => {
  return (
    <>
      <NavBar />
      <div
        className="body d-flex row gap-5  justify-content-center align-items-center"
        style={{ height: "100vh" }}>
        {/* Container */}
        <div className="Content d-flex row gap-5 col-4">
          <div
            id="FollowingList"
            className="page-error-section d-flex row gap-4 p-5">
            <h1 className="error-text">Error Page</h1>
            <p className="error-text-small">
              It looks like something went wrong.
              <br />
              Please try again later or contact us if the problem persists.
            </p>
            <div>
              <Button
                variant="primary"
                onClick={() => window.location.assign("/home")}
                className="MainButton">
                Back to PhotoShare
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageError;
