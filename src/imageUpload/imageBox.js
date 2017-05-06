import React, {Component} from 'react'


export default class ImageBox extends Component {

    render (){
        return (
            <div>
                <img src="#" id="abc"/>
                <input type="file" ref="newFile" name="upload" onChange={ (e) => this.handleClick(e)}/>
            </div>
        )
    }

    handleClick(e){
        // console.log(e)
        console.log(this.refs.newFile.files)

        // document.getElementById('abc').src = this.refs.newFile.value

    }
}
