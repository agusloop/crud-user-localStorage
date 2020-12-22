import React from "react";

const ListUsers = ({ usr, eliminarUsuario, editarUsuarios }) => {
  return (
    <>
      <div className='row'>
        <div className='col-sm-12'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>{usr.email}</h5>
              <p className='card-text'>{usr.direccion}</p>
              <p className='card-text'>{usr.rol}</p>
              <button
                onClick={() => eliminarUsuario(usr.id)}
                type='button'
                class='btn btn-danger'
              >
                Eliminar
              </button>
              <button
                onClick={() => editarUsuarios(usr)}
                type='button'
                class='btn btn-primary'
              >
                Editar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListUsers;
