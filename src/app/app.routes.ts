import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Livros } from './pages/livros/livros';
import { Usuarios } from './pages/usuarios/usuarios';
import { Emprestimos } from './pages/emprestimos/emprestimos';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'livros',
        component: Livros
    },
    {
        path: 'usuarios',
        component: Usuarios
    },
    {
        path: 'emprestimos',
        component: Emprestimos
    }
];
