import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { bindAll } from 'lodash';
import moment from 'moment'
import Message from './Message';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class MessageList extends React.Component {

  constructor() {
    super();

    bindAll(this, [
      'displayProps',
      'messageSender',
      'timeToDisplay',
    ])
  }

  messageSender(msg) {
    const { selectedSender, selectedReceiver } = this.props;
    const sender =
      selectedSender.id === msg.senderId
        ? selectedSender
        : selectedReceiver;
    return sender;
  }

  timeToDisplay(msg) {
    const time = moment(msg.timeSent).isSame(moment(), 'day')
      ? 'Today, ' + moment(msg.timeSent).format('h:mma')
      : moment(msg.timeSent).format('ddd M/D/YY, h:mma');
    return time;
  }

  displayProps(msg, idx) {
    const { messageList, userId } = this.props;

    const prevMessageTime =
      messageList[idx-1]
      ? moment(messageList[idx-1].timeSent)
      : null;
    const diff = moment(msg.timeSent).diff(prevMessageTime, 'minutes');
    const showTime = diff >= 5 || !prevMessageTime;

    const showIsTyping =
      msg.isTyping &&
      msg.senderId !== userId &&
      messageList[0] !== msg;
    const showMessage = showIsTyping || !!msg.receiverId;

    return { showIsTyping, showMessage, showTime };
  }



  render() {
    const { messageList, userId, mode } = this.props;

    return (
      <div className="message-list" id={`list-mode-${mode.type}`}>

        <div>
          <ReactCSSTransitionGroup
            transitionName="messages-group"
            transitionEnterTimeout={200}
            transitionLeaveTimeout={100}
            transitionAppear={true}
            transitionAppearTimeout={200}
          >
            { messageList.map((message, index) => {

              const {
                showIsTyping,
                showMessage,
                showTime
              } = this.displayProps(message, index);

              return (
                <Message
                  key={index}
                  message={message}
                  sender={this.messageSender(message)}
                  showIsTyping={showIsTyping}
                  showMessage={showMessage}
                  showTime={showTime}
                  timeToDisplay={this.timeToDisplay(message)}
                  userId={userId}
                />
              )
            })}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

MessageList.propTypes = {
  actionCreators: PropTypes.object,
  messageList: PropTypes.array.isRequired,
  selectedSender: PropTypes.object,
  selectedReceiver: PropTypes.object
};

const mapStateToProps = state => ({
  messageList: state.messages.messageList,
  selectedSender: state.accounts.selectedSender,
  selectedReceiver: state.accounts.selectedReceiver,
  usersTyping: state.messages.usersTyping
});

export default connect(
  mapStateToProps,
  null
)(MessageList);