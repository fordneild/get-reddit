import React, {useState} from 'react'
import './Nav.scss'
import Settings from '../Settings/'
const Nav = ({addPosts, removePostByPipe}) => {
    const [showSettings, setShowSettings] = useState(false)

    const toggleShowSettings = () => {
        setShowSettings(prevShowSettings => !prevShowSettings)
    }

    return(
        <>
        <div className="nav--container">
            <ul className="nav">
                <li onClick={() => setShowSettings(false)} className="tab"><i className='fas fa-home' ></i></li>
                <li onClick={toggleShowSettings} className="tab"><i className='fas fa-cog'></i></li>
            </ul>
        </div>
        <Settings removePostByPipe={removePostByPipe} addPosts={addPosts} show={showSettings}/>
        </>
    )
}

export default Nav