import React from 'react'
import './Settings.scss'

const Settings = ({show = false}) => {
    return (
        <div className={`settings--container ${show ? "": "hide"}`}>
            <h1>WORK IN PROGRESS</h1>
        </div>
    )
}

export default Settings