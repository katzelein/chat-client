import React from 'react';
import cn from 'classnames';


const Message = ({ isUser }) =>
  <div className="message-item">
    <div className="time-sent">
      10:45 AM, Sep 27, 2012
    </div>

    <div className={cn("message-block", { 'is-user': isUser })}>
      <div className="user-image">
        LL
      </div>
      <div className={cn("chat-bubble", {'is-user': isUser })}>
        <div className={cn("text-triangle", { 'is-user': isUser })}/>
        <div className={cn("message-text", { 'is-user': isUser})}>
          Hi Rob. What are you doing? I had a great today thanks in advance for askingggggg.
        </div>
      </div>
    </div>
  </div>

export default Message;