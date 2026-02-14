import { useState } from "react";
import axios from "axios";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { url_base } from "../../../constants/url_base.ts";
import { useNavigate } from "react-router";
export default function GrupoNuevoFrom() {
  const navigate = useNavigate();
  const [grupoNuevo, setGrupoNuevo] = useState({
    nombre: "",
    color_hex: "",
    puntos_total: 0,
  });
  const options = [
    { value: "#800020", label: "Guindo" }, // Borgoña/Guindo intenso
    { value: "#FACC15", label: "Amarillo" }, // Amarillo vibrante (Tailwind Yellow 400)
    { value: "#0EA5E9", label: "Celeste" }, // Celeste cielo (Tailwind Sky 500)
    { value: "#22C55E", label: "Verde" }, // Verde bosque (Tailwind Green 500)
  ];
  // const handleSelectChange = (value: string) => {
  //   console.log("Selected value:", value);
  // };
  // 2. Función para enviar al Backend
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!grupoNuevo.nombre || !grupoNuevo.color_hex) {
      alert("Por favor completa el nombre y el color");
      return;
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${url_base}/grupo`,
        grupoNuevo, // Enviamos el objeto del estado
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      // console.log("respuesta:", response.status);
      // if(response.status !== 201){
      //   console.error("Error al crear grupo:", response.data);
      //   alert(` Error al crear grupo: ${response.data.message || "Error desconocido"}`);
      // }
      console.log("Grupo creado con éxito:", response.data);
      alert("¡Grupo creado correctamente!");

      // Opcional: Limpiar formulario o cerrar modal
      setGrupoNuevo({
        nombre: "",
        color_hex: "",
        puntos_total: 0,
      });
      navigate("/grupos"); // Redirige a la lista de grupos después de crear uno nuevo
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

  return (
    <ComponentCard title="Nuevo grupo">
      <div className="space-y-6">
        <div>
          <Label htmlFor="inputTwo">Nombre del grupo:</Label>
          <Input
            type="text"
            id="inputTwo"
            placeholder="Ej: Aguilas del monte"
            value={grupoNuevo.nombre}
            onChange={(e) =>
              setGrupoNuevo({ ...grupoNuevo, nombre: e.target.value })
            }
          />
        </div>
        <div>
          <Label>Selecciona el Color</Label>
          <Select
            options={options}
            placeholder="Selecciona el color del grupo"
            className="dark:bg-dark-900"
            onChange={(value) =>
              setGrupoNuevo({ ...grupoNuevo, color_hex: value })
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
          onClick={() => navigate("/grupos")}
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
