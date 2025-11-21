import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, Note } from '../types';

const USERS_KEY = 'notes_app_users';
const NOTES_KEY = 'notes_app_notes';
const CURRENT_USER_KEY = 'notes_app_current_user';

export const storage = {
  getUsers: async (): Promise<User[]> => {
    const data = await AsyncStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUsers: async (users: User[]) => {
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  addUser: async (user: User) => {
    const users = await storage.getUsers();
    users.push(user);
    await storage.saveUsers(users);
  },

  findUser: async (username: string): Promise<User | undefined> => {
    const users = await storage.getUsers();
    return users.find(u => u.username === username);
  },

  getCurrentUser: async (): Promise<User | null> => {
    const data = await AsyncStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },

  setCurrentUser: async (user: User | null) => {
    if (user) {
      await AsyncStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  getNotes: async (userId: string): Promise<Note[]> => {
    const data = await AsyncStorage.getItem(NOTES_KEY);
    const allNotes: Note[] = data ? JSON.parse(data) : [];
    return allNotes.filter(note => note.userId === userId);
  },

  saveNote: async (note: Note) => {
    const data = await AsyncStorage.getItem(NOTES_KEY);
    const allNotes: Note[] = data ? JSON.parse(data) : [];
    const index = allNotes.findIndex(n => n.id === note.id);

    if (index >= 0) {
      allNotes[index] = note;
    } else {
      allNotes.push(note);
    }

    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(allNotes));
  },

  deleteNote: async (noteId: string) => {
    const data = await AsyncStorage.getItem(NOTES_KEY);
    const allNotes: Note[] = data ? JSON.parse(data) : [];
    const filtered = allNotes.filter(n => n.id !== noteId);
    await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(filtered));
  },
};
