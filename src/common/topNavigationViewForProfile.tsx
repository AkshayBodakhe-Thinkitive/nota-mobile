import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { colors } from '../assets/colors';
import MaterialCommunityIcons from '../components/Icons/MaterialCommunityIcons';
// import MaterialCommunityIcons from '../../components/Icons/MaterialCommunityIcons';

const TopNavigationViewForProfile = ({title, onTap,onTapNotification, source1, source2,isbuttonshow}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
      }}>
      {isbuttonshow ? (
        <TouchableOpacity onPress={onTap} style={{ top: 20 }}>
          <Image style={{ width: 28, height: 25 }} source={source1} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 28, height: 25, top: 20 }} />
      )}

      <Text style={{fontSize: 23, fontWeight: '500', color: 'black', top: 20}}>
        {title}
      </Text>

      <TouchableOpacity onPress={onTapNotification}>
                <MaterialCommunityIcons
                  name="pencil-outline"
                  color={colors.black}
                  size={responsiveFontSize(2.8)}
                />
            </TouchableOpacity>
    
    </View>
  );
};

export default TopNavigationViewForProfile;
