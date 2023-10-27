// Asegúrate de cargar Firebase antes de ejecutar el código
(function () {
    console.log("starting script..  !!")
})();

// Importa Firebase y Firestore
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js';

// Luego, ejecuta el código cuando Firebase se haya cargado
initializeApp({
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID"
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
                    nombre: 'Ejemplo',
                    edad: 30,
                    email: 'ejemplo@example.com',
                };

                // Función para guardar datos en Firestore
                async function saveDataToFirestore() {
                    try {
                        const docRef = await addDoc(collection(firestore, 'nombreDeTuColeccion'), dataToSave);
                        console.log('Documento guardado con ID:', docRef.id);
                    } catch (error) {
                        console.error('Error al guardar datos:', error);
                    }
                }

                // Llama a la función para guardar datos en Firestore
                saveDataToFirestore();
            }, 3000);
        }
    }

    return me;
})().run();
