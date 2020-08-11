import React, { useState, FormEvent, useEffect, Component } from 'react';

import { View, ScrollView, Text, TextInput} from 'react-native';

import {Feather} from '@expo/vector-icons'
import PageHeader from '../../../components/PageHeader';
import TeacherItem, { Teacher } from '../../../components/TeacherItem';
import {BorderlessButton, RectButton } from 'react-native-gesture-handler';

import styles from './styles'
import api from '../../services/api';
import AsyncStorage from '@react-native-community/async-storage'
function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false); 
    
    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites()
    {
        AsyncStorage.getItem('favorites').then(response => {
            if(response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
                    return teacher.id;
                })
                setFavorites(favoritedTeachersIds);
            }
        })
    }

    function handleToggleFiltersVisible() {
        setIsFiltersVisible(!isFiltersVisible);
    }

    async function handleFiltersSubmit(){

        loadFavorites();
        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setIsFiltersVisible(false)
        setTeachers(response.data)
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible}>
                        <Feather name="filter" size={20} color={"#FFF"}/>
                    </BorderlessButton>
                )}
            >
                {isFiltersVisible && (
                
                <View style={styles.searchForm}> 

                <Text style={styles.label}>
                        Matéria
                    </Text>
                    <TextInput
                         value={subject}
                        onChangeText={text => setSubject(text)}
                        style={styles.input}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#c1bccc"
                       
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput style={styles.input}
                                   value={week_day}
                                   onChangeText={text => setWeekDay(text)}
                                   placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc"
                            

                            />
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Hora</Text>
                            <TextInput style={styles.input}
                                    value={time}
                                    onChangeText={text => setTime(text)}
                                placeholder="Qual a hora?"
                                placeholderTextColor="#c1bccc"
                        

                            />
                        </View>
                    </View>  

                    <RectButton onPress={handleFiltersSubmit} style={styles.submitButton} >
                        <Text style={styles.submitButtonText}> Filtrar</Text>
                    </RectButton>

                </View>
                )}
            </PageHeader>
           
            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher: Teacher)=> {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList;