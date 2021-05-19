import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Title from '../utils/title';
import Table from '../utils/table';

function createData(section1, section2, section3, section4) {
  return { section1, section2, section3, section4 };
}

const head = [
  { id: 'section1', numeric: false, disablePadding: true, label: 'Usuario' },
  { id: 'section2', numeric: false, disablePadding: false, label: 'Empresa' },
  { id: 'section3', numeric: false, disablePadding: false, label: 'Provincia' },
  { id: 'section4', numeric: false, disablePadding: false, label: 'Asientos' },
];

export default class companies extends Component {
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
      const x = createData(element.COD_RUTA, element.OPERADORA, element.PROVINCIA, 42)
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
            <Typography>Empresas</Typography>
          </Breadcrumbs>
        </div>
        <Title label='Compañías' add={true} btnlabel='Crear compañia' />
        <Table listHead={head} rows={this.state.data} rowsAlign={[1,1,1,1]} />
      </div>
    )
  }
}
