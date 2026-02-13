import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import ActividadNuevoFrom from "../../components/form/actividades/ActividadNuevoFrom";

export default function ActividadCreate() {
  return (
    <div>
      <PageMeta
        title="Nueva Actividad"
        description="Esta es la página para crear una nueva actividad"
      />
      <PageBreadcrumb pageTitle="Formulario de nueva actividad" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <ActividadNuevoFrom />
          {/* <SelectInputs /> */}
          {/* <TextAreaInput /> */}
          {/* <InputStates /> */}
        </div>
        {/* <div className="space-y-6">
          <InputGroup />
          <FileInputExample />
          <CheckboxComponents />
          <RadioButtons />
          <ToggleSwitch />
          <DropzoneComponent />
        </div> */}
      </div>
    </div>
  );
}
