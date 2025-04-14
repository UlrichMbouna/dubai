import Http from './Http'; // Assurez-vous d'utiliser le bon chemin relatif




export function partenaire(data1,montantA) {
    // console.log('data1 image ppppppppppppppppppp', data1)
    return dispatch => (
        new Promise((resolve, reject) => {
            // Envoi de la requête POST avec multipart/form-data
            Http.post(`caisse`, {
                montantCaisse:montantA,
                nomClient: data1.nomClient,
                depot: data1.depot,
                coutService: data1.coutService,
                montantAeroport: data1.montantAeroport,
                montantTaxi: data1.montantTaxi,
                
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(function (res) {
                    console.log("Bénéficiaire enregistré avec succès:", res);

                    resolve(res);  // Résolution si l'enregistrement est réussi
                })
                .catch(err => {

                    if (!err.response) {
                        // Erreur réseau (serveur en panne ou pas d'internet)
                        const data = { notNetwork: true };
                        // const message_ = "Vérifiez votre connexion internet.";
                        // dispatch(action.set_MESSAGE_INVALID_CREDENTIAL(message_))
                        // console.log('data ssssssssss', data)
                        return reject(data);
                    } else {
                        const statusCode = err.response.status; // Statut de l'erreur
                        const data = {
                            error: null,
                            statusCode: statusCode,
                            notNetwork: false
                        };
                        if (statusCode === 400 || statusCode === 401 || statusCode === 422) {
                            // Gestion des erreurs selon le statut HTTP
                            data.error = err.response.data.message;
                        }
                        return reject(data);
                    }
                });
        }));
}
export function getCaisseList() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(`caisse`)
                .then(function (res) {
                    console.log("Liste des caisses récupérée avec succès:", res);
                    resolve(res.data);  // on renvoie uniquement les données
                })
                .catch(err => {
                    if (!err.response) {
                        const data = { notNetwork: true };
                        return reject(data);
                    } else {
                        const statusCode = err.response.status;
                        const data = {
                            error: err.response.data.message || 'Erreur inconnue',
                            statusCode: statusCode,
                            notNetwork: false
                        };
                        return reject(data);
                    }
                });
        })
    );
}
export function getlast() {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(`last`)
                .then(function (res) {
                    console.log("Liste des caisses récupérée avec succès:", res);
                    resolve(res.data);  // on renvoie uniquement les données
                })
                .catch(err => {
                    if (!err.response) {
                        const data = { notNetwork: true };
                        return reject(data);
                    } else {
                        const statusCode = err.response.status;
                        const data = {
                            error: err.response.data.message || 'Erreur inconnue',
                            statusCode: statusCode,
                            notNetwork: false
                        };
                        return reject(data);
                    }
                });
        })
    );
}

export function getClient(id) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.get(`caisse/${id}`)
                .then(function (res) {
                    console.log("Liste des caisses récupérée avec succès:", res);
                    resolve(res.data);  // on renvoie uniquement les données
                })
                .catch(err => {
                    if (!err.response) {
                        const data = { notNetwork: true };
                        return reject(data);
                    } else {
                        const statusCode = err.response.status;
                        const data = {
                            error: err.response.data.message || 'Erreur inconnue',
                            statusCode: statusCode,
                            notNetwork: false
                        };
                        return reject(data);
                    }
                });
        })
    );
}

