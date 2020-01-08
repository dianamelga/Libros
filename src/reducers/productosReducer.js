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
  PRODUCTO_EDITAR_ERROR,
  COMENZAR_EDICION_PRODUCTO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types";

//cada reducer tiene su propio state
const initialSate = {
  productos: [],
  error: null,
  loading: false,
  producto: {}
};

export default function(state = initialSate, action) {
  switch (action.type) {
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        error: null
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        error: null,
        productos: [...state.productos, action.payload]
      };
    case AGREGAR_PRODUCTO_ERROR:
      return {
        ...state,
        error: true
      };
    case DESCARGA_PRODUCTOS:
      return {
        ...state,
        loading: true,
        producto: {}
      };
    case DESCARGA_PRODUCTOS_EXITO:
      return {
        ...state,
        productos: action.payload,
        loading: false,
        error: false,
        producto: {}
      };
    case DESCARGA_PRODUCTOS_ERROR:
      return {
        ...state,
        productos: [],
        loading: false,
        error: true,
        producto: {}
      };
    case OBTENER_PRODUCTO_ELIMINAR:
      return {
        ...state,
        error: false
      };
    case PRODUCTO_ELIMINADO_ERROR:
      return {
        ...state,
        error: true
      };
    case PRODUCTO_ELIMINADO_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          producto => producto.id !== action.payload
        ),
        error: false
      };
    case OBTENER_PRODUCTO_EDITAR:
      return {
        ...state,
        error: false
      };
    case PRODUCTO_EDITAR_EXITO:
      return {
        ...state,
        error: false,
        producto: action.payload
      };
    case PRODUCTO_EDITAR_ERROR:
      return {
        ...state,
        error: true
      };
    case COMENZAR_EDICION_PRODUCTO:
      return {
        ...state,
        error: false
      };
    case PRODUCTO_EDITADO_EXITO:
      return {
        ...state,
        error: false,
        productos: state.productos.map(producto => producto.id === action.payload.id ? producto = action.payload : producto)
      };
    case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }
}
