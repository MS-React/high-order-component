import React from 'react';
import {
  Button,
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from 'reactstrap';
import MsModal from '../../common/modal/MsModal';
import LoginFormTop from '../login/LoginFormTop';

export default class LoginNavigation extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      isOpenLogin: false
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleLogin = () => {
    this.setState({
      isOpenLogin: !this.state.isOpenLogin
    });
  }

  renderLoginForm() {
    return <LoginFormTop />;
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">HOC Login</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <Button onClick={this.toggleLogin}>Login</Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <MsModal
          body={this.renderLoginForm()}
          cancelCallback={this.toggleLogin}
          isOpen={this.state.isOpenLogin}
          showFooter={false}
          modalTitle="Login" />
      </div>
    );
  }
}
