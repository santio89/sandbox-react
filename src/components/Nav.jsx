import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <header className='main__header'>
        <nav>
            <Link to={"/"}>SandBox|HTML-CSS-JS</Link>
        </nav>
    </header>
  )
}
