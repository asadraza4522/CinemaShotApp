import React from 'react';
// Todo create the component to automate the icon importing
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
// import FontAwesome5ProIcon from 'react-native-vector-icons/FontAwesome5Pro';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OcticonsIcon from 'react-native-vector-icons/Octicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import ZocialIcon from 'react-native-vector-icons/Zocial';

export default function Icon({
  iconType,
  icon,
  iconSize,
  iconColor = 'black',
  iconStyle,
}) {
  return (
    <>
      {iconType == 'AntDesign' ? (
        <AntDesignIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'Entypo' ? (
        <EntypoIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'Evil' || iconType == 'EvilIcons' ? (
        <EvilIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'Feather' ? (
        <FeatherIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'FontAwesome' ? (
        <FontAwesomeIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'FontAwesome5' ? (
        <FontAwesome5Icon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'Fontisto' ? (
        <FontistoIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'Foundation' ? (
        <FoundationIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'Ionicons' ? (
        <IonIcons
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'MaterialIcons' ? (
        <MaterialIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'MaterialCommunityIcons' ? (
        <MaterialCommunityIcons
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'Octicons' ? (
        <OcticonsIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'SimpleLine' ? (
        <SimpleLineIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : iconType == 'Zocial' ? (
        <ZocialIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      ) : (
        <FontAwesomeIcon
          name={icon}
          size={iconSize ? iconSize : 23}
          color={iconColor}
          style={iconStyle}
        />
      )}
    </>
  );
}
