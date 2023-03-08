import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 2
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    height: "50%"
  },
  background: {
    height: "50%",
    backgroundColor: "#00000000"
  },
  inputArea: {
    paddingLeft: 15,
    paddingRight: 15
  },
  textHeader: {
    fontSize: 22,
    color: "#439b3e",
    fontWeight: "bold",
    paddingVertical: 20
  },
  text: {
    backgroundColor: "white",
    borderRadius: 15,
    opacity: 0.9,
    color: "black",
    fontSize: 22,
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
    backgroundColor: "#439b3e",
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
    alignSelf:'center'
  },

});
