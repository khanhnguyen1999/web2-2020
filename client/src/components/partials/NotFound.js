import React from 'react'

function NotFound() {
    return (
        <div className="main main-raised " data-parallax="true" style={{backgroundImage: 'url("../assets/img/bg7.jpg")', backgroundSize: 'cover', backgroundPosition: 'top center' , height:"100vh" ,display: "flex" ,alignItems: "center"}}>
          
            <div className="container" style={{borderRadius:"10px" , backgroundColor: "rgba(255,255,255,0.6)"}}>
              <div class="section text-center">
                <h1>404 - Not Found</h1>
            </div>
            </div>
        </div>
    )
}

export default NotFound
