import React from 'react';
import './nav.scss';
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


const Nav = () => {
    const [toggle, setToggle] = React.useState(false);

    const onSearch = (e) => {
        console.log(e.target.value);
    }

    return (
        <div>
            <div className="nav">
                <div className="nav__logo">
                    <div className={`${toggle ? 'active' : ''}`} id="nav-toggle" onClick={() => setToggle(!toggle)}></div>
                    <nav className={`${toggle ? 'active' : ''}`}>
                        <ul>
                            <div className="nav-search">
                                <input className="input-center" type="text" placeholder="Search" onChange={onSearch} />
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </div>
                            <hr/>
                            <li><Link to="/">Logout</Link></li>
                        </ul>
                    </nav>
                    <Link to='/admin'>Logo</Link>
                </div>
            </div>
        </div>
    )
}


export default Nav;