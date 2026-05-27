import path from "path";
import fs from "fs";
import crypto from "crypto";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ─── Types ───────────────────────────────────────────────────────────────────

export interface User {
  id: number;
  name: string;
  email: string;
  password: string | null;
  role: string;
  email_verified: number;
  email_verify_token: string | null;
  password_reset_token: string | null;
  password_reset_expires: string | null;
  login_attempts: number;
  lockout_until: string | null;
  google_id: string | null;
  avatar_url: string | null;
  created_at: string;
}

export interface Subscriber { id: number; email: string; created_at: string; }
export interface WaitlistEntry { id: number; name: string; email: string; company: string; created_at: string; }
export interface Contact { id: number; name: string; email: string; message: string; created_at: string; }

interface Store {
  subscribers: Subscriber[];
  waitlist: WaitlistEntry[];
  contacts: Contact[];
  users: User[];
}

// ─── JSON persistence ────────────────────────────────────────────────────────

const DB_FILE = path.join(DATA_DIR, "analyticspro.json");

function load(): Store {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, "utf8"));
    }
  } catch {}
  return { subscribers: [], waitlist: [], contacts: [], users: [] };
}

function save(store: Store) {
  fs.writeFileSync(DB_FILE, JSON.stringify(store, null, 2), "utf8");
}

function nextId(items: { id: number }[]): number {
  return items.length === 0 ? 1 : Math.max(...items.map((x) => x.id)) + 1;
}

const now = () => new Date().toISOString();

// ─── Public API ───────────────────────────────────────────────────────────────

export const db = {
  // Subscribers
  subscriberExists: (email: string) => {
    return load().subscribers.some((s) => s.email === email);
  },
  addSubscriber: (email: string): Subscriber => {
    const store = load();
    const entry: Subscriber = { id: nextId(store.subscribers), email, created_at: now() };
    store.subscribers.unshift(entry);
    save(store);
    return entry;
  },
  getAllSubscribers: (): Subscriber[] => load().subscribers,

  // Waitlist
  waitlistExists: (email: string) => {
    return load().waitlist.some((w) => w.email === email);
  },
  addToWaitlist: (name: string, email: string, company: string): WaitlistEntry => {
    const store = load();
    const entry: WaitlistEntry = { id: nextId(store.waitlist), name, email, company, created_at: now() };
    store.waitlist.unshift(entry);
    save(store);
    return entry;
  },
  getAllWaitlist: (): WaitlistEntry[] => load().waitlist,

  // Contacts
  addContact: (name: string, email: string, message: string): Contact => {
    const store = load();
    const entry: Contact = { id: nextId(store.contacts), name, email, message, created_at: now() };
    store.contacts.unshift(entry);
    save(store);
    return entry;
  },
  getAllContacts: (): Contact[] => load().contacts,

  // Users
  findUserByEmail: (email: string): User | null =>
    load().users.find((u) => u.email === email) ?? null,

  findUserById: (id: number): User | null =>
    load().users.find((u) => u.id === id) ?? null,

  findUserByGoogleId: (googleId: string): User | null =>
    load().users.find((u) => u.google_id === googleId) ?? null,

  createUser: (data: {
    name: string;
    email: string;
    password?: string;
    role?: string;
    emailVerified?: boolean;
    googleId?: string;
    avatarUrl?: string;
    emailVerifyToken?: string;
  }): User => {
    const store = load();
    const token = data.emailVerified ? null : crypto.randomBytes(32).toString("hex");
    const user: User = {
      id: nextId(store.users),
      name: data.name,
      email: data.email,
      password: data.password ?? null,
      role: data.role ?? "user",
      email_verified: data.emailVerified ? 1 : 0,
      email_verify_token: data.emailVerifyToken ?? token,
      password_reset_token: null,
      password_reset_expires: null,
      login_attempts: 0,
      lockout_until: null,
      google_id: data.googleId ?? null,
      avatar_url: data.avatarUrl ?? null,
      created_at: now(),
    };
    store.users.unshift(user);
    save(store);
    return user;
  },

  verifyEmail: (token: string): User | null => {
    const store = load();
    const idx = store.users.findIndex((u) => u.email_verify_token === token);
    if (idx === -1) return null;
    store.users[idx] = { ...store.users[idx], email_verified: 1, email_verify_token: null };
    save(store);
    return store.users[idx];
  },

  incrementLoginAttempts: (id: number) => {
    const store = load();
    const idx = store.users.findIndex((u) => u.id === id);
    if (idx === -1) return;
    const attempts = store.users[idx].login_attempts + 1;
    store.users[idx] = {
      ...store.users[idx],
      login_attempts: attempts,
      lockout_until: attempts >= 5
        ? new Date(Date.now() + 15 * 60 * 1000).toISOString()
        : store.users[idx].lockout_until,
    };
    save(store);
  },

  resetLoginAttempts: (id: number) => {
    const store = load();
    const idx = store.users.findIndex((u) => u.id === id);
    if (idx === -1) return;
    store.users[idx] = { ...store.users[idx], login_attempts: 0, lockout_until: null };
    save(store);
  },

  setPasswordResetToken: (id: number): string => {
    const store = load();
    const idx = store.users.findIndex((u) => u.id === id);
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    store.users[idx] = { ...store.users[idx], password_reset_token: token, password_reset_expires: expires };
    save(store);
    return token;
  },

  findUserByResetToken: (token: string): User | null => {
    const user = load().users.find(
      (u) => u.password_reset_token === token &&
        u.password_reset_expires != null &&
        new Date(u.password_reset_expires) > new Date()
    );
    return user ?? null;
  },

  updatePassword: (id: number, hashedPassword: string) => {
    const store = load();
    const idx = store.users.findIndex((u) => u.id === id);
    if (idx === -1) return;
    store.users[idx] = {
      ...store.users[idx],
      password: hashedPassword,
      password_reset_token: null,
      password_reset_expires: null,
      login_attempts: 0,
      lockout_until: null,
    };
    save(store);
  },

  getAllUsers: (): Omit<User, "password">[] =>
    load().users.map(({ password: _p, ...rest }) => rest),
};
