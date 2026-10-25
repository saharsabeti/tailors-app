import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/tokens';
export function PrimaryButton({ label, onPress, disabled = false }: { label:string; onPress:()=>void; disabled?:boolean }) {
  return <Pressable accessibilityRole="button" accessibilityState={{disabled}} disabled={disabled} onPress={onPress} style={[styles.button,disabled&&styles.disabled]}><Text style={styles.text}>{label}</Text></Pressable>;
}
const styles=StyleSheet.create({button:{backgroundColor:colors.leaf,borderRadius:14,padding:15,alignItems:'center',marginTop:12},disabled:{opacity:0.45},text:{color:'#fff',fontWeight:'700',fontSize:15}});
