import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withStyles } from '@material-ui/styles';
import { Stylescss } from './styled/style';
import { logoutUser } from '../../actions/auth';
import { getCities } from '../../actions/drawer';
import { setEn, setEs } from '../../ducks/i18n';
import i18 from '../../i18n';
import Navbar from './navbar/navbar';
import FirstSection from './bases/sectionOne';
import SecondSection from './bases/sectionTwo';
import ThirdSection from './bases/sectionThree';
import FiveSection from './bases/sectionFive';
import SixSection from './bases/sectionSix';
import Footer from './navbar/footer';

class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      id: ''
    }
  }
  
  componentDidMount(){
    localStorage.removeItem('s_s_s');

    const lang = localStorage.getItem('language')
    if(lang === null){
      this.props.setEs()
    } else if(lang === 'es'){
      this.props.setEs();
    } else {
      this.props.setEn();
    }
  }

  render() {
    return (
      <div>
        <Navbar props={this.props} i18={i18} />
        <FirstSection props={this.props} i18={i18} />
        <SecondSection classes={this.props.classes} i18={i18} />
        <ThirdSection classes={this.props.classes} i18={i18} />
        <FiveSection classes={this.props.classes} i18={i18} />
        <SixSection classes={this.props.classes} i18={i18} />
        <Footer i18={i18} />
      </div>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  getCities: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  loading: state.loading,
  profile: state.profile,
  common: state.common
});

export default compose(connect(mapStateToProps, {
  logoutUser,
  getCities,
  setEn, 
  setEs
}), withStyles(Stylescss, {withTheme:true}))(Home);
