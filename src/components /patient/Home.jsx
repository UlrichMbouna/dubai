import React, { use, useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { getCaisseList, getClient, getlast, partenaire } from '../../services/service';
import getid from '../../store/action';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';




const Home = () => {
    const [montantupdate, setMontantupdate] = useState(false)
    const [montant, setMontant] = useState();
    const [listeCaisse, setListe] = useState(false);
    const idRedux = useSelector((state) => state.hostoReducer.ID);
    console.log("idRedux", idRedux);

    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);
    const [menu, setMenu] = useState(true)
    const [enregistrement, setEnregistrement] = useState(false)
    const [historique, setHistorique] = useState(false)
    const today = new Date();
    const formattedDate = new Date().toISOString();
    console.log("formattedDate", formattedDate);
    const handleudpatemontant = () => {
        setMontantupdate(!montantupdate)
    }
    const handleenregistrement = () => {
        setEnregistrement(!enregistrement);
        handleMenueChange()
    }
    const handlehistorique = () => {
        setHistorique(!historique)
    }
    const handleMenueChange = () => {
        setMenu(!menu)

    }
    // Formulaires
    const [signInData, setSignInData] = useState({
        caisse: '',
        date: formattedDate
    });
    const handleChange = (e) => {
        const { name, value } = e.target;

        setClientData(prevState => ({
            ...prevState,
            [name]: Number(value) // 🔥 conversion ici !
        }));
    };
    const handleChange2 = (e) => {
        const { name, value } = e.target;

        setSignInData(prevState => ({
            ...prevState,
            [name]: Number(value) // 🔥 conversion ici !
        }));
    };
    console.log("signInData", signInData);

    const [clientData, setClientData] = useState({
        caisse: montant,
        nomClient: '',
        depot: "",
        coutService: "",
        montantAeroport: "",
        montantTaxi: "",
        // date: formattedDate
    });
    // Quand signInData change, on met à jour clientData
    useEffect(() => {
        setClientData(prev => ({
            ...prev,
            caisse: signInData.caisse
        }));
    }, [signInData.caisse]);
    const calculAmount = () => {
        const montantA = (amount + clientData.depot) - (clientData.montantAeroport + clientData.montantTaxi + clientData.coutService)
        setMontant(montantA);
        // setClientData({ ...clientData, caisse: montantA }); 
        console.log("montant222222222221111111", montantA);
    }
    const handleSubmitClient = (e) => {
        e.preventDefault();
        const montantA = (amount + clientData.depot) - (clientData.montantAeroport + clientData.montantTaxi + clientData.coutService)

        console.log("Données du client soumises : ", montantA);



        dispatch(partenaire(clientData, montantA))
            .then((res) => {
                console.log("Données du client enregistrées avec succès : ", res);
                render();
                handleMenueChange();
                handleenregistrement();

            })
            .catch((err) => {
                console.error("Erreur lors de l'enregistrement des données du client : ", err);
            });



    }
    const handleSubmitClient2 = (e) => {
        e.preventDefault();
        console.log("Données du client soumises : ", signInData);


        dispatch(partenaire(signInData))
            .then((res) => {
                console.log("Données du client enregistrées avec succès : ", res);
                render();
                handleudpatemontant();
                window.location.reload();
            })
            .catch((err) => {
                console.error("Erreur lors de l'enregistrement des données du client : ", err);
            });
    }
    const handleMenuEnregistrement = () => {
        handleMenueChange();
        handleenregistrement();
    }
    useEffect(() => {
        getclientDetail();
        if (idRedux) {
            console.log("ID du client récupéré : ", idRedux);
            getclientDetail();
        } else {
            console.log("Aucun ID de client trouvé dans le store Redux.");
        }
    }, [idRedux])
    const getclientDetail=()=>{
        dispatch(getClient(idRedux))
            .then((res) => {
                console.log("Données du client récupérées avec succès : ", res);
                generatePDF(res);

               
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des données du client : ", err);
            });
    }

    
      
    const generatePDF = (jsonData) => {
        const doc = new jsPDF();
    
        // Titre du document
        doc.setFontSize(16);
        doc.text('Réponse du Backend', 10, 10);
    
        // Formatage du JSON dans le PDF
        const jsonText = JSON.stringify(jsonData, null, 2); // indentation
        const lines = doc.splitTextToSize(jsonText, 180); // ajuster à la largeur de la page
    
        doc.setFontSize(10);
        doc.text(lines, 10, 20);
    
        // Sauvegarder le PDF
        doc.save('reponse-backend.pdf');
      };

    const handleMenuEnregistrement1 = () => {
        handleMenueChange();
        setListe(!listeCaisse);
    }
    const [liste, setListes] = useState()
    console.log("listes", liste);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await dispatch(getCaisseList());
                console.log("sssssssssssss22222222: ", response);
                setListes(response)
            } catch (error) {
                console.error("Erreur lors de la récupération des données du client : ", error);
            }
        };

        fetchData();
    }, [])
    useEffect(() => {
        render();
        calculAmount();
    }, [signInData, clientData, amount])
    const render = () => {
        dispatch(getlast())
            .then((res) => {
                console.log("Données du client récupérées avec succès : ", res);
                setAmount(Number(res.montantCaisse));
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des données du client : ", err);
            });
    }
    const [currentPage, setCurrentPage] = useState(1); // Page actuelle
    const itemsPerPage = 10; // Nombre d'éléments par page

    // On commence par inverser la liste pour afficher les plus récents en premier
    const reversedList = Array.isArray(liste) ? liste.slice().reverse() : [];

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(reversedList.length / itemsPerPage);

    // Déterminer les éléments à afficher selon la page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = reversedList.slice(indexOfFirstItem, indexOfLastItem);



    return (
        <>
            <img src="./assets/images/bgimg.jpg" alt="Background" className="background-image" />

            <div className="container1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>

                {enregistrement &&
                    <>
                        <div className="content" style={{ boxShadow: ' 0 4px 8px rgba(0,0,0,0.2)', padding: 20, zIndex: 1, background: 'white', border: '1px solid White', borderRadius: '10px', width: 650, height: "auto", position: 'relative' }}>
                            <i className="fas fa-times icon-red fa-2x" onClick={handleMenuEnregistrement} />

                            <p style={{ fontSize: '24px' }}>Bienvenue <span style={{ fontWeight: 'bold' }}>M. Felix ,</span> dans votre boutique</p>
                            <p style={{ fontSize: 14, textAlign: 'center', marginTop: 10 }}> Entrez les informations du client</p>
                            <form onSubmit={handleSubmitClient}>
                                <div className="input-field" style={{ width: 400, marginTop: 20 }}>
                                    <i className="fas fa-user" />
                                    <input
                                        type="text"
                                        required
                                        placeholder="Entrez le nom du client"
                                        value={clientData.nomClient}
                                        onChange={(e) => setClientData({ ...clientData, nomClient: e.target.value })}
                                    />
                                </div>

                                <div className="input-field" style={{ width: 400, marginTop: 20 }}>
                                    <i className="fas fa-money-bill" />
                                    <input
                                        type="number"
                                        name="depot"
                                        required
                                        placeholder="Entrez le montant du dépôt"
                                        value={clientData.depot}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-field" style={{ width: 400, marginTop: 20 }}>
                                    <i className="fas fa-cogs" />
                                    <input
                                        type="number"
                                        name="coutService"
                                        required
                                        placeholder="Entrez le coût du service"
                                        value={clientData.coutService}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-field" style={{ width: 400, marginTop: 20 }}>
                                    <i className="fas fa-plane-departure" />
                                    <input
                                        type="number"
                                        name="montantAeroport"

                                        required
                                        placeholder="Montant utilisé à l'aéroport"
                                        value={clientData.montantAeroport}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="input-field" style={{ width: 400, marginTop: 20 }}>
                                    <i className="fas fa-taxi" />
                                    <input
                                        type="number"
                                        name="montantTaxi"
                                        required
                                        placeholder="Montant utilisé pour le taxi"
                                        value={clientData.montantTaxi}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="Submit" className="btn" >confirmer</button>
                            </form>
                        </div>

                    </>
                }
                {
                    listeCaisse &&
                    <>

                        <div className="content" style={{
                            paddingTop: '200px',
                            border: '1px dashed green',
                            width: 550,
                            maxHeight: 700,
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                            padding: 20,
                            zIndex: 1,
                            background: 'white',
                            borderRadius: '10px',
                            position: 'relative'
                        }}>

                            <div style={{position:'relative'}}>
                            <i className="fas fa-times icon-red2 fa-2x" onClick={handleMenuEnregistrement1} />

                                <p style={{ fontSize: '24px', }}>Liste des differents enregistrements</p>
                                {/* <p style={{ fontSize: 14, textAlign: 'center', marginTop: 10 }}> Entrez les informations du client</p> */}
                                {currentItems.map((client) => (
                                    <Detail
                                        id={client.id} // Utilise l'id pour la clé unique
                                        montantCaisse={client.montantCaisse}
                                        nomClient={client.nomClient}
                                        depot={client.depot}
                                        coutService={client.coutService}
                                        montantAeroport={client.montantAeroport}
                                        montantTaxi={client.montantTaxi}
                                        date={client.date}
                                        caisse={client.montantCaisse}
                                    />
                                ))}
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                                    {Array.from({ length: totalPages }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentPage(index + 1)}
                                            style={{
                                                margin: '0 5px',
                                                padding: '5px 10px',
                                                backgroundColor: currentPage === index + 1 ? '#007bff' : '#f0f0f0',
                                                color: currentPage === index + 1 ? '#fff' : '#000',
                                                border: 'none',
                                                borderRadius: '4px',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </>
                }



                {menu && <div className="content" style={{ boxShadow: ' 0 4px 8px rgba(0,0,0,0.2)', padding: 20, zIndex: 1, background: 'white', border: '1px solid White', borderRadius: '10px', width: 650, height: "auto", }}>

                    <p style={{ fontSize: '24px' }}>Bonjour <span style={{ fontWeight: 'bold' }}>M. Felix </span>Soihate, nous sommes ravis de vous accueillir !</p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <p style={{ fontSize: 17, marginTop: 20 }}>- Le montant en caisse est de : <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>{amount} FCFA</span></p>
                        <input style={{ marginTop: 10 }} type="button" className="btn marginTop10" defaultValue="modifier" onClick={handleudpatemontant} />
                    </div>
                    {montantupdate &&
                        <form onSubmit={handleSubmitClient2}>
                            <div className="input-field" style={{ width: 400, marginTop: 20 }}>
                                <i className="fas fa-user" />
                                <input
                                    type="number"
                                    name="caisse"
                                    required
                                    placeholder="Entrez le montant en caisse"
                                    value={signInData.caisse}
                                    onChange={handleChange2}
                                />
                            </div>
                            <input type="submit" className="btn" defaultValue="confirmer" />

                        </form>
                    }
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <p style={{ fontSize: 17, marginTop: 20 }}>- Effectuer un enregistrement pour un <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>nouveau client :</span> <span onClick={handleenregistrement} style={{ textDecoration: 'underline', cursor: 'pointer' }}> Cliquez ici</span></p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 }}>
                        <p style={{ fontSize: 17, marginTop: 20 }}>- Historique des différents enregistrements des <span style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>clients :</span> <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={handleMenuEnregistrement1}> Cliquez ici</span></p>
                    </div>



                </div>}


            </div>
        </>
    );
};

export default Home;


const Detail = ({ date, nomClient, depot, coutService, montantAeroport, montantTaxi,caisse,id }) => {
    const dispatch = useDispatch()

    const getid2 =()=>{
        dispatch(getid(id))
    }

    return (
        <div  onClick={getid2} style={{ 
            border: '1px solid #ddd', 
            borderRadius: '10px',
            width: 350, 
            margin: '20px auto', 
            padding: '20px', 
            textAlign: 'left',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
            fontFamily: 'Arial, sans-serif',
            color: '#333'
          }}>
            <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#555' }}>Informations du Client</h3>
            <p><strong>Nom du client :</strong> {nomClient}</p>
            <p><strong>Caisse :</strong> {caisse} XAF</p>

            <p><strong>Dépôt :</strong> {depot} XAF</p>
            <p><strong>Coût du service :</strong> {coutService} xaf</p>
            <p><strong>Dépense aéroport :</strong> {montantAeroport} xaf</p>
            <p><strong>Dépense taxi :</strong> {montantTaxi} xaf</p>
            <p><strong>Date :</strong> {date}</p>
          </div>
          
        )
}