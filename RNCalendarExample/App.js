import React, {useState} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {Calendar, DateSlider} from '../dist';
import dayjs from 'dayjs';

const App = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <View>
      <StatusBar />
      <Text>Calendar example</Text>
      <DateSlider type="day" format="D MMM YYYY" />
      <DateSlider type="month" format="MMMM" />
      <DateSlider type="year" format="YYYY" />
      <Calendar date={date} setDate={setDate} />
    </View>
  );
};

export default App;
