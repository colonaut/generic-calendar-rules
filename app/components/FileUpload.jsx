/**
 * Created by kalle on 03.01.2016.
 */
'use strict';
import React from 'react/addons';

export class FileUpload extends React.Component{
    constructor(props) {
        super(props);


    }

    componentWillMount(){
        this._default_droparea_styles = {
            initial: {width: '90%', height: '90%', border: '5px dashed #9e9e9e', margin: 'auto', textAlign: 'center'},
            drag_enter: {width: '90%', height: '150px', border: '5px dashed #0080D4', margin: 'auto'},
            drag_over: {width: '90%', height: '150px', border: '5px dashed #0080D4', margin: 'auto'},
            drop: {width: '90%', height: '150px', border: '5px dashed #0ff', margin: 'auto'},
            processed: {width: '90%', height: '150px', border: '5px dashed #4CAF50', margin: 'auto'}
        };

        this._processed_files_count =  0;

        this.reset();
    }


    reset() {
        this.setState({
            is_idle: true,
            message: 'Drag your file(s) here!',
            process_messages: [],
            processed_message: null,
            style: this._default_droparea_styles.initial
        });
    }

    handleDragEnter(event){
        //console.log('drag enter');
        if (this.state.is_idle) {
            this.setState({
                style: this.props.dragEnterStyle || this._default_droparea_styles.drag_enter
            });
        }
    }

    handleDragOver(event){
        //console.log('drag over');
        event.preventDefault();
        event.preventDefault();
        if (this.state.is_idle){
            this.setState({
                style: this.props.dragOverStyle || this._default_droparea_styles.drag_over
            });
        }
    }

    handleDragExit(){
        console.log('drag exit');
        this.reset();
    }

    handleDrop(event){
        //console.log('drop', event);
        event.stopPropagation();
        event.preventDefault();
        if (typeof this.props.onDrop === 'function' && this.state.is_idle) { //only do drop stuff if there is something done on drop
            this.setState({
                style: this.props.dropStyle || this._default_droparea_styles.drop,
                message: null,
                is_idle: false
            });
            this._transfer_files = event.dataTransfer.files;
            for (let i = 0, transfer_file; transfer_file = this._transfer_files[i]; i++) {
                let reader = new FileReader();
                reader.onload = ((loaded_file) => {
                    return (evt) => {
                        this.props.onDrop(event,
                            loaded_file,
                            evt.target.result,
                            this._callbackUpdateProcessingMessages.bind(this));
                    };
                })(transfer_file);
                console.log('determine right method for reader with transfer_file.type:', transfer_file.type);
                reader.readAsText(transfer_file); //– returns the file contents as plain text
                //reader.readAsArrayBuffer(file); // – returns the file contents as an ArrayBuffer (good for binary data such as images)
                //reader.readAsDataURL(file); // – returns the file contents as a data URL
            }
        } else if (this.state.is_idle) {
            this.reset();
        }
    }


    _callbackUpdateProcessingMessages(message){
        this._processed_files_count++;

        //when messages are passed, we update the state for them
        if (message) {
            let process_messages = this.state.process_messages || [];
            process_messages[process_messages.length] = message;
            this.setState({
                process_messages: process_messages
            });
        }

        console.log(this._processed_files_count, this._transfer_files.length)

        //when all fies are done, we apply the done states
        if (this._processed_files_count === this._transfer_files.length){
            this._processed_files_count = 0;
            this.setState({
                processed_message: this.props.processedMessage || 'Done!',
                style: this.props.processedStyle || this._default_droparea_styles.processed
            });
        }
    }


    render() {
        return(
            <div onClick={this.reset.bind(this)}
                 onDragEnter={this.handleDragEnter.bind(this)}
                 onDragOver={this.handleDragOver.bind(this)}
                 onDragExit={this.handleDragExit.bind(this)}
                 onDrop={this.handleDrop.bind(this)}
                 style={this.state.style}>

                {(() => {
                    if (this.state.message) {
                      return <h2>{this.state.message}</h2>
                    }
                })()}

                {this.state.process_messages.map((message) =>{
                    return(<p>{message}</p>);
                })}

                {(() => {
                    if (this.state.processed_message) {
                        return <h2>{this.state.processed_message}</h2>
                    }
                })()}

            </div>);
    }
}


