import React, { useEffect, Fragment, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductoEditarAction, enviarProductoModificadoAction } from '../actions/productosActions';
import clienteAxios from '../config/axios';
import { validarFormularioAction, validacionExito, validacionError } from '../actions/validacionActions';


const EditarProducto = ({match, history}) => {

    //crear los ref
    const nombreRef = useRef('');
    const precioRef = useRef('');

    const dispatch = useDispatch();
    const {id} = match.params;

    useEffect(() => {
        dispatch(obtenerProductoEditarAction(id))

        //obtener producto del api
        clienteAxios.get(`/libros/${id}`)
        .then(respuesta => {
            console.log(respuesta.data);
            
        })
        .catch(error => {
            console.log(error);
        })

    }, [dispatch, id]);


    //aceder al state
    const producto = useSelector(state => state.productos.producto);
    console.log(producto);


    // enviar producto modificado
    const enviarProducto = e => {
        e.preventDefault();

        //validar formulario
        dispatch(validarFormularioAction());
        if(nombreRef.current.value.trim() === '' || precioRef.current.value.trim() === '') {
            dispatch(validacionError());
            return; 
        }

        dispatch(validacionExito());
        //guardar cambios
        dispatch(enviarProductoModificadoAction({
            nombre : nombreRef.current.value,
            precio : precioRef.current.value,
            id
        }));

       

        //redireccionar
        history.push('/');

        
    }

    if(!producto) return 'Cargando...';

    return (
        <Fragment>
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        <form onSubmit={enviarProducto}>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Titulo"
                                    defaultValue={producto.nombre}
                                    ref={nombreRef}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio" 
                                    defaultValue={producto.precio}
                                    ref={precioRef}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                        </form>
 
                    </div>
                </div>
            </div>
        </div>
        </Fragment>);
}

export default EditarProducto;