import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Animated, Image, TouchableOpacity } from 'react-native';

//  Constants
import { images, theme } from '../../constants';

// Images
const { onboarding1, onboarding2, onboarding3 } = images;

//  Theme
const { COLORS, FONTS, SIZES } = theme;

// Dummy Data Arrays
const onBoardings = [
  {
    title: "Let's Travelling",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac justo congue.",
    img: onboarding1,
  },
  {
    title: "Navigation",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac justo congue. ",
    img: onboarding2,
  },
  {
    title: "Destination",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ac justo congue.",
    img: onboarding3,
  }
];

const OnBoarding = () => {

  const [completed, setCompleted] = React.useState(false);
  const scrollX = new Animated.Value(0);

  React.useEffect(() => {
    // Check if user has finished scrolling the onboarding pages
    scrollX.addListener(({value}) => {
      const allScreenWidth = Math.floor(value);
      const oneScreenWidth = Math.floor(SIZES.width);
      const currentPage = allScreenWidth / oneScreenWidth
      if (currentPage === onBoardings.length - 1) {
        setCompleted(true)
      }
    })

    return () => scrollX.removeListener();
  }, [])

  // Render

  function renderContent() {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        decelerationRate={0}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {x: scrollX} }},
        ], {useNativeDriver: false })}
      >
        {onBoardings.map((item, index) => (
          <View
            key={index}
            style={{ width: SIZES.width }}
          >
            {/* {image} */}
            <View style={{ 
              flex:1,
              alignItems: 'center',
              justifyContent: 'center' 
            }}>
              <Image 
                source={item.img}
                resizeMode="cover"
                style={{
                  width: "100%",
                  height: "100%"
                }}
              />
            </View>
            {/* {Text} */}
            <View 
              style={{
                position: 'absolute',
                bottom: '8%',
                left: 40,
                right: 40
              }}
            >
              <Text 
                style={{
                  ...FONTS.h1, 
                  color: COLORS.gray, 
                  textAlign: 'center'
                }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  ...FONTS.body4,
                  textAlign: 'center',
                  marginTop: SIZES.base, 
                  color: COLORS.gray
                }}
              >
                {item.description}
              </Text>
            </View>

            {/* {Button} */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 10,
                right: 0,
                width: 100,
                height: 50,
                paddingLeft: 14,
                justifyContent: 'center',
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30,
                backgroundColor: COLORS.blue
              }}
              onPress={() => console.log('Pressed button')}
            >
                <Text style={{...FONTS.h2,color: COLORS.white }}>{
                  completed ? "Let's Go" : "Skip"
                }</Text>
            </TouchableOpacity>
          </View>
        ))}
      </Animated.ScrollView>
    )
  }

  function renderDots() {

    const dotPosition = Animated.divide(scrollX, SIZES.width)

    return (
      <View style={styles.dotContainer}>
        {onBoardings.map((item, index) => {

          const opacity = dotPosition.interpolate({
            inputRange: [index -1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp"
          })

          const dotSize = dotPosition.interpolate({
            inputRange: [index - 1, index, index +1],
            outputRange: [SIZES.base, 17, SIZES.base],
            extrapolate: 'clamp'
          })

          return (
            <Animated.View
              key={`dot-${index}`}
              opacity={opacity}
              style={[styles.dot, { width: dotSize, height: dotSize }]}
            >

            </Animated.View>
          )
        })}
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        {renderContent()}
      </View>
      <View style={styles.dotRootContainer}>
        {renderDots()}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white
  },
  dotRootContainer: {
    position: 'absolute',
    bottom: SIZES.height > 700 ? '26%' : '23%' 
  },
  dotContainer: {
    flexDirection: 'row',
    height: SIZES.padding,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.blue,
    marginHorizontal: SIZES.radius / 2
  }
})

export default OnBoarding;