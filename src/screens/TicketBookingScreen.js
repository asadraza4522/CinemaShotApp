import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from '../components/Icon';
import AppText from '../components/AppText';
import {theme} from '../theme';
import {useNavigation, useRoute} from '@react-navigation/native';
import moment from 'moment';
import TicketSelectionItem from '../components/TicketSelectionItem';
import PaymentModal from '../components/PaymentModal';
import routes from '../navigation/routes';

const {colors} = theme;
const {width, height} = Dimensions.get('window');

const seatSize = 'w-4 h-4';

const cinemasData = [
  {
    id: 1,
    title: 'CineTech + hall 1',
    time: '12:30',
    minPrice: 50,
    maxPrice: 2500,
  },
  {
    id: 2,
    title: 'CineTech + hall 2',
    time: '13:30',
    minPrice: 75,
    maxPrice: 3000,
  },
];

const TicketBookingScreen = () => {
  const navigation = useNavigation();
  const {params: data} = useRoute();
  const [seatViewSize, setSeatViewSize] = useState(0.5);
  const [totalPayment, setTotalPayment] = useState(0);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('DD MMMM'));
  const [selectedCinema, setSelectedCinema] = useState(cinemasData[0]);
  const [isShowSeatsOption, setIsShowSeatsOption] = useState(false);
  const [isShowPaymentModal, setIsShowPaymentModal] = useState(false);
  let item = data?.item;
  const getNext7Days = () => {
    const days = [];
    const today = moment();
    const formattedDate = today.format('DD MMMM'); // Format: Day Month (e.g., 22 July)
    days.push(formattedDate);
    for (let i = 1; i <= 7; i++) {
      const nextDay = today.clone().add(i, 'days');
      const formattedDate = nextDay.format('DD MMMM'); // Format: Day Month (e.g., 22 July)
      days.push(formattedDate);
    }
    return days;
  };

  const next7Days = useMemo(() => getNext7Days(), []);
  const handleZoomSeats = () => {
    setSeatViewSize(seatViewSize == 0.5 ? 1 : 0.5);
  };
  useEffect(() => {
    console.log('selectedSeats >>', selectedSeats);
    if (selectedSeats?.length > 0) {
      handleTotalPayment();
    } else {
      setTotalPayment(0);
    }
  }, [selectedSeats]);

  const handleTotalPayment = () => {
    var sum = 0;
    for (let i = 0; i < selectedSeats.length; i++) {
      if (selectedSeats[i].split('-')[0] != 9) {
        sum += selectedCinema.minPrice;
      } else {
        sum += 150;
      }
    }
    // console.log('sum >>', sum);
    setTotalPayment(sum);
  };

  const LegendViewItem = ({colorValue, title}) => {
    return (
      <View className="items-center flex-row p-2">
        <Icon
          icon="tv"
          iconType="Ionicons"
          iconColor={colorValue}
          iconSize={22}
        />
        <AppText classStyle={'text-base ml-3'} style={styles.legendText}>
          {title}
        </AppText>
      </View>
    );
  };
  const handleDonePaymentModal = useCallback(() => {
    setIsShowPaymentModal(false);
    navigation.navigate(routes.HOME);
  }, []);

  return (
    <View className="flex-1 w-full" style={styles.container}>
      <SafeAreaView className="w-full flex-row justify-center items-center px-1 bg-white ">
        <View className="h-18">
          <AppText
            classStyle={
              'text-2xl mt-2 w-full text-center font-medium text-black'
            }>
            {item?.title}
          </AppText>
          <AppText
            style={{color: colors.lightBlue}}
            classStyle={'text-lg w-full text-center font-medium text-black'}>
            {isShowSeatsOption
              ? `${selectedDate} | ${selectedCinema.time}, ${selectedCinema.title}`
              : `In theaters ${moment(item?.release_date).format(
                  'MMMM DD, YYYY',
                )}`}
          </AppText>
        </View>
        <TouchableOpacity
          className="p-2 absolute left-2"
          onPress={() =>
            isShowSeatsOption
              ? setIsShowSeatsOption(false)
              : navigation.goBack()
          }
          hitSlop={{top: 10, left: 10, right: 10, bottom: 10}}>
          <Icon
            icon="chevron-left"
            iconType="FontAwesome5"
            iconColor={colors.black}
            iconSize={22}
          />
        </TouchableOpacity>
      </SafeAreaView>
      <View className="w-full my-4 flex-1 ">
        {isShowSeatsOption ? (
          <>
            <TicketSelectionItem
              seatSize={`${seatSize} m-${seatViewSize}`}
              selectedSeats={selectedSeats}
              setSelectedSeats={setSelectedSeats}
              screenImageSize={'w-full self-center mt-2'}
            />
            <TouchableOpacity
              onPress={handleZoomSeats}
              className="absolute bg-slate-200 right-5 z-10 bottom-64 p-2 self-center justify-center items-center rounded-3xl">
              <Icon icon={seatViewSize == 0.5 ? 'plus' : 'minus'} />
            </TouchableOpacity>
            <View className="bg-white p-4 h-2/6 w-full" style={styles.legend}>
              <View className=" w-full flex-1" style={styles.row}>
                <View className="flex-1 self-start">
                  <LegendViewItem
                    colorValue={colors.darkGolden}
                    title="Selected"
                  />
                  <LegendViewItem
                    colorValue={colors.purple}
                    title="VIP (150)$"
                  />
                </View>
                <View className="flex-1 self-start">
                  <LegendViewItem
                    colorValue={colors.lightGray}
                    title="Not Available"
                  />
                  <LegendViewItem
                    colorValue={colors.lightBlue}
                    title={`Regular (${selectedCinema.minPrice})$`}
                  />
                </View>
              </View>
              <View className="flex-row justify-evenly">
                <View
                  className="justify-center rounded-xl"
                  style={{backgroundColor: colors.lightGray}}>
                  <AppText
                    classStyle={'px-4 text-xl my-1 font-medium text-black'}>
                    Total ${totalPayment}
                  </AppText>
                </View>
                <TouchableOpacity
                  onPress={() => setIsShowPaymentModal(true)}
                  style={styles.btnStyle}
                  className="ml-2 w-3/5 self-center justify-center items-center rounded-xl">
                  <AppText classStyle={'text-xl my-3 font-semibold text-white'}>
                    Proceed to pay
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : (
          <View className="mx-4 mt-20  flex-1 justify-between pb-6">
            <View>
              <AppText classStyle={'text-xl my-4 font-medium text-black'}>
                Date
              </AppText>
              <ScrollView horizontal>
                {next7Days.map(day => (
                  <TouchableWithoutFeedback
                    onPress={() => setSelectedDate(day)}
                    key={day}>
                    <View
                      style={{
                        backgroundColor:
                          day == selectedDate
                            ? colors.lightBlue
                            : colors.lightGray,
                      }}
                      className="w-20 mx-2 p-2 rounded-xl items-center"
                      key={day}>
                      <AppText
                        classStyle={`text-base font-medium ${
                          day == selectedDate ? 'text-white' : 'text-black'
                        }`}>
                        {day}
                      </AppText>
                    </View>
                  </TouchableWithoutFeedback>
                ))}
              </ScrollView>
              <View className="my-4">
                <ScrollView horizontal>
                  {cinemasData.map((item, index) => {
                    return (
                      <View key={index.toString()}>
                        <TouchableWithoutFeedback
                          onPress={() => setSelectedCinema(item)}>
                          <View className="p-2 m-2" key={index.toString()}>
                            <View className="flex-row items-center">
                              <AppText
                                classStyle={
                                  'text-base font-medium my-2 text-black'
                                }>
                                {item.time}
                              </AppText>
                              <AppText
                                classStyle={'text-base mx-3 text-slate-500'}>
                                {item.title}
                              </AppText>
                            </View>
                            <TicketSelectionItem
                              seatSize={'w-1 h-1 m-0.5'}
                              selectedSeats={selectedSeats}
                              setSelectedSeats={setSelectedSeats}
                              screenImageSize={'w-full h-10 self-center mt-2'}
                              containerStyle={{
                                borderColor:
                                  selectedCinema?.id == item.id
                                    ? colors.lightBlue
                                    : colors.lightGray,
                                borderWidth: 2,
                                width: width * 0.65,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 12,
                              }}
                              isScrollEnabled={false}
                            />
                            <View className="flex-row items-center">
                              <AppText
                                classStyle={'text-base mx-2 text-slate-500'}>
                                From
                              </AppText>
                              <AppText
                                classStyle={
                                  'text-base font-medium my-2 text-black'
                                }>
                                {item.minPrice}$
                              </AppText>
                              <AppText
                                classStyle={'text-base mx-2 text-slate-500'}>
                                or
                              </AppText>
                              <AppText
                                classStyle={
                                  'text-base font-medium my-2 text-black'
                                }>
                                {item.maxPrice} bonus
                              </AppText>
                            </View>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => setIsShowSeatsOption(true)}
                style={styles.btnStyle}
                className="w-11/12 self-center justify-center items-center rounded-xl">
                <AppText classStyle={'text-xl my-3 font-semibold text-white'}>
                  Select Seats
                </AppText>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {isShowPaymentModal && (
        <PaymentModal
          isVisible={isShowPaymentModal}
          setIsVisible={handleDonePaymentModal}
        />
      )}
    </View>
  );
};

export default TicketBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginVertical: 2,
  },
  legend: {
    justifyContent: 'space-around',
    marginTop: 20,
  },
  legendText: {
    color: colors.darkGray,
  },
  btnStyle: {
    backgroundColor: colors.lightBlue,
  },
});
