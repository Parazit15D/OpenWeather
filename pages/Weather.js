import React, { useState, useEffect, useRef } from 'react';
import {
    StyleSheet, Animated, Easing, TouchableOpacity, Text, View, StatusBar,
    ImageBackground, ScrollView, SafeAreaView, RefreshControl, FlatList
} from 'react-native';
import { styles } from '../styles/weather';
import PropTypes from 'prop-types';
import moment from "moment";

import Icon_humidity from '../svg/humidity.svg'
import Icon_pressure from '../svg/pressure.svg'
import Icon_wind from '../svg/wind.svg'
import Icon_temp from '../svg/temp.svg'
import Icon_cloudy from '../svg/cloud.svg'
import Icon_rain from '../svg/rain.svg'
import Icon_clear from '../svg/clear.svg'
import Icon_snow from '../svg/snow.svg'
import Icon_thunderstorm from '../svg/thunderstorm.svg'
import Icon_fog from '../svg/fog.svg'

const groupBy = (arr, key) => {
    const sortedArr = arr.sort((a, b) => moment.utc(a[key]) - moment(b[key]));
    const currentDay = moment.utc().format("dddd");
    const filteredArr = arr.filter(obj => {
        const time = moment.utc(obj[key]).format('HH');
        return time >= '00' && time <= '21';
    });

    const currentDayData = arr.find((obj) => moment.utc(obj[key]).isSame(moment.utc(), "day"));
    if (currentDayData) {
        if (!filteredArr[currentDay]) filteredArr[currentDay] = [];
        filteredArr[currentDay].unshift(currentDayData);
    }
    return filteredArr.reduce((acc, obj) => {
        const date = moment.utc(obj[key]).format("dddd");
        if (!acc[date]) acc[date] = [];
        acc[date].push(obj);
        return acc;
    }, {});
};

