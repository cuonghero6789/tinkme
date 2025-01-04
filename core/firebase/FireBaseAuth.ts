import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
GoogleSignin.configure({
    webClientId: '745936822115-8abv2v3uj5u9dkcepc059cv1i207mdf1.apps.googleusercontent.com',
    offlineAccess: false
});
export default class FireBaseAuth {
    static async getIdToken() {
        return await auth().currentUser?.getIdToken();
    }
    static async onFacebookLogin() {
        // Attempt login with permissions
        const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
            return null;
            // throw 'User cancelled the login process';
        }

        // Once signed in, get the users AccesToken
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
            return null;
            // throw 'Something went wrong obtaining access token';
        }

        // Create a Firebase credential with the AccessToken
        const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

        // Sign-in the user with the credential
        await auth().signInWithCredential(facebookCredential);
        const _idToken = await auth()?.currentUser?.getIdToken();
        return _idToken;
    }
    static async onAppleLogin() {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
        });
            // Ensure Apple returned a user identityToken
            if (!appleAuthRequestResponse.identityToken) {
                throw 'Apple Sign-In failed - no identify token returned';
            }
            // Create a Firebase credential from the response
            const { identityToken, nonce } = appleAuthRequestResponse;
            const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
            // Sign the user in with the credential
             await auth().signInWithCredential(appleCredential);
            const idToken = await auth()?.currentUser?.getIdToken();
            return idToken;
    }
    static async onGoogleLogin() {
        try {
            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const { data } = await GoogleSignin.signIn();
            if (!data?.idToken) return null;
            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);
            const _idToken = await auth()?.currentUser?.getIdToken();
            return _idToken;

        } catch (error: Error | any) {
            console.log('error google login ==== ', JSON.stringify(error));
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
            return null;
        }
    }
}