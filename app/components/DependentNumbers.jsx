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
        /*React.Children.forEach(this.props.children, (child, index) => {
            if (child.type.displayName === 'TextField') {
                this.setState({
                    ['value_' + (() => index)()] : child.props.defaultValue
                });
            }
        });*/
        this._recursiveBuildState(this.props.children);
    }

    componentDidMount(){
    }

    _linkState(key) {
        return {
            value: this.state[key],
            requestChange: (newValue) => {
                console.log('_linkState => requestChange, key:', key);
                this.setState({
                    [(() => key)()]: newValue
                });
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
        /*React.Children.map(this.props.children, (child, index) => {
            if (child.type.displayName === 'TextField'
                //&& this.state[child.key + '_value'] !== nextState[child.key + '_value']
                && this.state['value_' + index] !== nextState['value_' + index])
            {
                console.log('will update from', index, '(', child.key, ') to', child.props.transferTargetIndex, ' in ', this._delay, 'ms');

              this._timeout = setTimeout(() => {
                    let newState = {
                        ['is_update_' + (() => index)()]: true
                    };

                    if (child.props.transferTargetIndex != undefined
                            && parseInt(child.props.transferLimit) <= parseInt(nextState['value_' + index])
                    ) {

                        let transferValue = parseInt(nextState['value_' + index] / child.props.transferLimit);
                        let keepValue = nextState['value_' + index] % child.props.transferLimit;
                        //console.log('transferValue', transferValue, 'keepValue', keepValue);

                        newState['value_' + child.props.transferTargetIndex] = transferValue;
                        newState['value_' + index] = keepValue;
                    }

                    this.setState(newState);

                    //the update state lasts for 1 second (changes color of input text)
                    setTimeout(() => {
                        this.setState({[ 'is_update_' + (() => index)() ]: false})
                    }, 1000);

                }, this._delay);

                this._delay = 100;
            }
        });*/
    }

    componentDidUpdate(prevProps, prevState){
        //console.log('componentDidUpdate', arguments, this._timeout);
    }

    _recursiveBuildState(children){
        React.Children.forEach(children, (child) => {
            if (child.type && child.type.displayName === 'TextField') {
                //console.log('recursiveBuildState state key:', ['value_' + (() => child.key)()]);
                this.setState({
                    ['value_' + (() => child.key)()] : child.props.defaultValue
                });
            } else if (React.isValidElement && child.props && child.type)
                this._recursiveBuildState(child.props.children);
        });
    }

    _recursiveCloneChildren(children){
        //console.log('this in clone', this);

        return React.Children.map(children, (child) => {
            if (child.type && child.type.displayName === 'TextField') {

               return React.addons.cloneWithProps(child, {
                    key: child.key,
                    valueLink: this._linkState('value_' + child.key),
                    inputStyle: this.state['is_update_' + child.key] ? {color: '#00f', fontWeight: 'bold'} : {}
                });
            } else {
                if (!React.isValidElement || !child.props)
                    return child;
                this._recursiveCloneChildren(child.props.children);
                return React.addons.cloneWithProps(child);

            }
        });

    }

    render(){
        //console.log('state in render', this.state);
        return(<div>

            <div style={{border: '1px solid #f0f'}}>
                 {this._recursiveCloneChildren(this.props.children)}
            </div>

            {/*
            <p>I am the dependency container</p>
            {
                React.Children.map(this.props.children, (child,  index) => {
                    if (child.type.displayName === 'TextField') {
                        return React.addons.cloneWithProps(child, {
                            key: this.key || 'text_field_' + index,
                            valueLink: this._valueLink('value_' + index),
                            inputStyle: this.state['is_update_' + index] ? {color: '#00f', fontWeight: 'bold'} : {}
                        });
                    } else {
                        return child;
                    }
                })
            }*/}
        </div>);
    }
}
