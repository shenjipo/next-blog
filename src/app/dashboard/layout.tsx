import { NavButton } from "../components/NavButton/NavButton"
import { MenuDrawer } from "../components/menuDrawer/menuDrawer"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="DashboardLayout">
            <NavButton>
                <MenuDrawer visible={false}></MenuDrawer>
            </NavButton>
            {children}
        </div>
    )
}