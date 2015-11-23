/**
 * Created by kalle on 15.09.2015.
 */
'use strict';
import React from 'react/addons';
import TextField from 'material-ui/lib/text-field';

export class NumberDependency extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        //console.log(set the initial state)
        React.Children.map(this.props.children, (child) => {
            if (child.type.displayName === 'TextField') {
                var newState = {};
                newState[child.props.foo + '_value'] = child.props.defaultValue;
                this.setState(newState);
            }
        });
    }

    componentDidMount(){
    }

    _valueLink(key) {
        return {
            value: this.state[key],
            requestChange: (newValue) => {
                console.log('_valueLink => requestChange');
                let newState = {};
                newState[key] = newValue;
                this.setState(newState);
                this._delay = 1500;
                if (this._timeout){
                    //console.log('clear timeout this._delay');
                    clearTimeout(this._timeout);
                }
            }
        }
    }

    componentWillUpdate(nextProps, nextState){
        console.log('componentWillUpdate', 'logic goes in here');
        React.Children.map(this.props.children, (child) => {
            let key = child.props.foo;
            if (child.type.displayName === 'TextField'
                    && child.props.transferTarget
                    && this.state[key + '_value'] !== nextState[key + '_value']) {
                console.log('will update from', key, 'to', child.props.transferTarget, this._delay);
                this._timeout = setTimeout(() => {
                    let newState = {};
                    newState[child.props.transferTarget + '_value'] = 42;
                    this.setState(newState);
                }, this._delay );
                this._delay = 2;
            }
        });
    }

    componentDidUpdate(prevProps, prevState){
        //console.log('componentDidUpdate', arguments);
    }

    render(){
        return(<div>
            I am the dependency container
            {
                React.Children.map(this.props.children, (child,  index) => {
                    if (child.type.displayName === 'TextField') {
                        return React.addons.cloneWithProps(child, {
                            ref: child.props.foo,
                            key: 'text_field_' + index,
                            valueLink: this._valueLink(child.props.foo + '_value')
                        });
                    } else {
                        return child;
                    }
                })
            }


        </div>);
    }
}
