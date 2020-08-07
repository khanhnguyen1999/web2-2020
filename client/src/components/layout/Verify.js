import React , {useState,useEffect} from 'react';
import { connect } from 'react-redux';
import {  withRouter } from 'react-router-dom';
import Message from '../message/Message';
import {actGetAccount} from '../../store/actions/account';
import {actPostVerifyImage,actRefreshUser,actGetUserByEmail} from '../../store/actions/login'
import Error from '../message/Error';
import axios from 'axios';

function Verify(props) {
    const [image,setImage] = useState();
    const [imageURL,setImageURL] = useState();
    const [account, setAccount] = useState();
    const [error, setError] = useState();
    const [user, setUser] = useState();
    const [success, setSuccess] = useState();
    useEffect(()=>{
        const {user} = props.user;
        console.log(user)
        props.getUser(user.email)
        setUser(user)
        props.getAccount(user.id);
    },[])

    useEffect(()=>{
        console.log(props.account)
        setAccount(props.account)
    },[props.account])

    useEffect(()=>{
        const user = props.user;
        console.log(user)
        setUser(user.user)
        if(user.successPostVerifyImage===true)
        {
            setSuccess(true)
        }
    },[props.user])

    const onChangeImage = (e) => {
        const im =e.target.files[0];
        setImage(e.target.files[0])

        const objectUrl = URL.createObjectURL(im)
        setImageURL(objectUrl)
        
    }

    const onSubmit =async (e)=>{
        e.preventDefault();
        console.log("asda")
       
        const formData = new FormData();
        console.log(image)
        formData.set('userId',user.id);
        formData.append('photo',image,image.name)
        
        for (var key of formData.entries()) {
            console.log(key[0] + ', ' + key[1]);
        }

        await props.postVerifyImage(formData)
        props.history.push("/verify")

    }
    const showInputFile = (account,user)=>{
        if(account)
        {
            if(user.idCardPhoto)
            {
                return (
                    <div class="card-body text-center">
                        <p class="h4">Your account is verifed.</p>
                    </div>
                )
            }
            if(account.status=== "PENDING" || account.status === "UNVERIFIED"){
                return (
                    <div>
                        <div className="card-body">
                            <div className="input-group">
                                <input 
                                    type="file"
                                    onChange={onChangeImage}
                                    accept=".jpg,.png"
                                    multiple
                                    name="image"
                                    className="form-control"
                                    placeholder="Select your ID card image"
                                />
                            </div>
                        </div>
                        <div
                            className="card-footer text-center"
                            style={{ display: "inherit" }}
                        >
                            <button
                                onClick={onSubmit}
                                className="btn btn-primary btn-link btn-wd btn-lg"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                );
            }
            else{
                return (
                    <div class="card-body text-center">
                        <p class="h4">Your account is verifed.</p>
                    </div>
                )
            }
        }
    }

    const showFormImage = (user)=>{
        if(user){
            if(user.idCardPhoto){
                return(<img class="card-img-top" src={user.idCardPhoto} rel="nofollow" alt="Card image cap" />)
            }
            if(imageURL)
            {
                return(<img class="card-img-top" src={imageURL} rel="nofollow" alt="Card image cap" />)
            }
            else
            {
                return(<img class="card-img-top" src="https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"alt="Card image cap" />)
            }
        }
    }
    if(success===true)
    {
        return <Message title ={"Verify"} message={"Xác thực thành công . Vui lòng chờ xác thực !"} to ={"/home"} success={true}/>
    }

    return (
        <div>
        <div className="page-header header-filter" data-parallax="true" style={{backgroundImage: 'url("../assets/img/city-profile.jpg")'}} />
        <div className="main main-raised">
          <div className="profile-content">
            {/* My custom*/}
            <div className="container-fluid">
              <div className="row tab-space">
                <div className="col-lg-6 col-md-8 ml-auto mr-auto">
                  <div className="card">
                    <form className="form" method="POST" encType="multipart/form-data">
                      <div className="card-header card-header-primary text-center">
                        <h4 className="card-title mb-2">Verify Account</h4>
                      </div>

                        {account&&user?showInputFile(account,user):''}

                      
                    </form>
                  </div>
                    {error?<Error msg={"Wrong file type!" } />:''}
                  
                    <div className="card">

                        {user?showFormImage(user):''}
                       

                        <div className="card-body">
                        <div className="row justify-content-end">
                            <div className="col-">
                            <a href="/home" className="btn btn-primary btn-md">Home</a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
              </div>
            </div>
            {/* End My custom*/}
          </div>
        </div>
      </div>
    )
}
const mapStateToProps = state => {
    return {
        user : state.user,
        account :state.account,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAccount : (userId)=> {
            dispatch(actGetAccount(userId))
        },
        postVerifyImage : (data) => {
            dispatch(actPostVerifyImage(data))
        },
        refreshUser : (userId) => {
            dispatch(actRefreshUser(userId))
        },
        getUser : (email)=>{
            dispatch(actGetUserByEmail(email));
        }
    }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Verify));
