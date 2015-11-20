import React from 'react/addons';
import { Bar } from './components/Bar.jsx';
import { Carousel, CarouselSlide } from './components/Carousel.jsx';
import { NumberDependency, NumberField } from './components/DependentNumbers.jsx';
import RaisedButton from 'material-ui/lib/raised-button';
import { Card, CardHeader, Avatar, CardActions, CardMedia, CardTitle, FlatButton, CardText } from 'material-ui/lib/card';
import TextField from 'material-ui/lib/text-field';

import mui from 'material-ui';
let ThemeManager = new mui.Styles.ThemeManager();
//console.log('ThemeManager:', ThemeManager);

let injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


export class App extends React.Component{
    // Important! provide uiTheme context for childre (static...) http://material-ui.com/#/customization/themes
    static get childContextTypes() {
        return { muiTheme: React.PropTypes.object };
    }

    // Important! http://material-ui.com/#/customization/themes
    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    render() {
        return (<Carousel>
            <CarouselSlide>
                <Card>

                    <CardTitle title="Lass uns Deinen Planeten genauer ansehen." />

                    <CardText>
                        Erkläre diesen Schritt
                    </CardText>

                    <CardTitle subtitle="Wie lange braucht eine Rotation Deines Planeten?" />
                    <CardActions>
                        <NumberDependency>
                            <TextField ref="lev1-0" hintText="level 1 0"/>
                            <NumberDependency>
                                <TextField ref="lev2-0" hintText="level 2 1"/>
                            </NumberDependency>
                            <TextField ref="lev1-1" hintText="level 1 1"/>
                        </NumberDependency>

                    </CardActions>


                    <CardTitle subtitle="Wie lange dauert eine Umdrehung Deines Planeten?"/>
                    <CardActions>
                        <NumberDependency>
                            <TextField foo="planet_rotation_h" defaultValue="23" floatingLabelText="Stunden" />
                            <TextField foo="planet_rotation_m" defaultValue="56" floatingLabelText="Minuten"
                                       transferLimit="60" transferValue="1"  transferTarget="planet_rotation_h"/>
                            <TextField foo="planet_rotation_s" defaultValue="4" floatingLabelText="Sekunden"
                                       transferLimit="60" transferValue="1" transferTarget="planet_rotation_m"/>
                            <TextField foo="planet_rotation_ms" defaultValue="100" floatingLabelText="Millisekunden"
                                       transferLimit="1000" transferValue="1" transferTarget="planet_rotation_s"/>
                            <p className="earth-default">Erdumdrehung: 23h, 56m, 4s, 100ms</p>
                            <p>Das ist die Zeit die ein ganzer Tag bei Deinem Planeten dauert.</p>
                        </NumberDependency>



                    </CardActions>


                    <div>
                        <input type="text" id="planet_rotation_h" value="23" /> h
                        <input type="text" id="planet_rotation_m" value="56" /> m
                        <input type="text" id="planet_rotation_s" value="4" /> s
                        <input type="text" id="planet_rotation_ms" value="100" /> ms
                        <p className="earth-default">Erdumdrehung: 23h, 56m, 4s, 100ms</p>
                        <p>Das ist die Zeit die ein ganzer Tag bei Deinem Planeten dauert.</p>

                    </div>


                    <div>
                        <label for="planet_diameter">Wie groß ist sein Radius?</label>
                        <input type="text" id="planet_diameter" value="6370" /> km
                        <p className="earth-default">Erdradius: 6370 km</p>
                    </div>


                </Card>
            </CarouselSlide>


            <CarouselSlide>
                <h3>Jetzt beschäftigen wir uns mit dem Verhältnis des Planeten zur Sonne.</h3>

                <div>
                    <label>Wie weit ist Dein Planet von seiner Sonne weg?</label>
                    <input type="number" id="sun_distance"/> Mio. km
                    <p className="earth-default">Mittlere Erdentfernung zur Sonne: ca. 149,6 Mio. km</p>
                </div>

                <div>
                    <label>Wie schnell wandert Dein Planet um seine Sonne?</label>
                    <input type="number" id="sun_rotation_speed"/> km/h
                    <p className="earth-default">Erdgeschwindigkeit: 107.280 km/h</p>
                </div>

                <div>
                    <label>Wieviele Rotationen (also volle Tage) braucht Dein Planet um die Sonne einmal zu umrunden?</label>
                    <input type="number" id="sun_rotation"/> km/h
                    <p className="earth-default">Erdumlauf um die Sonne: 365d, 6h, 9m,9,5s</p>
                </div>

            </CarouselSlide>

            <CarouselSlide>
                <h3>Möchtest Du Schaltjahre einführen? Das verhindert das verschieben der Jahreszeiten in Deinem Kalender.(ONLY IF NECCESSARY!) </h3>

                <div>
                    <label>Wieviele Schalttage möchtest Du?</label>
                    <input type="number" id="sun_rotation"/> "Schaltjahre"
                </div>

            </CarouselSlide>


            <CarouselSlide>
                <h3>Nun reden wir über Monde. Hat Dein Planet Monde?</h3>

                <div>Erkläre diesen Schritt</div>
            </CarouselSlide>




            <p>I am not going to be rendered</p>

        </Carousel>);
    }
}

React.render(<App/>,
    document.getElementById('upper')
);


React.render(<Bar/>,
    document.getElementById('lower')
);


