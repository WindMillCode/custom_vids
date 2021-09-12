import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

const routes: Routes = [
    // {
    //     path:'scratchpad',
    //     // loadChildren: () => import('./scratchpad/scratchpad.module').then(m => m.ScratchpadModule)
    // },
    {
        path:'sample',
        loadChildren: () => import('./sample/sample.module').then(m => m.SampleModule)
    },
    {
        path: '',
        loadChildren: () => import('./sample/sample.module').then(m => m.SampleModule)
      }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
