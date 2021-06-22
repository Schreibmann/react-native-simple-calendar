"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateSlider = void 0;
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var dayjs_1 = __importDefault(require("dayjs"));
var localeData_1 = __importDefault(require("dayjs/plugin/localeData"));
var isToday_1 = __importDefault(require("dayjs/plugin/isToday"));
var DateSlider_1 = __importDefault(require("./DateSlider"));
exports.DateSlider = DateSlider_1.default;
var CALENDAR_GRID_MIN_SIZE = 35;
var CALENDAR_GRID_MAX_SIZE = 42;
dayjs_1.default.extend(localeData_1.default);
dayjs_1.default.extend(isToday_1.default);
var globalLocaleData = dayjs_1.default.localeData();
var weekdaysShort = globalLocaleData.weekdaysShort();
var Calendar = function (_a) {
    var containerStyle = _a.containerStyle, backgroundColor = _a.backgroundColor, selectedDayColor = _a.selectedDayColor, todayColor = _a.todayColor, weekdayColor = _a.weekdayColor, selectedMonthColor = _a.selectedMonthColor, notSelectedMonthColor = _a.notSelectedMonthColor, _b = _a.date, date = _b === void 0 ? dayjs_1.default() : _b, setDate = _a.setDate, rest = __rest(_a, ["containerStyle", "backgroundColor", "selectedDayColor", "todayColor", "weekdayColor", "selectedMonthColor", "notSelectedMonthColor", "date", "setDate"]);
    var isWeb = react_native_1.Platform.OS === 'web';
    var styles = react_1.useMemo(function () {
        return react_native_1.StyleSheet.create({
            container: __assign({ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: backgroundColor || '#5cb2e4', paddingVertical: 16, borderRadius: 16, width: '100%' }, containerStyle),
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
        });
    }, []);
    var _c = react_1.useState(date), month = _c[0], setMonth = _c[1];
    var makeRenderData = react_1.useCallback(function () {
        var daysInMonth = month.daysInMonth();
        var daysInPrevMonth = month.subtract(1, 'month').daysInMonth();
        var firstDayInMonth = month.startOf('month').format('ddd');
        var daysToAddBefore = weekdaysShort.indexOf(firstDayInMonth);
        var gridSize = daysInMonth > 30
            ? daysToAddBefore >= 5
                ? CALENDAR_GRID_MAX_SIZE
                : CALENDAR_GRID_MIN_SIZE
            : daysInMonth < 30
                ? CALENDAR_GRID_MIN_SIZE
                : daysToAddBefore < 5
                    ? CALENDAR_GRID_MIN_SIZE
                    : CALENDAR_GRID_MAX_SIZE;
        var daysToAddAfter = gridSize - daysInMonth - daysToAddBefore;
        var result = [];
        if (daysToAddBefore > 0) {
            for (var i = daysInPrevMonth - daysToAddBefore + 1; i <= daysInPrevMonth; i++) {
                result.push(month.subtract(1, 'month').set('date', i));
            }
        }
        for (var i = 1; i <= daysInMonth; i++) {
            result.push(month.set('date', i));
        }
        if (daysToAddAfter > 0) {
            for (var i = 1; i <= daysToAddAfter; i++) {
                result.push(month.add(1, 'month').set('date', i));
            }
        }
        return result;
    }, [month]);
    var onSetDate = react_1.useCallback(function (newDate) { return function () {
        setDate(newDate);
    }; }, [setDate]);
    react_1.useEffect(function () {
        setMonth(date);
    }, [date]);
    var renderData = makeRenderData();
    var hasEmptyLine = renderData.length === 35;
    var weekDays = react_1.useMemo(function () {
        return weekdaysShort.map(function (day) { return (react_1.default.createElement(react_native_1.Text, { key: "calendar-week-day-" + day, style: styles.weekDay, numberOfLines: 1 }, day)); });
    }, [styles.weekDay]);
    return (react_1.default.createElement(react_native_1.View, __assign({ style: styles.container }, rest),
        react_1.default.createElement(react_native_1.View, { style: styles.monthContainer },
            react_1.default.createElement(DateSlider_1.default, { format: 'MMMM YYYY', date: month, setDate: setMonth, type: 'month', textStyle: { color: '#ffffff' }, iconProps: { color: '#ffffff' } })),
        react_1.default.createElement(react_native_1.View, { style: styles.weekDaysContainer }, weekDays),
        react_1.default.createElement(react_native_1.View, { style: styles.daysContainer },
            renderData.map(function (day) {
                var notCurrentMonth = day.isBefore(dayjs_1.default(month).startOf('month')) || day.isAfter(dayjs_1.default(month).endOf('month'));
                var isToday = dayjs_1.default(day).isToday();
                var isSelected = day.format() === date.format();
                return (react_1.default.createElement(react_native_1.TouchableOpacity, { key: "calendar-day-" + day.format(), onPress: onSetDate(day), style: isSelected ? styles.selectedDayWrapper : styles.dayWrapper },
                    react_1.default.createElement(react_native_1.View, { style: isSelected ? styles.selectedDayContainer : styles.dayContainer },
                        react_1.default.createElement(react_native_1.Text, { style: isToday
                                ? styles.todayText
                                : isSelected
                                    ? styles.selectedDayText
                                    : notCurrentMonth
                                        ? styles.notCurrentMonthDayText
                                        : styles.currentMonthDayText }, day.format('D')))));
            }),
            hasEmptyLine && react_1.default.createElement(react_native_1.View, { style: styles.emptyLine }))));
};
exports.default = Calendar;
//# sourceMappingURL=index.js.map