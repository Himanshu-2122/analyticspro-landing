import { db } from "@/lib/db";

export default function AdminPage() {
  const waitlist = db.getAllWaitlist();
  const subscribers = db.getAllSubscribers();
  const contacts = db.getAllContacts();
  const users = db.getAllUsers();

  const tabs = [
    { id: "waitlist", label: "Waitlist", count: waitlist.length },
    { id: "subscribers", label: "Subscribers", count: subscribers.length },
    { id: "contacts", label: "Messages", count: contacts.length },
    { id: "users", label: "Users", count: users.length },
  ];

  function fmt(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-white mb-2">Admin Panel</h1>
      <p className="text-slate-500 text-sm mb-8">All leads, subscribers, and user data.</p>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {tabs.map((t) => (
          <div key={t.id} className="glass rounded-xl p-4 text-center">
            <div className="font-heading text-3xl font-bold text-white mb-1">{t.count}</div>
            <div className="text-slate-500 text-xs">{t.label}</div>
          </div>
        ))}
      </div>

      {/* Waitlist */}
      <Section title="Waitlist Entries" count={waitlist.length}>
        <Table
          headers={["Name", "Email", "Company", "Date"]}
          rows={waitlist.map((w) => [w.name, w.email, w.company || "—", fmt(w.created_at)])}
          empty="No waitlist entries yet."
        />
      </Section>

      {/* Subscribers */}
      <Section title="Newsletter Subscribers" count={subscribers.length}>
        <Table
          headers={["Email", "Subscribed"]}
          rows={subscribers.map((s) => [s.email, fmt(s.created_at)])}
          empty="No subscribers yet."
        />
      </Section>

      {/* Contacts */}
      <Section title="Contact Messages" count={contacts.length}>
        <Table
          headers={["Name", "Email", "Message", "Date"]}
          rows={contacts.map((c) => [c.name, c.email, c.message.slice(0, 80) + (c.message.length > 80 ? "…" : ""), fmt(c.created_at)])}
          empty="No messages yet."
        />
      </Section>

      {/* Users */}
      <Section title="Registered Users" count={users.length}>
        <Table
          headers={["Name", "Email", "Role", "Verified", "Joined"]}
          rows={users.map((u) => [
            u.name,
            u.email,
            u.role,
            u.email_verified ? "✅" : "⏳",
            fmt(u.created_at),
          ])}
          empty="No users yet."
        />
      </Section>
    </div>
  );
}

function Section({ title, count, children }: { title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-3">
        <h2 className="font-heading text-lg font-semibold text-white">{title}</h2>
        <span className="px-2 py-0.5 rounded-full bg-white/5 text-slate-400 text-xs font-semibold">{count}</span>
      </div>
      {children}
    </div>
  );
}

function Table({ headers, rows, empty }: { headers: string[]; rows: string[][]; empty: string }) {
  if (rows.length === 0) {
    return (
      <div className="glass rounded-xl px-5 py-8 text-center text-slate-500 text-sm">{empty}</div>
    );
  }
  return (
    <div className="glass rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.05]">
              {headers.map((h) => (
                <th key={h} className="text-left px-4 py-3 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                {row.map((cell, j) => (
                  <td key={j} className="px-4 py-3 text-slate-300 max-w-xs truncate">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
