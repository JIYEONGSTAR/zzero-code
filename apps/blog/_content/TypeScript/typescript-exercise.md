---
title: 'TypeScript Exercise 1~9'
subtitle: '타입스크립트 연습문제 9번까지 풀이'
date: 2023-06-18 12:00:00
category: 'TypeScript'
---

> https://typescript-exercises.github.io/ 를 해결하면서 TypeScript에 대한 이해도를 높이기

goal:

    Let everyone play with many different TypeScript features
    and get an overview of TypeScript capabilities and principles.

Things to cover:

    1. Basic typing.
    2. Refining types.
    3. Union types.
    4. Merged types.
    5. Generics.
    6. Type declarations.
    7. Module augmentation.
    8. Advanced type mapping.

Rules and principles:

    1. Avoid using "any" type at all costs.
    2. Difficulty quickly grows one exercise after another.
    3. Feel free to send pull requests if you've come up
        with improvements!
    4. Provide feedback to the creator of these exercises.
    5. Enjoy.

## Exercise 1 : objects

Intro:

    We are starting a small community of users. For performance
    reasons we have decided to store all users right in the code.
    This way we can provide our developers with more
    user-interaction opportunities. With user-related data, at least.
    All the GDPR-related issues will be solved some other day.
    This would be the basis for our future experiments during
    these exercises.

Exercise:

    Given the data, define the interface "User" and use it accordingly.

### 문제 코드

```ts
export type User = unknown;

export const users: unknown[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
];

export function logPerson(user: unknown) {
  console.log(` - ${user.name}, ${user.age}`);
}

console.log('Users:');
users.forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/objects.html
```

### 풀이

unknown 타입으로 되어있는 User 인터페이스를 정의하고, users의 타입을 User[]로 지정하여 오류를 해결한다.
User인터페이스에는 name, age, occupation 속성이 있고, 그에 맞는 타입은 users에 정의된 대로 사용하였다.

```ts
export interface User {
  name: string;
  age: number;
  occupation: string;
}

export const users: User[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

console.log('Users:');
users.forEach(logPerson);
```

## Exercise 2 : Union-Types

Intro:

    All 2 users liked the idea of the community. We should go
    forward and introduce some order. We are in Germany after all.
    Let's add a couple of admins.

    Initially, we only had users in the in-memory database. After
    introducing Admins, we need to fix the types so that
    everything works well together.

Exercise:

    Type "Person" is missing, please define it and use
    it in persons array and logPerson function in order to fix
    all the TS errors.

### 문제코드

```ts
interface User {
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = unknown;

export const persons: User[] /* <- Person[] */ = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
];

export function logPerson(user: User) {
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
```

### 풀이

Person의 타입에는 User와 Admin이 올 수 있다. Union Type(|)을 이용하여 둘 중 하나가 올 수 있음을 선언해 주면 된다.
그리고 최종적으로 User타입을 사용하는 persons의 타입을 Person의 배열로 바꾸면 해결된다.
logPerson의 파라미터로 있는 user의 타입도 Person으로 바꿔야 한다.

```ts
interface User {
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
];

export function logPerson(user: Person) {
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);
```

## Exercise 3 : narrowing

Intro:

    Since we already have some of the additional
    information about our users, it's a good idea
    to output it in a nice way.

Exercise:

    Fix type errors in logPerson function.

    logPerson function should accept both User and Admin
    and should output relevant information according to
    the input: occupation for User and role for Admin.

### 문제코드

```ts
interface User {
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] /* <- Person[] */ = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
];

export function logPerson(user: Person) {
  console.log(` - ${user.name}, ${user.age}`);
}

persons.forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
```

### 풀이

logPerson 함수의 타입에러를 해결하라.

Person에는 User나 Admin타입이 올 수 있다. 그래서 이를 구분하는 방법으로 person.role을 조건을 제시했으나 User속성에는 role이 없어서 타입 에러가 발생한 것으로 보인다.

TypeScript에서는 in, instanceof 등을 이용하여 타입을 좁힐 수 있다. union을 통해 넓힌 타입은 타입 좁히기를 이용해 다시 타입을 좁힐 수 있다.

