import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SwipeButton from 'rn-swipe-button'; // Install rn-swipe-button
import { LogBox } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';

// Suppress the warning related to defaultProps
LogBox.ignoreLogs(['Support for defaultProps will be removed']);

const CheckIn = () => {
  // State for selected date index
  const [selectedDate, setSelectedDate] = useState(0);

  // Dummy dates for the calendar strip
  const dates = Array.from({ length: 31 }, (_, index) => ({
    day: index + 1,
    dayName: new Date(2024, 8, index + 1).toLocaleDateString('en-US', { weekday: 'short' }),
  }));

  // Dummy check-in and check-out times
  const checkInTime = '08:32 am';
  const checkOutTime = '05:40 pm';

  // Handling swipe to check-in
  const handleSwipe = () => {
    Alert.alert('Checked in successfully!');
  };

  const navigation = useNavigation();

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      {/* Header */}
      <View style={tw`bg-red-700 p-5 pt-12 rounded-b-3xl`}>
        <Icon name="arrow-back" size={24} color="#fff" onPress={() => navigation.navigate('Home')} />
        <Text style={tw`text-white text-lg font-bold mt-2`}>
          Welcome back{'\n'}Yudis, Enjoy your work
        </Text>
        <Text style={tw`text-white text-2xl font-bold mt-1`}>17:32:32</Text>
      </View>

      {/* Date Scroll */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`py-2 mx-5`}>
        {dates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={tw`bg-white px-3 py-2 rounded-lg mx-1 h-12 items-center ${selectedDate === index ? 'bg-red-700' : ''}`}
            onPress={() => setSelectedDate(index)}
          >
            <Text style={tw`text-base font-bold ${selectedDate === index ? 'text-white' : 'text-black'}`}>
              {String(date.day).padStart(2, '0')}
            </Text>
            <Text style={tw`text-xs ${selectedDate === index ? 'text-white' : 'text-gray-600'}`}>
              {date.dayName}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Attendance Log */}
      <View style={tw`px-5 mt-3`}>
        <Text style={tw`text-lg font-bold mb-2`}>Attendance Log</Text>
        <View style={tw`flex-row justify-between`}>
          <View style={tw`bg-white p-4 rounded-lg w-5/12 shadow-md`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Icon name="arrow-forward" size={16} color="red" />
              <Text style={tw`ml-1 font-bold text-black`}>Check In</Text>
            </View>
            <Text style={tw`text-xl text-black`}>{checkInTime}</Text>
            <Text style={tw`text-sm text-gray-600`}>Yesterday</Text>
          </View>

          <View style={tw`bg-white p-4 rounded-lg w-5/12 shadow-md`}>
            <View style={tw`flex-row items-center mb-1`}>
              <Icon name="arrow-back" size={16} color="red" />
              <Text style={tw`ml-1 font-bold text-black`}>Check Out</Text>
            </View>
            <Text style={tw`text-xl text-black`}>{checkOutTime}</Text>
            <Text style={tw`text-sm text-gray-600`}>Go Home</Text>
          </View>
        </View>
      </View>

      {/* Swipe to Check In */}
      <SwipeButton
        thumbIconBackgroundColor="#fff"
        thumbIconComponent={() => <Icon name="arrow-forward" size={20} color="#D32F2F" />}
        railBackgroundColor="#FFCDD2"
        railFillBackgroundColor="#D32F2F"
        railFillBorderColor="#D32F2F"
        title="Swipe to Check In"
        titleColor="#fff"
        titleFontSize={16}
        onSwipeSuccess={handleSwipe}
        containerStyles={tw`mx-5 mt-5`}
      />
    </View>
  );
};

export default CheckIn;
