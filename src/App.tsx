import PromptForm from '@/components/PromptForm';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="py-6 text-center bg-gradient-to-r from-purple-500 to-indigo-500 text-white">
        <h1 className="text-2xl font-bold">Prompt Generator</h1>
        <p className="text-sm mt-1">Create video scene prompts easily</p>
      </header>

      <main className="flex-1 px-4 py-10">
        <PromptForm />
      </main>

      <footer className="py-4 text-center text-sm text-muted-foreground">
        © <a href="https://digitalkreatif.id" target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">Digital Kreatif</a>
      </footer>
    </div>
  );
}

export default App; 