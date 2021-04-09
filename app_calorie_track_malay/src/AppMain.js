import React, { useEffect, useState } from 'react';
import { View, Text, StatusBar} from 'react-native';
import { ModalPortal } from 'react-native-modals';
import { connect } from 'react-redux'
import Spinner from 'react-native-loading-spinner-overlay';
import Toast, {BaseToast} from 'react-native-toast-message';
import MemberRoute from './routes/Member';
import GuestRoute from './routes/Guest';
import { showToast, showLoading, } from './redux/actions/global'
import { loadUserInfo } from './redux/actions/user'
import { common, constant } from './utils'

// const toastConfig = {
//   success: ({ text1, props, ...rest }) => (
//     <View style={{ height: 60, width: '100%', backgroundColor: 'pink' }}>
//       <Text>{text1}</Text>
//       <Text>{props.guid}</Text>
//     </View>
//   ),
//   error: () => { },
//   info: () => { },
//   any_custom_type: () => { }
// };


const toastConfig = {
  success: ({ text1, ...rest }) => (
      <BaseToast
          {...rest}
          style={{
              borderLeftColor: constant.C_BLACK_0, borderLeftWidth: 0, borderTopLeftRadius: 8, borderTopRightRadius: 8,
              justifyContent: 'center', alignItems: 'center', width: '100%', height: 54, padding: 0
          }}
          contentContainerStyle={{
              width: '100%',
              paddingHorizontal: 0, height: 54, backgroundColor: constant.C_RED_50, borderTopLeftRadius: 8, borderTopRightRadius: 8,
              justifyContent: 'center', alignItems: 'center'
          }}
          text1Style={{
              fontSize: 18,
              color: constant.C_BLACK_0,
              fontWeight: '700',
              textAlign: 'center',
              width: '100%',
          }}
          text1={text1}
          text2={null}
          leadingIcon={null}
          trailingIcon={null}
      />
  )
};

const AppMain = (props) => {
  const Tag = 'AppMain'
  const [isInitialized, SetIsInit] = useState(false)

  useEffect(() => {
    common.printLog(Tag, "user effect called")
    if (isInitialized == false) {
      props.loadUserInfo()
      common.printLog(Tag, " props.loadUserInfo() called")
    }
    else {
      SetIsInit(true)
      common.printLog(Tag, "SetIsInit called")
    }

    if (common.isNullorEmpty(props.toast.msg) == false) {
      common.printLog(Tag + "Toast.show called")
      Toast.show({
        type: props.toast.type, //'success | error | info',
        position: 'bottom',
        text1: props.toast.msg,
        text2: null,
        visibilityTime: 3000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
        onShow: () => { },
        onHide: () => {
          common.printLog(Tag, "onHide called")
          props.showToast() // hide with null params
        },
        onPress: () => {
          common.printLog(Tag, "onPress called")
          props.showToast()
        }
      });
    }
    else {
      common.printLog(Tag, "Toast.hide called")
      Toast.hide()
    }
  }, [props.toast.msg])

  return (
    <React.Fragment>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {
        common.isNullorEmpty(props.user.uid) ? <GuestRoute /> : <MemberRoute />
      }
      <ModalPortal />
      <Spinner visible={props.loading.show} textContent={props.loading.msg} 
          textStyle={{fontSize: 16, fontWeight: '700', color: constant.C_BLACK_0}}
        />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </React.Fragment>
  );
}

const mapStatetoProps = (state) => {
  return {
    loading: state.global.loading,
    toast: state.global.toast,
    user: state.user.user
  }
}
const mapDispatchToProps = {
  showLoading, showToast, loadUserInfo
}
export default connect(mapStatetoProps, mapDispatchToProps)(AppMain);
