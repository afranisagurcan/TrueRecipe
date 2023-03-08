import {StyleSheet} from 'react-native'

export default StyleSheet.create({
  textLogIn: {
    color: "#6e4b4b",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center"
  },
  inputArea: {
    paddingLeft: 15,
    paddingRight: 15
  },
  textHeader: {
    fontSize: 22,
    color: "#6e4b4b",
    fontWeight: "bold",
    paddingVertical: 20
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 15,
    opacity: 0.9,
    color: "black",
    fontSize: 20,
    padding: 15
  },
  passwordArea: {
    display: "flex",
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: "white",
    borderRadius: 15,
    opacity: 0.9,
    color: "black",
    padding: 15
  },
  textInputPassword: {
    flexGrow: 1,
    fontSize: 22
  },
  loginButton: {
    backgroundColor: "#6e4b4b",
    padding: 20,
    borderRadius:15,
    width:'50%',
    alignSelf:'center',
    margin:20
  },
  loginButtonText:{
    textAlign:'center',
    fontSize: 20,
    fontWeight: "bold",
    color:'white'
  },
  page: {
    flexDirection: "row",
    marginLeft:80
  },


});
