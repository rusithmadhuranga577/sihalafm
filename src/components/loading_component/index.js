/** @format */

import React from 'react';
import {
  View,
  ActivityIndicator,
  Text
} from 'react-native';
import styles from './styles';
import { DoubleBounce } from 'react-native-loader';
// import { Languages } from '@common';
import { Colors } from '@common';

export default function LoadingComponent({
    visibility,
  }) {
    return (
      <>
        {visibility ? 
            <View style={[styles.overlay]}>
                <View style={[styles.indicatorholder]}>
                  <DoubleBounce size={25} color={Colors.white} />
                </View>
            </View>:null
        }
      </>
    );
}