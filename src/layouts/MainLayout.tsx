import NavBar from '../sections/nav/NavBar'
// import Footer from '../components/section/Footer'
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div>
            <header>
                <NavBar />
            </header>
            <main>
                <Outlet />
            </main>
            {/* <Footer /> */}
        </div>
    );
}
