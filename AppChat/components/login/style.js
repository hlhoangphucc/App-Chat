import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white'
      },
      top:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
      },
      conten:{
        flex:0.5,
      },
      btn:{
        flex:0.5,
      },
    //   conten: {
    //     padding: 24,
    //     flex:1,
    //     justifyContent: 'center',
    //     backgroundColor:'red'
    //   },
      textInput: {
        height: 50,
        borderColor: '#000000',
        borderBottomWidth: 1,
        borderTopWidth:1,
        marginHorizontal:25,
        marginTop:50,
        fontSize:24,
        fontWeight:'500'
      },
      button: {
        backgroundColor:'#268FD3',
        borderRadius:20,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:25
      },
      text_btn:{
        fontSize:24,
        color:'white',
        fontWeight:'bold'
      },
      phone:{
        width:120,
        height:120,
      },
      texttop:{
        fontSize:30,
        marginBottom:20,
        fontWeight:'bold'
      }
  })
  export default styles