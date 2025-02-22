import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <div className='nav'>
        <Link to={'/'} style={{textDecoration: "none", color: "white"}}><h1 style={{margin: 0}}>NATURE</h1></Link>
        <ul>
            <Link style={{color: "white", textDecoration: "none"}} to={'/'}><li>Home</li></Link>
            <Link style={{color: "white", textDecoration: "none"}} to={'/about'}><li>About</li></Link>
            <Link style={{color: "white", textDecoration: "none"}} ><li>Settings</li></Link>
        </ul>
      </div>
    )
}