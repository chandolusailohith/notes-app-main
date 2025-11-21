export interface User {
  id: string;
  username: string;
  password: string;
  createdAt: string;
}

export interface Note {
  id: string;
  userId: string;
  title: string;
  body: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export type SortOption = 'newest' | 'oldest' | 'a-z' | 'z-a';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  NotesList: undefined;
  NoteEditor: { note?: Note };
};
