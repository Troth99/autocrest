import ChangePasswordForm from "@/features/auth/change-password/components/ChangePasswordForm";

export default function ChangePasswordPage() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-10 sm:py-14">
      <span className="eyebrow">ACCOUNT SECURITY</span>
      <h1 className="page-title mt-4">
        Change password
      </h1>
      <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
        Update your password to keep your AutoCrest account secure.
      </p>
      <section className="card-base mt-8">
        <ChangePasswordForm />
      </section>
    </main>
  );
}
