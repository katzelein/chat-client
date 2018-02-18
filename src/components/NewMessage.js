import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from '../actions/actionCreators';
import PropTypes from 'prop-types';
import React from 'react';
import { bindAll } from 'lodash';


class NewMessage extends React.Component {

  constructor() {
    super();
    this.state = {

    }
    bindAll(this, [
    ])
  }

  render() {
    const { onChange, onSubmit } = this.props;

    return (
      <div className="new-message">
        <form className="new-message-form" onSubmit={onSubmit}>
          <input
            type="text"
            className="new-message-input"
            placeholder="Say anything..."
            onChange={onChange}
          />
          <button
            type="submit"
            value="Submit"
            className="ok-button"
          >OK</button>
        </form>
      </div>
    );
  }
}

NewMessage.propTypes = {
  actionCreators: PropTypes.object,
};

const mapStateToProps = state => ({
  // accounts: state.accounts
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      // fetchUser
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewMessage);