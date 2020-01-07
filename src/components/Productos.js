import React, { useEffect } from "react";
import Producto from "./Producto";

//Redux
import { useDispatch, useSelector } from "react-redux";
import { obtenerProductosAction } from "../actions/productosActions";

const Productos = () => {
  //mandar llamar la accion principal para obtener productos
  const dispatch = useDispatch();

  //acceder al state
  const loading = useSelector(state => state.productos.loading);
  const error = useSelector(state => state.productos.error);
  const productos = useSelector(state => state.productos.productos);

  useEffect(() => {
    //obtener productos cuando el componente este listo
    const cargarProductos = () => dispatch(obtenerProductosAction());
    cargarProductos();
  }, []);

  return (
    <React.Fragment>
      {error ? (
        <div className="font-weight-bold alert alert-danger text-center mt-4">
          Hubo un error
        </div>
      ) :  null } 

          <h2 className="text-center my-5">Listado de Productos</h2>

          <table className="table table-striped">
            <thead className="bg-primary table-dark">
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(producto => (
                <Producto key={producto.id} producto={producto} />
              ))}
            </tbody>
          </table>
          {loading ? "Cargando..." : null}
          </React.Fragment>
      )};

export default Productos;
