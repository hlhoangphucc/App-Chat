import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#15202b',
    paddingTop: 10,
  },
  headerContainer: {
    height: 35,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bodyContainer: {
    height: '40%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
  },
  contentBody: {
    height: '20%',
    justifyContent: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },
  textHeader: {
    marginLeft: 10,
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  lineBody: {
    height: 1,
    backgroundColor: '#38444d',
  },
  textContent: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});

export default styles;
