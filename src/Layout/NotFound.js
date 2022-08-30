import React from "react";

function NotFound({error}) {
  return (
    <div className="NotFound">
      <h1>Not Found</h1>
      <p>{error.message}</p>
    </div>
  );
}

export default NotFound;
