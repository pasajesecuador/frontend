import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import smartphone from '../assets/svg/smartphone.svg';
import customer from '../assets/svg/customer.svg';
import place from '../assets/svg/place.svg';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import MedicalIcon from '../assets/svg/hand-holding-medical-solid.svg';
import userIcon from '../assets/svg/user-cog-solid.svg';
import handsHelping from '../assets/svg/hands-helping-solid.svg';
import { Button } from '@material-ui/core';

export default class sectionThree extends Component {
  render() {
    const {classes} = this.props;
    const {i18} = this.props;
    const minWidth480 = window.matchMedia('(min-width: 480px)').matches;
    return (
      <Grid container spacing={5} className={classes.sectionFourContainer}>
        <Grid item xs={12}>
          <h3 className={classes.titleWeb}>{i18.whatis}</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <Grid item xs={12}>
                <div>
                  <video width='100%' controls>
                    <source src="https://www.pasajesecuador.com/video/pasajesecuador.webm" type="video/webm" />
                  </video>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} md={7} container direction='row' spacing={2}>
              <Grid item xs={4}>
                <div className={classes.infoSection4}>
                  <div>
                    <img src={customer} style={{width:70}} alt='img_7' />
                  </div>
                  <div className={classes.fontInfoS4}>
                    <span>{i18.section3Title1}</span>
                  </div>
                  {minWidth480 ? (
                  <div className={classes.fontSubInfoS4}>
                    <p>{i18.section3SubText1}</p>
                  </div>
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.infoSection4}>
                  <div>
                    <img src={place} style={{width:70}} alt='img_7' />
                  </div>
                  <div className={classes.fontInfoS4}>
                    <span>{i18.section3Title2}</span>
                  </div>
                  {minWidth480 ? (
                  <div className={classes.fontSubInfoS4}>
                    <p>{i18.section3SubText2}</p>
                  </div>
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div className={classes.infoSection4}>
                  <div>
                    <img src={smartphone} style={{width:70}} alt='img_7' />
                  </div>
                  <div className={classes.fontInfoS4}>
                    <span>{i18.section3Title3}</span>
                  </div>
                  {minWidth480 ? (
                  <div className={classes.fontSubInfoS4}>
                    <p>{i18.section3SubText3}</p>
                  </div>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h3 className={classes.titleWebAdvice}><VerifiedUserIcon fontSize='large' /> {i18.advices}</h3>
          <Grid item xs={12} container direction='row' spacing={3}>
            <Grid item xs={12} md={4}>
              <div className={classes.securities}>
                <div>
                  <img src={userIcon} width={40} alt='user_admin' />
                </div>
                <div style={{fontSize:16,fontWeight:700,fontFamily:`'Quicksand', sans-serif`}}>
                  {i18.flexible}
                </div>
                <div style={{color:'#4f4f4f',fontSize:14,height:70}}>
                  {i18.flexibleSubText}
                </div>
                <div style={{textAlign:'right',paddingRight:10}}>
                  <Button className={classes.securityBtn} variant='outlined'>{i18.searchSectionThree}</Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.securities}>
                <div>
                  <img src={MedicalIcon} width={40} alt='Medical' />
                </div>
                <div style={{fontSize:16,fontWeight:700,fontFamily:`'Quicksand', sans-serif`}}>Covid-19</div>
                <div style={{color:'#4f4f4f',fontSize:14,height:70}}>
                  {i18.covidSub}
                </div>
                <div style={{textAlign:'right',paddingRight:10}}>
                  <Button className={classes.securityBtn} variant='outlined'>{i18.see}</Button>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <div className={classes.securities}>
                <div>
                  <img src={handsHelping} width={40} alt='handsHelp' />
                </div>
                <div style={{fontSize:16,fontWeight:700,fontFamily:`'Quicksand', sans-serif`}}>
                  {i18.autogestion}
                </div>
                <div style={{color:'#4f4f4f',fontSize:14,height:74}}>
                  {i18.autogestionSubText}
                </div>
                <div style={{textAlign:'right',paddingRight:10}}>
                  <Button className={classes.securityBtn} variant='outlined'>{i18.see}</Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
