import firebase, {initializeApp} from "firebase/app"
import {getStorage} from 'firebase/storage'
import {upload} from './upload.js'

const firebaseConfig = {
    apiKey: "AIzaSyAcj9bm_HRYO45Rhrgd_44m1Jl2FCWInJU",
    authDomain: "upload-by-minin.firebaseapp.com",
    projectId: "upload-by-minin",
    storageBucket: "upload-by-minin.appspot.com",
    messagingSenderId: "34569101652",
    appId: "1:34569101652:web:3a027a7853633efb0028c1"
}
const app = initializeApp(firebaseConfig);

const storage = getStorage(app)

upload('#file', {
    multi: true,
    accept: ['.png', '.jpg', '.gif', '.jpeg'],
    onUpload(files) {
        files.forEach(file => {
            const ref = storage.ref(`images/${file.name}`)
            const task = ref.put(file)

            task.on('state_changed', snapshot => {
                const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(percentage)
            }, error => {
                console.log(error)
            }, () => {
                console.log('Complete')
            })
        })
    }
})
