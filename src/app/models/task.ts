export class Task {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    duration: number;
    resources: string;
    objectiveIds: number[];
    crewIds: number[];
  
    constructor(
      id: number,
      name: string,
      startDate: Date,
      endDate: Date,
      description: string,
      duration: number,
      resources: string,
      objectiveIds: number[],
      crewIds: number[]
    ) {
      this.id = id;
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
      this.description = description;
      this.duration = duration;
      this.resources = resources;
      this.objectiveIds = objectiveIds;
      this.crewIds = crewIds;
    }
  }
  