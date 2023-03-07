import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

const CustomHeader = props => {
  return (
    <SafeAreaView
      style={{
        height: 180,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor:'#555DF2',
        marginTop:0,
      }}>
      <Text
        style={{
          color: 'white',
          fontWeight: 'bold',
          fontSize: 35,
          marginBottom: 0,
          marginTop: 120,
          marginLeft: 20,
        }}>
        <Text>Med</Text>
        <Text style={{color: '#44E354'}}>Com</Text>
      </Text>
    </SafeAreaView>
  );
};

export default CustomHeader;
