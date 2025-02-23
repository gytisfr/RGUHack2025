import { useEffect, useState } from "react";
import { useAppContext } from "../App";
import axios from "axios";

const typeToImageMap = {
    dog: "../src/assets/dog.png",
    cat: "../src/assets/cat.png",
    bird: "../src/assets/bird.png",
    mammal: "../src/assets/mammal.png",
    reptile: "../src/assets/reptile.png",
    arachnid: "../src/assets/arachnid.png",
    amphibian: "../src/assets/amphibian.png",
    mollusk: "../src/assets/mollusk.png",
    echinoderm: "../src/assets/echinoderm.png",
    insect: "../src/assets/insect.png",
    cnidarian: "../src/assets/cnidarian.png"
};

export const SightingElement = (props) => {
    const { setMapLocation } = useAppContext();
    const [locationName, setLocationName] = useState("... Loading");

    useEffect(() => {
        const fetchLocationName = async () => {
            const apiKey = "AIzaSyD9S8S3cGUXpuHOmswjzvTbM5CoZqTh7L0";
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${props.position.lat},${props.position.lng}&key=${apiKey}`;
            console.log(props.position)

            try {
                const response = await axios.get(url);
                console.log('API response:', response.data); 
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
    }, [props.position]);

    return (
        <div className="sighting-element" onMouseEnter={() => { setMapLocation(props.position) }}>
            <img src={typeToImageMap[props.type]} alt={props.type} />
            <div>
                <h3>Location</h3>
                <p>{locationName}</p>
            </div>
            <div>
                <h3>Animal</h3>
                <p>{props.animal}</p>
            </div>
            <div>
                <h3>Type</h3>
                <p>{props.type}</p>
            </div>
        </div>
    );
};