```ts
interface User {
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  {
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  {
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
];

export function logPerson(person: Person) {
  let additionalInformation: string;
  if ('role' in person) {
    additionalInformation = person.role;
  } else {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

persons.forEach(logPerson);
```

## Exercise 4 : 00

Intro:

    As we introduced "type" to both User and Admin
    it's now easier to distinguish between them.
    Once object type checking logic was extracted
    into separate functions isUser and isAdmin -
    logPerson function got new type errors.

Exercise:

    Figure out how to help TypeScript understand types in
    this situation and apply necessary fixes.

### 문제코드

```ts
/*

Intro:

    As we introduced "type" to both User and Admin
    it's now easier to distinguish between them.
    Once object type checking logic was extracted
    into separate functions isUser and isAdmin -
    logPerson function got new type errors.

Exercise:

    Figure out how to help TypeScript understand types in
    this situation and apply necessary fixes.

*/

interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
];

export function isAdmin(person: Person) {
  return person.type === 'admin';
}

export function isUser(person: Person) {
  return person.type === 'user';
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
```

### 풀이

-- 힌트참조 --

return type을 확정시킨다. type-guard
To define a user-defined type guard, we simply need to define a function whose return type is a type predicate:
TypeScript will narrow that variable to that specific type if the original type is compatible.

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
];

export function isAdmin(person: Person): person is Admin {
  return person.type === 'admin';
}

export function isUser(person: Person): person is User {
  return person.type === 'user';
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);
```

## Exercise 5 : 00

Intro:

    Time to filter the data! In order to be flexible
    we filter users using a number of criteria and
    return only those matching all of the criteria.
    We don't need Admins yet, we only filter Users.

Exercise:

    Without duplicating type structures, modify
    filterUsers function definition so that we can
    pass only those criteria which are needed,
    and not the whole User information as it is
    required now according to typing.

Higher difficulty bonus exercise:

    Exclude "type" from filter criteria.

### 문제코드

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  {
    type: 'admin',
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    type: 'user',
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    type: 'admin',
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
  {
    type: 'user',
    name: 'Wilson',
    age: 23,
    occupation: 'Ball',
  },
  {
    type: 'admin',
    name: 'Agent Smith',
    age: 23,
    role: 'Administrator',
  },
];

export const isAdmin = (person: Person): person is Admin => person.type === 'admin';
export const isUser = (person: Person): person is User => person.type === 'user';

export function logPerson(person: Person) {
  let additionalInformation = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

export function filterUsers(persons: Person[], criteria: User): User[] {
  return persons.filter(isUser).filter(user => {
    const criteriaKeys = Object.keys(criteria) as (keyof User)[];
    return criteriaKeys.every(fieldName => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}

console.log('Users of age 23:');

filterUsers(persons, {
  age: 23,
}).forEach(logPerson);

// In case you are stuck:
// https://www.typescriptlang.org/docs/handbook/utility-types.html
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#predefined-conditional-types
```

### 풀이

utility Type을 사용한다.
Awaited, Partial, Required, Readonly, Record, Pick, Omit,

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  {
    type: 'admin',
    name: 'Jane Doe',
    age: 32,
    role: 'Administrator',
  },
  {
    type: 'user',
    name: 'Kate Müller',
    age: 23,
    occupation: 'Astronaut',
  },
  {
    type: 'admin',
    name: 'Bruce Willis',
    age: 64,
    role: 'World saver',
  },
  {
    type: 'user',
    name: 'Wilson',
    age: 23,
    occupation: 'Ball',
  },
  {
    type: 'admin',
    name: 'Agent Smith',
    age: 23,
    role: 'Administrator',
  },
];

export const isAdmin = (person: Person): person is Admin => person.type === 'admin';
export const isUser = (person: Person): person is User => person.type === 'user';

export function logPerson(person: Person) {
  let additionalInformation = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  console.log(` - ${person.name}, ${person.age}, ${additionalInformation}`);
}

