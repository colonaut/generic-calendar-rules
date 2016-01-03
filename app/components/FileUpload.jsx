/**
 * Created by kalle on 03.01.2016.
 */
'use strict';
import React from 'react/addons';

export class FileUpload extends React.Component{
    constructor() {
        super();
        this.state = {message: 'constructor state'}
    }

    componentWillMount(){
        this.setState({message: 'component will mount'});
    }

    render() {
        return(
            <div onClick={this.onClick.bind(this)}>
                <p>I am a FileUpload! My message:</p>
                <h5>{this.state.message}</h5>
            </div>);
    }

    onClick() {
        this.setState({message: 'You clicked me!'});
    }
}


