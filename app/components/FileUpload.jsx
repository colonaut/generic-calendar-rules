/**
 * Created by kalle on 03.01.2016.
 */
'use strict';
import React from 'react/addons';

export class FileUpload extends React.Component{
    constructor(props) {
        super(props);

        this._defaultSytle = {width:'50%', height:'150px', border:'5px dashed #00f', margin:'auto'};
    }

    componentWillMount(){
        this.setState(
            {
                message: 'component will mount',
                style: this._defaultSytle
            }
        );
    }


    handleClick() {
        this.setState({message: 'Drag your file here!'});
    }

    handleDragEnter(event){
        //console.log('drag enter', event);
    }

    handleDragOver(event){
        //console.log('drag over', event);
        event.preventDefault();
        event.preventDefault();
        this.setState({
            style: this.props.dragOverStyle || this.state.style
        });
    }

    handleDragExit(){
        //console.log('drag exit');
    }

    handleDrop(event){
        //console.log('drop', event);
        event.stopPropagation();
        event.preventDefault();

        if (typeof this.props.onDrop === 'function') {
            let transfer_files = event.dataTransfer.files;
            let count = 0;
            for (let i = 0, transfer_file; transfer_file = transfer_files[i]; i++) {
                let reader = new FileReader();
                reader.onload = ((loaded_file) => {
                    return (evt) => {
                        count++;
                        this.props.onDrop(event, loaded_file, evt.target.result);
                        if (count === transfer_files.length){
                            this.setState({
                                message: this.props.dropMessage || this.state.message,
                                style: this.props.dropStyle || this._defaultSytle
                            });
                        }
                    };
                })(transfer_file);
                console.log('determine right method for reader with transfer_file.type:', transfer_file.type);
                reader.readAsText(transfer_file); //– returns the file contents as plain text
                //reader.readAsArrayBuffer(file); // – returns the file contents as an ArrayBuffer (good for binary data such as images)
                //reader.readAsDataURL(file); // – returns the file contents as a data URL
            }
        } else {
            this.setState({
                message: this.props.dropMessage || this.state.message,
                style: this.props.dropStyle || this._defaultSytle
            });
        }
    }

    render() {
        return(
            <div onClick={this.handleClick.bind(this)}
                 onDragEnter={this.handleDragEnter.bind(this)}
                 onDragOver={this.handleDragOver.bind(this)}
                 onDragExit={this.handleDragExit.bind(this)}
                 onDrop={this.handleDrop.bind(this)}
                style={this.state.style}>
                <h5>I am a FileUpload!</h5>
                <p>mesage: {this.state.message}</p>
            </div>);
    }
}


