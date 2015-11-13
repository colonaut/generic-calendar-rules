/**
 * Created by kalle on 15.09.2015.
 */
'use strict';
import React from 'react/addons';
import TextField from 'material-ui/lib/text-field';


//Numbers shouls also be able to transfer decimals and so.
export class NumberField extends React.Component{
    constructor(props){
        super(props);

    }

    componentWillMount(){

    }


    render(){
        return(
            <TextField hintText={this.props.hintText} defaultValue={this.props.defaultValue}/>
        );
    }
}

export class NumberDependency extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(<div className="timer">
            I am the dependency container
            {this.props.children}
        </div>);
    }
}
