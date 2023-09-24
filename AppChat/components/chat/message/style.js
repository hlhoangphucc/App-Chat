import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#15202b',
  },
  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  body: {
    flex: 1,
  },
  headerLeft: {
    width: '55%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconHeader: {
    color: 'white',
  },
  avtCirle: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avtText: {
    color: 'white',
    fontSize: 20,
  },
  Name: {
    color: 'white',
    fontSize: 25,
    fontWeight: '600',
  },
  message: {
    flex: 1,
  },
  textBody: {
    color: 'white',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    height: 50,
    borderRadius: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: '#29353f',
  },
  bottomLeft: {
    width: '20%',
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomCenter: {
    width: '65%',
    paddingLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomRight: {
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconInput: {
    color: 'white',
  },
  iconmicInput: {
    color: '#7454f5',
  },
  keyboardText: {
    color: 'white',
  },
  wrapBody: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
});
export default styles;
