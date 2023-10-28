// Asegúrate de cargar Firebase antes de ejecutar el código
(function () {
    console.log("starting script..  !!")
})();

// Importa Firebase y Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

// Luego, ejecuta el código cuando Firebase se haya cargado
initializeApp({
    apiKey: "AIzaSyABTJUPhyN-f4arqjgK9tLUtRTmv-BLjyo",
    authDomain: "chat-clone-gpt.firebaseapp.com",
    projectId: "chat-clone-gpt",
    storageBucket: "chat-clone-gpt.appspot.com",
    messagingSenderId: "777240212975",
    appId: "1:777240212975:web:128dfee625e88b19e2b21a"
});

(function () {

    var me = {
        name: 'script automation',
        data: {},
        fn: {
            setCookie: function (cName, cValue, expDays) {
                var date = new Date();
                date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000));
                var expires = "expires=" + date.toUTCString();
                document.cookie = cName + "=" + cValue + "; " + expires + "; path=/";
            },
            getCookie: function (cName) {
                var name = cName + "=";
                var cDecoded = decodeURIComponent(document.cookie);
                var cArr = cDecoded.split('; ');
                var res = null;
                cArr.forEach(function (val) {
                    if (val.indexOf(name) === 0) res = val.substring(name.length);
                });
                return res;
            },
            generarIdentificadorUnico: function () {
                var numeroAleatorio = Math.random();
                var identificadorUnico = Math.floor(numeroAleatorio * 1000000); // Ajusta el rango según tus necesidades
                return identificadorUnico.toString();
            }
        },
        run: function () {
            setTimeout(function () {
                console.log("running script firebase");

                // Obtiene una instancia de Firestore
                const firestore = getFirestore();

                // Datos que deseas guardar en Firestore
                const dataToSave = {
                    user: 'user_default',
                    url: location.pathname,
                    fecha: new Date()
                };

                // Función para guardar datos en Firestore
                async function saveDataToFirestore() {
                    try {
                        const docRef = await addDoc(collection(firestore, 'user_default'), dataToSave);
                        console.log('Documento guardado con ID:', docRef.id);
                    } catch (error) {
                        console.error('Error al guardar datos:', error);
                    }
                }

                // Llama a la función para guardar datos en Firestore
                saveDataToFirestore();
            }, 500);
        }
    }

    return me;
})().run();
