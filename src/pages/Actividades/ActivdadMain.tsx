import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import axios from "axios";
import { url_base } from "../../constants/url_base";
import { useEffect, useState } from "react";
import TablaActividades from "../../components/tables/actividades/TablaActividades";
import { Actividad } from "../../components/interfaces/actividad.interface";
import { useNavigate } from "react-router";

export default function ActividadMain() {
  const navigate=useNavigate();
const nuevaActividad = () => {
    // Aquí iría la lógica para crear una nueva actividad, como mostrar un formulario o redirigir a una página de creación
    navigate("/actividades/nuevo"); // Ejemplo de redirección a una página de creación de actividad
  }
  // 1. Estado para almacenar los actividades
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

  return (
    <>
      {/* componentes de la tabla actividades */}
      <PageMeta
        title="ACTIVIDADES"
        description="Esta es la página de actividades"
      />
      <PageBreadcrumb pageTitle="ACTIVIDADES" />
      <div className="flex justify-end mb-4">
        <button
          className="px-5 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors active:scale-95"
          onClick={nuevaActividad}
        >
          + Nueva actividad
        </button>
      </div>
      <div className="space-y-6">
        <ComponentCard title="Lista de Actividades">
          <TablaActividades actividades={actividades} />
        </ComponentCard>
      </div>
    </>
  );
}
