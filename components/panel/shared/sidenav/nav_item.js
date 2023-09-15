import Link from "next/link"

export default function NavItem(props){
    return(
        <li className={`nav-item ${props.active ? 'active' : ''}`}>
            <Link href={props.href}>
                <a className="nav-link d-flex align-items-center">
                    <span className="sidebar-icon">
                        {props.children}
                    </span>
                    <span className="sidebar-text">{props.title}</span>
                </a>
            </Link>
        </li>
    )
}