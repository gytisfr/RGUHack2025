import { Link } from "react-router-dom"

export const Navbar = () => {
    return (
        <div className='nav'>
        <h1 style={{margin: 0}}>NATURE</h1>
        <ul>
            <Link to={'/'}><li>Home</li></Link>
            <Link to={'/about'}><li>About</li></Link>
            <Link><li>Settings</li></Link>
        </ul>
      </div>
    )
}