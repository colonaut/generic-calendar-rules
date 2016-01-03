'use strict';
import React from 'react/addons'

class CarouselDots extends React.Component{
    constructor(props) {
        super(props);
    }

    handleClick(slide_index){
        this.props.handleSlideSelection(slide_index);
    }

    render(){
        return(<ul style={{margin: 0, padding: 0, listStyleType: 'none', textAlign: 'center'}}>
            {this.props.slides.map((slide, slide_index) => {
                return(<li style={{display: 'inline', marginLeft: '0.5em', marginRight: '0.5em'}}>
                    <button onClick={this.handleClick.bind(this, slide_index)}>
                        {slide_index + 1}
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

    handleClick(){
        let slide_index = this.props.current_index - 1;
        if (slide_index < 0)
            slide_index = this.props.slides.length - 1;

        this.props.handleSlideSelection(slide_index);
    }

    render(){
        return(<button style={{height:'100%'}}
                       onClick={this.handleClick.bind(this)}>
            &lt;&lt;
        </button>);
    }
}


class CarouselNext extends React.Component{
    constructor() {
        super();
    }

    handleClick(){
        let slide_index = this.props.current_index + 1;
        if (slide_index >= this.props.slides.length)
            slide_index = 0;

        this.props.handleSlideSelection(slide_index);
    }

    render(){
        return(<button style={{height:'100%'}}
                       onClick={this.handleClick.bind(this)}>
            &gt;&gt;
        </button>);
    }
}


//this will be our state holder
export class Carousel extends React.Component{
    constructor(props) {
        super(props);

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
            currentIndex: 0
        });

    }

    handleSlideSelection(slide_index, event){

        this.setState({
            message: 'handleDotClick',
            currentIndex: slide_index
        });
    }

    render() {
        return(<div style={{display: 'table', width: '100%'}}>
            <div style={{display: 'table-row'}}>
                <div style={{display: 'table-cell', width: '10%', textAlign: 'right'}}>
                    <CarouselPrevious handleSlideSelection={this.handleSlideSelection.bind(this)} slides={this.state.slides} current_index={this.state.currentIndex}/>
                </div>
                <div style={{display: 'table-cell', verticalAlign: 'middle', width: '80%'}}>
                    {this.state.slides[this.state.currentIndex]}
                </div>
                <div style={{display: 'table-cell', width: '10%'}}>
                    <CarouselNext handleSlideSelection={this.handleSlideSelection.bind(this)} slides={this.state.slides} current_index={this.state.currentIndex}/>
                </div>
            </div>

            <div style={{display: 'table-row'}}>
                <div style={{display: 'table-cell'}}/>
                <div style={{display: 'table-cell'}}>
                    <CarouselDots handleSlideSelection={this.handleSlideSelection.bind(this)} slides={this.state.slides}/>
                </div>
                <div style={{display: 'table-cell'}}/>
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