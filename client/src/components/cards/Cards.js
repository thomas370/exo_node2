import './cards.scss';
import axios from "axios";
import React,{useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpRightFromSquare, faXmark,faTrash } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom";

const Cards = () => {
    const [materials, setMaterials] = useState([]);
    const [categories, setCategories] = useState([]);
    const [furnitures, setFurnitures] = useState([]);
    const [name, setName] = useState('')
    const [categoryAdd, setCategoryAdd] = useState('');
    const [materialsAdd, setMaterialsAdd] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState('');
    const input = document.querySelector('input[name="furniture_name"]');
    const select = document.querySelector('.category_select');



    useEffect(() => {
            axios.get('http://localhost:8000/materials/all/list')
                .then((res) => {
                    setMaterials(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    , []);

    useEffect(() => {
            axios.get('http://localhost:8000/categories/all/list')
                .then((res) => {
                    setCategories(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        , []);

    useEffect(() => {
        axios.get('http://localhost:8000/furnitures/all/list')
            .then((res) => {
                setFurnitures(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    , []);


    useEffect(() => {
    }, [furnitures]);

    useEffect(() => {
    }, [categoryAdd]);

    useEffect(() => {
    }, [error]);

    useEffect(() => {
    }, [deleteItemId]);



    const addMaterial = (e) => {
        const materialAdd = e.target.value;
        if(!materialsAdd.includes(materialAdd)) {
        setMaterialsAdd(prevMaterials => [...prevMaterials, materialAdd]);
            setSelectedMaterial("");
        }
    }

    const handleName = (e) => {
        if(e.target.value !== "") {
            setName(e.target.value);
        }
    }

    const deleteMaterial = (material) => {
        const newMaterials = materialsAdd.filter((mat) => mat !== material);
        setMaterialsAdd(newMaterials);
    };

    const addCategory = (e) => {
        setCategoryAdd(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(name !== "" && materialsAdd !== [] && categoryAdd !== '') {
            const data = {
                name:name,
                materials:materialsAdd,
                category:categoryAdd
            }
            axios.post('http://localhost:8000/furnitures/', data)
                .then((res) => {
                    setSuccess('Votre meuble a bien été ajouté !');
                    input.value="";
                    select.value="";
                    setMaterialsAdd([]);
                    return axios.get('http://localhost:8000/furnitures/all/list');
                })
                .then((res) => {
                    setFurnitures(res.data); // Mettre à jour l'état avec les données récupérées
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            setError('Veuillez remplir tous les champs')
        }

    }

    const openDeleteModal = (itemId) => {
        setDeleteItemId(itemId);
        setShowDeleteModal(true);
    };


    const deleteFurniture = (id) => {
        axios.delete(`http://localhost:8000/furnitures/${id}`)
            .then((res) => {
                return axios.get('http://localhost:8000/furnitures/all/list');
            })
            .then((res) => {
                setFurnitures(res.data); // Mettre à jour l'état avec les données récupérées
            })
            .then((res) => {
                setDeleteItemId('');
                setShowDeleteModal(false);
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div>
            <div className="cards">
            <div className="div1">
                <table>
                    <thead>
                    <tr>
                        <th>Nom du meuble</th>
                        <th>Matériaux</th>
                        <th>Catégorie</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                             furnitures.map((furniture) => (
                                <tr key={furniture._id}>
                                    <td className="capitalize">{furniture.name}</td>
                                    <td className="materialss">
                                        {
                                            furniture.materials.map((material) => (
                                                <Link to={`/material/${material}`} target="_blank">{material}<FontAwesomeIcon icon={faUpRightFromSquare}/></Link>
                                            ))
                                        }
                                    </td>
                                    <td className="capitalize">{furniture.category}</td>
                                    <td className="actions">
                                        <Link onClick={() => openDeleteModal(furniture._id)} className='delete' to=''><FontAwesomeIcon icon={faTrash}/></Link>
                                    </td>
                                        {showDeleteModal && (
                                    <td>
                                            <div className="modal active">
                                                <p>Confirmez-vous la suppression ?</p>
                                                <button onClick={(e) => deleteFurniture(deleteItemId, e)}>Oui</button>
                                                <button onClick={() => setShowDeleteModal(false)}>Non</button>
                                            </div>
                                    </td>
                                        )}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
                <div className="div2">
                    <h2>Ajouter un meuble</h2>
                    <form>
                        <input onChange={handleName} name='furniture_name' type="text" placeholder="Nom du meuble" />
                        <div className="select">
                            <select value={selectedMaterial} onChange={addMaterial}>
                                <option disabled value="">Choisir un  Matériau</option>
                                {
                                    materials.map((material) => (
                                    <option onClick={addMaterial} key={material.id} value={material.name}>{material.name}</option>
                                ))
                                }
                            </select>
                            <select onChange={addCategory} className="category_select">
                                <option disabled value="">Choisir une catégorie</option>
                                {
                                    categories.map((categorie) => (
                                        <option key={categorie._id} value={categorie.name}>{categorie.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <button onClick={handleSubmit} type={"submit"}>Ajouter</button>
                    </form>
                    <div className={`alert ${success ? 'active-success' : ''}${error ? 'active-error' : ''}`}>{
                        success
                    }</div>
                    <div className="tags">
                        {
                            materialsAdd &&
                            materialsAdd.map((tag) => {
                               return(<span>{tag}<strong onClick={() => deleteMaterial(tag)}> <FontAwesomeIcon icon={faXmark}/></strong></span>)
                            })
                        }
                    </div>
                </div>
                <div className="div3">
                    <table>
                        <thead>
                        <tr>
                            <th>Matériaux</th>
                            <th>Entreprise</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            materials.map((material) => (
                                <tr key={material.id}>
                                    <td className="materialss capitalize"><Link to={`/material/${material.name}`} target="_blank">{material.name}<FontAwesomeIcon icon={faUpRightFromSquare}/></Link></td>
                                    <td>{material.enterprise}</td>
                                    <td className="actions">
                                        <Link className='delete' to='/'><FontAwesomeIcon icon={faTrash}/></Link>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    <table>
                        <thead>
                        <tr>
                            <th>Nos Meubles</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            categories.map((categorie) => (
                                <tr key={categorie.id}>
                                    <td className="capitalize">{categorie.name}</td>
                                    <td className="actions">
                                        <Link className='delete' to='/'><FontAwesomeIcon icon={faTrash}/></Link>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cards;