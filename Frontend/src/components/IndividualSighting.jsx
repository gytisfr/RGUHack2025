import { useParams } from "react-router-dom"
import { useAppContext } from "../App";

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
    const { mockData } = useAppContext();
    const sighting = mockData.find(item => item.uniqueID  === id)

    if (!sighting) {
        return <h1>Sighting not found</h1>
    }

    return(
        <div className="page">

            <div className="individual-grid">
                <div className="individual-sighting-details">
                    <h1>Sighting Details</h1>
                    <img src={typeToImageMap[sighting.type]}></img>
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
                    <p>Aberdeenshire, Inverurie AID3 4LD</p>
                    </div>
                </div>

                <div className="individual-sighting-blocks">
                    <div className="block1 block">
                        <h1>Co-ordinates</h1>
                        <h3 style={{marginTop: "1em"}}>Lattitude</h3>
                        <p>{sighting.position.lat}</p>
                        <h3 style={{marginTop: "1em"}}> Longitude</h3>
                        <p>{sighting.position.lng}</p>
                    </div>
                    <div className="block2 block">
                    <h1>Uploaded By</h1>
                        <h3 style={{marginTop: "1em"}}>Author</h3>
                        <p>{sighting.username}</p>
                        <h3 style={{marginTop: "1em"}}> Time</h3>
                        <p>{sighting.time}</p>
                    </div>
                </div>

                <div className="individual-sighting-graphs">

                </div>
            </div>

        </div>
    )
}