import React, { useCallback, useMemo, memo } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ViewStyle,
  TextStyle,
  ViewProps,
} from 'react-native';
import dayjs, { Dayjs } from 'dayjs';
import { SvgProps } from 'react-native-svg';
import ArrowLeft2Icon from './assets/arrowLeft.svg';
import ArrowRight2Icon from './assets/arrowRight.svg';

interface DateSliderProps extends ViewProps {
  date?: Dayjs;
  setDate: (date: Dayjs) => void;
  type: 'day' | 'month' | 'year';
  format: string;
  iconProps?: SvgProps;
  textStyle?: TextStyle;
  style?: ViewStyle;
}

const DateSlider = ({
  date = dayjs(),
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

  return (
    <View style={styles.container} {...rest}>
      <TouchableOpacity onPress={onPrev} style={styles.iconContainer}>
        <ArrowLeft2Icon {...styles.iconProps} {...iconProps} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.text}>
        {date.format(format)}
      </Text>
      <TouchableOpacity onPress={onNext} style={styles.iconContainer}>
        <ArrowRight2Icon {...styles.iconProps} {...iconProps} />
      </TouchableOpacity>
    </View>
  );
};

export default memo(DateSlider);
