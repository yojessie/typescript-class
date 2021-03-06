# typescript-class

Study note for Nomad coder's Typescript lecture π₯

<br>

## [ OVERVIEW OF TYPESCRIPT ]

<br>

### 1. λ°νμ μλ¬λ₯Ό νΌνλ νμμ€ν¬λ¦½νΈ

- Typescript λ μ±μ΄ μ€νλκΈ° μ μ μ€λ₯λ₯Ό μλ €μ€λ€. (μ μ κ° μλ¬λ₯Ό λ§λκΈ° μ μ μ²λ¦¬)
- Prop Typesλ μ±μ΄ μ€νλκ³ λμ μ½μμ μ€λ₯λ₯Ό μλ €μ€λ€. (λ°νμ μλ¬ - κ²°κ΅­ μ μ κ° λ§λλ μλ¬)
- κ·Έλμ μ¬μ μ μ€λ₯λ₯Ό λ°©μ§ν μμκ² ν΄μ£Όλ Typescriptλ₯Ό μ¬μ©νλ κ²

  <br>

### 2. νμμ μ§μ  μ§μ ν΄μ£Όμ§ μμλ λλ€.

- Implicit Types : λ³μμ νμμ μΆμΈ‘ν΄μ μ νλ€.
- Explicit Types : λ³μμ νμμ λͺμν΄μ νμ©νλ€.

```typescript
let a: string = "hello";
```

<br>

### 3. μ€λΈμ νΈ νμ μ§μ 

- objectμ κ° μμ± νμμ μ ν΄μ£Όκ³ , optionalν μμ±μ ? λ₯Ό μ¬μ©ν΄ μ§μ ν  μ μλ€.

```typescript
const player: {
  name: string;
  age?: number;
} = {
  name: "Jessie",
};
```

  <br>

### 4. Alias type

- λμΌ νμμ κ°μ§ μ€λΈμ νΈκ° μ¬λ¬κ° μμλλ typeμ λ³λλ‘ λ§λ€μ΄λκ³  μ¬λ¬ λ³μμ νμ©νλ€.

```typescript
type Player = {
  name: string,
  age?: number
}
const jessie : Player = {
  name: "Jessie"
}
const Mike : Player = {
  name: "Mike"
  age: 12
}
```

  <br>

### 5. ν¨μμμμ νμ μ§μ 

- νλΌλ―Έν°μ νμμ μλμ κ°μ΄ μ§μ ν  μ μλ€. μ§μ ν΄λ νμμ κ°μ Έμ μΈ μ μλ€.

```typescript
function playerMaker(name: string): Player {
  return {
    name: name,
  };
}
const jessie = playerMaker("Jessie");
jessie.age = 12;
```

νμ΄ν ν¨μ μ¬μ© μ

```javascript
const playerMaker = (name: string): Player => {
  name: name;
};
```

  <br>

### 6. readonlyλ‘ κ°μ λ°κΎΈμ§ λͺ»νκ² μ€μ 

```typescript
type Player = {
  readonly name: string;
  age?: number;
};
const jessie: Player = {
  name: "Jessie",
};
jessie.name = "Mike"; // error (the name property is 'read only')
```

  <br>

### 7. Tuple

- array κ°μ κ°―μμ μμλ₯Ό μ§μ νλ κ²
  <br>: μμ΄ν κ°―μκ° μλ§κ±°λ, νμμ μμκ° μλ§μΌλ©΄ μλ¬ λ°μ

```typescript
const player: [string, number, boolean] = ["Jessie", 1, true];

player[0] = 1;
// Error (the first item shold be a string)
```

<br>

### 8. κ°μ νμμ λ―Έλ¦¬ μ μ μμλλ unknown

- νμμ ifλ¬ΈμΌλ‘ λ¨Όμ  μ²΄ν¬νλ€μ μ€νμ½λλ₯Ό λ§λ€μ΄μ£Όμ΄μΌ νλ€.

```typescript
let a: unknown;
if (typeof a === "number") {
  b = a * 2;
}
```

<br>

### 9. μλ¬΄κ²λ returnνμ§ μλ ν¨μμ νμμ voidκ° λλ€.

```typescript
function hello() {
  console.log(1);
}
// function hello(): void
```

<br>

### 10. never

