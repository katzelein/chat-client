import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { bindAll } from 'lodash';
import moment from 'moment';
import {
  fetchSender,
  fetchReceiver,
  sendNewMessage,
  userIsTyping,
  userStoppedTyping,
} from '../actions/actionCreators';
import UserHeader from './UserHeader';
import MessageList from './MessageList';
import NewMessage from './NewMessage';
import USER_MODE from '../constants';

class ChatClient extends React.Component {
  constructor() {
    super();
    this.state = {
      newMessageText: '',
      userId: null,
    };
    bindAll(this, [
      'onSubmit',
      'onChange',
      'checkForTyping',
      'receiverId',
      'userName',
      'headerText',
      'scrollNewMessage'
    ]);
  }

  componentDidMount() {
    const { fetchSender, fetchReceiver, mode } = this.props;

    if (mode.type === USER_MODE.sender.type) {
      fetchSender(mode.id);
    } else {
      fetchReceiver(mode.id);
    };
    this.setState({ userId: mode.id });
    // Setting userId in state is only appropriate in this
    // dual-screen setting sharing one Redux store
  }

  componentDidUpdate(prevProps) {
    const { messageList, usersTyping } = this.props;
    const shouldScroll =
      messageList.length !== prevProps.messageList.length ||
      usersTyping.length !== prevProps.usersTyping.length;
    if (shouldScroll) {
      this.scrollNewMessage();
    };
  }

  onSubmit(e) {
    const { sendNewMessage, userStoppedTyping } = this.props;

    e.preventDefault();
    sendNewMessage({
      senderId: this.state.userId,
      receiverId: this.receiverId(),
      messageText: this.state.newMessageText,
      timeSent: moment(),
    });
    this.setState({ newMessageText: '' });
  }

  onChange(e) {
    const { userIsTyping, usersTyping } = this.props;

    if (!usersTyping.includes(this.state.userId)) {
      userIsTyping(this.state.userId);
    };
    this.setState({ newMessageText: e.target.value });
    this.checkForTyping(e.target.value);
  }

  checkForTyping(text) {
    const { userStoppedTyping, usersTyping } = this.props;

    setTimeout(() => {
      const typingStopped = this.state.newMessageText === text;
      if (typingStopped) {
        userStoppedTyping(this.state.userId);
      };
    }, 500);
  }

  receiverId() {
    const { selectedSender, selectedReceiver } = this.props;
    const id = selectedSender.id !== this.state.userId
      ? selectedSender.id
      : selectedReceiver.id;
    return id;
  }

  userName() {
    const { selectedSender, selectedReceiver } = this.props;

    const userAccount =
      selectedSender && selectedReceiver &&
      this.state.userId === selectedSender.id
        ? selectedSender
        : selectedReceiver;
    return (userAccount && userAccount.firstName + ' ' + userAccount.lastName) || '';
  }

  headerText() {
    const { mode, selectedSender, selectedReceiver, messageList } = this.props;

    const recipient =
      mode.type === 'sender' && selectedReceiver
        ? selectedReceiver
        : mode.type === 'receiver' && selectedReceiver
        ? selectedSender
        : null;
    const fullName = recipient
      ? recipient.firstName
      : '';
    const header =
      messageList && !messageList.length || messageList && messageList[0].isTyping
        ? 'Get the conversation started!'
        : `Chat with ${fullName}`;
    return header;
  }

  scrollNewMessage() {
    const { mode } = this.props;
    const list = document.getElementById(`list-mode-${mode.type}`);
    const listHeight = list.scrollHeight;
    list.scrollTop = listHeight;
  }

  render() {
    return (
      <div className="chat-client">
        <div className="user-interface">
          <UserHeader
            userName={this.userName()}
            headerText={this.headerText()}
          />
          <MessageList
            userId={this.state.userId}
            mode={this.props.mode}
          />
          <NewMessage
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            newMessageText={this.state.newMessageText}
          />
        </div>
      </div>
    );
  }
}

ChatClient.propTypes = {
  selectedSender: PropTypes.object,
  selectedReceiver: PropTypes.object,
  fetchSender: PropTypes.func,
  fetchReceiver: PropTypes.func,
  sendNewMessage: PropTypes.func,
  userIsTyping: PropTypes.func,
  userStoppedTyping: PropTypes.func,
};

const mapStateToProps = state => ({
  selectedSender: state.accounts.selectedSender,
  selectedReceiver: state.accounts.selectedReceiver,
  usersTyping: state.messages.usersTyping,
  messageList: state.messages.messageList,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchSender,
      fetchReceiver,
      userIsTyping,
      userStoppedTyping,
      sendNewMessage,
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatClient);
