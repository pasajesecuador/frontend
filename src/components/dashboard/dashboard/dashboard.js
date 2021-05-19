import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Navbar from './navbar/navbar';
import Profile from './bases/userProfile';
import { getCompanies } from '../../../actions/drawer';

class dashboard extends Component {
  componentDidMount(){
    this.props.getCompanies();
  }
  render() {
    return (
      <div>
        <Navbar>
          <Profile profile={this.props.profile.profile} />
        </Navbar>
      </div>
    )
  }
}

dashboard.propTypes = {
  getCompanies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {getCompanies})(dashboard);
