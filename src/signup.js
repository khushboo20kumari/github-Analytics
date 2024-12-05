import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "./firebase";

const auth = getAuth(app);

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signupUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User signed up:", userCredential.user);
      alert("User signed up successfully!");
      navigate("/dashboard"); // Redirect to Dashboard after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
      alert("Error signing up: " + error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Sign Up</h2>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={signupUser} style={styles.button}>
        Sign Up
      </button>
      <p style={styles.link}>
        Already have an account? <a href="/">Log In</a>
      </p>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    padding: "20px",
    maxWidth: "400px",
    margin: "auto",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    marginBottom: "20px",
    color: "#333",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
  link: {
    marginTop: "15px",
    fontSize: "14px",
  },
};

export default Signup;
