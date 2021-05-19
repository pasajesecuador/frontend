import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Title from '../utils/title';
import Typography from '@material-ui/core/Typography';
import Table from '../utils/table';
import Button from '@material-ui/core/IconButton';
import EventIcon from '@material-ui/icons/Event';

function createData(section1, section2, section3, section4, section5) {
  return { section1, section2, section3, section4, section5 };
}

const head = [
  { id: 'section1', numeric: false, disablePadding: true, label: 'Usuario' },
  { id: 'section2', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'section3', numeric: false, disablePadding: false, label: 'Rutas' },
  { id: 'section4', numeric: false, disablePadding: false, label: 'Valor' },
  { id: 'section5', numeric: false, disablePadding: false, label: 'Horarios' },
];

export default class routesC extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const btn = <Button style={{marginLeft: 12}} onClick={this.handleModalSchedule} aria-label="time" size="small"><EventIcon /></Button>;
    const array = []
    for (let index = 0; index < this.props.companies.length; index++) {
      const element = this.props.companies[index];
      const x = createData(element.COD_RUTA, element.OPERADORA, element.RUTA, `$${(Math.random() * (20 - 3) + 4).toFixed(0)} USD`, btn)
      array.push(x)
    }
    this.setState({
      data: array
    });
  }

  handleModalSchedule = () => {
    alert('modal');
  }

  render() {
    return (
      <div>
        <div style={{position:'relative'}}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Pasajes</Typography>
            <Typography>Admin</Typography>
            <Typography>Rutas</Typography>
          </Breadcrumbs>
        </div>
        <Title label='Rutas de viaje' />
        <Table listHead={head} rows={this.state.data} rowsAlign={[1,1,1,1,1]} />
      </div>
    )
  }
}
