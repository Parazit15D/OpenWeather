import { StyleSheet, Text, View, StatusBar, ImageBackground } from 'react-native';

export default function Loading() {
    return (
        <ImageBackground source={require('../img/loading.png')} resizeMode="cover" style={styles.container}>
            <View>
                <StatusBar hidden />
                <View style={styles.container}>
                    <Text style={styles.text}>Loading...</Text>
                </View>
            </View>
        </ImageBackground>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginTop: 100,
        color: 'white',
        fontSize: 24,
    }
})