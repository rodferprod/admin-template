import { createContext, useEffect, useState } from "react"
import firebase from '../../firebase/config'
import route from 'next/router'
import Usuario from "../../../model/Usuario"
import Cookies from 'js-cookie'

// Iremos disponibilizar dois itens para toda aplicação:
// 1) Um objeto com as informações do usuário logado
// 2) Uma função para a realização do login
interface AuthContextProps {
    usuario?: Usuario
    login?: (email: string, senha: string) => Promise<void>
    loginGoogle?: () => Promise<void>
    cadastrar?: (email: string, senha: string) => Promise<void>
    logout?: () => Promise<void>
    erro?: string
    exibirErro?: (msg: string, tempo: number) => void
    carregando?: boolean
}

const AuthContext = createContext<AuthContextProps>({})

// Com uma interface de Usuario definida temos uma forma
// padronizada para receber informações de qualquer provedor
async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName ?? '',
        email: usuarioFirebase.email ?? '',
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId ?? 'Indefinido',
        imagemURL: usuarioFirebase.photoURL ?? ''
    }
}

function gerenciarCookie(logado: boolean) {
    if (logado) {
        Cookies.set('template-admin-project-auth', `${logado}`, {
            expires: 7
        })
    } else {
        Cookies.remove('template-admin-project-auth')
    }
}

export function AuthProvider(props: any) {

    const [erro, setErro] = useState<string>('')
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario>({
        uid: '',
        email: '',
        nome: '',
        token: '',
        provedor: '',
        imagemURL: ''
    })

    function exibirErro(msg: string, tempo = 5) {
        setErro(msg)
        setTimeout(() => {
            setErro('')
        }, tempo * 1000);
    }

    async function configurarSessao(usuarioFirebase: any) {
        if (usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario({
                uid: '',
                email: '',
                nome: '',
                token: '',
                provedor: '',
                imagemURL: ''
            })
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle() {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithPopup(
                new firebase.auth.GoogleAuthProvider()
            )
            await configurarSessao(resp.user)
            route.push('/')
        } catch (error: any) {
            setCarregando(false)
            if (error?.message) exibirErro(error.message)
        }
    }

    async function login(email: string, senha: string) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().signInWithEmailAndPassword(email, senha)
            await configurarSessao(resp.user)
            route.push('/')
        } catch (error: any) {
            setCarregando(false)
            if (error?.code) {
                if(error?.code == 'auth/internal-error'){
                    const message = JSON.parse(error?.message)
                    exibirErro(message?.error?.message)
                } else {
                    exibirErro(error?.message)
                }
            } else {
                exibirErro('Problema inesperado ao tentar logar')
            }
        }
    }

    async function cadastrar(email: string, senha: string) {
        try {
            setCarregando(true)
            const resp = await firebase.auth().createUserWithEmailAndPassword(email, senha)
            await configurarSessao(resp.user)
            route.push('/')
        } catch (error: any) {
            setCarregando(false)
            console.log('create error')
            if (error?.message) exibirErro(error.message)
        }
    }

    async function logout() {
        try {
            setCarregando(true)
            await firebase.auth().signOut()
            await configurarSessao(null)
        } catch (error: any) {
            setCarregando(false)
            if (error?.message) exibirErro(error.message)
        }
    }

    useEffect(() => {
        if (Cookies.get('template-admin-project-auth')) {
            const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
            return () => cancelar()
        } else {
            setCarregando(false)
        }
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            login,
            loginGoogle,
            cadastrar,
            logout,
            erro,
            exibirErro,
            carregando
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext