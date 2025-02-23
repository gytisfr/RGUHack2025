import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const response = await axios.post(`https://api.rguhacknature.co.uk/user?username=${username}&password=${password}`, {
                username,
                password
            });
            console.log("Registration successful:", response.data);

            if (response.status === 200) {
                // Redirect to login page after successful registration
                navigate('/login');
            }
        } catch (error) {
            console.error("Error registering:", error);
            setError("Registration failed");
        }
    };

    return (
        <div className="page">
            <div className="login-container">
                <div className="login-left" style={{backgroundColor: "green"}}>
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
                    <button style={{ marginLeft: "auto", backgroundColor: "green" }} onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    );
};