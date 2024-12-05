import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Card} from 'react-native-paper';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {colors} from '../../assets/colors';
import DatePickerInput from '../../components/DatePicker/DatePickerInput';
import HeaderBg from '../../components/HeaderBg/HeaderBg';
import {FeatherIcon} from '../../components/Icons/FeatherIcon';
import Loader from '../../components/Loader/Loader';
import ModalPopup from '../../components/ModalPopup/ModalPopup';
import Row from '../../components/Row/Row';
import Toast from '../../components/Toast/Toast';
import {useAppSelector, useAppDispatch} from '../../redux/store/hooks';
import {RootState} from '../../redux/store/storeConfig';
import {
  captureAndUploadPhotoMultipart,
  pickAndUploadDocument,
  pickAndUploadDocumentMultipart,
} from '../../utils/documentPicker';
import {
  fetchDocumentTypes,
  uploadDocument,
  getDocuments,
  createDocumentType,
} from './documentUploadService';
import TopNavigationView from '../../common/topNavigationView';
import {ImagePath1} from '../../Constants1/ImagePathConstant1';
import DropdownComponent from '../../components/Dropdown/DropDown';
import TextInput from '../../components/TextInput/TextInput';
import {fontType} from '../../assets/fontType';
import Button from '../../components/ButtonComponent/ButtonComponent';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import ImagePickerModal from './DocumentPickerModal';

type FinishProps = {
  fileAttachId: string;
  fileName: string;
  error: string;
};

