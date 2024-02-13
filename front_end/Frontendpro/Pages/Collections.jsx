import { Text, View, Button,ScrollView } from "react-native"
import React, { useState } from 'react';
import DataCard from "../Compoents/DataCard";

import App from "../App";


const Collections = () =>{
    const [currPage, setCurrPage] = useState('Collections');
    const [Data, setData] = useState(null);
    const getData = async () => {
      try {
        const response = await fetch(`http://{your IPV4 endpoint}:3001/getcollections`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    React.useEffect(() => {
        getData();
      
    }, []);
    const renderPage = () => {
        switch (currPage) {
          case 'Home':
            return <App />;
          case 'Collections':
           
            return ( 
            <ScrollView>
            <View>
              <Button style={{backgroundColor: 'blue', padding: 10, borderRadius: 5, width: 100, height: 30, justifyContent: 'center', alignItems:'center',}} title='Back to Home Page' onPress={() => setCurrPage('Home')}></Button>
                <Text>
                <Text>{<DataCard data={Data} />}</Text>
                </Text>
                </View>
                </ScrollView>
                )
           
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

export default Collections;