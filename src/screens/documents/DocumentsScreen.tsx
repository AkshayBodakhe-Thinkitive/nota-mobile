import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {downloadFile} from 'react-native-fs';
import {Card} from 'react-native-paper';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {AppNavConstants} from '../../Constants1/NavConstants';
import {colors} from '../../assets/colors';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import ListEmptyComponent from '../../components/ListEmptyComponent/ListEmptyComponent';
import Loader from '../../components/Loader/Loader';
import Row from '../../components/Row/Row';
import SmallButton from '../../components/SmallButton/SmallButton';
import TextButton from '../../components/TextButton/TextButton';
import {useAppDispatch, useAppSelector} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import {formatDate} from '../../utils/DateUtils';
import {requestPermissionsFile} from '../../utils/androidPermissions';
import Button from '../../components/ButtonComponent/ButtonComponent';
import Toast from '../../components/Toast/Toast';
import {fontType} from '../../assets/fontType';
import {getDocuments} from './documentUploadService';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import DocumentViewerModal from './DocumentViewerModal';
import RNFS from 'react-native-fs';

const DocumentsScreen = () => {
  const dispatch = useAppDispatch();

  const [ducumentsList, setDocumentsList] = useState();

  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );

  const profileData = useAppSelector(
    (state: RootState) => state.profile.profileData,
  );

  const [isediting,setisediting] = useState(false)


  const getdoc = async () => {
    let UUID = profileData?.data?.uuid;
    if (uuidForMedicalRecords != null && uuidForMedicalRecords != undefined) {
      UUID = uuidForMedicalRecords;
    }
    if (UUID) {
      const res = await getDocuments(UUID);
      const docsData = res?.data?.content;
      setDocumentsList(docsData);
      setisediting(false)
    }
  };

  useEffect(() => {
    Platform.OS === 'android' && requestPermissionsFile();
    getdoc();
  }, [isediting]);

  // console.log('ducumentsList ==>', JSON.stringify(ducumentsList));

  const Loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );

  const HomeLoading = useAppSelector((state: RootState) => state.home.loading);

  const Documents = useAppSelector(
    (state: RootState) => state.medicalrecord.documentsData,
  );

  const loading = useAppSelector(
    (state: RootState) => state.medicalrecord.loading,
  );

  const [imageModalVisible, setImageModalVisible] = useState(false);

  const [selectedImage, setSelectedImage] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const navigation = useNavigation<any>();

  const handleDocumentUpload = () => {
    navigation.navigate('DocumentUploadScreen',{editing:setisediting});
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getdoc();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const goBack = () => {
    navigation.pop();
  };

  const goToNotification = () => navigation.navigate('NotificationSc');

  return (
    <View style={styles.container}>
      <HeaderBg height={'16%'}>
        <TopNavigationView
          title="Documents"
          onTap={goBack}
          onTapNotification={goToNotification}
          source1={ImagePath1.backImage}
          isbuttonshow={true}
        />
      </HeaderBg>
      <View style={{flex: 1, top: '-3%'}}>
        <FlatList
          data={ducumentsList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.primary]}
            />
          }
          ListEmptyComponent={
            <View style={{marginTop: '40%'}}>
              {!loading && <ListEmptyComponent message="No documents found!" />}
            </View>
          }
          renderItem={({item, index}) => {
            return (
              <View style={{paddingHorizontal: '2%', marginVertical: '2%'}}>
                <Card
                  style={{
                    borderWidth: 0,
                    width: '100%',
                    padding: '0%',
                    height: null,
                    backgroundColor: 'white',
                  }}>
                  <Row
                    style={{
                      borderBottomWidth: 1,
                      padding: '2%',
                      paddingLeft: '3%',
                      borderColor: 'lightgrey',
                    }}>
                    <Text style={[styles.keyStyle, {color: colors.black}]}>
                      Document {index + 1}
                    </Text>
                  </Row>
                  <Row style={styles.row1}>
                    <Text style={styles.keyStyle}>Document Name : </Text>
                    <Text style={styles.valueStyle}>{item?.documentName}</Text>
                  </Row>
                  <Row style={styles.row1}>
                    <Text style={styles.keyStyle}>Document Type : </Text>
                    <Text style={styles.valueStyle}>
                      {item?.documentType?.type}
                    </Text>
                  </Row>
                  <Row style={styles.row1}>
                    <Text style={styles.keyStyle}>Document Date : </Text>
                    <Text style={styles.valueStyle}>{item?.recordedDate}</Text>
                  </Row>
                  <Row style={styles.row}>
                    <TextButton
                      text="View Report"
                      textStyle={{fontSize: responsiveFontSize(1.8)}}
                      onPress={() => {
                        setSelectedImage(item?.url);
                        setImageModalVisible(true)
                      }}
                    />
                  </Row>
                </Card>
              </View>
            );
          }}
        />

        <Button
          title="Upload Document"
          buttonStyle={{marginHorizontal: '2%'}}
          onPress={handleDocumentUpload}
        />

        <DocumentViewerModal
          selectedImage={selectedImage}
          visible={imageModalVisible}
          onClose={() => setImageModalVisible(false)}
        />
      </View>
      {Loading && <Loader />}
      {HomeLoading && <Loader />}
      {isLoading && <Loader />}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onHide={() => setToastVisible(false)}
      />
    </View>
  );
};

export default DocumentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  row: {
    justifyContent: 'space-between',
    width: '30%',
    alignSelf: 'flex-end',
    marginTop: 0,
    margin: '2%',
  },
  row1: {
    marginVertical: '1.5%',
    paddingHorizontal: '3%',
  },
  keyStyle: {
    fontFamily: fontType.Roboto_Regular,
    fontSize: responsiveFontSize(2),
    color: '#1A1A1A80',
    width: '40%',
  },
  valueStyle: {
    fontFamily: fontType.Roboto_Regular,
    fontSize: responsiveFontSize(2),
    color: '#1A1A1A',
  },
});
