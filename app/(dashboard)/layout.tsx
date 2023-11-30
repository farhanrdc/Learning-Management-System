import Navbar from "./_components/navbar"
import Sidebar from "./_components/sidebar"

export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="h-screen">
        <div className="md:pl-56 h-[80px] w-full fixed z-50">
          <Navbar />
        </div>

        <div className="hidden md:flex inset-y-0 h-full w-56 flex-col fixed z-50">
            <Sidebar />
        </div>
        <main className="md:pl-56  h-full pt-[80px]">
          {children}
        </main>
      </div>
    )
  }
  