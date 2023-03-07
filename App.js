import React from 'react';
import { Alert } from 'react-native';
import Loading from './pages/Loading';
import Weather from './pages/Weather';
import * as Location from 'expo-location';
import axios from 'axios';

const WEATHER_API_KEY = "384c2107b3553c438c95a12941f30d51"
// https://api.openweathermap.org/data/2.5/weather?lat=51.4958&lon=31.2927&appid=384c2107b3553c438c95a12941f30d51


export default class extends React.Component {

  state = {
    isLoading: true,
  }


  getWeather = async (latitude, longitude) => {
    const { data: {
      main: { temp, feels_like, humidity, pressure },
      sys: { sunrise, sunset },
      wind: { speed }, weather, name } } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)

    this.setState({
      isLoading: false,
      temp: temp,
      condition: weather[0].main,
      name: name,
      speed: speed,
      feels_like: feels_like,
      humidity: humidity,
      pressure: pressure,
      sunrise: sunrise,
      sunset: sunset,
    })
  }

  getLocation = async () => {
    try {
      await Location.requestForegroundPermissionsAsync()
      const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
      this.getWeather(latitude, longitude)
    }
    catch (error) {
      Alert.alert('Помилка', 'пробачте')
    }
  }

  componentDidMount() {
    this.getLocation()
  }

  render() {

    const { isLoading, temp, condition, name, feels_like, speed, humidity, pressure, sunrise,
      sunset, } = this.state

    return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} name={name} feels_like={Math.round(feels_like)} speed={speed} humidity={humidity} pressure={pressure} sunrise={sunrise}
        sunset={sunset} />
    );
  }
}