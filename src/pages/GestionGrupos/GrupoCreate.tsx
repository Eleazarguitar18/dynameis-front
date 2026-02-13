import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import GrupoNuevoFrom from "../../components/form/grupos/GrupoNuevoFrom";

export default function GrupoCreate() {
  return (
    <div>
      <PageMeta
        title="Nuevo Grupo"
        description="Esta es la página para crear un nuevo grupo"
      />
      <PageBreadcrumb pageTitle="Formulario de nuevo grupo" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <GrupoNuevoFrom />
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
