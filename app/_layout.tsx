import { VerticalList } from '@/components/vertical-list'
import { data } from '@/data'
import { View, StyleSheet } from 'react-native'

export default function App() {
  return (
    <View style={s.container}>
      <VerticalList data={data} />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
  },
})
