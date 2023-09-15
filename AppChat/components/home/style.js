import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
    paddingTop: 15,
    paddingVertical: 5,
  },
  line: {
    height: 2,
    backgroundColor: '#38444d',
  },
  lineBody: {
    height: 3,
    backgroundColor: 'black',
  },

  headerContainer: {
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerLeft: {
    width: '10%',
    justifyContent: 'center',
  },
  headerRight: {
    width: '90%',
    alignItems: 'center',
  },
  wrap: {
    resizeMode: 'contain',
    width: '50%',
    height: '50%',
  },
  wrapBody: {
    resizeMode: 'contain',
    width: '70%',
    height: '70%',
  },
  bodyContainer: {
    height: '80%',
  },
  bottomContainer: {
    height: '10%',
  },
  headerBody: {
    paddingHorizontal: 10,
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerleftBody: {
    width: '15%',
  },
  headercenterBody: {
    width: '65%',
  },
  headerrightBody: {
    width: '10%',
    marginLeft: 10,
  },
  boderradiusBody: {
    borderRadius: 50,
    borderWidth: 1,
    paddingLeft: 10,
    height: 40,
    justifyContent: 'center',
    borderColor: 'white',
  },
  textheaderBody: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  statusheaderBody: { color: 'white' },
  bottomContainer: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  contentBody: { height: '90%' },
  bowshadow: {
    height: '100%',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#15202b',
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  boderText: {
    color: 'white',
  },
});
export default styles;
