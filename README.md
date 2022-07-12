# typescript-class

Study note for Nomad coder's Typescript lecture 🔥

<br>

## [ OVERVIEW OF TYPESCRIPT ]

<br>

### 1. 런타임 에러를 피하는 타입스크립트

- Typescript 는 앱이 실행되기 전에 오류를 알려준다. (유저가 에러를 만나기 전에 처리)
- Prop Types는 앱이 실행되고나서 콘솔에 오류를 알려준다. (런타임 에러 - 결국 유저가 만나는 에러)
- 그래서 사전에 오류를 방지할수있게 해주는 Typescript를 사용하는 것

  <br>

### 2. 타입을 직접 지정해주지 않아도 된다.

- Implicit Types : 변수의 타입을 추측해서 정한다.
- Explicit Types : 변수의 타입을 명시해서 활용한다.

```typescript
let a: string = "hello";
```

<br>

### 3. 오브젝트 타입 지정

- object의 각 속성 타입을 정해주고, optional한 속성은 ? 를 사용해 지정할 수 있다.

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

- 동일 타입을 가진 오브젝트가 여러개 있을때는 type을 별도로 만들어두고 여러 변수에 활용한다.

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

### 5. 함수에서의 타입 지정

- 파라미터의 타입을 아래와 같이 지정할 수 있다. 지정해둔 타입을 가져와 쓸 수 있다.

```typescript
function playerMaker(name: string): Player {
  return {
    name: name,
  };
}
const jessie = playerMaker("Jessie");
jessie.age = 12;
```

화살표 함수 사용 시

```javascript
const playerMaker = (name: string): Player => {
  name: name;
};
```

  <br>

### 6. readonly로 값을 바꾸지 못하게 설정

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

- array 값의 갯수와 순서를 지정하는 것
  <br>: 아이템 갯수가 안맞거나, 타입의 순서가 안맞으면 에러 발생

```typescript
const player: [string, number, boolean] = ["Jessie", 1, true];

player[0] = 1;
// Error (the first item shold be a string)
```

<br>

### 8. 값의 타입을 미리 알 수 없을때는 unknown

- 타입을 if문으로 먼저 체크한다음 실행코드를 만들어주어야 한다.

```typescript
let a: unknown;
if (typeof a === "number") {
  b = a * 2;
}
```

<br>

### 9. 아무것도 return하지 않는 함수의 타입은 void가 된다.

```typescript
function hello() {
  console.log(1);
}
// function hello(): void
```

<br>

### 10. never

- 잘 안쓰지만 알아둬야 하는 타입.
- never는 함수가 리턴할 일이 없을때 발생한다.
- 어떤 값의 타입이 두가지 일 수 있는 상황에서, 예외의 경우에 never이 발생한다.

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

- function의 타입을 정의한다.
- type으로 타입을 정의해놓고, 함수에 불러와서 사용한다.

```typescript
type Add = (a: number, b: number) => number;

const add: Add = (a, b) => a + b;
```

<br>

### 2. Overloading

- type 함수에 여러 타입을 만드는 것.
- overloading signature를 통해 함수를 다양한 방식으로 호출 할 수 있게한다.
- overloading은 직접 작성하기보다 외부 라이브러리에 자주 보이는 메소드로, 하나의 함수가 복수의 Call Signature를 가질때 발생한다.

```typescript
// Next.js의 라우터 push가 두 가지 방법으로 페이지를 이동하는 경우

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
// 파라미터 갯수가 다른 경우 (자주 볼 수 있는 경우는 아님)
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
add(1, 2, 3); // 두 경우 모두 문제 없음
```

<br>

### 3. Polymorphism (generic)

- poly(many) morphism(structure)
- generic을 설정해 여러 타입을 가질 수 있게 하는 것.
- 모든 경우의 수에 해당하는 call sygnature를 작성해 줄 필요가 없어진다.

```typescript
type SuperPrint = {
  (arr: number[]): void;
  (arr: (number | string | boolean)[]): void;
  // 등으로 여러 타입의 모든 경우에 수를 대응할 수 없다.
};
```

```typescript
type SuperPrint = {
  <T>(arr: T[]): T;
  // 앞에 꺽쇠괄호를 붙여 generic 타입을 할당한다.
  // 이름은 상관없다.
};

const superPrint: SuperPrint = (arr) => console.log(arr);

superPrint([1, 2, 3]);
superPrint(["a", "b", "c"]);
superPrint([true, false, true]);
superPrint([1, "b", true]);
// 모든 타입의 다양한 조합을 해결할 수 있다.
// 다양한 경우를 커버하는 함수를 작성할때 유용하다.
// generic 타입으로 선언되면, 타입스크립트가 자료를 보고 타입을 알아낸다.
```

### generic VS any

- generic : 구체적인 타입을 지정하지 않고 다양한 인수와 리턴값에 대한 타입을 처리할 수 있게 한다. generic을 통해 함수등의 재사용성을 높일 수 있다.
- any : 모든게 가능하기 때문에 타입 체커로부터 보호받지 못한다.

```typescript
type SuperPrint = {
  (arr: any): any;
};

const superPrint: SuperPrint = (arr) => arr[0];

const a = superPrint([1, "b", true]);
a.toUpperCase();
// a의 0번째 자료는 number이기떄문에 .toUpperCase()를 실행할 수 없어야한다.
// 실행되지 못해야 하는 코드인데 문제없이 실행되어버린다.
```

<br>

### 실제 generic의 사용

- 직접 설정할일은 거의 없으나, 라이브러리나 패키지를 가져와 함수를 사용할때 generic으로 지정된 타입을 명확하게 하기 위해 많이 사용한다. (React의 useState가 generic으로 디자인되어 있다.)

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

### 1. JS와 TS의 Class 비교

- Typescript를 통해 Javscript의 객체지향 코드를 더 안전하고 좋게 만들 수 있다. <br><br>

#### Typescript code <br>

- 파라미터를 선언하는 것만으로 constructor를 만들 수 있다.
- 파라미터에 타입을 선언하면서 private, protected, public과 같은 키워드를 사용할 수 있다.

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

### 2. Abstract Class 추상클래스

- 추상클래스는 다른 클래스가 상속받게 하기 위한 클래스이다. (TS에서만 제대로 작동)
- 추상클래스로 직접 새로운 인스턴스를 만들 수는 없다.
- 추상클래스 안에서 직접 메소드를 구현해서 상속받은 클래스가 바로 사용하게 할 수도 있지만, 추상메소드에 call signature를 넣어 정의하면 상속받은 클래스 내부에서 메소드 내용을 각각 구현해 사용할 수도 있다.

```typescript
abstract class User {
  constructor(
    private firstName: string,
    private lastName: string,
    protected nickName: string
  ) {}
  abstract getNickName(): void;
  // 추상메소드를 만들려면 내부에서 직접 메소드 내용을 구현하지 않는다.
}

// 추상클래스로 바로 인스턴스 만들면 에러 (TS에서만. JS에서는 그냥 되어버림)
// const jessie = new User 는 에러

class Player extends User {
  getNickName() {
    console.log(this.nickName);
    // 추상클래스를 상속받는 클래스에서 추상메소드의 내용을 구현한다.
    // 구현하지 않으면, TS가 에러를 표시해준다.
  }
}

const jessie = new Player("Jessie", "Y", "yojessie");
```

<br>

### 3. private, protected, public 접근가능 위치

- 타입 선언 앞에 어떤 키워드를 사용했느냐에 따라 해당 파라미터의 사용 범위가 달라진다.

| 키워드    | 선언한 클래스 내 | 상속받은 클래스 내 | 인스턴스 내 |
| --------- | ---------------- | ------------------ | ----------- |
| private   | O                | X                  | X           |
| protected | O                | O                  | X           |
| public    | O                | O                  | O           |

<br>

### 4. class로 typescript 연습하기

http://typescriptlang.org/play

```typescript
type Words = {
  [key: string]: string;
  // 오브젝트의 타입을 선언할때 사용. property에 대해 미리 알 수 없지만 타입을 알고 있을때 사용.
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
    public readonly def: string // 다른곳에서 접근은 가능하나, 수정하지는 못하게 readonly
  ) {}
}

const peach = new Word("복숭아", "과일");
const apple = new Word("사과", "과일");
const melon = new Word("메론", "과일");

const dict = new Dict();

dict.add(peach);
dict.add(apple);
dict.add(melon);
```

<br>

## [ Interfaces ]

<br>

### 1. type의 다양한 사용

- type에 자료의 타입을 지정하는 것 외에, 특정 값을 지정해 줄수도 있다.

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

### 2. type을 interface로 바꿔보자

- type은 자료의 타입 지정, 특정 값 지정, 오브젝트의 모양을 특정하는 등 다양하게 활용할 수 있다.
- interface는 '오브젝트'의 모양을 특정하는 용도로만 사용한다.

```typescript
type Player = {
  nickname: string;
  team: Team;
  number: Number;
};

// 위 아래 코드는 같다

interface Player {
  nickname: string;
  team: Team;
  number: Number;
}
```

- interface는 class와 비슷한 구조로 사용할 수 있다.
- 문법구조를 객체지향 프로그래밍에 맞게 사용할 수 있어서 더 선호된다.

```typescript
interface User {
  name: string;
}

interface Player extends User {}

const jessie: Player = {
  name: "jessie",
};
```

- interface를 중첩해서 선언하는 것도 가능하다. (알아서 하나로 합쳐준다.)

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

### 3. Interface를 사용하는 이유 🤔

- 추상클래스를 사용하면 객체지향 프로그래밍 코드를 만드는데 유리하다.
- 추상클래스를 만들면, 자바스크립트로 코드가 옮겨졌을때 abstract 단어가 빠져서 일반 클래스와 구분되지 않는다.
- 추상클래스 대산 Interface를 활용하면 자바스크립트로 변환되는 코드를 더 가볍게 만들 수 있다.

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

// 위의 추상클래스를 아래와 같이 바꿀 수 있다.

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

- 추상클래스를 interface로 변경하고, 오브젝트 형태로 요소들의 타입을 정해준다.
- class에서 extends 키워드를 implements로 바꿔주고, constructor를 만들어준다.
- 추상클래스를 interface로 바꾸면 자바스크립트로 컴파일 되지 않아 코드가 가벼워진다.
- 그리고 여러 interface를 class가 상속받게 할 수도 있다.

```typescript
class Player implements User, Human {}
```

<br>

### 4. type aliases와 Interfaces의 차이점

- type과 interface는 유사한 기능을하며 자유롭게 선택해 사용할 수 있다.
- 둘 다 추상클래스를 대체해 사용할 수 있다.
- type은 같은 이름으로 재선언해서 새 속성을 추가할 수 없으나, interface는 가능하다.

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

// 위 내용을 interface로 바꾸면

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

- 오브젝트의 모양을 정의할떄 interface의 사용이 권장된다. 인터페이스를 상속시키는 방법이 직관적이기 때문. (새 속성을 직관적으로 추가할 수 있어서)
