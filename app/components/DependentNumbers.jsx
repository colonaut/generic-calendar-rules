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

    _valueLink(key, transferTargetKey) {
        return {
            value: this.state[key],
            requestChange: (newValue) => {
                let newState = {};
                newState[key] = newValue;
                //newState[transferTargetKey] = 500;
                this.setState(newState);
                console.log('_valueLink => requestChange');
            }
        }
    }

    componentWillUpdate(nextProps, nextState){
        console.log('componentWillUpdate', 'logic goes in here');
        React.Children.map(this.props.children, (child) => {
            let key = child.props.foo;
            if (child.type.displayName === 'TextField' && this.state[key + '_value'] !== nextState[key + '_value']) {
                console.log('will update ' + key)

                let newState = {};
                newState[child.props.transferTarget + '_value'] = 42;



                this.setState(newState);

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
                        var clone = React.addons.cloneWithProps(child, {
                            ref: child.props.foo,
                            key: 'text_field_' + index,
                            valueLink: this._valueLink(child.props.foo + '_value',
                                child.props.transferTarget + '_value'),
                            //value: this.state[child.props.foo + '_value'],
                            //onChange: this.handleChange.bind(this, child.props.foo, child.props.transferLimit, child.props.transferValue, child.props.transferTarget)
                            //onUpdate: this.handleUpdate.bind(this, child.props.foo, child.props.transferLimit, child.props.transferValue, child.props.transferTarget)
                            //onChange TODO
                            //onUpdate TODO
                        })
                        return clone;
                    } else {
                        return child;
                    }
                })
            }


        </div>);
    }
}
