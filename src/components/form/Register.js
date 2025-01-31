import {
  createUserWithEmailAndPassword,
  reload,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { useDispatch } from "react-redux";
import { actionUserData } from "../../store/user-data";

function Register({ onSwitch }) {
  const nav = document.getElementById("nav");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
    "password-confirmation": "",
  });
  const [incorectData, setIncorectData] = useState(false);

  function handleChange(name, value) {
    setIncorectData(false);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { userName, email, password } = formData;

    if (
      userName.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      formData["password-confirmation"] === ""
    ) {
      setIncorectData(
        "The data provided is invalid. Please check your input and try again."
      );
      return;
    }
    if (!email.includes("@")) {
      setIncorectData("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setIncorectData(
        "Your password is too short. Please enter at least 6 characters."
      );
      return;
    }
    if (password !== formData["password-confirmation"]) {
      setIncorectData("The passwords do not match. Please try again.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const confirm = window.confirm(
        "Would you like to stay logged in to keep your session active and avoid signing in again later?"
      );
      if (confirm) {
        const user = {
          userName,
          email,
        };
        localStorage.setItem("isLogedIn", true);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        const logoutTime = Date.now() + 1000 * 60 * 60 * 10;
        localStorage.setItem("logout-time", logoutTime);
        localStorage.setItem("isLogedIn", false);
      }
      await updateProfile(userCredential.user, { displayName: userName });
      await reload(userCredential.user);
      dispatch(
        actionUserData.setUserAuth({
          email: email,
          userName: userName,
        })
      );
      alert("Registration successful! Welcome aboard!");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <form
      style={{ marginTop: `${nav?.offsetHeight}px` }}
      onSubmit={handleSubmit}
      className="forms"
    >
      <h2>Registration</h2>
      <div className="forms-item">
        <p>
          <label>User Name:</label>
          <input
            style={{ border: incorectData && "solid 2px #bb0000" }}
            type="text"
            name="userName"
            value={formData.userName}
            onChange={(event) => handleChange("userName", event.target.value)}
          />
        </p>
        <p>
          <label>Email:</label>
          <input
            style={{ border: incorectData && "solid 2px #bb0000" }}
            type="email"
            name="email"
            value={formData.email}
            onChange={(event) => handleChange("email", event.target.value)}
          />
        </p>
        <p>
          <label>Password</label>
          <input
            style={{ border: incorectData && "solid 2px #bb0000" }}
            type="password"
            name="password"
            value={formData.password}
            onChange={(event) => handleChange("password", event.target.value)}
          />
        </p>
        <p>
          <label>Password Confirmation</label>
          <input
            style={{ border: incorectData && "solid 2px #bb0000" }}
            type="password"
            name="password-confirmation"
            value={formData["password-confirmation"]}
            onChange={(event) =>
              handleChange("password-confirmation", event.target.value)
            }
          />
        </p>
      </div>
      <div>
        <button>Register</button>
        <button onClick={onSwitch}>Switch To Log In</button>
      </div>
      {incorectData && <p className="incorect">{incorectData}</p>}
    </form>
  );
}

export default Register;
