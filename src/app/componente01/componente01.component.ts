import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Aluno } from '../modelo/Aluno';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-componente01',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './componente01.component.html',
  styleUrl: './componente01.component.css'
})
export class Componente01Component {

  formulario = new FormGroup({
    nome : new FormControl('', Validators.required),
    nota1 : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)]),
    nota2 : new FormControl(null, [Validators.required, Validators.min(0), Validators.max(10)])
  })

  // VETOR PARA CADASTRAR ALUNOS
  vetor:Aluno[] = [];

  // FUNCAO DE CADASTRO
  cadastrar(){
    this.vetor.push(this.formulario.value as Aluno);
    // console.log(this.vetor);
    this.formulario.reset();
  }

  // MEDIA DA  TURMA
  calcularMedia(): number {
    let somaTotal = 0;
    let quantidadeAlunos = this.vetor.length;

    for (let aluno of this.vetor) {
      let mediaAluno = (aluno.nota1 + aluno.nota2) / 2;
      somaTotal += mediaAluno;
    }

    return quantidadeAlunos > 0 ? somaTotal / quantidadeAlunos : 0;
  }

  //MAIOR NOTA DA SALA
  melhorAluno(): { nome: string, media: number } | null {
    if (this.vetor.length === 0) {
      return null;
    }

    let melhorAluno = this.vetor[0];
    let melhorMedia = (melhorAluno.nota1 + melhorAluno.nota2) / 2;

    for (let aluno of this.vetor) {
      let mediaAluno = (aluno.nota1 + aluno.nota2) / 2;
      if (mediaAluno > melhorMedia) {
        melhorAluno = aluno;
        melhorMedia = mediaAluno;
      }
    }

    return {
      nome: melhorAluno.nome,
      media: melhorMedia
    };
  }
}
