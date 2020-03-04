import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';




import Wetter from './Stylesheet/style'; //Weather
// ZUSTAND auf "Zufällige" Werte setzen
export default class App extends React.Component {
  state = {
    sollWettergeladenWerden: true,
    temperatur: 0,
    weatherCondition: null,
    tempmax:0,
    tempmin:0,
    windstaerke:0,
    gefuehlteTemp:0,
    city: "Stuttgart",
    country: "DE",
    error: null
  };

  // GPS vom Handy nutzen um Längen und Breitengrad zu nutzen oder bereits gesetzte Längen und Breitengrad aufzurufen
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
        position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
        //this.fetchWeather(31.630000, -8.008889) //Marrakesh
        //this.fetchWeather(4.598056, -74.075833) //Estanzuela
        //this.fetchWeather(41.3850639, 2.1734035) //Stadtteil-Barcelona Eixample
        //this.fetchWeather(48.7758459, 9.1829321) //Stuttgart
        //this.fetchWeather(43.320902, 21.895759) //NIS Serbien

        },
        error => {
          this.setState({
            error: 'Wetterstandort konnte nicht ermittelt werden!'
          });
        }
    );
  }

// Wetter abfangen und neuen ZUSTAND setzen
  fetchWeather(breitengrad, laengengrad) {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${breitengrad}&lon=${laengengrad}&APPID=e2503a87ceaa6ff5c3f42e4d8fd36f0d&units=imperial`


    )
        .then(antwort => antwort.json())
        .then(json => {
          console.log(json);
          this.setState({
            temperatur: Math.round((((json.main.temp))-32)*5/9),
            tempmax: (Math.round(((json.main.temp_max)-32)*5/9)),
            tempmin: (Math.round(((json.main.temp_min)-32)*5/9)),
            gefuehlteTemp: Math.round((json.main.feels_like -32)*5/9),
            windstaerke: Math.round((json.wind.speed*1.60934)*100)/100, // Auf 2 nachkomma Stellen gerundet
            dasWetter: json.weather[0].main,
            town: json.name,
            standort: json.sys.country,
            sollWettergeladenWerden: false
          });
        });
  }


// Grafische Darstellung
  render() {
    const { sollWettergeladenWerden, dasWetter, temperatur, town, country, tempmax, windstaerke, tempmin, gefuehlteTemp, standort } = this.state;
    return (
        <View style={css.element1}>
          {sollWettergeladenWerden ? (
              <View style={css.element2}>
                <Text style={css.Text}>Hey das ist die WetterApp von Anes und Alen!</Text>


              </View>
          ) : (
              <Wetter weather={dasWetter} temperatur={temperatur} stadt={town} country={country} maxtemp={tempmax} windstaaerke={windstaerke} mintemp={tempmin} tempgefuehlt={gefuehlteTemp} land={standort}/>
          )}




        </View>
    );
  }


}

const css = StyleSheet.create({
  element1: {
    flex: 1,
    backgroundColor: 'black'
  },
  element2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightblue'
  },
  Text: {
    fontSize: 40

  }
});
