import React, {useState} from 'react';
import {StatusBar, Text, View, StyleSheet} from 'react-native';
import {Calendar, DateSlider} from '../dist';
import dayjs from 'dayjs';

const App = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <View style={styles.appContainer}>
      <StatusBar />
      <Text style={styles.text}>Swipe or tap to change date</Text>
      <DateSlider
        locale="ru"
        style={styles.dateSliderContainer}
        date={date}
        setDate={setDate}
        type="day"
        format="D MMM YYYY"
      />
      <DateSlider
        locale="de"
        style={styles.dateSliderContainer}
        date={date}
        setDate={setDate}
        type="month"
        format="MMMM"
      />
      <DateSlider
        style={styles.dateSliderContainer}
        date={date}
        setDate={setDate}
        type="year"
        format="YYYY"
      />
      <Calendar date={date} setDate={setDate} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  dateSliderContainer: {
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontWeight: '700',
    textAlign: 'center',
  },
});
