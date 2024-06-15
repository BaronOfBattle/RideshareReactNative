import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating = ({ totalStars, rating, onRating }) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleRating = (rate) => {
    setCurrentRating(rate);
    if (onRating) {
      onRating(rate);
    }
  };

  return (
    <View style={styles.starContainer}>
      {[...Array(totalStars)].map((_, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => handleRating(index + 1)}
            style={{marginTop: 15, marginRight: 20}}
          >
            <Icon
              name="star"
              size={45}
              color={index < currentRating ? '#043F2D' : 'grey'}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: 'row',
  },
});

export default StarRating;
