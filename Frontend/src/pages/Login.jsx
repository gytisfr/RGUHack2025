import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAppContext } from "../App";

export const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setLoggedUser } = useAppContext();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`https://api.rguhacknature.co.uk/user/login?username=${username}&password=${password}`, {
                username,
                password
            });
            console.log("Login successful:", response.data);
            console.log("Response status:", response.status);
            console.log(response);

            if (response.status === 200) {
                // Store the token in a cookie
                Cookies.set("token", response.data.token, { expires: 7 }); // Expires in 7 days
                Cookies.set("username", username); // Set the loggedUser in the context
                navigate('/');
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setError("Invalid username or password");
        }
    };

    return (
        <div className="page">
            <div className="login-container">
                <div className="login-left">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <h1 style={{ margin: 0, textAlign: "start" }}>NATURE APP</h1>
                        <img src="../src/assets/arrow.png" style={{ marginLeft: "2em" }} alt="Arrow" />
                    </div>
                </div>
                <div className="login-right">
                    <h1>LOGIN</h1>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <p>Username</p>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p>Password</p>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button style={{ marginLeft: "auto" }} onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};