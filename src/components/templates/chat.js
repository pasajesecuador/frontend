import React, { Component } from 'react';
import {cookieAuth} from '../../validations/authCookie';
import SocketIoClient from 'socket.io-client';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';

export default class chat extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      textmsg: '',
      id: '',
      socket: SocketIoClient('/private_tracker'),
      authKey: false,
      chat: [],
      users: [],
      userSelected: '',
      sender: '',
    }
    this.scrollmsg = React.createRef();
  }
  

  componentDidMount(){
    if(cookieAuth('_uuv')){
      const authenticate = cookieAuth('_uuv') === 'True' ? true : false;
      if(authenticate) {
        axios.get('/api/auth/all/users/chat').then(users => {
          this.setState({users:users.data})
        })
        this.setState({authKey: true});
        axios.get('/api/auth/current/user')
          .then(user => {
            const idUser = user.data.id;
            this.setState({id:idUser});
            this.state.socket.emit('username', idUser);
          })
        this.state.socket.on('tracker', (payload) => {
          const newChat = {
            text: payload.text,
            sender: payload.sender
          }
          this.setState(state => ({
            chat: state.chat.concat(newChat),
            sender: payload.sender
          }))
          this.scrollmsg.current.scrollTop = this.scrollmsg.current.scrollHeight
        })
      }
    }
  }

  send = (e) => {
    e.preventDefault();

    if(this.state.authKey){
      this.state.socket.emit('update_tracker', {
        id: this.state.userSelected || this.state.sender, 
        msg: this.state.textmsg,
        idSender: this.state.id
      });
      const newChat = {
        text: this.state.textmsg,
        sender: this.state.id
      }
      this.setState(state => ({
        chat: state.chat.concat(newChat)
      }))
      setTimeout(() => {
        this.scrollmsg.current.scrollTop = this.scrollmsg.current.scrollHeight;
      }, 500);
    }
    this.setState({
      textmsg: ''
    });
  }

  render() {
    const { chat, users, id } = this.state;
    return (
      <div style={{width:'98%',boxSizing:'content-box',height:'100vh',marginTop:10}}>
        <Grid container spacing={0} style={{flexGrow:1}} >
          <Grid item container xs={8} style={{position:'relative'}}>
            <div className='chat_container' ref={this.scrollmsg} 
            style={{display:'flex',flexDirection:'column', width:'100%',height:550,overflowY:'auto'}}>
              {chat.map((c, i) => 
                <div key={i}
                  style={{boxShadow:'0 3px 12px 0 rgba(0,0,0,0.15)', borderRadius:20,padding:10,margin:10,
                          maxWidth:'45%', alignSelf:(c.sender === id ? 'flex-start' : 'flex-end'),
                          overflowWrap: 'anywhere',
                          background:(c.sender === id ? 'rgba(255,255,255,0.5)' : 'rgba(90, 186, 20,0.5)')
                        }}>
                  <p className='chatfont'>{c.text}</p>
                </div>
              )}
            </div>
            <div style={{position:'absolute',bottom:-60,left:20,right:30}}>
              {this.state.userSelected === '' && chat.length === 0 ? null : (
              <div style={{width:'100%',padding:5}}>
                <form onSubmit={this.send}>
                  <input style={{padding:15,width:'90%',outline:'none',
                        border:0,boxShadow:'0 1px 12px 0 #136caed6',borderRadius:10
                      }}
                    value={this.state.textmsg}
                    placeholder='Escribe aqui'
                    onChange={(e) => this.setState({textmsg:e.target.value})} />
                </form>
              </div>
              )}
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className='users_container' 
              style={{
                width:'100%',marginTop:15, padding:5,
                borderRadius:20,height:550,overflowY:'auto',
                boxShadow:'0 1px 12px 1px rgba(0,0,0,0.25)'
            }}>
              {id !== '' && users.map((chatuser, i) => 
                chatuser._id === id ? null : (
                <div style={{borderBottom:'1px solid rgb(185 185 185)', cursor: 'pointer', marginTop:20,padding:10}} 
                  key={i} onClick={() => this.setState({userSelected: chatuser._id, chat:[]})}>
                  {chatuser.names}
                </div>
                )
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
}
