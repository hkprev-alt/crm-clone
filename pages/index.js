import Head from 'next/head';
import dynamic from 'next/dynamic';
const KanbanBoard = dynamic(() => import('../components/KanbanBoard'), { ssr: false });

export default function Home() {
  return (
    <>
      <Head><title>CRM Clone - Kanban</title></Head>
      <main className="min-h-screen p-6 bg-gray-50">
        <h1 className="text-2xl font-bold mb-4">CRM Clone - Kanban</h1>
        <KanbanBoard />
      </main>
    </>
  );
}
