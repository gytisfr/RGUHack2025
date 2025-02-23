import { RecentSightings } from "../components/RecentSightings"
import { Map } from "../components/Map"
import { useEffect, useState } from "react"
import { Modal } from "../components/Modal"
import useAuth from "../hooks/useAuth"

export const Home = () => {
    useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    
    return (
        <div className="page">
            <div className="home-container">

                <div className="recent-sightings-container">
                    <RecentSightings setModalOpen={setModalOpen} modalOpen={modalOpen}/>
                </div>

                <div className="map-container">
                    <Map />
                </div>

            {
                modalOpen && <Modal setModalOpen={setModalOpen}/>
            }

            </div>
        </div>
    )
}