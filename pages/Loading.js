import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';
import React, { useState, useEffect } from 'react'


export default function Loading() {
    const [loadingText, setLoadingText] = useState('.')

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingText((prevValue) =>
                prevValue === '...' ? '.' : prevValue + '.'
            )
        }, 500)

        return () => clearInterval(interval)
    }, [])


    return (
        <ImageBackground source={require('../img/loading.png')} resizeMode="cover" style={styles.container}>
            <View>
                <StatusBar hidden />

                <View style={styles.container}>
                    <View style={{ marginLeft: 22 }}>
                        <Text style={styles.text}>Loading</Text>
                    </View>
                    <View style={{ width: 22 }}>
                        <Text style={styles.text}>{loadingText}</Text>
                    </View>

                </View>

            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        marginTop: 100,
        color: 'white',
        fontSize: 24,
    }
})



// ВИПАДАЮЧЕ МЕНЮ

// Пише помилку Text string must be rendered within a <Text> component. Виправ помилку. import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, TouchableOpacity, Text, View, StatusBar, ImageBackground, Animated, ScrollView, SafeAreaView, RefreshControl, FlatList } from 'react-native';
// import { styles } from '../styles/weather';
// import PropTypes from 'prop-types';
// import moment from "moment";

// const groupBy = (arr, key) => {
//     const sortedArr = arr.sort((a, b) => moment(a[key]) - moment(b[key]));
//     const currentDay = moment().format("dddd");
//     const filteredArr = arr.filter(
//         obj => {
//             const time = moment(obj[key]).format('HH');
//             return time >= '00' && time <= '21';
//         }
//     );
//     const currentDayData = arr.find(obj => moment(obj[key]).isSame(moment(), "day"));
//     if (currentDayData) {
//         if (!filteredArr[currentDay]) filteredArr[currentDay] = [];
//         filteredArr[currentDay].unshift(currentDayData);
//     }
//     return filteredArr.reduce((acc, obj) => {
//         const date = moment(obj[key]).format("dddd");
//         if (!acc[date]) acc[date] = [];
//         acc[date].push(obj);
//         return acc;
//     }, {});
// };

// const CustomDropdown = ({ title, children, minTemp, maxTemp, isOpen, toggleMenu }) => {
//     const heightAnimation = useRef(new Animated.Value(0)).current;

//     useEffect(() => {
//         const initialValue = isOpen ? 0 : 200;
//         const finalValue = isOpen ? 400 : 0;

//         heightAnimation.setValue(initialValue);

//         Animated.timing(heightAnimation, {
//             toValue: finalValue,
//             duration: 500,
//             useNativeDriver: false,
//         }).start();
//     }, [isOpen]);

//     const menuHeight = heightAnimation.interpolate({
//         inputRange: [1, 130],
//         outputRange: [0, 100],
//     });

//     const menuOpacity = heightAnimation.interpolate({
//         inputRange: [0, 100],
//         outputRange: [0, 1],
//     });

//     return (
//         <View style={styles.dropdownBackground}>
//             <TouchableOpacity onPress={() => {
//                 toggleMenu(title);
//             }}>
//                 <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <Text style={{ margin: 5, color: 'white', fontSize: 16.5 }}>{title}</Text>
//                     <Text style={{ margin: 5, color: 'white', alignSelf: 'flex-end', fontSize: 16.5 }}>{maxTemp}° / {minTemp}°</Text>
//                 </View>
//             </TouchableOpacity>
//             {isOpen && (
//                 <Animated.View style={[styles.dropdownMenu, { height: menuHeight, opacity: menuOpacity },]}>
//                     {children}
//                 </Animated.View>
//             )}
//         </View>
//     );
// };

// const WeatherIcon = ({ weather }) => {
//     switch (weather) {
//         case 'Rain':
//             return
//         case 'Clouds':
//             return
//         case 'Clear':
//             return
//         case 'Snow':
//             return
//         default:
//             return
//     }
// }

// const WeatherDay = ({ data, date }) => {
//     const renderItem = ({ item }) => {
//         return (
//             <View key={item.date} style={{ flex: 1, alignItems: 'center', margin: 5, justifyContent: 'space-between', }}>

