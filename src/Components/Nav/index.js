import React, {useState} from 'react'
import './Nav.scss'
import Settings from '../Settings/'
const Nav = () => {
    const [showSettings, setShowSettings] = useState(false)

    return(
        <>
        <div className="nav--container">
            <ul className="nav">
                <li onClick={()=> setShowSettings(false)} className="tab"><i class='fas fa-home' ></i></li>
                <li onClick={()=> setShowSettings(true)} className="tab"><i class='fas fa-cog'></i></li>
            </ul>
        </div>
        <Settings show={showSettings}/>
        </>
    )
}

export default Nav