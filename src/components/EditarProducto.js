import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductoEditarAction } from '../actions/productosActions';
import clienteAxios from '../config/axios';

const EditarProducto = ({match}) => {

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

    if(!producto) return 'Cargando...';

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center">Editar Producto</h2>
                        <form>
                            <div className="form-group">
                                <label>Titulo</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Titulo"
                                    defaultValue={producto.nombre}
                                />
                            </div>
                            <div className="form-group">
                                <label>Precio del Producto</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Precio" 
                                    defaultValue={producto.precio}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary font-weight-bold text-uppercase d-block w-100">Guardar Cambios</button>
                        </form>
 
                    </div>
                </div>
            </div>
        </div>);
}

export default EditarProducto;