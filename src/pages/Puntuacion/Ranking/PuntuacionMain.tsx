import PageBreadcrumb from "../../../components/common/PageBreadCrumb";
import ComponentCard from "../../../components/common/ComponentCard";
import PageMeta from "../../../components/common/PageMeta";
import axios from "axios";
import { url_base } from "../../../constants/url_base";
import { useEffect} from "react";
import { useNavigate } from "react-router";
import RankingTable from "../../../components/tables/puntuacion/RankingTable";
import { useGrupos } from "../../../context/GrupoContextType"; // 1. Importa el hook
export default function PuntuacionMain() {
  const navigate = useNavigate();
  // 1. Estado para almacenar los grupos
  // const [loading, setLoading] = useState<boolean>(true);
  const { grupos, setGrupos, } = useGrupos();
  useEffect(() => {
    const fetchGrupos = async () => {
      // 1. EXTRAER EL TOKEN:
      // El nombre 'token' debe ser el mismo que usaste en el login al hacer localStorage.setItem('token', ...)
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`${url_base}/grupo/ranking`, {
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
        // setLoading(false);
      }
    };

    fetchGrupos();
  }, []);
  console.log("ranking", grupos);
  const sancionarGrupo = () => {

    // Aquí iría la lógica para crear un nuevo grupo, como mostrar un formulario o redirigir a una página de creación
    navigate("/sancionar-grupo"); // Ejemplo de redirección a una página de creación de grupo
  };
  const sumarPuntos = () => {
    // Aquí iría la lógica para crear un nuevo grupo, como mostrar un formulario o redirigir a una página de creación
    navigate("/sumar-puntos"); // Ejemplo de redirección a una página de creación de grupo
  };
  return (
    <>
      <PageMeta
        title="PUNTUACION"
        description="Esta es la página de puntuación"
      />
      <PageBreadcrumb pageTitle="PUNTUACION DE GRUPOS" />

      {/* Contenedor para alinear el botón */}

      <div className="flex justify-end mb-4">
        <button
          className="px-5 py-3 mr-2 flex bg-red-800 text-white rounded-lg font-bold hover:bg-red-900 transition-colors active:scale-95"
          onClick={sancionarGrupo}
        >
          <div className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
          </div>
          <div>Sancionar</div>
        </button>
        <button
          className="px-5 py-3 flex bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition-colors active:scale-95"
          onClick={sumarPuntos}
        >
          <div className="mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          Sumar puntos
        </button>
      </div>

      <div className="space-y-6">
        <ComponentCard title="Lista de Grupos">
          <RankingTable grupos={grupos} />
        </ComponentCard>
      </div>
    </>
  );
}
