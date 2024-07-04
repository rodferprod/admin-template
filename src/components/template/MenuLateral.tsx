import { IconExit, IconHome, IconNotifications, IconSettings, IconUsers } from "../icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";
import router from 'next/router'
import useAuth from "@/data/hook/useAuth";

export default function MenuLateral() {

    const { logout } = useAuth()

    async function sairDaAplicacao(){
        if(logout){
            await logout()
            router.push('/autenticacao')
        }
    }

    return (
        <aside className="
            flex flex-col
            bg-gray-200 text-gray-700
            dark:bg-gray-900">
            <div className={`
                flex flex-col items-center justify-center
                bg-gradient-to-r from-indigo-500 to-purple-800
                w-20 h-20
            `}>
                <Logo />
            </div>
            <ul className="flex flex-col flex-grow">
                <MenuItem
                    url="/"
                    texto="Inicio"
                    icone={IconHome} />
                <MenuItem
                    url="/ajustes"
                    texto="Ajustes"
                    icone={IconSettings} />
                <MenuItem
                    url="/notificacoes"
                    texto="Notificações"
                    icone={IconNotifications} />
                <MenuItem
                    url="/clientes"
                    texto="Clientes"
                    icone={IconUsers(6)} />
            </ul>
            <ul>
                <MenuItem
                    className="
                        text-red-600 dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white"
                    onClick={() => sairDaAplicacao() }
                    texto="Sair"
                    icone={IconExit} />
            </ul>
        </aside>
    )
}