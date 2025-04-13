export interface ProjectsProvider {
  getProjects(): Promise<any[]>;
  getProjectById(id: string): Promise<any>;
  createProject(project: any): Promise<void>;
  updateProject(id: string, project: any): Promise<void>;
  deleteProject(id: string): Promise<void>;
}
