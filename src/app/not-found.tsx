export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
      <div>
        <h1 className="font-serif text-4xl">Page not found</h1>
        <a href="./" className="mt-6 inline-block text-romantic-400 underline">
          Back home
        </a>
      </div>
    </div>
  );
}
