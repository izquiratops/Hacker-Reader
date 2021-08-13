import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { finalize, Observable } from 'rxjs';

import { HNService } from 'src/app/shared/hn.service';
import { SharedService } from 'src/app/shared/shared.service';
import { Animations } from 'src/app/shared/animations';
import { Item, ItemFlatNode } from 'src/app/shared/interfaces';
import { LoadState, Palette } from 'src/app/shared/enums';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [Animations.showItem]
})
export class CommentsComponent implements OnInit {

  @ViewChild('scrollElement', { static: true }) scrollEl: ElementRef;

  private readonly transformer = (node: Item, level: number): ItemFlatNode => {
    return {
      ...node,
      level: level,
      color: Palette[level % 7],
      expandable: !!node.kids && node.kids.length > 0
    };
  }

  treeControl = new FlatTreeControl<ItemFlatNode>(
    node => node.level,
    node => node.expandable
  );

  treeFlattener = new MatTreeFlattener(
    this.transformer,
    node => node.level,
    node => node.expandable,
    node => node.replies
  );

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // Comments context (UI Bindings)
  currentItem$: Observable<Item>;
  loadState = LoadState.WAITING;
  emptyItem = false;

  constructor(
    private route: ActivatedRoute,
    private hn: HNService,
    public shared: SharedService
  ) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;

    this.loadState = LoadState.WAITING;
    this.currentItem$ = this.hn.getItem(+id);
    this.hn.getStoryComments(this.currentItem$)
    .pipe(
      finalize(() => this.loadState = LoadState.IDLE)
    )
    .subscribe((comments: Item[]) => {
      if (comments.length === 0) {
        this.emptyItem = true;
      } else {
        this.dataSource.data = comments;
        this.treeControl.expandAll();
      }
    });
  }

  hasChild = (_: number, node: ItemFlatNode) => node.expandable;

}
