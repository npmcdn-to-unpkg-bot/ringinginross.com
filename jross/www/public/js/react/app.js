// console.log('thing 1')
// import React, { Component, PropTypes } from 'react'
// import ReactDOM from 'react-dom'
// import { Header } from './components/header'
// import { Authentication } from './steps/authentication'
// import { Registration } from './registration'
// import { Confirmation } from './confirmation'
// import { Preference } from './preference'
// import { Transportation } from './transportation'
// import { Success } from './success'

// ---- Authentication ----------------- //
var Authentication = React.createClass({
  getDefaultProps: function() {
    return {
      header: {
        title: 'RSVP',
        content: 'Please enter the password from your invitation'
      },
      url: '/api/authentication'
    };
  },
  getInitialState: function() {
    return {
      password: null,
      error: null
    }
  },
  saveState: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      data: this.state,
      cache: false,
      success: function (response) {
        //save the uuid to the parent state
        this.props.update({ auth: response.auth })
        this.props.next()
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        // set an error message/state
      }.bind(this)
    });
  },
  updateState: function(event) {
    var key = event.target.name
    var value = event.target.value
    this.state[key] = value
  },
  render: function() {

    return (
      <div>
        <Header title={this.props.header.title} content={this.props.header.content} />
        <div className="row 50%">
          <div className="6u 12u$(mobile)">
            <label for="password">Password</label>
          </div>
          <div className="6u 12u$(mobile)">
            <input type="password" className="text" name="password" onChange={this.updateState} onBlur={this.updateState} autoComplete="off"/>
          </div>
          <button onClick={this.saveState} value="submit">Continue</button>
        </div>
      </div>
    )
  }
})

// ---- Registration ----------------- //
var Registration = React.createClass({
  getDefaultProps: function() {
    return {
      header: {
        title: 'RSVP',
        content: 'Please enter your first and last name as shown on your invitation'
      },
      url: '/api/registration'
    };
  },
  getInitialState: function() {
    return {
      error: null,
      firstName: null,
      lastName: null,
    }
  },
  saveState: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      data: this.state,
      cache: false,
      success: function (response) {
        //save the uuid to the parent state
        this.props.update({ uuid: response.uuid })
        this.props.next()
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
        // set an error message/state
      }.bind(this)
    });
  },
  updateState: function(event) {
    var key = event.target.name
    var value = event.target.value
    this.state[key] = value
  },
  render: function () {
    return (
      <div>
        <Header title={this.props.header.title} content={this.props.header.content} />
        <div className="6u 12u$(mobile)">
            <input type="text" className="text" name="firstName" placeholder="First Name" onChange={this.updateState} onBlur={this.updateState}/>
        </div>
        <div className="6u$ 12u$(mobile)">
          <input type="text" className="text" name="lastName" placeholder="Last Name" onChange={this.updateState} onBlur={this.updateState}/>
        </div>
        <button onClick={this.saveState} value="submit">Continue</button>
      </div>
    )
  }
})


var Header = React.createClass({
  render: function () {
    return (
      <header>
        <h2>{this.props.title}</h2>
        <p>{this.props.content}</p>
      </header>
    )
  }
})


var STEPS = [
  { component: 'Authentication' },
  { component: 'Registration' }
]


var App = React.createClass({
  getInitialState: function () {
    return {
      current: 1,
      auth: false,
      uuid: null,
      party: null
    }
  },
  showStep: function () {
    switch (this.state.current) {
      case 1:
      default:
        return <Authentication next={this.next} update={this.updateState}/>
      case 2:
        return <Registration next={this.next} update={this.updateState}/>
    }
  },
  updateState: function (data) {
    //for each key,value pair, update our state
    for (var key in data) {
      if (data.hasOwnProperty(key)) {
        this.state[key] = data[key]
      }
    }
  },
  checkNavState: function (currentStep) {
    if (currentStep > 0 && currentStep !== this.props.steps.length - 1) {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: true
      })
    }
    else if (currentStep === 0) {
      this.setState({
        showPreviousBtn: false,
        showNextBtn: true
      })
    }
    else {
      this.setState({
        showPreviousBtn: true,
        showNextBtn: false
      })
    }
  },
  setNavState: function (next) {
    this.setState({ navState: this.getNavStates(next, this.props.steps.length) })
    if (next < this.props.steps.length) {
      this.setState({ compState: next })
    }
    this.checkNavState(next);
  },
  persist: function (url, data) {
    $.ajax({
      url: url,
      dataType: 'json',
      data: data,
      cache: false,
      success: function (response) {
        // TODO
        debugger;
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInputData: function () {

  },
  save: function () {

  },
  next: function () {
    this.setState({ current: this.state.current + 1 })

    // submit field data and get result
    // this.setNavState(this.state.compState + 1)
  },
  previous: function () {
    if (this.state.compState > 0) {
      this.setNavState(this.state.compState - 1)
    }
  },
  render: function () {
    return (
      <div>
        { this.showStep() }
      </div>
    )
  }
});

ReactDOM.render(
  <App />,
  document.getElementById("rsvp"),
)

// <div className="container">
//   <div>
//     <Multistep initialStep={1} steps={steps}/>
//   </div>
//   <div className="container app-footer">
//     <h6>Press 'Enter' or click on progress bar for next step.</h6>
//      Code is on <a href="https://github.com/Srdjan/react-multistep" target="_blank">github</a>
//   </div>
// </div>