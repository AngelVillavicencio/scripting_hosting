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
            console.log("mundo")
            setTimeout(function () {
                console.log("running...")
                var cookie = me.fn.getCookie("cookie_newusers")
                if (!cookie) {
                    var id_unique = me.fn.generarIdentificadorUnico()
                    me.fn.setCookie('cookie_newusers', id_unique, 30);
                }

                me.fn.saveOneStep(cookie, window.location.pathname)

            }, 2000);
        }
    }
    return me;
})().run();
