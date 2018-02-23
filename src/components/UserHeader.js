import React from 'react';
import PropTypes from 'prop-types';

const UserHeader = ({ userName, headerText }) =>
  <div>
    <div className="user-header" >
      <a href="http://github.com/katzelein" className="title-logo" >
        Chattie
      </a>
      { userName }
      <div className="smile-logo">: )</div>
    </div>
    <div className="message-header">
      { headerText }
    </div>
  </div>

UserHeader.propTypes = {
  userName: PropTypes.string,
};

export default UserHeader;