import REACT, { useState } from 'react';
import { StyleSheet, Button, TextInput, View, Text } from 'react-native/';
import { Formik} from 'formik';
import { globalStyles } from '../styles/global';
import { db } from "../firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, collection, onSnapshot } from "firebase/firestore";
import { Table, Row, Rows } from 'react-native-table-component';

interface StudentProps {
    tableData:(setValues: any) => (string | JSX.Element | undefined)[][]
}

const tableHead = [
    'First Name',
    'Last Name',
    'DOB',
    'Class ID',
    'Class Name',
    'Grade',
    'Score',
    'Edit', 
    'Remove'
  ];

interface StudentData {
    tableData:(string | JSX.Element | undefined)[][],
    tableHead:string[],
    setValues: any
}

const StudentTable: React.FC<StudentData> = ({tableData, tableHead}) => {
    const [newTableData, setTableData] = useState<string>("")

    return(
        <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={tableHead} style={globalStyles.head} textStyle={{ fontWeight: 'bold', fontSize: 16 }} />
        <Rows data={tableData} textStyle={globalStyles.text} />
      </Table>
    )
}

const StudentForm: React.FC<StudentProps> = ({tableData}) => {    
    return(
        <View style={globalStyles.sectionContainer}>
            <Formik
            initialValues={{DOB: '', Grade: '', ClassID: '', className: '', fName: '', lName: '', score: '', timestamp: ""}}
            onSubmit={(values, action) => {
                action.resetForm();
                let t = "";
                if (values.timestamp == "") {
                    t = Date.now().toString();
                } else {
                    t = values.timestamp;
                }
                setDoc(doc(db, "students", t ), {
                    fName: values.fName,
                    lName: values.lName,
                    DOB: values.DOB,
                    classID: values.ClassID,
                    className: values.className,
                    grade: values.Grade,
                    score: values.score,
                    timestamp: t
                  });
            }}
            >
            {(props) => (
                <View>
                    <TextInput
                    style= {globalStyles.hidden}
                    placeholder= 'Timestamp'
                    onChangeText={props.handleChange('Timestamp')}
                    value={props.values.timestamp}
                    ></TextInput>
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
                    <Button title='clear' color='blue' onPress={props.handleReset}></Button>
                    <StudentTable tableData={tableData(props.setValues)} tableHead={tableHead} setValues={props.setValues}/>                
                    </View>
            )}
            </Formik>

        </View>
    )
}

export default StudentForm;