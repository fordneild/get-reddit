import React, {useState} from 'react'
import './Form.scss'

const Form = ({set}) => {
    const handleSubmit = (formData) => {
        set(formData)
    }
    const [formData, setFormData] = useState("");
    const handleChange = (e) => {
        console.log(e.target.value)
        setFormData(e.target.value)
    } 

    return(
        <div className="form--container">
            <form onSubmit={(e) => {e.preventDefault(); console.log(formData); handleSubmit(formData)}}>
                <label>Subreddit name: <input placeholder="ProgrammerHumor, memes, EarthPorn" name="sub" type="text" value={formData} onChange={handleChange}/></label>
            </form>
        </div>
    )
}

export default Form;
