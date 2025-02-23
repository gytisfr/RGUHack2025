import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const Navbar = () => {
    const navigate = useNavigate();
    const username = Cookies.get("username");

    const deleteCookies = () => {
        Cookies.remove("token");
        Cookies.remove("username");
        navigate('/login');
    };

    return (
        <div className='nav'>
            <Link to={'/'} style={{ textDecoration: "none", color: "white", marginRight: "auto" }}>
                <h1 style={{ margin: 0 }}>NATURE</h1>
            </Link>
            <ul>
                <li>{username}</li>
                {username && (
                    <li
                        style={{ backgroundColor: "red", padding: "0.3em 0.75em", borderRadius: "8px", cursor: "pointer" }}
                        onClick={deleteCookies}
                    >
                        logout
                    </li>
                )}
            </ul>
        </div>
    );
};