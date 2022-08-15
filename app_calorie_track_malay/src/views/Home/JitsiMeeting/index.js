import React, { useEffect, useState, useRef, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import JitsiMeet, { JitsiMeetView } from 'react-native-jitsi-meet';
import { MainButton, RoundIconBtn, CollapseBtn } from '../../../components/buttons';
import { Header  } from '../../../components/common';
import Theme from '../../../theme';
import BookingService from '../../../services/apiBooking';
import styles from './styles';

const JitsiMeeting = ({ navigation, route }) => {
  const user = route?.params?.user;
  const booking = route?.params?.booking;
  const meetingUrl = route?.params?.meetingUrl;
  const _isMounted = useRef(true);

  const onConferenceTerminated = (nativeEvent) => {
    console.log('Conference terminated  ');
    goBack();
  }

  const onConferenceJoined = (nativeEvent) => {
    console.log('Conference joined  ', nativeEvent);
    BookingService.sendNoti(booking?.id)
      .then(() => { })
      .catch((err) => { 
        console.log('sendNoti ', err);
      })
  }

  const onConferenceWillJoin = (nativeEvent) => {
    console.log('Conference will join ', nativeEvent);
  }

  useEffect(() => {
    setTimeout(() => {
      const userInfo = {
        displayName: `${user?.firstName} ${user?.lastName}`, email: `${user?.email}`, avatar: `${user?.imageUrl}`
      };
      const options = {
        audioMuted: false,
        audioOnly: false,
        videoMuted: false,
        subject: "your subject",
        token: "your token"
      }
      const meetFeatureFlags = {
        addPeopleEnabled: true,
        calendarEnabled: true,
        callIntegrationEnabled: false,
        chatEnabled: true,
        closeCaptionsEnabled: true,
        inviteEnabled: true,
        androidScreenSharingEnabled: true,
        liveStreamingEnabled: true,
        meetingNameEnabled: true,
        meetingPasswordEnabled: true,
        pipEnabled: true,
        kickOutEnabled: true,
        conferenceTimerEnabled: true,
        videoShareButtonEnabled: true,
        recordingEnabled: true,
        reactionsEnabled: true,
        raiseHandEnabled: true,
        tileViewEnabled: true,
        toolboxAlwaysVisible: false,
        toolboxEnabled: true,
        welcomePageEnabled: false,
      }

      try {
        JitsiMeet.call(meetingUrl, userInfo, options, meetFeatureFlags);
      } catch (error) {
        console.log('jitsi call call ', error);
      }
     
      /* You can also use JitsiMeet.audioCall(url) for audio only call */
    }, 600);

    return () => {
      _isMounted.current = false;
      JitsiMeet.endCall();
    };
  }, [])

  const goBack = () => {
    JitsiMeet.endCall();
    navigation.goBack();
  }

  return (
    <View style={[Theme.styles.container, styles.container]}>
      <JitsiMeetView
        onConferenceTerminated={onConferenceTerminated}
        onConferenceJoined={onConferenceJoined}
        onConferenceWillJoin={onConferenceWillJoin}
        style={{ flex: 1, height: '100%', width: '100%' }}
      />
      <Header
        left={
          <RoundIconBtn
            icon={
              <AntDesign
                name="arrowleft"
                color={Theme.colors.gray1}
                size={16}
              />
            }
            onPress={() => {
              goBack();
            }}
          />
        }
        style={styles.header}
      />
    </View>
  );
};


export default JitsiMeeting;
