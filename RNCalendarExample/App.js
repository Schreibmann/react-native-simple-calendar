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
      <DateSlider
        date={date}
        setDate={setDate}
        type="day"
        format="D MMM YYYY"
      />
      <DateSlider date={date} setDate={setDate} type="month" format="MMMM" />
      <DateSlider date={date} setDate={setDate} type="year" format="YYYY" />
      <Calendar date={date} setDate={setDate} />
    </View>
  );
};

export default App;
