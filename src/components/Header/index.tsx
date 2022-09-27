import { HeaderContainer } from "./styles";
import imgLogo from '../../assets/logo.svg'
import { Timer, Scroll } from 'phosphor-react'
import { NavLink } from "react-router-dom";
export function Header() {
    return (

        <HeaderContainer>
            <img src={imgLogo} alt="" />
            <nav>
                <NavLink to={"/"} end title="Timer">
                    <Timer size={24} />
                </NavLink>
                <NavLink to={"/history"} title="Historico">
                    <Scroll size={24} />
                </NavLink>
            </nav>
        </HeaderContainer>
    )
}