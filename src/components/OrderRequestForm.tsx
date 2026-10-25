import React, {useState} from 'react';
import {View,Text,TextInput,StyleSheet} from 'react-native';
import type {OrderDraft} from '../domain/orders';
import {validateOrderDraft} from '../domain/orders';
import {PrimaryButton} from './PrimaryButton';
import {colors} from '../theme/tokens';
export function OrderRequestForm({tailorId,onPreview}:{tailorId:string;onPreview:(draft:OrderDraft)=>void}) {
  const [description,setDescription]=useState('');
  const [date,setDate]=useState('');
  const [error,setError]=useState<string|null>(null);
  function submit() {
    const draft:OrderDraft={tailorId,description:description.trim(),...(date.trim()?{requestedDate:date.trim()}:{})};
    const reason=validateOrderDraft(draft);
    if(reason){setError(reason);return;}
    setError(null);onPreview(draft);
  }
  return <View style={styles.box}>
    <Text style={styles.title}>درخواست دوخت (پیش‌نمایش)</Text>
    <Text style={styles.help}>نوع لباس، اندازه و جزئیات را توضیح بده. هنوز چیزی برای خیاط ارسال نمی‌شود.</Text>
    <TextInput multiline accessibilityLabel="توضیحات سفارش" placeholder="مثلاً دوخت مانتو با پارچه شخصی..." placeholderTextColor={colors.muted} textAlign="right" value={description} onChangeText={setDescription} style={[styles.input,styles.long]}/>
    <TextInput accessibilityLabel="تاریخ درخواستی" placeholder="تاریخ میلادی YYYY-MM-DD (اختیاری)" placeholderTextColor={colors.muted} textAlign="right" value={date} onChangeText={setDate} style={styles.input}/>
    {error&&<Text accessibilityRole="alert" style={styles.error}>{error}</Text>}
    <PrimaryButton label="ساخت پیش‌نمایش سفارش" onPress={submit}/>
  </View>;
}
const styles=StyleSheet.create({box:{marginTop:25},title:{fontSize:18,fontWeight:'700',color:colors.ink,textAlign:'right'},help:{color:colors.muted,textAlign:'right',lineHeight:23,marginVertical:10},input:{borderWidth:1,borderColor:colors.border,borderRadius:12,padding:12,backgroundColor:colors.card,color:colors.ink,marginTop:12,writingDirection:'rtl'},long:{minHeight:95,textAlignVertical:'top'},error:{color:'#a52323',textAlign:'right',marginTop:10}});
