import React, { Component } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
const titleSend = 'Send Info'
var weightmesure = '(Kg)'
var heightmesure = '(Cm)'



export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: '',
      height: '',
      measurementSystem: 'SI',
      
    };
  }

  calculateBMI = () => {
    const weight = parseFloat(this.state.weight);
    const height = parseFloat(this.state.height);

    if (isNaN(weight) || isNaN(height)) {
      Alert.alert('Error', 'Please enter valid weight and height.');
      return;
    }

    const bmi =
      this.state.measurementSystem === 'SI'
        ? (weight / ((height / 100) ** 2)).toFixed(2)
        : ((weight / (height ** 2)) * 703).toFixed(2);

    this.props.navigation.navigate('Result', { bmi });
  };
  

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Seklect Measurement System:</Text>
        <Button
          title="SI (kg, cm)"
          onPress={() => this.setState({ measurementSystem: 'SI' })}
          color={this.state.measurementSystem === 'SI' ? '#007AFF' : 'gray'}
        />
        
        <Button
          title="Metric (lb, in)"
          onPress={() => this.setState({ measurementSystem: 'metric' })}
          color={this.state.measurementSystem === 'metric' ? '#007AFF' : 'gray'}
        />

        <Text style={styles.label}>Weight {weightmesure} :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight"
          onChangeText={(text) => this.setState({ weight: text })}
          value={this.state.weight}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Height {heightmesure} :</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter height"
          onChangeText={(text) => this.setState({ height: text })}
          value={this.state.height}
          keyboardType="numeric"
        />
     
        {/*<Button title="Calculate BMI !!! 2.2.1 " style={styles.buttonPRESS}  onPress={this.calculateBMI}   />*/}

        <Pressable style={styles.buttonsend}  >
         <Text style={styles.textsend} onPress={this.calculateBMI} >{titleSend}</Text>
        </Pressable>
      </View>
    );
  }
}

class ResultScreen extends Component {
  render() {
    const { route } = this.props;
    const bmi = parseFloat(route.params.bmi);

    let resultColor = 'green';
    let resultMsg  = 'Obesity'
    if (bmi < 18.5 ) {
      resultColor = 'red';
      resultMsg = 'Underweight'
    }else if (bmi >= 30){
      resultColor = 'red';

    }else if(bmi >= 18.5 && bmi <= 24.9){
      resultColor = 'green';
      resultMsg = 'Normal'
    }else{
      resultColor = 'yellow';
      resultMsg = 'Obesity'
    }

    return (
      <View style={[styles.container, { backgroundColor: resultColor }]}>
        <Text style={styles.resultText}>Your BMI: {bmi}</Text>
        <Text style={styles.resultText}>Your Weight level is : {resultMsg}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  buttonPRESS: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
    color: '#841584'
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  button_a: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  buttonsend: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  textsend: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

