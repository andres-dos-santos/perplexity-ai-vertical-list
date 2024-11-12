import { Item } from '@/data'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

const { height } = Dimensions.get('screen')

const _spacing = 8
const _itemSize = height * 0.72
const _itemFullSize = _itemSize + _spacing * 2

type VerticalListProps = {
  data: Item[]
}

type AnimatedCardProps = {
  item: Item
  index: number
  scrollY: SharedValue<number>
}

export function AnimatedCard({ item, scrollY, index }: AnimatedCardProps) {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.2, 1, 0.2],
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.93, 1, 0.93],
          ),
        },
      ],
    }
  })

  return (
    <Animated.View
      style={[
        stylez,
        {
          backgroundColor: item.bg,
          flex: 1,
          height: _itemSize,
          padding: _spacing * 2,
          borderRadius: 8,
          gap: _spacing,
        },
      ]}
    >
      <Image
        alt=""
        source={{ uri: item.image }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 8 }]}
        blurRadius={50}
      />
      <Image
        alt=""
        source={{ uri: item.image }}
        style={{ flex: 1, height: _itemSize * 0.4 }}
      />

      <View style={{ gap: _spacing }}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF' }}>
          {item.title}
        </Text>
        <Text numberOfLines={3} style={{ color: '#DDD' }}>
          {item.description}
        </Text>
      </View>
      <View
        style={{ flexDirection: 'row', gap: _spacing, alignItems: 'center' }}
      >
        <Image
          alt=""
          source={{ uri: item.author.avatar }}
          style={{ width: 24, aspectRatio: 1, borderRadius: 12 }}
        />

        <Text style={{ fontSize: 12, color: '#DDD' }}>{item.author.name}</Text>
      </View>
    </Animated.View>
  )
}

export function VerticalList({ data }: VerticalListProps) {
  const scrollY = useSharedValue(0)
  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y / _itemFullSize
  })

  return (
    <Animated.FlatList
      data={data}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        paddingVertical: (height - _itemFullSize) / 2,
        gap: _spacing * 2,
      }}
      snapToInterval={_itemFullSize}
      decelerationRate="fast"
      onScroll={onScroll}
      scrollEventThrottle={16}
      renderItem={({ item, index }) => (
        <AnimatedCard scrollY={scrollY} index={index} item={item} />
      )}
    />
  )
}
