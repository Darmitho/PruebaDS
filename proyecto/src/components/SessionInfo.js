import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

function SessionInfo() {
  const { currentUser } = useContext(AppContext);

  return (
    currentUser && (
      <div className="flex gap-3 text-lg justify-end mx-10">
        <h2>
          <span className="font-semibold">user:</span> {currentUser.user}
        </h2>
      </div>
    )
  );
}

export default SessionInfo;
