import React, { Component } from 'react'

import $ from 'jquery'

export default class extends Component {

    constructor(props){
        super(props)

        this.state = {
            newItemErrorMsg: null
        }
    }

    render () {
        return (
            <form onSubmit={ (e)=> this.handleSubmit(e)}>
                <div id="newItemErrorMsg">{this.state.newItemErrorMsg}</div>
                <input type="text" ref="newItem" id="newItem"/>
                <input type="submit" value="Add Item" />
            </form>
        )
    }

    handleSubmit(e){
        e.preventDefault()

        var ifExists = this.props.onExists(this.refs.newItem.value)


        var result = this.errorHandelling({
            item: this.refs.newItem.value,
            ifExists: ifExists
        })


        if (result) {
            this.props.onAdd(this.refs.newItem.value)
            $("#newItem").val('')
        }

        this.refs.newItem.focus()
    }

    errorHandelling(obj){
        
        var errorMsg = null

        if(obj.item == '') {
            errorMsg = 'Please Type Something.'

            this.setState({
                newItemErrorMsg: errorMsg
            })

            return false;
        }else if(obj.ifExists) {
            errorMsg = 'Already Exists This Item'

            this.setState({
                newItemErrorMsg: errorMsg
            })

            return false;
        }else{
            this.setState({
                newItemErrorMsg: null
            })
            return true
        }



    }
}
