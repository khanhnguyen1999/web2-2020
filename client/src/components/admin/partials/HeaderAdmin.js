import React from 'react';
import {connect} from 'react-redux';
function HeaderAdmin(props) {
  const {user } = props;
    return (
      <div>
        <div className="page-header header-filter" data-parallax="true" style={{backgroundImage: 'url("/assets/img/bg3.jpg")'}}>
        <div className="container">
          <div className="row">
            <div className="col-md-8 ml-auto mr-auto">
              <div className="brand text-center">
                <h1>Management</h1>
                <h3 className="title text-center">{user.displayName}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      </div>
    )
}

const mapStateToProps = state => {
  return {
    user : state.user.user,
  }
}
export default connect(mapStateToProps,null)(HeaderAdmin)
