import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as stuffActions from '../actions/stuffActions';
import PropTypes from 'prop-types';
import React from 'react';


class ChatClient extends React.Component {

  render() {
    return (
      <div className="chat-client">
        <div className="user-interface">
          <div className="user-header" >
            Laura Linney
          </div>
          <div className="message-list">
            <div className="time-sent">
              10:45 AM, Sep 27, 2012
            </div>
            <div className="sent-message">
              <div className="user-image">
                LL
              </div>
              <div className="chat-bubble-left">
                <div className="left-text-triangle"/>
                <div className="sent-text">
                  Hi Rob. What are you doing? I had a great today thanks in advance for askingggggg.
                </div>
              </div>
            </div>
            <div className="received-message">
              <div className="user-image">
                JR
              </div>
              <div className="chat-bubble-right">
                <div className="right-text-triangle"/>
                <div className="received-text">
                  Hi Laura. I'm filling out a job application.
                </div>
              </div>
            </div>
          </div>
          <div className="new-message">
            <form className="new-message-form">
              <input
                type="text"
                className="new-message-input"
                placeholder="Say anything..."
              />
              <button
                type="submit"
                value="Submit"
                className="ok-button"
              >OK</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ChatClient.propTypes = {
  stuffActions: PropTypes.object,
  stuffs: PropTypes.array
};

function mapStateToProps(state) {
  return {
    stuffs: state.stuffs
  };
}

function mapDispatchToProps(dispatch) {
  return {
    stuffActions: bindActionCreators(stuffActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatClient);