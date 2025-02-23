import { useState } from "react";
import axios from "axios";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(`https://api.rguhacknature.co.uk/user?username=${username}&password=${password}`, {
                username,
                password
            });
            console.log("Login successful:", response.data);
            // Handle successful login (e.g., redirect to another page, store token, etc.)
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
                    <h1>REGISTER</h1>
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