- μ μμ°μ§λ§ μμλ¬μΌ νλ νμ.
- neverλ ν¨μκ° λ¦¬ν΄ν  μΌμ΄ μμλ λ°μνλ€.
- μ΄λ€ κ°μ νμμ΄ λκ°μ§ μΌ μ μλ μν©μμ, μμΈμ κ²½μ°μ neverμ΄ λ°μνλ€.

```typescript
function hello(name: string | number) {
  if (typeof name === "string") {
    name;
    // name : string
  } else if (typeof name === "number") {
    name;
    // name : number
  } else {
    name;
    // name : never
  }
}
```

<br>

## [ FUNCTIONS ]

### 1. Call Signatures

- functionμ νμμ μ μνλ€.
- typeμΌλ‘ νμμ μ μν΄λκ³ , ν¨μμ λΆλ¬μμ μ¬μ©νλ€.

```typescript
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

<br>

### 2. Overloading

- type ν¨μμ μ¬λ¬ νμμ λ§λλ κ².
- overloading signatureλ₯Ό ν΅ν΄ ν¨μλ₯Ό λ€μν λ°©μμΌλ‘ νΈμΆ ν  μ μκ²νλ€.
- overloadingμ μ§μ  μμ±νκΈ°λ³΄λ€ μΈλΆ λΌμ΄λΈλ¬λ¦¬μ μμ£Ό λ³΄μ΄λ λ©μλλ‘, νλμ ν¨μκ° λ³΅μμ Call Signatureλ₯Ό κ°μ§λ λ°μνλ€.

```typescript
// Next.jsμ λΌμ°ν° pushκ° λ κ°μ§ λ°©λ²μΌλ‘ νμ΄μ§λ₯Ό μ΄λνλ κ²½μ°

type Config = {
  path: string;
  state: number;
};

type Push = {
  (config: Config): void;
  (config: string): void;
};

const push: Push = (config) => {
  if (typeof config === "string") {
    console.log(config);
  } else {
    console.log(config.path);
  }
};
```

```typescript
// νλΌλ―Έν° κ°―μκ° λ€λ₯Έ κ²½μ° (μμ£Ό λ³Ό μ μλ κ²½μ°λ μλ)
type Add = {
  (a: number, b: number): number;
  (a: number, b: number, c: number): number;
};

const add: Add = (a, b, c?: number) => {
  if (c) {
    return a + b + c;
  } else {
    return a + b;
  }
};

add(1, 2);
add(1, 2, 3); // λ κ²½μ° λͺ¨λ λ¬Έμ  μμ
```

<br>

### 3. Polymorphism (generic)

- poly(many) morphism(structure)
- genericμ μ€μ ν΄ μ¬λ¬ νμμ κ°μ§ μ μκ² νλ κ².
- λͺ¨λ  κ²½μ°μ μμ ν΄λΉνλ call sygnatureλ₯Ό μμ±ν΄ μ€ νμκ° μμ΄μ§λ€.

```typescript
type SuperPrint = {
  (arr: number[]): void;
  (arr: (number | string | boolean)[]): void;
  // λ±μΌλ‘ μ¬λ¬ νμμ λͺ¨λ  κ²½μ°μ μλ₯Ό λμν  μ μλ€.
};
```

```typescript
type SuperPrint = {
  <T>(arr: T[]): T;
  // μμ κΊ½μ κ΄νΈλ₯Ό λΆμ¬ generic νμμ ν λΉνλ€.
  // μ΄λ¦μ μκ΄μλ€.
};

const superPrint: SuperPrint = (arr) => console.log(arr);

superPrint([1, 2, 3]);
superPrint(["a", "b", "c"]);
superPrint([true, false, true]);
superPrint([1, "b", true]);
// λͺ¨λ  νμμ λ€μν μ‘°ν©μ ν΄κ²°ν  μ μλ€.
// λ€μν κ²½μ°λ₯Ό μ»€λ²νλ ν¨μλ₯Ό μμ±ν λ μ μ©νλ€.
// generic νμμΌλ‘ μ μΈλλ©΄, νμμ€ν¬λ¦½νΈκ° μλ£λ₯Ό λ³΄κ³  νμμ μμλΈλ€.
```

### generic VS any

- generic : κ΅¬μ²΄μ μΈ νμμ μ§μ νμ§ μκ³  λ€μν μΈμμ λ¦¬ν΄κ°μ λν νμμ μ²λ¦¬ν  μ μκ² νλ€. genericμ ν΅ν΄ ν¨μλ±μ μ¬μ¬μ©μ±μ λμΌ μ μλ€.
- any : λͺ¨λ κ² κ°λ₯νκΈ° λλ¬Έμ νμ μ²΄μ»€λ‘λΆν° λ³΄νΈλ°μ§ λͺ»νλ€.

```typescript
type SuperPrint = {
  (arr: any): any;
};

