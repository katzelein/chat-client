import React from 'react';
import PropTypes from 'prop-types';

const NewMessage = ({ onChange, onSubmit, newMessageText }) =>
  <div className="new-message">
    <form className="new-message-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-message-input"
        placeholder="Say anything..."
        onChange={onChange}
        value={newMessageText}
      />
      <button
        type="submit"
        value="Submit"
        className="ok-button"
      >
        OK
      </button>
    </form>
  </div>

NewMessage.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  newMessageText: PropTypes.string
};

export default NewMessage;