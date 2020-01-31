create database skills_api
	with owner admin;

create table skills
(
	id serial not null
		constraint skills_pkey
			primary key,
	name varchar(60) not null
		constraint skills_name_key
			unique,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null
);

alter table skills owner to admin;

create table skill_categories
(
	id serial not null
		constraint skill_categories_pkey
			primary key,
	name varchar(60) not null
		constraint skill_categories_name_key
			unique,
	display_name varchar(60) not null,
	created_at timestamp default CURRENT_TIMESTAMP not null,
	updated_at timestamp default CURRENT_TIMESTAMP not null
);

alter table skill_categories owner to admin;

create table competencies
(
	id serial not null
		constraint competencies_pkey
			primary key,
	skill_id integer
		constraint competencies_skill_id_fkey
			references skills
				on update cascade on delete cascade,
	level integer
);

alter table competencies owner to admin;

create index competencies_skill_id_index
	on competencies (skill_id);

create table projects
(
	id serial not null
		constraint projects_pkey
			primary key,
	name varchar(60) not null
		constraint projects_name_key
			unique,
	project_otp_code varchar(30)
		constraint projects_project_otp_code_key
			unique,
	start_date timestamp,
	end_date timestamp
);

alter table projects owner to admin;

create table resources
(
	id serial not null
		constraint resources_pkey
			primary key,
	first_name varchar(30) not null,
	last_name varchar(30) not null,
	employee_number varchar(30) not null
		constraint resources_employee_number_key
			unique,
	email varchar(60)
);

alter table resources owner to admin;

create table positions
(
	id serial not null
		constraint positions_pkey
			primary key,
	project_id integer not null
		constraint positions_project_id_fkey
			references projects,
	name varchar(60),
	description text
);

alter table positions owner to admin;

create table competency_requirements
(
	id serial not null
		constraint competency_requirements_pkey
			primary key,
	position_id integer
		constraint competency_requirements_position_id_fkey
			references positions,
	competency_id integer
		constraint competency_requirements_competency_id_fkey
			references competencies,
	description text,
	created_at timestamp not null,
	updated_at timestamp not null
);

alter table competency_requirements owner to admin;

create table missions
(
	id serial not null
		constraint missions_pkey
			primary key,
	resource_id integer
		constraint missions_resource_id_fkey
			references resources,
	project_id integer
		constraint missions_project_id_fkey
			references projects,
	position_id integer
		constraint missions_position_id_fkey
			references positions,
	start_date timestamp default CURRENT_TIMESTAMP not null,
	end_date timestamp default CURRENT_TIMESTAMP not null,
	is_active boolean default true not null
);

alter table missions owner to admin;

create table position_requirements
(
	position_id integer
		constraint position_requirements_position_id_fkey
			references positions
				on update cascade on delete cascade,
	competency_id integer
		constraint position_requirements_competency_id_fkey
			references competencies
				on update cascade on delete cascade
);

alter table position_requirements owner to admin;

create table skill_categorizations
(
	skill_id integer not null
		constraint skill_categorizations_skill_id_fkey
			references skills
				on update cascade on delete cascade,
	category_id integer not null
		constraint skill_categorizations_category_id_fkey
			references skill_categories
);

alter table skill_categorizations owner to admin;

create table resource_competencies
(
	resource_id integer
		constraint resource_competencies_resource_id_fkey
			references resources
				on update cascade on delete cascade,
	competency_id integer
		constraint resource_competencies_competency_id_fkey
			references competencies
				on update cascade on delete cascade,
	assessed_on timestamp default CURRENT_TIMESTAMP not null,
	validation_date timestamp,
	validator_id integer
		constraint resource_competencies_resources_id_fk
			references resources
				on update cascade,
	is_validated boolean default false not null,
	is_pending_validation boolean default true not null
);

alter table resource_competencies owner to admin;

create table project_teams
(
	id serial not null
		constraint project_teams_pk
			primary key,
	project_id integer not null
		constraint project_teams_projects_id_fk
			references projects
				on update cascade on delete cascade,
	name varchar(60) not null
);

alter table project_teams owner to admin;

create table team_memberships
(
	team_id integer not null
		constraint team_memberships_project_teams_id_fk
			references project_teams
				on update cascade on delete cascade,
	resource_id integer not null
		constraint team_memberships_resources_id_fk
			references resources
				on update cascade on delete cascade
);

alter table team_memberships owner to admin;

create index team_memberships_resource_id_index
	on team_memberships (resource_id);

create index team_memberships_team_id_index
	on team_memberships (team_id);

create table competency_groups
(
	id serial not null
		constraint competency_groups_pk
			primary key,
	position_id integer not null
		constraint competency_groups_positions_id_fk
			references positions
				on update cascade on delete cascade,
	name varchar(60) not null
);

alter table competency_groups owner to admin;

create table competency_group_competencies
(
	competency_id integer not null
		constraint competency_group_competencies_competencies_id_fk
			references competencies
				on update cascade on delete cascade,
	competency_group_id integer not null
		constraint competency_group_competencies_competency_groups_id_fk
			references competency_groups
				on update cascade on delete cascade
);

alter table competency_group_competencies owner to admin;

create index competency_group_competencies_competency_group_id_index
	on competency_group_competencies (competency_group_id);

create index competency_group_competencies_competency_id_index
	on competency_group_competencies (competency_id);
