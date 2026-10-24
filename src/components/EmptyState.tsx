import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {colors} from '../theme/tokens';
export function EmptyState({message}:{message:string}){return <View style={styles.box}><Text style={styles.text}>{message}</Text></View>}
const styles=StyleSheet.create({box:{padding:24,alignItems:'center'},text:{color:colors.muted,textAlign:'center'}});
