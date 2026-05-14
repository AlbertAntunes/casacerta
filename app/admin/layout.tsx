import { AdminSidebar } from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-green-950">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-10">{children}</div>
      </main>
    </div>
  )
}
