import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Title from '../utils/title';
import Table from '../utils/table';

function createData(section1, section2, section3, section4, section5) {
  return { section1, section2, section3, section4, section5 };
}

const head = [
  { id: 'section1', numeric: false, disablePadding: true, label: 'Id' },
  { id: 'section2', numeric: false, disablePadding: false, label: 'Ciudades' },
  { id: 'section3', numeric: false, disablePadding: false, label: 'Destinos' },
  { id: 'section4', numeric: false, disablePadding: false, label: 'Operadoras' },
];

export default class cities extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const array = []
    for (let index = 0; index < this.props.companies.length; index++) {
      const element = this.props.companies[index];
      const x = createData(element.COD_RUTA, element.ORIGEN, element.DESTINO, element.OPERADORA)
      array.push(x)
    }
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
            <Typography>Ciudades</Typography>
          </Breadcrumbs>
        </div>
        <Title label='Ciudades' />
        <Table listHead={head} rows={this.state.data} rowsAlign={[1,1,1,1]} />
      </div>
    )
  }
}
