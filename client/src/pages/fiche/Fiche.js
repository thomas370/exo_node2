import React,{useEffect,useState} from 'react';
import './fiche.scss';
import {useParams} from "react-router-dom";
import axios from "axios";

const Fiche = () => {
    const { id } = useParams();
    const [material, setMaterial] = useState([]);


    useEffect(() => {
            axios.get(`http://localhost:8000/materials/${id}`)
                .then((res) => {
                    setMaterial(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        , []);


    return (
        <div className="fiche">
            <h2>{material.name}</h2>
            <p>{material.desc}</p>
            <img src={`/materials/${material.img}`} alt={`photo de ${material.name}`}/>
        </div>
    );
};

export default Fiche;