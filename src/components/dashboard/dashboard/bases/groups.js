import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Title from '../utils/title';
import Table from '../utils/table';

function createData(section1, section2, section3, section4) {
  return { section1, section2, section3, section4 };
}

const head = [
  { id: 'section1', numeric: false, disablePadding: true, label: 'Id' },
  { id: 'section2', numeric: false, disablePadding: false, label: 'Nombres' },
  { id: 'section3', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'section4', numeric: false, disablePadding: false, label: 'Rol' },
];

export default class groups extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const array = [
      createData('1', 'Sebastian Velasco', 'sebas@gmail.com', 'Administrador'),
      createData('1', 'Luis Borja', 'luis@hotmail.com', 'Administrador'),
      createData('2', 'Carlos Torres', 'tesng@gmail.com', 'Pasajero'),
      createData('3', 'Andres Michelli', 'teing@gmail.com', 'Boleteria'),
      createData('3', 'Jose Poa', 'testg@gmail.com', 'Boleteria'),
      createData('2', 'John Dow', 'tdding@gmail.com', 'Pasajero'),
      createData('3', 'Roberto Calo', 'ting@gmail.com', 'Boleteria'),
      createData('1', 'Jose Rodriguez', 'jo@tr.ec', 'Administrador'),
      createData('2', 'Andres Mie', 'teing@gmail.com', 'Pasajero'),
      createData('3', 'Samuel Smith', 'esting@gmail.com', 'Boleteria'),
      createData('2', 'Juan Berela', 'sting@gmail.com', 'Pasajero'),
      createData('2', 'Tati Huea', 'tesng@gmail.com', 'Pasajero'),
      createData('3', 'Andre Pirlo', 'tessff@gmail.com', 'Boleteria'),
    ]
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
            <Typography>Grupos</Typography>
          </Breadcrumbs>
        </div>
        <Title label='Grupos de aplicativos' add={true} btnlabel='Crear grupo' />
        <Table listHead={head} rows={this.state.data} rowsAlign={[1,1,1,1,1]} />
      </div>
    )
  }
}
