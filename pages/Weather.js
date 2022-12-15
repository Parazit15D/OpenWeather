import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import { styles } from '../styles/weather';
import PropTypes from 'prop-types';
import moment from "moment";

import Icon_humidity from '../svg/humidity.svg'
import Icon_pressure from '../svg/pressure.svg'
import Icon_wind from '../svg/wind.svg'
import Icon_temp from '../svg/temp.svg'

var check = false

let day = moment(new Date()).format("dddd");
let time = moment(new Date()).format("HH:mm");


const weatherOptions = {
    Thunderstorm: {
        text: 'Thunderstorm',
        url: require('../img/rain.png'),
        urlNight: require('../img/nightRain.png'),
    },
    Drizzle: {
        text: 'Drizzle',
        url: require('../img/rain.png'),
        urlNight: require('../img/nightRain.png'),
    },
    Rain: {
        text: 'Rain',
        url: require('../img/rain.png'),
        urlNight: require('../img/nightRain.png'),
    },
    Snow: {
        text: 'Snow',
        url: require('../img/snow.png'),
        urlNight: require('../img/nightSnow.png'),
    },
    Clear: {
        text: 'Clear',
        url: require('../img/clear.png'),
        urlNight: require('../img/night.png'),
    },
    Clouds: {
        text: 'Clouds',
        url: require('../img/cloud.png'),
        urlNight: require('../img/nightCloud.png'),
    },
    Fog: {
        text: 'Fog',
        url: require('../img/fog.png'),
        urlNight: require('../img/nightFog.png'),
    }

}

Weather.propTypes = {
    temp: PropTypes.number.isRequired,
    condition: PropTypes.oneOf(["Thunderstorm", "Drizzle", "Rain", "Snow", "Clear", "Clouds", "Fog"]).isRequired,
}

export default function Weather({ temp, condition, name, feels_like, speed, humidity, pressure, sunset, sunrise }) {


    const [dayNight, setdayNight] = useState()

    if (check === false) {
        check = true
        dayOrnight()
    }

    function dayOrnight() {
        if (time > '17:00') {
            setdayNight(false)
            console.log(time, "night")
        }
        if (time > '06:00') {
            setdayNight(true)
            console.log(time, "day")
        }
    }

    return (
        <View style={styles.container}>

            <ImageBackground source={dayNight ? weatherOptions[condition].url : weatherOptions[condition].urlNight} resizeMode="cover" style={styles.container}>

                <StatusBar barStyle={'light-content'} />
                <View style={{ margin: 10 }}>
                    <Text style={{ color: 'white', fontSize: 23 }}>{name}</Text>
                </View>

                <View style={{ flex: 3, alignItems: 'center', marginTop: 70 }}>

                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 50, color: 'white', letterSpacing: 2 }}>{temp}</Text>
                        <Text style={{ color: 'white', fontSize: 22, }}>°C</Text>


                    </View>
                    {/* <View style={{}}>
                        <Ionicons name={weatherOptions[condition].iconName} size={45} color={weatherOptions[condition].color} />
                    </View> */}

                </View>


                <View style={{ justifyContent: 'center', marginRight: 9, marginLeft: 9, borderBottomColor: 'white', borderBottomWidth: 1, }}>
                    <Text style={{ color: 'white', fontSize: 23, }}>{day}</Text>
                </View>


                <View style={{ flex: 1, margin: 15, justifyContent: 'space-between', flexDirection: 'row' }}>

                    <View style={styles.contentWeather}>
                        <Text style={styles.textWeather}>now</Text>
                        <Icon_temp style={styles.icon} />
                        <Text style={{ color: 'white', fontSize: 15 }}>{temp}</Text>
                    </View>

                    <View style={styles.contentWeather}>
                        <Text style={styles.textWeather}>feels</Text>
                        <Icon_temp style={styles.icon} />
                        <Text style={{ color: 'white', fontSize: 15 }}>{feels_like}</Text>
                    </View>

                    <View style={styles.contentWeather}>
                        <Text style={styles.textWeather}>wind</Text>
                        <Icon_wind style={styles.icon} />
                        <Text style={{ color: 'white', fontSize: 15 }}>{speed}</Text>
                    </View>

                    <View style={styles.contentWeather}>
                        <Text style={styles.textWeather}>humidity</Text>
                        <Icon_humidity style={styles.icon} />
                        <Text style={{ color: 'white', fontSize: 15 }}>{humidity}</Text>
                    </View>

                    <View style={styles.contentWeather}>
                        <Text style={styles.textWeather}>pressure</Text>
                        <Icon_pressure style={styles.icon} />
                        <Text style={{ color: 'white', fontSize: 15 }}>{pressure}</Text>
                    </View>

                </View>


            </ImageBackground>
        </View>
    )

}

