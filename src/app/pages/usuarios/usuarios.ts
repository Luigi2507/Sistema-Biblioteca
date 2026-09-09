import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-usuarios',
  styleUrl: './usuarios.css',
  templateUrl: './usuarios.html',
})
export class Usuarios {

  usuarios = [
    {
      id: 1,
      nome: 'Ana da Silva',
      email: 'anasilva@gmail.com',
      telefone: '(41) 99999-9999'
    },
    {
      id: 2,
      nome: 'Bruno de Souza',
      email: 'brunosouza@gmail.com',
      telefone: '(41) 98888-8888'
    },
    {
      id: 3,
      nome: 'Carlos Santos',
      email: 'carlossantos@gmail.com',
      telefone: '(41) 97777-7777'
    }
  ];

  //Usuário a ser preenchido
  novoUsuario = {
    nome: '',
    email: '',
    telefone: ''
  };

  //Formulário
  formularioVisivel = false;

  mostrarFormulario() {
    this.formularioVisivel = true;
  }

  fecharFormulario() {
    this.formularioVisivel = false;
    this.editandoUsuario = false;
    this.usuarioEditandoId = null;
  }

  //Cadastrar usuário
  cadastrarUsuario() {
    if (this.editandoUsuario && this.usuarioEditandoId !== null) {  //está editando?

      const usuario = this.usuarios.find(usuario => usuario.id === this.usuarioEditandoId);

      if (usuario) {
        usuario.nome = this.novoUsuario.nome;
        usuario.email = this.novoUsuario.email;
        usuario.telefone = this.novoUsuario.telefone;
      }

    } else {  //se não, cria um novo
      const usuario = {
        id: this.usuarios.length + 1,
        ...this.novoUsuario
      };

      this.usuarios.push(usuario);
    }

    //resetar tudo
    this.novoUsuario = {
      nome: '',
      email: '',
      telefone: ''
    };

    this.editandoUsuario = false;
    this.usuarioEditandoId = null;
    this.fecharFormulario();
  }

  //Editar usuário
  editandoUsuario = false;
  usuarioEditandoId: number | null = null;

  editarUsuario(usuario: any) {
    this.novoUsuario = {
      nome: usuario.nome,
      email: usuario.email,
      telefone: usuario.telefone
    };

    this.usuarioEditandoId = usuario.id;
    this.formularioVisivel = true;
    this.editandoUsuario = true;
  }

  //Excluir usuário
  excluirUsuario(id: number) {
    this.usuarios = this.usuarios.filter(usuario => usuario.id != id);
  }

  //Pesquisa de usuários
  termoPesquisa = '';

  usuariosFiltrados() {
    const termo = this.termoPesquisa.toLowerCase().trim();

    return this.usuarios.filter(usuario =>
      usuario.nome.toLowerCase().includes(termo) ||
      usuario.email.toLowerCase().includes(termo) ||
      usuario.telefone.toLowerCase().includes(termo)
    );
  }
}
