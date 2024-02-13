import { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native"
import App from "../App";
const MySettings = () =>{
  const [toggle, settoggle] = useState(false);
    const [currPage, setCurrPage] = useState('MySettings');
    const [inputOne, setInputOne] = useState(null);
    const [inputTwo, setInputTwo] = useState(null);
    const [inputThree, setInputThree] = useState(null);
    const [maxCount, setMaxCount] = useState(null);
    const edithandle = () => {
       settoggle(true);
    }
    const savehandle = () =>{
        setInputOne(inputOne);
        setInputTwo(inputTwo);
        setInputThree(inputThree);
        setMaxCount(maxCount);
        settoggle(false);
        Alert.alert("Save successful");
    }
    const renderPage = () => {
        switch (currPage) {
          case 'Home':
            return <App Title1={inputOne} Title2={inputTwo} Title3={inputThree} MaxCount={maxCount} />;
          case 'MySettings':
           
            return (  <View style={styles.container}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonRight}  onPress={() => setCurrPage('Home')}>
                  <Text style={styles.buttonText}>Back to Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLeft} onPress={edithandle}>
                  <Text style={styles.buttonText}>Toggle event</Text>
                </TouchableOpacity>
              </View>
                <Text></Text>
                <Text>Enter Name for the first element</Text>
                <TextInput placeholder="Enter Here" onChangeText={text => setInputOne(text)} value={inputOne} editable={toggle} />
                <Text>Enter Name for the second element</Text>
                <TextInput placeholder="Enter Here" onChangeText={text => setInputTwo(text)} value={inputTwo} editable={toggle} />
                <Text>Enter Name for the third element</Text>
                <TextInput placeholder="Enter Here" onChangeText={text => setInputThree(text)} value={inputThree} editable={toggle} />
                <Text>Enter The max Count</Text>
                <TextInput placeholder="Enter Here" onChangeText={text => setMaxCount(text)} value={maxCount} editable={toggle} />
                <TouchableOpacity style={styles.buttonsave}  onPress={savehandle}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                </View>
                );
           
          default:
            return null;
        }
      };

    return (
        <View style={{ flex: 1 }}>
        {renderPage()}
       </View>
    )
};
const styles = {
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  buttonRight: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'right',
    justifyContent: 'center',
    width: '35%',
  },
  buttonLeft: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 5,
    alignItems: 'left',
    justifyContent: 'center',
    width: '35%',
  },
  buttonsave:{
    backgroundColor:'grey',
    borderRadius:5,
     height:'5%',
     justifyContent: 'center',
     fontSize:'5%'

  }
  
};

export default MySettings;