import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  DESCARGA_PRODUCTOS,
  DESCARGA_PRODUCTOS_EXITO,
  DESCARGA_PRODUCTOS_ERROR
} from "../types";

//cada reducer tiene su propio state
const initialSate = {
  productos: [],
  error: null,
  loading: false
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
              loading: true
          };
          case DESCARGA_PRODUCTOS_EXITO:
          return {
              ...state,
              productos: action.payload,
              loading: false,
              error: false 
          };
          case DESCARGA_PRODUCTOS_ERROR:
          return {
              ...state,
              productos: [],
              loading: false,
              error: true 
          }
    default:
      return state;
  }
}
