import React from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native'
import ViewShot from 'react-native-view-shot';
import * as MailComposer from 'expo-mail-composer'

global.Intl = require('intl');

import logoImg from '../../assets/assets-app-mobile/logo.png'

import styles from './style'

export default function Detail(){
    const route = useRoute()
    const navigation = useNavigation()

    const incident = route.params.incident
    const message = `olá ${incident.name}, gostaria de ajudar no caso da ${incident.title} 
                     com o valor de ${incident.value}, pode me passar as informações necessárias?  ` 

    function navigateToHome(){
        navigation.navigate('Incidents')
    }

    function sendEmail(){
        MailComposer.composeAsync({
            subject: `Heroi do caso: ${incident.title}`,
            recipients: [incident.email],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}text=${message}`)
    }

    return(
        <View style = {styles.container} >

            <View style = {styles.header} >
                <Image source = {logoImg} />
                <TouchableOpacity onPress = {navigateToHome}>
                    <Feather name = 'arrow-left' size={28} color = '#E82041'/>
                </TouchableOpacity>
            </View>

            <View style = {styles.incident}>
                <Text style = {[styles.incidentProperty, {marginTop: 0}]}>ONG: </Text>
                <Text style = {styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style = {styles.incidentProperty}>CASO </Text>
                <Text style = {styles.incidentValue}>{incident.title}</Text>

                <Text style = {styles.incidentProperty}>VALOR: </Text>
                <Text style = {styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {   
                           style:'currency', 
                           currency:'BRL'
                    }).format(incident.value)}     
                 </Text>
            </View>
            
            <View style =  {styles.contactBox}>
                <Text style = {styles.heroTitle}> Salve o dia! </Text>
                <Text style = {styles.heroTitle}> Seja o herói desse caso. </Text>

                <Text style = {styles.heroDescription}> Entre em contato: </Text>

                <View style = {styles.actions}>

                    <TouchableOpacity style = {styles.action} onPress={sendWhatsapp}>
                        <Text style = {styles.actionText}>
                            Whatsapp
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style = {styles.action} onPress={sendEmail}>
                        <Text style = {styles.actionText}>
                            E-mail
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    )
}