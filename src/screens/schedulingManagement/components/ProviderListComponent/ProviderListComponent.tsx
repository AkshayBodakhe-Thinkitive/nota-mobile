import React from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import { MaterialIcons } from '../../../../components/Icons/MaterialIcons';
// import {FontType} from '../../../../constants/FontType';
import { fontType } from '../../../../assets/fontType';
// import {colors} from '../../../../constants/Colors';
import { colors } from '../../../../assets/colors';
import TextButton from '../../../../components/TextButton/TextButton';

const ProviderListComponent = ({title, providerData}: any) => {
  return (
    <View style={styles.scrollViewContent}>
      <View style={styles.provConsTxtRow}>
        <Text style={styles.provConsTxt}>{title}</Text>
        <TextButton text="View All" />
      </View>
      <FlatList
        data={providerData}
        scrollEnabled={false}
        numColumns={2}
        renderItem={({item}) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image source={item.imageName} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
            {item?.count &&  <View style={styles.countContainer}>
              <MaterialIcons
                name="person-outline"
                size={responsiveFontSize(2)}
                color="#808080"
              />
            <Text style={styles.count}>{item?.count} Provider Available</Text>
            </View>}
          </View>
        )}
        // keyExtractor={item => item.id.tost()}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
    marginHorizontal: '3%',
  },
  provConsTxtRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  provConsTxt: {
    fontFamily: fontType.Roboto_Medium,
    fontSize: responsiveFontSize(2.3),
    color: colors.black,
  },
  itemContainer: {
    height: 200,
    width: '50%',
    // backgroundColor: 'blue'
  },
  specilistView: {
    height: 200,
    width: '50%',
  },
  image: {
    width: '100%',
    height: responsiveHeight(21),
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: colors.black,
    fontFamily: fontType.Roboto_Medium,
    marginVertical: 6,
    marginLeft: responsiveWidth(3),
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: responsiveWidth(3),
    marginBottom: 8,
  },
  count: {
    fontFamily: fontType.Roboto_Regular,
    fontSize: 14,
    color: '#808080',
  },
  flatListContent: {
    justifyContent: 'space-between',
    height: '100%',
  },
  
});

export default ProviderListComponent;
