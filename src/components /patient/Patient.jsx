import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import Swal from 'sweetalert2';
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);
const Patient = () => {
    const [patientA ,setPatientA]=useState(false)
    const [docteur1 ,setDocteur1]=useState(true)
    const navigate = useNavigate()

    const [patient, setPatient] = useState({
        nom: '',
        prenom: '',
        age: '',
        sexe: '',
        telephone: ''
    });
    const [medecin, setMedecin] = useState({
        nom: '',
        specialite: '',
        telephone: ''
    });
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPatient({
            ...patient,
            [name]: value
        });
    };
    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setMedecin({
            ...medecin,
            [name]: value
        });
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', patient);
    };
    // const handleVerification = () => {
    //     MySwal.fire({
    //         title: "Votre compte a été vérifié",
    //         text: "Veuillez vous reconnecter",
    //         icon: "success",
    //         confirmButtonText: "Ok",
    //         allowOutsideClick: false,  // Empêche la fermeture de l'alerte en cliquant à l'extérieur
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             // Rediriger vers la page de connexion après confirmation
    //             navigate("/login");  // Remplacez '/login' par l'URL de votre page de connexion
    //         }
    //     });
    // };
    return (

        <div className='d-flex' style={{ width: '100' }}>
            <div style={{ width: '', height: '100vh' }}>
                <img
                    src="./assets/images/2147767333.jpg"
                    alt="image"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
            </div>
            {patientA &&  <div className='d-flex' style={{ alignItems: 'center', justifyContent: 'center', width: '30%', flexDirection: 'column' }}>
                <h2 style={{ textAlign: 'center', color: '#5b5b5b' }}>Formulaire d'inscription du <br /> patient</h2>
                <form onSubmit={handleSubmit} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nom"
                            name="nom"
                            value={patient.nom}
                            onChange={handleChange}
                            placeholder="Nom du patient"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="prenom" className="form-label">Prénom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="prenom"
                            name="prenom"
                            value={patient.prenom}
                            onChange={handleChange}
                            placeholder="Prénom du patient"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="age" className="form-label">Âge</label>
                        <input
                            type="number"
                            className="form-control"
                            id="age"
                            name="age"
                            value={patient.age}
                            onChange={handleChange}
                            placeholder="Âge du patient"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="sexe" className="form-label">Sexe</label>
                        <select
                            className="form-control"
                            id="sexe"
                            name="sexe"
                            value={patient.sexe}
                            onChange={handleChange}
                        >
                            <option value="">Sélectionner</option>
                            <option value="male">Homme</option>
                            <option value="female">Femme</option>
                            <option value="other">Autre</option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="telephone" className="form-label">Téléphone</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="telephone"
                            name="telephone"
                            value={patient.telephone}
                            onChange={handleChange}
                            placeholder="Numéro de téléphone"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
            </div>}
           {docteur1 &&   <div className='d-flex' style={{ alignItems: 'center', justifyContent: 'center', width: '30%', flexDirection: 'column' }}>
                <h2 style={{ textAlign: 'center', color: '#5b5b5b' }}>Formulaire d'inscription du <br /> médecin</h2>
                <form onSubmit={handleSubmit} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nom"
                            name="nom"
                            value={medecin.nom}
                            onChange={handleChange1}
                            placeholder="Nom du médecin"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="specialite" className="form-label">Spécialité</label>
                        <input
                            type="text"
                            className="form-control"
                            id="specialite"
                            name="specialite"
                            value={medecin.specialite}
                            onChange={handleChange1}
                            placeholder="Spécialité du médecin"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="telephone" className="form-label">Téléphone</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="telephone"
                            name="telephone"
                            value={medecin.telephone}
                            onChange={handleChange1}
                            placeholder="Numéro de téléphone"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </form>
            </div>}
          

        </div>
    );
};

export default Patient;