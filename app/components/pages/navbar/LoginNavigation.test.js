import React from 'react';
import LoginNavigation from './LoginNavigation';
import { shallow } from 'enzyme';

function setup() {
  return shallow(<LoginNavigation />);
}

describe('<LoginNavigation /> component', () => {
  it('renders itself', () => {
    const wrapper = setup();

    expect(wrapper.find('Navbar')).toHaveLength(1);
    expect(wrapper.find('NavbarBrand')).toHaveLength(1);
    expect(wrapper.find('NavbarToggler')).toHaveLength(1);
    expect(wrapper.find('Collapse')).toHaveLength(1);
    expect(wrapper.find('Nav')).toHaveLength(1);
    expect(wrapper.find('NavItem')).toHaveLength(1);
    expect(wrapper.find('Button')).toHaveLength(1);
    expect(wrapper.find('MsModal')).toHaveLength(1);
  });

  it('should toggle navigation bar', () => {
    const wrapper = setup();

    wrapper.find('NavbarToggler').simulate('click');

    expect(wrapper.state()).toEqual({
      isOpen: true,
      isOpenLogin: false
    });
  });

  it('should open modal when login button is clicked', () => {
    const wrapper = setup();

    wrapper.find('Button').simulate('click');

    expect(wrapper.state()).toEqual({
      isOpen: false,
      isOpenLogin: true
    });
  });
});
