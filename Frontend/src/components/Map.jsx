import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useAppContext } from "../App";

export const Map = () => {
    const { mockData, mapLocation } = useAppContext();

    const mapStyles = {
        height: "100%",
        width: "100%",
        borderRadius: "5px"
    };

    // const defaultCenter = {
    //     lat: 57,
    //     lng: -2.4
    // }

    //const locations = [mockData.position]

    return (
        <div className="page-element-right">
            <LoadScript googleMapsApiKey="AIzaSyBEwHvjIxbz88GoojsQJaYdHNaM9c5IxmI">
                <GoogleMap
                    mapContainerStyle={mapStyles}
                    zoom={9.5}
                    center={mapLocation}
                >
                    {
                        mockData.map((data, index) => (
                            <Marker key={index} position={data.position}/>
                        ))
                    }
                </GoogleMap>
            </LoadScript>
        </div>
    )
}