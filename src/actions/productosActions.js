import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR,
  OBTENER_PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINADO_EXITO,
  PRODUCTO_ELIMINADO_ERROR,
  OBTENER_PRODUCTO_EDITAR,
  PRODUCTO_EDITAR_EXITO,
  PRODUCTO_EDITAR_ERROR
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

//obtener listado de productos (consultar api)
export function obtenerProductosAction() {
  return dispatch => {
    dispatch(obtenerProductosComienzo());

    //consultar api
    clienteAxios
      .get("/libros")
      .then(respuesta => {
        dispatch(descargaProductosExito(respuesta.data));
      })
      .catch(error => {
        dispatch(descargaProductosError());
      });
  };
}

export const obtenerProductosComienzo = () => ({
  type: DESCARGA_PRODUCTOS
});

export const descargaProductosExito = productos => ({
  type: DESCARGA_PRODUCTOS_EXITO,
  payload: productos
});

export const descargaProductosError = () => ({
  type: DESCARGA_PRODUCTOS_ERROR
});

//crear nuevo producto (funcion principal)
export function crearNuevoProductoAction(producto) {
  return dispatch => {
    dispatch(nuevoProducto());

    // insertar en API
    clienteAxios
      .post("/libros", producto)
      .then(respuesta => {
        console.log(respuesta);
        dispatch(agregarProductoExito(producto));
      })
      .catch(error => {
        console.log(error);

        // si hay un error
        dispatch(agregarProductoError());
      });
  };
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

//funcion que elimina un producto
export const eliminarProductoAction = id => {
  return dispatch => {
    dispatch(obtenerProductoEliminar());

    //Eliminar producto en la API
    clienteAxios
      .delete(`/libros/${id}`)
      .then(respuesta => {
        dispatch(eliminarProductoExito(id));
        Swal.fire(
          "Eliminado!",
          "El producto fue eliminado correctamente.",
          "success"
        );
      })
      .catch(error => {
        dispatch(eliminarProductoError());
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un error al tratar de eliminar el producto"
        });
      });
  };
};

export const obtenerProductoEliminar = () => ({
  type: OBTENER_PRODUCTO_ELIMINAR
});

export const eliminarProductoExito = id => ({
  type: PRODUCTO_ELIMINADO_EXITO,
  payload: id
});

export const eliminarProductoError = () => ({
  type: PRODUCTO_ELIMINADO_ERROR
});

//obtener el producto a editar
export function obtenerProductoEditarAction (id) {
  return (dispatch) => {
    dispatch( obtenerProductoAction() );

    //obtener producto de la api
    clienteAxios.get(`/libros/${id}`)
    .then(respuesta => {
      dispatch( editarProductoExito(respuesta.data));
    })
    .catch(error => {
      dispatch( editarProductoError());
    })
  }
}

export const obtenerProductoAction = () => ({
  type: OBTENER_PRODUCTO_EDITAR
})

export const editarProductoExito = producto => ({
  type: PRODUCTO_EDITAR_EXITO,
  payload: producto 
})

export const editarProductoError = () => ({
  type: PRODUCTO_EDITAR_ERROR
})