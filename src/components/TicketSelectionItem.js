import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo, useState} from 'react';
import {theme} from '../theme';
import Icon from './Icon';

const {colors} = theme;
const initializeSeats = () => {
  const seats = [];
  for (let row = 0; row < 10; row++) {
    let columns;
    if (row === 0) columns = 18;
    else if (row >= 1 && row <= 3) columns = 22;
    else columns = 24;

    const seatRow = [];
    for (let col = 0; col < columns; col++) {
      seatRow.push({
        id: `${row}-${col}`,
        type: row === 9 ? 'vip' : 'regular',
        status: 'available',
      });
    }
    seats.push(seatRow);
  }
  return seats;
};

const TicketSelectionItem = ({
  screenImageSize,
  seatSize,
  setSelectedSeats,
  selectedSeats,
  isEnabled = true,
  isScrollEnabled = true,
  containerStyle = {},
}) => {
  const [seats, setSeats] = useState(initializeSeats());

  const toggleSeatSelection = (row, col) => {
    const newSeats = [...seats];
    const seat = newSeats[row][col];

    if (seat.status === 'available') {
      seat.status = 'selected';
      setSelectedSeats([...selectedSeats, seat.id]);
    } else if (seat.status === 'selected') {
      seat.status = 'available';
      setSelectedSeats(selectedSeats.filter(id => id !== seat.id));
    }
    setSeats(newSeats);
  };
  const renderSeat = (seat, row, col) => {
    const seatStyle = [
      styles.seat,
      seat.type === 'vip' && styles.vipSeat,
      seat.status === 'selected' && styles.selectedSeat,
      seat.status === 'not_available' && styles.notAvailableSeat,
    ];

    return (
      <TouchableOpacity
        className={seatSize}
        key={seat.id}
        style={seatStyle}
        onPress={() => toggleSeatSelection(row, col)}
        disabled={seat.status === 'not_available' || !isEnabled}
      />
    );
  };
  return (
    <ScrollView horizontal scrollEnabled={isScrollEnabled}>
      <View className={'w-full p-4 item-center'} style={[containerStyle]}>
        <Image
          className={screenImageSize}
          style={styles.screenImage}
          source={require('../assets/cinema_screen_icon.png')}
          resizeMode="contain"
        />
        <FlatList
          data={seats}
          renderItem={({item, index}) => (
            <View key={index} style={[styles.row, {justifyContent: 'center'}]}>
              {item.map((seat, colIndex) => renderSeat(seat, index, colIndex))}
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ScrollView>
  );
};

export default memo(TicketSelectionItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  seat: {
    backgroundColor: colors.lightBlue,
    borderRadius: 5,
  },
  vipSeat: {
    backgroundColor: colors.purple,
  },
  regularSeat: {
    backgroundColor: colors.lightBlue,
  },
  selectedSeat: {
    backgroundColor: colors.darkGolden,
  },
  notAvailableSeat: {
    backgroundColor: colors.darkGray,
  },
});
