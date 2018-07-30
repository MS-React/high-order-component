import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'reactstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as usersActions from '../../../actions/usersActions';
import Header from './../partials/header/Header';
import ActionButtons from '../ActionButtons/ActionButtons';
import './HomePage.css';

export class HomePage extends React.Component {
  static propTypes = {
    users: PropTypes.array,
    usersActions: PropTypes.object.isRequired
  };

  state = {
    selectedRow: [],
    user: {}
  };

  componentDidMount() {
    this.props.usersActions.getUsers();
  }

  setSelectedRow = (user) => {
    this.setState({
      selectedRow: [user.id]
    }, () => {
      if (typeof this.props.usersActions.selectUser === 'function') {
        this.props.usersActions.selectUser(user);
      }
    });
  };

  handleUserActionType = (type = 'add', user) => {
    const { usersActions } = this.props;
    
    switch(type) {
      case 'add': 
        return usersActions.createUser(user);
      case 'edit':
        return usersActions.updateUser(user);
      case 'delete':
        return usersActions.deleteUser(user);
      default:
        // TODO define e common logging mechanism
        // throw new TypeError(`Unhandled User Action Type ${type}`);
        usersActions.createUser(user);
    }
  };

  render() {
    const columns = [{
      dataField: 'name',
      text: 'Full Name'
    }, {
      dataField: 'email',
      text: 'Email'
    }, {
      dataField: 'phone',
      text: 'Phone Number'
    }];

    const selectRow = {
      mode: 'radio',
      clickToSelect: true,
      bgColor: '#c8e6c9',
      selected: this.state.selectedRow,
      onSelect: this.setSelectedRow
    };

    const pagination = paginationFactory();
    
    return (
      <div>
        <Header />
        <div className="container">
          <Row>
            <Col md="8">
              <h4>Users List</h4>
            </Col>
            <Col md="4">
              <ActionButtons
                user={this.state.user}
                onConfirm={this.handleUserActionType}
              />
            </Col>
          </Row>
          <BootstrapTable
            keyField='id'
            data={ this.props.users }
            columns={ columns }
            selectRow={ selectRow }
            pagination={ pagination }
          />
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    users: state.users.data
  };
}

export function mapDispatchToProps(dispatch) {
  return {
    usersActions: bindActionCreators(usersActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
