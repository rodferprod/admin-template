interface BotaoAcaoProps {
    cor?: 'green' | 'blue' | 'gray' | 'red'
    className?: string
    children: any
    onClick?: () => void
}

export default function BotaoAcao(props: BotaoAcaoProps){
    // Este tipo de abordagem causa problemas de interpretação pelo Tailwind
    // resultando na omissão dos estilos na geração do build e o layout é prejudicado
    // para corrigir o problema é necessário configurar exceções que digam ao Tailwind
    // que gere os estilos desejados sem exceções
    // Local: tailwind.config.ts (safelist)
    
    const cor = props?.cor ?? 'gray'
    return (
        <button onClick={props.onClick} className={`
            bg-gradient-to-r from-${cor}-500 to-${cor}-600
            px-4 py-2 rounded-md
            ${props?.className ?? ''}
        `}>
            {props.children}
        </button>
    )
}