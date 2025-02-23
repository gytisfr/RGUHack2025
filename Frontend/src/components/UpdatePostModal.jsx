import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const UpdatePostModal = (props) => {
    const [attribute, setAttribute] = useState("");
    const [newValue, setNewValue] = useState("");
    const token = Cookies.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(props.sighting.uniqueID)
            const response = await axios.patch(`https://api.rguhacknature.co.uk/encounter?uniqueID=${props.sighting.uniqueID}&what=${attribute}&to=${newValue}&token=${token}`, {
                uniqueID: props.sighting.uniqueID,
                attribute: attribute,
                data: newValue,
                token: token
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Sighting updated:", response.data);
            props.updateMockData(prevData => prevData.map(item => item.uniqueID === props.sighting.uniqueID ? { ...item, [attribute]: newValue } : item));
            props.setModalOpen(false);
        } catch (error) {
            console.error("Error updating sighting:", error);
        }
    };

    return (
        <div className="modal-background">
            <form className="modal-form" onSubmit={handleSubmit}>
                <header className="modal-header">
                    <h1>Update Sighting</h1>
                    <button type="button" onClick={() => { props.setModalOpen(false) }}>
                        <img src="../src/assets/X.png" alt="Close" />
                    </button>
                </header>
                <div className="modal-body">
                    <p>Attribute</p>
                    <select value={attribute} onChange={(e) => setAttribute(e.target.value)} required>
                        <option value="">Select Attribute</option>
                        <option value="animal">Animal</option>
                        <option value="type">Type</option>
                        <option value="lng">Longitude</option>
                        <option value="lat">Latitude</option>
                        <option value="time">Time</option>
                    </select>
                    <p>New Value</p>
                    <input
                        type="text"
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        placeholder="Enter new value"
                        required
                    />
                </div>
                <footer className="modal-footer">
                    <button type="submit" style={{ color: "white", fontSize: "17px", fontWeight: 600, float: "right", backgroundColor: "green", marginTop: "1em" }}>Submit</button>
                </footer>
            </form>
        </div>
    );
};