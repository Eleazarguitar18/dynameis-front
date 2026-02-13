import { useEffect, useState } from "react";
import ComponentCard from "../../../components/common/ComponentCard";
import Input from "../../../components/form/input/InputField";
import Label from "../../../components/form/Label";
import Select from "../../../components/form/Select";
import { useGrupos } from "../../../context/GrupoContextType";
import { Actividad } from "../../../components/interfaces/actividad.interface";
import axios from "axios";
import { url_base } from "../../../constants/url_base";
import { useNavigate } from "react-router";
type Puntaje = {
  id_grupo: number;
  id_actividad: number;
  monto: number;
  motivo: string;
  url_evidencia: string;
};

export default function SumarPuntaje() {
  const navigate = useNavigate();
  const { grupos } = useGrupos();
  const [puntajeNuevo, setPuntajeNuevo] = useState<Puntaje>({
    id_grupo: 0,
    id_actividad: 0,
    monto: 0,
    motivo: "",
    url_evidencia: "https://mi-campamento.com/foto1.jpg",
  });

  // funcion para traer las actividades
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchActividades = async () => {
      // 1. EXTRAER EL TOKEN:
      // El nombre 'token' debe ser el mismo que usaste en el login al hacer localStorage.setItem('token', ...)
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${url_base}/actividad`, {
          // 2. ENVIAR EL TOKEN EN LOS HEADERS:
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setActividades(response.data);
        console.log("Actividades obtenidas:", response.data);
      } catch (error: any) {
        // --- AQUÍ CAPTURAMOS EL ERROR DEL BACKEND ---
        if (error.response) {
          // El servidor respondió con un código fuera del rango 2xx
          const status = error.response.status; // Ejemplo: 400, 401, 500
          const mensaje = error.response.data.message || "Error en el servidor";

          console.error(`Error ${status}:`, error.response.data);
          alert(`Error ${status}: ${mensaje}`);
        } else if (error.request) {
          // La petición se hizo pero no hubo respuesta (Error de red/servidor apagado)
          console.error("No se recibió respuesta del servidor");
          alert("Error de red: No se pudo conectar con el servidor.");
        } else {
          // Algo pasó al configurar la petición
          console.error("Error desconocido:", error.message);
          alert("Ocurrió un error inesperado.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActividades();
  }, []);


   const handleSubmit = async () => {
    if (!puntajeNuevo.id_grupo || !puntajeNuevo.id_actividad || !puntajeNuevo.motivo) {
      alert("Por favor completa el monto y el motivo");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${url_base}/puntuacion`,
        puntajeNuevo, // Enviamos el objeto del estado
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // console.log("respuesta:", response.status);
      // if(response.status !== 201){
      //   console.error("Error al crear grupo:", response.data);
      //   alert(` Error al crear grupo: ${response.data.message || "Error desconocido"}`);
      // }
      console.log("puntaje",puntajeNuevo);
      console.log("Grupo creado con éxito:", response.data);
      alert("¡Grupo creado correctamente!");

      // Opcional: Limpiar formulario o cerrar modal
      setPuntajeNuevo({
        id_grupo: 0,
        id_actividad: 0,
        monto: 0,
        motivo: "",
        url_evidencia: "https://mi-campamento.com/foto1.jpg",
      });
      navigate("/ranking"); // Redirige a la lista de grupos después de crear uno nuevo
    } catch (error: any) {
      // --- AQUÍ CAPTURAMOS EL ERROR DEL BACKEND ---
      if (error.response) {
        // El servidor respondió con un código fuera del rango 2xx
        const status = error.response.status; // Ejemplo: 400, 401, 500
        const mensaje = error.response.data.message || "Error en el servidor";

        console.error(`Error ${status}:`, error.response.data);
        alert(`Error ${status}: ${mensaje}`);
      } else if (error.request) {
        // La petición se hizo pero no hubo respuesta (Error de red/servidor apagado)
        console.error("No se recibió respuesta del servidor");
        alert("Error de red: No se pudo conectar con el servidor.");
      } else {
        // Algo pasó al configurar la petición
        console.error("Error desconocido:", error.message);
        alert("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };
  // const [grupoNuevo, setGrupoNuevo] = useState({
  //   id: 0,
  //   nombre: "",
  //   color_hex: "",
  //   puntos_total: 0,
  // });
  // console.log("grupos en sumar puntaje", grupos);
  return (
    <ComponentCard title="Nuevo grupo">
      <div className="space-y-6">
        <div>
          <Label>Selecciona el equipo</Label>
          <Select
            options={grupos.map((grupo) => ({
              value: grupo.id.toString(),
              label: grupo.nombre,
            }))}
            placeholder="Selecciona el equipo"
            className="dark:bg-dark-900"
            onChange={(value) =>
              setPuntajeNuevo({ ...puntajeNuevo, id_grupo: Number(value) })
            }
          />
        </div>
        <div>
          <Label>Selecciona la actvidad</Label>
          <Select
            options={actividades.map((actividad) => ({
              value: `${actividad.id}-${actividad.puntos_base}`,
              label: `${actividad.nombre} (${actividad.puntos_base} puntos)`,
            }))}
            placeholder="Selecciona la actividad"
            className="dark:bg-dark-900"
            onChange={(value) => {
              const [id_actividad, puntos_base] = value.split("-");
              setPuntajeNuevo({
                ...puntajeNuevo,
                id_actividad: Number(id_actividad),
                monto: Number(puntos_base),
              });
            }}
          />
        </div>
        <div>
          <Label htmlFor="inputTwo">Motivo:</Label>
          <Input
            type="text"
            id="inputTwo"
            placeholder="Ganar actividad"
            value={puntajeNuevo.motivo}
            onChange={(e) =>
              setPuntajeNuevo({ ...puntajeNuevo, motivo: e.target.value })
            }
          />
        </div>
        {/* <div>
          <Label htmlFor="inputTwo">Puntaje inicial:</Label>
          <Input
            type="number"
            id="inputTwo"
            placeholder="Ej: 0"
            value={grupoNuevo.puntos_total}
            onChange={(e) =>
              setGrupoNuevo({
                ...grupoNuevo,
                puntos_total: Number(e.target.value),
              })
            }
          />
        </div> */}
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={() => navigate("/ranking")}
          className={`px-5 py-3 mr-2 text-white rounded-lg font-bold transition-colors active:scale-95 w-full md:w-auto bg-red-500 hover:bg-red-600`}
        >
          Cancelar
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`px-5 py-3 text-white rounded-lg font-bold transition-colors active:scale-95 w-full md:w-auto ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Guardando..." : "Crear grupo"}
        </button>
      </div>
    </ComponentCard>
  );
}
