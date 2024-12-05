import React from 'react';
import {Modal, View, StyleSheet, TouchableWithoutFeedback, StyleProp, ViewStyle} from 'react-native';

const ModalPopup: React.FC<ModalPopupProps> = ({
  children,
  show,
  setShow,
  style
}: any) => {
  const close = () => {
    if (setShow) {
      setShow(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={show}
      onRequestClose={close}>
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent,style]}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

interface ModalPopupProps {
  children: React.ReactNode;
  show?: boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  style?: StyleProp<ViewStyle>
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 10,
    width: '80%',
  },
});

export default ModalPopup;
