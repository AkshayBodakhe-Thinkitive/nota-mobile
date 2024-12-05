import React from 'react';
import { Image, ImageStyle, StyleSheet, View } from 'react-native';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
// import CustomText from '../../../../components/Text/CustomText';
import { colors } from '../assets/colors';
import { fontType } from '../assets/fontType';
import CustomText from './Text/CustomText';
// import { colors } from '../../../../constants/Colors';
// import { FontType } from '../../../../constants/FontType';

const ProfilePictureComponent = ({
  imageContainerStyles,
  imageStyles,
  imageUrl,
  firstName,
  lastName,
  textStyle
}: ProfilePictureProps) => {
  function getInitials(name:any) {
    return name
      .split(' ')
      .map((word:any) => word.charAt(0).toUpperCase())
      .join('');
  }
  
  return (
    <View style={[styles.imageContainer,imageContainerStyles]}>
      {imageUrl ? (
        <Image
          source={{uri: imageUrl}}
          style={[styles.imageContainer,imageStyles]}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.imageContainer,imageContainerStyles, {backgroundColor: 'lightgrey'}]}>
          <CustomText
            style={textStyle}
            fontFamily={fontType.Roboto_Medium}
            color={colors.black}
            fontSize={responsiveFontSize(2.5)}>
            {getInitials(firstName)}
          </CustomText>
        </View>
      )}
    </View>
  );
};

export default ProfilePictureComponent;

const borderRadiusPercentage = 50;
const componentWidth = responsiveHeight(5.5)
const borderRadiusPixel = (borderRadiusPercentage / 100) * componentWidth;

const styles = StyleSheet.create({
    imageContainer: {
        borderWidth: 1,
        borderColor: colors.primary,
        width: componentWidth,
        height: componentWidth,
        borderRadius: borderRadiusPixel,
        marginHorizontal: 10,
        backgroundColor :colors.white,
        alignItems :'center',
        justifyContent : 'center'
      },
})

interface ProfilePictureProps {
  imageContainerStyles?: any;
  imageStyles?: ImageStyle;
  imageUrl: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  textStyle?: any
}