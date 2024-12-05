import { responsiveFontSize } from "react-native-responsive-dimensions";
import { colors } from "../../../../assets/colors";
import { EntypoIcons } from "../../../../components/Icons/EntypoIcons";
import Row from "../../../../components/Row/Row";
import CustomText from "../../../../components/Text/CustomText";

export const BulletedText = ({children}: any) => {
    return (
      <Row>
        <EntypoIcons
          name="dot-single"
          color="#FF7600"
          size={responsiveFontSize(4)}
        />
        <CustomText
          style={{color: colors.navala_grey}}
          fontSize={responsiveFontSize(1.8)}>
          {children}
        </CustomText>
      </Row>
    );
  };
  