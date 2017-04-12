import React from 'react';
import ReactDOM from 'react-dom';


import TodoItem from './todoItem';
import AddItem from './addItem';


class TodoComponent extends React.Component {

    constructor(props){
        super(props);

        this.state = {
                todos: ['Wash Up', 'Eat Some Cheese', 'Take a nap']
        }

        this.onDelete = this.onDelete.bind(this);
    }//constructor

    // componentDidMount(){
    //     this.setState({
    //         todos: ['Hi Wash Up', 'Eat Some Cheese..', 'Take a nap']
    //     })
    // }

    render(){

        var todos = this.state.todos;

        todos = todos.map( (item, index) => {
                return (
                    <TodoItem item={item} key={index} onDelete={this.onDelete}/>
                );
        });


        return (

        <div>
            <ul>{todos}</ul>

            <AddItem onAdd={ (e) => this.onAdd(e)}/>

        </div>
        )//return
    }//render

    onDelete(item){

        var updateTodos = this.state.todos.filter( (val, index) => {
            return (
                item !== val
            )
        })

        this.setState({
            todos: updateTodos
        })

    }

    onAdd(item){
        var updateTodos = this.state.todos;

        updateTodos.push(item);

        this.setState({
            todos: updateTodos
        })


    }

    componentWillMount(){
        console.log('componentWillMount')
    }

    componentDidMount(){
        console.log('componentDidMount')
    }

    componentWillUpdate(){
        console.log('componentWillUpdate')
    }
}//Test class

ReactDOM.render(<TodoComponent />, document.getElementById('app'));
