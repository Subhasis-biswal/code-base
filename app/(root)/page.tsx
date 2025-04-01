import EditorPanel from "./_components/EditorPanel";
import Header from "./_components/Header";
import OutputPanel from "./_components/OutputPanel";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <Header/>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Editor Panel - 70% height on mobile/tablet */}
          <div className="w-full h-[70vh] lg:h-[calc(100vh-14rem)]">
            <EditorPanel />
          </div>
          {/* Output Panel - 30% height on mobile/tablet */}
          <div className="w-full h-[30vh] lg:h-[calc(100vh-14rem)]">
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  );
}