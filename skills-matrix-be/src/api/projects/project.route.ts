import { Router } from 'express';
import ProjectController from "./project.controller";


const project: Router = Router();
const projectController = new ProjectController();

project.get('/', projectController.getAll);

project.post('/add', projectController.addProject);

project.get('/:id', projectController.getProjectById);
project.delete('/:id', projectController.removeProject);

export default project;
