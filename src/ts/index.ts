let $ = (e:string)=> document.getElementById(e);

let result:HTMLInputElement = <HTMLInputElement>$("result");

let userName:string | null = "Sato";
userName = null;

let Sato:"sato" = "sato";

let num1: number[] = [ 1, 2, 3 ];
let num2: Array<number> = [ 1, 2, 3 ];

let users: User[] = [
  {
      id: 1,
      name: 'sato',
      age: 27
  },{
      id: 2,
      name: 'saito'
  }
]

type User = {
  id: number
  name: string
  age?: number
};

function sum(num1: number, num2: number): string {
  const sum: number = num1 + num2;
  return `${num1}+${num2}は、${sum}です。`;
}

sum(3,5) // 3+5は、8です。

interface Foo<N, S> {
  foo: N;
  bar: S;
}

const obj: Foo<number, string> = {
  foo: 3,
  bar: 'hi',
};

const foo: [string, number] = ['foo', 5];
