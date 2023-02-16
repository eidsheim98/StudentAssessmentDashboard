import REACT from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native/';
import { Formik} from 'formik';
import { globalStyles } from '/home/nikolai/WebstormProjects/StudentAssessmentDashboard/styles/global';
import { db } from "/home/nikolai/WebstormProjects/StudentAssessmentDashboard/firebaseConfig.js";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";


export default function UpdateForm() {
    return(
        <View style={globalStyles.sectionContainer}>
            <Formik
            initialValues={{DOB: '', Grade: '', ClassID: '', className: '', fName: '', lName: '', score: ''}}
            onSubmit={(values, action) => {
                action.resetForm();
                 updateDoc(doc(db, "students", fName + " " + lName), {
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
                    placeholder= 'lName'
                    onChangeText={props.handleChange('lName')}
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