import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Title from '../utils/title';
import Table from '../utils/table';
import axios from 'axios';

function createData(section1, section2, section3, section4, section5) {
  return { section1, section2, section3, section4, section5 };
}

const head = [
  { id: 'section1', numeric: false, disablePadding: true, label: 'Usuario' },
  { id: 'section2', numeric: false, disablePadding: false, label: 'Nombres' },
  { id: 'section3', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'section4', numeric: false, disablePadding: false, label: 'Activo' },
  { id: 'section5', numeric: false, disablePadding: false, label: 'Empresa' },
  { id: 'section6', numeric: false, disablePadding: false, label: 'Empresa' },
  { id: 'section7', numeric: false, disablePadding: false, label: 'Empresa' },
];

export default class users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const array = []
    axios.get('/api/trip/admin/users/get')
      .then(res => {
        for (let index = 0; index < res.data.length; index++) {
          const element = res.data[index];
          const x = createData(element.user, element.names, element.idNumber, element.email, element.country, element.city, element.rol)
          array.push(x);
        }
      })
    this.setState({
      data: array
    });
  }

  render() {
    return (
      <div>
        <div style={{position:'relative'}}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Pasajes</Typography>
            <Typography>Admin</Typography>
            <Typography>Usuarios</Typography>
          </Breadcrumbs>
        </div>
        <Title label='Todos los usuarios' btnlabel='Crear usuario' add={true} />
        <Table listHead={head} rows={this.state.data} rowsAlign={[1,1,1,1,1]} />
      </div>
    )
  }
}
