import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs';

import { HNService } from 'src/app/_shared/services/hn.service';
import { SharedService } from 'src/app/_shared/services/shared.service';
import { Animations } from 'src/app/_shared/animations';
import { Item, ItemFlatNode } from 'src/app/_shared/interfaces';
import { LoadState } from 'src/app/_shared/enums';
import { palette } from 'src/app/_shared/colors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [Animations.showItem]
})
export class CommentsComponent implements OnInit {

  @ViewChild('scrollElement', { static: true }) scrollElement: ElementRef;

  private readonly transformer = (node: Item, level: number): ItemFlatNode => {
    return {
      ...node,
      level: level,
      color: palette[level % 7],
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
  
  waitingRequest$: BehaviorSubject<LoadState>;

  constructor(
    private route: ActivatedRoute,
    private hn: HNService,
    public shared: SharedService
  ) {
    this.waitingRequest$ = new BehaviorSubject<LoadState>(LoadState.WAITING);
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params.id;

    this.hn.getStoryComments(+id).subscribe((comments: Item[]) => {
      this.dataSource.data = comments;
      this.treeControl.expandAll();
      this.waitingRequest$.next(LoadState.IDLE);
    });
  }

  hasChild = (_: number, node: ItemFlatNode) => node.expandable;

}
