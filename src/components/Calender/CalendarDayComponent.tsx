// import PropTypes from 'prop-types';
// import React from 'react';
// import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// const weekDaysNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// class CalendarDayComponent extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     this.onDayPress = this.onDayPress.bind(this);
//   }

//   getContentStyle() {
//     const { state, marking = {} } = this.props;
//     const style= {
//       content: {},
//       text: {
//         color: '#181c26'
//       }
//     };

//     if (state === 'disabled') {
//       style.text.color = '#c1c2c1';
//     } else {
//       if (marking.partiallyBlocked) {
//         style.content.borderColor = '#c1c2c1';
//         style.content.borderRadius = 50;
//         style.content.borderWidth = 1;
//       } else if (marking.partiallySoldOut) {
//         style.content.borderColor = '#e35052';
//         style.content.borderRadius = 50;
//         style.content.borderWidth = 1;
//       }

//       if (marking.selected) {
//         style.text.color = '#fff';
//         style.content.backgroundColor = '#216bc9';
//         style.content.borderRadius = 50;
//       } else if (marking.fullyBlocked) {
//         style.text.color = '#fff';
//         style.content.backgroundColor = '#c1c2c1';
//         style.content.borderRadius = 50;
//       } else if (marking.fullySoldOut) {
//         style.text.color = '#fff';
//         style.content.backgroundColor = '#e35052';
//         style.content.borderRadius = 50;
//       }
//     }

//     return style;
//   }

//   getFooterTextStyle() {
//     const { marking = {}, state } = this.props;
//     const style = {
//       color: '#c1c2c1'
//     };

//     if (marking.inventory > 0 && state !== 'disabled') {
//       style.color = '#4caf50';
//     }
//     return style;
//   }

//   getInventoryCount() {
//     const { marking = {}, state } = this.props;
//     if (typeof marking === 'object' && state !== 'disabled') {
//       if (marking.inventory >= 0) {
//         return marking.inventory;
//       }
//     }
//     if (state === 'disabled') {
//       return '';
//     } else {
//       return 'NA';
//     }
//   }

//   onDayPress() {
//     this.props.onPress(this.props.date);
//   }

//   render() {
//     const contentStyle = this.getContentStyle();
//     const highDemandImage = require('../../images/high-demand.png');

//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           {
//             this.props.horizontal ?
//               <Text style={styles.weekName} numberOfLines={1}>
//                 {
//                   weekDaysNames[this.props.date.weekDay].toUpperCase()
//                 }
//               </Text>
//               :
//               null
//           }
//         </View>
//         <TouchableOpacity
//           style={[styles.content, contentStyle.content]}
//           onPress={this.onDayPress}
//         >
//           <Text style={[styles.contentText, contentStyle.text]}>
//             {String(this.props.children)}
//           </Text>
//           {
//             (this.props.marking.highDemand && this.props.state !== 'disabled') ?
//               <Image source={highDemandImage} style={styles.smallIcon} />
//               : null
//           }
//         </TouchableOpacity>
//         <View style={styles.footer}>
//           <Text style={this.getFooterTextStyle()}>
//             {this.getInventoryCount()}
//           </Text>
//         </View>
//       </View>
//     );
//   }
// }

// CalendarDayComponent.propTypes = {
//   children: PropTypes.any,
//   state: PropTypes.string,
//   marking: PropTypes.any,
//   horizontal: PropTypes.bool,
//   date: PropTypes.object,
//   onPress: PropTypes.func.isRequired,
//   current: PropTypes.string
// };

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginLeft: 7,
//     marginRight: 7
//   },
//   weekName: {
//     width: 32,
//     textAlign: 'center',
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#7c7c7c'
//   },
//   content: {
//     width: 36,
//     height: 36,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   contentText: {
//     fontSize: 20
//   },
//   footer: {
//     flexDirection: 'row'
//   },
//   smallIcon: {
//     width: 12,
//     height: 12,
//     position: 'absolute',
//     top: -1,
//     right: -1
//   }
// });

// export default CalendarDayComponent;
// import DateTimePicker from '@react-native-community/datetimepicker';
// import React, { useState } from 'react';
// import { Button, TextInput, View } from 'react-native';

// const CalendarTextField = () => {
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [showPicker, setShowPicker] = useState(false);

//   const handleDateChange = (event, date) => {
//     setShowPicker(false);
//     if (date) {
//       setSelectedDate(date);
//     }
//   };

//   const handleSubmit = () => {
//     // Handle submission with selectedDate
//     console.log('Selected Date:', selectedDate);
//   };

//   return (
//     <View>
//       <Button title="Select Date" onPress={() => setShowPicker(true)} />
//       {showPicker && (
//         <DateTimePicker
//           value={selectedDate}
//           mode="date"
//           display="default"
//           onChange={handleDateChange}
//         />
//       )}
//       <TextInput
//         style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: 10 }}
//         editable={false}
//         value={selectedDate.toDateString()}
//       />
//       <Button title="Submit" onPress={handleSubmit} />
//     </View>
//   );
// };

// export default CalendarTextField;
