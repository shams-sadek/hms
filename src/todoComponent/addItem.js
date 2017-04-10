import React from 'react';

export default class AddItem extends React.Component {

    constructor(props){
            super(props)

            this.handleKeyup = this.handleKeyup.bind(this)
    }

    render(){
        return (
            <form onSubmit={ (e) => this.handleSubmit(e) }>
                <input type="text" ref="newItem" onKeyUp={ this.handleKeyup }/>
                <input type="submit" value="Hit Me"/>
            </form>
        )
    }//render

    handleSubmit(e) {
        e.preventDefault()

        this.props.onAdd(this.refs.newItem.value);

    }

    handleKeyup(){
        console.log(this.refs.newItem.value)
    }


}
