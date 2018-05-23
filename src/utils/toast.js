
import RootToast from 'react-native-root-toast';

const Toast = {
  toast: null,
  show: msg => {
    if (this.toast !== null) {
      RootToast.hide(this.toast)
    }
    this.toast = RootToast.show(msg, {
      position: 0,
      duration: 1500
    })
  }
}
export default Toast