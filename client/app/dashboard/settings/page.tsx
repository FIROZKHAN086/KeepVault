export default function SettingsPage() {
  return (
    <div className="p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="space-y-6">
        <section className="bg-card p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Profile</h2>
          {/* TODO: Add profile settings form */}
          <p className="text-muted-foreground">Manage your account details and preferences.</p>
        </section>

        <section className="bg-card p-6 rounded-xl border">
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          {/* TODO: Add security settings form (password change, 2FA, etc) */}
          <p className="text-muted-foreground">Update your password and secure your account.</p>
        </section>
      </div>
    </div>
  );
}
