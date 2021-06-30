# react-native-simple-calendar

React Native calendar component and date slider

## Installation

`npm i another-react-native-simple-calendar`

![](screenshot.jpg)

## Usage

```javascript
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import {Calendar, DateSlider} from 'another-react-native-simple-calendar';
import dayjs from 'dayjs';

const App = () => {
  const [date, setDate] = useState(dayjs());

  return (
    <View style={styles.appContainer}>
      <Text style={styles.text}>Swipe or tap to change date</Text>
      <DateSlider
        style={styles.dateSliderContainer}
        date={date}
        setDate={setDate}
        type="day"
        format="D MMM YYYY"
      />
      <DateSlider
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

```

## DateSlider Methods

#### setDate(date)

| Params | Type  | Description  |
| ------ |:-----:| ------------ |
| date   | Dayjs | Selected date |

## DateSlider Props

| Name      | Type          | Default    | Description  |
| --------- |:-------------:| ---------- | ------------ |
| date      | Dayjs         | today date | Date value in dayjs lib format |
| type      | string        | 'month'    | 'day', 'month' or 'year' |
| format    | string        | 'MMMM'     | Date format (https://day.js.org/docs/en/display/format) |
| iconProps | SvgProps      | -          | Props of arrow icons (width, height, viewBox, preserveAspectRatio, color, title) |
| textStyle | TextStyle     | -          | React native text style |
| style     | ViewStyle     | -          | React native view style |

## Calendar Methods

#### setDate(date)

| Params | Type  | Description  |
| ------ |:-----:| ------------ |
| date   | Dayjs | Selected date |

## DateSlider Props

| Name                  | Type          | Default    | Description  |
| --------------------- |:-------------:| ---------- | ------------ |
| date                  | Dayjs         | today date | Date value in dayjs lib format |
| containerStyle        | ViewStyle     | '- '       | React native view style |
| backgroundColor       | string        | '#5cb2e4'  | Background color value |
| selectedDayColor      | string        | '#ffffff'  | Selected day color value |
| todayColor            | string        | '#319EDC'  | Today color value |
| weekdayColor          | string        | '#C2E2F5'  | Week day color value |
| selectedMonthColor    | string        | '#ffffff'  | Selected month color value |
| notSelectedMonthColor | string        | '#C2E2F5'  | Not selected mmonth color value |
