import { Outlet, NavLink } from "react-router-dom";
import NavBar from "../sections/nav/NavBar";

export default function Layout() {
    return <>
        <Header />
        <main></main>
        <footer></footer>
    </>
}


const Header = () => {
    return <header>
        <nav>
            <NavLink to='./Home.tsx'>Home</NavLink>
            <NavLink to='' >About</NavLink>
            <NavLink to='' state={{ myName: 'saxdsd' }}>Products</NavLink>
        </nav>
    </header>
}

const Main = ({ children }: any) => {
    return <main>{children}</main>
}


const Footer = () => {
    return <footer>React Course</footer>
}
