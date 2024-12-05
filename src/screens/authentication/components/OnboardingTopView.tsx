import React from "react";
import {
    Dimensions,
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View
} from "react-native";
import { ImagePath1 } from "../../../Constants1/ImagePathConstant1";


export function OnboardingTopView() {
    return(
        <View style={{height: Dimensions.get("window").height * 0.35}}>
                <ImageBackground
                    resizeMode = "stretch"
                    style={styles.topBGImage}
                    source={ImagePath1.backgroundLoginImage}
                >
                    <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                        <View style={{alignItems: "flex-start", justifyContent: "center", flex: 1}}>
                            <Text style={[styles.text, {fontWeight: 500}]}>
                                <Text style={{fontSize: 30}}>{"Welcome\n"}</Text>
                                to NAVALA
                            </Text>
                        </View>
                        <Image
                            resizeMode="stretch"
                            style={{
                                height: Dimensions.get("window").height * 0.32,
                                width: Dimensions.get("window").width * 0.55,
                                marginRight: -Dimensions.get("window").height * 0.015
                            }}
                            source={
                                ImagePath1.doctorImage
                            }
                        >

                        </Image>
                    </View>
                    
                </ImageBackground>
            </View>
    )
}

const styles = StyleSheet.create({
    topBGImage: {
        flex: 1,
        justifyContent: "flex-end"
    },
    text: {
        color: "white",
        textAlign: "center",
        alignSelf: "center",
        marginBottom: Dimensions.get("window").height * 0.1,
        fontSize: 20,
    }
});