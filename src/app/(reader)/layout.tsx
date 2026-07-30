import NavigationBar from "@/components/reader/layout/NavigationBar";
import Footer from "@/components/reader/layout/Footer";

export default function ReaderLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex min-h-screen flex-col bg-[#FAF8F5] text-[#4E4540]">
            <NavigationBar />
            <main className="relative flex-1 overflow-hidden animate-page-fade">
                {children}
            </main>
            <Footer />
        </div>
    );
}