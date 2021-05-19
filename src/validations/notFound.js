import React, { Component } from 'react';
import notF from '../components/templates/assets/3800242.jpg';

export default class notFound extends Component {
  render() {
    return (
      <div style={{width:'50%',margin:'0 auto'}}>
        <img src={notF} style={{width:'100%'}} alt='not found' />
      </div>
    )
  }
}
