import React from "react";
import "./CreateChannel.css";

function CreateChannel() {
  return (
    <div className="Body">
      <div className="Header">
      <p className="CreateChannel"><b>Create a channel</b></p>
      <i class="fas fa-times"></i>
      </div>
      <p className="p1">
        Channels are where your team communicates. They're best when organized
        around a topic - #marketing, for example.
      </p>
      <form className="Form">
        <label><b>Name</b></label>
        <input className="Input" type="text" />
        <label><b>Description</b> (optional)</label>
        <input className="Input" type="text" />
      </form>
      <p className="p2">What is this channel about?</p>
      <div className="Footer">
      <div className="p3">
      <b>Make this channel private</b>
      <p>when a channel is set to ptivate,</p>
      <p>it can only be viewed or joinned by invitation.</p>
      </div>
      <i class="fas fa-toggle-on"></i>
      </div>
      <button className="Button" onClick="#">Create</button>
    </div>
  );
}

export default CreateChannel;
