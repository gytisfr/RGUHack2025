import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdatePostModal = (props) => {
    const [animal, setAnimal] = useState("");
    const [type, setType] = useState("");
    const [position, setPosition] = useState({ lat: null, lng: null });
    const token = Cookies.get("token");

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(token)
            const response = await axios.post(`https://api.rguhacknature.co.uk/encounter?animal=${animal}&animalType=${type}&longitude=${position.lng}&latitude=${position.lat}&token=${token}`, {
                animal,
                type,
                position
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Sighting submitted:", response.data);
            props.setModalOpen(false);
        } catch (error) {
            console.error("Error submitting sighting:", error);
        }
    };

    return (
        <div className="modal-background">
            <form className="modal-form" onSubmit={handleSubmit}>
                <header className="modal-header">
                    <h1>Enter Sighting</h1>
                    <button type="button" onClick={() => { props.setModalOpen(false) }}>
                        <img src="../src/assets/X.png" alt="Close" />
                    </button>
                </header>
                <div className="modal-body">

                    <p>Animal</p>
                        <input
                            type="text"
                            value={animal}
                            onChange={(e) => setAnimal(e.target.value)}
                            placeholder="Enter animal name"
                            required
                        />

                    <p>Type</p>
                        <select value={type} onChange={(e) => setType(e.target.value)} required>
                            <option value="">Select Type</option>
                            <option value="dog">Dog</option>
                            <option value="cat">Cat</option>
                            <option value="bird">Bird</option>
                            <option value="mammal">Mammal</option>
                            <option value="reptile">Reptile</option>
                            <option value="arachnid">Arachnid</option>
                            <option value="amphibian">Amphibian</option>
                            <option value="mollusk">Mollusk</option>
                            <option value="echinoderm">Echinoderm</option>
                            <option value="insect">Insect</option>
                            <option value="cnidarian">Cnidarian</option>
                        </select>

                </div>
                <footer className="modal-footer">
                    <button type="submit" style={{color: "white", fontSize: "17px", fontWeight: 600, float: "right", backgroundColor: "green", marginTop: "1em"}}>Submit</button>
                </footer>
            </form>
        </div>
    );
};