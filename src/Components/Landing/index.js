import React, {useState} from "react";
import "./Landing.scss";
import Feed from '../Feed/index'
import Form from '../Form/index'

const Landing = () => {
  
    const [sub, setSub] = useState("memes")
  return(
      <>
      <Form set={setSub}/>
      <Feed sub={sub}/>
      </>
  )
};

export default Landing;
