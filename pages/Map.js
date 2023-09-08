import React, { useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ visible, onClose, setDatas }) => {
    const [location, setLocation] = useState(null);

    const onMarkerPress = (e) => {
        setLocation(e.nativeEvent.coordinate);
    };

    const onSavePress = () => {
        if (location) {
            setDatas(location);
        }
        onClose();
    };

    return (
        <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
            <View style={{ flex: 1 }}>
                <MapView style={{ flex: 1 }} onPress={onMarkerPress}>
                    {location && <Marker coordinate={location} />}
                </MapView>
                <View style={{ flexDirection: 'row', backgroundColor: '#333332', justifyContent: 'space-around' }}>
                    <Pressable style={styles.button} onPress={onSavePress}>
                        <Text style={styles.text}>Зберегти</Text>
                    </Pressable>

                    <Pressable style={styles.button} onPress={onClose}>
                        <Text style={styles.text}>Скасувати</Text>
                    </Pressable>
                </View>

            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    button: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        height: 50,
    },
    text: { color: 'white', fontSize: 18 },
});

export default Map;