const superPrint: SuperPrint = (arr) => arr[0];

const a = superPrint([1, "b", true]);
a.toUpperCase();
// aμ 0λ²μ§Έ μλ£λ numberμ΄κΈ°λλ¬Έμ .toUpperCase()λ₯Ό μ€νν  μ μμ΄μΌνλ€.
// μ€νλμ§ λͺ»ν΄μΌ νλ μ½λμΈλ° λ¬Έμ μμ΄ μ€νλμ΄λ²λ¦°λ€.
```

<br>

### μ€μ  genericμ μ¬μ©

- μ§μ  μ€μ ν μΌμ κ±°μ μμΌλ, λΌμ΄λΈλ¬λ¦¬λ ν¨ν€μ§λ₯Ό κ°μ Έμ ν¨μλ₯Ό μ¬μ©ν λ genericμΌλ‘ μ§μ λ νμμ λͺννκ² νκΈ° μν΄ λ§μ΄ μ¬μ©νλ€. (Reactμ useStateκ° genericμΌλ‘ λμμΈλμ΄ μλ€.)

```typescript
type Player<T> = {
  name: string;
  extraInfo: T;
};

const jessie: Player<{}> = {
  name: "Jessie",
  extraInfo: {
    favorite: "keyboard",
  },
};

const Tony: Player<null> = {
  name: "Tony",
  extraInfo: null,
};
```

<br>

## [ Classes ]

### 1. JSμ TSμ Class λΉκ΅

- Typescriptλ₯Ό ν΅ν΄ Javscriptμ κ°μ²΄μ§ν₯ μ½λλ₯Ό λ μμ νκ³  μ’κ² λ§λ€ μ μλ€. <br><br>

#### Typescript code <br>

- νλΌλ―Έν°λ₯Ό μ μΈνλ κ²λ§μΌλ‘ constructorλ₯Ό λ§λ€ μ μλ€.
- νλΌλ―Έν°μ νμμ μ μΈνλ©΄μ private, protected, publicκ³Ό κ°μ ν€μλλ₯Ό μ¬μ©ν  μ μλ€.

```typescript
class Player {
  constructor(
    private firstName: string,
    private lastName: string,
    public nickName: string
  ) {}
}
```

#### Javascript code

```javascript
class Player {
  constructor(firstName, lastName, nickName) {
    this.firstName = firstName;
    this.lastName = laseName;
    this.nickName = nickName;
  }
}
```

<br>

### 2. Abstract Class μΆμν΄λμ€

- μΆμν΄λμ€λ λ€λ₯Έ ν΄λμ€κ° μμλ°κ² νκΈ° μν ν΄λμ€μ΄λ€. (TSμμλ§ μ λλ‘ μλ)
- μΆμν΄λμ€λ‘ μ§μ  μλ‘μ΄ μΈμ€ν΄μ€λ₯Ό λ§λ€ μλ μλ€.
- μΆμν΄λμ€ μμμ μ§μ  λ©μλλ₯Ό κ΅¬νν΄μ μμλ°μ ν΄λμ€κ° λ°λ‘ μ¬μ©νκ² ν  μλ μμ§λ§, μΆμλ©μλμ call signatureλ₯Ό λ£μ΄ μ μνλ©΄ μμλ°μ ν΄λμ€ λ΄λΆμμ λ©μλ λ΄μ©μ κ°κ° κ΅¬νν΄ μ¬μ©ν  μλ μλ€.

```typescript
abstract class User {
  constructor(
    private firstName: string,
    private lastName: string,
    protected nickName: string
  ) {}
  abstract getNickName(): void;
  // μΆμλ©μλλ₯Ό λ§λ€λ €λ©΄ λ΄λΆμμ μ§μ  λ©μλ λ΄μ©μ κ΅¬ννμ§ μλλ€.
}

// μΆμν΄λμ€λ‘ λ°λ‘ μΈμ€ν΄μ€ λ§λ€λ©΄ μλ¬ (TSμμλ§. JSμμλ κ·Έλ₯ λμ΄λ²λ¦Ό)
// const jessie = new User λ μλ¬

