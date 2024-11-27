import AddCriteriasForm from "./addCriteriasForm";
import Loader from "@/components/loader";
import AreaSelector from "./areaSelector";
import { useState } from "react";
import { useDocumentationStore } from "@/store/documentations";
import {
  useGetAreas,
  useGetCriteriasByAreaId,
} from "@/api/documentations/queries/hooks";

type AddCriteriasProps = {
  nextStep: () => void;
};

const AddCriterias = ({ nextStep }: AddCriteriasProps) => {
  const selectedAreasWithCriteria = useDocumentationStore(
    (state) => state.selectedAreasWithCriteria
  );
  const {
    data: areas,
    isLoading: areasLoading,
    error: areasError,
  } = useGetAreas();
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const { data: criterias, isLoading: criteriasLoading } =
    useGetCriteriasByAreaId(selectedAreaId);

  const selectArea = (areaId: number) => {
    setSelectedAreaId(areaId);
  };

  const handleSubmitCriterias = () => {
    nextStep();
  };

  if (areasLoading) {
    return <Loader />;
  }
  if (areasError) {
    return <div>Error fetching areas: {areasError.message}</div>;
  }
  if (!areas) {
    return <div>No areas found</div>;
  }

  const existingIds = selectedAreasWithCriteria
    .flatMap((area) => area.criteria)
    .map((c) => c.criteriaId);

  const selectedArea = areas.find((area) => area.area_id === selectedAreaId);

  return (
    <div className="flex flex-col items-center">
      <AreaSelector areas={areas} onSubmit={selectArea} />
      {criteriasLoading && <Loader />}
      {selectedArea && (
        <AddCriteriasForm
          criterias={criterias || []}
          onSubmit={handleSubmitCriterias}
          defaultSelectedIds={existingIds}
          selectedAreaId={selectedArea.area_id}
          areaName={selectedArea.area_name}
        />
      )}
    </div>
  );
};

export default AddCriterias;
