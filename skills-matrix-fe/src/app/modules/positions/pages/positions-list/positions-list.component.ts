import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PositionsListDataSource, PositionsListItem } from './positions-list-datasource';
import {PositionService} from "../../../../core/services/position/position.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-positions-list',
  templateUrl: './positions-list.component.html',
  styleUrls: ['./positions-list.component.css']
})
export class PositionsListComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<PositionsListItem>;

  dataSource: PositionsListDataSource;

  constructor(private positionService: PositionService,
              private router: Router) {}

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  positions: any[];
  displayedColumns = ['id', 'project_id', 'project_name', 'position_name', 'description' ,'actions'];

  ngOnInit() {
    this.dataSource = new PositionsListDataSource(this.positionService);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
 
  fetchPositions() {
    this.positionService.getPositions()
      .subscribe( (response: any) => {
        this.positions = response.data;
        console.log('Data requested ...');
        console.log(this.positions);
      });
  }

  deletePosition(id) {
    this.positionService
      .deletePosition(id)
      .subscribe(() => {
        this.fetchPositions();
      });
  }
}
