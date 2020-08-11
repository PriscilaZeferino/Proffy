import React, { ReactNode } from 'react';
import { View, Image, Text } from 'react-native';

import backIcon from '../../src/assets/images/icons/back.png'
import logoIcon from '../../src/assets/images/logo.png'


import { BorderlessButton, ScrollView} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

interface PageHeaderProps {
    title:string;
    headerRight?: ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({title, children, headerRight}) => {


    const {navigate} = useNavigation();
    function handleGoBack()
    {
        navigate('Landing')
    }
    return (

        <View style={styles.container}>

            <View style={styles.topBar}>
                <BorderlessButton onPress={handleGoBack}>
                    <Image source={backIcon} resizeMode="contain"/>
                </BorderlessButton>
                    <Image source={logoIcon} resizeMode="contain"/>
            </View>
                <View style={styles.header}>
                <Text style={styles.title}>{title}</Text>
                    {headerRight}
                </View>
                
               <ScrollView> 
                {children}
                </ScrollView>
               

        </View>
    )
}
export default PageHeader;