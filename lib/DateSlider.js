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
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var dayjs_1 = __importDefault(require("dayjs"));
var svg_1 = require("./assets/svg");
var DateSlider = function (_a) {
    var _b = _a.date, date = _b === void 0 ? dayjs_1.default() : _b, setDate = _a.setDate, type = _a.type, iconProps = _a.iconProps, textStyle = _a.textStyle, format = _a.format, style = _a.style, rest = __rest(_a, ["date", "setDate", "type", "iconProps", "textStyle", "format", "style"]);
    var styles = react_1.useMemo(function () {
        return react_native_1.StyleSheet.create({
            container: __assign({ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, style),
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
            text: __assign({ flex: 1, textAlign: 'center', fontWeight: '400', fontSize: 14, lineHeight: 22 }, textStyle),
        });
    }, []);
    var onPrev = react_1.useCallback(function () {
        setDate(date.subtract(1, type));
    }, [date, setDate, type]);
    var onNext = react_1.useCallback(function () {
        setDate(date.add(1, type));
    }, [date, setDate, type]);
    return (react_1.default.createElement(react_native_1.View, __assign({ style: styles.container }, rest),
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onPrev, style: styles.iconContainer },
            react_1.default.createElement(svg_1.ArrowLeft2Icon, __assign({}, styles.iconProps, iconProps))),
        react_1.default.createElement(react_native_1.Text, { numberOfLines: 1, style: styles.text }, date.format(format)),
        react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onNext, style: styles.iconContainer },
            react_1.default.createElement(svg_1.ArrowRight2Icon, __assign({}, styles.iconProps, iconProps)))));
};
exports.default = react_1.memo(DateSlider);
//# sourceMappingURL=DateSlider.js.map