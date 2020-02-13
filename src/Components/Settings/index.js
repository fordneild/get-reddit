import React from "react";
import "./Settings.scss";
import defaultSubreddits from "../../assets/defaultSubreddits";
import defaultInstagram from "../../assets/defaultInstagram";
import Form from "../Form/index";
import {fetchSubPosts} from "../../Services/redditFetch"
import {fetchInstagramAccountPosts, fetchInstagramHashTagPosts} from "../../Services/instagramFetch"

const Settings = ({ show = false , addPosts, removePostByPipe}) => {
  const forms = {
    reddit: {
      defaults: defaultSubreddits,
      fetch: fetchSubPosts,
      prefix: "r/"
    },
    instaTags: {
      defaults: defaultInstagram.terms,
      fetch: fetchInstagramHashTagPosts,
      prefix: "#"
    },
    instaAccounts: {
      defaults: defaultInstagram.accounts,
      fetch: fetchInstagramAccountPosts,
      prefix: "@"
    }
  };
  return (
    <div className={`settings--container ${show ? "" : "hide"}`}>
      {Object.entries(forms).map((form, index) => {
        const [LSKey, data] = form;
        const {fetch, defaults, prefix} = data
        return <Form key={index} prefix={prefix} fetch={fetch} removePostByPipe={removePostByPipe} addPosts={addPosts} LSKey={LSKey} defaults={defaults} />;
      })}
    </div>
  );
};

export default Settings;
