import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

import { kriterienWetter } from '../KriterienFuerDasWetter/Bedingungen'; //WeatherConditions weatherConditions kriterienAbhaengigVomWetter //utils

import { MaterialCommunityIcons } from '@expo/vector-icons'; //Icons die wir für kriterienWetter nutzen
//import PropTypes from 'prop-types'; //Daten die man erhält gültig?


// Anzeigen der Wetterinfo auf der APP
const Wetterinfo = ({ weather, temperatur, stadt, land, maxtemp, windstaaerke, mintemp, tempgefuehlt }) => {
  return (
    <View
      style={[
        css.weatherContainer,
        { backgroundColor: kriterienWetter[weather].color }
      ]}
    >

    <Text style={css.standort}>{stadt}, {land}</Text>
    <Text style={css.temperatur}>{temperatur}°C</Text>

  <View style={css.banner}>

    <Text style= {css.block}>GefühlteTemp: {tempgefuehlt}°C</Text>
    <Text style= {css.block}>MaxTemp: {maxtemp}°C</Text>
    <Text style= {css.block}>MinTemp: {mintemp}°C</Text>
    <Text style= {css.block}>WindSpeed: {windstaaerke} km/h</Text>
  </View>

      <View style={css.headerContainer}>
        <MaterialCommunityIcons
          size={75}
          name={kriterienWetter[weather].icon}
          color={'black'}
          style={css.iconn}
      />


    </View>



    </View>
  );
};

/*Wetterinfo.propTypes = {
    temperatur: PropTypes.number.isRequired,
    weather: PropTypes.string
};*/

const css = StyleSheet.create({
    weatherContainer: {
        flex: 1
    },
    headerContainer: {
        //flex: 1,
        flexDirection: 'row',
        //paddingLeft: 65,
        paddingTop: 0,
        paddingBottom: 0,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    temperatur: {
        fontSize: 50,
        color: 'black',
        paddingLeft: 140,
        paddingTop:5,
        alignItems: 'center',
},
    standort: {
        fontSize: 30,
        color: 'black',
        paddingLeft: 85,
        paddingTop: 150,
        alignItems: 'center',
        flex: 0,
    },

  iconn: {
      fontSize: 180,
      color: 'black',
      paddingLeft: 100,
      paddingTop: 50,
  },

  block:{

    paddingTop: 10,
    fontSize: 20,
    color:'black',
    paddingLeft: 100,
    backgroundColor:'white',
    alignItems: 'center',
    flex: 0,
    paddingBottom: 10,

  },

  banner:{
    paddingTop: 50,
}



});

export default Wetterinfo;