const CustomDropdown = ({ title, children, minTemp, maxTemp, isOpen, toggleMenu }) => {
    const heightAnimation = useRef(new Animated.Value(isOpen ? 400 : 0)).current;

    useEffect(() => {
        const finalValue = isOpen ? 400 : 0;
        Animated.timing(heightAnimation, {
            toValue: finalValue,
            duration: 700, // Increase duration to 1000ms
            easing: Easing.ease,
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

    return (
        <View style={styles.dropdownBackground}>
            <TouchableOpacity onPress={toggleMenu}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ margin: 5, color: 'white', fontSize: 16.5 }}>{title}</Text>
                    <Text style={{ margin: 5, color: 'white', alignSelf: 'flex-end', fontSize: 16.5 }}>{maxTemp}° / {minTemp}°</Text>
                </View>
            </TouchableOpacity>
            {isOpen && (
                <Animated.View style={[styles.dropdownMenu, { height: menuHeight, opacity: menuOpacity },]}>
                    {children}
                </Animated.View>
            )}
        </View>
    );
};

const WeatherIcon = ({ weather }) => {
    switch (weather) {
        case 'Rain':
            return <Icon_rain style={styles.icon} />
        case 'Clouds':
            return <Icon_cloudy style={styles.icon} />
        case 'Clear':
            return <Icon_clear style={styles.icon} />
        case 'Snow':
            return <Icon_snow style={styles.icon} />
        case 'Thunderstorm':
            return <Icon_thunderstorm style={style.icon} />
        case 'Fog':
            return <Icon_fog style={style.icon} />

        default:
            return <Icon_cloudy style={styles.icon} />
    }
}

const WeatherDay = ({ data }) => {
    const renderItem = ({ item }) => {
        return (
            <View key={item.date} style={{ flex: 1, alignItems: 'center', margin: 5, justifyContent: 'space-between', }}>
                <View>
                    <Text style={styles.textWeather}>{moment(item.dt_txt).format('HH:mm')}</Text>
                </View>
                <View>
                    <WeatherIcon weather={item.condition} />
                </View>
                <View style={{ alignItems: 'center' }}>
                    <Icon_temp style={styles.icon} />
                    <Text style={styles.textWeather}>{item.temp}</Text>
                </View>
            </View>
        );
    };

    return (
        <FlatList showsHorizontalScrollIndicator={false} data={data} keyExtractor={(item) => item.dt_txt} renderItem={renderItem} horizontal refreshing={false}>
        </FlatList>
    );
};

export default function Weather({ forecasts }) {

    const [openIndex, setOpenIndex] = useState(-1);
    const [weatherData, setWeatherData] = useState([]);

    // Update the weather data when the forecasts prop changes
    useEffect(() => {
        setWeatherData(forecasts);
    }, [forecasts]);


    const toggleMenu = (index) => {
        if (openIndex === index) {
            setOpenIndex(-1);
        } else {
            setOpenIndex(index);
        }
    };

    let todayData;
    const filteredForecasts = forecasts.filter((item) => moment(item.date).isSameOrAfter(moment(), "day"));
    if (filteredForecasts.length > 0) {
        todayData = filteredForecasts.shift();
    }

    const groupedData = groupBy(filteredForecasts, 'date');

    return (
        <View style={{ flex: 1, }} elastic={true}>
            <View style={{ flex: 0.4 }}>
                <View style={{ margin: 10 }}>
                    <Text style={{ color: 'white', fontSize: 23 }}>{todayData.city}</Text>
                </View>

                <View style={{ alignItems: 'center', marginTop: 70 }}>
                    <View style={{ marginTop: 15, flexDirection: 'row' }}>
                        <Text style={{ fontSize: 50, color: 'white', letterSpacing: 2 }}>{todayData.temp}</Text>
                        <Text style={{ color: 'white', fontSize: 22 }}>°C</Text>
                    </View>
                </View>
            </View>

            <View style={{ margin: 6, flex: 0.6 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
                    {Object.keys(groupedData).map((key, index) => {
                        const data = groupedData[key];
                        const minTemp = Math.min(...data.map(item => item.temp));
                        const maxTemp = Math.max(...data.map(item => item.temp));
                        const humidity = Math.min(...data.map(item => item.humidity));
                        const windSpeed = Math.max(...data.map(item => item.speed));
                        const pressure = Math.max(...data.map(item => item.pressure));
                        const feels_like = Math.max(...data.map(item => item.feels_like))
                        return (
                            <View key={key} style={{ marginBottom: 10, }}>
                                <CustomDropdown title={key} minTemp={minTemp} maxTemp={maxTemp} isOpen={openIndex === index} toggleMenu={() => toggleMenu(index)}>
                                    <View style={{ flex: 1, borderTopWidth: 1, borderColor: 'white', justifyContent: 'space-between', }} >
                                        <WeatherDay data={groupedData[key]} date={key} />
                                    </View>
                                    <View style={{ borderTopWidth: 1, borderColor: 'white', justifyContent: 'space-between' }}>
                                        <View style={{ height: 70, flexDirection: 'row', justifyContent: 'space-around' }}>
                                            <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 1, borderColor: 'white' }}>
                                                <View style={{ marginTop: 10, alignItems: 'center', }}>
                                                    <Icon_humidity style={styles.icon} />
                                                    <Text style={styles.textWeather}>{humidity}%</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center', }}>
                                                <View style={{ marginTop: 10, alignItems: 'center', }}>
                                                    <Icon_wind style={styles.icon} />
                                                    <Text style={styles.textWeather}>{windSpeed} km/h</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ height: 70, flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderColor: 'white' }}>
                                            <View style={{ flex: 1, alignItems: 'center', borderRightWidth: 1, borderColor: 'white' }}>
                                                <View style={{ marginTop: 10, alignItems: 'center', }}>
                                                    <Icon_pressure style={styles.icon} />
                                                    <Text style={styles.textWeather}>{pressure} hPa</Text>
                                                </View>
                                            </View>
                                            <View style={{ flex: 1, alignItems: 'center' }}>
                                                <View style={{ marginTop: 10, alignItems: 'center', }}>
                                                    <Icon_temp style={styles.icon} />
                                                    <Text style={styles.textWeather}>{feels_like}°C (feels)</Text>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </CustomDropdown>
                            </View>
                        );
                    })}
                </ScrollView>
            </View >
            <StatusBar
                animated={true}
                barStyle={'light-content'}
                backgroundColor='black'
            />
        </View >
    );
}
Weather.propTypes = {
    forecasts: PropTypes.array.isRequired,
};