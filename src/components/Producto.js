import React from 'react';

//Redux
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { eliminarProductoAction } from '../actions/productosActions';
import Swal from 'sweetalert2';

const Producto = ({producto}) => {

    //dispatch para ejecutar las acciones
    const dispatch = useDispatch();
    const confirmarEliminarProducto = (id) => {
        //preguntar al usuario
        Swal.fire({
            title: 'Esta seguro que desea eliminar?',
            text: 'Un producto eliminado no se puede recuperar',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.value) {
                dispatch(eliminarProductoAction(id));
              
            }
          })


        
    }

    return (
        <tr>
            <td>{producto.nombre}</td>
            <td><span className="font-weight-bold">$ {producto.precio}</span></td>
            <td className="acciones">
                <Link 
                to={`/productos/editar/${producto.id}`}
                className="btn btn-primary mr-2">
                    Editar
                </Link>
                <button
                className="btn btn-danger"
                onClick={() => confirmarEliminarProducto(producto.id)}>
                    Eliminar
                </button>
            </td>

        </tr>
    );
}

export default Producto;