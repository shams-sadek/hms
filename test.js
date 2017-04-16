

var calc = function(a,b, method){

    this.a = a;
    this.b = b;
    this.method = method;

    this.add = function(){
        return this.a + this.b;
    }

    this.multiply = function(){
        return this.a * this.b;
    }

    return this[this.method]();

}


var result = calc(4,5, 'multiply');

console.log(result);
