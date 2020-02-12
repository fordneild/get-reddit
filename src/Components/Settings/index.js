import React from 'react'
import './Settings.scss'

const Settings = ({show = false}) => {
    return (
        <div className={`settings--container ${show ? "": "hide"}`}>
        </div>
    )
}

export default Settings