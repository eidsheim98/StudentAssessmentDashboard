import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { globalStyles } from '../styles/global';


export default function BarChart({navigation}) {

const pressHandler = () => {
    navigation.navigate('FormDatabase')
}

    return(
        <View style={globalStyles.container}>
            <Text style={globalStyles.sectionTitle}> barChart screen</Text>
            <Button title = 'Go to Home Screen' onPress={pressHandler} />
        </View>
    )

}