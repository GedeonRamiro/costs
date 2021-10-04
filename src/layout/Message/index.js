import style from './style.module.css'
import { useState, useEffect } from 'react'

const Message = ({ type, msg }) => {

    const [visible, setVisible] = useState(false)

    function msgVisible(){
        if(!msg){
            setVisible(false)
            return
        }

        setVisible(true)

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }

    useEffect(() => {
        msgVisible()
    }, [msg])

    return (
        <>
            {visible && (
                    <div className={`${style.message} ${style[type]} `}>{msg}</div> 
                )
            }
        </>
    )
}

export default Message
