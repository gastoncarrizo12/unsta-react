import React, { useEffect, useState } from "react";


export function Tutoriales () {
    const [content, setContent]= useState(<ListaTutorial showForm={showForm} />);

    function showList () {
        setContent (<ListaTutorial showForm={showForm} />);
    }

    function showForm (Tutoriales){
        setContent(<TutorialForm Tutoriales={Tutoriales} showList={showList} />);
    }

    return(
        <div className="container my-5">
            {content}
        </div>
    );
}


function ListaTutorial (props){
    const [products, setProducts] = useState ([]);

    function buscarTutorial () {
        fetch('http://localhost:3004/Tutoriales')
        .then(response => {
            if(!response.ok) {
                throw new Error ("Error en el servidor");
            }
            return response.json()
        })
        .then(data => { 
            //console.log(data)
            setProducts(data);
        })
        .catch((error) => console.log ("Error :", error));

    }

    //buscarTutorial();
    useEffect(() => buscarTutorial(), []);

    function eliminarTutorial(id) {
        fetch('http://localhost:3004/Tutoriales/' + id, {
            method: 'DELETE'
        } )
        .then((response) => response.json())
        .then((data) => buscarTutorial());
    }

    return(
        <>
        <h2 className="text-center mb-3">Lista de Tutoriales</h2>
        <button onClick={() => props.showForm({})} type="button" className="btn btn-primary me-2">Crear</button>
        <button onClick={() => buscarTutorial()} type="button" className="btn btn-outline-primary me-2">Actualizar</button>
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Categoria</th>
                    <th>Titulo</th>
                    <th>Descripcion</th>
                    <th>Fecha de publicación</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((Tutoriales, index) => {
                        return(
                            <tr key={index}>
                                <td>{Tutoriales.id}</td>
                                <td>{Tutoriales.Nombre}</td>
                                <td>{Tutoriales.Categoria}</td>
                                <td>{Tutoriales.Titulo}</td>
                                <td>{Tutoriales.Descripcion}</td>
                                <td>{Tutoriales.fechaDePublicacion}</td>
                                <td style={{width: "10px", whiteSpace: "nowrap"}}>
                                    <button onClick={() => props.showForm(Tutoriales)} type="button" className="btn btn-primary btn-sm me-2">Editar</button>
                                    <button onClick={() => eliminarTutorial(Tutoriales.id)} type="button" className="btn btn-danger btn-sm">Eliminar</button>
                                </td>
                    
                            </tr>
                        );
                    })
                }
            </tbody>
        </table>
        </>
    );
}


function TutorialForm (props){
    const [errorMessage, setErrorMessage] = useState("");

    function handleSumbit(event) {
        event.preventDefault(); //prevenimos que el navegador envie el formulario

        //leemos datos formulario
        const formData = new FormData(event.target);

        //convertimos datos Formulario en objetos
        const Tutoriales = Object.fromEntries(formData.entries());

        //formulario validacion
        if (!Tutoriales.Nombre || !Tutoriales.Categoria || !Tutoriales.Titulo || !Tutoriales.Descripcion) {
            console.log ("Por favor ingresar los campos requeridos!");
            setErrorMessage(
                <div className="alert alert-warning" role="alert">
                    Por favor ingresar los campos requeridos!
                </div>
            )
            return;
        }

        if (props.Tutoriales.id){
            //actualizar el producto
            fetch('http://localhost:3004/Tutoriales/' + props.Tutoriales.id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Tutoriales)
            })
                .then((response) => {
                    if(!response.ok){
                        throw new Error("Servidor response error")
                    }
                    return response.json()})
                .then((data) => props.showList(data))
                .catch((error) => {
                    console.error("Error", error);
                });
        }
        else {
            //crear nuevo producto
            Tutoriales.fechaDePublicacion = new Date().toISOString().slice(0, 10);
            fetch('http://localhost:3004/Tutoriales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Tutoriales)
            })
                .then((response) => {
                    if(!response.ok){
                        throw new Error("Servidor response error")
                    }
                    return response.json()})
                .then((data) => props.showList(data))
                .catch((error) => {
                    console.error("Error", error);
                });

        }
    }
    return(
        <>
        <h2 className="text-center mb-3">{props.Tutoriales.id ? "Editar Tutorial" : "Crear nuevo Tutorial"}</h2>

        {errorMessage}

        <div className="row">
            <div className="col-lg-6 mx-auto">

            <form onSubmit={(event) => handleSumbit(event)}>
            
            {props.Tutoriales.id && <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">ID</label>
                    <div className="col-sm-8">
                        <input className="form-control-plaintext"
                            name="id"
                            defaultValue={props.Tutoriales.id} >
                        </input>           
                    </div>
                </div>}

                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Nombre</label>
                    <div className="col-sm-8">
                        <input className="form-control"
                            name="Nombre"
                            defaultValue={props.Tutoriales.Nombre} >
                        </input>           
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Categoria</label>
                    <div className="col-sm-8">
                        <select className="form-select"
                            name="Categoria"
                            defaultValue={props.Tutoriales.Categoria} >

                            <option value='Deportes'>Deportes</option>
                            <option value='Entretenimiento'>Entretenimiento</option>
                            <option value='Construccion'>Construccion</option>
                            <option value='Videojuegos'>Videojuegos</option>
                        </select>           
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Titulo</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control"
                            name="Titulo"
                            defaultValue={props.Tutoriales.Titulo}>
                        </input>        
                    </div>
                </div>

                <div className="row mb-3">
                    <label className="col-sm-4 col-form-label">Descripcion</label>
                    <div className="col-sm-8">
                        <textarea className="form-control"
                            name="Descripcion"
                            defaultValue={props.Tutoriales.Descripcion}>
                        </textarea>           
                    </div>
                </div>

                <div className="row">
                    <div className="offset-sm-4 col-sm-4 d-grid">
                        <button type="sumbit" className="btn btn-primary btn-sm me-3">Guardar</button>
                    </div>
                    <div className="col-sm-4 d-grid">
                        <button onClick={() => props.showList()} type="button" className="btn btn-secondary me-2">Cancelar</button>
                    </div>
                </div>
            </form>
            </div>
        </div>
        </>
    );
}


