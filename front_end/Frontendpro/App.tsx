import React, { useState } from 'react';
import { View, Button, Text, Alert } from 'react-native';
import Collections from './Pages/Collections';
import ShowmyCounts from './Pages/ShowmyCounts';
import MySettings from './Pages/MySettings';

interface Props {

  Title1: string;
  Title2: string;
  Title3: string;
  MaxCount:string;
}

const App = ({Title1, Title2, Title3, MaxCount}:Props) => {

  const [currPage, setCurrPage] = useState('Home');
  const [AData, setAData] = useState(0);
  const [BData, setBData] = useState(0);
  const [CData, setCData] = useState(0);
  const [TotalData, setTotal] = useState(0);
  const [datastack, setstack] = useState<string[]>([]);
  const id = 123;
  
  const ADataCount = () =>{
       setAData(AData + 1);
       setstack(prevStack => [...prevStack, Title1 || 'A']);
  }
  const BDataCount = () => {
    setBData(BData + 1);
    setstack(prevStack => [...prevStack, Title2 || 'B']);
  }

  const CDataCount = () =>{
    setCData(CData + 1);
    setstack(prevStack => [...prevStack, Title3 || 'C']);
  }
  const updateTotal = () => {
    setTotal(AData + BData + CData);
  };

  React.useEffect(() => {
    updateTotal();
  }, [AData, BData, CData]);

  const renderPage = () => {
    switch (currPage) {
      case 'Home':
        return (
          <View>
            <Text>This is the Home Page!</Text>
            <Button title="Check my database data (backend)" onPress={() => setCurrPage('Collections')} />
            <Text></Text>
            <Button title='My Settings' onPress={()=> setCurrPage('MySettings')} />
            <Text></Text>
            <View>
            <Button title={Title1 || 'Event_A'} onPress={ADataCount}></Button>
            <Text>{AData}</Text>
            <Button title ={Title2 || 'Event_B'} onPress={BDataCount}></Button>
            <Text>
              {BData}
            </Text>
            <Button title={Title3 || 'Event_C'} onPress={CDataCount}></Button>
            <Text>
              {CData}
            </Text>
            <Text></Text>
            <Text>Max Count</Text>
            <Text>{MaxCount || '0'}</Text>
            <Text>Total Pressed</Text>
            <Text>{TotalData}</Text>
            <Button title='Save to Database (backend)' onPress={saveData}></Button>
            <Text></Text>
            <Button title='Show my Counts' onPress={()=> setCurrPage('ShowMyCounts')} />
    </View>
          </View>
        );
      case 'Collections':
       
        return <Collections />;

        case 'ShowMyCounts':
          return <ShowmyCounts Adata={AData} Bdata={BData} Cdata={CData} Total={TotalData} stackData={datastack} title1={Title1} title2={Title2} title3={Title3} maxCount={MaxCount} />;

        case 'MySettings':
          return <MySettings />
            
      default:
        return null;
    }
  };

  const saveData = async () => {
    try {
      const response = await fetch('http://{your IPV4 endpoint}:3001/addcollection',{
        'method':'POST',
        'headers':{
          'Content-Type': 'application/json',
        },
        
        body:JSON.stringify({id, Event_A: AData, Event_B:BData, Event_C: CData, Total:TotalData})
      });
      if(response.ok){
        console.log("Success");
        Alert.alert('Save Successful');
        setAData(0);
        setBData(0);
        setCData(0);
      }
      
    } catch (error) {
      console.log(error);
      Alert.alert('Save failed');
    }
  }


  return (
    <View style={{ flex: 1 }}>
    {renderPage()}
  </View>
  );
};

export default App;
