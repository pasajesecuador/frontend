import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Title from '../utils/title';
import Table from '../utils/table';
import Button from '@material-ui/core/IconButton';
import EyeIcon from '@material-ui/icons/VisibilityOutlined';

function createData(section1, section2, section3, section4, section5, section6, section7) {
  return { section1, section2, section3, section4, section5, section6, section7 };
}

const head = [
  { id: 'section1', numeric: false, disablePadding: true, label: 'Empresa' },
  { id: 'section2', numeric: false, disablePadding: false, label: 'Fecha' },
  { id: 'section3', numeric: false, disablePadding: false, label: 'Horario' },
  { id: 'section4', numeric: false, disablePadding: false, label: 'Asientos' },
  { id: 'section5', numeric: false, disablePadding: false, label: 'Vendidos' },
  { id: 'section6', numeric: false, disablePadding: false, label: 'Disponible' },
  { id: 'section7', numeric: false, disablePadding: false, label: 'Acciones' },
];

export default class groupsUsers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const btn = <Button style={{marginLeft: 12}} onClick={this.handleModalSee} aria-label="time" size="small"><EyeIcon /></Button>;
    const array = [
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Baños', '20/01/2021', '05:10 - 14:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Baños', '20/01/2021', '05:10 - 14:50', 42, 5, 37, btn),
      createData('Transportes Baños', '20/01/2021', '05:10 - 14:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Baños', '20/01/2021', '05:10 - 14:50', 42, 5, 37, btn),
      createData('Transportes Baños', '20/01/2021', '05:10 - 14:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Baños', '20/01/2021', '05:10 - 14:50', 42, 5, 37, btn),
      createData('Transportes Baños', '20/01/2021', '05:10 - 14:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Baños', '20/01/2021', '05:10 - 14:50', 42, 5, 37, btn),
      createData('Transportes Baños', '20/01/2021', '05:10 - 14:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
      createData('Transportes Otavalo', '20/01/2021', '05:10 - 07:50', 42, 5, 37, btn),
    ]
    this.setState({
      data: array
    });
  }

  handleModalSee = () => {
    alert('modal');
  }

  render() {
    return (
      <div>
        <div style={{position:'relative'}}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography>Pasajes</Typography>
            <Typography>Admin</Typography>
            <Typography>Grupos</Typography>
            <Typography>Boletería</Typography>
          </Breadcrumbs>
        </div>
        <Title label='Boletos' />
        <Table listHead={head} rows={this.state.data} rowsAlign={[1,1,1,1,1,1,1]} />
      </div>
    )
  }
}
