import React , { useState , useEffect } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import ItemUser from './UsersItem';
import {actGetAllUser,actGetAllUserPending} from '../../store/actions/admin';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: 600,
        maxWidth: 1700,
        backgroundColor: theme.palette.background.paper,
        
        overflow: 'auto',
        maxHeight: 700,
    },
    item:{
      width: '100%',
      maxWidth:300,
    }

  }));


function Users(props) {
    const {pending} =props;

    const [listUser,setListUser] = useState();
    const [listSeach,setListSeach] = useState();
    const [seach,setSeach] =useState();
    
    useEffect(()=>{
      if(pending===true){
        props.getAllUserPending();
      }else
      {
        props.getAllUser()
      }
      
    },[])

    useEffect(()=>{
      const {listUser} =props.admin;
      console.log(listUser)
      setListUser(listUser);
      setListSeach(listUser)
    },[props.admin])
    const classes1 = useStyles();

    const onClickItem =(item)=>{
      console.log(item)
  }

  
    const showListUser = (listUser)=> {
      var result = null;
      
      if(listUser.length > 0)
      {
          result = listUser.map((item,index)=>{
            const {user }= item;
              return (
                <ItemUser account={item}/>
              )
          })
      }
      return result;
    }

    const onChangeSeach = e=>{
      setSeach(e.currentTarget.value);
    }

    const onClickSeach = e => {
      e.preventDefault();

      if(seach === ''){
        setListSeach(listUser)
      }

      const regex = new RegExp(seach,'i')
      const result = listUser.filter(x =>{
        console.log(x.user)
        return x.accountNumber.toLowerCase().toString().match(regex) || x.user.username.toLowerCase().toString().match(regex) || x.user.displayName.toLowerCase().toString().match(regex);
      })
      
      setListSeach (result);

    }

    const onClickListUser = (e)=>{
      props.history.goBack();
    }

    const classes = useStyles();

    if(window.location.pathname=="/admin"){
      return <Redirect to="/admin" />
    }
    return (
        <div className="row justify-content-center my-5">
        <div className="col-md-10 row justify-content-center">
          <div className="row justify-content-center">
            <div className="col-">  
              <div className="card text-center shadow-lg">

                <div className="card-body">
               
                <div className="card-body">
               
                  <form method="POST" className="form-inline my-2 my-lg-0" action="/admin/users">
                  <Button className="mr-5" variant="outlined" color="primary" onClick={onClickListUser}>
                      Back   
                  </Button>
                    <input onChange={onChangeSeach} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" name="search" id="search" />
                    <button onClick={onClickSeach} className="btn btn-outline-success my-2 my-sm-0">Search</button>
                  </form>
                  </div>

                </div>

              </div>
            </div>
          </div>
          {/* Users */}
          <Paper className={classes.root} style={{ height:500 , width: 1500, padding: 15, margin: 25 }}>
            <List >
              {listSeach?showListUser(listSeach):''}
            </List>
          </Paper>
       
          {/* End Users */}
        </div>
      </div>
    )
}
const mapStateToProps = state => {
  return {
    admin : state.admin,
  }
}
const mapDispatchToProps = dispatch => {
  return{
    getAllUser : ()=>{
      dispatch(actGetAllUser());
    },
    getAllUserPending : ()=>{
      dispatch(actGetAllUserPending())
    }
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Users))
