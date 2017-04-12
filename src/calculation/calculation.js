require('./calculation.scss');

import React from 'react';
import ReactDOM from 'react-dom';

class Calculation extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            total: 5000,
            vat: 150,
            discount: 20,
            grandTotal: null,
            cash: null,
            dues: 0
        }

        this.handleCash = this.handleCash.bind(this)

    }

    componentWillMount(){


    }

    componentDidMount(){
        var total = this.state.total;
        var vat = this.state.vat;
        var grandTotal = total + vat;

        this.setState({
            grandTotal: grandTotal,
            cash: grandTotal
        })

    }

    render(){
        return (
            <div className="container">
            <div className="row">
            <div className="col-xs-4">
                <form>

                  <div className="form-group">
                    <label htmlFor="total">Total</label>
                    <input type="text" className="form-control" id="total" disabled ref="total" value="5000" placeholder="Total"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vat">Vat</label>
                    <input type="text" className="form-control" disabled id="vat" ref="vat" value="150" placeholder="Vat"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="discount">Discount</label>
                    <input type="text" className="form-control"  ref="discount" id="discount" onKeyUp={ (e) => this.handleDiscount(e)} placeholder="Discount"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="grandTotal">Grand Total</label>
                    <input type="text" className="form-control"  disabled id="grandTotal" ref="grandTotal" value="" placeholder="Grand Total"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cash">Cash</label>
                    <input type="text" className="form-control" id="cash" ref="cash"  onKeyUp={ this.handleCash } placeholder="Cash"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dues">Dues</label>
                    <input type="text" className="form-control" disabled id="dues" ref="dues" value="" placeholder="Dues"/>
                  </div>

                </form>

            </div>
            </div>
            </div>
        )
    }//render

    handleGrandTotal(){
            var grandTotal = this.state.total + this.state.vat - this.state.discount

            this.setState({
                grandTotal: grandTotal
            })
    }

    // discount
    handleDiscount(e){
        var total = this.state.total
        var vat = this.state.vat
        var totalPlusVat = total + vat
        var grandTotal = null

        var discount = this.refs.discount.value

        if( discount > totalPlusVat) {
                discount = totalPlusVat
        }

        grandTotal = totalPlusVat - discount
        let cash = grandTotal
        let dues = grandTotal - cash

        this.setState({
            discount: discount,
            grandTotal: grandTotal,
            cash: cash,
            dues: dues
        })


    }

    // cash
    handleCash(){
        var grandTotal = this.state.grandTotal
        var cash = this.refs.cash.value


        if( cash > grandTotal) {
                cash = grandTotal
        }

        let dues = grandTotal - cash

        this.setState({
            cash: cash,
            dues: dues
        })

    }

    componentWillUpdate(){

    }

    componentDidUpdate(){
        // console.log('Discount:' + this.state.discount)
        // console.log('Grand Total:' + this.state.grandTotal)
        // console.log('Cash:' + this.state.cash)
        document.getElementById('grandTotal').value = this.state.grandTotal
        document.getElementById('discount').value = this.state.discount
        document.getElementById('cash').value = this.state.cash
        document.getElementById('dues').value = this.state.dues
    }

    handleCalculation(e){
        var total = this.state.total
        var vat = this.state.vat
        var discount = this.state.discount
        var grandTotal = total + vat - discount
    }
}

ReactDOM.render(<Calculation />, document.getElementById('calculation'));
