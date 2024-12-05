import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GithubSearch from "./UserBioData";
import { Button } from "@mui/material";
function Dashboard() {
    const navigate = useNavigate();
    const auth = getAuth();

    const logoutUser = () => {
        signOut(auth)
            .then(() => {
                alert("Logged out successfully!");
                navigate("/"); 
            })
            .catch((error) => {
                console.error("Error logging out:", error.message);
                alert("Error logging out: " + error.message);
            });
    };

    return (
        <div >
            <Button  onClick={logoutUser} variant="container" style={{ background: "#1e3c72", margin: "auto", justifyContent: 'center' ,display:"flex",marginTop:"30px"}}>
                Log Out
            </Button>
            <GithubSearch />

        </div>
    );
}
export default Dashboard;
