import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";

import Badge from "../../ui/badge/Badge";
import { Grupo } from "../../interfaces/grupo.interface";

// Define the table data using the interface

export default function TablaGrupos({ grupos }: { grupos: Grupo[] }) {
  // const dataGrupos= axios.get(`${url_base}/grupo`);
  // console.log("dataGrupos", dataGrupos);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Color{" "}
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Nombre del Grupo
              </TableCell>
              {/* <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Team
              </TableCell> */}
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Puntaje
              </TableCell>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {grupos.map((grupo) => (
              <TableRow key={grupo.id}>
                <TableCell className="px-5 py-4 sm:px-6 text-start">
                  <div className="flex items-center gap-3">
                    {/* <div className="w-10 h-10 overflow-hidden rounded-full">
                      <img
                        width={40}
                        height={40}
                        src={grupo.user.image}
                        alt={grupo.user.name}
                      />
                    </div> */}
                    <div>
                      <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {/* Esfera de color dinámico */}
                        <div
                          className="w-5 h-5 rounded-full border border-black/10 shadow-sm flex-shrink-0"
                          style={{ backgroundColor: grupo.color_hex }}
                        />
                      </span>
                      {/* <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                        {grupo.user.role}
                      </span> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {grupo.nombre}
                </TableCell>
                {/* <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <div className="flex -space-x-2">
                    {grupo.team.images.map((teamImage, index) => (
                      <div
                        key={index}
                        className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
                      >
                        <img
                          width={24}
                          height={24}
                          src={teamImage}
                          alt={`Team member ${index + 1}`}
                          className="w-full size-6"
                        />
                      </div>
                    ))}
                  </div>
                </TableCell> */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {grupo.puntos_total}
                </TableCell>
                <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  <Badge
                    size="sm"
                    color={grupo.estado === true ? "success" : "error"}
                  >
                    {grupo.estado ? "Habilitado" : "Inhabilitado"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
