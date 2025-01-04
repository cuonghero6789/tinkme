import messaging from '@react-native-firebase/messaging';
export default class FirebaseNotify {
    static async requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
        }
    }
    static async getToken() {
        let token = await messaging().getToken();
        console.log('fcm token === ', token);

        if (token) {
            // update token
        }
    }
}