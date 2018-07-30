import React from 'react';
import PropTypes from 'prop-types';
import UsersForm from '../UsersForm/UsersForm';

class MsModal extends React.PureComponent {
  static propTypes= {
    onChange: PropTypes.func.isRequired,
    actionType: PropTypes.string
  };

  render() {
    const {
      user,
      errors
    } = this.state;

    if (this.props.actionType === 'delete') {
      return (
        <p>{`Are you sure to delete User ${user.name}`}</p>
      );
    }

    return (
      <UsersForm
        onChange={this.updateUserState}
        user={user}
        errors={errors}
      />
    );
  }
}

export default MsModal;
