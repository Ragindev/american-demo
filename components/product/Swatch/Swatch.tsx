import cn from 'classnames'
import React from 'react'
import s from './Swatch.module.css'
import { Check } from '@components/icons'
import Button, { ButtonProps } from '@components/ui/Button'
import { isDark } from '@lib/colors'
import { url } from 'inspector'
import Image from 'next/image'
interface SwatchProps {
  active?: boolean
  children?: any
  className?: string
  variant?: 'size' | 'color' | string
  color?: string
  label?: string | null
  image?:string
  
}

const Swatch: React.FC<Omit<ButtonProps, 'variant'> & SwatchProps> = React.memo(
  ({
    active,
    className,
    color = '',
    label = null,
    variant = 'size',
    image ='',
  
    ...props
  }) => {
    variant = variant?.toLowerCase()

    if (label) {
      label = label?.toLowerCase()
    }

    const swatchClassName = cn(
      s.swatch,
      {
        [s.color]: "color",
        [s.active]: active,
        [s.size]: variant === 'size',
        [s.dark]: color ? isDark(color) : false,
        [s.textLabel]: !color && label && label.length > 3,
        [s.image]:image
      },
      className
    )
    return (
      <Button
        aria-label="Variant Swatch"
        className={swatchClassName} 
        {...(label && color && image  && { title: label})}
       style={color ? { backgroundColor: color } :{}}
      
        {...props}
      >
        {color && active && (
          <span>
            <Check />
          </span>
        )}
     
     {image && <img style={{width:'40px'}} src={image}/>}
     {!color && !image ? label : null}
      </Button>
    )
  }
)

export default Swatch
