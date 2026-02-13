import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import axios from "axios";
import { url_base } from "../../constants/url_base";
import { useEffect, useState } from "react";
import { Grupo } from "../../components/interfaces/grupo.interface";
import TablaGrupos from "../../components/tables/grupos/TablaGrupos";
import { useNavigate } from "react-router";

export default function GrupoMain() {
  const navigate=useNavigate()
  // 1. Estado para almacenar los grupos
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchGrupos = async () => {
      // 1. EXTRAER EL TOKEN:
      // El nombre 'token' debe ser el mismo que usaste en el login al hacer localStorage.setItem('token', ...)
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${url_base}/grupo`, {
          // 2. ENVIAR EL TOKEN EN LOS HEADERS:
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setGrupos(response.data);
      } catch (error) {
        console.error("Error al obtener grupos:", error);
        // Opcional: Si el token expiró (401), podrías redirigir al login
      } finally {
        setLoading(false);
      }
    };

    fetchGrupos();
  }, []);
  console.log(grupos);
  const nuevoGrupo = () => {
    // Aquí iría la lógica para crear un nuevo grupo, como mostrar un formulario o redirigir a una página de creación
    navigate("/grupos/nuevo"); // Ejemplo de redirección a una página de creación de grupo
  }
  return (
    <>
      <PageMeta title="GRUPOS" description="Esta es la página de grupos" />
      <PageBreadcrumb pageTitle="GRUPOS" />

      {/* Contenedor para alinear el botón */}
      <div className="flex justify-end mb-4">
        <button className="px-5 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors active:scale-95"
        onClick={nuevoGrupo}>
          + Nuevo grupo
        </button>
      </div>

      <div className="space-y-6">
        <ComponentCard title="Lista de Grupos">
          <TablaGrupos grupos={grupos} />
        </ComponentCard>
      </div>
    </>
  );
}
