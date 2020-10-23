import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'
import DrawerScreen from '../DrawerScreen/DrawerScreen';

export default function HomeScreen(props) {

    const [entities, setEntities] = useState([])

    const [entityText, setEntityText] = useState('')
    const [entityJob, setEntityJob] = useState('')
    const [entityDes, setEntityDes] = useState('')
    const [entityProfit, setEntityProfit] = useState('')

    const entityRef = firebase.firestore().collection('CompanyEntities')
    const contactRef = firebase.firestore().collection('CompanyContact')
    const userID = props.extraData.id

 

    useEffect(() => {
        entityRef
            .where("authorID", "==", userID)
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                querySnapshot => {
                    const newCompanyEntities = []
                    querySnapshot.forEach(doc => {
                        const CompanyEntities = doc.data()
                        CompanyEntities.id = doc.id
                        newCompanyEntities.push(CompanyEntities)
                    });
                    setEntities(newCompanyEntities)
                    
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const onAddButtonPress = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                job: entityJob,
                description: entityDes,
                Profit: entityProfit,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const onAddButtonDelete = () => {
        if (entityText && entityText.length > 0) {
            const timestamp = firebase.firestore.FieldValue.serverTimestamp();
            const data = {
                text: entityText,
                job: entityJob,
                description: entityDes,
                Profit: entityProfit,
                authorID: userID,
                createdAt: timestamp,
            };
            entityRef
                .add(data)
                .then(_doc => {
                    setEntityText('')
                    Keyboard.dismiss()
                })
                .catch((error) => {
                    alert(error)
                });
        }
    }

    const renderEntity = ({item}) => {
        return (
            <View style={styles.container}>
                <View style={styles.entityButton}>
                    <TouchableOpacity                             
                                onPress={() =>
                                navigation.navigate(
                                    'Job',
                                    { id: item.id }
                                    )
                                }>
                        <Text style={styles.buttonText}>Apply</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.formContainer}>
                    <Text>
                        บริษัท {item.text}
                    </Text>
                    <Text>
                        งาน {item.job}
                    </Text>
                    <Text>
                        รายละเอียด {item.description}
                    </Text>
                    <Text>
                        รายได้ {item.Profit}
                    </Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            {/* <DrawerScreen/> */}
                <View>
                    <TextInput
                        placeholder='Add new entity'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityText(text)}
                        value={entityText}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder='Job'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityJob(text)}
                        value={entityJob}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder='Description'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityDes(text)}
                        value={entityDes}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput
                        placeholder='Profit'
                        placeholderTextColor="#aaaaaa"
                        onChangeText={(text) => setEntityProfit(text)}
                        value={entityProfit}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TouchableOpacity onPress={onAddButtonPress}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                { entities && (
                    <View>
                        <View>
                            <FlatList
                                data={entities}
                                renderItem={renderEntity}
                                keyExtractor={(item) => item.id}
                                removeClippedSubviews={true}
                            />
                        </View>
                    </View>
                )}
        </View>
    )
}
