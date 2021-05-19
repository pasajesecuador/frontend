import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Sierra from '../assets/regions/dawn-on-the-road.webp';
import Costa from '../assets/regions/chair-table-dinning-beach-sea-with-blue-sky.webp';
import Oriente from '../assets/regions/40522.webp';
import Trips from '../assets/regions/traffic-vehicle-urban-reflections-city.webp';
import quito from '../assets/regions/q.webp';
import q from '../assets/regions/1667446.webp';
import manta from '../assets/regions/manta.webp';
import pla from '../assets/regions/pla.jfif';
import am from '../assets/regions/am.webp';
import ata from '../assets/regions/ata.jpg';

export default class sectionTwo extends Component {
  render() {
    const {classes} = this.props;
    const {i18} = this.props;
    const minWidth480 = window.matchMedia('(min-width: 480px)').matches;
    return (
      <Grid container spacing={5} className={classes.gridRoutes}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <div className={classes.regions}>
                <img src={Sierra} alt='imgTrips' />
                <div className={classes.regionsTop}>
                  <div className={classes.regionTopTitle}>
                    <span>{i18.roads}</span>
                  </div>
                  <div className={classes.fontTopBottom}>
                    <span>Sierra</span>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className={classes.regions}>
                <img src={Costa} alt='imgTrips' />
                <div className={classes.regionsTop}>
                  <div className={classes.regionTopTitle}>
                    <span>{i18.roads}</span>
                  </div>
                  <div className={classes.fontTopBottom}>
                    <span>Costa</span>
                  </div>
                </div>
              </div>
              <div></div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className={classes.regions}>
                <img src={Oriente} alt='imgTrips' />
                <div className={classes.regionsTop}>
                  <div className={classes.regionTopTitle}>
                    <span>{i18.roads}</span>
                  </div>
                  <div className={classes.fontTopBottom}>
                    <span>Amazonia</span>
                  </div>
                </div>
              </div>
              <div></div>
            </Grid>
            <Grid item xs={6} md={3}>
              <div className={classes.regions}>
                <img src={Trips} alt='imgTrips' />
                <div className={classes.regionsTop}>
                  <div className={classes.regionTopTitle}>
                    <span>{i18.roads}</span>
                  </div>
                  <div className={classes.fontTopBottom}>
                    <span>{i18.seemore}</span>
                  </div>
                </div>
              </div>
              <div></div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <h3 className={classes.titleWeb}>{i18.trips}</h3>
          <Grid container spacing={3} style={{padding:'0 50px'}}>
            <Grid item xs={12} md={4} style={{borderRadius:20,boxShadow:'0 1px 12px 1px rgba(0,0,0,0.25)'}}>
              <Grid container>
                <Grid item xs={6}>
                  <img style={{width:'100%',objectFit:'cover',height:200,borderRadius:'20px 0 0 0'}} src={quito} alt='img_3' />
                </Grid>
                <Grid item xs={6}>
                  <div style={{width:'100%',height:200}}>
                    <div style={{height:100}}>
                      <img style={{width:'100%',objectFit:'cover',height:100,borderRadius:'0 20px 0 0'}} src={q} alt='img_3' />
                    </div>
                    <div style={{height:100}}>
                      <img style={{width:'100%',objectFit:'cover',height:100}} src={manta} alt='img_3' />
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.fontTitleRoutes}>{i18.ticket}</div>
                  <div className={classes.fontSubRoutes}>Quito - Manta</div>
                </Grid>
              </Grid>
            </Grid>
            {minWidth480 ? (
            <Grid item xs={4}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div style={{position:'relative'}}>
                    <img style={{width:'100%',objectFit:'cover',height:160,borderRadius:20}} src={ata} alt='img_4' />
                    <div style={{position:'absolute',left:0,bottom:4,background:'#0000008f',color:'#fff',
                    padding:7,width:'92.5%',borderRadius:'0 0 20px 20px'}}>
                      Quito - Atacames
                    </div>
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div style={{position:'relative'}}>
                    <img style={{width:'100%',objectFit:'cover',height:160,borderRadius:20}} src={am} alt='img_4' />
                    <div style={{position:'absolute',left:0,bottom:4,background:'#0000008f',color:'#fff',
                    padding:7,width:'92.5%',borderRadius:'0 0 20px 20px'}}>
                      Manta - Ambato
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <div>
                    <img style={{width:'100%',height:120,borderRadius:50}} src={pla} alt='img_4' />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            ) : null}
            <Grid item xs={12} md={4} 
              style={minWidth480 ? {borderRadius:20,boxShadow:'0 1px 12px 1px rgba(0,0,0,0.25)'} :
               {borderRadius:20,boxShadow:'0 1px 12px 1px rgba(0,0,0,0.25)', marginTop: 25}}>
              <Grid container>
                <Grid item xs={6}>
                  <img style={{width:'100%',objectFit:'cover',height:200,borderRadius:'20px 0 0 0'}} src={q} alt='img_3' />
                </Grid>
                <Grid item xs={6}>
                  <img style={{width:'100%',objectFit:'cover',height:200,borderRadius:'0 20px 0 0'}} src={am} alt='img_3' />
                </Grid>
                <Grid item xs={12}>
                  <div className={classes.fontTitleRoutes}>{i18.ticket}</div>
                  <div className={classes.fontSubRoutes}>Quito - Ambato</div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
