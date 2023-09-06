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
        flex:0.4,
        flexDirection:'row',
        marginTop:50,
        justifyContent:'center',
      },
      btn:{
        flex:0.6,
      },
      textInput: {
        width:'70%',
        height: 50,
        borderColor: '#000000',
        borderWidth:1.5,
        fontSize:24,
        fontWeight:'500',
        borderRadius:10,
        paddingLeft:20,
        marginTop:25
      },
      country:{
        borderWidth:1.5,
        height:50,
        width:55,
        borderRadius:10,
        marginRight:10,
        marginTop:25,
        justifyContent:'center'
      },
      textcountry:{
        fontSize:24,
        fontWeight:'500'
      }
      ,
      button: {
        backgroundColor:'#268FD3',
        borderRadius:20,
        height:60,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:25,
        marginTop:50
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
      },
      separator: {
        borderBottomColor: '#737373',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderWidth:1
      },
  })
  export default styles