import { NgModule } from "@angular/core";
import { PaddingPipe, RepliesPipe } from './shared/pipes';
import { PostFromPipe } from './shared/pipes';
import { HeaderPipe } from './shared/pipes';
import { DomainPipe } from './shared/pipes';
import { IconThemePipe } from './shared/pipes';

@NgModule({
    declarations: [
        DomainPipe,
        HeaderPipe,
        PostFromPipe,
        RepliesPipe,
        IconThemePipe,
        PaddingPipe
    ],
    exports: [
        DomainPipe,
        HeaderPipe,
        PostFromPipe,
        RepliesPipe,
        IconThemePipe,
        PaddingPipe
    ]
})
export class PipesModule { }