//                 {moment(item.dt_txt).format('HH:mm')}




//                 <View style={{ alignItems: 'center' }}>

//                     {item.temp}


//                 </View>
//             </View>
//         );
//     };

//     return (
//         <FlatList showsHorizontalScrollIndicator={false} data={data} keyExtractor={(item) => item.dt_txt} renderItem={renderItem} horizontal refreshing={false}>
//         </FlatList>
//     );
// };

// export default function Weather({ forecasts }) {
//     const [openDropdown, setOpenDropdown] = useState('');

//     const toggleMenu = (title) => {
//         setOpenDropdown(openDropdown === title ? '' : title);
//     };

//     let todayData;
//     const filteredForecasts = forecasts.filter(item => moment(item.date).isSameOrAfter(moment(), "day"));
//     if (filteredForecasts.length > 0) {
//         todayData = filteredForecasts.shift();
//     }

//     const groupedData = groupBy(filteredForecasts, 'date');

//     const handleDropdownOpen = () => {
//         setOpenDropdown('');
//     }

//     return (
//         <View style={{ flex: 1, }}>
//             <StatusBar hidden />
//             <View style={{ flex: 0.4 }}>
//                 <View style={{ margin: 10 }}>
//                     <Text style={{ color: 'white', fontSize: 23 }}>{todayData.city}</Text>
//                 </View>

//                 <View style={{ alignItems: 'center', marginTop: 70 }}>
//                     <View style={{ marginTop: 15, flexDirection: 'row' }}>
//                         <Text style={{ fontSize: 50, color: 'white', letterSpacing: 2 }}>{todayData.temp}</Text>
//                         <Text style={{ color: 'white', fontSize: 22 }}>°C</Text>
//                     </View>
//                 </View>
//             </View>


//             <View style={{ margin: 6, flex: 0.6 }}>
//                 <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end' }}>
//                     {Object.keys(groupedData).map((key) => {
//                         const data = groupedData[key];
//                         const minTemp = Math.min(...data.map(item => item.temp));
//                         const maxTemp = Math.max(...data.map(item => item.temp));
//                         const humidity = Math.max(...data.map(item => item.humidity));
//                         const windSpeed = Math.max(...data.map(item => item.speed));
//                         const pressure = Math.max(...data.map(item => item.pressure));
//                         const feels_like = Math.max(...data.map(item => item.feels_like))
//                         return (
//                             <View key={key} style={{ marginBottom: 10, }}>
//                                 <CustomDropdown title={key} minTemp={minTemp} maxTemp={maxTemp} isOpen={openDropdown === key} toggleMenu={toggleMenu}>
//                                     <View style={{ flex: 1, borderTopWidth: 1, borderColor: 'white', justifyContent: 'space-between' }}>
//                                         <WeatherDay data={groupedData[key]} date={key} />
//                                     </View>
//                                     <View style={{ flex: 1, borderTopWidth: 0.5, justifyContent: 'space-around', borderColor: 'white', flexDirection: 'row' }}>
//                                         <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', }}>
//                                             <Icon_humidity style={styles.icon} />
//                                             <Icon_wind style={styles.icon} />
//                                         </View>

//                                         <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', borderRightColor: 'white', }}>
//                                             <Text style={styles.textWeather}>{humidity}%</Text>
//                                             <Text style={styles.textWeather}>{windSpeed} km/h</Text>
//                                         </View>

//                                         <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', }}>
//                                             <Icon_pressure style={styles.icon} />
//                                             <Icon_temp style={styles.icon} />
//                                         </View>
//                                         <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center', }}>
//                                             <Text style={styles.textWeather}>{pressure} hPa</Text>
//                                             <Text style={styles.textWeather}>{feels_like}°C (feels)</Text>
//                                         </View>
//                                     </View>
//                                 </CustomDropdown>
//                             </View>
//                         );

//                     })}
//                 </ScrollView>
//             </View >
//         </View >
//     );
// }
// Weather.propTypes = {
//     forecasts: PropTypes.array.isRequired,
// };
