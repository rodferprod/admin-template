import useAuth from "@/data/hook/useAuth";
import Image from "next/image";
import loading from "../../../public/images/loading.gif"
import Router from "next/router";
import Head from "next/head";

export default function ForcarAutenticacao(props: any) {

    const { usuario, carregando } = useAuth()

    function renderContent() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes('template-admin-project-auth')){
                                    window.location.href="/autenticacao"
                                }
                            `
                        }} />
                </Head>
                {props.children}
            </>
        )
    }

    function renderLoading() {
        return (
            <div className="flex justify-center items-center h-screen">
                <Image src={loading} alt="Verificando..." />
            </div>
        )
    }

    if(!carregando && usuario?.email) {
        return renderContent()
    } else if(carregando) {
        return renderLoading()
    }else{
        Router.push('/autenticacao')
        return null
    }

}