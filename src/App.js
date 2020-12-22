import React, { useState, useEffect } from "react";
import "./App.css";
import Formulario from "./components/Formulario";
import ListUsers from "./components/ListUsers";

const App = () => {
  let usuariosIniciales = JSON.parse(localStorage.getItem("usuarios"));
  if (!usuariosIniciales) {
    usuariosIniciales = [];
  }

  const [usuarios, setUsuarios] = useState(usuariosIniciales);
  const [edit, setEdit] = useState([{}]);

  useEffect(() => {
    let usuariosIniciales = JSON.parse(localStorage.getItem("usuarios"));

    if (usuariosIniciales) {
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
    } else {
      localStorage.setItem("usuarios", JSON.stringify([]));
    }
    console.log("Usuarios alamacenados", usuarios);
  }, [usuarios]);

  const crearUsuario = (user) => {
    setUsuarios([...usuarios, user]);
  };

  const eliminarUsuario = (id) => {
    const newUser = usuarios.filter((user) => user.id !== id);
    setUsuarios(newUser);
  };

  const editarUsuarios = (usr) => {
    console.log(usr);
    const editUser = usuarios.filter((user) => user.id === usr.id);
    console.log("Papu", editUser);

    setEdit(editUser);
  };

  // Mensaje condicional
  const titulo =
    usuarios.length === 0 ? "No hay Usuarios" : "Administra tus Usuarios";

  return (
    <div className='App'>
      <div className='container'>
        <div className='row'>
          <div className='col-sm'>
            <Formulario
              crearUsuario={crearUsuario}
              editUsr={edit}
              usuarios={usuarios}
              setUsuarios={setUsuarios}
            />
          </div>
          <div className='col-sm'>
            <h2>{titulo}</h2>
            {usuarios.map((usr) => (
              <ListUsers
                key={usr.id}
                usr={usr}
                eliminarUsuario={eliminarUsuario}
                editarUsuarios={editarUsuarios}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
