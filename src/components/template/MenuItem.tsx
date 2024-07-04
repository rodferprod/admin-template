import Link from "next/link"

interface MenuItemProps {
    texto: string
    icone: any
    className?: string
    url?: string
    onClick?: (e: any) => void
}

export default function MenuItem(props: MenuItemProps) {
    function renderLink(){
        return (
            <div className={`
                flex flex-col justify-center items-center
                h-20 w-20 cursor-pointer
                text-gray-600 dark:text-gray-200
                ${props.className}
            `}>
                {props.icone}
                <span className={`
                    text-xs font-light
                `}>
                    {props.texto}
                </span>
            </div>
        )
    }
    return (
        <li onClick={props.onClick} className={`
            hover:bg-gray-100 dark:hover:bg-gray-700
        `}>
            {props.url ?
                <Link href={props.url}>
                 {renderLink()}   
                </Link>
                : (
                    renderLink()
                )
            }
                
        </li>
    )
}