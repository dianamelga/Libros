import React, { useState } from "react";

//Redux
import { crearNuevoProductoAction } from '../actions/productosActions';
import { useDispatch, useSelector } from 'react-redux';
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validacionActions';


const NuevoProducto = ({history}) => {

    //state
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');


    //crear nuevo producto
    const dispatch = useDispatch();
    const agregarProducto = (producto) => dispatch(crearNuevoProductoAction(producto));
    const validarFormulario = () => dispatch(validarFormularioAction());
    const exitoValidacion = () => dispatch(validacionExito());
    const errorValidacion = () => dispatch(validacionError());

    //obtener los datos del state
    const error = useSelector((state) => state.error.error);

    const submitNuevoProducto = e => {
        e.preventDefault();

        validarFormulario();

        //validar formulario
        if(nombre.trim() === '' || precio.trim() === '') {
            //mostrar error de validacion
            errorValidacion();
            return;
        }

        //crear producto
        exitoValidacion();
        agregarProducto({
            nombre,
            precio 
        });

        //redireccionar
        history.push('/');
    }


  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold ">
              Agregar Nuevo Libro
            </h2>
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Libro"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Libro</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Precio Libro"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>
            {error  ? <div className="font-weight-bold alert alert-danger 
            text-center mt-4">Todos los campos son obligatorios</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
