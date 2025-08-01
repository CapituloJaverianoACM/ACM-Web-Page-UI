// Código de Acha

import { MouseEventHandler, ReactNode } from "react"

const Image = (props: {
  src: string,
  className?: string
}) => {
  const { src, className = "" } = props;

  return <img alt="event-image" src={src} className={`pointer-events-none w-full object-cover aspect-video select-none ${className}`}>
  </img>
}

const Title = (props: {
  children?: ReactNode | string
}) => {
  const { children } = props;

  return <p className="font-semibold text-md m-0 dark:text-[var(--azul-niebla)]">
    {children}
  </p>
}

const Padding = (props: {
  children?: ReactNode,
  className?: string
}) => {
  const { children, className = "" } = props;

  return <div className={`flex flex-col gap-2 p-4 ${className}`}>
    {children}
  </div>
}

const Container = (props: {
  children: ReactNode,
  className?: string
}) => {

  const { children, className = "" } = props;

  return <div className={`glassmorphic dark:glassmorphic-dark w-full flex flex-col gap-2 !rounded-3xl hover:shadow-md hover:transition hover:duration-100 border border-[--azul-niebla] overflow-hidden ${className}`}>
    {children}
  </div>
}

const Description = (
  props: {
    className?: string,
    children?: ReactNode | string
  }
) => {
  const { className = "", children = null } = props;

  return <p className={`text-xs text-neutral-800 dark:text-[var(--azul-niebla)] m-0 ${className}`}>
    {children}
  </p>
}

const RegisterButton = (
  props: {
    onClick?: MouseEventHandler,
    className?: string,
    children?: ReactNode | string
  }
) => {
  const { onClick = () => { }, className = "", children = null } = props;

  return <button className={`w-full text-white font-semibold p-2 bg-[rgb(var(--azul-electrico-rgb)_/_0.8)] dark:bg-[rgb(var(--azul-electrico-rgb)_/_0.6)] hover:brightness-105 hover:transition hover:duration-100 rounded-full ${className}`} onClick={onClick}>
    {
      children ?? "Registrarse"
    }
  </button>

}

const WrapContainer = (props: {
  className?: string,
  children?: ReactNode | string
}) => {
  const { className = "", children = null } = props;

  return <div className={`flex flex-wrap gap-2 ${className}`}>
    {children}
  </div>
}

export default {
  Container,
  Image,
  Title,
  Padding,
  RegisterButton,
  Description,
  WrapContainer
}