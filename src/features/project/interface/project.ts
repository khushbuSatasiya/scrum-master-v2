export interface IProjectsProps {
    uId: string;
  }
  
  export  interface IExcelProps {
      projectName: string;
      date: Date |string;
      teamDetails:TeamDetail[]
      projectId:string
      
  }
  export  interface TeamDetail {
      id: string;
      realName: string;
      avatar: string;
      designation?:string
  }

  export interface IProjectProps {
	projectId: string;
	projectName: string;
	logo: string;
	date: string;
	status: string;
	type: string;
	leadDetails: LeadDetails;
	teamDetails: TeamDetail[];
}

export interface LeadDetails {
	id: string;
	realName: string;
	avatar: string;
}


