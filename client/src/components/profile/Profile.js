import React from "react";
import ProfileLeft from './ProfileLeft';
import ProfileRight from './ProfileRight';

function Profile() {
    return (
        <div>
            <div>
                <div
                    className="page-header header-filter"
                    data-parallax="true"
                    style={{
                        backgroundImage:
                            'url("../assets/img/city-profile.jpg")',
                    }}
                />
                <div className="main main-raised">
                    <div className="profile-content">
                        {/* My custom*/}
                        <div className="container-fluid">
                            <div className="row justify-content-center tab-space">
                                <p className="h1">Account Management</p>
                            </div>
                            <div className="row justify-content-center tab-space">
                                {/* Left Column */}
                                <ProfileLeft/>
                                {/* Right Column */}
                                <ProfileRight/>
                                
                            </div>
                        </div>
                        {/* End My custom*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
