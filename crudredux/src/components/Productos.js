import React, { useEffect } from "react";

//Redux
import { useDispatch, useSelector } from 'react-redux';
import { obtenerProductosAction } from '../actions/productosActions';

const Productos = () => {

  //mandar llamar la accion principal para obtener productos
  const dispatch = useDispatch();

  //acceder al state
  const loading = useSelector(state => state.productos.loading);


  useEffect(() => {
    //obtener productos cuando el componente este listo
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, []);


  

  return (
    <React.Fragment>
      <h2 className="text-center my-5">Listado de Productos</h2>

      <table className="table table-striped">
        <thead className="bg-primary table-dark">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      { loading ? 'Cargando...' : null }
    </React.Fragment>
);
};

export default Productos;
