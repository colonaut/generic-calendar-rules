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
        React.Children.forEach(this.props.children, (child, index) => {
            if (child.type.displayName === 'TextField') {
                this.setState({
                    ['value_' + (() => index)()] : child.props.defaultValue
                });
            }
        });
    }

    componentDidMount(){
    }

    _valueLink(key) {
        return {
            value: this.state[key],
            requestChange: (newValue) => {
                //console.log('_valueLink => requestChange');
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
        React.Children.map(this.props.children, (child, index) => {
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
        });
    }

    componentDidUpdate(prevProps, prevState){
        //console.log('componentDidUpdate', arguments, this._timeout);
    }

    render(){
        return(<div>
            I am the dependency container
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
            }
        </div>);
    }
}
