import React, { useEffect, useState } from 'react'
import { FlatList, Keyboard, Text, Card, TextInput, Button, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native'
import styles from './styles';
import { firebase } from '../../firebase/config'

export default function JobScreen({ navigation, route }) {

    const [entityText, setEntityText] = useState('')
    const [entities, setEntities] = useState([])

    const user = route.params.user
    const itemId = route.params.id
    const company = route.params.company

    const entityRef = firebase.firestore().collection('CompanyEntities').where(firebase.firestore.FieldPath.documentId(), '==', itemId)
    const contactRef = firebase.firestore().collection('CompanyContact')


    useEffect(() => {
        entityRef
            .onSnapshot(
                querySnapshot => {
                    const newEntities = []
                    querySnapshot.forEach(doc => {
                        const entity = doc.data()
                        entity.id = doc.id
                        newEntities.push(entity)
                    });
                    setEntities(newEntities)
                },
                error => {
                    console.log(error)
                }
            )
    }, [])

    const renderEntity = ({item}) => {
        return (
            <View>
                <View style={{ alignItems: 'center'}}>
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 350, height: 200 , marginTop: 10, }}
                        PlaceholderContent={<ActivityIndicator />}
                    />
                </View>
                <View style={styles.formContainer}>
                    <Text>
                        บริษัท: {item.text}
                    </Text>
                    <Text>
                        ตำแหน่งงาน: {item.job}
                    </Text>
                    <Text>
                        รายละเอียด: {item.description}
                    </Text>
                    <Text>
                        ค่าจ้าง: {item.Profit}
                    </Text>
                </View>
            </View>
        )
    }


    return (
        <View>
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
                {/* <View style={styles.entityButton}>
                    <TouchableOpacity 
                        onPress={() =>
                            navigation.navigate(
                                'Edit',{ userID: user, itemId: itemId }
                                )
                            }>
                        <Text>Edit</Text>
                    </TouchableOpacity>            
                </View> */}
                <View style={styles.entityButton}>
                    <View style={{alignItems: "center"}}>
                        <TouchableOpacity style={styles.button}onPress={() =>
                            navigation.navigate(
                                'Edit',{ userID: user, itemId: itemId }
                                )
                            }>
                            <Text style={styles.buttonText}>
                                แก้ไขข้อมูล
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>          
        </View>
    )
}