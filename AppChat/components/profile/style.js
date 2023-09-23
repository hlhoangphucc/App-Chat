import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
  },
  headerContainer: {
    height: 300,
  },
  backgroundUser: {
    height: '65%',
  },
  avtUser: {
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avt: {
    top: '50%',
    left: '20%',
    transform: [{ translateX: -75 }, { translateY: -90 }],
    width: 125,
    height: 125,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: 'black',
  },
  nameContainer: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameUser: {
    top: '50%',
    left: '20%',
    transform: [{ translateX: -75 }, { translateY: -50 }],
    color: 'white',
    fontSize: 25,
    fontWeight: '500',
  },
  wrapBG: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  wrapAvt: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  contentContainer: {
    height: '60%',
  },
  iconsContainer: {
    position: 'absolute',
    top: 5,
    right: 10,
    justifyContent: 'flex-end',
  },
  iconsBackContainer: {
    position: 'absolute',
    top: 5,
    left: 10,
    justifyContent: 'flex-end',
  },
});
export default styles;
