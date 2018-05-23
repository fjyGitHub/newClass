import {
    PixelRatio,
    Dimensions,
    Platform,
    AsyncStorage
} from 'react-native';

export let screenW = Dimensions.get('window').width;
export let screenH = Dimensions.get('window').height;
const fontScale = PixelRatio.getFontScale();

export let pixelRatio = PixelRatio.get();
export let pixel =  1 / pixelRatio
//像素密度
const DEFAULT_DENSITY = 2;
//px转换成dp
//以iphone6为基准,如果以其他尺寸为基准的话,请修改下面的750和1334为对应尺寸即可.
const w2 = 375 / DEFAULT_DENSITY;
//px转换成dp
const h2 = 667 / DEFAULT_DENSITY;

// iPhoneX
const X_WIDTH = 375;
const X_HEIGHT = 812;

/**
 * 设置字体的size（单位px）
 * @param size 传入设计稿上的px
 * @returns {Number} 返回实际sp
 */
export function setSpText(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale));
    return size / DEFAULT_DENSITY;
}

/**
 * 屏幕适配,缩放size
 * @param size
 * @returns {Number}
 */
export function scaleSize(size: Number) {
    let scaleWidth = screenW / w2;
    let scaleHeight = screenH / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale));
    return size / DEFAULT_DENSITY;
}


//  日期格式化
export function dateParse(dt, fmt) {
  if (typeof dt === 'string' || 'number') {
    dt = new Date(dt)
  }
  var o = {
    'y+': dt.getFullYear(),
    'M+': dt.getMonth() + 1,                 // 月份
    'd+': dt.getDate(),                    // 日
    'h+': dt.getHours(),                   // 小时
    'm+': dt.getMinutes(),                 // 分
    's+': dt.getSeconds(),                 // 秒
    'q+': Math.floor((dt.getMonth() + 3) / 3), // 季度
    'S+': dt.getMilliseconds()             // 毫秒
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      if (k === 'y+') {
        fmt = fmt.replace(RegExp.$1, ('' + o[k]).substr(4 - RegExp.$1.length))
      } else if (k === 'S+') {
        var lens = RegExp.$1.length
        lens = lens === 1 ? 3 : lens
        fmt = fmt.replace(RegExp.$1, ('00' + o[k]).substr(('' + o[k]).length - 1, lens))
      } else {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
  }
  return fmt
}


//转换成日期
export function toDate(timestamp: Number, format1 = 'yyyy-MM-dd hh:mm:ss') {
    try {
        if (timestamp > 10000) {
            let date = new Date();
            date.setTime(timestamp);
            return date.format(format1);//2014-07-10 10:21:12
        } else {
            return '';
        }
    } catch (erro) {
        return '';
    }
    return '';
}

//转换成时间搓
export function toTimestamp(date: String) {
    let timestamp = Date.parse(date);
    return timestamp / 1000;  // 1497233827569/1000
}


/**
 * 判断是否为iphoneX
 * @returns {boolean}
 */
export function isIphoneX() {
    return (
        Platform.OS === 'ios' &&
        ((screenH === X_HEIGHT && screenW === X_WIDTH) || (screenH === X_WIDTH && screenW === X_HEIGHT))
    )
}

/**
 * 根据是否是iPhoneX返回不同的样式
 * @param iphoneXStyle
 * @param iosStyle
 * @param androidStyle
 * @returns {*}
 */
export function ifIphoneX(iphoneXStyle, iosStyle = {}, androidStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    } else if (Platform.OS === 'ios') {
        return iosStyle
    } else {
        if (androidStyle) return androidStyle;
        return iosStyle
    }
}

/**
 * 判断字符串是否为空
 * @param str
 * @returns {boolean}
 */
export function isEmpty(str) {
    if (str !== null || str !== undefined || str !== '') {
        return true;
    } else {
        return false
    }
}
