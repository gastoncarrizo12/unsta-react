import React, { useState } from "react";


export function Tutoriales () {
    const [content, setContent]= useState(<ListaTutorial showForm={showForm} />);

    function showList () {
        setContent (<ListaTutorial showForm={showForm} />);
    }

    function showForm (){
        setContent(<TutorialForm showList={showList} />);
    }

    return(
        <div className="container my-5">
            {content}
        </div>
    );
}


function ListaTutorial (props){
    return(
        <>
        <h2 className="text-center mb-3">Lista de Tutoriales</h2>
        <button onClick={() => props.showForm()} type="button" className="btn btn-primary me-2">Crear</button>
        </>
    );
}


function TutorialForm (props){
    return(
        <>
        <h2 className="text-center mb-3">Crear Nuevo Tutorial</h2>
        <button onClick={() => props.showList()} type="button" className="btn btn-secondary me-2">Cancelar</button>
        </>
    );
}


