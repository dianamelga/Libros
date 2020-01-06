import {
    AGREGAR_PRODUCTO,
    AGREGAR_PRODUCTO_EXITO,
    AGREGAR_PRODUCTO_ERROR
  } from "../types";
  import clienteAxios from '../config/axios';

  //crear nuevo producto (funcion principal)
  export function crearNuevoProductoAction(producto) {
      return (dispatch) => {
        dispatch( nuevoProducto() )

        // insertar en API
        clienteAxios.post('/libros', producto)
        .then(respuesta => {
            console.log(respuesta);
            dispatch( agregarProductoExito (producto) );
        })
        .catch(error => {
            console.log(error);

            // si hay un error
            dispatch( agregarProductoError() );
        })

      }
  }

  export const nuevoProducto = () => ({
      type: AGREGAR_PRODUCTO
  });

  export const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
  });

  export const agregarProductoError = () => ({
    type: AGREGAR_PRODUCTO_ERROR
  });

  //obtener listado de productos (consultar api)