import React from 'react';
import {Text,StyleSheet} from 'react-native';
import {colors} from '../theme/tokens';
export function SectionHeading({children}:{children:React.ReactNode}){return <Text style={styles.title}>{children}</Text>}
const styles=StyleSheet.create({title:{fontSize:23,fontWeight:'800',color:colors.ink,textAlign:'right',marginBottom:15}});
