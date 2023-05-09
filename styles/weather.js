import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scroll: {
        justifyContent: 'flex-end',
        flex: 2,
    },

    dropdown: {
        padding: 10,
        backgroundColor: '#FFF',
        borderRadius: 5,
        marginTop: 10,
    },

    item: {
        padding: 20,
        marginVertical: 8,
        borderRadius: 10,
    },
    title: {
        fontSize: 24,
    },

    dropdownBackground: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        borderRadius: 15,
    },

    contentWeather: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottomWidth: 1,
    },

    textWeather: {
        fontSize: 18,
        marginTop: 3,
        justifyContent: 'center',
        color: 'white',
    },

    icon: {
        width: 25,
        height: 25,
    }
});



// const groupBy = (arr, key) => {
//     const sortedArr = arr.sort((a, b) => moment(a[key]) - moment(b[key]));
//     const currentDate = moment(new Date()).startOf('day');
//     const currentDay = currentDate.format("dddd");
//     return sortedArr.reduce((acc, obj) => {
//         const date = moment(obj[key]).format("dddd");
//         if (moment(obj[key]).isSameOrAfter(currentDate)) {
//             if (!acc[date]) acc[date] = [];
//             acc[date].push(obj);
//         } else if (date === currentDay) {
//             if (!acc[date]) acc[date] = [];
//             acc[date].push(obj);
//         }
//         return acc;
//     }, {});
// };



// import Icon_humidity from '../svg/humidity.svg'
// import Icon_pressure from '../svg/pressure.svg'
// import Icon_wind from '../svg/wind.svg'
// import Icon_temp from '../svg/temp.svg'
// import Icon_cloudy from '../svg/cloud.svg'
// import Icon_rain from '../svg/cloud.svg'
// import Icon_clear from '../svg/sun.svg'
// import Icon_snow from '../svg/snow.svg'


{/* <View style={{ borderTopWidth: 1, borderColor: 'white', justifyContent: 'space-between' }}>
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
</View> */}





// import React, { useState, useEffect, useRef } from 'react';
// import { StyleSheet, TouchableOpacity, Text, View, StatusBar, ImageBackground, Animated, ScrollView, SafeAreaView, RefreshControl, FlatList } from 'react-native';
// import { styles } from '../styles/weather';
// import PropTypes from 'prop-types';
// import moment from "moment";

// import Icon_humidity from '../svg/humidity.svg'
// import Icon_pressure from '../svg/pressure.svg'
// import Icon_wind from '../svg/wind.svg'
// import Icon_temp from '../svg/temp.svg'


// const groupBy = (arr, key) => {
//     const sortedArr = arr.sort((a, b) => moment(a[key]) - moment(b[key]));
//     const currentDay = moment().format("dddd");
//     const filteredArr = arr.filter((obj) => moment(obj[key]).isSameOrAfter(moment(), "day"));
//     const currentDayData = arr.find((obj) => moment(obj[key]).isSame(moment(), "day"));
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


// const CustomDropdown = ({ title, children }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     const heightAnimation = useRef(new Animated.Value(0)).current;

//     const toggleMenu = () => {
//         setIsOpen(!isOpen);
//     };

//     useEffect(() => {
//         const initialValue = isOpen ? 0 : 200;
//         const finalValue = isOpen ? 200 : 0;

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
//         <View>
//             <TouchableOpacity onPress={toggleMenu} style={styles.dropdownTitle}>
//                 <Text style={styles.textWeather}>{title}</Text>
//             </TouchableOpacity>
//             {isOpen && (
//                 <Animated.View style={[styles.dropdownMenu, { height: menuHeight, opacity: menuOpacity }]}>
//                     {children}
//                 </Animated.View>
//             )}
//         </View>
//     );
// };

// const WeatherDay = ({ data, date }) => {
//     const renderItem = ({ item }) => {
//         return (
//             <View key={item.date} style={{ flex: 1 }}>
//                 <View>
//                     <Text style={styles.textWeather}>Date: {moment(item.dt_txt).format('DD-MM-YYYY')}</Text>
//                     <Text style={styles.textWeather}>Time: {moment(item.dt_txt).format('HH:mm:ss')}</Text>
//                 </View>

//                 <Text style={styles.textWeather}>Temperature: {item.temp}</Text>
//                 <Text style={styles.textWeather}>Condition: {item.condition}</Text>
//                 <Text style={styles.textWeather}>Feels like: {item.feels_like}</Text>
//                 <Text style={styles.textWeather}>Humidity: {item.humidity}</Text>
//                 <Text style={styles.textWeather}>Pressure: {item.pressure}</Text>
//             </View>
//         );
//     };

//     return (
//         <FlatList style={{}} data={data} keyExtractor={(item) => item.dt_txt} renderItem={renderItem} horizontal refreshing={false}>
//             <View style={{ margin: 10 }}>
//                 <Text style={{ color: 'white', fontSize: 23 }}>{date}</Text>
//             </View>
//         </FlatList>
//     );
// };


// export default function Weather({ forecasts }) {

//     const [refreshing, setRefreshing] = useState(false);

//     const onRefresh = () => {
//         setRefreshing(true);
//         setRefreshing(false);
//     };

//     let todayData;
//     const filteredForecasts = forecasts.filter((item) => moment(item.date).isSameOrAfter(moment(), "day"));
//     if (filteredForecasts.length > 0) {
//         todayData = filteredForecasts.shift();
//     }

//     const groupedData = groupBy(filteredForecasts, 'date');

//     return (
//         <View style={{ flex: 1, justifyContent: 'space-between' }}>
//             <View style={{ flex: 2 }}>
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

//             <ScrollView>
//                 <View style={{ flex: 1, justifyContent: 'space-evenly', margin: 10 }}>
//                     {Object.keys(groupedData).map((key) => (
//                         <View key={key} style={{ borderBottomWidth: 1, borderBottomColor: 'white' }}>
//                             <CustomDropdown title={key}>
//                                 <WeatherDay data={groupedData[key]} date={key} />
//                             </CustomDropdown>
//                         </View>
//                     ))}
//                 </View>
//             </ScrollView>
//         </View>
//     );
// }

// Weather.propTypes = {
//     forecasts: PropTypes.array.isRequired,
// };