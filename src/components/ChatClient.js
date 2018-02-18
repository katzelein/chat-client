import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser, toggleUserTyping } from '../actions/actionCreators';
import PropTypes from 'prop-types';
import React from 'react';
import { bindAll } from 'lodash';
import NewMessage from './NewMessage';
import MessageList from './MessageList';


class ChatClient extends React.Component {

  constructor() {
    super();
    this.state = {
      newMessageText: ''
    }
    bindAll(this, [
      'onSubmit',
      'onChange'
    ])
  }

  componentDidMount() {
    const { userId, fetchUser } = this.props;
    if (userId === 1) fetchUser(1);
  }

  onSubmit(e) {
    console.log("submitted", e)
    e.preventDefault();
  }

  onChange(e) {
    const { toggleUserTyping, messages, userId } = this.props;
    if (!messages.usersTyping.includes(userId)) {
      toggleUserTyping(userId);
    }
    this.setState({
      newMessageText: e.target.value
    })
  }

  render() {
    const { userId } = this.props;
    return (
      <div className="chat-client">
        <div className="user-interface">
          <div className="user-header" >
            Laura Linney
          </div>
          <MessageList
            isUser={userId === 1}
          />
          <NewMessage
            onChange={this.onChange}
            onSubmit={this.onSubmit}
          />
        </div>
      </div>
    );
  }
}

ChatClient.propTypes = {
  actionCreators: PropTypes.object,
  accounts: PropTypes.object
};

const mapStateToProps = state => ({
  accounts: state.accounts,
  messages: state.messages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUser,
      toggleUserTyping
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatClient);