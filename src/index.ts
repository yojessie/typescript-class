// tsconfig.json 파일에 strict 모드를 활성화시키면, myPackage에서 온 함수의 타입이 정의되어 있지 않기 떄문에 오류가 발생한다.
// There is no declaration file for the 'myPackage'

// 해결1. .d.ts 파일을 생성해 타입의 정의한다.

// 해결2. js 파일 자체에 @ts-check 주석을 달아 타입스크립트가 자바스크립트 파일을 확인하도록 설정할 수 있다.(JSDoc)
// JSDoc: 코멘트로 이루어진 문법. JS 파일의 함수 바로 위에 코멘트를 적어준다.
// 규모가 큰 프로젝트의 경우, 일부 JS파일에서 TS를 활용하도록 하기 위함.
// tsconfig.json에 allowJS: true 설정 필요 (이 설정만으로 기본적으로 타입을 추론할 수 있다.)

import { init, exit } from "./myPackage";

init({
  url: "url text",
});

exit(1);
