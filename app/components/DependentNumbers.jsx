/**
 * Created by kalle on 15.09.2015.
 */
'use strict';
import React from 'react/addons'

class CountUp{

}

class CountDown{

}



export class Number extends React.Component{
    constructor(props){
        super(props);

    }

    componentWillMount(){

    }


    render(){
        var unit_markup = this.props.unit
            ? <span>{this.props.unit}</span>
            : null;

        return(<span>
            <label />
            <input type="number" /> {unit_markup}
        </span>);
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
