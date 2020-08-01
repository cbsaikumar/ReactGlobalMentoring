import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component{
    render(){
        return (
            <h1>Hello World, What???</h1>
        )
    }
}

export default App;

const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : false;