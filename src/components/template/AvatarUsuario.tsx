/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import useAuth from "@/data/hook/useAuth";

export default function AvatarUsuario(){

    const { usuario } = useAuth()

    return (
        <Link href='/perfil'>
            <img
                src={!usuario?.imagemURL ? '/images/avatar.svg' : usuario.imagemURL}
                alt="Avatar do Uusário"
                className="h-10 w-10 rounded-full cursor-pointer" />
        </Link>
    )
}