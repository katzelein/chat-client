import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../actions/actionCreators';
import PropTypes from 'prop-types';
import React from 'react';
import { bindAll } from 'lodash';
import Message from './Message';


class MessageList extends React.Component {

  constructor() {
    super();
    this.state = {

    }
    bindAll(this, [

    ])
  }

  render() {
    const { isUser, messages } = this.props;
    return (
      <div className="message-list">
        { messages.messageList.map(message => {
          return(
            <Message
              message={message}
            />
          )
        })}
      </div>
    );
  }
}

MessageList.propTypes = {
  actionCreators: PropTypes.object,
  messages: PropTypes.object
};

const mapStateToProps = state => ({
  messages: state.messages
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);