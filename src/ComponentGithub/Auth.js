import { useState } from "react";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { app } from "./firebase";
import { Container, TextField, Button, Typography } from "@mui/material"
const auth = getAuth(app);

function Auth({ name, setName }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (isLogin) {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                console.log("User logged in:", userCredential.user);
                alert("User logged in successfully!");
                navigate("/dashboard");
            } catch (error) {
                console.error("Error logging in:", error.message);
                alert("Error logging in: " + error.message);
            }
        } else {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                console.log("User signed up:", userCredential.user);
                alert("User signed up successfully!");
                navigate("/dashboard");
            } catch (error) {
                console.error("Error signing up:", error.message);
                alert("Error signing up: " + error.message);
            }
        }
        setName("")
    };


    return (
        <Container maxWidth="xs" sx={{ mt: 5, background: "rgba(255, 255, 255, 0.9)", borderRadius: "10px", p: 4, boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}>
            <h2 style={{ color: "#1e3c72", textAlign: "center", fontWeight: "bold", fontSize: "25px" }}>{isLogin ? "Log In" : "Sign Up"}</h2>
            <TextField
                sx={{ mt: 2 }}
                fullWidth
                required
                id="outlined-required"
                label="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <TextField
                sx={{ mt: 2 }}
                fullWidth
                required
                id="outlined-required"
                label="Emaill"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                sx={{ mt: 2 }}
                fullWidth
                required
                id="outlined-required"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Button fullWidth sx={{ mt: 3,py:1,borderRadius:"20px", background: "#1e3c72" }} onClick={handleSubmit} variant="contained"> {isLogin ? "Log In" : "Sign Up"}</Button>
            <Typography sx={{ mt: 3, color: "#1e3c72" }}>
                {isLogin ? (
                    <>
                        Don't have an account?{" "}
                        <span style={{ fontWeight: "bold" }} onClick={() => setIsLogin(false)} >
                            Sign Up
                        </span>
                    </>
                ) : (
                    <>
                        Already have an account?{" "}
                        <span style={{ fontWeight: "bold"}} onClick={() => setIsLogin(true)} >
                            Log In
                        </span>
                    </>
                )}
            </Typography>
        </Container>
    );
}
export default Auth
