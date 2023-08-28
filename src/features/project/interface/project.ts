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
  }