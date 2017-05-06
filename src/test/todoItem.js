import React, { Component } from 'react'


export default class TodoItem extends Component {

    render () {
        return (
            <li>
                <div>
                    <span>{this.props.item}</span>
                    <span onClick={ (e) => this.handleDelete(e) }> X</span>
                </div>
            </li>
        )
    }

    handleDelete(e) {
        this.props.onDelete(this.props.item)
    }
}
