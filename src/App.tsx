import React, { useMemo, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, Pressable, StyleSheet, StatusBar, Platform, ActivityIndicator } from 'react-native';
import { type Tailor } from './data/tailors';
import { useTailors } from './hooks/useTailors';
import { filterTailors } from './domain/search';
import { colors } from './theme/tokens';
import { OrderRequestForm } from './components/OrderRequestForm';
import { OrderPreview } from './components/OrderPreview';
import { createPreviewOrder } from './domain/order-preview';
import type { Order } from './domain/orders';
import { checkBackendConnection } from './services/health';
import { PrimaryButton } from './components/PrimaryButton';

const C = colors;
function TailorCard({ tailor, onSelect }: { tailor: Tailor; onSelect: (item: Tailor) => void }) {
  return <Pressable accessibilityRole="button" onPress={() => onSelect(tailor)} style={styles.card}>
    <View style={styles.avatar}><Text style={styles.avatarText}>{tailor.initials}</Text></View>
    <View style={styles.cardBody}>
      <Text style={styles.cardTitle}>{tailor.name}</Text>
      <Text style={styles.detail}>{tailor.expertise}</Text>
      <Text style={styles.detail}>{tailor.location}  ·  ★ {tailor.rating}</Text>
    </View>
    <Text style={styles.arrow}>‹</Text>
  </Pressable>;
}
export default function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Tailor | null>(null);
  const [preview, setPreview] = useState<Order | null>(null);
  const [connectionMessage,setConnectionMessage] = useState<string | null>(null);
  const [checkingConnection,setCheckingConnection] = useState(false);
  async function testConnection() {
    if (checkingConnection) return;
    setCheckingConnection(true);
    try { const result = await checkBackendConnection(); setConnectionMessage(result.message); }
    finally { setCheckingConnection(false); }
  }
  const { items, loading, error, demo, refresh } = useTailors();
  const filtered = useMemo(() => filterTailors(items, query), [items, query]);
  return <SafeAreaView style={styles.root}>
    <StatusBar barStyle="light-content" backgroundColor={C.dark} />
    <ScrollView contentContainerStyle={styles.page} keyboardShouldPersistTaps="handled">
      <View style={styles.hero}>
        <Text style={styles.brand}>TAILORS  /  نخ‌یار</Text>
        <Text style={styles.heading}>دوخت دلخواهت، از خیاط مناسب</Text>
        <Text style={styles.subtitle}>نمونه‌کارها را ببین و خیاط مناسب را پیدا کن.</Text>
      </View>
      <View style={styles.content}>
        {preview ? <OrderPreview order={preview} onClose={() => { setPreview(null); setSelected(null); }} /> : selected ? <>
          <Pressable onPress={() => setSelected(null)} accessibilityRole="button"><Text style={styles.back}>→ بازگشت به خیاط‌ها</Text></Pressable>
          <Text style={styles.sectionTitle}>{selected.name}</Text>
          <Text style={styles.detail}>{selected.expertise} · {selected.location}</Text>
          <View style={styles.notice}><Text style={styles.noticeText}>اطلاعات نمایشی است؛ ثبت واقعی سفارش و پرداخت هنوز فعال نیست.</Text></View>
          <OrderRequestForm tailorId={selected.id} onPreview={draft => setPreview(createPreviewOrder(draft))} />
        </> : <>
          <Text style={styles.sectionTitle}>خیاط خودت را پیدا کن</Text>
          <PrimaryButton label={checkingConnection ? 'در حال بررسی ارتباط...' : 'بررسی اتصال بک‌اند'} onPress={testConnection} disabled={checkingConnection} />
          {connectionMessage && <Text style={styles.demo} accessibilityRole="alert">{connectionMessage}</Text>}
          {demo && <Text style={styles.demo}>حالت نمایشی؛ اطلاعات نمونه هستند.</Text>}
          <TextInput accessibilityLabel="جست‌وجوی خیاط" style={styles.search} placeholder="نام، تخصص یا شهر را جست‌وجو کن" placeholderTextColor="#899990" value={query} onChangeText={setQuery} textAlign="right" />
          {loading ? <ActivityIndicator accessibilityLabel="در حال بارگذاری" size="large" color={C.leaf}/> : error ? <View style={styles.notice}>
            <Text style={styles.noticeText}>{error}</Text>
            <Pressable accessibilityRole="button" onPress={refresh}><Text style={styles.back}>تلاش مجدد</Text></Pressable>
          </View> : <>
            <Text style={styles.counter}>{filtered.length} خیاط {demo ? 'نمونه' : ''}</Text>
            {filtered.map(t => <TailorCard key={t.id} tailor={t} onSelect={setSelected} />)}
            {filtered.length === 0 && <Text style={styles.empty}>نتیجه‌ای پیدا نشد.</Text>}
          </>}
        </>}
      </View>
    </ScrollView>
  </SafeAreaView>;
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.cream },
  page: { flexGrow: 1, backgroundColor: C.cream },
  hero: { backgroundColor: C.dark, paddingHorizontal: 24, paddingTop: Platform.OS === 'web' ? 62 : 38, paddingBottom: 55, alignItems: 'flex-end' },
  brand: { color: '#c9e8d9', fontWeight: '800', fontSize: 15, letterSpacing: 1 },
  heading: { color: '#fff', fontSize: 29, fontWeight: '800', marginTop: 30, textAlign: 'right', writingDirection: 'rtl' },
  subtitle: { color: '#d3e0db', fontSize: 15, marginTop: 12, textAlign: 'right', writingDirection: 'rtl' },
  content: { width: '100%', maxWidth: 760, alignSelf: 'center', paddingHorizontal: 20, paddingBottom: 70, paddingTop: 32 },
  sectionTitle: { fontSize: 24, fontWeight: '800', color: C.ink, textAlign: 'right', marginBottom: 20 },
  search: { borderWidth: 1, borderColor: C.border, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 13, fontSize: 15, color: C.ink, backgroundColor: C.card, writingDirection: 'rtl', marginBottom: 15 },
  counter: { color: C.muted, textAlign: 'right', marginBottom: 10 },
  demo: { color: C.leaf, textAlign: 'right', marginBottom: 12 },
  card: { backgroundColor: C.card, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 12 },
  avatar: { width: 58, height: 58, backgroundColor: '#d5e7dd', borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: C.leaf, fontSize: 24, fontWeight: '900' },
  cardBody: { flex: 1, marginHorizontal: 14, alignItems: 'flex-end' },
  cardTitle: { color: C.ink, fontSize: 17, fontWeight: '800', writingDirection: 'rtl' },
  detail: { color: C.muted, marginTop: 5, fontSize: 13, textAlign: 'right', writingDirection: 'rtl' },
  arrow: { color: C.leaf, fontSize: 26 },
  back: { color: C.leaf, fontWeight: '700', textAlign: 'right', marginBottom: 25 },
  notice: { backgroundColor: '#e5eee8', borderRadius: 12, padding: 18, marginTop: 20 },
  noticeText: { color: C.ink, textAlign: 'right', lineHeight: 25 },
  empty: { color: C.muted, textAlign: 'center', padding: 30 },
});
