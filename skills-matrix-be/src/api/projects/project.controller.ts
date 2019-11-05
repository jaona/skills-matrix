import {Request, Response} from "express";

import {ApiResponse} from "../../common/api.response.model";
import {ErrorHandler, handleError} from "../../common/Error";
import {db, pgp} from "../../db/db";

export default class ProjectController {

  public getProjects = async (req: Request, res: Response, next: any): Promise<any> => {

    try {

      const projects = await db.any("SELECT * FROM projects", []);

      if (Object.keys(projects).length === 0) {
        throw new ErrorHandler(404, "Project(s) not found");
      }
      res.status(200).send(new ApiResponse(true, "Project(s) found", projects, 200));
      next();
    } catch (err) {
      next(err);
    }
  }

  public getProject = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const infos = await db.any("SELECT * FROM projects WHERE id = $1", [req.params.project_id]);
      /*const resources = await db.any(
        'SELECT
          r.id, r.first_name, r.last_name, r.employee_number,
          p.id "position_id", p.display_name "position",
          m.is_active
        FROM resources r, positions p, missions m\n' +
        'WHERE\n' +
        '    m.project_id = $1\n' +
        '    AND m.position_id = p.id\n' +
        '    AND m.resource_id = r.id', [req.params.project_id]);*/
      // const project_teams = await db.any(
      //  'SELECT
      //    id "team_id", name
      //   FROM project_teams
      //    WHERE project_id = $1', [req.params.project_id]);

      if (Object.keys(infos).length === 0) {
        throw new ErrorHandler(404, "Project not found");
      }

      res.status(200).send(new ApiResponse(true, "Project found", infos, 200));
      /*{
      data:
      infos,
      // project_teams
      // resources,
      // positions,
      success: true,
    });*/
      next();
    } catch (err) {
      next(err);
      /*res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });*/
    }
  }

  public createProjects = async (req: Request, res: Response): Promise<any> => {
    try {

      const projectsColumnSet = new pgp.helpers.ColumnSet(
        ["name", "project_otp_code", "start_date", "end_date"],
        {table: "projects"});
      const projectsValues = req.body;
      const projectsQuery = pgp.helpers.insert(projectsValues, projectsColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
      const projectsResult = await db.any(projectsQuery);

      res.status(201).send({
        data: projectsResult,
        message: "Project(s) successfully created",
        success: true,
      });

    } catch (err) {

      res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });

    }
  }

  public getProjectTeams = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const projectTeams = await db.any("SELECT * FROM project_teams WHERE project_id = $1", [req.params.project_id]);

      if (Object.keys(projectTeams).length === 0) {
        throw new ErrorHandler(404, "Project(s) teams not found");
      }

      res.status(200).send(new ApiResponse(true, "Project(s) team found", projectTeams, 200));
      /*{
      data: projectTeams,
      data_length: projectTeams.length,
      success: true,
    });*/
      next();
    } catch (err) {
      next(err);
      /*res.status(500).send({
        data: null,
        message: err.toString(),
        success: false,
      });*/

    }
  }

  public getProjectPositions = async (req: Request, res: Response, next: any): Promise<any> => {
    try {

      const projectPositions = await db.any("SELECT * FROM positions WHERE project_id = $1", [req.params.project_id]);

      if (Object.keys(projectPositions).length === 0) {
        throw new ErrorHandler(404, "Project(s) teams not found");
      }
      res.status(200).send(new ApiResponse(true, "Project(s) team found", projectPositions, 200));
      next();
    } catch (err) {
      next(err);
    }
  }

  public createProjectTeams = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      if (req.body.project_id !== req.params.project_id) {
        throw new ErrorHandler(409, "Conflict: project_ids are different");
      }
      const projectTeams = await db.any("SELECT * FROM project_teams WHERE project_id = $1", [req.params.project_id]);
      if (projectTeams.length === 0) {
        const projectTeamsColumnSet = new pgp.helpers.ColumnSet(
          ["project_id", "name"],
          {table: "project_teams"});
        const projectTeamsValues = req.body;
        const projectTeamsQuery = pgp.helpers.insert(projectTeamsValues, projectTeamsColumnSet) + " ON CONFLICT DO NOTHING RETURNING *";
        const projectTeamsResult = await db.any(projectTeamsQuery);

        if (projectTeamsResult.length !== 0) {
          res.status(201).send(new ApiResponse(true, "Project team created", projectTeamsResult, 201));
        } else {
          throw new ErrorHandler(400, "Bad request");
        }
      } else {
        throw new ErrorHandler(409, "Conflict: the request could not be completed due to a conflict with the current state of the resource. ");
      }
      next();

    } catch (err) {
      next(err);
    }
  }

  public updateProjects = async (req: Request, res: Response, next: any): Promise<any> => {
    try {
      const projectsColumnSet = new pgp.helpers.ColumnSet(
        ["name", "project_otp_code", "?start_date", "?end_date"],
        {table: "projects"});
      const projectsValues = req.body;
      const projectsQuery = pgp.helpers.update(projectsValues, projectsColumnSet) + " WHERE id = $1";
      const proJ = await db.result(projectsQuery, [req.params.project_id]);
      if (proJ.rowCount === 1) {
        res.status(200).send(new ApiResponse(true, "Project updated successfully", [], 200));
      } else {
        throw new ErrorHandler();
      }
      next();
    } catch (err) {
      next(err);
    }
  }
}
