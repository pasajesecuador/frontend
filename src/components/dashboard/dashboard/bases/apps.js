import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Title from '../utils/title';
import Table from '../utils/table';
import Button from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditLocationOutlined';

function createData(section1, section2, section3, section4, section5, section6, section7, section8) {
  return { section1, section2, section3, section4, section5, section6, section7, section8 };
}

const head = [
  { id: 'section1', numeric: false, disablePadding: true, label: 'Empresa' },
  { id: 'section2', numeric: false, disablePadding: false, label: 'Nombres' },
  { id: 'section3', numeric: false, disablePadding: false, label: 'Cedula' },
  { id: 'section4', numeric: false, disablePadding: false, label: 'Origen - Destino' },
  { id: 'section5', numeric: false, disablePadding: false, label: 'Fecha' },
  { id: 'section6', numeric: false, disablePadding: false, label: 'Hora' },
  { id: 'section7', numeric: false, disablePadding: false, label: 'Cantidad' },
  { id: 'section8', numeric: false, disablePadding: false, label: 'Acciones' },
];

export default class apps extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const btn = <Button style={{marginLeft: 12}} onClick={this.handleModalEdit} aria-label="time" size="small"><EditOutlinedIcon /></Button>;
    const array = [
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
      createData('Transportes Baños', 'John Doe', '1717777780', 'Quito - Guayaquil', '12/01/2021', '05:20 - 18:20', 1, btn),
    ]
    this.setState({
      data: array
    });
  }

  handleModalEdit = () => {
    alert('modal');
  }

  render() {
    return (
      <div>
        <div style={{position:'relative'}}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Pasajes</Typography>
            <Typography>Admin</Typography>
            <Typography>Boletos Vendidos</Typography>
          </Breadcrumbs>
        </div>
        <Title label='Boletos vendidos' />
        <Table listHead={head} rows={this.state.data} rowsAlign={[1,1,1,1,1,1,3,1]} />
      </div>
    )
  }
}
