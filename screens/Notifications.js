import React, {useState, useContext, useEffect} from 'react';
import {ScrollView, View, Text} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';
// import {UserContext} from '../navigation/UserProvider';

const Notifications = () => {
  const {user, notifications, setNotifications, eventData, backendUrl} =
    useContext(AuthContext);

  const getNotifications = async () => {
    const res = await axios.get(
      `${backendUrl}notifications/` + user.identifier,
    );
    console.log('result in notification', res.data.notifications);
    setNotifications(res.data.notifications.reverse());
    console.log(res.data.notifications.reverse());
    console.log(notifications.reverse());
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <View style={{flex:2, backgroundColor: '#E6EFF9'}}>
      <ScrollView style={{backgroundColor:'#E6EFF9', width:'100%', padding:20, borderRadius:20, height:10}}>
        {notifications?.slice(0,15).map((item, index) => (
          <View style={{height:70}}
            key={index} >
            <View style={{padding:10, borderWidth:1, borderColor:'grey', borderRadius:7, backgroundColor:'white'}}>
              {item.eventType == 'Patient.Requested' ? (
                <>
                  <Text style={{fontSize:15, textAlign:'right', width:'100%', color:'blue'}}>{new Date(item.date).toLocaleDateString()}</Text>
                  <Text style={{fontSize:18, fontWeight:'500', fontStyle:'italic'}}>
                    {item.emitter} has{' '}
                    {item.eventType.substr(item.eventType.indexOf('.') + 1)}{' '}
                    Access
                  </Text>
                </>
              ) : item.eventType == 'MedicalRecord.Created' ||
                item.eventType == 'LabRecord.Created' ? (
                <>
                  <Text style={{fontSize:15, textAlign:'right', width:'100%', color:'blue'}}>{new Date(item.date).toLocaleDateString()}</Text>
                  <Text style={{fontSize:18}}>
                    {item.emitter} has created a{' '}
                    {item.eventType.slice(0, item.eventType.indexOf('.'))}{' '}
                  </Text>
                </>
              ) : (
                <>
                  <Text style={{fontSize:15, textAlign:'right', width:'100%', color:'blue'}}>{new Date(item.date).toLocaleDateString()}</Text>
                  <Text style={{fontSize:18}}>
                    {item.emitter} has created a{' '}
                    {item.eventType.slice(0, item.eventType.indexOf('.'))}{' '}
                  </Text>
                </>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Notifications;
