import React, { Component } from 'react'

import ReactDOM from 'react-dom'

import TodoItem from './todoItem'
import AddItem from './addItem'


class App extends Component {

    constructor(props) {
            super(props)

            this.state = {
                todos: ['wash up', 'take a nap', 'eat some food'],
                totalItem: 0
            }

    }

    componentDidMount(){

        setInterval( () => {
            var date = new Date()
            var myDate = date.toLocaleTimeString()
            var items = this.state.todos.length
            this.setState({
                totalItem: items,
                myDate: myDate
            })

        }, 1000 )
    }

    // componentWillMount(){
    //     var items = this.state.todos.length
    //
    //     this.setState({
    //         totalItem: items
    //     })
    // }

    render () {

        var todos = this.state.todos

        todos = todos.map( (item, index) => {
            return (
                <TodoItem key={index} item={item} onDelete={(e)=> this.onDelete(e)}/>
            )
        })

        return (
            <div>
                <h2>{this.state.myDate}</h2>
                <h3>Todo List... Total Items: { this.state.totalItem }</h3>
                <ul>{todos}</ul>
                <AddItem onAdd={ (e)=> this.onAdd(e)} onExists={ (e) => this.onExists(e)}/>
            </div>
        )
    }

    onDelete(item){
        var updateTodos = this.state.todos.filter( (value) => {
            return item != value
        })

        this.setState({
            todos: updateTodos
        })
    }

    onAdd(item){
        var todos = this.state.todos
        todos.push(item)

        this.setState({
            todos: todos
        })
    }

    onExists(item){
        var todos= this.state.todos

        var result = todos.indexOf(item)

        if (result === -1) return false
        return true;
    }
}


ReactDOM.render(<App />, document.getElementById('root'))
