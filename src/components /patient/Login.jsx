import React, { useState } from 'react';
import { useNavigate } from 'react-router';
// import Swal from 'sweetalert2';
// import withReactContent from "sweetalert2-react-content";

// const MySwal = withReactContent(Swal);
const Login = () => {
    const [patientA, setPatientA] = useState(false)
    const [docteur1, setDocteur1] = useState(true)
    const navigate = useNavigate()

    const [patient, setPatient] = useState({
        nom: '',
        prenom: '',
        age: '',
        sexe: '',
        telephone: ''
    });
    const [medecin, setMedecin] = useState({
        email: '',
        password: ''
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
        console.log('Form submitted:', medecin);
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

        <div className='d-flex' style={{  }}>
            <div style={{ width: '', height: '100vh' }}>
                <img
                    src="./assets/images/111111.jpg"
                    alt="image"
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                />
            </div>

            <div className='d-flex' style={{ alignItems: 'center', justifyContent: 'center', width: '30%', flexDirection: 'column' }}>
                <div>
                    <img
                        src="./assets/images/logodubai.jpeg"
                        alt="image"
                        style={{ objectFit: 'cover', width: '400px', height: '400px' }}
                    />
                </div>
                {/* <h2 style={{ textAlign: 'center', color: '#5b5b5b' }}>Formulaire d'inscription du <br /> médecin</h2> */}
                <form onSubmit={handleSubmit} style={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
                    {/* <div className="mb-3">
                        <label htmlFor="nom" className="form-label">Nom</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nom"
                            name="nom"
                            value={medecin.nom}
                            onChange={handleChange1}
                            placeholder="Nom "
                        />
                    </div> */}

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Email"
                            name="email"
                            value={medecin.email}
                            onChange={handleChange1}
                            placeholder="Email"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mot de passe</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="password"
                            name="password"
                            value={medecin.password}
                            onChange={handleChange1}
                            placeholder="Mot de passe"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">Connexion</button>
                </form>
            </div>


        </div>
    );
};

export default Login;