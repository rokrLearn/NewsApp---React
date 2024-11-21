import React, { Component } from 'react'
import loading from './loading.gif'

export default class Spinner extends Component {
  render() {
    return (
        <div className="d-flex justify-content-center align-items-center"
             style={{height: '100vh'}}>
            <div className="text-center ">
                <img src={loading} alt="loading"/>
            </div>
        </div>
    )
  }
}
