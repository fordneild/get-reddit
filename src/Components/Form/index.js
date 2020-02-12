import React, {useState, useEffect} from 'react'
import LocalStorage from '../../Services/LocalStorage'
import './Form.scss'

const Form = ({title = "subreddits"}) => {
    const [entries, setEntries] = useState(LocalStorage.get(title) || [])
    const [formData, setFormData] = useState("")

    useEffect(() => {
        return () => {
            //clean up
        }
    },[])

    const handleChange = (e) => {
        setFormData(e.target.value)
    }

    const appendEntry = (entry) => {
        setEntries(prevEntries => {
            const newEntires = [entry, ...prevEntries]
            //append in LS
            LocalStorage.set('title', entries)
            //append it in UI
            return newEntires
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        appendEntry(formData)
        setFormData("")
    }

    return(
        <div className="form--container">
            <form onSubmit={(e) => {e.preventDefault(); handleSubmit(formData)}}>
                <label>Subreddit name: <input placeholder="ProgrammerHumor, memes, EarthPorn" name="sub" type="text" value={formData} onChange={handleChange}/></label>
            </form>
            {entries && entries.length>0 && <ul className="entires">
                {entries.map((entry, index) => {
                    return <li key={index} className="entry">{entry}</li>
                })}
            </ul>}
        </div>
    )
}

export default Form;
