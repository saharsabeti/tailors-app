import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import type {Order} from '../domain/orders';
import {orderStatusLabels} from '../domain/order-status';
import {displayDate} from '../domain/date';
import {colors} from '../theme/tokens';
import {PrimaryButton} from './PrimaryButton';
export function OrderPreview({order,onClose}:{order:Order;onClose:()=>void}){
  return <View style={styles.box}>
    <Text style={styles.head}>پیش‌نمایش سفارش ایجاد شد</Text>
    <Text style={styles.note}>این سفارش فقط در حافظه موقت نمایش داده می‌شود و هنوز ثبت یا ارسال نشده است.</Text>
    <Text style={styles.line}>وضعیت: {orderStatusLabels[order.status]}</Text>
    <Text style={styles.line}>تاریخ: {displayDate(order.createdAt)}</Text>
    <Text style={styles.line}>توضیحات: {order.description}</Text>
    <PrimaryButton label="بازگشت به خیاط‌ها" onPress={onClose}/>
  </View>;
}
const styles=StyleSheet.create({box:{backgroundColor:'#e5eee8',borderRadius:16,padding:18,marginTop:16},head:{color:colors.ink,fontSize:20,fontWeight:'800',textAlign:'right'},note:{color:colors.muted,textAlign:'right',lineHeight:24,marginTop:10},line:{color:colors.ink,textAlign:'right',marginTop:10}});
