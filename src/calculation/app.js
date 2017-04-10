import React from 'react';
import ReactDOM from 'react-dom';

class Calculation extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            total: 2000,
            vat: 50,
            discount: 90,
            grandTotal: 2050,
            cash: 2050,
            dues: null,
        }

        this.handleCash = this.handleCash.bind(this)
    }

    componentDidMount(){

        // this.setState({
        //     dues: 300
        // })

        // this.refs.dues.value = 3004;
    }

    render(){
        return (
            <div className="container">
            <div className="row">
            <div className="col-xs-4">
                <form>

                  <div className="form-group">
                    <label htmlFor="total">Total</label>
                    <input type="text" className="form-control" disabled ref="total" defaultValue={this.state.total} placeholder="Total"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="vat">Vat</label>
                    <input type="text" className="form-control" disabled ref="vat" defaultValue={this.state.vat} placeholder="Vat"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="discount">Discount</label>
                    <input type="text" className="form-control"  ref="discount" id="discount" defaultValue={this.state.discount} onKeyUp={ (e) => this.handleDiscount(e)} placeholder="Discount"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="grandTotal">Grand Total</label>
                    <input type="text" className="form-control"  disabled id="grandTotal" ref="grandTotal" defaultValue={this.state.grandTotal} placeholder="Grand Total"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="cash">Cash</label>
                    <input type="text" className="form-control" id="cash" ref="cash" defaultValue={this.state.cash} onKeyUp={ this.handleCash } placeholder="Cash"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="dues">Dues</label>
                    <input type="text" className="form-control" disabled id="dues" ref="dues" defaultValue={this.state.dues} placeholder="Dues"/>
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
