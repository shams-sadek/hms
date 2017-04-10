import React from 'react';

class TodoItem extends React.Component {

constructor(props) {
    super(props);

    // this.handleDelete = this.handleDelete.bind(this);
}

        render(){
            return (
                <li>
                    <div>
                            <span>{ this.props.item }</span>
                            <span onClick={ (e) => this.handleDelete(e)}> X</span>
                    </div>
                </li>
            );
        }// render

        handleDelete(e){
            this.props.onDelete(this.props.item);
        }
}

module.exports = TodoItem;
