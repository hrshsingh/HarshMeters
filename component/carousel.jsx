
import React, { useCallback } from 'react'; // Import useCallback
import { View, Text, FlatList, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const SLIDE_HEIGHT = 250; // Define the explicit height of your carousel/slide

const slides = [
  {
    key: '1',
    title: 'For Taxis',
  },
  {
    key: '2',
    title: 'For Buses',
  },
  {
    key: '3',
    title: 'For Metros',
  },
];

const Carousel = () => {
  const renderContent = (key) => {
    return (
      <View style={styles.placeholderBox}>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}> $81</Text>
        </View>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}> $81</Text>
        </View>
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}> $81</Text>
        </View>
      </View>
    );
  };

  // Define getItemLayout outside render for performance and consistency
  const getItemLayout = useCallback((data, index) => (
    { length: width, offset: width * index, index }
  ), []); // Dependencies are empty as width is constant

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={slides}
        renderItem={({ item }) => (
          <View key={item.key} style={styles.slide}>
            <View style={styles.slideContentWrapper}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              {renderContent(item.key)}
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
        // ******************** THE KEY ADDITION ********************
        getItemLayout={getItemLayout}
        // **********************************************************
        // Optional: Ensure it snaps perfectly to the start of each item
        snapToInterval={width}
        snapToAlignment="start"
        decelerationRate="fast" // or 'normal'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: SLIDE_HEIGHT, // Use the defined height
  },
  slide: {
    width: width, // Each slide takes the full screen width exactly
    height: '100%', // Make sure the slide fills the container height
    alignItems: 'center', // Center the slideContentWrapper within the slide
    justifyContent: 'center', // Center vertically if content doesn't fill height
  },
  slideContentWrapper: {
    marginHorizontal: 20, // Adjust this value to control the side spacing
    width: width - 40, // (width - marginHorizontal * 2)
    alignItems: 'center', // Center items like titleContainer and placeholderBox horizontally within this wrapper
    // You might also want to set a fixed height for this wrapper if the content isn't filling it naturally
    // For example: height: '100%', or specific height
  },
  title: {
    fontSize: 15,
    color: '#F8AA56',
    padding: 5
  },
  titleContainer: {
    borderWidth: 2,
    borderColor: "#F8AA56",
    paddingHorizontal: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  placeholderContainer: {
    borderRadius: 100,
    backgroundColor: "#2D363F",
    paddingVertical: 25,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  placeholderBox: {
    width: '100%', // Takes 100% of the slideContentWrapper's width
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  placeholderText: {
    fontSize: 20,
    color: "#ffffff"
  }
});

export default Carousel;