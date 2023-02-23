import REACT, { useState, useEffect } from 'react';
import { StyleSheet, Button, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native/';
import { Formik } from 'formik';
import { globalStyles } from '../styles/global';
import { db, auth } from "../firebaseConfig";
import { doc, getDoc, setDoc, deleteDoc, updateDoc, collection, onSnapshot, Firestore, addDoc } from "firebase/firestore";
import { Table, Row, Rows } from 'react-native-table-component';



export default function FormDatabase({ navigation }: { navigation: any }) {
    const presshandler = () => {
        navigation.navigate('barChart')
    }
    
    interface Student {
        fName: string;
        lName: string;
        DOB: string;
        classID: string;
        className: string;
        grade: string;
        score: string;
        timestamp: string;
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

    const [documents, setDocuments] = useState<Student[]>([]);
    useEffect(() => {
        const colRef = collection(db, "students");

        onSnapshot(colRef, (docSnap) => {
            const newDocuments: Student[] = [];

            docSnap.forEach((doc) => {
                const data = doc.data() as Student;
                newDocuments.push(data);
            });

            setDocuments(newDocuments);
        });
    }, []);

    const studentData = (setValues: any) => {
        return documents.map((document) => {
            const { fName, lName, DOB, classID, className, grade, score, timestamp } = document;
            return [
                fName,
                lName,
                DOB,
                classID,
                className,
                grade,
                score,
                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity onPress={() => setValues({
                        "fName": fName,
                        "lName": lName,
                        "DOB": DOB,
                        "ClassID": classID,
                        "className": className,
                        "Grade": grade,
                        "score": score,
                        "timestamp": timestamp
                    })}>
                        <Text style={globalStyles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </View>,
                ,
                <View style={globalStyles.buttonContainer}>
                    <TouchableOpacity onPress={() => removeDetails(document)}>
                        <Text style={globalStyles.buttonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            ];
        });
    }


    const removeDetails = (document: Student) => {
        const colRef = collection(db, "students");
        const docRef = doc(colRef, document.timestamp);

        deleteDoc(docRef)
            .then(() => {
                console.log("Document successfully deleted!");
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
            });
    };


    interface StudentProps {
        tableData: (setValues: any) => (string | JSX.Element | undefined)[][]
    }


    interface StudentData {
        tableData: (string | JSX.Element | undefined)[][],
        tableHead: string[],
        setValues: any
    }

    const StudentTable: React.FC<StudentData> = ({ tableData, tableHead, setValues }) => {
        const [newTableData, setTableData] = useState<string>("")

        return (
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
                <Row data={tableHead} style={globalStyles.head} textStyle={{ fontWeight: 'bold', fontSize: 16, color: 'black' }} />
                <Rows data={tableData} textStyle={globalStyles.text} />
            </Table>
        )
    }

    const StudentForm: React.FC = ({ }) => {
        return (
            <View style={globalStyles.sectionContainer}>
                <Formik
                    initialValues={{ DOB: '', Grade: '', ClassID: '', className: '', fName: '', lName: '', score: '', timestamp: "" }}
                    onSubmit={(values, action) => {
                        action.resetForm();
                        let t = "";
                        if (values.timestamp == "") {
                            t = Date.now().toString();
                        } else {
                            t = values.timestamp;
                        }
                        setDoc(doc(db, "students", t), {
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
                                style={globalStyles.hidden}
                                placeholder='Timestamp'
                                onChangeText={props.handleChange('Timestamp')}
                                value={props.values.timestamp}
                            ></TextInput>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='DOB'
                                placeholderTextColor={'black'}
                                onChangeText={props.handleChange('DOB')}
                                value={props.values.DOB}
                            ></TextInput>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='Grade'
                                placeholderTextColor={'black'}
                                onChangeText={props.handleChange('Grade')}
                                value={props.values.Grade}
                            ></TextInput>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='ClassID'
                                placeholderTextColor={'black'}
                                onChangeText={props.handleChange('ClassID')}
                                value={props.values.ClassID}
                            ></TextInput>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='className'
                                placeholderTextColor={'black'}
                                onChangeText={props.handleChange('className')}
                                value={props.values.className}
                            ></TextInput>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='fName'
                                placeholderTextColor={'black'}
                                onChangeText={props.handleChange('fName')}
                                value={props.values.fName}
                            ></TextInput>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='lName'
                                placeholderTextColor={'black'}
                                onChangeText={props.handleChange('lName')}
                                value={props.values.lName}
                            ></TextInput>
                            <TextInput
                                style={globalStyles.input}
                                placeholder='score'
                                placeholderTextColor={'black'}
                                onChangeText={props.handleChange('score')}
                                value={props.values.score}
                            ></TextInput>
                            <Button title='submit' color='maroon' onPress={props.handleSubmit}></Button>
                            <Button title='clear' color='blue' onPress={props.handleReset}></Button>
                            <StudentTable tableData={studentData(props.setValues)} tableHead={tableHead} setValues={props.setValues} />
                        </View>
                    )}
                </Formik>

            </View>
        )
    }


    return (
        <View style={globalStyles.container}>
            <ScrollView>
                <Text style={globalStyles.text}>This is the Database and form to fill out</Text>
                <StudentForm />
                <Button title="Go to barchart" onPress={presshandler} />
            </ScrollView>
        </View>
    )
}