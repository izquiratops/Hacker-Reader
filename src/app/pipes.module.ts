import { NgModule } from "@angular/core";
import { PaddingPipe, RepliesPipe, PostFromPipe, DomainPipe, IconThemePipe, FormatTitlePipe } from './shared/pipes';

@NgModule({
    declarations: [
        DomainPipe,
        PostFromPipe,
        RepliesPipe,
        IconThemePipe,
        PaddingPipe,
        FormatTitlePipe
    ],
    exports: [
        DomainPipe,
        PostFromPipe,
        RepliesPipe,
        IconThemePipe,
        PaddingPipe,
        FormatTitlePipe
    ]
})
export class PipesModule { }