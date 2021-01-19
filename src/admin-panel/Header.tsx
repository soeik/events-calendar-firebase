import * as React from "react";
import { SignOut } from "./SignOut";

export function Header() {
  return (
    <div className="admin-header row">
      <div className="left">
        <h5>
          Event Calendar&nbsp;
          <small>admin panel</small>
        </h5>
      </div>
      <div>
        <SignOut />
      </div>
    </div>
  );
}
