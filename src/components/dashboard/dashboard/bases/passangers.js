import React, { Component } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Title from '../utils/title';
import Table from '../utils/table';
import Button from '@material-ui/core/IconButton';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

function createData(section1, section2, section3, section4, section5, section6, section7) {
  return { section1, section2, section3, section4, section5, section6, section7 };
}

const head = [
  { id: 'section1', numeric: false, disablePadding: true, label: 'Usuario' },
  { id: 'section2', numeric: false, disablePadding: false, label: 'Nombre' },
  { id: 'section3', numeric: false, disablePadding: false, label: 'Apellido' },
  { id: 'section4', numeric: false, disablePadding: false, label: 'Cedula' },
  { id: 'section5', numeric: false, disablePadding: false, label: 'Edad' },
  { id: 'section6', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'section7', numeric: false, disablePadding: false, label: 'Acciones' },
];

export default class passangers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const btn = <Button style={{marginLeft: 12}} onClick={this.handleModalEdit} aria-label="time" size="small"><EditOutlinedIcon /></Button>;
    const array = [
      createData('sebas', 'Sebastian', 'Bastidas', '1717821545', 27, 'sebas@hotmail.com', btn),
      createData('luis', 'Luis', 'Borja', '1717881545', 30, 'luis@gmail.com', btn),
      createData('dacar', 'Dario', 'Rodriguez', '1717841545', 25, 'dcar@outlook', btn),
      createData('jrodri', 'Jose', 'Carlo', '1717827545', 24, 'jr@gmail.com', btn),
      createData('tuirin', 'Talia', 'Piero', '0417821545', 21, 't@er.com', btn),
      createData('smith', 'Samuel', 'Smith', '1817821545', 19, 'treo@mu.ec', btn),
      createData('carvu', 'Carlos', 'Jobs', '2117821545', 10, 'port@ws.ec', btn),
      createData('gonza', 'Gonzalo', 'Michells', '9517821545', 15, 'mtro@desh.com', btn),
      createData('sebas', 'Sebastian', 'Bastidas', '2117821545', 27, 'yurl@gmail.com', btn),
      createData('turini', 'Tatiana', 'Michellini', '0417821545', 14, 'wsf@outlook.com', btn),
      createData('luis', 'Luis', 'Borja', '0917821545', 30, 'bret@ws.com', btn),
      createData('sebas', 'Sebastian', 'Bastidas', '9717821545', 27, 'sebas@hotmail.com', btn),
      createData('gonza', 'Gonzalo', 'Michells', '4217821545', 15, 'gonza@outlook.com', btn),
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
            <Typography>Pasajeros</Typography>
          </Breadcrumbs>
        </div>
        <Title label='Todos los pasajeros' />
        <Table listHead={head} rows={this.state.data} rowsAlign={[1,1,1,1,1,1,1]} />
      </div>
    )
  }
}
