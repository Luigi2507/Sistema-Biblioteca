import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-emprestimos',
  styleUrl: './emprestimos.css',
  templateUrl: './emprestimos.html',
})
export class Emprestimos {

  emprestimos = [
    {
      id: 1,
      livro: '1984',
      usuario: 'Luigi Favaro',
      dataEmprestimo: '2026-09-05',
      dataDevolucao: '2026-09-12',
      status: 'Em andamento'
    },
    {
      id: 2,
      livro: 'O Hobbit',
      usuario: 'Ana da Silva',
      dataEmprestimo: '2026-09-10',
      dataDevolucao: '2026-09-17',
      status: 'Em andamento'
    },
    {
      id: 3,
      livro: 'Cosmos',
      usuario: 'Carlos Santos',
      dataEmprestimo: '2026-08-31',
      dataDevolucao: '2026-09-07',
      status: 'Devolvido'
    }
  ]

  //Estrutura de um empréstimo
  novoEmprestimo = {
    livro: '',
    usuario: '',
    dataEmprestimo: '',
    dataDevolucao: '',
    status: 'Em andamento'
  };

  //Formulário
  formularioVisivel = false;

  mostrarFormulario() {
    this.formularioVisivel = true;
  }

  fecharFormulario() {
    this.formularioVisivel = false;
    this.editandoEmprestimo = false;
    this.emprestimoEditandoId = null;
  }

  //Cadastrar empréstimo
  cadastrarEmprestimo() {
    if (this.editandoEmprestimo && this.emprestimoEditandoId !== null) {
        const emprestimo = this.emprestimos.find(emprestimo => emprestimo.id === this.emprestimoEditandoId);

        if (emprestimo) {
          emprestimo.livro = this.novoEmprestimo.livro;
          emprestimo.usuario = this.novoEmprestimo.usuario;
          emprestimo.status = this.novoEmprestimo.status;
        }

    } else {
        const emprestimo = {
          id: this.emprestimos.length + 1,
          ...this.novoEmprestimo
        };

        this.emprestimos.push(emprestimo);
    }

    this.novoEmprestimo = {
      livro: '',
      usuario: '',
      dataEmprestimo: '',
      dataDevolucao: '',
      status: 'Em andamento'
    };

    this.fecharFormulario();
  }

  //Verificação de datas no cadastro
  verificarDataInvalida(): boolean {
    if (!this.novoEmprestimo.dataEmprestimo || !this.novoEmprestimo.dataDevolucao) {
      return false;
    }
    
    return (this.novoEmprestimo.dataEmprestimo > this.novoEmprestimo.dataDevolucao); //se a data de emprestimo for maior, retorna true (inválido)
  }

  //Editar empréstimo
  editandoEmprestimo = false;
  emprestimoEditandoId: number | null = null;

  editarEmprestimo(emprestimo: any) {
    this.novoEmprestimo = {
      livro: emprestimo.livro,
      usuario: emprestimo.usuario,
      dataEmprestimo: emprestimo.dataEmprestimo,
      dataDevolucao: emprestimo.dataDevolucao,
      status: emprestimo.status
    };

    this.emprestimoEditandoId = emprestimo.id;
    this.formularioVisivel = true;
    this.editandoEmprestimo = true;
  }

  //Pesquisa
  termoPesquisa = '';

  emprestimosFiltrados() {
    const termo = this.termoPesquisa.toLowerCase().trim();
    
    return this.emprestimos.filter(emprestimo =>
      emprestimo.livro.toLowerCase().includes(termo) ||
      emprestimo.usuario.toLowerCase().includes(termo) ||
      emprestimo.status.toLowerCase().includes(termo)
    );
  }
}
