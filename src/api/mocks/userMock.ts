// src/mocks/userMock.ts
type UUID = string;

export interface User {
  id: UUID;
  displayName: string;
}

export const userMock: User = {
  id: 'fd282131-d8aa-4819-b0c8-d9e0bfb1b75c',
  displayName: 'gianniWehner',
};
