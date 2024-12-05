import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '../Icons/FontAwesome';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const StarRating = ({ value, size , disabled, setValue}: any) => {
  const [rating, setRating] = useState(value); 

  const renderStars = () => {
    const maxValue = 5; 
    const stars = [];
    for (let i = 1; i <= maxValue; i++) {
      const starIcon = i <= rating ? 'star' : 'star-o';
      const starColor = i <= rating ? '#FFA216' : '#1A1A1A19';
      stars.push(
        <TouchableOpacity disabled={disabled} key={i} onPress={() => handleStarPress(i)}>
          <FontAwesome name={starIcon} size={size ? size : responsiveFontSize(2.5)} color={starColor} />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleStarPress = (selectedRating: number) => {
    setRating(selectedRating);
    setValue && setValue(selectedRating)
  };

  return <View style={{ flexDirection: 'row' }}>{renderStars()}</View>;
};

export default StarRating;