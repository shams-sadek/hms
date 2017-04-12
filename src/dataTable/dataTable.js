import React from 'react';
import ReactDOM from 'react-dom';

import Reactable from 'reactable';
var Table = Reactable.Table;


const url = 'http://localhost:3000/api/users';


class DataTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Sadik',
            age: 30,
            users: null
        }
    }// constructor

    componentDidMount(){

        fetch(url).then(res => res.json())
        .then(res => {
            this.setState({
                users: res
            })
        })
    }

    render() {
        return (
            <Table className="table" id="table" data={this.state.users}
                itemsPerPage={10}
                pageButtonLimit={5}
                defaultSort={{column: 'name', direction: 'desc'}}
                filterable={['name']}
            />
        )
    }// render


}//class


ReactDOM.render(<DataTable />, document.getElementById('table'));
