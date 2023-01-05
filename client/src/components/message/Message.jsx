import React from "react";
import "./message.css";
import { format } from "timeago.js"

export default function Message({message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img src="https://cdn2.psychologytoday.com/assets/styles/manual_crop_1_91_1_1528x800/public/field_blog_entry_images/2018-09/shutterstock_648907024.jpg?itok=7lrLYx-B" alt="" className="messageImg" />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>

    </div>
  );
}
