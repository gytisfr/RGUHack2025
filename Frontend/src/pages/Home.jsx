import { RecentSightings } from "../components/RecentSightings"
import { Map } from "../components/Map"

export const Home = () => {
    return (
        <div className="page">
            <div className="home-container">

                <div className="recent-sightings-container">
                    <RecentSightings />
                </div>

                <div className="map-container">
                    <Map />
                </div>
                
            </div>
        </div>
    )
}