import React from 'react'
import { withRouter } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ImageIcon from '@material-ui/icons/Image';

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
      maxWidth:260,
    }

}));
function UsersItem(props) {
    const {account} = props;
    const {user} = account;
    const classes = useStyles();

    const showStatus = (status)=>{
        var result =null;
        if(status==="ACTIVE")
        {
          result = <Button variant="contained" color="secondary">
                      ACTIVE
                    </Button>
        }
        if(status === "UNVERIFIED")
        {
          result = <Button variant="contained">UNVERIFIED</Button>
        }
        if(status==="PENDING")
        {
          result =<Button variant="outlined" color="secondary">
                  Secondary
                </Button>
        }
        if(status==="LOCKED")
        {
          result =<Button variant="outlined">LOCKED</Button>
        }

        return result;
    }

    const onClickItem =(e)=>{
        console.log(user.id)
        props.history.push(`/admin/users/${user.id}`)
    }
    return (
        <div onClick={onClickItem}>
            <ListItem   button 
            primaryText="This is the first list item"
            >
              <ListItemAvatar>
          <Avatar>
            <AccountCircleIcon />
          </Avatar>
        </ListItemAvatar>
            <ListItemText className={classes.item} primary={user.displayName} secondary={user.username} />

              <ListItemText className={classes.item} primary={user.email}  />
              <ListItemText className={classes.item} primary={account.accountNumber}  />
              {showStatus(account.status)} 
            </ListItem>
            <Divider  />
        </div>
    )
}

export default withRouter(UsersItem)
