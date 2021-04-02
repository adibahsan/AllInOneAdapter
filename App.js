import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {StyleSheet, Text, View, Button, ToastAndroid} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import axios from "axios";


export const axiosInstance = axios.create({
    baseURL: "http://192.168.1.192:8081" + "/riders-api",
    responseType: "json",
});


const syncFunction = () =>{
    axiosInstance.get("/sync", {
            headers: {
                Authorization: "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJERU1hbGlNTU1uR05iQlFqMnpIblJVaExiZTRfal9aZEVzdnNFa1hDbkFZIn0.eyJleHAiOjE2MjQ1NDQ3NDksImlhdCI6MTYxNzM0NDc0OSwianRpIjoiYzc4ZmQ4MDYtYjFiYS00MTVjLWJhMGUtOWIzOGQyZDVmZjk5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo5MDkwL2F1dGgvcmVhbG1zL0FwcGlnby1EZWxpdmVyeSIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiJiNWFmNmU0Ny1hOTkwLTQ3NTUtYThiNi00NjE1NWJlMmE4YWUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhcHBpZ28tZGVsaXZlcnktYXBwIiwic2Vzc2lvbl9zdGF0ZSI6IjE3N2EzNjhmLTNmYjgtNDg0MC04NWFjLWI2MDRjYzMxODE5YSIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9kZWxpdmVyeS5hcHBpZ28vIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIiwiUklERVIiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6ImVtYWlsIHByb2ZpbGUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6InJpZGVyIiwiZW1haWwiOiJyaWRlckBnbWFpbC5jb20ifQ.Zac15KiwVN2EeTslnxjdev2qHkebx9v9qB-Y153y3cizQGsYykaDK2mLMh7nfnBlqVR8v02joCeQNaze_Bpr_f0L6nmFHiznixEpgPO0YyDJKGsA2Z3KHkJMxLj9X9dnNhfjP3jkSWGX8tS1k-60T0LRGqX2lUVEHKiRIW7qgd9QJO6Eej0KCiFEbmaHs0-FLsI_wlsxnrNyQSetenJZcpECgZ0Hd_5Ieu30BR_A9OesgUWveSxvO_Gj6tt1_QyNB697J4jqiQjqeO2eXpHMtpg_0fWF6RXjWoSqWdmyWY3Loe8pj3Nx4bBsozDeJu88Cj8MMUJYsreN6RZQQtW8lA"
            },
        },
    ).then((response) => {
        console.log("Sync OK");
        if (response.status === 200) {
            ToastAndroid.showWithGravity(
                "Connection OK",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
    }, (error) => {
        console.log(error.toString());
    });
}

const registerBackgroundTimer = () => {
    console.log("Setting Timer");
    syncFunction();
    BackgroundTimer.runBackgroundTimer(() => {
//code that will be called every 15 seconds
            console.log("Update in Background");
            syncFunction();
        },
        15000);
}

const stopTimer = () => {
    console.log("Stopping Timer Before")
    BackgroundTimer.stopBackgroundTimer();
    console.log("Stopping Timer")
}

console.log("AxiosInstance", axiosInstance.defaults.baseURL);

export default function App() {
    return (
        <View style={styles.container}>
            <Text>Open up App.js to start working on your app!</Text>

            <View style={styles.containerTwo}>
                <View style={styles.buttonContainer}>
                    <Button onPress={
                        registerBackgroundTimer
                    } title="Background Timer"/>
                </View>
                <View style={styles.buttonContainer}>
                    <Button color ="red" title="Off" onPress={
                        stopTimer
                    } />
                </View>
            </View>

            <View style={styles.containerTwo}>
                <View style={styles.buttonContainer}>
                    <Button onPress={
                        registerBackgroundTimer
                    } title="Headless Task"/>
                </View>
                <View  style={styles.buttonContainer}>
                    <Button color ="red" title="Off" onPress={
                        stopTimer
                    }/>
                </View>
            </View>
            <StatusBar style="auto"/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        flex: 1,
        padding: 5,
        margin: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    horizontalStyle: {
        flex: 1,
        // flexDirection: "row",
    },

    containerTwo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        padding : 5
    },
    buttonContainerRed: {
        flex: 1,
        backgroundColor: "red"
    }
});
