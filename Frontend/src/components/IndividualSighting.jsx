import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../App";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const typeToImageMap = {
    dog: "../src/assets/big/dog.png",
    cat: "../src/assets/big/cat.png",
    bird: "../src/assets/big/bird.png",
    mammal: "../src/assets/big/mammal.png",
    reptile: "../src/assets/big/reptile.png",
    arachnid: "../src/assets/big/arachnid.png",
    amphibian: "../src/assets/big/amphibian.png",
    mollusk: "../src/assets/big/mollusk.png",
    echinoderm: "../src/assets/big/echinoderm.png",
    insect: "../src/assets/big/insect.png",
    cnidarian: "../src/assets/big/cnidarian.png"
};

export const IndividualSighting = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { mockData } = useAppContext();
    const [locationName, setLocationName] = useState("... Loading");

    const sighting = mockData.find(item => item.uniqueID === id);

    useEffect(() => {
        if (sighting) {
            const fetchLocationName = async () => {
                const apiKey = "AIzaSyD9S8S3cGUXpuHOmswjzvTbM5CoZqTh7L0";
                const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${sighting.position.lat},${sighting.position.lng}&key=${apiKey}`;

                try {
                    const response = await axios.get(url);
                    const results = response.data.results;
                    if (results.length > 0) {
                        setLocationName(results[2]['address_components'][1]['long_name']);
                    } else {
                        setLocationName('Unknown location');
                    }
                } catch (error) {
                    console.error('Error fetching location name:', error);
                    setLocationName('Error fetching location');
                }
            };

            fetchLocationName();
        }
    }, [sighting]);

    const handleDelete = async () => {
        const token = Cookies.get("token");
        try {
            const response = await axios.delete(`https://api.rguhacknature.co.uk/encounter?uniqueID=${sighting.uniqueID}&token=${token}`);
            console.log("Post deleted:", response.data);
            navigate('/'); // Redirect to home page after deletion
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    if (!sighting) {
        return <h1>Sighting not found</h1>;
    }

    return (
        <div className="page">
            <div className="individual-grid">
                <div className="individual-sighting-details">
                    <h1>Sighting Details</h1>
                    <img src={typeToImageMap[sighting.type]} alt={sighting.type} className="individual-sighting-image" />
                    <div className="details-headings">
                        <div>
                            <h3>Type</h3>
                            <p>{sighting.type}</p>
                        </div>
                        <div>
                            <h3>Animal</h3>
                            <p>{sighting.animal}</p>
                        </div>
                    </div>
                    <div className="details-footer">
                        <h3>Located At</h3>
                        <p>{locationName}</p>
                    </div>
                </div>

                <div className="individual-sighting-blocks">
                    <div className="block1 block">
                        <h1>Co-ordinates</h1>
                        <h3 style={{ marginTop: "1em" }}>Latitude</h3>
                        <p>{sighting.position.lat}</p>
                        <h3 style={{ marginTop: "1em" }}>Longitude</h3>
                        <p>{sighting.position.lng}</p>
                    </div>
                    <div className="block2 block">
                        <h1>Uploaded By</h1>
                        <h3 style={{ marginTop: "1em" }}>Author</h3>
                        <p>{sighting.username}</p>
                        <h3 style={{ marginTop: "1em" }}>Time</h3>
                        <p>{sighting.time}</p>
                    </div>
                </div>

                <div className="individual-sighting-graphs">
                    <h1>Manage Post</h1>
                    <h3 style={{marginTop: "1em"}}>Delete Post</h3>
                    <button onClick={handleDelete}>Delete</button>
                    <h3 style={{marginTop: "1em"}}>Update Post</h3>
                    <button style={{backgroundColor: "orange"}}>Update</button>
                </div>
            </div>
        </div>
    );
};