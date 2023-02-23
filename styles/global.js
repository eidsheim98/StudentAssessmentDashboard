import { StyleSheet } from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
  
 export const globalStyles = StyleSheet.create({
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
    },
    highlight: {
      fontWeight: '700',
    },
    inpuut: {
      borderWidth: 1,
      borderColor: '#ddd',
      padding: 13,
      fontSize: 8,
      borderRadius: 6,
    },
    buttonContainer: {
      paddingVertical: 4,
      paddingHorizontal: 6,
      backgroundColor: '#AADDFF',
      borderRadius: 2,
    },
    buttonText: {
      fontSize: 12,
      color: 'black',
    },
    container: { 
      flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' 
    },
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 32,
    },
    head: {
      height: 40,
      backgroundColor: '#f1f8ff'
    },
    text: {
      margin: 6
    },
    hidden:{
      display: "none"
    }
  });