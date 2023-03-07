import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, ImageBackground, Animated, TouchableOpacity, ScrollView, SafeAreaView, RefreshControl } from 'react-native';
import { styles } from '../styles/weather';
import PropTypes from 'prop-types';
import moment from "moment";

import Icon_humidity from '../svg/humidity.svg'
import Icon_pressure from '../svg/pressure.svg'
import Icon_wind from '../svg/wind.svg'
import Icon_temp from '../svg/temp.svg'

let check = false

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

    const [isOpen, setIsOpen] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);

        console.log(time)
        setRefreshing(false);
    }

    const heightAnimation = useRef(new Animated.Value(0)).current;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const initialValue = isOpen ? 0 : 200;
        const finalValue = isOpen ? 200 : 0;

        heightAnimation.setValue(initialValue);

        Animated.timing(heightAnimation, {
            toValue: finalValue,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [isOpen]);

    const menuHeight = heightAnimation.interpolate({
        inputRange: [1, 130],
        outputRange: [0, 100],
    });

    const menuOpacity = heightAnimation.interpolate({
        inputRange: [0, 100],
        outputRange: [0, 1],
    });

    // Time SET ------------------------------
    let sunset1 = moment(new Date(sunset * 1000)).format("HH:mm");
    let sunrise1 = moment(new Date(sunrise * 1000)).format("HH:mm");
    console.log(sunset1, 'sunset1')
    console.log(sunrise1, 'sunrise1')
    console.log(time, 'time')

    const [dayNight, setdayNight] = useState()

    if (check === false) {
        check = true
        dayOrnight()
    }

    function dayOrnight() {
        if (time > sunset1) {
            setdayNight(false)
            console.log("night")
        }
        else if (sunrise1 < time) {
            setdayNight(true)
            console.log("day")
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >


                <StatusBar hidden />

                <ImageBackground source={dayNight ? weatherOptions[condition].url : weatherOptions[condition].urlNight} resizeMode="cover" style={styles.container}>

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
                        <TouchableOpacity onPress={toggleMenu}>
                            <Text style={{ color: 'white', fontSize: 23, }}>{day}</Text>
                        </TouchableOpacity>
                    </View>

                    <Animated.View style={{ height: menuHeight, opacity: menuOpacity }}>
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
                    </Animated.View>

                </ImageBackground>

            </ScrollView>
        </SafeAreaView>
    )

}