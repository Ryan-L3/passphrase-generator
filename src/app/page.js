// src/app/page.js
import PassphraseGenerator from '../../components/PassphraseGenerator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Passphrase Generator</h1>
        <p className="text-center mb-12 max-w-2xl mx-auto text-gray-600 text-lg">
          Generate a secure, memorable passphrase based on a theme of your choice.
        </p>
        <PassphraseGenerator />

        <div className="mt-16 max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">About Secure Passphrases</h2>
          <p className="mb-4 text-gray-700">
            A passphrase consisting of 4 random words provides excellent security while
            being easier to remember than complex passwords with special characters.
          </p>
          <p className="mb-4 text-gray-700">
            For example, a passphrase like correct-horse-battery-staple has high entropy
            (randomness) making it difficult to crack while being relatively easy to memorize.
          </p>
        </div>
      </div>
    </main>
  );
}