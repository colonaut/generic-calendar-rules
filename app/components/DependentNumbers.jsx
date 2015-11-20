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


    handleChange(key, transfer_limit, tranfser_value, transfer_target, event){
        console.log('arguments', arguments);
        let newState = {},
            new_value = parseInt(event.target.value),
            delay;


        console.log('', new_value, transfer_limit)

        if (transfer_limit < new_value){
            let new_transfer_value = parseInt(new_value / transfer_limit);

            console.log('new transfer value', new_transfer_value);
            console.log('new value', new_value);



            new_value = new_transfer_value * transfer_limit - new_value;
            //newState[transfer_target + '_value'] = new_transfer_value;
        }

        newState[key + '_value'] = new_value;

        delay = setTimeout(function(){clearTimeout(delay), this.setState(Object.assign({}, this.state, newState))}, 500)


    }

    handleUpdate(key){
        //console.log('update:', key);
    }

    componentWillMount(){
        //set the initial state
        React.Children.map(this.props.children, (child) => {
            if (child.type.displayName === 'TextField') {
                var newState = {};
                newState['' + child.props.foo + '_value'] = child.props.defaultValue;
                this.setState(newState);
            }
        });
    }

    componentDidMount(){
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
                            value: this.state[child.props.foo + '_value'],
                            onChange: this.handleChange.bind(this, child.props.foo, child.props.transferLimit, child.props.transferValue, child.props.transferTarget)
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
