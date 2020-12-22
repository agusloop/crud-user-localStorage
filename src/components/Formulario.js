import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Formulario = (props) => {
  console.log(props);
  const { crearUsuario, editUsr, usuarios, setUsuarios } = props;
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
    direccion: "",
    ciudad: "",
    rol: "",
  });

  const [error, setError] = useState(false);
  const [edit, setEdit] = useState(false);
  const { email, password, direccion, ciudad, rol } = usuario;

  const handleInputsValues = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const [{ email, password, direccion, ciudad, rol, id }] = editUsr;

    if (id !== undefined) {
      setUsuario({
        email,
        password,
        direccion,
        ciudad,
        rol,
      });
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [editUsr]);

  const createUsuario = (e) => {
    e.preventDefault();
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      direccion.trim() === "" ||
      ciudad.trim() === "" ||
      rol.trim() === ""
    ) {
      setError(true);
      return;
    }

    setError(false);

    usuario.id = uuidv4();
    crearUsuario(usuario);

    setUsuario({
      email: "",
      password: "",
      direccion: "",
      ciudad: "",
      rol: "",
    });
  };

  const updateUsuario = (e) => {
    e.preventDefault();

    const [{ id: editId, email, password, direccion, ciudad, rol }] = editUsr;

    const newData = usuarios.map((obj) => {
      if (obj.id === editId)
        return Object.assign({}, obj, {
          email: usuario.email,
          password: usuario.password,
          direccion: usuario.direccion,
          ciudad: usuario.ciudad,
          rol: usuario.rol,
        });
      return obj;
    });
    console.log(newData);
    setUsuarios(newData);
    setUsuario({
      id: "",
      email: "",
      password: "",
      direccion: "",
      ciudad: "",
      rol: "",
    });
    setEdit(false);
  };

  return (
    <div className='container'>
      {error && (
        <div className='alert alert-danger' role='alert'>
          Todos los campos son obligatorios
        </div>
      )}
      <h2>Agregar un nuevo Usuario</h2>
      <form onSubmit={edit === false ? createUsuario : updateUsuario}>
        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label for='inputEmail4'>Email</label>
            <input
              name='email'
              value={email}
              type='email'
              className='form-control'
              placeholder='Email'
              onChange={handleInputsValues}
            />
          </div>
          <div className='form-group col-md-6'>
            <label for='inputPassword4'>Password</label>
            <input
              name='password'
              value={password}
              type='password'
              className='form-control'
              placeholder='Password'
              onChange={handleInputsValues}
            />
          </div>
        </div>
        <div className='form-group'>
          <label for='inputAddress'>Direccion</label>
          <input
            name='direccion'
            value={direccion}
            type='text'
            className='form-control'
            placeholder='Ingresa tu direccion'
            onChange={handleInputsValues}
          />
        </div>

        <div className='form-row'>
          <div className='form-group col-md-6'>
            <label for='inputCity'>Ciudad</label>
            <input
              name='ciudad'
              value={ciudad}
              type='text'
              className='form-control'
              onChange={handleInputsValues}
            />
          </div>
          <div className='form-group col-md-4'>
            <label for='inputState'>Rol de Usuario</label>
            <select
              name='rol'
              value={rol}
              className='form-control'
              onChange={handleInputsValues}
            >
              <option selected>Elige un Rol...</option>
              <option value='Administrador'>Administrador</option>
              <option value='Gerente'>Gerente</option>
              <option value='Consultor'>Consultor</option>
            </select>
          </div>
        </div>

        <button type='submit' className='btn btn-primary'>
          {edit === true ? "Editar" : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default Formulario;