class Player extends User {
  getNickName() {
    console.log(this.nickName);
    // μΆμν΄λμ€λ₯Ό μμλ°λ ν΄λμ€μμ μΆμλ©μλμ λ΄μ©μ κ΅¬ννλ€.
    // κ΅¬ννμ§ μμΌλ©΄, TSκ° μλ¬λ₯Ό νμν΄μ€λ€.
  }
}

const jessie = new Player("Jessie", "Y", "yojessie");
```

<br>

### 3. private, protected, public μ κ·Όκ°λ₯ μμΉ

- νμ μ μΈ μμ μ΄λ€ ν€μλλ₯Ό μ¬μ©νλλμ λ°λΌ ν΄λΉ νλΌλ―Έν°μ μ¬μ© λ²μκ° λ¬λΌμ§λ€.

| ν€μλ    | μ μΈν ν΄λμ€ λ΄ | μμλ°μ ν΄λμ€ λ΄ | μΈμ€ν΄μ€ λ΄ |
| --------- | ---------------- | ------------------ | ----------- |
| private   | O                | X                  | X           |
| protected | O                | O                  | X           |
| public    | O                | O                  | O           |

<br>

### 4. classλ‘ typescript μ°μ΅νκΈ°

http://typescriptlang.org/play

```typescript
type Words = {
  [key: string]: string;
  // μ€λΈμ νΈμ νμμ μ μΈν λ μ¬μ©. propertyμ λν΄ λ―Έλ¦¬ μ μ μμ§λ§ νμμ μκ³  μμλ μ¬μ©.
};

class Dict {
  private words: Words;
  constructor() {
    this.words = {};
  }
  add(word: Word) {
    if (this.words[word.term] === undefined) {
      this.words[word.term] = `${word.term} : ${word.def}`;
    }
    console.log(this.words);
  }
  del(term: string) {
    if (this.words[term] !== undefined) {
      delete this.words[term];
    }
    console.log(this.words);
  }
  find(term: string) {
    console.log(this.words[term]);
  }
}

class Word {
  constructor(
    public readonly term: string,
    public readonly def: string // λ€λ₯Έκ³³μμ μ κ·Όμ κ°λ₯νλ, μμ νμ§λ λͺ»νκ² readonly
  ) {}
}

const peach = new Word("λ³΅μ­μ", "κ³ΌμΌ");
const apple = new Word("μ¬κ³Ό", "κ³ΌμΌ");
const melon = new Word("λ©λ‘ ", "κ³ΌμΌ");

const dict = new Dict();

dict.add(peach);
dict.add(apple);
dict.add(melon);
```

<br>

## [ Interfaces ]

<br>

### 1. typeμ λ€μν μ¬μ©

- typeμ μλ£μ νμμ μ§μ νλ κ² μΈμ, νΉμ  κ°μ μ§μ ν΄ μ€μλ μλ€.

```typescript
type Team = 'red' | 'blue' | 'yellow'
type Number = 1 | 5 | 10

type Player = {
  nickname: string,
  team: Team,
  number: Number
}

const jessie: Player = {
  nickname: 'jessie'
  team: 'pink' //error
}
```

<br>

### 2. typeμ interfaceλ‘ λ°κΏλ³΄μ

- typeμ μλ£μ νμ μ§μ , νΉμ  κ° μ§μ , μ€λΈμ νΈμ λͺ¨μμ νΉμ νλ λ± λ€μνκ² νμ©ν  μ μλ€.
- interfaceλ 'μ€λΈμ νΈ'μ λͺ¨μμ νΉμ νλ μ©λλ‘λ§ μ¬μ©νλ€.

```typescript
type Player = {
  nickname: string;
  team: Team;
  number: Number;
};

// μ μλ μ½λλ κ°λ€

interface Player {
  nickname: string;
  team: Team;
  number: Number;
}
```

- interfaceλ classμ λΉμ·ν κ΅¬μ‘°λ‘ μ¬μ©ν  μ μλ€.
- λ¬Έλ²κ΅¬μ‘°λ₯Ό κ°μ²΄μ§ν₯ νλ‘κ·Έλλ°μ λ§κ² μ¬μ©ν  μ μμ΄μ λ μ νΈλλ€.

```typescript
interface User {
  name: string;
}

interface Player extends User {}

