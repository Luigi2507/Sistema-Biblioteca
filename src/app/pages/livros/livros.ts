import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-livros',
  styleUrl: './livros.css',
  templateUrl: './livros.html',
})
export class Livros {

  livros = [
    {
      id: 1,
      titulo: '1984',
      autor: 'George Orwell',
      genero: 'Distopia',
      ano: 1949,
      quantidade: 3
    },
    {
      id: 2,
      titulo: 'A volta ao mundo em 80 dias',
      autor: 'Julio Verne',
      genero: 'Ficção científica',
      ano: 1872,
      quantidade: 5
    },
    {
      id: 3,
      titulo: 'Cosmos',
      autor: 'Carl Sagan',
      genero: 'Ciência',
      ano: 1980,
      quantidade: 2
    }
  ]

  //Livro a ser preenchido no formulário
  novoLivro = {
    titulo: '',
    autor: '',
    genero: '',
    ano: 0,
    quantidade: 0
  }

  formularioVisivel = false;
  editandoLivro = false;
  livroEditandoId: number | null = null;

  //Métodos
  mostrarFormulario() {
    this.formularioVisivel = true;
  }

  fecharFormulario() {
    this.formularioVisivel = false;
    this.editandoLivro = false;
    this.livroEditandoId = null;
  }

  cadastrarLivro() {
    if (this.editandoLivro && this.livroEditandoId !== null) {
      const livro = this.livros.find(livro => livro.id === this.livroEditandoId);

      if (livro) {
        livro.titulo = this.novoLivro.titulo;
        livro.autor = this.novoLivro.autor;
        livro.genero = this.novoLivro.genero;
        livro.ano = this.novoLivro.ano;
        livro.quantidade = this.novoLivro.quantidade;
      }

    } else {
      const livro = {
        id: this.livros.length + 1,
        ...this.novoLivro
      };
      this.livros.push(livro);
    }

    this.novoLivro = {
      titulo: '',
      autor: '',
      genero: '',
      ano: 0,
      quantidade: 0
    };

    this.editandoLivro = false;
    this.livroEditandoId = null;

    this.fecharFormulario();
  }

  editarLivro(livro: any) {
    this.novoLivro = {
      titulo: livro.titulo,
      autor: livro.autor,
      genero: livro.genero,
      ano: livro.ano,
      quantidade: livro.quantidade
    };

    this.livroEditandoId = livro.id;
    this.formularioVisivel = true;
    this.editandoLivro = true;
  }

  excluirLivro(id: number) {
    this.livros = this.livros.filter(livro => livro.id !== id);
  }

  //Pesquisa e filtros
  termoPesquisa = '';

  livrosFiltrados() {
    const termo = this.termoPesquisa.toLowerCase().trim();

    return this.livros.filter(livro =>
            livro.titulo.toLowerCase().includes(termo) ||
            livro.autor.toLowerCase().includes(termo) ||
            livro.genero.toLowerCase().includes(termo) ||
            livro.ano.toString().includes(termo)
    );
  }
}