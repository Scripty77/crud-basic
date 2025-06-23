import React from 'react'
import SideNav from '../components/sideNav'

interface LayoutProps {
    children: React.ReactNode;
}

export default function Dashboardlayout({ children }: LayoutProps) {
    return (
        <div className="flex h-screen">
            <aside className="w-16 md:w-64 bg-black/50">
                <SideNav />
            </aside>
            <main className="flex-grow p-4 overflow-y-auto">{children}</main>
        </div>
    )
}

