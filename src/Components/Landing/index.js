import React, {useState} from "react";
import "./Landing.scss";
import FeedController from '../Feed/FeedController'
import Form from '../Form/index'

const Landing = () => {
  
    const [sub, setSub] = useState("memes")
  return(
      <>
      {/* <Form set={setSub}/> */}
      <FeedController />
      </>
  )
};

export default Landing;