const DocumentUploadScreen = () => {
  const [date, setDate] = useState(new Date());
  const [fileName, setFileName] = useState<any>(null);
  const [documentName, setDocumentName] = useState(null);
  const [documentDetails, setDocumentDetails] = useState<any>(null);
  const [documentTypes, setDocumentTypes] = useState([]);

  const [isPickerModalVisible, setPickerModalVisible] = useState(false);

  const [selectedDocumentTypeId, setSelectedDocumentTypeId] = useState();
  const [loading, setLoading] = useState(false);

  const [showAddModal, setShowAddModal] = useState(false);

  const [docTypeToCreate, setDocTypeToCreate] = useState('');

  const patientId = useAppSelector(
    (state: RootState) => state.profile.profileData?.data?.uuid,
  );

  const uuidForMedicalRecords = useAppSelector(
    (state: RootState) => state.medicalrecord.uuidForMedicalRecords,
  );

  const navigation = useNavigation<any>();

  const dispatch = useAppDispatch();

  const getDocumentTypes = async () => {
    setLoading(true);
    try {
      const types = await fetchDocumentTypes();
      const formattedTypes = types?.data?.content?.map((type: any) => ({
        label: type.type,
        value: type.uuid,
      }));
      setDocumentTypes(formattedTypes);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDocumentTypes();
  }, []);

  const handleFileSelect = (file: any) => {
    setDocumentDetails(file);
    setFileName(file.fileName);
  };

  console.log('documentDetails==>', documentDetails);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const route = useRoute<any>()

  const handleUpload = async () => {
    if (!documentDetails) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('patientId', uuidForMedicalRecords ? uuidForMedicalRecords : patientId);
    formData.append('documentTypes', selectedDocumentTypeId);
    formData.append('documentType', documentDetails?.formattedFileType);
    formData.append('recordedDate', new Date().toISOString().split('T')[0]);
    formData.append('documentName', documentName);

    formData.append('file', {
      uri: documentDetails?.fileUri,
      type: documentDetails?.fileType,
      name: documentDetails?.fileName,
    });

    // console.log('formData ==>', JSON.stringify(formData));



    const {editing} = route?.params || {}

    try {
      const res = await uploadDocument(formData);
      await getDocuments(uuidForMedicalRecords ? uuidForMedicalRecords : patientId);
      setLoading(false);
      setToastMessage('Document uploaded successfully!');
      setToastVisible(true);
      editing(true)
      navigation.goBack();
    } catch (error) {
      setLoading(false);
      setToastVisible(true);
      setToastMessage('Document could not be uploaded!');
      navigation.goBack();
    }
  };

  const handleDocumentCreate = async () => {
    try {
      if (docTypeToCreate !== '') {
        setLoading(true);
        setShowAddModal(false);
        await createDocumentType(docTypeToCreate);
        getDocumentTypes();
        setLoading(false);
      }
    } catch (error) {
      setShowAddModal(false);
      setLoading(false);
    }
  };

  const isButtonDisabled = !selectedDocumentTypeId || !documentName || !date;

  const goToNotification = () => navigation.navigate('NotificationSc');

  const goBack = () => {
    navigation.pop();
  };

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
      <View style={styles.pageContainer}>
        <DropdownComponent
          label="Document Type"
          data={documentTypes}
          dropDownStyles={{height: responsiveHeight(5.5)}}
          placeholder="Select Document Type"
          onValueChange={(value: any) => setSelectedDocumentTypeId(value)}
          style={{marginBottom: '5%'}}
        />
        <TextInput
          label="Document Name"
          placeholder="Enter document name"
          onChangeText={(text: any) => setDocumentName(text)}
        />
        <DatePickerInput
          date={date}
          label="Date"
          setDate={(date: any) => {
            setDate(date);
          }}
        />
        <TouchableOpacity onPress={()=>setPickerModalVisible(true)}>
          <Card style={styles.uploadDocCard}>
            <FeatherIcon
              name="upload"
              size={responsiveFontSize(4)}
              style={{alignSelf: 'center', marginBottom: 5,color:colors.grey90}}
            />
            <Text
              style={{
                fontSize: responsiveFontSize(1.8),
                color: colors.black,
                fontFamily: fontType.Roboto_Medium,
              }}>
              {fileName || 'Upload file'}
            </Text>
          </Card>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: responsiveFontSize(1.8),
            color: colors.black,
            fontFamily: fontType.Roboto_Medium,
          }}>
          Supported formats: JPEG, PNG, PDF
        </Text>
        <Row style={styles.buttonsContainer}>
          <Button
            outlined
            title="+ Manage Document Types"
            buttonStyle={{width: '48%'}}
            onPress={() => setShowAddModal(true)}
            textStyle={{fontSize: responsiveFontSize(1.3)}}
          />
          <Button
            disabled={isButtonDisabled}
            title="Save"
            buttonStyle={{width: '48%'}}
            onPress={handleUpload}
          />
        </Row>

        <ImagePickerModal
          visible={isPickerModalVisible}
          onClose={() => setPickerModalVisible(false)}
          onFileSelect={handleFileSelect}
        />

        <ModalPopup show={showAddModal} setShow={setShowAddModal}>
          <TextInput
            label="Type Name"
            placeholder="Enter Document Type"
            onChangeText={text => setDocTypeToCreate(text)}
          />
          <Row style={{justifyContent: 'space-between', width: '100%'}}>
            <Button
              outlined
              title="Cancel"
              onPress={() => setShowAddModal(false)}
              buttonStyle={{width: '45%', alignSelf: 'flex-end'}}
            />
            <Button
              title="Save"
              onPress={handleDocumentCreate}
              buttonStyle={{width: '45%', alignSelf: 'flex-end'}}
            />
          </Row>
        </ModalPopup>
      </View>
      {loading && <Loader />}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        onHide={() => {
          setToastVisible(false);
          navigation.goBack();
        }}
      />
    </View>
  );
};

export default DocumentUploadScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  pageContainer: {
    flex: 1,
    padding: '3%',
  },
  uploadDocCard: {
    marginVertical: '5%',
    width: null,
    backgroundColor: '#0097F01A',
    shadowColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.primary,
    paddingVertical: 10,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: '3%',
    marginHorizontal: '3%',
    justifyContent: 'space-between',
    width: '100%',
  },
});
