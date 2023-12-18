export class Workplan {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    description: string;
    worksite: string;
    status: string;
  
    constructor(
      id: number,
      name: string,
      startDate: Date,
      endDate: Date,
      description: string,
      worksite: string,
      status: string
    ) {
      this.id = id;
      this.name = name;
      this.startDate = startDate;
      this.endDate = endDate;
      this.description = description;
      this.worksite = worksite;
      this.status = status;
    }
  }
  