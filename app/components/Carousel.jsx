'use strict';
import React from 'react/addons'

class CarouselDots extends React.Component{
    constructor(props) {
        super(props);
    }

    handleClick(slide, slideIndex){
        this.props.handleDotClick(slide, slideIndex);
    }

    render(){
        var self = this;
        return(<ul style={{margin: 0, padding: 0, listStyleType: 'none', textAlign: 'center'}}>
            {this.props.slides.map((slide, ix) => {
                return(<li style={{display: 'inline', marginLeft: '0.5em', marginRight: '0.5em'}}>
                    <button onClick={self.handleClick.bind(self, slide, ix)}>
                        {ix}
                    </button>
                </li>);
            })}
        </ul>);
    }
}

class CarouselPrevious extends React.Component{
    constructor() {
        super();
    }

    render(){
        return(<button style={{height:'100%', width: '10%', border: '0px none', backgroundColor: 'transparent'}}>
            Previous
        </button>);
    }
}

class CarouselNext extends React.Component{
    constructor() {
        super();
    }

    render(){
        return(<button style={{height:'100%', width: '10%'}}>
            Next
        </button>);
    }
}

//this will be our state holder
export class Carousel extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            message: 'constructor state',
            slides: [],
        }; //with es6 this redundifies getInitialState!
    }

    componentWillMount(){
        var list = [];
        var count = 0;
        React.Children.map(this.props.children, (child) => {
            if (child.type.name === 'CarouselSlide'){
                list[count] = child;
                count++;
            }
        })

        this.setState({
            message: 'component will mount',
            slides: list,
            currentSlide: list[0]
        });

    }

    handleDotClick(slide, slideIndex, event){

        console.log(slide, 'Carousel handleDotClick');
        console.log(slideIndex, 'Carousel handleDotClick');
        console.log(event, 'Carousel handleDotClick');
        console.log('Carousel handleDotClick', arguments);

        this.setState({
            message: 'handleDotClick',
            currentSlide: slide
        });
    }

    render() {
        return(<div style={{display: 'table'}}>
            <div style={{display: 'table-row'}}>
                <div style={{display: 'table-cell', width: '50%', textAlign: 'right'}}>
                    <CarouselPrevious/>
                </div>
                <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                    {this.state.currentSlide}
                </div>
                <div style={{display: 'table-cell', width: '50%'}}>
                    <CarouselNext/>
                </div>
            </div>
            <div style={{display: 'table-row'}}>
                <div style={{display: 'table-cell', width: '50%'}}/>
                <div style={{display: 'table-cell'}}>
                    <CarouselDots handleDotClick={this.handleDotClick.bind(this)} slides={this.state.slides}/>
                </div>
                <div style={{display: 'table-cell', width: '50%'}}/>
            </div>
        </div>);
    }
}


export class CarouselSlide extends React.Component{
    constructor(){
        super();
    }

    render(){
        var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
        return (<ReactCSSTransitionGroup transitionName="carousel">
            <div className="slick-slide" style={{minWidth: '300px'}}>
                {this.props.children}
            </div>
        </ReactCSSTransitionGroup>);
    }
}