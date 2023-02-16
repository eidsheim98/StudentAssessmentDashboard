import REACT from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native/';
import { Formik} from 'formik';
import { globalStyles } from 'C:/Users/Mhwan/CodeMaster/ikt205/StudentAssessmentDashboard/styles/global';
import { db } from "C:/Users/Mhwan/CodeMaster/ikt205/StudentAssessmentDashboard/firebaseConfig.js";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";


export default function SADForm() {
    return(
        <View style={globalStyles.sectionContainer}>
            <Formik
            initialValues={{DOB: '', Grade: '', ClassID: '', className: '', fName: '', lName: '', score: ''}}
            onSubmit={values => {
                setDoc(doc(db, "students", values.fName + " " + values.lName ), {
                    fName: values.fName,
                    lName: values.lName,
                    classID: values.ClassID,
                    className: values.className,
                    grade: values.Grade,
                    score: values.score
                  });
            }}
            >
            {(props) => (
                <View>
                    <TextInput
                    style= {globalStyles.inpuut}
                    placeholder= 'DOB'
                    onChangeText={props.handleChange('DOB')}
                    value={props.values.DOB}
                    ></TextInput>
                    <TextInput
                    style= {globalStyles.inpuut}
                    placeholder= 'Grade'
                    onChangeText={props.handleChange('Grade')}
                    value={props.values.Grade}
                    ></TextInput>
                    <TextInput
                    style= {globalStyles.inpuut}
                    placeholder= 'ClassID'
                    onChangeText={props.handleChange('ClassID')}
                    value={props.values.ClassID}
                    ></TextInput>
                    <TextInput
                    style= {globalStyles.inpuut}
                    placeholder= 'className'
                    onChangeText={props.handleChange('className')}
                    value={props.values.className}
                    ></TextInput>
                     <TextInput
                    style= {globalStyles.inpuut}
                    placeholder= 'fName'
                    onChangeText={props.handleChange('fName')}
                    value={props.values.fName}
                    ></TextInput>
                     <TextInput
                    style= {globalStyles.inpuut}
                    placeholder= 'iName'
                    onChangeText={props.handleChange('iName')}
                    value={props.values.lName}
                    ></TextInput>
                    <TextInput
                    style= {globalStyles.inpuut}
                    placeholder= 'score'
                    onChangeText={props.handleChange('score')}
                    value={props.values.score}
                    ></TextInput>
                    <Button title='submit' color='maroon' onPress={props.handleSubmit}></Button>
                </View>
            )}
            </Formik>

        </View>
    )
}