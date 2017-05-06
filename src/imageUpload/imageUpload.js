import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ImageBox from './imageBox'

class ImageUpload extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <h2>Image Upload...</h2>

                <ImageBox />

            </div>
        )
    }


}


ReactDOM.render(<ImageUpload />, document.getElementById('imageUpload'))
