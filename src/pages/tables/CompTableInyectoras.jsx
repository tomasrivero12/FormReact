import { useEffect, useState } from 'react';
import {
  BotonInicio,
  BotonInicioTabla,
  ContenedorBotonCentrado,
  ContenedorBotonInicio,
} from '../../elements/Formularios';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { CompModal, CompRow } from '../../Components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faEye,
  faScrewdriverWrench,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

const URI = 'http://192.168.11.139:4001/api/procesos/forms/maquinas';

export const CompTableInyectoras = () => {
  const [data, setData] = useState([]);
  const [stateModal, setStateModal] = useState(false);
  const [dataModal, setDataModal] = useState({
    id: '',
    tabla: '/maquinas/',
    fechaCreado: '',
    horaCreado: '',
    maquinas: '',
    lider: '',
    descripcion: '',
    fechaVisualizado: '',
    horaVisualizado: '',
    recibe: '',
    fechaReparado: '',
    horaReparado: '',
    repara: '',
    observacionesReparar: '',
    fechaVerificado: '',
    horaVerificado: '',
    observacionesVerificar: '',
    estado: '',
  });
  const LiderUser = sessionStorage.getItem('LiderUser');

  const modal = (dataTable) => {
    setStateModal(!stateModal);
    setDataModal(dataTable);
  };

  const deleteRow = async (dataTable) => {
    window.location.reload();
    console.log(URI + '/' + dataTable.id);
    await axios.delete(URI + '/' + dataTable.id);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    const res = await axios.get(URI);
    setData(res.data);
    setInterval(() => {
      window.location.reload();
    }, 150000);
  };

  const deleteSession = () => {
    sessionStorage.removeItem('LiderUser');
  };

  data.sort((a, b) => {
    const verificadoA = a.fechaVerificado + a.horaVerificado;

    const verificadoB = b.fechaVerificado + b.horaVerificado;

    if (verificadoA < verificadoB) {
      return -1;
    }

    if (verificadoA > verificadoB) {
      return 1;
    }

    return 0;
  });

  return (
    <>
      <CompModal
        state={stateModal}
        setState={setStateModal}
        dataTable={dataModal}
      />

      <div className='txtColors'>
        <b>Colores:</b>
        <div className='colores'>
          <div className='coloresTable'>
            <div className='rojo'></div>
            <p>Creado</p>
            <div className='amarillo'></div>
            <p>Visualizado</p>
          </div>
          <div className='coloresTable'>
            <div className='verde'></div>
            <p>Reparado</p>
            <div className='azul'></div>
            <p>Verificado</p>
          </div>
        </div>
      </div>

      {LiderUser !== null && (
        <div className='txtOptions'>
          <b>Opciones:</b>
          <div className='colores'>
            <div className='coloresTable'>
              <div>
                <FontAwesomeIcon className='linkMedia' icon={faEye} />
              </div>
              <p>Creado</p>
              <div>
                <FontAwesomeIcon
                  className='linkMedia'
                  icon={faScrewdriverWrench}
                />
              </div>
              <p>Reparar</p>
            </div>
            <div className='coloresTable'>
              <div>
                <FontAwesomeIcon className='linkMedia' icon={faCheckCircle} />
              </div>
              <p>Verificar</p>
              <div>
                <FontAwesomeIcon className='linkMedia' icon={faTrash} />
              </div>
              <p>Borrar</p>
            </div>
          </div>
        </div>
      )}

      <ContenedorBotonCentrado>
        {LiderUser !== null && (
          <div>
            <BotonInicio type='submit' onClick={deleteSession}>
              <a
                className='noStyle'
                href='http://192.168.11.139:3000/inyeccion'
              >
                Cerrar Sesion
              </a>
            </BotonInicio>
          </div>
        )}

        <a href='http://192.168.11.139:3000/inyeccion'>
          {LiderUser !== null ? (
            <BotonInicio type='submit'>Atras</BotonInicio>
          ) : (
            <BotonInicio type='submit'>Iniciar sesion</BotonInicio>
          )}
        </a>
      </ContenedorBotonCentrado>
      <div>
        <table className='table-fill'>
          <thead>
            <tr>
              <th>Fecha y hora creado</th>
              <th>Maquinas</th>
              <th>Lider a cargo:</th>
              <th>Descripcion:</th>
              <th>Fecha y hora visualizado</th>
              <th>Fecha y hora reparado</th>
              <th>Fecha y hora verificacion</th>
              <th>Opciones</th>
              <th>Estado:</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dataTable) => (
              <CompRow
                key={dataTable.id}
                dataTable={dataTable}
                liderSesion={LiderUser}
                modal={modal}
                deleteRow={deleteRow}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className='noStyleDiv'>
        {LiderUser !== null && (
          <a className='noStyle' href='/FormCreateInyectoras'>
            <ContenedorBotonInicio>
              <BotonInicioTabla type='submit'>
                Crear orden de reparacion: Mantenimiento Inyectoras
              </BotonInicioTabla>
            </ContenedorBotonInicio>
          </a>
        )}
      </div>
    </>
  );
};
