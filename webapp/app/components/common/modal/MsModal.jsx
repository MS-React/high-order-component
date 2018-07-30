import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';

class MsModal extends React.PureComponent {
  static propTypes = {
    okButtonLabel: PropTypes.string,
    cancelButtonLabel: PropTypes.string,
    body: PropTypes.any.isRequired,
    isOpen: PropTypes.bool.isRequired,
    okCallback: PropTypes.func,
    cancelCallback: PropTypes.func.isRequired,
    modalTitle: PropTypes.string.isRequired,
    showFooter: PropTypes.bool
  };

  static defaultProps = {
    showFooter: true
  };

  renderFooter() {
    const { cancelCallback, cancelButtonLabel, okCallback, okButtonLabel, showFooter } = this.props;
    let dataToRender = null;

    if (showFooter) {
      dataToRender = (
        <ModalFooter>
          <Button color="primary" onClick={okCallback}>{okButtonLabel}</Button>{' '}
          <Button color="secondary" onClick={cancelCallback}>{cancelButtonLabel}</Button>
        </ModalFooter>
      );
    }

    return dataToRender;
  }

  render() {
    const { isOpen, cancelCallback, modalTitle, body } = this.props;
    return (
      <Modal isOpen={isOpen} toggle={cancelCallback}>
        <ModalHeader toggle={cancelCallback}>{modalTitle}</ModalHeader>
        <ModalBody>
          {body}
        </ModalBody>
        {this.renderFooter()}
      </Modal>
    );
  }
}

export default MsModal;
