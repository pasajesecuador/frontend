import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import VisibilityIcon from '@material-ui/icons/Visibility';
import safe from '../assets/pci.png';
import p2p from '../assets/placetopay-logo.jpg';
import cards from '../assets/cards.png';
import minus from '../assets/svg/minus.svg';
import lockphone from '../assets/svg/mobile-phone.svg';

export default class sectionFive extends Component {
  render() {
    const {classes, i18} = this.props;
    const minWidth480 = window.matchMedia('(min-width: 480px)').matches;
    return (
      <Grid container spacing={5} className={classes.sectionFourContainer} style={{marginTop:100}}>
        <Grid item xs={12}>
          <h3 className={classes.titleWeb}>{i18.ourPartners}</h3>
          <Grid item xs={12} container spacing={2} direction='row'>
            <Grid item xs={12} md={6}>
              <div className={classes.advisingOne}>
                <div className={classes.bottomAd}>
                  <div style={{textAlign:'right',transform:'translate(-35px, 1px)',fontSize:13,fontWeight:700,
                  color:'#254C70',fontFamily: `'Open-Sans', sans-serif`}}>
                    {i18.seeweb}
                  </div>
                  <VisibilityIcon fontSize='small' style={{position:'absolute',top:2,right:9,color:'#2965c1'}} />
                </div>
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <div className={classes.advisingSecond}>
                <div className={classes.bottomAd}>
                  <div style={{textAlign:'right',transform:'translate(-35px, 1px)',fontSize:13,fontWeight:700,
                  color:'#254C70',fontFamily: `'Open-Sans', sans-serif`}}>
                    {i18.seeweb}
                  </div>
                  <VisibilityIcon fontSize='small' style={{position:'absolute',top:2,right:9,color:'#2965c1'}} />
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.cardHolders}>
              <Grid container spacing={1} alignItems='center' justify='space-around'>
                <Grid item xs={12} md={4}>
                  <div style={{textAlign:'center',padding:10,fontFamily: `'Open-Sans', sans-serif`,color:'#4f4f4f'}}>
                    {i18.safety} <img src={safe} width={80} style={{transform:'translate(7px, 10px)'}} alt='safe' />
                  </div>
                  <div style={{textAlign:'center',padding:'0 10px 20px 10px',fontFamily: `'Open-Sans', sans-serif`,color:'#4f4f4f'}}>
                    {i18.cardSlogan}
                  </div>
                </Grid>
                <Grid item xs={4} md={1} style={{textAlign:'center'}}>
                  <img width={70} src={minus} alt='lockphone' />
                </Grid>
                <Grid item xs={4} md={2} style={{textAlign:'center'}}>
                  <img width={70} src={lockphone} alt='lockphone' />
                </Grid>
                <Grid item xs={4} md={1} style={{textAlign:'center'}}>
                  <img width={70} src={minus} alt='lockphone' />
                </Grid>
                <Grid item xs={12} md={4} container spacing={0} alignItems='center' justify='flex-start'>
                  <Grid item xs={12} style={minWidth480 ? {textAlign:'center',paddingRight:'10%'} : {textAlign:'center'}}>
                    <img width={200} src={p2p} alt='img5' />
                  </Grid>
                  <Grid item xs={12} style={minWidth480 ? {textAlign:'center',paddingRight:'10%'} : {textAlign:'center'}}>
                    <img width={200} src={cards} alt='img5' />
                  </Grid>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
