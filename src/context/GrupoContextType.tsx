import  { createContext, useContext, useState, ReactNode } from 'react';
import { Grupo } from "../components/interfaces/grupo.interface";
interface GrupoContextType {
  grupos: Grupo[];
  setGrupos: (grupos: Grupo[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  getGrupoById: (id: number) => Grupo | undefined;
}

const GrupoContext = createContext<GrupoContextType | undefined>(undefined);

export const GrupoProvider = ({ children }: { children: ReactNode }) => {
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Función de utilidad para buscar un grupo rápido por ID
  const getGrupoById = (id: number) => {
    return grupos.find((g) => g.id === id);
  };

  return (
    <GrupoContext.Provider value={{ grupos, setGrupos, loading, setLoading, getGrupoById }}>
      {children}
    </GrupoContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useGrupos = () => {
  const context = useContext(GrupoContext);
  if (!context) {
    throw new Error('useGrupos debe usarse dentro de un GrupoProvider');
  }
  return context;
};