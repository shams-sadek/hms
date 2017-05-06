import React, { Component } from 'react'

export default class AddItem extends Component {

    constructor(props){
        super(props)
    }

    render () {
        return (
            <input type="button" value="Add File" onClick={ (e) => this.handleClick(e)}/>
        )
    }

    handleClick(item){

        console.log(document.getElementById('imageFile').value)

        // this.props.inputImage(item)
    }
}
