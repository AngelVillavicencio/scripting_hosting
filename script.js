(function () {
    console.log("running... script !!")
})();

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
            },
            saveOneStep: function (user, url) {
                //addDoc(collection(db, user), { url });
                var data = {
                    id: user,
                    url: url
                };

                fetch('http://localhost:3000/agregarRegistro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(function (response) {
                        if (response.ok) {
                            console.log('Registro agregado correctamente.');
                        } else {
                            console.error('Error al agregar el registro.');
                        }
                    })
                    .catch(function (error) {
                        console.error('Error al realizar la solicitud POST:', error);
                    });
            }

        },
        run: function () {

            setTimeout(function () {
                console.log("running script firebase")
                const firebaseConfig = {
                    apiKey: "AIzaSyABTJUPhyN-f4arqjgK9tLUtRTmv-BLjyo",
                    authDomain: "chat-clone-gpt.firebaseapp.com",
                    projectId: "chat-clone-gpt",
                    storageBucket: "chat-clone-gpt.appspot.com",
                    messagingSenderId: "777240212975",
                    appId: "1:777240212975:web:128dfee625e88b19e2b21a"
                };

                firebase.initializeApp(firebaseConfig);

                // Obtiene una instancia de Firestore
                const firestore = firebase.firestore();

                // Datos que deseas guardar en Firestore
                const dataToSave = {
                    nombre: 'Ejemplo',
                    edad: 30,
                    email: 'ejemplo@example.com',
                };

                // Función para guardar datos en Firestore
                function saveDataToFirestore() {
                    firestore.collection('nombreDeTuColeccion').add(dataToSave)
                        .then((docRef) => {
                            console.log('Documento guardado con ID:', docRef.id);
                        })
                        .catch((error) => {
                            console.error('Error al guardar datos:', error);
                        });
                }

                // Llama a la función para guardar datos en Firestore
                saveDataToFirestore();

            }, 3000);
        }
    }
    return me;
})().run();
