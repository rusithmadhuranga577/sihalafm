import React, { useEffect, useState } from 'react';
import { Navigator } from '@navigation';
import { LogBox, Text } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { NoInternet } from '@screens';
import NetInfo, {useNetInfo} from "@react-native-community/netinfo";
 
 const App = () => {

    const [networkState, setnetworkState] = useState(true);
    const netInfo = useNetInfo();
 
   useEffect(()=>{
     LogBox.ignoreAllLogs();
     
     const unsubscribe = NetInfo.addEventListener(state => {
       console.log('netInfo.isConnected  ',netInfo.isConnected)
      if(netInfo.isConnected){
        setnetworkState(true);
      }else{
        setnetworkState(false);
      }
    });
    
    return unsubscribe();
   },[])
 
   return (
     <>
      {!netInfo.isConnected ?
        <NoInternet/>
      :
        <>
          <MenuProvider>
            <Navigator/>
          </MenuProvider>
        </>
      }
     </>
   );
 };
 
 export default App;
 