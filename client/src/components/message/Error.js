import React from 'react'

function Error(props) {
    const {msg,success} = props;
    return (
        <div className="row justify-content-center">
            <div className="col-lg-8 col-md-6">
                <div className="alert alert-danger">
                    <div className="container">
                        <div className="alert-icon">
                            <i className="material-icons">error_outline</i>
                        </div>
                        <button
                            type="button"
                            className="close"
                            data-dismiss="alert"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">
                                <i className="material-icons">clear</i>
                            </span>
                        </button>
                        <b>Error Alert:</b> {msg}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error
