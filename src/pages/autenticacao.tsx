/* eslint-disable @next/next/no-img-element */
import InputAuth from "@/components/auth/InputAuth";
import useAuth from "@/data/hook/useAuth";
import { IconWarn } from "@/components/icons";
import { useState } from "react";

export default function Autenticacao(){
    
    const { cadastrar, login, loginGoogle, erro, exibirErro } = useAuth()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [modo, setModo] = useState<'login' | 'cadastro'>('login')
    
    async function submeter(){
        try {
            if(modo === 'login'){
                 login && (await login(email, senha))
            } else {
                cadastrar && (await cadastrar(email, senha))
            }
        } catch (e: any) {
            exibirErro && (
                e?.error?.message ? exibirErro(e?.error?.message, 10) :
                ( e?.message ? exibirErro(e.message, 10) :
                    exibirErro('Problema inesperado ao tentar logar', 10)
                )
            )
        }
    }


    
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="hidden md:block md:w-1/2 lg:w-2/3">
                <img src="https://picsum.photos/1920/1080"
                    alt="Imagem Randômica"
                    className="h-screen w-full object-cover" />
            </div>
            <div className="m-10 w-full md:w-1/2 lg:w-1/3">
                <h1 className="text-3xl font-bold mb-5">
                    {modo === 'login' ? 'Informe suas credenciais' : 'Cadastre-se na Plataforma'}
                </h1>
                {erro ? (
                    <div className="flex items-center
                        bg-red-400 text-white py-3 px-5 my-2
                        border border-red-700 rounded-lg">
                        {IconWarn(8)}
                        <span className="ml-2">{erro}</span>
                    </div>
                ) : false}
                <InputAuth
                    tipo="email"
                    label="E-mail"
                    valor={email}
                    valorMudou={setEmail}
                    obrigatorio />
                <InputAuth
                    tipo="password"
                    label="Senha"
                    valor={senha}
                    valorMudou={setSenha}
                    obrigatorio />
                <button className="w-full px-4 py-3 mt-6 text-white
                        bg-indigo-500 hover:bg-indigo-400 rounded-lg"
                    onClick={submeter}>
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>
                <hr className="my-6 border-l-gray-300 w-full" />
                <button className="w-full text-white px-4 py-3
                        bg-red-500 hover:bg-red-400 rounded-lg"
                    onClick={loginGoogle}>
                    Entrar com o Google
                </button>
                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('cadastro')}
                            className="ml-1 text-blue-500 hover:text-blue-400 font-semibold cursor-pointer">
                            Crie sua conta gratuitamente
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já faz parte da nossa comunidade?
                        <a onClick={() => setModo('login')}
                            className="ml-1 text-blue-500 hover:text-blue-400 font-semibold cursor-pointer">
                            Entre com suas credenciais
                        </a>
                    </p>
                )}
            </div>
        </div>
    )
}