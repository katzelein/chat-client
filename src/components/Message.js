import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const Message = ({
  message,
  sender,
  userId,
  showTime,
  showIsTyping,
  timeToDisplay,
  showMessage,
}) =>
  <div>
    { showMessage ? (
      <div className='message-item'>
        { showTime ? (
          <div className='time-sent'>
            { timeToDisplay }
          </div>
        ) : null }

        <div className={cn('message-block', { 'is-sender': userId === sender.id })}>
          <div className='user-initials'>
            { sender.initials }
          </div>
          <div className={cn('chat-bubble', {'is-sender': userId === sender.id })}>
            <div className={cn('text-triangle', { 'is-sender': userId === sender.id, 'is-typing': showIsTyping })}/>
            <div className={cn('message-text', { 'is-sender': userId === sender.id, 'is-typing': showIsTyping })}>
              { showIsTyping ? (
                <div>. . .</div>
              ) : message.messageText }
            </div>
          </div>
        </div>
      </div>
    ) : null }
  </div>;

Message.propTypes = {
  message: PropTypes.object.isRequired,
  sender: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired,
  showTime: PropTypes.bool.isRequired,
  showIsTyping: PropTypes.bool,
  timeToDisplay: PropTypes.string.isRequired,
  showMessage: PropTypes.bool.isRequired
};

export default Message;
