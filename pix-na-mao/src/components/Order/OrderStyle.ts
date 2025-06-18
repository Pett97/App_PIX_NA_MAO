import { StyleSheet } from "react-native";

const OrderStyle = StyleSheet.create({
   card:{
      flex:1,
      margin:15,
      backgroundColor:"white",
      borderRadius:18,
      marginBottom:15,
      padding:18,
   },
   client:{
      marginBottom:5,
   },
   orderAbout:{
      flexDirection:"row",
      justifyContent:"space-between",
      marginBottom:10,
      paddingHorizontal:10
   },
});

export default OrderStyle;