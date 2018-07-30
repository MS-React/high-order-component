import React from 'react';
import { shallow } from 'enzyme';
import MsModal from './MsModal';

function setup(props) {
  return shallow(<MsModal {...props} />);
}

describe('<MsModal /> component', () => {
  let defaultProps;

  beforeEach(() => {
    defaultProps = {
      okButtonLabel: 'Ok',
      cancelButtonLabel: 'cancel',
      body: {},
      isOpen: false,
      modalTitle: 'Modal Test',
      okCallback: () => {},
      cancelCallback: () => {}
    };
  });

  it('renders itself', () => {
    // Act
    const wrapper = setup(defaultProps);

    // Assert
    expect(wrapper.find('Modal')).toHaveLength(1);
    expect(wrapper.find('ModalFooter')).toHaveLength(1);
  });

  it('renders modal without footer', () => {
    // Act
    defaultProps.showFooter = false;
    const wrapper = setup(defaultProps);

    // Assert
    expect(wrapper.find('Modal')).toHaveLength(1);
    expect(wrapper.find('ModalFooter')).toHaveLength(0);
  });
});
