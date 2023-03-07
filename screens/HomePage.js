import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StarRating from 'react-native-star-rating';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import axios from 'axios';
import CustomHeader from '../components/CustomHeader';

const HomePage = ({navigation}) => {
  return (
    <View style={{flex: 1}}>
      <CustomHeader />
      <Text>HomePage</Text>
    </View>
  );
};

export default HomePage;
