import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Color, FontFamily, FontSize, Border } from "../assets/GlobalStyles";

const AddGroupScreen = () => {
  return (
    <LinearGradient
      style={styles.addGroupScreen}
      locations={[0.56, 1, 1]}
      colors={["#dcf2fc", "#cedaf9", "#dfeff8"]}
    >
      <View
        style={[styles.addGroupScreenChild, styles.iphone1313ChildPosition]}
      />
      <View
        style={[styles.addGroupScreenItem, styles.iphone1313ChildPosition]}
      />
      <Text style={styles.addAGroup}>Add a group</Text>
      <Image
        style={styles.vectorIcon}
        contentFit="cover"
        source={require("../assets/vector.png")}
      />
      <Text style={[styles.groupName, styles.groupTypo]}>Group name</Text>
      <Text style={[styles.typeOfExpenses, styles.groupTypo]}>
        Type of expenses
      </Text>
      <Text style={[styles.groupBudgetApprox, styles.groupTypo]}>
        Group budget (approx.)
      </Text>
      <Text style={[styles.descriptionOptional, styles.groupTypo]}>
        Description (Optional)
      </Text>
      <View style={[styles.rectangleParent, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupBorder]} />
        <Text style={[styles.enterAName, styles.enterTypo]}>Enter a name</Text>
      </View>
      <View style={[styles.rectangleGroup, styles.groupLayout]}>
        <View style={[styles.groupChild, styles.groupBorder]} />
        <Text style={[styles.enterAName, styles.enterTypo]}>
          Enter an amount
        </Text>
      </View>
      <View style={[styles.rectangleContainer, styles.groupInnerLayout]}>
        <View style={[styles.groupInner, styles.groupInnerLayout]} />
        <Text style={[styles.enterYourText, styles.enterTypo]}>
          Enter your text
        </Text>
      </View>
      <View style={styles.groupView}>
        <View style={[styles.rectangleView, styles.groupChild1Layout]} />
        <View style={[styles.groupChild1, styles.groupChild1Layout]} />
        <Text style={styles.oneTime}>One time</Text>
        <Text style={styles.recurring}>Recurring</Text>
      </View>
      <View
        style={[styles.addGroupScreenInner, styles.iphone1313ChildPosition]}
      />
      <Image
        style={[styles.ellipseIcon, styles.groupChild1Layout]}
        contentFit="cover"
        source={require("../assets/ellipse-623.png")}
      />
      <Image
        style={styles.addGroupScreenChild1}
        contentFit="cover"
        source={require("../assets/ellipse-624.png")}
      />
      <Image
        style={styles.icFluentEdit24Regular1Icon}
        contentFit="cover"
        source={require("../assets/ic-fluent-edit-24-regular-1.png")}
      />
      <View
        style={[styles.addGroupScreenChild2, styles.iphone1313ChildShadowBox]}
      />
      <View
        style={[styles.addGroupScreenChild3, styles.iphone1313ChildShadowBox]}
      />
      <Image
        style={[styles.icFluentShare24Regular1Icon, styles.fluentIconLayout]}
        contentFit="cover"
        source={require("../assets/ic-fluent-share-24-regular-1.png")}
      />
      <Text style={[styles.share, styles.shareTypo]}>Share</Text>
      <Text style={[styles.addParticipants, styles.shareTypo]}>
        Add participants
      </Text>
      <Image
        style={[styles.icFluentPeopleAdd24RegulaIcon, styles.fluentIconLayout]}
        contentFit="cover"
        source={require("../assets/ic-fluent-people-add-24-regular-1.png")}
      />
      <Image
        style={[styles.addGroupScreenChild4, styles.iphone1313ChildPosition]}
        contentFit="cover"
        source={require("../assets/vector-384.png")}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  iphone1313ChildPosition: {
    width: 390,
    left: 0,
    position: "absolute",
  },
  groupTypo: {
    color: Color.colorDarkslateblue_100,
    // fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    fontSize: FontSize.size_sm,
    left: 31,
    textAlign: "left",
    position: "absolute",
  },
  groupLayout: {
    width: 314,
    height: 32,
    position: "absolute",
  },
  groupBorder: {
    borderWidth: 1,
    borderRadius: Border.br_2xs,
    borderStyle: "solid",
    left: 0,
    top: 0,
  },
  enterTypo: {
    color: Color.colorLightslategray,
    left: 10,
    // fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xs,
    textAlign: "left",
    position: "absolute",
  },
  groupInnerLayout: {
    height: 104,
    width: 314,
    position: "absolute",
  },
  groupChild1Layout: {
    width: 90,
    position: "absolute",
  },
  iphone1313ChildShadowBox: {
    height: 59,
    shadowOpacity: 1,
    elevation: 51,
    shadowRadius: 51,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: "rgba(160, 160, 160, 0.2)",
    borderRadius: Border.br_3xs,
    top: 774,
    position: "absolute",
  },
  fluentIconLayout: {
    height: 24,
    width: 24,
    top: 792,
    position: "absolute",
    overflow: "hidden",
  },
  shareTypo: {
    fontSize: FontSize.size_base,
    // fontFamily: FontFamily.interMedium,
    fontWeight: "500",
    textAlign: "left",
    position: "absolute",
  },
  addGroupScreenChild: {
    height: 63,
    borderWidth: 2,
    borderColor: Color.colorGray,
    borderStyle: "solid",
    width: 390,
    left: 0,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: 14,
    top: 0,
  },
  addGroupScreenItem: {
    top: 77,
    height: 767,
    borderWidth: 2,
    borderColor: Color.colorGray,
    borderStyle: "solid",
    width: 390,
    left: 0,
    backgroundColor: Color.colorWhitesmoke_100,
    borderRadius: 14,
  },
  addAGroup: {
    marginLeft: -138,
    top: 19,
    fontSize: 18,
    color: "#131142",
    textAlign: "left",
    // fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    left: "50%",
    position: "absolute",
  },
  vectorIcon: {
    top: 24,
    left: 25,
    width: 7,
    height: 13,
    position: "absolute",
  },
  groupName: {
    top: 223,
  },
  typeOfExpenses: {
    top: 301,
  },
  groupBudgetApprox: {
    top: 379,
  },
  descriptionOptional: {
    top: 457,
  },
  groupChild: {
    borderColor: Color.colorLightsteelblue,
    borderWidth: 1,
    backgroundColor: Color.colorWhite,
    height: 32,
    width: 314,
    position: "absolute",
  },
  enterAName: {
    top: 8,
    color: Color.colorLightslategray,
    left: 10,
  },
  rectangleParent: {
    top: 246,
    height: 32,
    left: 31,
  },
  rectangleGroup: {
    top: 402,
    height: 32,
    left: 31,
  },
  groupInner: {
    borderWidth: 1,
    borderRadius: Border.br_2xs,
    borderStyle: "solid",
    left: 0,
    top: 0,
    borderColor: Color.colorLightsteelblue,
    backgroundColor: Color.colorWhite,
  },
  enterYourText: {
    top: 12,
    width: 84,
    height: 49,
  },
  rectangleContainer: {
    top: 480,
    left: 31,
  },
  rectangleView: {
    backgroundColor: "#464871",
    borderColor: Color.colorWhite,
    borderWidth: 1,
    borderRadius: Border.br_2xs,
    borderStyle: "solid",
    left: 0,
    top: 0,
    height: 32,
  },
  groupChild1: {
    left: 98,
    backgroundColor: Color.colorWhite,
    borderRadius: Border.br_2xs,
    width: 90,
    height: 32,
    top: 0,
  },
  oneTime: {
    left: 16,
    color: Color.colorWhite,
    fontSize: FontSize.size_xs,
    top: 8,
    textAlign: "left",
    // fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    position: "absolute",
  },
  recurring: {
    left: 114,
    color: "#6b769b",
    // fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_xs,
    top: 8,
    textAlign: "left",
    position: "absolute",
  },
  groupView: {
    top: 324,
    width: 188,
    height: 32,
    left: 31,
    position: "absolute",
  },
  addGroupScreenInner: {
    top: 762,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    backgroundColor: "rgba(249, 249, 249, 0.3)",
    height: 82,
    borderWidth: 2,
    borderColor: Color.colorGray,
    borderStyle: "solid",
    width: 390,
    left: 0,
  },
  ellipseIcon: {
    marginLeft: -45,
    top: 113,
    height: 90,
    left: "50%",
  },
  addGroupScreenChild1: {
    marginLeft: 10,
    top: 172,
    width: 35,
    height: 35,
    left: "50%",
    position: "absolute",
  },
  icFluentEdit24Regular1Icon: {
    top: 183,
    left: 215,
    width: 14,
    height: 14,
    position: "absolute",
    overflow: "hidden",
  },
  addGroupScreenChild2: {
    left: 11,
    width: 137,
    backgroundColor: Color.colorWhite,
  },
  addGroupScreenChild3: {
    left: 157,
    backgroundColor: Color.colorRoyalblue,
    width: 225,
  },
  icFluentShare24Regular1Icon: {
    left: 40,
  },
  share: {
    top: 795,
    left: 73,
    color: Color.colorRoyalblue,
  },
  addParticipants: {
    top: 794,
    left: 218,
    color: Color.colorWhite,
  },
  icFluentPeopleAdd24RegulaIcon: {
    left: 185,
  },
  addGroupScreenChild4: {
    top: 759,
    height: 2,
    width: 390,
    left: 0,
  },
  addGroupScreen: {
    borderRadius: 15,
    flex: 1,
    width: "100%",
    height: 844,
    backgroundColor: "transparent",
    overflow: "hidden",
  },
});

export default AddGroupScreen;
