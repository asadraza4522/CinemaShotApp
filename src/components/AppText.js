import {Text} from 'react-native';
import React from 'react';
import {theme} from '../theme';

const {themeStyles} = theme;

const AppText = props => {
  return (
    <Text style={[themeStyles.text, props.style]} className={props?.classStyle}>
      {props.children}
    </Text>
  );
};

export default AppText;
