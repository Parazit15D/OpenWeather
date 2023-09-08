import React from 'react';
import { Alert, ImageBackground } from 'react-native';
import Loading from './pages/Loading';
import Weather from './pages/Weather';
import * as Location from 'expo-location';
import axios from 'axios';
import moment from "moment";

const WEATHER_API_KEY = "384c2107b3553c438c95a12941f30d51"

// https://api.openweathermap.org/data/2.5/forecast?lat=51.4958&lon=31.2927&appid=384c2107b3553c438c95a12941f30d51

// список возможных картинок в зависимости от погоды
const weatherImages = {
  Clear: {
    day: require('./img/clear.png'),
    night: require('./img/night.png'),
  },
  Clouds: {
    day: require('./img/cloud.png'),
    night: require('./img/nightCloud.png'),
  },
  Rain: {
    day: require('./img/rain.png'),
    night: require('./img/nightRain.png'),
  },
  Thunderstorm: {
    day: require('./img/rain.png'),
    night: require('./img/nightRain.png'),
  },
  Snow: {
    day: require('./img/snow.png'),
    night: require('./img/nightSnow.png'),
  },
};

export default class App extends React.Component {

  state = {
    isLoading: true,
    forecasts: [],
    backgroundImage: null,
    location: null
  }

  getWeather = async (latitude, longitude) => {
    const { data: { city, list } } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecasts = list.map((item) => {
      const { dt, main: { temp, feels_like, humidity, pressure, temp_min, temp_max },
        wind: { speed },
        dt_txt,
        weather
      } = item

      return {
        date: new Date(dt * 1000),
        temp: Math.round(temp),
        temp_max: Math.round(temp_max),
        temp_min: Math.round(temp_min),
        speed: speed,
        condition: weather[0].main,
        feels_like: Math.round(feels_like),
        humidity: humidity,
        pressure: pressure,
        dt_txt: dt_txt,
        city: city.name,
        sunrise: new Date(city.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(city.sunset * 1000).toLocaleTimeString(),
      }
    })

    this.setState({
      isLoading: false,
      forecasts: forecasts.slice(0, 39),
      backgroundImage: this.getImageByWeather(
        forecasts[0].condition,
        forecasts[0].sunrise,
        forecasts[0].sunset
      )
    });
  }

  getImageByWeather = (weather, sunrise, sunset) => {
    let now = moment(new Date()).format("HH:mm");
    const isDay = now > sunrise && now < sunset;

    const image = weatherImages[weather];
    if (!image) {
      return isDay ? weatherImages[condition].day : weatherImages[condition].night;
    }

    return isDay ? image.day : image.night;
  };

  setLocation = (location) => {
    this.setState({ location }, () => {
      const { latitude, longitude } = this.state.location;
      this.getWeather(latitude, longitude);
    });
  };

  getLocation = async () => {
    if (this.state.location) {
      const { latitude, longitude } = this.state.location;
      this.getWeather(latitude, longitude);
      return;
    }

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

    const { isLoading, forecasts, backgroundImage } = this.state

    if (isLoading) {
      return <Loading />;
    }

    return (
      <ImageBackground
        source={backgroundImage}
        style={{ flex: 1 }}
      >
        <Weather forecasts={forecasts} setLocation={this.setLocation} />
      </ImageBackground>
    );
  }
}