export function filterUsers(persons: Person[], criteria: Partial<User>): User[] {
  return persons.filter(isUser).filter(user => {
    const criteriaKeys = Object.keys(criteria) as (keyof User)[];
    return criteriaKeys.every(fieldName => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}

console.log('Users of age 23:');

filterUsers(persons, {
  age: 23,
}).forEach(logPerson);
```

내가 생각한 방법은 Partial만 사용하는 것이었는데 여기에서는 Partial과 Omit을 통합해서 사용한다. 이게 더 타입가드하기 좋은 것 같다. type요소를 뺀 것의 부분적

```ts
export function filterUsers(persons: Person[], criteria: Partial<Omit<User, 'type'>>): User[] {
  return persons.filter(isUser).filter(user => {
    const criteriaKeys = Object.keys(criteria) as (keyof Omit<User, 'type'>)[];
    return criteriaKeys.every(fieldName => {
      return user[fieldName] === criteria[fieldName];
    });
  });
}
```

## Exercise 6 : 00

Intro:

    Filtering requirements have grown. We need to be
    able to filter any kind of Persons.

Exercise:

    Fix typing for the filterPersons so that it can filter users
    and return User[] when personType='user' and return Admin[]
    when personType='admin'. Also filterPersons should accept
    partial User/Admin type according to the personType.
    `criteria` argument should behave according to the
    `personType` argument value. `type` field is not allowed in
    the `criteria` field.

Higher difficulty bonus exercise:

    Implement a function `getObjectKeys()` which returns more
    convenient result for any argument given, so that you don't
    need to cast it.

    let criteriaKeys = Object.keys(criteria) as (keyof User)[];
    -->
    let criteriaKeys = getObjectKeys(criteria);

### 문제코드

```TS
interface User {
    type: 'user';
    name: string;
    age: number;
    occupation: string;
}

interface Admin {
    type: 'admin';
    name: string;
    age: number;
    role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
    { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
    { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
    { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
    { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
    { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
    { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' }
];

export function logPerson(person: Person) {
    console.log(
        ` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`
    );
}

export function filterPersons(persons: Person[], personType: string, criteria: unknown): unknown[] {
    return persons
        .filter((person) => person.type === personType)
        .filter((person) => {
            let criteriaKeys = Object.keys(criteria) as (keyof Person)[];
            return criteriaKeys.every((fieldName) => {
                return person[fieldName] === criteria[fieldName];
            });
        });
}

export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);
```

### 풀이

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

export type Person = User | Admin;

export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
  { type: 'user', name: 'Wilson', age: 23, occupation: 'Ball' },
  { type: 'admin', name: 'Agent Smith', age: 23, role: 'Anti-virus engineer' },
];

export function logPerson(person: Person) {
  console.log(` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`);
}

const getObjectKeys = <T>(obj: T) => Object.keys(obj) as (keyof T)[];

export function filterPersons(
  persons: Person[],
  personType: User['type'],
  criteria: Partial<Omit<User, 'type'>>
): User[];
export function filterPersons(
  persons: Person[],
  personType: Admin['type'],
  criteria: Partial<Omit<Admin, 'type'>>
): Admin[];
export function filterPersons(persons: Person[], personType: Person['type'], criteria: Partial<Person>): Person[] {
  return persons
    .filter(person => person.type === personType)
    .filter(person => {
      let criteriaKeys = getObjectKeys(criteria);
      return criteriaKeys.every(fieldName => {
        return person[fieldName] === criteria[fieldName];
      });
    });
}

export const usersOfAge23 = filterPersons(persons, 'user', { age: 23 });
export const adminsOfAge23 = filterPersons(persons, 'admin', { age: 23 });

console.log('Users of age 23:');
usersOfAge23.forEach(logPerson);

console.log();

console.log('Admins of age 23:');
adminsOfAge23.forEach(logPerson);
```

함수 over되는거...!

## Exercise 7 : 00

Intro:

    Filtering was completely removed from the project.
    It turned out that this feature was just not needed
    for the end-user and we spent a lot of time just because
    our office manager told us to do so. Next time we should
    instead listen to the product management.

    Anyway we have a new plan. CEO's friend Nick told us
    that if we randomly swap user names from time to time
    in the community, it would be very funny and the project
    would definitely succeed!

Exercise:

    Implement swap which receives 2 persons and returns them in
    the reverse order. The function itself is already
    there, actually. We just need to provide it with proper types.
    Also this function shouldn't necessarily be limited to just
    Person types, lets type it so that it works with any two types
    specified.

### 문제코드

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

function logUser(user: User) {
  const pos = users.indexOf(user) + 1;
  console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
}

function logAdmin(admin: Admin) {
  const pos = admins.indexOf(admin) + 1;
  console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
}

const admins: Admin[] = [
  {
    type: 'admin',
    name: 'Will Bruces',
    age: 30,
    role: 'Overseer',
  },
  {
    type: 'admin',
    name: 'Steve',
    age: 40,
    role: 'Steve',
  },
];

const users: User[] = [
  {
    type: 'user',
    name: 'Moses',
    age: 70,
    occupation: 'Desert guide',
  },
  {
    type: 'user',
    name: 'Superman',
    age: 28,
    occupation: 'Ordinary person',
  },
];

export function swap(v1, v2) {
  return [v2, v1];
}

function test1() {
  console.log('test1:');
  const [secondUser, firstAdmin] = swap(admins[0], users[1]);
  logUser(secondUser);
  logAdmin(firstAdmin);
}

function test2() {
  console.log('test2:');
  const [secondAdmin, firstUser] = swap(users[0], admins[1]);
  logAdmin(secondAdmin);
  logUser(firstUser);
}

function test3() {
  console.log('test3:');
  const [secondUser, firstUser] = swap(users[0], users[1]);
  logUser(secondUser);
  logUser(firstUser);
}

function test4() {
  console.log('test4:');
  const [firstAdmin, secondAdmin] = swap(admins[1], admins[0]);
  logAdmin(firstAdmin);
  logAdmin(secondAdmin);
}

function test5() {
  console.log('test5:');
  const [stringValue, numericValue] = swap(123, 'Hello World');
  console.log(` - String: ${stringValue}`);
  console.log(` - Numeric: ${numericValue}`);
}

[test1, test2, test3, test4, test5].forEach(test => test());
```

### 풀이

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

function logUser(user: User) {
  const pos = users.indexOf(user) + 1;
  console.log(` - #${pos} User: ${user.name}, ${user.age}, ${user.occupation}`);
}

function logAdmin(admin: Admin) {
  const pos = admins.indexOf(admin) + 1;
  console.log(` - #${pos} Admin: ${admin.name}, ${admin.age}, ${admin.role}`);
}

const admins: Admin[] = [
  {
    type: 'admin',
    name: 'Will Bruces',
    age: 30,
    role: 'Overseer',
  },
  {
    type: 'admin',
    name: 'Steve',
    age: 40,
    role: 'Steve',
  },
];

const users: User[] = [
  {
    type: 'user',
    name: 'Moses',
    age: 70,
    occupation: 'Desert guide',
  },
  {
    type: 'user',
    name: 'Superman',
    age: 28,
    occupation: 'Ordinary person',
  },
];

export function swap<T, U>(v1: T, v2: U): [U, T] {
  return [v2, v1];
}

function test1() {
  console.log('test1:');
  const [secondUser, firstAdmin] = swap(admins[0], users[1]);
  logUser(secondUser);
  logAdmin(firstAdmin);
}

function test2() {
  console.log('test2:');
  const [secondAdmin, firstUser] = swap(users[0], admins[1]);
  logAdmin(secondAdmin);
  logUser(firstUser);
}

function test3() {
  console.log('test3:');
  const [secondUser, firstUser] = swap(users[0], users[1]);
  logUser(secondUser);
  logUser(firstUser);
}

function test4() {
  console.log('test4:');
  const [firstAdmin, secondAdmin] = swap(admins[1], admins[0]);
  logAdmin(firstAdmin);
  logAdmin(secondAdmin);
}

function test5() {
  console.log('test5:');
  const [stringValue, numericValue] = swap(123, 'Hello World');
  console.log(` - String: ${stringValue}`);
  console.log(` - Numeric: ${numericValue}`);
}

[test1, test2, test3, test4, test5].forEach(test => test());
```

제네릭 타입을 이용해서 swap을 사용한다.

## Exercise 8 : 00

Intro:

    Project grew and we ended up in a situation with
    some users starting to have more influence.
    Therefore, we decided to create a new person type
    called PowerUser which is supposed to combine
    everything User and Admin have.

Exercise:

    Define type PowerUser which should have all fields
    from both User and Admin (except for type),
    and also have type 'powerUser' without duplicating
    all the fields in the code.

### 문제코드

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

type PowerUser = unknown;

export type Person = User | Admin | PowerUser;

export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
  {
    type: 'powerUser',
    name: 'Nikki Stone',
    age: 45,
    role: 'Moderator',
    occupation: 'Cat groomer',
  },
];

function isAdmin(person: Person): person is Admin {
  return person.type === 'admin';
}

function isUser(person: Person): person is User {
  return person.type === 'user';
}

function isPowerUser(person: Person): person is PowerUser {
  return person.type === 'powerUser';
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  if (isPowerUser(person)) {
    additionalInformation = `${person.role}, ${person.occupation}`;
  }
  console.log(`${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);

console.log();

console.log('Power users:');
persons.filter(isPowerUser).forEach(logPerson);
```

### 풀이

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

type PowerUser = Omit<User, 'type'> &
  Omit<Admin, 'type'> & {
    type: 'powerUser';
  };

export type Person = User | Admin | PowerUser;

export const persons: Person[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
  {
    type: 'powerUser',
    name: 'Nikki Stone',
    age: 45,
    role: 'Moderator',
    occupation: 'Cat groomer',
  },
];

function isAdmin(person: Person): person is Admin {
  return person.type === 'admin';
}

function isUser(person: Person): person is User {
  return person.type === 'user';
}

function isPowerUser(person: Person): person is PowerUser {
  return person.type === 'powerUser';
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  if (isPowerUser(person)) {
    additionalInformation = `${person.role}, ${person.occupation}`;
  }
  console.log(`${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);

console.log();

console.log('Power users:');
persons.filter(isPowerUser).forEach(logPerson);
```

## Exercise 9 : 00

Intro:

    PowerUsers idea was bad. Once those users got
    extended permissions, they started bullying others
    and we lost a lot of great users.
    As a response we spent all the remaining money
    on the marketing and got even more users.
    We need to start preparing to move everything to a
    real database. For now we just do some mocks.

    The server API format was decided to be the following:

    In case of success: { status: 'success', data: RESPONSE_DATA }
    In case of error: { status: 'error', error: ERROR_MESSAGE }

    The API engineer started creating types for this API and
    quickly figured out that the amount of types needed to be
    created is too big.

Exercise:

    Remove UsersApiResponse and AdminsApiResponse types
    and use generic type ApiResponse in order to specify API
    response formats for each of the functions.

### 문제코드

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

type Person = User | Admin;

const admins: Admin[] = [
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
];

const users: User[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
];

export type ApiResponse<T> = unknown;

type AdminsApiResponse =
  | {
      status: 'success';
      data: Admin[];
    }
  | {
      status: 'error';
      error: string;
    };

export function requestAdmins(callback: (response: AdminsApiResponse) => void) {
  callback({
    status: 'success',
    data: admins,
  });
}

type UsersApiResponse =
  | {
      status: 'success';
      data: User[];
    }
  | {
      status: 'error';
      error: string;
    };

export function requestUsers(callback: (response: UsersApiResponse) => void) {
  callback({
    status: 'success',
    data: users,
  });
}

export function requestCurrentServerTime(callback: (response: unknown) => void) {
  callback({
    status: 'success',
    data: Date.now(),
  });
}

export function requestCoffeeMachineQueueLength(callback: (response: unknown) => void) {
  callback({
    status: 'error',
    error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.',
  });
}

function logPerson(person: Person) {
  console.log(` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`);
}

function startTheApp(callback: (error: Error | null) => void) {
  requestAdmins(adminsResponse => {
    console.log('Admins:');
    if (adminsResponse.status === 'success') {
      adminsResponse.data.forEach(logPerson);
    } else {
      return callback(new Error(adminsResponse.error));
    }

    console.log();

    requestUsers(usersResponse => {
      console.log('Users:');
      if (usersResponse.status === 'success') {
        usersResponse.data.forEach(logPerson);
      } else {
        return callback(new Error(usersResponse.error));
      }

      console.log();

      requestCurrentServerTime(serverTimeResponse => {
        console.log('Server time:');
        if (serverTimeResponse.status === 'success') {
          console.log(`   ${new Date(serverTimeResponse.data).toLocaleString()}`);
        } else {
          return callback(new Error(serverTimeResponse.error));
        }

        console.log();

        requestCoffeeMachineQueueLength(coffeeMachineQueueLengthResponse => {
          console.log('Coffee machine queue length:');
          if (coffeeMachineQueueLengthResponse.status === 'success') {
            console.log(`   ${coffeeMachineQueueLengthResponse.data}`);
          } else {
            return callback(new Error(coffeeMachineQueueLengthResponse.error));
          }

          callback(null);
        });
      });
    });
  });
}

startTheApp((e: Error | null) => {
  console.log();
  if (e) {
    console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`);
  } else {
    console.log('Success!');
  }
});
```

### 풀이

```ts
interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

type Person = User | Admin;

const admins: Admin[] = [
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
];

const users: User[] = [
  { type: 'user', name: 'Max Mustermann', age: 25, occupation: 'Chimney sweep' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
];

export type ApiResponse<T> = { status: 'success'; data: T } | { status: 'error'; error: string };

export function requestAdmins(callback: (response: ApiResponse<Admin[]>) => void) {
  callback({
    status: 'success',
    data: admins,
  });
}

export function requestUsers(callback: (response: ApiResponse<User[]>) => void) {
  callback({
    status: 'success',
    data: users,
  });
}

export function requestCurrentServerTime(callback: (response: ApiResponse<number>) => void) {
  callback({
    status: 'success',
    data: Date.now(),
  });
}

export function requestCoffeeMachineQueueLength(callback: (response: ApiResponse<number>) => void) {
  callback({
    status: 'error',
    error: 'Numeric value has exceeded Number.MAX_SAFE_INTEGER.',
  });
}

function logPerson(person: Person) {
  console.log(` - ${person.name}, ${person.age}, ${person.type === 'admin' ? person.role : person.occupation}`);
}

function startTheApp(callback: (error: Error | null) => void) {
  requestAdmins(adminsResponse => {
    console.log('Admins:');
    if (adminsResponse.status === 'success') {
      adminsResponse.data.forEach(logPerson);
    } else {
      return callback(new Error(adminsResponse.error));
    }

    console.log();

    requestUsers(usersResponse => {
      console.log('Users:');
      if (usersResponse.status === 'success') {
        usersResponse.data.forEach(logPerson);
      } else {
        return callback(new Error(usersResponse.error));
      }

      console.log();

      requestCurrentServerTime(serverTimeResponse => {
        console.log('Server time:');
        if (serverTimeResponse.status === 'success') {
          console.log(`   ${new Date(serverTimeResponse.data).toLocaleString()}`);
        } else {
          return callback(new Error(serverTimeResponse.error));
        }

        console.log();

        requestCoffeeMachineQueueLength(coffeeMachineQueueLengthResponse => {
          console.log('Coffee machine queue length:');
          if (coffeeMachineQueueLengthResponse.status === 'success') {
            console.log(`   ${coffeeMachineQueueLengthResponse.data}`);
          } else {
            return callback(new Error(coffeeMachineQueueLengthResponse.error));
          }

          callback(null);
        });
      });
    });
  });
}

startTheApp((e: Error | null) => {
  console.log();
  if (e) {
    console.log(`Error: "${e.message}", but it's fine, sometimes errors are inevitable.`);
  } else {
    console.log('Success!');
  }
});
```

제너릭에 들어가는 타입 자체가 배열일 수도 있다.