const jessie: Player = {
  name: "jessie",
};
```

- interfaceλ₯Ό μ€μ²©ν΄μ μ μΈνλ κ²λ κ°λ₯νλ€. (μμμ νλλ‘ ν©μ³μ€λ€.)

```typescript
interface User {
  name: string
}
interface User {
  lastName: string
}
interface User {
  health: number
}

const jessie: User = {
  name: 'jessie'
  lastName: 'Y'
  health: 1
}
```

<br>

### 3. Interfaceλ₯Ό μ¬μ©νλ μ΄μ  π€

- μΆμν΄λμ€λ₯Ό μ¬μ©νλ©΄ κ°μ²΄μ§ν₯ νλ‘κ·Έλλ° μ½λλ₯Ό λ§λλλ° μ λ¦¬νλ€.
- μΆμν΄λμ€λ₯Ό λ§λ€λ©΄, μλ°μ€ν¬λ¦½νΈλ‘ μ½λκ° μ?κ²¨μ‘μλ abstract λ¨μ΄κ° λΉ μ Έμ μΌλ° ν΄λμ€μ κ΅¬λΆλμ§ μλλ€.
- μΆμν΄λμ€ λμ° Interfaceλ₯Ό νμ©νλ©΄ μλ°μ€ν¬λ¦½νΈλ‘ λ³νλλ μ½λλ₯Ό λ κ°λ³κ² λ§λ€ μ μλ€.

```typescript
abstract class User {
  constructor(protected firstName: string, protected lastName: string) {}
  abstract fullName(): string;
  abstract sayHi(name: string): string;
}
class Player extends User {
  fullName() {
    return `something`;
  }
  sayHi(name: string) {
    return `something`;
  }
}

// μμ μΆμν΄λμ€λ₯Ό μλμ κ°μ΄ λ°κΏ μ μλ€.

interface User {
  firstName: string;
  lastName: string;
  fullName(): string;
  sayHi(name: string): string;
}
class Player implements User {
  constructor(public firstName: string, public lastName: string) {}
  fullName() {
    return `something`;
  }
  sayHi(name: string) {
    return `something`;
  }
}
```

- μΆμν΄λμ€λ₯Ό interfaceλ‘ λ³κ²½νκ³ , μ€λΈμ νΈ ννλ‘ μμλ€μ νμμ μ ν΄μ€λ€.
- classμμ extends ν€μλλ₯Ό implementsλ‘ λ°κΏμ£Όκ³ , constructorλ₯Ό λ§λ€μ΄μ€λ€.
- μΆμν΄λμ€λ₯Ό interfaceλ‘ λ°κΎΈλ©΄ μλ°μ€ν¬λ¦½νΈλ‘ μ»΄νμΌ λμ§ μμ μ½λκ° κ°λ²Όμμ§λ€.
- κ·Έλ¦¬κ³  μ¬λ¬ interfaceλ₯Ό classκ° μμλ°κ² ν  μλ μλ€.

```typescript
class Player implements User, Human {}
```

<br>

### 4. type aliasesμ Interfacesμ μ°¨μ΄μ 

- typeκ³Ό interfaceλ μ μ¬ν κΈ°λ₯μνλ©° μμ λ‘­κ² μ νν΄ μ¬μ©ν  μ μλ€.
- λ λ€ μΆμν΄λμ€λ₯Ό λμ²΄ν΄ μ¬μ©ν  μ μλ€.
- typeμ κ°μ μ΄λ¦μΌλ‘ μ¬μ μΈν΄μ μ μμ±μ μΆκ°ν  μ μμΌλ, interfaceλ κ°λ₯νλ€.

```typescript
type Player = {
  firstName: string;
};
type PlayerA = Player & {
  lastName: string;
};
const jessie: PlayerA = {
  firstName: "jessie",
  lastName: "Y",
};

// μ λ΄μ©μ interfaceλ‘ λ°κΎΈλ©΄

interface Player {
  firstName: string;
}
interface Player {
  lastName: string;
}
const jessie: Player = {
  firstName: "jessie",
  lastName: "Y",
};
```

- μ€λΈμ νΈμ λͺ¨μμ μ μν λ interfaceμ μ¬μ©μ΄ κΆμ₯λλ€. μΈν°νμ΄μ€λ₯Ό μμμν€λ λ°©λ²μ΄ μ§κ΄μ μ΄κΈ° λλ¬Έ. (μ μμ±μ μ§κ΄μ μΌλ‘ μΆκ°ν  μ μμ΄μ)
