import { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";

function Login({ onSwitch }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const { email, password } = formData;

    if (formData.email.trim() === "" || formData.password.trim() === "") {
      setIncorectData(
        "The data provided is invalid. Please check your input and try again."
      );
      return;
    }
    if (!formData.email.includes("@")) {
      setIncorectData("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setIncorectData(
        "Your password is too short. Please enter at least 6 characters."
      );
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert(
        `Welcome back, ${userCredential.user.displayName}! Great to see you again!`
      );
      navigate("/");
    } catch (error) {
      setIncorectData(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="forms">
      <h2>Log In</h2>
      <div className="forms-item">
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
          <label>Password:</label>
          <input
            style={{ border: incorectData && "solid 2px #bb0000" }}
            type="password"
            name="password"
            value={formData.password}
            onChange={(event) => handleChange("password", event.target.value)}
          />
        </p>
      </div>
      <div>
        <button>Log In</button>
        <button onClick={onSwitch}>Switch to Register</button>
      </div>
      {incorectData && <p className="incorect">{incorectData}</p>}
    </form>
  );
}

export default Login;
