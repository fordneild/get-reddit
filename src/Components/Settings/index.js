import React from 'react'
import './Settings.scss'
import LocalStorage from '../../Services/LocalStorage.js'
import Form from '../Form/index'

const Settings = ({show = false}) => {
    const handleClick = () => {
        console.log("click")
        LocalStorage.set('test',1)
    }
    return (
        <div className={`settings--container ${show ? "": "hide"}`}>
            <h1 onClick={handleClick}>WORK IN PROGRESS</h1>
            <Form title={"subreddits"} />
        </div>
    )
}

export default Settings