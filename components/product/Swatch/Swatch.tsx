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
        [s.textLabel]: !color  && label && label.length > 3,
        [s.image]:image
      },
      className
    )
    return (
      <Button

      //invisible label 
        aria-label="Variant Swatch"
        // class name 
        className={swatchClassName} 
        // condition checking and if true assign label as title
        //if all values(label,color,image) are true 
        // {...(label && color && { title: label})}
        // {...(label && image && { title: label})}
        // {...(!color && !image && { title: null})}

        // if there is label and color show label
        // if there is label and image show label
        // if there is no color or image show nothing

        {...( (color  || image) && label && { title: label})}
        // if there is color or image and there is label show label

       //check condition if true set bgcolor as color
       style={color ? { backgroundColor: color } :{}}
       //properties 
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
