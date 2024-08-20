
import NavbarComponent from '../components/NavbarComponent'
import SidebarComponent from '../components/SidebarComponent'
import { SidebarLayout } from '../components/UI/sidebar-layout'

function DashboardLayout({children}) {
  return (
    <SidebarLayout
      navbar={<NavbarComponent />}
      sidebar={<SidebarComponent />}
    >
      {children}
    </SidebarLayout>
  )
}
export default DashboardLayout
