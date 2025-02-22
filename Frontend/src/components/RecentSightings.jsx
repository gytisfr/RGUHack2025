import { useState } from "react";
import { SightingElement } from "./SightingElement";
import Select from "react-select";
import { useAppContext } from "../App";

export const RecentSightings = () => {
    const { mockData } = useAppContext();
    const [selectedType, setSelectedType] = useState(null);

    const options = [
        { value: "all", label: "All" },
        { value: "dog", label: "Dog" },
        { value: "cat", label: "Cat" },
        { value: "bird", label: "Bird" },
        { value: "mammal", label: "Mammel" },
        { value: "reptile", label: "Reptile" },
        { value: "arachnid", label: "Arachnid" },
        { value: "amphibian", label: "Amphibian"},
        { value: "mollusk", label: "Mollusk" },
        { value: "echioderm", label: "Echinoderm" },
        { value: "insect", label: "Insect"},
        { value: "cnidarian", label: "Cnidarian" }
    ];

    const handleSelectChange = (selectedOption) => {
        setSelectedType(selectedOption ? selectedOption.value : null);
    };

    const filteredData = selectedType && selectedType !== "all"
        ? mockData.filter(item => item.type === selectedType)
        : mockData;

    return (
        <div className="page-element-left">
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2em"}}>
                <h1 style={{ margin: 0, marginRight: "10px" }}>Recent Sightings</h1>
                <Select
                    options={options}
                    placeholder="Filter"
                    onChange={handleSelectChange}
                    isClearable
                />
            </div>

            <div className="sighting-scroll">
            {
                filteredData.map((item, key) => (
                    <SightingElement
                        key={key}
                        position={item.position}
                        animal={item.animal}
                        type={item.type}
                    />
                ))
            }
            </div>

            <button className="add-siting-btn" ><img src="../src/assets/Plus.png"></img>Add sighting</button>
        </div>
    );
};