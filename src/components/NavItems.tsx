"use client"

import { PRODUCT_CATEGORIES } from "@/config"
import { useEffect, useRef, useState } from "react"
import { NavItem } from "./NavItem"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

const NavItems = () => {
  const [acitveIndex, setActiveIndex] = useState<null | number>(null)
  const isAnyOpen = acitveIndex !== null
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { e.key === "Escape" ? setActiveIndex(null) : null }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }
    , [])
  useOnClickOutside(navRef, () => (setActiveIndex(null)))

  return (
    <div ref={navRef} className=" flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (acitveIndex === index) {
            setActiveIndex(null)
          } else {
            setActiveIndex(index)
          }
        }
        const isOpen = index === acitveIndex

        return (
          <NavItem category={category} handleOpen={handleOpen} isOpen={isOpen} isAnyOpen={isAnyOpen} key={category.value} />
        )
      })}
    </div>
  )
}

export default NavItems