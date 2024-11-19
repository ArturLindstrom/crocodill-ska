import { Criteria } from "@/types";
import { DocumentationState } from "../types/shared";

export function updateOrAddArea(
  areas: DocumentationState["selectedAreasWithCriteria"],
  areaId: number | string,
  areaName: string,
  criteria: Criteria
): DocumentationState["selectedAreasWithCriteria"] {
  const existingArea = areas.find((area) => area.areaId === areaId);

  if (existingArea) {
    return areas.map((area) =>
      area.areaId === areaId
        ? {
            ...area,
            criteria: [
              ...area.criteria,
              {
                criteriaId: criteria.criteria_id,
                criteriaName: criteria.criteria_name,
              },
            ],
          }
        : area
    );
  }

  return [
    ...areas,
    {
      areaId,
      areaName,
      criteria: [
        {
          criteriaId: criteria.criteria_id,
          criteriaName: criteria.criteria_name,
        },
      ],
    },
  ];
}

export function removeCriteria(
  areas: DocumentationState["selectedAreasWithCriteria"],
  areaId: number | string,
  criteriaId: number
): DocumentationState["selectedAreasWithCriteria"] {
  return areas
    .map((area) =>
      area.areaId === areaId
        ? {
            ...area,
            criteria: area.criteria.filter((c) => c.criteriaId !== criteriaId),
          }
        : area
    )
    .filter((area) => area.criteria.length > 0);
}
