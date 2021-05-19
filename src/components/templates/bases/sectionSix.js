import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import quito from '../assets/qui.webp';
import otavalo from '../assets/ota.webp';
import quilotoa from '../assets/Quilotoa.webp';
import frailes from '../assets/frailes.webp';
import banos from '../assets/b.webp';
import reina from '../assets/companies/reina.png';

export default class sectionSix extends Component {
  render() {
    const {classes, i18} = this.props;
    return (
      <Grid container spacing={5} className={classes.sectionFourContainer} style={{marginTop:70, marginBottom:180}}>
        <h3 className={classes.titleWeb}>{i18.whattodoTitle}</h3>
        <Grid item xs={12} container direction='row' spacing={1}>
          <Grid item xs={12} md={6} style={{position:'relative'}}>
            <img width='100%' src={quito} alt='img_activities' style={{height:'100%',objectFit:'cover'}} />
            <div className={classes.travelFont}>
              Quito
            </div>
          </Grid>
          <Grid item xs={12} md={6} container spacing={1}>
            <Grid item xs={6} style={{position:'relative'}}>
              <img width='100%' src={quilotoa} alt='img_activities' style={{height:'100%',objectFit:'cover'}} />
              <div className={classes.travelFont} style={{fontSize:14}}>
                Quilotoa
              </div>
            </Grid>
            <Grid item xs={6} style={{position:'relative'}}>
              <img width='100%' src={banos} alt='img_activities' style={{height:'100%',objectFit:'cover'}} />
              <div className={classes.travelFont} style={{fontSize:14,width:'60%'}}>
                Baños de Agua Santa
              </div>
            </Grid>
            <Grid item xs={6} style={{position:'relative'}}>
              <img width='100%' src={frailes} alt='img_activities' style={{height:'100%',objectFit:'cover'}} />
              <div className={classes.travelFont} style={{fontSize:14}}>
                Los Frailes
              </div>
            </Grid>
            <Grid item xs={6} style={{position:'relative'}}>
              <img width='100%' src={otavalo} alt='img_activities' style={{height:'100%',objectFit:'cover'}} />
              <div className={classes.travelFont} style={{fontSize:14}}>
                Otavalo
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} style={{textAlign:'center'}}>
            <Grid item xs={4}>
              <div className={classes.companiesImg}>
                <img width='100%' src={reina} alt='img_activities' style={{height:'100%',objectFit:'contain'}} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.companiesImg}>
                <img width='100%' src={reina} alt='img_activities' style={{height:'100%',objectFit:'contain'}} />
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.companiesImg}>
                <img width='100%' src={reina} alt='img_activities' style={{height:'100%',objectFit:'contain'}} />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
