import { useState } from "react";
import Login from "../components/form/Login";
import Register from "../components/form/Register";

function AuthenticationPage() {
  const [logReg, setLogReg] = useState("login");

  function onSwitch(e) {
    e.preventDefault();
    setLogReg((prevLog) => (prevLog === "login" ? "register" : "login"));
  }

  return (
    <div>
      {logReg === "login" && <Login onSwitch={onSwitch} />}
      {logReg === "register" && <Register onSwitch={onSwitch} />}
    </div>
  );
}

export default AuthenticationPage;
