import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
  Platform,
  ColorValue,
} from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import isTodayPlugin from 'dayjs/plugin/isToday';
import DateSlider from './DateSlider';

const CALENDAR_GRID_MIN_SIZE = 35;
const CALENDAR_GRID_MAX_SIZE = 42;

dayjs.extend(localeData);
dayjs.extend(isTodayPlugin);

const globalLocaleData = dayjs.localeData();
const weekdaysShort = globalLocaleData.weekdaysShort();

interface CalendarProps extends ViewProps {
  date?: Dayjs;
  setDate: (date: Dayjs) => void;
  containerStyle?: ViewStyle;
  backgroundColor?: ColorValue;
  selectedDayColor?: ColorValue;
  weekdayColor?: ColorValue;
  selectedMonthColor?: ColorValue;
  notSelectedMonthColor?: ColorValue;
  todayColor?: ColorValue;
}

const Calendar: React.FC<CalendarProps> = ({
  containerStyle,
  backgroundColor,
  selectedDayColor,
  todayColor,
  weekdayColor,
  selectedMonthColor,
  notSelectedMonthColor,
  date = dayjs(),
  setDate,
  ...rest
}: CalendarProps) => {
  const isWeb = Platform.OS === 'web';

  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          backgroundColor: backgroundColor || '#5cb2e4',
          paddingVertical: 16,
          borderRadius: 16,
          width: '100%',
          ...containerStyle,
        },
        monthContainer: {
          width: '100%',
          paddingHorizontal: 20,
        },
        weekDaysContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          marginVertical: 20,
          paddingHorizontal: 6,
        },
        daysContainer: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          width: '100%',
          paddingHorizontal: 6,
        },
        selectedDayWrapper: {
          alignContent: 'center',
          alignItems: 'center',
          width: isWeb ? 'calc(100% / 7)' : '14.28%',
          zIndex: 1,
        },
        dayWrapper: {
          alignContent: 'center',
          alignItems: 'center',
          width: isWeb ? 'calc(100% / 7)' : '14.28%',
        },
        dayContainer: {
          width: 32,
          height: 32,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: backgroundColor || '#5cb2e4',
        },
        selectedDayContainer: {
          width: 32,
          height: 32,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 100,
          backgroundColor: selectedDayColor || '#ffffff',
        },
        todayText: {
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          lineHeight: 20,
          color: todayColor || '#319EDC',
        },
        currentMonthDayText: {
          textAlign: 'center',
          fontWeight: '600',
          fontSize: 14,
          lineHeight: 22,
          color: selectedMonthColor || '#ffffff',
        },
        notCurrentMonthDayText: {
          textAlign: 'center',
          fontWeight: '400',
          fontSize: 14,
          lineHeight: 22,
          color: notSelectedMonthColor || '#C2E2F5',
        },
        selectedDayText: {
          fontWeight: '700',
          fontSize: 14,
          lineHeight: 22,
          color: selectedDayColor || '#319EDC',
        },
        weekDay: {
          textTransform: 'uppercase',
          fontWeight: '700',
          fontSize: 12,
          lineHeight: 16,
          letterSpacing: 1,
          color: weekdayColor || '#C2E2F5',
          flex: 1 / 7,
          textAlign: 'center',
        },
        emptyLine: { width: '100%', height: 32 },
      }),
    [
      backgroundColor,
      containerStyle,
      isWeb,
      notSelectedMonthColor,
      selectedDayColor,
      selectedMonthColor,
      todayColor,
      weekdayColor,
    ],
  );

  const [month, setMonth] = useState(date);

  const makeRenderData = useCallback(() => {
    const daysInMonth = month.daysInMonth();
    const daysInPrevMonth = month.subtract(1, 'month').daysInMonth();
    const firstDayInMonth = month.startOf('month').format('ddd');
    const daysToAddBefore = weekdaysShort.indexOf(firstDayInMonth);

    const gridSize =
      daysInMonth > 30
        ? daysToAddBefore >= 5
          ? CALENDAR_GRID_MAX_SIZE
          : CALENDAR_GRID_MIN_SIZE
        : daysInMonth < 30
        ? CALENDAR_GRID_MIN_SIZE
        : daysToAddBefore < 5
        ? CALENDAR_GRID_MIN_SIZE
        : CALENDAR_GRID_MAX_SIZE;

    const daysToAddAfter = gridSize - daysInMonth - daysToAddBefore;

    const result = [];

    if (daysToAddBefore > 0) {
      for (let i = daysInPrevMonth - daysToAddBefore + 1; i <= daysInPrevMonth; i++) {
        result.push(month.subtract(1, 'month').set('date', i));
      }
    }

    for (let i = 1; i <= daysInMonth; i++) {
      result.push(month.set('date', i));
    }

    if (daysToAddAfter > 0) {
      for (let i = 1; i <= daysToAddAfter; i++) {
        result.push(month.add(1, 'month').set('date', i));
      }
    }

    return result;
  }, [month]);

  const onSetDate = useCallback(
    (newDate) => () => {
      setDate(newDate);
    },
    [setDate],
  );

  useEffect(() => {
    setMonth(date);
  }, [date]);

  const renderData = makeRenderData();

  const hasEmptyLine = renderData.length === 35;

  const weekDays = useMemo(
    () =>
      weekdaysShort.map((day) => (
        <Text key={`calendar-week-day-${day}`} style={styles.weekDay} numberOfLines={1}>
          {day}
        </Text>
      )),
    [styles.weekDay],
  );

  return (
    <View style={styles.container} {...rest}>
      <View style={styles.monthContainer}>
        <DateSlider
          format={'MMMM YYYY'}
          date={month}
          setDate={setMonth}
          type={'month'}
          // eslint-disable-next-line react-native/no-inline-styles
          textStyle={{ color: '#ffffff' }}
          iconProps={{ color: '#ffffff' }}
        />
      </View>
      <View style={styles.weekDaysContainer}>{weekDays}</View>
      <View style={styles.daysContainer}>
        {renderData.map((day) => {
          const notCurrentMonth =
            day.isBefore(dayjs(month).startOf('month')) || day.isAfter(dayjs(month).endOf('month'));
          const isToday = dayjs(day).isToday();
          const isSelected = day.format() === date.format();

          return (
            <TouchableOpacity
              key={`calendar-day-${day.format()}`}
              onPress={onSetDate(day)}
              style={isSelected ? styles.selectedDayWrapper : styles.dayWrapper}>
              <View style={isSelected ? styles.selectedDayContainer : styles.dayContainer}>
                <Text
                  style={
                    isToday
                      ? styles.todayText
                      : isSelected
                      ? styles.selectedDayText
                      : notCurrentMonth
                      ? styles.notCurrentMonthDayText
                      : styles.currentMonthDayText
                  }>
                  {day.format('D')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
        {hasEmptyLine && <View style={styles.emptyLine} />}
      </View>
    </View>
  );
};

export default Calendar;
