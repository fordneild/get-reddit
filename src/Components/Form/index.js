import React, { useState, useEffect } from "react";
import LocalStorage from "../../Services/LocalStorage";
import "./Form.scss";

const Form = ({
  LSKey,
  title,
  defaults,
  addPosts,
  fetch,
  removePostByPipe,
  prefix
}) => {
  //list entries
  const [entries, setEntires] = useState({});
  //text in input
  const [formData, setFormData] = useState("");

  //load entries from local storage on mount
  useEffect(() => {
    const loadEntires = async () => {
      const LSEntries = await LocalStorage.get(LSKey);
      if (LSEntries !== null) {
        //entires were in local
        setEntires(LSEntries);
      } else {
        //use defaults
        setEntires(defaults);
        //set entires in local
        LocalStorage.set(LSKey, defaults);
      }
    };
    loadEntires();
  }, [LSKey, defaults]);

  const refresh = async () => {
    const LSEntries = await LocalStorage.get(LSKey);
    setEntires(LSEntries);
  };

  const handleChange = e => {
    setFormData(e.target.value);
  };

  const appendEntry = async entry => {
    await LocalStorage.set(LSKey, [entry, ...entries]);
    refresh();
    const newPosts = await fetch(entry);
    addPosts(newPosts);
  };

  const removeEntry = async entryToRemove => {
    await LocalStorage.set(
      LSKey,
      entries.slice(0).filter(entry => entry !== entryToRemove)
    );
    refresh();
    removePostByPipe(`${prefix}${entryToRemove}`);
  };

  const handleSubmit = e => {
    e.preventDefault();
    appendEntry(formData);
    setFormData("");
  };

  return (
    <div className="form--container">
      <form onSubmit={handleSubmit}>
        <label>
          {LSKey} name:{" "}
          <input
            placeholder="ProgrammerHumor, memes, EarthPorn"
            name="sub"
            type="text"
            value={formData}
            onChange={handleChange}
          />
        </label>
      </form>
      {entries && entries.length > 0 && (
        <ul className="entires">
          {entries.map((entry, index) => {
            return (
              <li key={index} className="entry">
                  <div
                  className="close"
                  onClick={() => {
                    removeEntry(entry);
                  }}
                >X</div>
                <p>{entry}</p>
                
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Form;
