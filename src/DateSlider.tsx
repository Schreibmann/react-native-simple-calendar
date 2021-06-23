import React, { useCallback, useMemo } from 'react';
import { StyleSheet, TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { SvgProps } from 'react-native-svg';
import ArrowLeft2Icon from './assets/arrowLeft.svg';
import ArrowRight2Icon from './assets/arrowRight.svg';
import GestureRecognizer, { GestureRecognizerProps } from 'react-native-swipe-gestures';

const config = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

interface DateSliderProps extends GestureRecognizerProps {
  setDate: (date: Dayjs) => void;
  date: Dayjs;
  type: 'day' | 'month' | 'year';
  format: string;
  //locale?: string;
  iconProps?: SvgProps;
  textStyle?: TextStyle;
  style?: ViewStyle;
}

const DateSlider: React.FC<DateSliderProps> = ({
  date = dayjs(),
  //locale = 'en',
  setDate,
  type = 'month',
  format = 'MMMM',
  iconProps,
  textStyle,
  style,
  ...rest
}: DateSliderProps) => {
  const styles = useMemo(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'transparent',
          ...style,
        },
        iconContainer: {
          width: 26,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
        },
        iconProps: {
          width: 20,
          height: 20,
        },
        text: {
          flex: 1,
          textAlign: 'center',
          fontWeight: '400',
          fontSize: 14,
          lineHeight: 22,
          ...textStyle,
        },
      }),
    [style, textStyle],
  );

  const onPrev = useCallback(() => {
    setDate(date.subtract(1, type));
  }, [date, setDate, type]);

  const onNext = useCallback(() => {
    setDate(date.add(1, type));
  }, [date, setDate, type]);

  /*useEffect(() => {
    if (locale) {
      try {
        const importLocale = () => import(`dayjs/locale/${locale}`);
        importLocale().then(() => dayjs.locale(locale));
      } catch (err) {
        console.log(err.message);
      }
    }
  }, [locale]);*/

  return (
    <GestureRecognizer
      style={styles.container}
      onSwipeLeft={onPrev}
      onSwipeRight={onNext}
      config={config}
      {...rest}>
      <TouchableOpacity onPress={onPrev} style={styles.iconContainer}>
        <ArrowLeft2Icon {...styles.iconProps} {...iconProps} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.text}>
        {date.format(format)}
      </Text>
      <TouchableOpacity onPress={onNext} style={styles.iconContainer}>
        <ArrowRight2Icon {...styles.iconProps} {...iconProps} />
      </TouchableOpacity>
    </GestureRecognizer>
  );
};

export default DateSlider;
